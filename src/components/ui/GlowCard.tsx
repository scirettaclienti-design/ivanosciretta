"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import React, { useRef } from "react";

export default function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`relative group overflow-hidden bg-surface-low/20 glass-10 ghost-border ${className}`}
    >
      {/* Inner light pulse that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(0, 219, 233, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Dynamic border projection */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${smoothX}px ${smoothY}px, rgba(0, 219, 233, 0.4), transparent 100%)`,
          WebkitMaskImage: "linear-gradient(black, black) content-box content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
