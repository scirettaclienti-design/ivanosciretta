"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "./ui/ScrambleText";
import { Briefcase, ShoppingCart, Truck, Landmark, ChevronRight, Activity } from "lucide-react";

const sectors = [
  {
    id: 1,
    title: "Studi Professionali & Legal",
    icon: <Briefcase className="w-5 h-5" />,
    log: "AUTOMAZIONE_DOCUMENTALE: ACTIVE",
    roi: "L'IA analizza incartamenti, sintetizza report in secondi e pre-compila contratti. Riduciamo il 90% del lavoro di back-office, azzerando l'errore umano e liberando le risorse esperte per la pura consulenza strategica.",
    metrics: [
      { label: "TIME_SAVED", value: "90%" },
      { label: "HUMAN_ERROR", value: "0%" }
    ],
    color: "#00DBE9"
  },
  {
    id: 2,
    title: "E-Commerce & Retail",
    icon: <ShoppingCart className="w-5 h-5" />,
    log: "CUSTOMER_SERVICE: H24_AUTONOMOUS",
    roi: "Agenti AI che non dormono. Gestiscono resi, consigliano prodotti basati sul contesto utente e scalano istantaneamente durante i picchi di traffico stagionale (Black Friday, Natale) senza assumere personale extra.",
    metrics: [
      { label: "UPTIME", value: "24/7" },
      { label: "TICKET_DEFLECTION", value: "85%" }
    ],
    color: "#10b981"
  },
  {
    id: 3,
    title: "Operations (HR & Logistica)",
    icon: <Truck className="w-5 h-5" />,
    log: "DATA_ROUTING: OPTIMIZED",
    roi: "I dati passano da un software all'altro istantaneamente tramite webhooks. Dimentica il data-entry manuale: il sistema ragiona, smista i curriculum ottimali o traccia inventari notificando le anomalie in tempo reale.",
    metrics: [
      { label: "DATA_ENTRY_COST", value: "-100%" },
      { label: "PROCESS_SPEED", value: "10x" }
    ],
    color: "#A78BFA"
  },
  {
    id: 4,
    title: "Corporate SaaS & Finanza",
    icon: <Landmark className="w-5 h-5" />,
    log: "PREDICTIVE_ANALYSIS: ONLINE",
    roi: "Sistemi RAG proprietari che elaborano migliaia di database finanziari interni. Interroga i tuoi storici aziendali chattando con un assistente vocale che ti restituisce le proiezioni e i KPI aggiornati del Q3 in 3 secondi.",
    metrics: [
      { label: "DATA_RETRIEVAL", value: "3s" },
      { label: "DECISION_QUALITY", value: "MAX" }
    ],
    color: "#F59E0B"
  }
];

export default function Sectors() {
  const [activeTab, setActiveTab] = useState(sectors[0]);

  return (
    <section className="relative py-32 z-10 overflow-hidden bg-black">
      {/* Background Grids */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="font-mono text-xs tracking-widest text-primary-cyan uppercase px-4 py-2 border border-primary-cyan/40 bg-primary-cyan/10 flex items-center gap-3">
              <Activity className="w-3 h-3 text-primary-cyan animate-pulse" />
              Scalabilità Cross-Settore
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight drop-shadow-2xl"
          >
            <ScrambleText text="MATRICE DI IMPATTO" duration={800} />
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-foreground/50 font-sans max-w-2xl mx-auto mt-6 text-lg"
          >
            L'architettura intelligente non ha limiti di dominio. Un sistema ben orchestrato annienta inefficienze strutturali in qualsiasi mercato.
          </motion.p>
        </div>

        {/* Interface Container */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-0 lg:h-[500px] border border-white/10 bg-[#050505]/80 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          
          {/* Left: Sector Selector (Nodes) */}
          <div className="w-full lg:w-[35%] flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 relative">
            <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">Target Nodes</h3>
            </div>
            <div className="flex-1 flex flex-col justify-center p-4 gap-2">
              {sectors.map((sector) => {
                const isActive = activeTab.id === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setActiveTab(sector)}
                    className={`relative w-full text-left p-5 transition-all duration-300 border flex items-center justify-between group ${isActive ? 'bg-white/5 border-white/20' : 'bg-transparent border-transparent hover:border-white/10 hover:bg-white/5'}`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 w-1 h-full shadow-[0_0_15px_currentColor]"
                        style={{ backgroundColor: sector.color, color: sector.color }}
                      />
                    )}
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`p-2 transition-colors ${isActive ? '' : 'text-white/40 group-hover:text-white/80'}`} style={{ color: isActive ? sector.color : undefined }}>
                        {sector.icon}
                      </div>
                      <span className={`font-display tracking-wider text-sm md:text-base ${isActive ? 'text-white' : 'text-white/50'}`}>
                        {sector.title}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: HUD Display */}
          <div className="w-full lg:w-[65%] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            {/* Scanline subtle overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(255,255,255,1)_50%)] bg-[length:100%_4px]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 h-full flex flex-col justify-between"
              >
                {/* Top Section: System Log */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-4 bg-white/20 animate-pulse" />
                      <span className="w-1.5 h-4 bg-white/40 animate-pulse delay-75" />
                      <span className="w-1.5 h-4 bg-white/60 animate-pulse delay-150" />
                    </div>
                    <span 
                      className="font-mono text-sm tracking-widest uppercase shadow-sm"
                      style={{ color: activeTab.color }}
                    >
                      {activeTab.log}
                    </span>
                  </div>

                  {/* Main Value Proposition */}
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-display text-white mb-6 leading-snug drop-shadow-lg">
                    {activeTab.title}
                  </h4>
                  <p className="text-lg text-white/60 leading-relaxed font-sans max-w-2xl mb-10">
                    {activeTab.roi}
                  </p>
                </div>

                {/* Bottom Section: Metrics HUD */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 mt-auto">
                  {activeTab.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col gap-2">
                       <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
                         sys.{metric.label}
                       </span>
                       <span 
                          className="font-mono text-3xl font-bold tracking-tighter"
                          style={{ color: activeTab.color, textShadow: `0 0 20px ${activeTab.color}40` }}
                       >
                         {metric.value}
                       </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
