
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Chrome/Edge/Android fire this event instead of showing their own
// mini-infobar when the page calls preventDefault() on it. We stash the
// event and re-trigger it ourselves when the user taps our button.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallAppButton() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  // Already running as an installed PWA — nothing to offer. Computed
  // lazily so it reads window.matchMedia once, on the client only.
  const [installed, setInstalled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setVisible(false);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (installed || !visible || !installEvent) return null;

  const handleInstallClick = async () => {
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    // Whether accepted or dismissed, the prompt can only be shown once
    // per captured event — hide our button either way.
    if (outcome === "accepted" || outcome === "dismissed") {
      setVisible(false);
      setInstallEvent(null);
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      className={cn(
        "fixed z-40 inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-label font-medium text-ivory shadow-[var(--shadow-soft)] transition-colors hover:bg-maroon-deep",
        "bottom-20 right-4 lg:bottom-6 lg:right-6",
      )}
      style={{ paddingBottom: "0.75rem" }}
      aria-label="Install Hotel Raghuvar Residency app"
    >
      <DownloadIcon />
      Install App
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0 4.5-4.5M12 15 7.5 10.5M4 17.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
