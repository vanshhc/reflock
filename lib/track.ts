import { track as vaTrack } from "@vercel/analytics";

export function track(event: string, handle: string, meta?: string) {
  // Vercel Analytics
  try {
    vaTrack(event, { handle, ...(meta ? { meta } : {}) });
  } catch {}

  // Google Sheets
  const body = JSON.stringify({ event, handle, meta });
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {}
}
