"use client";

import { MagneticLink } from "@/components/ui/MagneticLink";
import { site } from "@/lib/portfolio-data";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          timeZoneName: "short",
        }).format(new Date()),
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <footer
      id="contact"
      className="relative scroll-mt-20 border-t border-white/10 py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(45,212,191,0.08),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-mist-500 uppercase">
              Contact · {site.location}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-mist-50 md:text-5xl">
              {site.name}
              <span className="text-teal-400">.</span>
            </h2>
            <p className="mt-3 max-w-sm text-mist-400">{site.summary}</p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <button
              type="button"
              onClick={() => void copyEmail()}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-mist-50 backdrop-blur-md transition hover:border-teal-400/40"
            >
              <Mail className="h-4 w-4 text-teal-300" />
              {site.email}
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="ok"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-teal-300"
                  >
                    <Check className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-mist-400 group-hover:text-mist-200"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-mist-50 transition hover:border-teal-400/40"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              {site.phone}
            </a>

            <a
              href={site.resumePath}
              download
              className="inline-flex items-center gap-2 text-sm text-teal-300 transition hover:text-teal-200"
            >
              <Download className="h-4 w-4" />
              Download resume (PDF)
            </a>

            <p className="font-mono text-xs text-mist-500">
              Bengaluru time ·{" "}
              <span className="text-mist-300">{time || "—"}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-6">
            {site.socials.map((s) => (
              <MagneticLink
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-lg"
              >
                {s.label}
                <span className="font-sans text-xs text-mist-500">
                  {s.handle}
                </span>
              </MagneticLink>
            ))}
          </div>
          <p className="text-xs text-mist-500">
            © {new Date().getFullYear()} {site.name}. Built with Next.js &
            Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
