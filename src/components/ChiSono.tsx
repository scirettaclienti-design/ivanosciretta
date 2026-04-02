"use client";

import { motion } from "framer-motion";

export default function ChiSono() {
  return (
    <section id="chi-sono" className="py-24 bg-transparent relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="font-mono text-xs tracking-widest text-[#00DBE9] uppercase px-3 py-1 border border-[#00DBE9]/20 bg-[#00DBE9]/5">
              [ CHI È IVANO ]
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight leading-tight"
          >
            L'architettura prima. Il codice dopo.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-foreground/60 font-sans text-lg md:text-xl leading-relaxed"
        >
          <p>
            Mi chiamo Ivano Sciretta. Progetto e costruisco sistemi digitali per aziende e founder che vogliono smettere di improvvisare e iniziare a operare con l'infrastruttura di un'organizzazione moderna.
          </p>
          <p>
            Ho fondato AI-SPACE e DoveVAI — due piattaforme live che orchestrano agenti AI in produzione, ogni giorno. Non parlo di futuro: costruisco sistemi che già funzionano.
          </p>
          <p>
            Il mio metodo: strategia prima, tecnologia dopo. Ogni progetto parte da una domanda sola — cosa deve accadere nel tuo business che oggi non accade?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-white/10">
            <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase px-4 py-2 border border-emerald-400/20 bg-emerald-400/5 inline-block text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              [PROGETTI ATTIVI: 2 IN PRODUZIONE]
            </span>
            <span className="font-mono text-xs tracking-widest text-[#A78BFA] uppercase px-4 py-2 border border-[#A78BFA]/20 bg-[#A78BFA]/5 inline-block text-center shadow-[0_0_15px_rgba(167,139,250,0.1)]">
              [CLIENTI: SU REFERRAL E SELEZIONE]
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
