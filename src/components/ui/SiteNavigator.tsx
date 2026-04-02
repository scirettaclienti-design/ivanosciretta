"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SiteNavigator() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 z-[9999] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity delay-300 bg-[#0a0a0a] text-white/80 border border-primary-cyan/40 px-3 py-1 text-[10px] whitespace-nowrap hidden md:block rounded-sm pointer-events-none">
                Esplora il sito →
              </div>
              <motion.div 
                animate={{ boxShadow: ["0px 0px 0px rgba(0,219,233,0)", "0px 0px 20px rgba(0,219,233,0.4)", "0px 0px 0px rgba(0,219,233,0)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 px-5 py-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-primary-cyan/40 hover:border-primary-cyan transition-all font-mono text-xs text-primary-cyan tracking-widest rounded-sm"
              >
                <span className="w-2 h-2 rounded-full bg-primary-cyan" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <span>[ MENU DI NAVIGAZIONE ]</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-0 md:bottom-8 right-0 md:right-8 w-full md:w-[380px] bg-[#050505]/95 backdrop-blur-xl border-t md:border border-primary-cyan/30 shadow-[0_0_30px_rgba(0,219,233,0.15)] z-[9999] flex flex-col font-mono"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <span className="text-white/80 text-sm tracking-widest">// PERCORSO GUIDATO</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors text-xs tracking-widest p-1"
                >
                  [ESC]
                </button>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {[
                  { num: "01", label: "COSA FACCIO", target: "pilastri" },
                  { num: "02", label: "COME LAVORO", target: "diagram" },
                  { num: "03", label: "COSA HO COSTRUITO", target: "dossiers" },
                  { num: "04", label: "PARLIAMO", target: "cta" },
                ].map((step) => (
                  <button
                    key={step.num}
                    onClick={() => scrollTo(step.target)}
                    className="flex justify-between items-center w-full px-4 py-4 md:py-3 bg-white/5 border border-transparent hover:border-primary-cyan/40 hover:bg-primary-cyan/5 transition-all group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-primary-cyan/60 text-xs">{step.num}</span>
                      <span className="text-white text-sm tracking-widest">[ {step.label} ]</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary-cyan group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center gap-3 text-[10px] text-emerald-400 tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span>SYS.STATUS = [ONLINE]</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
