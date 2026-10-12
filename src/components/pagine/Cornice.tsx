// Cornice delle pagine leggibili da motori e AI: tutto testo nell'HTML, niente animazioni che lo nascondono.
import Link from "next/link";
import type { ReactNode } from "react";

const VOCI = [
  { href: "/chi-sono", testo: "Chi sono" },
  { href: "/metodo", testo: "Metodo" },
  { href: "/soluzioni", testo: "Soluzioni" },
  { href: "/lavori", testo: "Lavori" },
  { href: "/osservatorio", testo: "Osservatorio" },
];

export function Cornice({ children, jsonLd }: { children: ReactNode; jsonLd?: object[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {jsonLd?.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j).replace(/</g, "\\u003c") }} />
      ))}
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-primary-cyan focus:px-3 focus:py-2 focus:text-black">Vai al contenuto</a>
      <header className="border-b border-white/10">
        <nav aria-label="Pagine" className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 text-sm">
          <Link href="/" className="mr-auto font-display font-semibold text-white">Ivano Sciretta</Link>
          {VOCI.map((v) => (
            <Link key={v.href} href={v.href} className="text-foreground/70 underline-offset-4 hover:text-primary-cyan hover:underline">{v.testo}</Link>
          ))}
        </nav>
      </header>
      <main id="contenuto" className="mx-auto max-w-3xl px-4 pb-20 pt-10">{children}</main>
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-foreground/60">
          Ivano Sciretta · Roma · <Link href="/chi-sono" className="underline underline-offset-4">chi sono</Link> · <Link href="/metodo" className="underline underline-offset-4">metodo</Link> · <Link href="/soluzioni" className="underline underline-offset-4">soluzioni</Link> · <Link href="/privacy" className="underline underline-offset-4">privacy</Link>
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

/** Il percorso, in alto: le stesse voci dei dati strutturati BreadcrumbList (briciole() in lib/sito). */
export function Briciole({ voci }: { voci: [string, string][] }) {
  return (
    <nav aria-label="Percorso" className="text-sm text-foreground/70">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link href="/" className="underline underline-offset-4">Ivano Sciretta</Link></li>
        {voci.map(([nome, href], i) => (
          <li key={href} className="flex items-center gap-2">
            <span aria-hidden="true">›</span>
            {i === voci.length - 1 ? <span aria-current="page" className="text-white">{nome}</span> : <Link href={href} className="underline underline-offset-4">{nome}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** L'ultima cosa di ogni pagina: un'azione sola. */
export function Azione({ titolo, sotto, href, testo, colore }: { titolo: string; sotto: string; href: string; testo: string; colore?: string }) {
  return (
    <section className="mt-14 rounded-lg border bg-surface-low p-6 text-center" style={{ borderColor: colore ? `${colore}99` : "rgba(0,219,233,.4)" }}>
      <p className="font-display text-2xl font-semibold text-white">{titolo}</p>
      <p className="mt-2 text-foreground/80">{sotto}</p>
      <a href={href} className="mt-4 inline-flex min-h-12 items-center rounded-lg px-6 font-semibold" style={{ background: colore ?? "#00DBE9", color: colore ? "#fff" : "#000" }}>{testo}</a>
    </section>
  );
}

/** Dove andare dopo: tre link, sempre gli stessi legami tra le pagine (chi sono, metodo, soluzioni, lavori, osservatorio). */
export function Continua({ voci }: { voci: [string, string, string][] }) {
  return (
    <nav aria-label="Continua a leggere" className="mt-14">
      <h2 className="font-display text-xl font-semibold text-white">Continua</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {voci.map(([nome, href, riga]) => (
          <li key={href} className="rounded-lg border border-white/10 bg-surface-base p-4">
            <Link href={href} className="font-semibold text-primary-cyan underline underline-offset-4">{nome}</Link>
            <p className="mt-1 text-sm text-foreground/75">{riga}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Pagina in bozza (anteprima di Vercel): non si indicizza e lo dice. */
export function BannerBozza() {
  return <p role="status" className="mb-6 rounded border border-amber-400/70 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">Anteprima: pagina non ancora pubblicata, non indicizzata.</p>;
}

/** Foto di Ivano: il segnaposto finché non arriva una foto vera (public/ivano-foto.jpg). */
export function FotoIvano({ vera }: { vera: boolean }) {
  if (vera) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/ivano-foto.jpg" alt="Ivano Sciretta" width={160} height={160} className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40" />;
  }
  return (
    <div role="img" aria-label="Qui andrà una foto di Ivano Sciretta" className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-white/30 bg-surface-low font-display text-4xl font-semibold text-white/70 sm:h-40 sm:w-40">IS</div>
  );
}
