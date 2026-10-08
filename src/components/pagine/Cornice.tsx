// Cornice delle pagine leggibili da motori e AI: tutto testo nell'HTML, niente animazioni che lo nascondono.
import Link from "next/link";
import type { ReactNode } from "react";

const VOCI = [
  { href: "/chi-sono", testo: "Chi sono" },
  { href: "/lavori", testo: "Lavori" },
  { href: "/osservatorio/olio", testo: "Osservatorio" },
];

export function Cornice({ children, jsonLd }: { children: ReactNode; jsonLd?: object[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {jsonLd?.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j).replace(/</g, "\\u003c") }} />
      ))}
      <header className="border-b border-white/10">
        <nav aria-label="Pagine" className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 text-sm">
          <Link href="/" className="mr-auto font-display font-semibold text-white">Ivano Sciretta</Link>
          {VOCI.map((v) => (
            <Link key={v.href} href={v.href} className="text-foreground/70 underline-offset-4 hover:text-primary-cyan hover:underline">{v.testo}</Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10">{children}</main>
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-foreground/60">
          Ivano Sciretta · Roma · <Link href="/chi-sono" className="underline underline-offset-4">chi sono</Link> · <Link href="/privacy" className="underline underline-offset-4">privacy</Link>
        </div>
      </footer>
    </div>
  );
}

/** La risposta in due righe in cima a ogni pagina: chi, cosa, numeri principali. */
export function InBreve({ children }: { children: ReactNode }) {
  return <p className="mt-4 rounded-lg border-l-4 border-primary-cyan bg-surface-low px-4 py-3 text-lg leading-relaxed text-white/90">{children}</p>;
}

export const H1 = ({ children }: { children: ReactNode }) => <h1 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">{children}</h1>;
export const H2 = ({ children, id }: { children: ReactNode; id?: string }) => <h2 id={id} className="mt-12 font-display text-2xl font-semibold text-white">{children}</h2>;

export type Domanda = { d: string; r: string };

/** «Domande frequenti» con il JSON-LD FAQPage: stesso testo per persone e motori. */
export function Faq({ domande }: { domande: Domanda[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: domande.map((x) => ({ "@type": "Question", name: x.d, acceptedAnswer: { "@type": "Answer", text: x.r } })),
  };
  return (
    <section aria-labelledby="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <H2 id="faq">Domande frequenti</H2>
      <div className="mt-4 divide-y divide-white/10 rounded-lg border border-white/10">
        {domande.map((x) => (
          <div key={x.d} className="px-4 py-4">
            <h3 className="font-semibold text-white">{x.d}</h3>
            <p className="mt-1 leading-relaxed text-foreground/80">{x.r}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
