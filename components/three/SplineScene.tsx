"use client";

/**
 * Optional Spline loader — only use with YOUR exported scene URL from
 * spline.design (Export → Code → React). Public demo URLs often crash
 * newer @splinetool/runtime ("Missing property" / buffer parse errors).
 *
 * Default portfolio visuals use HeroCanvas + TechWheel instead.
 */

import { HeroCanvas } from "@/components/three/HeroCanvas";
import { TechWheel } from "@/components/three/TechWheel";
import { ShimmerLoader } from "@/components/ui/ShimmerLoader";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import {
  Component,
  Suspense,
  type ErrorInfo,
  type ReactNode,
} from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <ShimmerLoader />,
});

type SplineSceneProps = {
  /** Your own prod.spline.design/.../scene.splinecode URL */
  scene?: string;
  className?: string;
  fallbackLabel?: string;
  variant?: "orb" | "wheel";
};

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[SplineScene]", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function SplineScene({
  scene,
  className,
  fallbackLabel,
  variant = "orb",
}: SplineSceneProps) {
  const nativeFallback =
    variant === "wheel" ? (
      <TechWheel className="h-full w-full" />
    ) : (
      <HeroCanvas className="h-full w-full" />
    );

  // No scene (or intentionally empty) → always use native interactive canvas
  if (!scene) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        {nativeFallback}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full transform-gpu", className)}>
      <SplineErrorBoundary fallback={nativeFallback}>
        <Suspense fallback={<ShimmerLoader label={fallbackLabel} />}>
          <Spline scene={scene} className="h-full w-full" />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
