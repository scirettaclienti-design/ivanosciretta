"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useState } from "react";

export default function Magnetic({
  children,
  stiffness = 150,
  damping = 15,
  mass = 0.5,
  intensity = 0.3,
}: {
  children: React.ReactElement;
  stiffness?: number;
  damping?: number;
  mass?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness, damping, mass };

  const smoothXAdjusted = useSpring(x, springConfig);
  const smoothYAdjusted = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * intensity);
    y.set(middleY * intensity);
  };

  const reset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ x: isHovered ? smoothXAdjusted.get() : 0, y: isHovered ? smoothYAdjusted.get() : 0 }}
      transition={{ type: "spring", stiffness, damping, mass }}
      style={{ display: "inline-block", x: smoothXAdjusted, y: smoothYAdjusted }}
    >
      {children}
    </motion.div>
  );
}
