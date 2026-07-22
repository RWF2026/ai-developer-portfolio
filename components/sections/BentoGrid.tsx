"use client";

import { ChatWidget } from "@/components/ai/ChatWidget";
import { TechWheel } from "@/components/three/TechWheel";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { flagshipProject, skills } from "@/lib/portfolio-data";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

export function BentoGrid() {
  return (
    <section id="work" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="01 — Analyst Hub"
          title="Insight-ready profile"
          description="Ops dashboard case study, an AI that knows my analyst resume, a skill wheel of BA/DA tools, and the competencies I bring to data & business roles."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Cell 1 — Flagship */}
          <GlassCard className="relative flex min-h-[320px] flex-col p-5 md:col-span-2 lg:row-span-2 lg:min-h-[480px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.12),transparent_50%)]" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-teal-400 uppercase">
                  Flagship · Analytics
                </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-mist-50 md:text-3xl">
                    {flagshipProject.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <a
                    href={flagshipProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/10 bg-black/30 p-2 text-mist-300 transition hover:text-teal-300"
                    aria-label="GitHub"
                  >
                    <Code2 className="h-4 w-4" />
                  </a>
                  <a
                    href={flagshipProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/10 bg-black/30 p-2 text-mist-300 transition hover:text-teal-300"
                    aria-label="Live demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="relative mb-4 flex-1 overflow-hidden rounded-xl border border-white/10 bg-ink-900/80">
                <LivePreviewCanvas />
              </div>

              <p className="mb-4 text-sm leading-relaxed text-mist-400">
                {flagshipProject.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-6">
                {flagshipProject.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-xl font-semibold text-mist-50">
                      {m.value}
                    </p>
                    <p className="font-mono text-[10px] tracking-wider text-mist-500 uppercase">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {flagshipProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-mist-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Cell 2 — AI Assistant */}
          <GlassCard className="p-0 md:col-span-1 lg:row-span-2">
            <ChatWidget className="h-full min-h-[420px] border-0 bg-transparent" />
          </GlassCard>

          {/* Cell 3 — 3D Tech */}
          <GlassCard className="relative min-h-[280px] p-0 lg:col-span-1">
            <div className="absolute top-4 left-4 z-10">
              <p className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">
                Analyst Toolkit
              </p>
              <p className="text-sm text-mist-300">Drag to explore</p>
            </div>
            <TechWheel className="h-[280px] w-full lg:h-full lg:min-h-[280px]" />
          </GlassCard>

          {/* Cell 4 — Skills matrix */}
          <GlassCard className="p-5 md:col-span-2 lg:col-span-2">
            <p className="mb-4 font-mono text-[10px] tracking-widest text-teal-400 uppercase">
              Core Competencies
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  whileHover={{ scale: 1.03 }}
                  className="transform-gpu rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent px-3 py-3 text-center"
                >
                  <span className="text-sm font-medium text-mist-100">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/** Simulated live CV preview — bounding boxes + scan line */
function LivePreviewCanvas() {
  const boxes = [
    { x: "12%", y: "22%", w: "28%", h: "36%" },
    { x: "48%", y: "30%", w: "22%", h: "28%" },
    { x: "68%", y: "48%", w: "18%", h: "24%" },
  ];

  return (
    <div className="relative h-full min-h-[160px] w-full overflow-hidden bg-[linear-gradient(160deg,#0a1210_0%,#0d1a22_50%,#0a0e12_100%)]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(45,212,191,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
      {boxes.map((b, i) => (
        <motion.div
          key={i}
          className="absolute border border-teal-400/70 shadow-[0_0_12px_rgba(45,212,191,0.35)]"
          style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
        >
          <span className="absolute -top-5 left-0 font-mono text-[10px] text-teal-300">
            kpi_{i + 1} {(0.91 + i * 0.02).toFixed(2)}
          </span>
        </motion.div>
      ))}
      <div className="absolute right-3 bottom-3 rounded-md border border-white/10 bg-black/50 px-2 py-1 font-mono text-[10px] text-mist-300">
        LIVE · ops_dashboard
      </div>
    </div>
  );
}
