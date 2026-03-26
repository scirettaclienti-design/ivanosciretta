"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Combine, Blocks, Code2, Plus, X } from "lucide-react";
import ScrambleText from "./ui/ScrambleText";

const pillars = [
  {
    title: "Siti & Esperienze Premium",
    description: "L'estetica non è un decoro, è conversion. Progetto architetture frontend che fondono l'impatto visivo del cinema con le performance del software d'avanguardia.",
    approfondimento: "In parole semplici: il tuo ecosistema digitale deve farti percepire istantaneamente come il leader indiscusso del tuo mercato. Uniamo design immersivo e psicologia cognitiva per massimizzare in modo elegante contatti e conversioni, staccando i tuoi competitor.",
    icon: <Cpu className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.1,
  },
  {
    title: "Piattaforme AI-Driven",
    description: "Sviluppo ecosistemi cloud intelligenti. Dai cruscotti per fondatori alle web app scalabili, integrando fin dal primo momento la potenza inferenziale dell'IA moderna.",
    approfondimento: "In parole semplici: costruiamo prodotti digitali robusti e personalizzati, fatti per non bloccarsi e per anticipare le esigenze degli utenti. Non otterrai una copia incollata da template vari, ma una piattaforma su misura che pensa insieme a te.",
    icon: <Combine className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.2,
  },
  {
    title: "Sistemi di Posizionamento",
    description: "La tecnologia fine a se stessa non genera vendite. Strutturo narrazioni, brand identity ed esperienze digitali che elevano immediatamente l'authority della tua attività.",
    approfondimento: "In parole semplici: un prodotto perfetto che non comunica valore è invisibile. Prepariamo una strategia di presentazione e conversione rigorosa, creando una vera 'trappola del valore' che posiziona le tue idee dritto nel Top 1% del settore.",
    icon: <Blocks className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.3,
  },
  {
    title: "Automazioni & Workflow",
    description: "Il mio core. Coordino operatori virtuali e flussi di dati IA per annullare i colli di bottiglia e trasformare la complessità in una linea produttiva automatizzata.",
    approfondimento: "In parole semplici: creiamo 'dipendenti digitali' che smistano dati, analizzano contratti o pre-compilano task noiosi al posto del tuo team umano. Il risultato? Costi tagliati brutalmente e una macchina aziendale operativa 24/7.",
    icon: <Code2 className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.4,
  },
];

export default function WhatIBuild() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activePillar !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePillar]);

  return (
    <section id="whatibuild" className="py-32 bg-transparent relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="font-mono text-xs tracking-widest text-primary-cyan uppercase px-3 py-1 border border-primary-cyan/20 bg-primary-cyan/5">
              [ THE MASTER BLUEPRINT ]
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight leading-tight"
          >
            I  Quattro Pilastri.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {pillars.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: item.delay,
                  type: "spring", stiffness: 60, damping: 15
                }}
                className="h-full"
              >
                <div 
                  onClick={() => setActivePillar(index)}
                  className="relative p-8 border bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-500 cursor-pointer h-full flex flex-col group overflow-hidden border-white/5 hover:border-primary-cyan/40 hover:bg-[#111]"
                >
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center transition-colors bg-white/5 group-hover:bg-primary-cyan/20">
                    <Plus className="w-4 h-4 text-white/50 group-hover:text-primary-cyan" />
                  </div>

                  <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-6 bg-white/5 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-display font-medium text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-foreground/50 font-sans leading-relaxed text-sm mb-4">
                    {item.description}
                  </p>
                  
                  {/* Micro-animations Data Overlay on Hover */}
                  <div className="mt-auto pt-4 border-t transition-colors duration-300 font-mono text-[10px] flex justify-between border-white/5 text-primary-cyan opacity-0 group-hover:border-primary-cyan/20 group-hover:opacity-100">
                    <span className="animate-pulse">_CLICK_FOR_DATA</span>
                    <span>100%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Modal Overlay */}
      <AnimatePresence>
        {activePillar !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            {/* Heavy Glassmorphism Backdrop */}
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-[60px]" 
              onClick={() => setActivePillar(null)} 
            />
            
            {/* Modal Content - Fluid Explosive Scaling */}
            <motion.div 
              initial={{ scale: 0.6, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-4xl max-h-[85dvh] flex flex-col bg-[#0a0a0a]/90 backdrop-blur-3xl border border-primary-cyan/50 shadow-[0_0_100px_rgba(0,219,233,0.3)] rounded-sm overflow-hidden"
            >
              {/* Scanline Background */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="absolute top-0 left-0 w-1.5 h-full opacity-100 bg-primary-cyan shadow-[0_0_20px_rgba(0,219,233,0.8)] z-10" />

              <button 
                onClick={() => setActivePillar(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 z-50 bg-black/60 backdrop-blur-md rounded-full md:bg-transparent md:rounded-none"
              >
                 <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="relative z-20 flex flex-col items-start p-6 md:p-10 lg:p-16 overflow-y-auto overscroll-contain w-full">
                <div className="w-16 h-16 rounded-none border border-primary-cyan/30 flex items-center justify-center mb-6 bg-primary-cyan/10 shrink-0">
                  {pillars[activePillar].icon}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                  <ScrambleText text={pillars[activePillar].title} duration={800} />
                </h3>
                
                <p className="text-foreground/60 font-sans text-lg md:text-xl leading-relaxed mb-8">
                  {pillars[activePillar].description}
                </p>

                <div className="w-full pt-8 border-t border-white/10 relative">
                   {/* Corner Accent */}
                   <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-cyan/40" />
                   
                   <div className="flex items-center gap-3 mb-4 text-primary-cyan">
                     <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse shadow-[0_0_8px_currentColor]" />
                     <p className="font-mono text-sm tracking-widest uppercase relative z-20">
                       [ ESECUZIONE CHIARA ]
                     </p>
                   </div>
                   
                   <p className="text-white/90 font-sans text-lg md:text-xl leading-relaxed bg-white/5 p-6 border border-white/5">
                     {pillars[activePillar].approfondimento}
                   </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
