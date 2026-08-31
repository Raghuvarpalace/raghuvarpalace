
"use client";

import { useEffect } from "react";

/**
 * Registers the service worker at /sw.js. This is one of the browser's
 * requirements for showing the "Install app" prompt (along with the
 * web manifest linked in <head>). Renders nothing.
 */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Installability is a progressive enhancement — if registration
      // fails (e.g. unsupported browser) the site still works normally.
    });
  }, []);

  return null;
}
