"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";
import { Terminal, Cpu, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

type AuditResult = {
  diagnosi: string;
  architettura: string;
  roi: string;
} | null;

const SIMULATED_LOGS = [
  "> Inizializzazione protocollo Handshake...",
  "> Bypass difese neurali (Livello 3)...",
  "> Iniezione prompt architetturale in corso...",
  "> Analisi inefficienze aziendali: CRITICA.",
  "> Sintesi topologia RAG & Webhooks...",
  "> Compilazione matrice di impatto...",
  "> ESTREZIONE DATI COMPLETATA."
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

    // Effetto Log Simulati mentre aspetta l'API reale
    let logIndex = 0;
    const logInterval = setInterval(() => {
      setLogs(prev => [...prev, SIMULATED_LOGS[logIndex]]);
      logIndex++;
      if (logIndex >= SIMULATED_LOGS.length) clearInterval(logInterval);
    }, 600);

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
        setResult(data); // Renderizza gli errori (es. API KEY mancante)
        setStatus("ERROR");
      }
    } catch (e) {
      clearInterval(logInterval);
      setStatus("ERROR");
      setResult({
        diagnosi: "Connessione al core interrotta.",
        architettura: "Verificare stack di rete.",
        roi: "NULL"
      });
    }
  };

  return (
    <section className="relative py-32 md:py-48 z-10 overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="font-mono text-xs tracking-widest text-[#00DBE9] uppercase px-4 py-2 border border-[#00DBE9]/40 bg-[#00DBE9]/10 shadow-[0_0_15px_rgba(0,219,233,0.2)] flex items-center gap-3">
              <Terminal className="w-3 h-3 text-[#00DBE9] animate-pulse" />
              Live AI Demo
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight drop-shadow-2xl mb-6"
          >
            <ScrambleText text="NEURAL AUDITOR" duration={1000} />
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-foreground/60 font-sans max-w-2xl mx-auto text-lg"
          >
            L'adozione inizia dalla diagnosi. Descrivi un processo lento, costoso o manuale che blocca la tua azienda. Il mio Orchestratore ti genererà l'architettura risolutiva e il R.O.I in tempo reale.
          </motion.p>
        </div>

        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto border border-white/20 bg-[#050505]/90 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,219,233,0.1)] transition-all duration-700 hover:shadow-[0_0_80px_rgba(0,219,233,0.2)] hover:border-primary-cyan/40 relative overflow-hidden"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center px-4 py-3 border-b border-white/10 bg-[#0a0a0a]">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">orchestrator_kernel_v3.sh</span>
          </div>

          <div className="p-6 md:p-10 flex flex-col gap-8 min-h-[400px]">
            {/* Input Area */}
            {status === "IDLE" && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                <label className="font-mono text-primary-cyan text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-cyan animate-pulse" />
                  USER_INPUT: Describe your bottleneck
                </label>
                <textarea 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Es: Gestisco 300 ticket di assistenza via email al giorno copiando i dati a mano su un Excel centrale..."
                  className="w-full h-40 bg-transparent border-none text-white text-lg font-mono focus:ring-0 outline-none resize-none placeholder:text-white/20 caret-primary-cyan"
                  autoFocus
                />
                
                <button 
                  onClick={handleAudit}
                  disabled={!inputVal.trim()}
                  className="mt-auto self-start md:self-end px-8 py-4 bg-primary-cyan text-black font-mono font-bold tracking-widest text-sm uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative"
                >
                  Esegui Diagnosi
                  <div className="absolute inset-0 blur-md bg-primary-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            )}

            {/* Scanning State */}
            {status === "SCANNING" && (
              <div className="flex flex-col font-mono text-sm tracking-widest text-white/50 space-y-3 h-full justify-center pl-4 border-l-2 border-primary-cyan">
                <span className="text-primary-cyan animate-pulse mb-6">EXEC_SYS_SCAN --MODE=AGGRESSIVE</span>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Result / Error State */}
            {(status === "READY" || status === "ERROR") && result && (
              <motion.div 
                initial={{ opacity: 0, filter: "blur(10px)" }} 
                animate={{ opacity: 1, filter: "blur(0px)" }} 
                className="flex flex-col gap-8 h-full"
              >
                <div className="border-l-2 border-emerald-400 pl-6 py-2">
                  <h4 className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase mb-2">01_SYSTEM_DIAGNOSIS</h4>
                  <p className="text-white md:text-lg leading-relaxed">{result.diagnosi}</p>
                </div>
                
                <div className="border-l-2 border-primary-cyan pl-6 py-2">
                  <h4 className="font-mono text-[10px] text-primary-cyan tracking-widest uppercase mb-2">02_PROPOSED_ARCHITECTURE</h4>
                  <p className="text-white md:text-lg leading-relaxed">{result.architettura}</p>
                </div>
                
                <div className="border-l-2 border-[#A78BFA] pl-6 py-2">
                  <h4 className="font-mono text-[10px] text-[#A78BFA] tracking-widest uppercase mb-2">03_ESTIMATED_ROI</h4>
                  <p className="text-white md:text-xl font-bold tracking-tight shadow-sm drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">{result.roi}</p>
                </div>

                <button 
                  onClick={() => { setStatus("IDLE"); setInputVal(""); }}
                  className="mt-10 self-start px-6 py-3 border border-white/20 text-white/60 font-mono tracking-widest text-xs uppercase hover:bg-white/10 hover:text-white transition-all"
                >
                  ESEGUI NUOVO AUDIT
                </button>
              </motion.div>
            )}
            
          </div>
          
          {/* Scanline Background over everything */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(transparent_50%,rgba(0,219,233,1)_50%)] bg-[length:100%_4px]" />
        </motion.div>

      </div>
    </section>
  );
}
