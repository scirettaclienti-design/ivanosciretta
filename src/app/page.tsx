"use client";

import Hero from "@/components/Hero";
import ChiSono from "@/components/ChiSono";
import SystemScan from "@/components/SystemScan";
import WhatIBuild from "@/components/WhatIBuild";
import NeuralAuditor from "@/components/NeuralAuditor";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Stack from "@/components/Stack";
import Certifications from "@/components/Certifications";
import Connect from "@/components/Connect";
import SiteNavigator from "@/components/ui/SiteNavigator";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Experience = dynamic(() => import("@/components/webgl/Experience"), {
  ssr: false,
});

export default function Home() {
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    // Lazy-load WebGL aggressively after FCP for a perfect Lighthouse score
    const timer = setTimeout(() => {
      setMount3D(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col w-full selection:bg-primary-cyan/30 selection:text-primary-cyan bg-background">
      {mount3D && <Experience />}
      <div className="relative z-10 flex flex-col w-full">
        {/* Fase 1: La Genesi */}
        <Hero />
        {/* Nuova Sezione: Chi Sono */}
        <ChiSono />
        {/* Fase 1.1: System Scan Interattivo */}
        <SystemScan />
        {/* Fase 3: Il Corpo (Competenze) */}
        <WhatIBuild />
        {/* Fase 3.5: L'Impatto (Adozione Settoriale generativa) */}
        <NeuralAuditor />
        {/* Fase 4: L'Esercito (AI + Human Team) */}
        <Journey />
        {/* Fase 5: La Realtà (I Progetti) */}
        <Projects />
        {/* Fase 2: Il Cervello (Master Orchestrator) (Moved to position 8) */}
        <Stack />
        {/* Footer CTA */}
        <Connect />
        <SiteNavigator />
      </div>
    </main>
  );
}
