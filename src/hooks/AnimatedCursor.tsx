"use client";

import { useEffect, useRef, useState } from "react";

interface SpotlightProps {
  size?: number;
  color?: string;
  trailingSpeed?: number;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const Spotlight = ({
  size = 360,
  color = "245, 158, 11",
  trailingSpeed = 12,
}: SpotlightProps) => {
  const trackerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active) setActive(true);
    };
    const onLeave = () => setActive(false);
    const onEnter = () => setActive(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const tick = () => {
      current.current.x +=
        (target.current.x - current.current.x) / trailingSpeed;
      current.current.y +=
        (target.current.y - current.current.y) / trailingSpeed;
      if (trackerRef.current) {
        trackerRef.current.style.transform = `translate3d(${
          current.current.x - size / 2
        }px, ${current.current.y - size / 2}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [trailingSpeed, size, active]);

  return (
    <div
      ref={trackerRef}
      aria-hidden
      className="spotlight"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: active ? 1 : 0,
        transition: "opacity 0.3s ease",
        willChange: "transform",
      }}
    >
      <div
        className="spotlight__inner"
        style={{
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle, rgba(${color}, 0.22) 0%, rgba(${color}, 0.1) 30%, transparent 65%)`,
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};

interface AnimatedCursorProps {
  size?: number;
  color?: string;
  trailingSpeed?: number;
  // legacy props kept for compat — ignored by the new spotlight
  innerSize?: number;
  outerSize?: number;
  outerAlpha?: number;
  innerScale?: number;
  outerScale?: number;
}

function AnimatedCursor({ size, color, trailingSpeed }: AnimatedCursorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <Spotlight size={size} color={color} trailingSpeed={trailingSpeed} />;
}

export default AnimatedCursor;
