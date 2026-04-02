"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import Particles from "./ui/Particles";
import ScrambleText from "./ui/ScrambleText";
import DataFlowStream from "./ui/DataFlowStream";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      // Forza pre-rendering e attendi il frame successivo per il paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      });
    });
  }, []);

  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const item: any = {
    hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  if (!isReady) {
    return <section className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden z-10 bg-transparent opacity-0" />;
  }

  return (
    <section className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden z-10 bg-transparent">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <Particles quantity={70} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={item} className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-black/40 backdrop-blur-md rounded-full text-sm font-mono text-primary-cyan/80" style={{ willChange: "transform, opacity" }}>
            <Terminal className="w-4 h-4" />
            <span>AI-SPACE </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan animate-pulse" />
          </motion.div>

          <motion.div variants={item} className="relative mb-6" style={{ willChange: "transform, opacity" }}>
            <div className="font-mono text-xs md:text-sm text-primary-cyan mb-4 tracking-widest uppercase flex flex-col gap-1 items-center">
              <ScrambleText text="[Inizializzazione Sistema...]" duration={600} />
              <span className="opacity-60 text-[10px]"><ScrambleText text="STATUS: SYSTEM_READY_TO_SCALE" duration={1000} /></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-foreground text-balance drop-shadow-2xl leading-tight">
              <ScrambleText text="Il tuo prossimo concorrente sta usando l'AI per batterti. Da quanto tempo lo sai?" duration={1000} />
            </h1>
          </motion.div>

          <motion.p
            variants={item}
            style={{ willChange: "transform, opacity" }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-14 font-sans font-light leading-relaxed drop-shadow-md p-4 bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 rounded-sm"
          >
            Progetto sistemi digitali che combinano design da cinema, intelligenza artificiale 
            e automazione su misura. Per aziende che vogliono smettere di inseguire — 
            e iniziare a dominare.
          </motion.p>

          <motion.div
            variants={item}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Magnetic intensity={0.2}>
              <a href="#pilastri" className="group relative px-8 py-4 bg-foreground text-background font-mono text-sm tracking-widest uppercase font-medium hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
                <span className="absolute inset-0 border border-transparent group-hover:border-primary-cyan/50 transition-colors duration-500"></span>
                <span className="relative z-10">Costruiamo il tuo sistema</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <DataFlowStream top="top-[90%]" height="h-[30vh]" />
    </section>
  );
}
