import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Azione, BannerBozza, Briciole, Continua, Cornice, Faq, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { Barre } from "@/components/pagine/Grafici";
import { SETTORI, domande, settore as trovaSettore, strati } from "@/data/settori";
import { ID_IVANO, SITO, briciole, lavori, osservatorio } from "@/lib/sito";

// Si rigenera da sola (10 minuti) quando si pubblica l'osservatorio; i casi arrivano da lavori.json.
export const revalidate = 600;
export const dynamicParams = false;
export function generateStaticParams() {
  return SETTORI.filter((s) => s.stato === "attivo").map((s) => ({ settore: s.slug }));
}

/** L'etichetta del caso dimostrativo: uguale in ogni punto della pagina. */
function Dimostrativo() {
  return <span className="inline-block rounded border border-amber-400/70 bg-amber-400/10 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-300">caso dimostrativo</span>;
}

async function carica(slug: string) {
  const s = trovaSettore(slug);
  const o = s && s.stato === "attivo" ? await osservatorio(s.slug) : null;
  return s && o ? { s, o } : null;
}

const manca = (d: { misure: { id: string; perc: number }[] }, id: string) => d.misure.find((x) => x.id === id)?.perc;

export async function generateMetadata({ params }: { params: Promise<{ settore: string }> }): Promise<Metadata> {
  const { settore } = await params;
  const x = await carica(settore);
  if (!x) return { robots: { index: false } };
  const d = x.o.dati;
  const dato = x.s.slug === "olio" ? `pagina per buyer non trovata nel ${manca(d, "buyer")}%, annata non trovata nel ${manca(d, "annata")}%` : `scheda Google senza link al sito nel ${manca(d, "g_sito")}%, prezzi non trovati sul sito nel ${manca(d, "prezzi")}%`;
  return {
    title: `${x.s.titolo} · Ivano Sciretta`,
    description: `${d.campione.aziende} ${x.s.chi} analizzati: ${dato}. Il mercato, la struttura e le mosse; domande frequenti.`,
    alternates: { canonical: `/soluzioni/${x.s.slug}` },
    openGraph: { url: `${SITO}/soluzioni/${x.s.slug}`, title: x.s.titolo, locale: "it_IT" },
    ...(x.o.stato === "bozza" ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Soluzione({ params }: { params: Promise<{ settore: string }> }) {
  const { settore } = await params;
  const x = await carica(settore);
  if (!x) notFound();
  const { s, o } = x;
  const d = o.dati;
  const [mercato, struttura, soluzioni] = strati(s.slug, d);
  const casi = lavori.filter((l) => l.settori?.includes(s.slug));
  const url = `${SITO}/soluzioni/${s.slug}`;
  const faq = domande(s.slug, d);
  const breve =
    s.slug === "olio"
      ? `Aiuto i frantoi a farsi trovare e scegliere da chi compra. Ho letto ${d.campione.aziende} frantoi in ${d.campione.regioni} regioni: nelle pagine lette non ho trovato una pagina per i buyer nel ${manca(d, "buyer")}% dei siti, e gli assistenti AI ne nominano il ${d.ai.perc}%. Qui trovi il mercato, la struttura e le mosse, con una mappa e un Check di esempio (caso dimostrativo).`
      : `Aiuto botteghe ed empori a farsi scegliere prima che il cliente entri. Ho letto ${d.campione.aziende} botteghe ed empori in ${d.campione.regioni} regioni: la scheda Google non porta a un sito nel ${manca(d, "g_sito")}% dei casi e nelle pagine dei siti letti non ho trovato i prezzi nel ${manca(d, "prezzi")}%. Qui trovi il mercato, la struttura e le mosse.`;
  const servizio = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servizio`,
    name: s.titolo,
    url,
    serviceType: "Analisi della presenza online e strumenti AI su misura",
    description: breve,
    areaServed: { "@type": "Country", name: "Italia" },
    audience: { "@type": "Audience", audienceType: s.chi },
    provider: { "@id": ID_IVANO },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Le mosse", itemListElement: (soluzioni.mosse ?? []).map((m) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: m.nome, description: m.riga } })) },
  };
  return (
    <Cornice jsonLd={[servizio, briciole([["Soluzioni", "/soluzioni"], [s.nome, `/soluzioni/${s.slug}`]])]}>
      {o.stato === "bozza" && <BannerBozza />}
      <Briciole voci={[["Soluzioni", "/soluzioni"], [s.nome, `/soluzioni/${s.slug}`]]} />
      <span hidden data-calcolato={d.calcolato_il}>{d.calcolato_il}</span>
      <div className="mt-6"><H1>{s.titolo}</H1></div>
      <InBreve>{breve}</InBreve>

      <H2>1. Il mercato</H2>
      <p className="mt-3 text-lg leading-relaxed text-foreground/85">{mercato.riga}</p>
      <Barre
        titolo={`Cosa non si trova (${s.slug === "olio" ? `su ${d.campione.siti_letti} siti letti per intero` : `su ${d.campione.siti_letti} siti letti per intero e ${d.campione.aziende} schede Google`}, ${d.mese})`}
        max={100}
        barre={(mercato.numeri ?? []).map((n) => ({ etichetta: n.etichetta, valore: n.valore, testo: n.testo }))}
        nota="Numeri aggregati: nessun nome di azienda. «Non trovato» vuol dire non trovato nelle pagine lette."
      />
      <p className="mt-3"><Link href={`/osservatorio/${s.slug}`} className="text-primary-cyan underline underline-offset-4">Tutti i numeri, il metodo e i limiti nell&apos;osservatorio →</Link></p>

      <H2>2. La struttura</H2>
      <p className="mt-3 text-lg text-foreground/85">{struttura.riga}</p>
      <ul className="mt-4 space-y-3 text-lg leading-relaxed text-foreground/85">
        {(struttura.punti ?? []).map((p) => <li key={p} className="flex gap-3"><span aria-hidden="true" style={{ color: s.chiaro }}>▸</span><span>{p}</span></li>)}
      </ul>

      <H2>3. Le soluzioni</H2>
      <p className="mt-3 text-lg text-foreground/85">{soluzioni.riga}</p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {(soluzioni.mosse ?? []).map((m, i) => (
          <li key={m.nome} className="rounded-lg border border-white/10 bg-surface-base p-4" style={{ borderTop: `3px solid ${s.colore}` }}>
            <p className="font-display text-lg font-semibold text-white"><span className="mr-2 tabular-nums" style={{ color: s.chiaro }}>{i + 1}</span>{m.nome}</p>
            <p className="mt-1 text-foreground/80">{m.riga}</p>
          </li>
        ))}
      </ol>

      {s.spot && (
        <>
          <H2>In 30 secondi</H2>
          <video className="mt-4 w-full rounded-lg border border-white/10" controls preload="none" poster={s.spot.poster} playsInline>
            <source src={s.spot.mp4} type="video/mp4" />
          </video>
        </>
      )}

      <H2>Come funziona</H2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
        <li><strong className="text-white">La mappa gratuita:</strong> scrivi il nome, vedi cosa trova online chi ti cerca, con le fonti. {s.mappa ? <><a href={s.mappa} className="text-primary-cyan underline underline-offset-4">Guarda la mappa di esempio</a> <Dimostrativo />.</> : "Un esempio per questo settore è in preparazione."}</li>
        <li><strong className="text-white">Il Check 4D:</strong> le mosse in ordine, con il ritorno calcolato sui tuoi numeri. {s.check ? <><a href={s.check} className="text-primary-cyan underline underline-offset-4">Guarda il Check di esempio</a> <Dimostrativo />.</> : null} {s.prezzi}</li>
        <li><strong className="text-white">Le mosse, costruite:</strong> una alla volta, quelle che scegli tu. <Link href="/metodo" className="text-primary-cyan underline underline-offset-4">Il metodo, passo per passo</Link>.</li>
      </ol>
      {s.mappa && <p className="mt-3 text-sm text-foreground/70">Mappa e Check di esempio sono un caso dimostrativo: azienda e dati inventati.</p>}

      {casi.length > 0 && (
        <>
          <H2>Casi</H2>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2">
            {casi.map((l) => (
              <li key={l.slug} className="overflow-hidden rounded-lg border border-white/10 bg-surface-base">
                <Link href={`/lavori/${l.slug}`} className="block">
                  {l.immagine && <Image src={l.immagine} alt={l.alt ?? ""} width={640} height={400} className="aspect-[16/10] w-full object-cover object-top" />}
                  <div className="p-4">
                    {l.permesso?.startsWith("caso dimostrativo") && <p className="mb-1"><Dimostrativo /></p>}
                    <h3 className="font-display text-lg font-semibold text-white">{l.cliente}</h3>
                    <p className="mt-1 text-foreground/80">{l.problema}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <Faq domande={faq} />

      <Continua voci={[["Metodo", "/metodo", "Mappa, Check, mosse, canone."], ["Osservatorio", `/osservatorio/${s.slug}`, "I numeri, con metodo e limiti."], ["Chi sono", "/chi-sono", "Chi costruisce, e perché fidarsi."]]} />
      <Azione titolo={`Vuoi vedere dove si trova ${s.slug === "olio" ? "il tuo frantoio" : "la tua bottega"}?`} sotto="Scrivi il nome: 10 secondi, gratis, senza registrazione." href={s.ponte} testo={s.slug === "olio" ? "Richiedi la mappa del tuo frantoio" : "Richiedi la mappa della tua bottega"} colore={s.colore} />
    </Cornice>
  );
}
