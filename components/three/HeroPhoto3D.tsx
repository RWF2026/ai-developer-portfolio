"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";

type HeroPhoto3DProps = {
  src?: string;
  alt?: string;
  className?: string;
};

/**
 * Interactive 3D-tilted portrait — replaces the abstract canvas in the hero.
 */
export function HeroPhoto3D({
  src = "/jashwanth-photo.jpg",
  alt = "Jashwanth B",
  className,
}: HeroPhoto3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springX = useSpring(mx, { stiffness: 120, damping: 18 });
  const springY = useSpring(my, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const glareX = useTransform(springX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(springY, [-0.5, 0.5], [20, 80]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 45%)`;

  function onMove(e: PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden transform-gpu",
        className,
      )}
      style={{ perspective: 1200 }}
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,rgba(45,212,191,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(245,165,36,0.1),transparent_50%)]" />

      {/* Orbit rings */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute h-[78%] max-h-[520px] w-[78%] max-w-[520px] rounded-full border border-teal-400/25"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute h-[92%] max-h-[600px] w-[68%] max-w-[440px] rounded-full border border-dashed border-amber-400/30"
        style={{ transform: "rotateX(62deg)" }}
      />

      {/* Floating portrait */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 h-[min(72%,560px)] w-[min(72%,400px)] transform-gpu"
      >
        <div
          className="absolute -inset-6 rounded-[2rem] bg-teal-400/20 blur-3xl"
          style={{ transform: "translateZ(-40px)" }}
        />

        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.75)]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 80vw, 400px"
            className="object-cover object-[center_15%]"
          />

          {/* Soft edge fade into scene */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/30 via-transparent to-ink-950/30" />

          {/* Dynamic glare */}
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ background: glare }}
          />
        </div>

        {/* Depth accent chip */}
        <motion.div
          style={{ transform: "translateZ(36px)" }}
          className="absolute -right-3 bottom-10 hidden rounded-full border border-teal-400/30 bg-ink-950/80 px-3 py-1.5 font-mono text-[10px] tracking-widest text-teal-300 uppercase backdrop-blur-md sm:block"
        >
          Data · Business Analyst
        </motion.div>
      </motion.div>

      <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] tracking-widest text-mist-500 uppercase">
        3D portrait · move cursor
      </p>
    </div>
  );
}
