import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function GlassCard({
  className,
  hover = true,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass transform-gpu overflow-hidden rounded-2xl",
        hover &&
          "transition-[border-color,box-shadow,transform] duration-300 hover:border-teal-400/30 hover:shadow-[0_0_40px_-12px_rgba(45,212,191,0.35)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
