import { cn } from "@/lib/utils";

export function ShimmerLoader({
  className,
  label = "Loading 3D scene…",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-ink-800/80",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 shimmer" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-400/20 border-t-teal-400" />
        <p className="font-mono text-xs tracking-widest text-mist-400 uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
