"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";

const levels = [
  {
    id: "LEVEL 00",
    name: "INFRASTRUTTURA",
    sys: "SYS.CORE",
    desc: "La tua base nel codice e backend.",
    specs: ["ARCH: NODE/PY", "DB: REL/NO-REL", "STATE: STABLE"],
  },
  {
    id: "LEVEL 01",
    name: "INTERFACCIA",
    sys: "SYS.UX",
    desc: "La tua evoluzione nel design e UX 'Supreme'.",
    specs: ["REN: WEBGL", "FPS: 60", "STATE: FLUID"],
  },
  {
    id: "LEVEL 02",
    name: "STRATEGIA",
    sys: "SYS.MKTG",
    desc: "Il marketing e il posizionamento aziendale.",
    specs: ["GTM: SURGICAL", "CONV: MAX", "STATE: DOMINANT"],
  },
  {
    id: "LEVEL 03",
    name: "ORCHESTRAZIONE",
    sys: "SYS.HYBRID",
    desc: "L'integrazione attuale con l'équipe e l'IA.",
    specs: ["AI: GPT/OPUS", "HUMAN: EXPERT", "STATE: SYNERGY"],
  },
];

export default function CareerArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 border-t border-primary-cyan/10 overflow-hidden z-10">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(to right, #00DBE9 1px, transparent 1px), linear-gradient(to bottom, #00DBE9 1px, transparent 1px)", 
          backgroundSize: "40px 40px" 
        }} 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-primary-cyan/20 pb-8">
          <div>
            <div className="font-mono text-primary-cyan text-sm mb-4 tracking-widest">[ SYSTEM DIAGRAM ]</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white tracking-tight uppercase">
              <ScrambleText text="Potenza Scalabile, Tocco Umano." duration={800} />
            </h2>
            <p className="mt-6 text-foreground/50 font-sans max-w-2xl text-lg md:text-xl leading-relaxed bg-[#0a0a0a]/60 backdrop-blur-md p-6 border border-white/5 rounded-sm normal-case">
              L'intelligenza artificiale accelera la produzione, ma è l'esperienza umana a garantirne l'anima e l'eccellenza. Mi avvalgo di un'équipe selezionata di specialisti che supervisiona e affina ogni output dell’Orchestratore. È così che otteniamo una qualità senza compromessi a una velocità che ridefinisce gli standard di mercato.
            </p>
          </div>
          <div className="mt-8 md:mt-0 font-mono text-xs text-secondary-violet text-right uppercase opacity-70 relative z-20">
            <p>DIAGRAM REF: IS-2026.4</p>
            <p>STATUS: ACTIVE DEPLOYMENT</p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main vertical blueprint pipeline */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary-cyan/10" />
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-primary-cyan shadow-[0_0_10px_#00DBE9] origin-top"
            style={{ height: lineHeight, transform: "translateX(-0.5px)" }}
          />

          <div className="space-y-24">
            {levels.map((level, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                {/* Node connector */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 border border-primary-cyan bg-[#030303] transform -translate-x-1/2 rotate-45 z-10 shadow-[0_0_8px_#00DBE9]" />
                
                {/* Horizontal branch line */}
                <div className={`absolute top-1/2 w-8 border-t border-primary-cyan/30 ${i % 2 === 0 ? "left-6 md:right-1/2 md:left-auto" : "left-6 md:left-1/2"}`} />

                <div className="w-full md:w-1/2" />

                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 text-left"}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 150 : -150, filter: "blur(15px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 40 }}
                    className="p-6 border border-primary-cyan/30 bg-primary-cyan/[0.03] backdrop-blur-md relative group overflow-hidden"
                  >
                    {/* Blueprint schematics corner ticks */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-cyan" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary-cyan" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary-cyan" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary-cyan" />

                    <div className="font-mono text-xs text-primary-cyan mb-2 flex flex-col gap-1">
                      <span>{level.id}</span>
                      <span className="opacity-50">{level.sys}</span>
                    </div>
                    
                    <h3 className="text-2xl font-display text-white mb-4 tracking-widest uppercase">{level.name}</h3>
                    
                    <p className="text-sm font-mono text-white/70 mb-6 border-l-2 border-primary-cyan/50 pl-4">{level.desc}</p>
                    
                    <div className={`flex flex-wrap gap-2 text-xs font-mono text-secondary-violet ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      {level.specs.map((spec, sIdx) => (
                        <span key={sIdx} className="px-2 py-1 bg-secondary-violet/10 border border-secondary-violet/30">{spec}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
