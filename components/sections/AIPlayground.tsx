"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const prompts = [
  "summarize transit SLA breaches last 7 days",
  "pivot axle-count vs gate zone — export Excel",
  "draft RCA notes for bottleneck cluster B3",
];

type DemoMode = "vision" | "terminal" | "model";

export function AIPlayground() {
  const [mode, setMode] = useState<DemoMode>("vision");
  const [line, setLine] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (!running) return;
    setOutput([]);
    let step = 0;
    const logs = [
      "→ loading ops dataset: gate_logs_2026Q1.csv",
      "→ cleaning nulls · joining axle_counts",
      "→ SLA rule: transit ≤ 45 min",
      "✓ 12 breaches · zone B3 hotspot",
      "→ publishing Power BI / Excel pack for ops review",
    ];
    const id = setInterval(() => {
      setOutput((prev) => [...prev, logs[step]]);
      step += 1;
      if (step >= logs.length) {
        clearInterval(id);
        setRunning(false);
      }
    }, 420);
    return () => clearInterval(id);
  }, [running, line]);

  return (
    <section id="playground" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="03 — Analyst Playground"
          title="From raw logs to decisions"
          description="Interactive simulation of the analyst loop — query ops data, surface SLA breaches, and package stakeholder reports."
        />

        <GlassCard className="overflow-hidden p-0">
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
            {(
              [
                ["vision", "KPI view"],
                ["terminal", "Analysis terminal"],
                ["model", "Report pack"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition md:text-sm",
                  mode === id
                    ? "bg-teal-400/20 text-teal-200"
                    : "text-mist-400 hover:bg-white/5 hover:text-mist-200",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="border-b border-white/10 p-4 lg:col-span-2 lg:border-r lg:border-b-0">
              <p className="mb-3 flex items-center gap-2 font-mono text-xs text-mist-400">
                <Terminal className="h-3.5 w-3.5" />
                agent@portfolio ~
              </p>
              <ul className="space-y-2">
                {prompts.map((p, i) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => {
                        setLine(i);
                        setMode("terminal");
                        setRunning(true);
                      }}
                      className={cn(
                        "w-full rounded-xl border px-3 py-2.5 text-left text-sm transition",
                        line === i
                          ? "border-teal-400/40 bg-teal-400/10 text-mist-50"
                          : "border-white/10 bg-white/5 text-mist-300 hover:border-white/20",
                      )}
                    >
                      <span className="font-mono text-[10px] text-amber-400">
                        $
                      </span>{" "}
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setRunning(true)}
                disabled={running}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                Run agent
              </button>
            </div>

            <div className="relative min-h-[320px] lg:col-span-3">
              <AnimatePresence mode="wait">
                {mode === "vision" ? (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-ink-900"
                  >
                    <VisionSim active={running || output.length > 0} />
                  </motion.div>
                ) : null}
                {mode === "terminal" ? (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 overflow-auto bg-[#060a0c] p-5 font-mono text-xs leading-relaxed text-teal-200/90 md:text-sm"
                  >
                    <p className="text-mist-500"># session {Date.now() % 9999}</p>
                    <p className="mt-2 text-amber-300/90">$ {prompts[line]}</p>
                    {output.map((o) => (
                      <p key={o} className="mt-1">
                        {o}
                      </p>
                    ))}
                    {running ? (
                      <span className="mt-2 inline-block h-4 w-2 animate-pulse bg-teal-400" />
                    ) : null}
                  </motion.div>
                ) : null}
                {mode === "model" ? (
                  <motion.div
                    key="model"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,#12352f_0%,#060a0c_70%)] p-6"
                  >
                    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                      {[
                        { k: "SLA Met", v: "87%" },
                        { k: "Breaches", v: "12" },
                        { k: "Avg Transit", v: "38m" },
                        { k: "Hotspot", v: "B3" },
                      ].map((m) => (
                        <div
                          key={m.k}
                          className="rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-center"
                        >
                          <p className="font-display text-xl text-mist-50">
                            {m.v}
                          </p>
                          <p className="font-mono text-[10px] tracking-wider text-mist-500 uppercase">
                            {m.k}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg text-mist-50">
                        Ops report pack
                      </p>
                      <p className="font-mono text-xs text-mist-400">
                        Power BI · Excel · RCA notes
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function VisionSim({ active }: { active: boolean }) {
  const bars = [42, 68, 55, 81, 37, 74, 60];
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden p-6">
      <p className="mb-4 font-mono text-[10px] tracking-widest text-mist-400 uppercase">
        KPI trend · gate transit (simulated)
      </p>
      <div className="flex flex-1 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-teal-500/80 to-amber-400/70"
            initial={{ height: "10%" }}
            animate={{ height: active ? `${h}%` : `${h * 0.6}%` }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-mist-500">
        Zones A1–B3 · last 7 days
      </p>
    </div>
  );
}
