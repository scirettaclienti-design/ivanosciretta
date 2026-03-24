"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DataFlowStream({ top = "top-[90%]", height = "h-48" }: { top?: string, height?: string }) {
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let yPos = 0;
    
    const tick = () => {
      // Find the main GSAP scroll trigger to tap into its velocity engine
      const st = ScrollTrigger.getById("mainScroll");
      let velocity = 0;
      if (st) {
        velocity = Math.abs(st.getVelocity() || 0) * 0.005; // Scaling factor
      }
      
      // Base speed + kinetic velocity
      const speed = 2 + velocity;
      yPos += speed;
      
      // Infinite physical loop wrapper using transform (forces GPU acceleration)
      if (yPos > 200) yPos = 0; 
      
      if (streamRef.current) {
        streamRef.current.style.transform = `translateY(${yPos}px) translateZ(0)`;
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className={`absolute left-1/2 -translate-x-1/2 ${top} w-[1px] ${height} overflow-hidden pointer-events-none z-10 opacity-70 mix-blend-screen`}>
      {/* Background track (thin rail) */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary-cyan/10 to-transparent" />
      
      {/* Moving kinetic stream using hardware acceleration */}
      <div 
        ref={streamRef}
        className="absolute top-[-200px] left-0 w-full h-[400px] flex flex-col items-center justify-around"
        style={{ willChange: "transform" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary-cyan to-transparent shadow-[0_0_15px_#00DBE9]" />
        <div className="w-[2px] h-8 bg-primary-cyan shadow-[0_0_8px_#00DBE9]" />
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981]" />
      </div>
    </div>
  );
}
