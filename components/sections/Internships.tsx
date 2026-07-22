"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { internships } from "@/lib/portfolio-data";
import { motion } from "framer-motion";

export function Internships() {
  return (
    <section id="internships" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="04 — Internships"
          title="Hands-on experience"
          description="Industry and academic internships focused on data operations, reporting, documentation, and stakeholder delivery."
        />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-teal-400/60 via-white/10 to-transparent md:left-1/2 md:-translate-x-px" />

          <ul className="space-y-8 md:space-y-12">
            {internships.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={`${item.year}-${item.title}`} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`md:grid md:grid-cols-2 md:gap-10 ${
                      left ? "" : "md:[&>*:first-child]:col-start-2"
                    }`}
                  >
                    <GlassCard
                      className={`ml-10 p-5 md:ml-0 ${
                        left ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <p className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                        {item.year}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-mist-50">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-teal-300/90">{item.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-mist-400">
                        {item.detail}
                      </p>
                    </GlassCard>
                  </motion.div>

                  <span className="absolute top-6 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink-950 bg-teal-400 shadow-[0_0_16px_#2dd4bf] md:left-1/2" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
