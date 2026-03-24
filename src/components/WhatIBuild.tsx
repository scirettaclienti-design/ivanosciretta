"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Combine, Blocks, Code2, Plus, X } from "lucide-react";
import ScrambleText from "./ui/ScrambleText";

const pillars = [
  {
    title: "Design Cinematografico (Supreme UX)",
    description: "L'estetica non è un decoro, è una funzione. Progetto interfacce che fondono il linguaggio del cinema con la reattività del software d’avanguardia. Ogni pixel è calibrato per guidare l'attenzione e convertire l'utente.",
    approfondimento: "In parole semplici: il tuo sito o la tua app non devono solo funzionare, ma devono essere belli da togliere il fiato. Un bel design non è solo arte, è psicologia: fa percepire il tuo prodotto come premium, più costoso e assolutamente affidabile fin dal primo secondo della visita. Riduciamo l'attrito visivo per massimizzare le vendite o i contatti.",
    icon: <Cpu className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.1,
  },
  {
    title: "Architetture Scalabili (Engineering)",
    description: "Sviluppo motori digitali immuni al tempo. Dai backend agentic alle infrastrutture cloud distribuite, garantisco stabilità assoluta e una velocità di risposta che ridefinisce gli standard del mercato.",
    approfondimento: "In parole semplici: costruiamo le fondamenta invisibili del tuo sistema in modo che non crolli mai, nemmeno se improvvisamente migliaia di persone o milioni di dati iniziano a muoversi contemporaneamente. È come costruire un grattacielo con fondamenta di puro titanio invece che di legno: dormi tranquillo sapendo che il tuo software non si bloccherà nel momento di massimo successo.",
    icon: <Combine className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.2,
  },
  {
    title: "Strategia & Market Dominance",
    description: "Un prodotto eccezionale senza posizionamento è invisibile. Uso l'IA per analizzare i gap di mercato e costruire narrazioni brandizzate che posizionano le tue idee nel top 1% della loro categoria.",
    approfondimento: "In parole semplici: prima di scrivere una singola riga di codice, studiamo ossessivamente i tuoi clienti e i tuoi concorrenti. Identifichiamo dove gli altri stanno sbagliando e creiamo un prodotto progettato come una 'trappola perfetta' per catturare l'attenzione del mercato. Non creiamo cloni, creiamo leader di categoria che rendono i competitor irrilevanti.",
    icon: <Blocks className="w-6 h-6 text-white/80 group-hover:text-primary-cyan transition-colors relative z-10" />,
    delay: 0.3,
  },
  {
    title: "Intelligence Orchestration",
    description: "Il mio core. Coordino team umani e agenti IA (Gemini 3.1, Claude Opus 4.6, GPT 5.4) in un flusso unico. Trasformo la complessità tecnica in una macchina produttiva autonoma e instancabile.",
    approfondimento: "In parole semplici: invece di dover assumere dieci dipendenti separati per analizzare fogli di calcolo, scrivere testi, o elaborare dati ripetitivi, creiamo dei 'dipendenti virtuali' (Agenti di Intelligenza Artificiale) specializzati. Trasferiscono dati, ragionano e compilano output 24 ore su 24 senza sosta. Noi costruiamo e dirigiamo questa orchestra invisibile in modo che tu possa solo leggerne il risultato.",
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
              className="relative w-full max-w-4xl bg-[#0a0a0a]/70 backdrop-blur-2xl border border-primary-cyan/50 p-10 md:p-16 shadow-[0_0_100px_rgba(0,219,233,0.3)] overflow-hidden"
            >
              {/* Scanline Background */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="absolute top-0 left-0 w-1.5 h-full opacity-100 bg-primary-cyan shadow-[0_0_20px_rgba(0,219,233,0.8)]" />

              <button 
                onClick={() => setActivePillar(null)} 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 z-20"
              >
                 <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 flex flex-col items-start">
                <div className="w-16 h-16 rounded-none border border-primary-cyan/30 flex items-center justify-center mb-6 bg-primary-cyan/10">
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
