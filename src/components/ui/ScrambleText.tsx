"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?/.,;'[]=-`~";

export default function ScrambleText({ text, duration = 800, className = "" }: { text: string, duration?: number, className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const hasRun = useRef(false);

  useEffect(() => {
    // Wait until element is in viewport, and only run once
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    let start = performance.now();
    let frameId: number;
    const length = text.length;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const resolvedCount = Math.floor(progress * length);
      
      let scrambled = "";
      for (let i = 0; i < length; i++) {
        // Resolve original characters progressively, skip spaces
        if (i < resolvedCount || text[i] === " " || text[i] === "\n") {
          scrambled += text[i];
        } else {
          // Random static for remaining characters
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(scrambled);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayText(text); // Final clean text
      }
    };

    frameId = requestAnimationFrame(tick);
    
    return () => cancelAnimationFrame(frameId);
  }, [text, duration, isInView]);

  // Pre-fill with empty layout space before animation bounds
  return <span ref={ref} className={className}>{displayText || text.replace(/./g, "\u00A0")}</span>;
}
