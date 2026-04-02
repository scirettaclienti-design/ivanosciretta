"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Network, Lock, FileCode2 } from "lucide-react";
import ScrambleText from "./ui/ScrambleText";

const projects = [
  {
    title: "AI-SPACE",
    category: "Intelligent Orchestration Engine",
    link: "https://www.aispace.works/",
    metrics: ["Multi-Agentic Routing", "Opus + Gemini Core", "Zero Drift System"],
    gradient: "from-primary-cyan to-[#0a0a0a]",
    icon: <Cpu className="w-8 h-8 text-primary-cyan" />,
    content: "Un motore proprietario di orchestrazione multi-agente. Prende un'idea e la trasforma in contenuti, automazioni e workflow operativi — eliminando completamente l'attrito tra strategia ed esecuzione. Claude + Gemini in parallelo, architettura zero-drift, deploy immediato.",
    status: "ACTIVE_DEPLOYMENT"
  },
  {
    title: "DOVEVAI.ORG",
    category: "The Spatial Web Engine",
    link: "https://www.dovevai.org/",
    metrics: ["Mapbox 3D Custom", "GenAI POI Routing", "Sub-second Latency"],
    gradient: "from-emerald-400 to-[#0a0a0a]",
    icon: <Network className="w-8 h-8 text-emerald-400" />,
    content: "Turismo intelligente, non turismo digitale. Mappe 3D con AI generativa, routing semantico, latenza sub-secondo. Trasforma dati grezzi di territorio in esperienze di esplorazione premium. Già live.",
    status: "BETA_SEQUENCE"
  }
];

export default function Projects() {
  return (
    <section id="dossiers" className="relative py-32 z-10 bg-[#050505]/40 backdrop-blur-sm border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="font-mono text-xs tracking-widest text-primary-cyan uppercase px-3 py-1 border border-primary-cyan/20 bg-primary-cyan/10 flex items-center gap-2">
              <Lock className="w-3 h-3" />
              [ PROGETTI REALI ]
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight mb-6"
          >
            <ScrambleText text="Proof. Non mockup — sistemi live." duration={800} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl font-sans leading-relaxed bg-[#0a0a0a]/80 backdrop-blur-md p-6 border border-white/5 inline-block"
          >
            Questi non sono concept. Sono piattaforme reali, in produzione, costruite da zero e usate ogni giorno. Guarda cosa è già possibile.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 40 }}
              className="group relative"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                
                {/* Visual DOSSIER Container - Heavy Armored Card */}
                <div className="relative p-12 bg-[#050505]/95 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-full flex flex-col justify-between overflow-hidden transition-all duration-700 group-hover:border-primary-cyan/40 group-hover:bg-[#0a0a0a] group-hover:shadow-[0_20px_50px_rgba(0,219,233,0.1)]">
                  
                  {/* Schematic Background Lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                  {/* Subtle Background Glow */}
                  <div className={`absolute -inset-10 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 pointer-events-none`} />

                  {/* Tech Metadata Hover Overlay */}
                  <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 flex flex-col justify-center p-12 border-t-2 border-primary-cyan shadow-inner">
                    <div className="w-full space-y-5 font-mono text-sm tracking-widest uppercase">
                       <p className="text-primary-cyan flex justify-between border-b border-primary-cyan/20 pb-2">
                         <span>STATUS</span> <span className="text-white">{project.status}</span>
                       </p>
                       <p className="text-white/70 flex justify-between border-b border-white/10 pb-2">
                         <span>ENGINE</span> <span>AI NATIVA</span>
                       </p>
                       <p className="text-white/70 flex justify-between border-b border-white/10 pb-2">
                         <span>DATI</span> <span className="text-emerald-400">PROTETTI</span>
                       </p>
                       <p className="text-white/70 flex justify-between border-b border-white/10 pb-2">
                         <span>ALTA</span> <span className="text-emerald-400">DISPONIBILITÀ</span>
                       </p>
                       <p className="text-emerald-400 flex justify-between pt-6">
                         <span className="animate-pulse">_SYSTEM_READY</span> <span>100%</span>
                       </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col h-full opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                    <div className="flex justify-between items-start mb-12">
                      <div className="p-4 bg-white/5 border border-white/10 relative">
                        {/* Schematic Corner Brackets */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
                        {project.icon}
                      </div>
                      
                      {/* Navigate Button */}
                      <div className="flex items-center gap-3">
                         <span className="font-mono text-xs text-white/30 tracking-widest hidden sm:inline-block group-hover:text-white/60 transition-colors">INIT_SEQUENCE</span>
                        <div className="w-12 h-12 rounded-none border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                          <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <FileCode2 className="w-4 h-4 text-white/30" />
                      <p className="font-mono text-xs text-white/50 tracking-widest uppercase">{project.category}</p>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-display text-white mb-6 tracking-tight">
                      <ScrambleText text={project.title} duration={1000} />
                    </h3>
                    
                    <p className="text-white/70 font-sans leading-relaxed text-lg mb-12 max-w-lg flex-grow">
                      {project.content}
                    </p>

                    <div className="mt-auto">
                      {/* Metrics Row */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.metrics.map((metric, mIdx) => (
                          <span key={mIdx} className="font-mono text-[10px] text-primary-cyan/80 px-3 py-1 bg-primary-cyan/5 border border-primary-cyan/20 uppercase tracking-wider backdrop-blur-md">
                            {metric}
                          </span>
                        ))}
                      </div>

                      {/* Footer Status Bar - Terminal Style */}
                      <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs uppercase bg-black/40 -mx-10 -mb-10 px-10 py-5">
                        <span className="text-white/40 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                           SYSTEM STATE
                        </span>
                        <span className={`${project.status === 'ACTIVE_DEPLOYMENT' ? 'text-primary-cyan' : 'text-emerald-400'} flex items-center gap-2 font-medium tracking-widest`}>
                          <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]" />
                          [{project.status}]
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
