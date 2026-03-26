"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, MessageSquareCode, ArrowRight } from "lucide-react";
import ScrambleText from "./ui/ScrambleText";
import Magnetic from "./ui/Magnetic";

export default function Connect() {
  const whatsappUrl = "https://wa.me/393476498357?text=Inizializziamo%20la%20sequenza.%20Ho%20visto%20il%20tuo%20ecosistema%20e%20vorrei%20parlarti%20del%20mio%20progetto.";
  const { scrollYProgress } = useScroll();
  
  // Power Down effect: geometric elements lose focus and light shrinks precisely on the CTA
  const maskSize = useTransform(scrollYProgress, [0.85, 0.98], ["150%", "12%"]);
  // Background overlay fading in to black to absorb the 3D scene (System Shutdown)
  const bgOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 0.95]);

  return (
    <>
      {/* Power Down Overlay layer sitting behind Connect content but over 3D Canvas */}
      <motion.div 
        className="fixed inset-0 z-[5] pointer-events-none bg-black"
        style={{ opacity: bgOpacity }}
      />
      <motion.div 
        className="fixed inset-0 z-[6] pointer-events-none bg-transparent"
        style={{ 
           background: "black",
           WebkitMaskImage: useTransform(maskSize, s => `radial-gradient(circle at center, transparent ${s}, black ${s})`),
           maskImage: useTransform(maskSize, s => `radial-gradient(circle at center, transparent ${s}, black ${s})`)
        }}
      />
      <section id="connect" className="relative py-32 overflow-hidden z-10 bg-transparent flex flex-col items-center justify-center min-h-[70vh]">
        <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-block mb-6"
          >
            <span className="font-mono text-xs tracking-widest text-[#00DBE9] uppercase px-3 py-1 border border-[#00DBE9]/30 bg-[#00DBE9]/10">
              [ PROJECT INITIATION ]
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-foreground tracking-tight mb-8 drop-shadow-[0_0_15px_rgba(0,0,0,1)]"
          >
             <ScrambleText text="Trasforma l'Idea in Asset Reale." duration={1000} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 text-lg md:text-2xl max-w-2xl mx-auto mb-16 font-sans leading-relaxed drop-shadow-lg"
          >
            Sei pronto a costruire una piattaforma scalabile che posiziona il tuo brand al vertice del mercato?
            Definiamo la rotta strategica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <Magnetic intensity={0.2}>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-white text-black font-mono text-sm md:text-base tracking-widest uppercase font-bold transition-all duration-500 flex items-center justify-center gap-4 hover:text-white"
              >
                {/* Intense Glowing Aura behind CTA */}
                <div className="absolute inset-0 bg-[#00DBE9] blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-none pointer-events-none" />
                
                {/* Button Background transition */}
                <div className="absolute inset-0 bg-white group-hover:bg-[#0a0a0a] transition-colors duration-500" />
                <div className="absolute inset-0 border border-white/20 group-hover:border-[#00DBE9] shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,219,233,0.6)] transition-all duration-500" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                  PARLIAMO DEL TUO PROGETTO
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </Magnetic>
            <p className="mt-8 font-mono text-xs text-foreground/40 tracking-widest uppercase max-w-sm text-balance leading-loose">
              Collegamento Diretto WhatsApp <br/> [ Parla direttamente con me ]
            </p>
          </motion.div>

        </div>
      </div>

      {/* Footer Connections */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.5 }}
        className="w-full mt-24 pt-8 border-t border-white/5 bg-black/40 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="flex items-center gap-6">
            <a href="https://github.com/ivanosciretta" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-[#00DBE9] transition-colors p-2 hover:bg-white/5 rounded-full">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/ivano-sciretta" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-[#00DBE9] transition-colors p-2 hover:bg-white/5 rounded-full">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://t.me/ivanosci" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-[#00DBE9] transition-colors p-2 hover:bg-white/5 rounded-full">
              <MessageSquareCode className="w-5 h-5" />
            </a>
          </div>
          <p className="font-mono text-xs text-foreground/30 flex items-center gap-2 border border-white/5 px-4 py-2 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            SYS.STATUS = [ONLINE] // {new Date().getFullYear()} IVANO SCIRETTA
          </p>
        </div>
      </motion.div>
    </section>
    </>
  );
}
