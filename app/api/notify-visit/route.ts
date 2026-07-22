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
  visitorName?: string;
};

type GeoInfo = {
  city?: string;
  region?: string;
  country?: string;
  isp?: string;
};

type ProfileHint = {
  name: string;
  platform: string;
  url: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Pull a public profile handle from LinkedIn / GitHub / X referrers. */
function extractProfileFromReferrer(referrer?: string): ProfileHint | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);

    if (host.includes("linkedin.com") && parts[0] === "in" && parts[1]) {
      const handle = decodeURIComponent(parts[1].replace(/\/+$/, ""));
      return {
        name: handle.replace(/-/g, " "),
        platform: "LinkedIn",
        url: `https://www.linkedin.com/in/${handle}`,
      };
    }

    if (host === "github.com" && parts[0] && !["login", "orgs", "settings", "topics"].includes(parts[0])) {
      const handle = parts[0];
      return {
        name: handle,
        platform: "GitHub",
        url: `https://github.com/${handle}`,
      };
    }

    if ((host === "x.com" || host === "twitter.com") && parts[0] && !["home", "i", "search"].includes(parts[0])) {
      const handle = parts[0];
      return {
        name: `@${handle}`,
        platform: "X",
        url: `https://x.com/${handle}`,
      };
    }
  } catch {
    return null;
  }
  return null;
}

function parseDevice(ua: string) {
  let browser = "Unknown browser";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = "Safari";

  let os = "Unknown OS";
  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  const device = /Mobile|Android|iPhone|iPad/.test(ua) ? "Mobile" : "Desktop";
  return { browser, os, device };
}

async function lookupGeo(ip: string): Promise<GeoInfo> {
  if (!ip || ip === "unknown" || ip === "::1" || ip.startsWith("127.")) {
    return { city: "Local", region: "", country: "Development" };
  }
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return {};
    const data = (await res.json()) as {
      success?: boolean;
      city?: string;
      region?: string;
      country?: string;
      connection?: { isp?: string };
    };
    if (data.success === false) return {};
    return {
      city: data.city,
      region: data.region,
      country: data.country,
      isp: data.connection?.isp,
    };
  } catch {
    return {};
  }
}

function titleCaseHandle(name: string) {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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
    if (/bot|crawl|spider|preview|slack|discord|whatsapp|facebookexternalhit|linkedinbot/i.test(ua)) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    const body = (await req.json().catch(() => ({}))) as VisitBody;
    const geo = await lookupGeo(ip);
    const profile = extractProfileFromReferrer(body.referrer);
    const device = parseDevice(ua);

    const visitorDisplay = body.visitorName?.trim()
      ? body.visitorName.trim()
      : profile
        ? titleCaseHandle(profile.name)
        : "Someone";

    const locationParts = [geo.city, geo.region, geo.country].filter(Boolean);
    const location = locationParts.length ? locationParts.join(", ") : "Unknown location";

    const when = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const subject = profile
      ? `🔔 ${visitorDisplay} (${profile.platform}) opened ${site.name}'s portfolio`
      : `🔔 ${visitorDisplay} from ${geo.city || geo.country || "the web"} opened ${site.name}'s portfolio`;

    const text = [
      `${visitorDisplay} just opened ${site.name}'s portfolio.`,
      "",
      `Visitor name / profile: ${visitorDisplay}`,
      profile ? `Platform: ${profile.platform}` : null,
      profile ? `Profile URL: ${profile.url}` : null,
      `Location: ${location}`,
      geo.isp ? `Network / ISP: ${geo.isp}` : null,
      `Device: ${device.device} · ${device.os} · ${device.browser}`,
      `Time (IST): ${when}`,
      `Page: ${body.path || "/"}`,
      `Referrer: ${body.referrer || "direct / unknown"}`,
      `Language: ${body.language || "unknown"}`,
      `Timezone: ${body.timezone || "unknown"}`,
      `Screen: ${body.screen || "unknown"}`,
      `IP: ${ip}`,
      `User-Agent: ${ua}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 8px">Portfolio visit — ${escapeHtml(site.name)}</h2>
        <p style="margin:0 0 16px;font-size:16px">
          <strong>${escapeHtml(visitorDisplay)}</strong> just opened your portfolio.
        </p>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:6px 0;color:#666;width:160px">Visitor</td><td style="padding:6px 0"><strong>${escapeHtml(visitorDisplay)}</strong></td></tr>
          ${
            profile
              ? `<tr><td style="padding:6px 0;color:#666">Profile</td><td style="padding:6px 0"><a href="${escapeHtml(profile.url)}">${escapeHtml(profile.platform)} — ${escapeHtml(profile.name)}</a></td></tr>`
              : ""
          }
          <tr><td style="padding:6px 0;color:#666">Location</td><td style="padding:6px 0">${escapeHtml(location)}</td></tr>
          ${geo.isp ? `<tr><td style="padding:6px 0;color:#666">ISP</td><td style="padding:6px 0">${escapeHtml(geo.isp)}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#666">Device</td><td style="padding:6px 0">${escapeHtml(`${device.device} · ${device.os} · ${device.browser}`)}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Time (IST)</td><td style="padding:6px 0">${escapeHtml(when)}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Page</td><td style="padding:6px 0">${escapeHtml(body.path || "/")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Referrer</td><td style="padding:6px 0">${escapeHtml(body.referrer || "direct / unknown")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Language</td><td style="padding:6px 0">${escapeHtml(body.language || "unknown")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Timezone</td><td style="padding:6px 0">${escapeHtml(body.timezone || "unknown")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Screen</td><td style="padding:6px 0">${escapeHtml(body.screen || "unknown")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">IP</td><td style="padding:6px 0">${escapeHtml(ip)}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:16px">${escapeHtml(ua)}</p>
      </div>
    `;

    const viaResend = await sendWithResend(subject, text, html);
    const ok = viaResend || (await sendWithFormSubmit(subject, text));

    if (!ok) {
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      provider: viaResend ? "resend" : "formsubmit",
      visitor: visitorDisplay,
    });
  } catch (error) {
    console.error("[notify-visit]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
