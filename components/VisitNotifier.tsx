"use client";

import { useEffect } from "react";

const SESSION_KEY = "portfolio-visit-notified";

/**
 * Notifies site owner by email once per browser session when the portfolio is opened.
 * Supports optional ?name= / ?from= query params for shared links with a visitor name.
 */
export function VisitNotifier() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // private mode / blocked storage — still attempt notify
    }

    const params = new URLSearchParams(window.location.search);
    const visitorName =
      params.get("name") ||
      params.get("from") ||
      params.get("visitor") ||
      "";

    const payload = {
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
      language: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen: `${window.screen.width}x${window.screen.height}`,
      visitorName,
    };

    const controller = new AbortController();
    const t = window.setTimeout(() => controller.abort(), 10000);

    void fetch("/api/notify-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    })
      .catch(() => undefined)
      .finally(() => window.clearTimeout(t));
  }, []);

  return null;
}
