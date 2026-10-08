import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cornice, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { ID_IVANO, SITO, lavori } from "@/lib/sito";

export const dynamicParams = false;
export function generateStaticParams() {
  return lavori.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = lavori.find((x) => x.slug === slug);
  if (!l) return {};
  return {
    title: `${l.cliente} · Lavori di Ivano Sciretta`,
    description: `${l.problema} Cosa ho costruito: ${l.costruito[0]}`.slice(0, 160),
    alternates: { canonical: `/lavori/${l.slug}` },
    openGraph: { url: `${SITO}/lavori/${l.slug}`, title: `${l.cliente} · Ivano Sciretta`, description: l.problema, locale: "it_IT", ...(l.immagine ? { images: [{ url: l.immagine, alt: l.alt ?? "" }] } : {}) },
  };
}

export default async function Lavoro({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = lavori.find((x) => x.slug === slug);
  if (!l) notFound();
  const opera = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: l.cliente,
    url: `${SITO}/lavori/${l.slug}`,
    about: l.settore,
    abstract: l.problema,
    description: l.costruito.join(" "),
    creator: { "@id": ID_IVANO },
    ...(l.immagine ? { image: `${SITO}${l.immagine}` } : {}),
    ...(l.link ? { sameAs: l.link } : {}),
  };
  return (
    <Cornice jsonLd={[opera]}>
      <p className="text-sm"><Link href="/lavori" className="text-foreground/60 underline underline-offset-4">← Tutti i lavori</Link></p>
      <H1>{l.cliente}</H1>
      <p className="mt-2 text-foreground/60">{l.settore}</p>
      <InBreve>{l.problema}</InBreve>
      {l.immagine && (
        <Image src={l.immagine} alt={l.alt ?? ""} width={1280} height={800} priority className="mt-8 max-h-[70vh] w-full rounded-lg border border-white/10 object-contain object-top" />
      )}
      <H2>Cosa ho costruito</H2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
        {l.costruito.map((c) => <li key={c}>{c}</li>)}
      </ol>
      {l.risultato && (
        <>
          <H2>Risultato misurato</H2>
          <p className="mt-3 text-lg text-foreground/85">{l.risultato}</p>
        </>
      )}
      {(l.link || l.link_mappa) && (
        <>
          <H2>Vedilo dal vivo</H2>
          <ul className="mt-3 space-y-2 text-lg">
            {l.link_mappa && <li><a href={l.link_mappa} className="text-primary-cyan underline underline-offset-4">La mappa di esempio</a></li>}
            {l.link && <li><a href={l.link} className="text-primary-cyan underline underline-offset-4">{l.link_mappa ? "Il Check di esempio" : l.link.replace(/^https?:\/\/(www\.)?/, "")}</a></li>}
          </ul>
        </>
      )}
      <p className="mt-12 text-foreground/70">Costruito da <Link href="/chi-sono" className="underline underline-offset-4">Ivano Sciretta</Link>.</p>
    </Cornice>
  );
}
