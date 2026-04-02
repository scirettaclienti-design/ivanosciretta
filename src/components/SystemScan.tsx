"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";
import { Terminal, ChevronRight, Activity, ArrowRight, Zap } from "lucide-react";

const STEPS = [
  {
    title: "Che tipo di attività gestisci?",
    options: [
      { id: "A", text: "Agenzia / Studio creativo", profile: "Agenzia creativa" },
      { id: "B", text: "Azienda con processi operativi", profile: "Azienda strutturata" },
      { id: "C", text: "Startup / Progetto digitale", profile: "Startup tech" },
      { id: "D", text: "Brand personale / Consulenza", profile: "Brand personale" }
    ]
  },
  {
    title: "Qual è il tuo problema principale adesso?",
    options: [
      { id: "A", text: "Non ho un sistema digitale all'altezza", pillar: "SITI & ESPERIENZE PREMIUM", reason: "stai perdendo autorità nel mercato con un ecosistema digitale obsoleto.", metric: "Incremento drastico dell'autorità percepita." },
      { id: "B", text: "Perdo ore in processi manuali", pillar: "AUTOMAZIONI & WORKFLOW", reason: "stai perdendo tempo su task ripetitivi che potrebbero essere gestiti da agenti AI.", metric: "8-12 ore/settimana recuperabili." },
      { id: "C", text: "Ho un'idea ma non so come costruirla", pillar: "PIATTAFORME AI-DRIVEN", reason: "hai la visione chiara ma ti manca un'infrastruttura ingegneristica scalabile.", metric: "Latenza azzerata tra idea e prodotto." },
      { id: "D", text: "Voglio posizionarmi meglio nel mercato", pillar: "SISTEMI DI POSIZIONAMENTO", reason: "competi in in un mercato affollato senza una trappola del valore definitiva.", metric: "Isolamento totale dalla competizione generalista." }
    ]
  },
  {
    title: "In che fase sei?",
    options: [
      { id: "A", text: "Devo partire da zero", phase: "Da generare" },
      { id: "B", text: "Ho qualcosa ma va rifatto", phase: "Da ristrutturare" },
      { id: "C", text: "Voglio scalare quello che funziona", phase: "Pronto alla scala" }
    ]
  }
];

export default function SystemScan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "READY">("IDLE");

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Completed
      setStatus("SCANNING");
      setTimeout(() => {
        setStatus("READY");
      }, 2000);
    }
  };

  const selectedProfile = answers[0] !== undefined ? (STEPS[0].options[answers[0]] as any).profile : "";
  const selectedPillarObj = answers[1] !== undefined ? (STEPS[1].options[answers[1]] as any) : null;
  const combinedProfile = answers[1] === 1 ? `${selectedProfile} con processi manuali` : `${selectedProfile} in fase critica`;

  return (
    <section className="relative py-24 mb-10 z-10">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 border border-primary-cyan/20 bg-primary-cyan/10 rounded-sm font-mono text-xs text-primary-cyan uppercase tracking-widest"
            >
              <Terminal className="w-4 h-4" />
              SYSTEM.SCAN — Analizziamo il tuo contesto
            </motion.div>
          </div>

          {/* Terminal Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            className="w-full border border-white/10 bg-[#050505]/80 backdrop-blur-3xl rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Top Bar */}
            <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest hover:text-primary-cyan transition-colors">
                // DIMMI DI TE — 3 DOMANDE, 30 SECONDI
              </span>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

              <AnimatePresence mode="wait">
                {status === "IDLE" && (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-full"
                  >
                    <p className="font-mono text-primary-cyan text-sm mb-6 flex items-center gap-2">
                      <span className="animate-pulse">_</span>
                      DOMANDA 0{currentStep + 1} DI 03
                    </p>
                    <h3 className="text-3xl md:text-4xl font-display text-white mb-10 tracking-tight">
                      <ScrambleText text={STEPS[currentStep].title} duration={600} />
                    </h3>

                    <div className="flex flex-col gap-3">
                      {STEPS[currentStep].options.map((opt, i) => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelect(i)}
                          className="flex items-center gap-4 w-full p-6 border border-white/5 bg-white/5 hover:bg-primary-cyan/10 hover:border-primary-cyan/40 transition-all text-left group rounded-md"
                        >
                          <span className="font-mono text-white/30 text-xs md:text-sm group-hover:text-primary-cyan transition-colors">
                            [ {opt.id} ]
                          </span>
                          <span className="font-sans text-white/80 text-lg group-hover:text-white transition-colors flex-1">
                            {opt.text}
                          </span>
                          <ChevronRight className="w-5 h-5 text-transparent group-hover:text-primary-cyan transition-colors" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {status === "SCANNING" && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center relative z-10 h-full py-16"
                  >
                    <div className="w-16 h-16 relative mb-8">
                       <div className="absolute inset-0 border-t-2 border-primary-cyan rounded-full animate-spin" />
                       <div className="absolute inset-2 border-r-2 border-[#A78BFA] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
                       <Activity className="absolute inset-0 m-auto w-6 h-6 text-primary-cyan animate-pulse" />
                    </div>
                    <p className="font-mono text-primary-cyan tracking-widest text-sm uppercase">
                      <ScrambleText text="ANALISI IN CORSO..." duration={2000} />
                    </p>
                  </motion.div>
                )}

                {status === "READY" && selectedPillarObj && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 w-full"
                  >
                    <div className="mb-8 font-mono text-xs uppercase tracking-widest bg-emerald-400/10 text-emerald-400 p-4 border border-emerald-400/20 rounded-md inline-flex items-center gap-3">
                      <Zap className="w-4 h-4" />
                      // SCAN COMPLETATO
                    </div>

                    <div className="space-y-6 font-mono text-sm uppercase tracking-widest text-white/80 border-l border-primary-cyan/40 pl-6 mb-12">
                      <p>PROFILO RILEVATO: <span className="text-primary-cyan font-bold">[{combinedProfile}]</span></p>
                      <p>PILASTRO CONSIGLIATO: <span className="text-white bg-black px-2 py-1 border border-white/20">{selectedPillarObj.pillar}</span></p>
                      <p>PRIORITÀ: <span className="text-red-400 animate-pulse">ALTA</span></p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl mb-12 relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-cyan to-[#A78BFA]" />
                       <p className="text-white/70 font-sans text-lg md:text-xl leading-relaxed mb-6 normal-case">
                         Il tuo scenario: {selectedPillarObj.reason}
                       </p>
                       <p className="font-mono text-primary-cyan uppercase tracking-widest flex items-center gap-3">
                         <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full animate-pulse" />
                         Stima conservativa: {selectedPillarObj.metric}
                       </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <a 
                        href={`https://wa.me/393476498357?text=${encodeURIComponent(`Ho fatto il quiz sul tuo sito. Il mio profilo: [${combinedProfile}]. Vorrei capire come posso migliorare il mio business.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-4 bg-primary-cyan border border-primary-cyan text-black font-mono text-xs tracking-widest uppercase hover:bg-white hover:border-white transition-all flex items-center justify-center gap-3 w-full sm:w-auto font-bold shadow-[0_0_20px_rgba(0,219,233,0.3)]"
                      >
                        [ → PARLIAMO DIRETTAMENTE ]
                      </a>
                      <a 
                        href="#diagram"
                        className="group relative px-6 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white/70 font-mono text-xs tracking-widest uppercase hover:text-white transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
                      >
                        [ → VEDI COME FUNZIONA ]
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
