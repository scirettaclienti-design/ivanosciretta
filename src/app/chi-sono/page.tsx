import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cornice, Faq, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { CREDLY, ID_IVANO, LINKEDIN, SITO, lavori, osservatorio } from "@/lib/sito";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Chi sono · Ivano Sciretta, strumenti AI per aziende vere",
  description: "Ivano Sciretta, pugliese con base a Roma: costruisco da me strumenti AI per aziende, dalle mappe per i frantoi ai motori di valutazione. Certificazioni AI su Credly.",
  alternates: { canonical: "/chi-sono" },
  openGraph: { type: "profile", url: `${SITO}/chi-sono`, title: "Chi sono · Ivano Sciretta", description: "Costruisco strumenti AI per aziende vere. Costruzione, tecnica e bellezza — non magia per pigri.", locale: "it_IT" },
};

const CERTIFICAZIONI = ["Google AI Essentials", "Google Prompting Essentials", "Artificial Intelligence Fundamentals (IBM SkillsBuild)", "Development with AI and Web Services (IBM SkillsBuild)"];

export default async function ChiSono() {
  const o = await osservatorio("olio");
  const c = o?.dati.campione;
  const persona = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_IVANO,
    name: "Ivano Sciretta",
    url: `${SITO}/chi-sono`,
    image: `${SITO}/ivano.jpg`,
    jobTitle: "Costruisco strumenti AI per aziende",
    description: "Pugliese con base a Roma. Dal marketing e dalla grafica allo sviluppo con l'AI; costruisce da sé ogni strumento.",
    homeLocation: { "@type": "Place", name: "Roma" },
    knowsAbout: ["Intelligenza artificiale", "Sviluppo web", "Automazione", "Marketing digitale"],
    sameAs: [LINKEDIN, CREDLY],
  };
  return (
    <Cornice jsonLd={[persona]}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image src="/ivano.jpg" alt="Ivano Sciretta" width={160} height={160} priority className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40" />
        <H1>Ivano Sciretta · Costruisco strumenti AI per aziende vere</H1>
      </div>
      <InBreve>
        Sono Ivano Sciretta, pugliese con base a Roma: costruisco da me strumenti AI per aziende — mappe e Check per i frantoi, motori di valutazione, siti.
        {c ? ` Per l'osservatorio di ${o!.dati.mese} ho analizzato ${c.aziende} frantoi in ${c.regioni} regioni.` : ""}
      </InBreve>

      <H2>Il percorso</H2>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-foreground/85">
        <li>Pugliese, con base a Roma.</li>
        <li>Dal marketing e dalla grafica allo sviluppo con l&apos;AI.</li>
        <li>Iscritto a Ingegneria informatica, curriculum AI &amp; Data Science.</li>
        <li>Costruisco ogni strumento da me: dall&apos;idea al codice alla messa online.</li>
      </ul>

      <H2>Il modo di lavorare</H2>
      <blockquote className="mt-4 border-l-4 border-primary-cyan pl-4 font-display text-2xl text-white">Costruzione, tecnica e bellezza — non magia per pigri.</blockquote>

      {c && (
        <>
          <H2>Numeri misurati</H2>
          <p className="mt-2 text-sm text-foreground/60">Dal database, aggiornati il {new Date(o!.dati.calcolato_il).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}.</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              [c.aziende, "frantoi analizzati, uno per uno"],
              [c.siti_letti, "siti letti per intero"],
              [c.regioni, "regioni italiane"],
            ].map(([n, t]) => (
              <div key={String(t)} className="rounded-lg border border-white/10 bg-surface-base p-4">
                <dt className="text-sm text-foreground/70">{t}</dt>
                <dd className="font-display text-3xl font-semibold text-white">{n}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3"><Link href="/osservatorio/olio" className="text-primary-cyan underline underline-offset-4">Leggi l&apos;osservatorio sui frantoi italiani →</Link></p>
        </>
      )}

      <H2>Certificazioni e profili</H2>
      <p className="mt-3 text-lg text-foreground/85">
        <a href={CREDLY} className="text-primary-cyan underline underline-offset-4" rel="me">Certificazioni AI di Google e IBM su Credly</a> (tra cui {CERTIFICAZIONI.join(", ")}).
      </p>
      <p className="mt-2 text-lg text-foreground/85">
        <a href={LINKEDIN} className="text-primary-cyan underline underline-offset-4" rel="me">Profilo LinkedIn</a>
      </p>

      <H2>Alcuni lavori</H2>
      <ul className="mt-4 space-y-2">
        {lavori.map((l) => (
          <li key={l.slug}><Link href={`/lavori/${l.slug}`} className="text-white underline underline-offset-4">{l.cliente}</Link> <span className="text-foreground/60">· {l.settore}</span></li>
        ))}
      </ul>

      <Faq
        domande={[
          { d: "Chi è Ivano Sciretta?", r: "Un costruttore di strumenti AI per aziende, pugliese con base a Roma. Viene dal marketing e dalla grafica ed è iscritto a Ingegneria informatica, curriculum AI & Data Science." },
          { d: "Cosa costruisce?", r: "Strumenti su misura per aziende: mappe e Check per i frantoi, un motore di valutazione immobiliare, siti con esperienze 3D e sistemi di coupon. L'elenco con i link è nella pagina Lavori." },
          { d: "Lavora con un team o da solo?", r: "Costruisce ogni strumento da sé, dall'idea al codice alla messa online." },
          { d: "Come si verificano le sue certificazioni?", r: "Sono pubbliche su Credly (credly.com/users/ivano-sciretta): certificazioni AI di Google e IBM." },
          { d: "Cos'è l'osservatorio sui frantoi?", r: "Una lettura pubblica, con soli numeri aggregati, di come si presentano online i frantoi italiani: annata, pagina per buyer, prezzi, lingue, DOP/IGP e cosa risponde l'AI." },
        ]}
      />
    </Cornice>
  );
}
