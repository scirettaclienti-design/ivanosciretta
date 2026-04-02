"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";

const levels = [
  {
    id: "LEVEL 00",
    name: "ANALISI STRATEGICA",
    sys: "SYS.DISCOVERY",
    desc: "Prima di scrivere una riga di codice, capisco davvero il tuo business. Dove sei, dove vuoi arrivare, e cosa ti blocca. Nessuna fretta. Nessuna scorciatoia.",
    specs: ["AUDIT: DEEP", "TARGET: ALIGNED", "STATE: CLARITY"],
  },
  {
    id: "LEVEL 01",
    name: "PROGETTAZIONE SISTEMA",
    sys: "SYS.BLUEPRINT",
    desc: "Definisco l'architettura — visiva e tecnica. Come sarà l'esperienza del tuo cliente, quali tecnologie la renderanno possibile, come scalerà nel tempo. Tutto su carta prima di costruire qualsiasi cosa.",
    specs: ["UX: PREMIUM", "ARCH: SCALABLE", "STATE: DESIGNED"],
  },
  {
    id: "LEVEL 02",
    name: "SVILUPPO & INTEGRAZIONE",
    sys: "SYS.EXECUTION",
    desc: "Si costruisce. Codice pulito, AI integrata nativamente, zero template, zero approssimazioni. Ogni componente è progettato per durare e scalare senza ricominciare da capo.",
    specs: ["CODE: CLEAN", "AI: NATIVE", "STATE: BUILT"],
  },
  {
    id: "LEVEL 03",
    name: "LANCIO E DOMINIO",
    sys: "SYS.SCALE",
    desc: "Il lancio non è la fine — è l'inizio della fase più importante. Go-to-market, ottimizzazione delle conversioni, posizionamento nel mercato. Il progetto non si chiude finché i numeri non dicono quello che devono dire.",
    specs: ["LAUNCH: SURGICAL", "CONV: MAX", "STATE: LIVE"],
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
    <section id="diagram" ref={containerRef} className="relative py-32 border-t border-primary-cyan/10 overflow-hidden z-10">
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
            <div className="font-mono text-primary-cyan text-sm mb-4 tracking-widest">[ COME LAVORO ]</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white tracking-tight uppercase">
              <ScrambleText text="Come funziona. Dal brief al risultato." duration={800} />
            </h2>
            <p className="mt-6 text-foreground/50 font-sans max-w-2xl text-lg md:text-xl leading-relaxed bg-[#0a0a0a]/60 backdrop-blur-md p-6 border border-white/5 rounded-sm normal-case">
              Non procedo per tentativi e non assemblo template. Ogni progetto segue un framework in quattro fasi, progettato per portare risultati misurabili in tempi definiti. Ecco cosa succede, dal primo messaggio in poi.
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
