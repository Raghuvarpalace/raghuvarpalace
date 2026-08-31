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

type Guide = "ios" | "android" | "desktop" | null;

export function InstallAppButton() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  // Already running as an installed PWA — nothing to offer. Computed
  // lazily so it reads window.matchMedia once, on the client only.
  const [installed, setInstalled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches,
  );
  const [guide, setGuide] = useState<Guide>(null);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      setGuide(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (installed) return null;

  const handleInstallClick = async () => {
    // Best case: the browser already handed us the native prompt.
    if (installEvent) {
      await installEvent.prompt();
      const { outcome } = await installEvent.userChoice;
      if (outcome === "accepted" || outcome === "dismissed") {
        setInstallEvent(null);
      }
      return;
    }

    // No native prompt available yet (iOS never provides one; Chrome/
    // Android sometimes needs a bit more engagement first) — show the
    // right manual steps instead of doing nothing.
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const isAndroid = /Android/.test(ua);
    setGuide(isIOS ? "ios" : isAndroid ? "android" : "desktop");
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={cn(
          "fixed z-40 inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-label font-medium text-ivory shadow-[var(--shadow-soft)] transition-colors hover:bg-maroon-deep",
          "bottom-20 right-4 lg:bottom-6 lg:right-6",
        )}
        aria-label="Install Hotel Raghuvar Residency app"
      >
        <DownloadIcon />
        Install App
      </button>

      {guide && <InstallGuide type={guide} onClose={() => setGuide(null)} />}
    </>
  );
}

function InstallGuide({ type, onClose }: { type: Exclude<Guide, null>; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4 sm:pb-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-ivory p-6 shadow-[var(--shadow-soft)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg text-maroon">Install this app</h3>

        {type === "ios" && (
          <ol className="mt-3 space-y-2 text-sm text-charcoal-soft list-decimal list-inside">
            <li>
              Tap the <ShareIcon className="inline -mt-0.5" /> <strong>Share</strong> button in Safari&rsquo;s
              toolbar
            </li>
            <li>
              Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>
            </li>
            <li>
              Tap <strong>Add</strong> in the top-right corner
            </li>
          </ol>
        )}

        {type === "android" && (
          <ol className="mt-3 space-y-2 text-sm text-charcoal-soft list-decimal list-inside">
            <li>
              Tap the <strong>⋮</strong> menu in the top-right of your browser
            </li>
            <li>
              Tap <strong>&ldquo;Install app&rdquo;</strong> or <strong>&ldquo;Add to Home screen&rdquo;</strong>
            </li>
            <li>Confirm to add it to your home screen</li>
          </ol>
        )}

        {type === "desktop" && (
          <ol className="mt-3 space-y-2 text-sm text-charcoal-soft list-decimal list-inside">
            <li>
              Look for an install icon (⊕ or a small computer/download icon) at the right end of your
              browser&rsquo;s address bar
            </li>
            <li>
              Click it, then confirm <strong>&ldquo;Install&rdquo;</strong>
            </li>
            <li>
              If you don&rsquo;t see it, open your browser&rsquo;s <strong>⋮</strong> menu and look for
              &ldquo;Install app&rdquo;
            </li>
          </ol>
        )}

        <p className="mt-4 text-xs text-charcoal-soft">
          {type === "ios"
            ? "This is Safari's own step — no app store needed."
            : "Not seeing this option yet? Browse the site a little more and try again in a bit."}
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-maroon px-5 py-2.5 text-sm font-label font-medium text-ivory hover:bg-maroon-deep"
        >
          Got it
        </button>
      </div>
    </div>
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

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3v12m0-12 3.5 3.5M12 3 8.5 6.5M6 11v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
