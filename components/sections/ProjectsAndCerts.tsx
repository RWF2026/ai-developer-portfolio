"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, projects } from "@/lib/portfolio-data";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Cert = (typeof certifications)[number];

export function ProjectsAndCerts() {
  const [active, setActive] = useState<Cert | null>(null);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="projects" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="02 — Projects & credentials"
          title="Analytics that drive decisions"
          description="Case studies framed for Data Analyst and Business Analyst roles — KPIs, documentation, and stakeholder outcomes."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <GlassCard className="h-full p-5">
                <p className="font-mono text-[10px] tracking-widest text-teal-400 uppercase">
                  Project 0{i + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-mist-50">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">
                  {project.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-mist-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="mt-4 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-400" />
            <p className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Certifications · click to view
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li key={cert.file}>
                <button
                  type="button"
                  onClick={() => setActive(cert)}
                  className="group flex w-full items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-teal-400/40 hover:bg-teal-400/10"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-teal-300">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-mist-50 group-hover:text-teal-200">
                      {cert.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-mist-500">
                      {cert.issuer}
                    </span>
                  </span>
                  <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-mist-500 opacity-0 transition group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-ink-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold text-mist-50">
                    {active.title}
                  </p>
                  <p className="truncate text-xs text-mist-500">{active.issuer}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={active.file}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-mist-300 transition hover:border-teal-400/40 hover:text-teal-200"
                  >
                    Open file
                  </a>
                  {"verifyUrl" in active && active.verifyUrl ? (
                    <a
                      href={active.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-amber-400/30 px-3 py-1.5 text-xs text-amber-200 transition hover:bg-amber-400/10"
                    >
                      Verify
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-lg border border-white/10 p-2 text-mist-300 transition hover:text-mist-50"
                    aria-label="Close certificate"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-black/40 p-3 md:p-4">
                {active.type === "pdf" ? (
                  <iframe
                    title={active.title}
                    src={`${active.file}#view=FitH`}
                    className="h-[70vh] w-full rounded-xl border border-white/10 bg-white"
                  />
                ) : (
                  <div className="relative mx-auto h-[70vh] w-full max-w-3xl overflow-auto rounded-xl border border-white/10 bg-white">
                    <Image
                      src={active.file}
                      alt={active.title}
                      width={1200}
                      height={900}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
