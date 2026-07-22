import { NextResponse } from "next/server";
import { site } from "@/lib/portfolio-data";

export const runtime = "nodejs";

/** Simple in-memory rate limit (per serverless instance). */
const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit = 8, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now > row.reset) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (row.count >= limit) return false;
  row.count += 1;
  return true;
}

type VisitBody = {
  path?: string;
  referrer?: string;
  language?: string;
  timezone?: string;
  screen?: string;
};

async function sendWithResend(subject: string, text: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const to = process.env.NOTIFY_EMAIL || site.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[notify-visit] Resend error:", err);
    return false;
  }
  return true;
}

async function sendWithFormSubmit(subject: string, text: string) {
  const to = process.env.NOTIFY_EMAIL || site.email;
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      message: text,
      source: "ai-developer-portfolio",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[notify-visit] FormSubmit error:", err);
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json({ ok: true, skipped: "rate_limited" });
    }

    const ua = req.headers.get("user-agent") || "unknown";
    // Skip obvious bots / preview crawlers
    if (/bot|crawl|spider|preview|slack|discord|whatsapp|facebookexternalhit|linkedinbot/i.test(ua)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    const body = (await req.json().catch(() => ({}))) as VisitBody;
    const when = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const subject = `🔔 Someone opened your portfolio`;
    const text = [
      "Someone just opened your portfolio.",
      "",
      `Time (IST): ${when}`,
      `Page: ${body.path || "/"}`,
      `Referrer: ${body.referrer || "direct / unknown"}`,
      `Language: ${body.language || "unknown"}`,
      `Timezone: ${body.timezone || "unknown"}`,
      `Screen: ${body.screen || "unknown"}`,
      `IP: ${ip}`,
      `User-Agent: ${ua}`,
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 12px">Portfolio visit</h2>
        <p>Someone just opened your portfolio.</p>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:6px 0;color:#666">Time (IST)</td><td style="padding:6px 0">${when}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Page</td><td style="padding:6px 0">${body.path || "/"}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Referrer</td><td style="padding:6px 0">${body.referrer || "direct / unknown"}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Language</td><td style="padding:6px 0">${body.language || "unknown"}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Timezone</td><td style="padding:6px 0">${body.timezone || "unknown"}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Screen</td><td style="padding:6px 0">${body.screen || "unknown"}</td></tr>
          <tr><td style="padding:6px 0;color:#666">IP</td><td style="padding:6px 0">${ip}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:16px">${ua}</p>
      </div>
    `;

    const viaResend = await sendWithResend(subject, text, html);
    const ok = viaResend || (await sendWithFormSubmit(subject, text));

    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "email_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      provider: viaResend ? "resend" : "formsubmit",
    });
  } catch (error) {
    console.error("[notify-visit]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
