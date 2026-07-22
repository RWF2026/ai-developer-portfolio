"use client";

import { openAiAssistant } from "@/components/ai/FloatingAssistant";
import { site } from "@/lib/portfolio-data";
import { cn, scrollToId } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Internships", id: "internships" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], [0, 12]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      style={{ backdropFilter: `blur(${blur}px)` }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transform-gpu transition-colors",
        scrolled ? "border-b border-white/10 bg-ink-950/70" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <button
          type="button"
          onClick={() => scrollToId("hero")}
          className="font-display text-lg font-semibold tracking-tight text-mist-50"
        >
          {site.name}
          <span className="text-teal-400">.</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollToId(link.id)}
                className="rounded-lg px-3 py-2 text-sm text-mist-300 transition hover:bg-white/5 hover:text-mist-50"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => openAiAssistant()}
          className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1.5 text-xs font-medium text-teal-200 transition hover:bg-teal-400/20 md:text-sm"
        >
          Talk to AI
        </button>
      </nav>
    </motion.header>
  );
}
