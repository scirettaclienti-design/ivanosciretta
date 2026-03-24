"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";
import { Layout, Sparkles, Workflow, Zap, Activity } from "lucide-react";

export default function Stack() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stack" className="relative py-32 md:py-48 z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-cyan/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Intestazione */}
        <div className="text-center mb-32 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block mb-6"
          >
            <span className="font-mono text-xs tracking-widest text-[#00DBE9] uppercase px-4 py-2 border border-[#00DBE9]/40 bg-[#00DBE9]/10 shadow-[0_0_15px_rgba(0,219,233,0.2)] flex items-center gap-3">
              <Zap className="w-3 h-3 text-[#00DBE9] animate-pulse" />
              Operative Network
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight mb-8 drop-shadow-2xl"
          >
            <ScrambleText text="L’Orchestratore Digitale." duration={800} />
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 font-sans max-w-3xl mx-auto text-lg md:text-xl leading-relaxed p-6 border border-white/10 rounded-none bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <span className="relative z-10">Un’idea non ha valore senza un’esecuzione impeccabile. Il mio ruolo è tradurre il caos creativo in protocolli operativi. Governerai un'architettura dinamica dove i modelli più avanzati – Gemini 3.1, Claude Opus 4.6, GPT 5.4 – dialogano in tempo reale per dare vita a prodotti finiti.</span>
          </motion.div>
        </div>

        {/* --- ARCHITETTURA ORCHESTRATORE --- */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center min-h-[600px]">
          
          {/* NUCLEO CENTRALE & ONDE LUMINOSE (Overlay effect) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:flex items-center justify-center">
            
            {/* Onde Espansive (Passano SOPRA ai box grazie a w/h enormi e mix-blend-screen) */}
            <motion.div 
              className="absolute w-[300px] h-[300px] rounded-full border border-primary-cyan/60 mix-blend-screen"
              animate={{ scale: [1, 5], opacity: [0.8, 0], borderWidth: ["2px", "8px"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 15px rgba(0, 219, 233, 0.8))" }}
            />
            <motion.div 
              className="absolute w-[300px] h-[300px] rounded-full border border-emerald-400/60 mix-blend-screen"
              animate={{ scale: [1, 5], opacity: [0.8, 0], borderWidth: ["2px", "8px"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
              style={{ filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))" }}
            />
            <motion.div 
              className="absolute w-[300px] h-[300px] rounded-full border border-[#A78BFA]/60 mix-blend-screen"
              animate={{ scale: [1, 5], opacity: [0.8, 0], borderWidth: ["2px", "8px"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2.6 }}
              style={{ filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.8))" }}
            />

            {/* Il Reattore Fisico */}
            <div className="relative z-40 w-24 h-24 bg-black border border-white/20 rounded-full shadow-[0_0_60px_rgba(0,219,233,0.5)] flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,219,233,0.3)_0%,transparent_70%)] animate-pulse" />
               <Activity className="w-8 h-8 text-primary-cyan animate-pulse drop-shadow-[0_0_10px_currentColor]" />
               
               {/* Energia orbitante */}
               <motion.div 
                 className="absolute inset-0 border-[3px] border-t-emerald-400 border-r-transparent border-b-[#A78BFA] border-l-transparent rounded-full"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
            </div>

            {/* Link Lines Fisiche dal centro verso le Card */}
            <div className="absolute top-1/2 left-[-200px] w-[200px] h-[2px] bg-gradient-to-r from-transparent to-primary-cyan/80 -translate-y-1/2" />
            <div className="absolute top-[-100px] right-[-200px] w-[220px] h-[2px] bg-gradient-to-l from-transparent to-emerald-400/80 origin-left rotate-12" />
            <div className="absolute bottom-[-100px] right-[-200px] w-[220px] h-[2px] bg-gradient-to-l from-transparent to-[#A78BFA]/80 origin-left -rotate-12" />
          </div>

          {/* I Tre Box Operativi */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-32 relative z-20 w-full items-center">
            
            {/* ---- 1. MAIN NODE (Left full-height) ---- */}
            <div className="w-full lg:w-1/2 flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 50 }}
                 className="w-full max-w-lg p-10 bg-[#070707]/90 backdrop-blur-3xl border border-white/10 hover:border-[#00DBE9]/60 transition-all duration-700 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl"
              >
                {/* Effetti Card */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,219,233,1)_50%)] bg-[length:100%_4px] group-hover:opacity-[0.08]" />
                <div className={`absolute top-0 right-0 w-1.5 h-full transition-all duration-500 bg-[#00DBE9] ${activeNode === 0 ? 'opacity-100 shadow-[0_0_20px_rgba(0,219,233,1)]' : 'opacity-30'}`} />
                <div className="absolute -inset-20 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[#00DBE9] to-transparent" />
                
                <div className="flex items-center justify-between mb-12 relative z-20">
                   <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl border bg-[#00DBE9]/10 border-[#00DBE9]/30 group-hover:bg-[#00DBE9]/20 transition-colors shadow-[0_0_15px_rgba(0,219,233,0.2)]">
                      <Sparkles className="w-6 h-6 text-[#00DBE9] animate-pulse" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display text-white tracking-widest group-hover:text-[#00DBE9] transition-colors drop-shadow-md">
                      <ScrambleText text="IL CERVELLO AI" duration={800} />
                    </h3>
                  </div>
                </div>

                <div className="space-y-6 relative z-20">
                   {[
                    { name: "Nodo: Gemini 3.1", desc: "[ACTIVE - Ragionamento]", color: "text-[#00DBE9]", bg: "bg-[#00DBE9]" },
                    { name: "Nodo: Claude 4.6", desc: "[ACTIVE - Logica Pura]", color: "text-[#00DBE9]", bg: "bg-[#00DBE9]" },
                    { name: "Nodo: GPT-5", desc: "[STANDBY - Esecuzione]", color: "text-foreground/40", bg: "bg-foreground/40" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="p-5 border border-white/5 bg-black/60 rounded-xl hover:border-white/20 transition-colors flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-3">
                         <span className={`w-2 h-2 rounded-full ${item.bg} ${i < 2 ? 'animate-pulse shadow-[0_0_10px_currentColor]' : ''}`} />
                         <p className="text-white text-lg font-medium">{item.name}</p>
                      </div>
                      <p className={`text-xs ml-5 font-mono uppercase ${item.color}`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ---- 2. SUB NODES (Right Stack) ---- */}
            <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center items-start">
              
              {/* CORE LOGIC */}
               <motion.div
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
                  className={`w-full max-w-md p-8 bg-[#070707]/90 backdrop-blur-3xl rounded-2xl relative overflow-hidden group transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border ${activeNode === 1 ? 'border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/10 hover:border-emerald-400/50'}`}
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${activeNode === 1 ? 'opacity-100 shadow-[0_0_20px_rgba(16,185,129,1)]' : 'opacity-30'} transition-all duration-500 bg-emerald-400`} />
                  
                  <div className="flex items-center gap-4 mb-8 relative z-20">
                    <div className="p-4 rounded-xl border bg-emerald-400/10 border-emerald-400/30 group-hover:bg-emerald-400/20 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <Workflow className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-display text-white uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                      <ScrambleText text="CORE LOGIC" duration={800} />
                    </h3>
                  </div>

                  <div className="p-5 border border-white/5 bg-black/60 rounded-xl relative z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]" />
                      <p className="text-white text-lg font-medium">n8n + Supabase DB</p>
                    </div>
                    <p className="text-xs ml-5 font-mono uppercase text-emerald-400">
                      [SYNC - AUTOMAZIONE TOTALE]
                    </p>
                  </div>
                </motion.div>


              {/* OUTPUT TIER */}
               <motion.div
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
                  className={`w-full max-w-md p-8 bg-[#070707]/90 backdrop-blur-3xl rounded-2xl relative overflow-hidden group transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border ${activeNode === 2 ? 'border-[#A78BFA]/80 shadow-[0_0_30px_rgba(167,139,250,0.3)]' : 'border-white/10 hover:border-[#A78BFA]/50'}`}
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${activeNode === 2 ? 'opacity-100 shadow-[0_0_20px_rgba(167,139,250,1)]' : 'opacity-30'} transition-all duration-500 bg-[#A78BFA]`} />
                  
                  <div className="flex items-center gap-4 mb-8 relative z-20">
                    <div className="p-4 rounded-xl border bg-[#A78BFA]/10 border-[#A78BFA]/30 group-hover:bg-[#A78BFA]/20 transition-colors shadow-[0_0_15px_rgba(167,139,250,0.2)]">
                      <Layout className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <h3 className="text-xl font-display text-white uppercase tracking-widest group-hover:text-[#A78BFA] transition-colors">
                      <ScrambleText text="OUTPUT TIER" duration={800} />
                    </h3>
                  </div>

                  <div className="p-5 border border-white/5 bg-black/60 rounded-xl relative z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse shadow-[0_0_10px_currentColor]" />
                      <p className="text-white text-lg font-medium">Next.js 15 + Tailwind</p>
                    </div>
                    <p className="text-xs ml-5 font-mono uppercase text-[#A78BFA]">
                      [RENDER - ESPERIENZA ESECUTIVA]
                    </p>
                  </div>
                </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
