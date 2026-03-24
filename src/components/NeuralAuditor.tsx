"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";
import Particles from "./ui/Particles";
import { Sparkles, BrainCircuit, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";

type AuditResult = {
  problema_reale: string;
  soluzione_ai: string;
  impatto_sul_business: string;
} | null;

const SIMULATED_LOGS = [
  "Scansione flussi operativi in corso...",
  "Individuazione colli di bottiglia e latenze...",
  "Calcolo dispersione ore-uomo...",
  "Progettazione architettura AI risolutiva...",
  "Stima del Return on Investment (ROI)...",
  "Generazione report completata."
];

export default function NeuralAuditor() {
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "READY" | "ERROR">("IDLE");
  const [result, setResult] = useState<AuditResult>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  const handleAudit = async () => {
    if (!inputVal.trim() || status === "SCANNING") return;
    
    setStatus("SCANNING");
    setResult(null);
    setLogs([]);

    let logIndex = 0;
    const logInterval = setInterval(() => {
      setLogs(prev => [...prev, SIMULATED_LOGS[logIndex]]);
      logIndex++;
      if (logIndex >= SIMULATED_LOGS.length) clearInterval(logInterval);
    }, 700);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ processDescription: inputVal })
      });

      const data = await res.json();
      clearInterval(logInterval);
      
      if (res.ok) {
        setResult(data);
        setStatus("READY");
      } else {
        setResult(data);
        setStatus("ERROR");
      }
    } catch (e) {
      clearInterval(logInterval);
      setStatus("ERROR");
      setResult({
        problema_reale: "Connessione al motore AI interrotta.",
        soluzione_ai: "Verificare lo stato della rete o le API keys.",
        impatto_sul_business: "Impossibile calcolare il vantaggio."
      });
    }
  };

  return (
    <section className="relative py-32 md:py-48 z-10 overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-cyan/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <Sparkles className="w-4 h-4 text-primary-cyan animate-pulse" />
            <span className="font-sans text-sm tracking-wide text-white/80 uppercase">Scopri il tuo margine nascosto</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white tracking-tight drop-shadow-2xl mb-8"
          >
            <ScrambleText text="PROVA IL SIMULATORE" duration={1200} />
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-foreground/60 font-sans max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            L'efficienza estrema si progetta su misura. Descrivi un processo lento, manuale o frustrante della tua azienda. L'AI analizzerà il problema e progetterà istantaneamente il sistema per automatizzarlo.
          </motion.p>
        </div>

        {/* Premium Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative group"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-cyan/20 via-[#A78BFA]/20 to-primary-cyan/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Main Glassmorphic Container */}
          <div className="relative border border-white/10 bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] min-h-[500px] flex flex-col">
            
            {/* Embedded Particles Background */}
            <div className="absolute inset-0 z-0 opacity-40">
               <Particles quantity={60} staticity={30} ease={50} />
               {/* Dark gradient to ensure text readability */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]/90" />
            </div>

            <div className="relative z-10 p-8 md:p-14 flex-1 flex flex-col">
              
              {/* Input State */}
              <AnimatePresence mode="wait">
                {status === "IDLE" && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full flex-1 justify-center max-w-3xl mx-auto w-full"
                  >
                    <div className="flex items-center gap-3 mb-6 bg-primary-cyan/10 border border-primary-cyan/30 px-6 py-3 rounded-full flex-wrap justify-center text-center mx-auto shadow-[0_0_20px_rgba(0,219,233,0.15)] max-w-lg">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-cyan"></span>
                      </span>
                      <span className="font-sans text-primary-cyan font-medium text-sm md:text-base">Scrivi un problema aziendale e chiedi all'Intelligenza Artificiale come risolverlo gratis, adesso.</span>
                    </div>

                    <textarea 
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="👉 Es: Il mio team perde 3 ore al giorno a rispondere alle mail dei clienti copiando incollarndo vecchie risposte..."
                      className="w-full h-56 bg-black/40 border border-white/20 hover:border-primary-cyan/50 rounded-[2rem] p-6 md:p-8 text-white text-xl md:text-3xl font-sans focus:ring-4 focus:ring-primary-cyan/30 focus:border-primary-cyan outline-none resize-none placeholder:text-white/30 transition-all shadow-[inset_0_4px_30px_rgba(0,0,0,0.5)]"
                    />
                    
                    <button 
                      onClick={handleAudit}
                      disabled={!inputVal.trim()}
                      className="mt-8 mx-auto w-full md:w-auto px-12 py-5 bg-gradient-to-r from-primary-cyan to-primary-blue text-black font-display font-bold text-xl md:text-2xl tracking-wide rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_10px_50px_rgba(0,219,233,0.4)] hover:shadow-[0_20px_60px_rgba(0,219,233,0.6)] flex items-center justify-center gap-4 group"
                    >
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      INIZIA SIMULAZIONE ORA
                      <BrainCircuit className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {/* Scanning State */}
                {status === "SCANNING" && (
                  <motion.div 
                    key="scanning"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center h-full flex-1 py-10"
                  >
                    <div className="relative w-24 h-24 mb-10">
                      <div className="absolute inset-0 border-t-2 border-primary-cyan rounded-full animate-spin" />
                      <div className="absolute inset-2 border-r-2 border-[#A78BFA] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                      <BrainCircuit className="absolute inset-0 m-auto w-8 h-8 text-white animate-pulse" />
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 h-20">
                      <AnimatePresence mode="popLayout">
                        {logs.slice(-1).map((log, i) => (
                           <motion.p 
                             key={log}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="font-mono text-primary-cyan tracking-widest text-sm uppercase text-center"
                           >
                             {log}
                           </motion.p>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* Result State */}
                {(status === "READY" || status === "ERROR") && result && (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ staggerChildren: 0.2 }}
                    className="flex flex-col h-full flex-1"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 flex-1">
                      
                      {/* Left Column: Problem & Solution */}
                      <div className="space-y-10">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/80" />
                          <h4 className="flex items-center gap-2 font-display text-white/50 uppercase tracking-widest text-sm mb-4">
                            <AlertCircle className="w-4 h-4" /> Il Problema Invisibile
                          </h4>
                          <p className="text-white md:text-lg leading-relaxed">{result.problema_reale}</p>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                          className="bg-primary-cyan/5 border border-primary-cyan/20 rounded-2xl p-6 relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary-cyan shadow-[0_0_15px_#00DBE9]" />
                          <h4 className="flex items-center gap-2 font-display text-primary-cyan uppercase tracking-widest text-sm mb-4">
                            <BrainCircuit className="w-4 h-4" /> L'Architettura Risolutiva
                          </h4>
                          <p className="text-white md:text-lg leading-relaxed">{result.soluzione_ai}</p>
                        </motion.div>
                      </div>

                      {/* Right Column: ROI Impact */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-[#A78BFA]/10 to-transparent border border-[#A78BFA]/20 rounded-2xl p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-[#A78BFA]/5 blur-3xl rounded-full" />
                         <TrendingUp className="w-12 h-12 text-[#A78BFA] mb-6 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]" />
                         <h4 className="font-display text-[#A78BFA] uppercase tracking-widest text-sm mb-6">Impatto sul Business</h4>
                         <p className="text-white text-2xl md:text-3xl lg:text-4xl font-medium leading-tight shadow-sm drop-shadow-md">
                           {result.impatto_sul_business}
                         </p>
                      </motion.div>

                    </div>

                    <motion.div 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                       className="mt-12 flex justify-center"
                    >
                      <button 
                        onClick={() => { setStatus("IDLE"); setInputVal(""); }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 font-sans text-sm hover:bg-white/10 hover:text-white transition-all shadow-sm"
                      >
                        <RefreshCw className="w-4 h-4" /> Esegui Nuova Simulazione
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
