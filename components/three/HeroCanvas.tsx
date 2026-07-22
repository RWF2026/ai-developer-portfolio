"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type HeroCanvasProps = {
  className?: string;
};

/**
 * Interactive WebGL-free hero canvas — neural orb + particles.
 * Used instead of public Spline URLs (runtime/version mismatches).
 */
export function HeroCanvas({ className }: HeroCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let mx = 0.5;
    let my = 0.5;
    let t = 0;

    const particles = Array.from({ length: 90 }, (_, i) => ({
      a: (i / 90) * Math.PI * 2,
      r: 0.22 + (i % 7) * 0.035,
      s: 0.004 + (i % 5) * 0.0012,
      size: 1 + (i % 3),
    }));

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    }

    function draw() {
      t += 0.016;
      const cx = w * (0.5 + (mx - 0.5) * 0.08);
      const cy = h * (0.48 + (my - 0.5) * 0.08);
      const radius = Math.min(w, h) * 0.28;

      ctx!.clearRect(0, 0, w, h);

      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.2);
      glow.addColorStop(0, "rgba(45,212,191,0.22)");
      glow.addColorStop(0.45, "rgba(245,165,36,0.08)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, w, h);

      // Core orb
      const core = ctx!.createRadialGradient(
        cx - radius * 0.2,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius,
      );
      core.addColorStop(0, "rgba(232,237,242,0.95)");
      core.addColorStop(0.35, "rgba(45,212,191,0.55)");
      core.addColorStop(0.75, "rgba(10,20,24,0.9)");
      core.addColorStop(1, "rgba(5,7,10,0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.fillStyle = core;
      ctx!.fill();

      // Rings
      for (let i = 0; i < 3; i++) {
        const rr = radius * (1.15 + i * 0.22);
        ctx!.beginPath();
        ctx!.ellipse(
          cx,
          cy,
          rr,
          rr * (0.35 + i * 0.08),
          t * (0.35 + i * 0.12) + mx,
          0,
          Math.PI * 2,
        );
        ctx!.strokeStyle =
          i === 1 ? "rgba(245,165,36,0.45)" : "rgba(45,212,191,0.35)";
        ctx!.lineWidth = 1.2;
        ctx!.stroke();
      }

      // Particles + links
      const pts: { x: number; y: number }[] = [];
      for (const p of particles) {
        const ang = p.a + t * p.s * 40;
        const pulse = 1 + Math.sin(t * 2 + p.a) * 0.04;
        const x = cx + Math.cos(ang) * radius * p.r * pulse * 2.1;
        const y = cy + Math.sin(ang) * radius * p.r * pulse * 1.55;
        pts.push({ x, y });
        ctx!.beginPath();
        ctx!.arc(x, y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(94,234,212,0.85)";
        ctx!.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 70) {
            ctx!.strokeStyle = `rgba(45,212,191,${0.18 * (1 - dist / 70)})`;
            ctx!.beginPath();
            ctx!.moveTo(pts[i].x, pts[i].y);
            ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={cn("relative h-full w-full transform-gpu", className)}>
      <canvas ref={ref} className="h-full w-full" aria-hidden />
      <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] tracking-widest text-mist-500 uppercase">
        Interactive insight field · move cursor
      </p>
    </div>
  );
}
