"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-10 max-w-2xl", className)}
    >
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-amber-400/90 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-mist-50 md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-mist-400 md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
