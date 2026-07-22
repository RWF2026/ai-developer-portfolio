"use client";

import { openAiAssistant } from "@/components/ai/FloatingAssistant";
import { HeroPhoto3D } from "@/components/three/HeroPhoto3D";
import { site } from "@/lib/portfolio-data";
import { scrollToId } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDownRight, Download, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.18),transparent_60%)]" />
        <div className="absolute right-0 bottom-0 h-[50vh] w-[50vw] bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,165,36,0.12),transparent_55%)]" />
        <div className="noise absolute inset-0 opacity-[0.35]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:px-6 lg:grid-cols-2 lg:gap-4">
        <div className="order-2 z-10 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-xs tracking-[0.22em] text-amber-400 uppercase"
          >
            {site.role} · {site.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block text-mist-50">{site.firstName}</span>
            <span className="kinetic-text block">{site.lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-md text-base leading-relaxed text-mist-400 md:text-lg"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToId("work")}
              className="group inline-flex items-center gap-2 rounded-full bg-mist-50 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-white"
            >
              Explore Work
              <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() => openAiAssistant()}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-mist-50 backdrop-blur-md transition hover:border-teal-400/40 hover:bg-teal-400/10"
            >
              <Sparkles className="h-4 w-4 text-teal-300" />
              Talk to My AI Assistant
            </button>
            <a
              href={site.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="order-1 relative h-[42vh] min-h-[280px] w-full transform-gpu lg:order-2 lg:h-[70vh]"
        >
          <div className="absolute inset-0 -mx-4 md:mx-0 lg:-mr-16">
            <HeroPhoto3D
              src={site.photo}
              alt={`${site.name} — professional portrait`}
              className="h-full w-full"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-mist-500 uppercase md:block"
      >
        Scroll
      </motion.div>
    </section>
  );
}
