"use client";

import { skills } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";

const labels = skills.slice(0, 8);

type TechWheelProps = {
  className?: string;
};

/** Drag-to-spin skill wheel — reliable replacement for fragile Spline embeds. */
export function TechWheel({ className }: TechWheelProps) {
  const rot = useMotionValue(0);
  const spring = useSpring(rot, { stiffness: 60, damping: 18 });

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#12352f_0%,#060a0c_72%)] select-none",
        className,
      )}
    >
      <div className="noise absolute inset-0 opacity-30" />

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.35}
        onDrag={(_, info) => {
          rot.set(rot.get() + info.delta.x * 0.45);
        }}
        style={{ rotate: spring }}
        className="relative h-48 w-48 cursor-grab touch-none transform-gpu active:cursor-grabbing md:h-52 md:w-52"
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 rounded-full border border-teal-400/30" />
        <div className="absolute inset-4 rounded-full border border-dashed border-amber-400/35" />
        <div className="absolute inset-10 rounded-full bg-teal-400/15 blur-xl" />
        <div className="absolute inset-[38%] rounded-full border border-white/15 bg-ink-900/80 shadow-[0_0_40px_rgba(45,212,191,0.25)]" />

        {labels.map((label, i) => {
          const angle = (i / labels.length) * 360;
          return (
            <div
              key={label}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-92px) rotate(-${angle}deg)`,
              }}
            >
              <span className="rounded-md border border-white/10 bg-black/50 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-teal-200 backdrop-blur-sm">
                {label}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
