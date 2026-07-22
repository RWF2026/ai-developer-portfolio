"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/lib/portfolio-data";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="05 — Education"
          title="Academic foundation"
          description="Formal education in Computer Science — the analytical base behind dashboards, SQL, and structured problem-solving."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard className="h-full p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-mist-50 md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-teal-300/90">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">
                  {item.detail}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
