"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";
import { Layout, Sparkles, Workflow, Zap } from "lucide-react";

export default function Stack() {
  const [activeNode, setActiveNode] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stack" className="relative py-32 md:py-48 z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
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
            <span className="relative z-10">Un’idea non ha valore senza un’esecuzione impeccabile. Il mio ruolo è tradurre il caos creativo in protocolli operativi. Non mi affido a un singolo strumento: governo un'architettura dinamica dove i modelli più avanzati – Gemini 3.1 per il ragionamento, Claude Opus 4.6 per la logica, GPT 5.4 per l'esecuzione – dialogano in tempo reale per dare vita a prodotti finiti.</span>
          </motion.div>
        </div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated SVG Filament Connections (Visible on large screens) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            
            {/* ---- TOP WIRE (To Core Logic) ---- */}
            <path d="M 58 25 C 65 25, 60 25, 75 25" stroke={isHovered ? "#A78BFA" : "#00DBE9"} strokeWidth="1" fill="none" opacity="0.2" className="transition-colors duration-500" />
            <motion.path
              d="M 58 25 C 65 25, 60 25, 75 25"
              stroke={isHovered ? "#A78BFA" : "#00DBE9"}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="2 40"
              animate={{ strokeDashoffset: [42, 0] }}
              transition={{ duration: isHovered ? 0.4 : 1.5, repeat: Infinity, ease: "linear" }}
              style={{ filter: isHovered ? "drop-shadow(0 0 10px #A78BFA)" : "drop-shadow(0 0 6px #00DBE9)" }}
              className="transition-colors duration-500"
            />

            {/* ---- BOTTOM WIRE (To Output Tier) ---- */}
             <path d="M 58 75 C 65 75, 60 75, 75 75" stroke={isHovered ? "#A78BFA" : "#10b981"} strokeWidth="1" fill="none" opacity="0.2" className="transition-colors duration-500" />
            <motion.path
               d="M 58 75 C 65 75, 60 75, 75 75"
              stroke={isHovered ? "#A78BFA" : "#10b981"}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="2 40"
              animate={{ strokeDashoffset: [42, 0] }}
              transition={{ duration: isHovered ? 0.4 : 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              style={{ filter: isHovered ? "drop-shadow(0 0 10px #A78BFA)" : "drop-shadow(0 0 6px #10b981)" }}
              className="transition-colors duration-500"
            />
          </svg>

          <div className="flex flex-col lg:flex-row gap-12 relative z-10 w-full">
            
            {/* ---- 1. MAIN NODE (Left full-height) ---- */}
            <div className="w-full lg:w-[58%] flex">
              <motion.div
                initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 50 }}
                 className="w-full p-10 bg-[#070707]/90 backdrop-blur-3xl border border-white/10 hover:border-[#00DBE9]/60 transition-all duration-700 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Scanline Background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,219,233,1)_50%)] bg-[length:100%_4px] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                <div className="absolute top-0 left-0 w-1.5 h-full opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-[#00DBE9] shadow-[0_0_15px_rgba(0,219,233,0.8)]" />
                <div className="absolute -inset-20 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[#00DBE9] to-transparent" />
                
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                    <div className="p-4 rounded-none border relative z-20 bg-[#00DBE9]/10 border-[#00DBE9]/30 group-hover:bg-[#00DBE9]/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-[#00DBE9] relative z-20 animate-pulse" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display text-white tracking-widest relative z-20 group-hover:text-[#00DBE9] transition-colors drop-shadow-md">
                      <ScrambleText text="INTELLIGENZA DI FRONTIERA" duration={800} />
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#00DBE9]/50 tracking-widest hidden sm:block">MAIN_CORE</span>
                </div>

                <div className="space-y-8 relative z-20">
                   {[
                    { name: "Nodo Alpha: Gemini 3.1", desc: "[ACTIVE - Razionalizzazione e Agenti]", color: "text-[#00DBE9]", bg: "bg-[#00DBE9]" },
                    { name: "Nodo Beta: Claude Opus 4.6", desc: "[ACTIVE - Generazione Codice & UX]", color: "text-[#00DBE9]", bg: "bg-[#00DBE9]" },
                    { name: "Nodo Gamma: ChatGPT 5.4", desc: "[STANDBY - Esecuzione API]", color: "text-foreground/40", bg: "bg-foreground/40" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="group/item relative p-6 border border-white/5 bg-black/40 hover:bg-black/60 hover:border-white/10 transition-all duration-300 flex flex-col gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                      <div className="flex items-center gap-3">
                         <span className={`w-2 h-2 rounded-full ${item.bg} ${i < 2 ? 'animate-pulse shadow-[0_0_10px_currentColor]' : ''}`} />
                        <p className="text-white text-lg md:text-xl font-medium tracking-tight drop-shadow-sm">{item.name}</p>
                      </div>
                      <p className={`text-xs ml-5 font-mono tracking-widest uppercase ${item.color}`}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ---- 2. SUB NODES (Right Stack) ---- */}
            <div className="w-full lg:w-[42%] flex flex-col gap-12 justify-between">
              
              {/* CORE LOGIC */}
               <motion.div
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
                  className={`h-full p-8 bg-[#070707]/90 backdrop-blur-3xl relative overflow-hidden group transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border ${activeNode === 1 ? 'border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/10 hover:border-emerald-400/50'}`}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(16,185,129,1)_50%)] bg-[length:100%_4px] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${activeNode === 1 ? 'opacity-100 shadow-[0_0_20px_rgba(16,185,129,1)]' : 'opacity-30 group-hover:opacity-100'} transition-opacity duration-500 bg-emerald-400`} />
                  <div className={`absolute -inset-20 blur-3xl pointer-events-none bg-gradient-to-br from-emerald-400 to-transparent ${activeNode === 1 ? 'opacity-40' : 'opacity-0 group-hover:opacity-30'} transition-opacity duration-700`} />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 rounded-none border relative z-20 bg-emerald-400/10 border-emerald-400/30 group-hover:bg-emerald-400/20 transition-colors">
                      <Workflow className="w-5 h-5 text-emerald-400 relative z-20" />
                    </div>
                    <h3 className="text-xl font-display text-white uppercase tracking-widest relative z-20 group-hover:text-emerald-400 transition-colors">
                      <ScrambleText text="CORE LOGIC & AUTOMATION" duration={800} />
                    </h3>
                  </div>

                  <div className="space-y-4 relative z-20">
                     <motion.div 
                        className="group/item p-5 border border-white/5 bg-black/40 hover:bg-black/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_currentColor]" />
                          <p className="text-white text-lg font-medium tracking-tight">n8n + Supabase Auth/DB</p>
                        </div>
                        <p className="text-xs ml-5 font-mono tracking-widest uppercase text-emerald-400">
                          [SYNC - I/O Totale e Webhooks]
                        </p>
                     </motion.div>
                  </div>
                </motion.div>


              {/* OUTPUT TIER */}
               <motion.div
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
                  className={`h-full p-8 bg-[#070707]/90 backdrop-blur-3xl relative overflow-hidden group transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border ${activeNode === 2 ? 'border-secondary-violet/80 shadow-[0_0_30px_rgba(167,139,250,0.3)]' : 'border-white/10 hover:border-secondary-violet/50'}`}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(167,139,250,1)_50%)] bg-[length:100%_4px] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${activeNode === 2 ? 'opacity-100 shadow-[0_0_20px_rgba(167,139,250,1)]' : 'opacity-30 group-hover:opacity-100'} transition-opacity duration-500 bg-secondary-violet`} />
                  <div className={`absolute -inset-20 blur-3xl pointer-events-none bg-gradient-to-br from-secondary-violet to-transparent ${activeNode === 2 ? 'opacity-40' : 'opacity-0 group-hover:opacity-30'} transition-opacity duration-700`} />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 rounded-none border relative z-20 bg-secondary-violet/10 border-secondary-violet/30 group-hover:bg-secondary-violet/20 transition-colors">
                      <Layout className="w-5 h-5 text-secondary-violet relative z-20" />
                    </div>
                    <h3 className="text-xl font-display text-white uppercase tracking-widest relative z-20 group-hover:text-secondary-violet transition-colors">
                      <ScrambleText text="OUTPUT TIER" duration={800} />
                    </h3>
                  </div>

                  <div className="space-y-4 relative z-20">
                     <motion.div 
                        className="group/item p-5 border border-white/5 bg-black/40 hover:bg-black/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-2 h-2 rounded-full bg-secondary-violet animate-pulse shadow-[0_0_10px_currentColor]" />
                          <p className="text-white text-lg font-medium tracking-tight">Next.js 15 + Tailwind v4</p>
                        </div>
                        <p className="text-xs ml-5 font-mono tracking-widest uppercase text-secondary-violet">
                          [GPU RENDER - Esperienza Esecutiva]
                        </p>
                     </motion.div>
                  </div>
                </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
