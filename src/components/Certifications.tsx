"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  { issuer: "Vanderbilt University", name: "Prompt Engineering Specialization" },
  { issuer: "Coursera", name: "Generative AI for Everyone" },
  { issuer: "Coursera", name: "Software Design and Architecture" },
  { issuer: "Coursera", name: "Agile Project Management" },
];

export default function Certifications() {
  return (
    <section className="relative py-20 overflow-hidden bg-transparent border-y border-outline-variant/10">
      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Award className="w-8 h-8 text-secondary-violet mb-6" />
              <h2 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4">
                Ongoing Mastery.
              </h2>
              <p className="text-foreground/50 font-sans text-sm md:text-base leading-relaxed">
                Certifications are not the destination. They are the baseline. I constantly
                immerse myself in the frontier of AI, architecture, and design to ensure
                the products I build remain future-proof.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certs.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-surface-lowest ghost-border flex items-center justify-between group hover:bg-surface-low transition-colors"
                >
                  <div>
                    <span className="text-xs font-mono text-primary-cyan uppercase tracking-widest block mb-1">
                      {cert.issuer}
                    </span>
                    <span className="text-sm font-sans font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {cert.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
