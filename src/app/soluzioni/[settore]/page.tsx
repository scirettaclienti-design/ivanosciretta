import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cornice, Faq, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { Barre } from "@/components/pagine/Grafici";
import { MANCA } from "@/components/pagine/Osservatorio";
import { ID_IVANO, SETTORI, SITO, dataIt, lavori, osservatorio } from "@/lib/sito";

// Si rigenera da sola (10 minuti) quando si pubblica l'osservatorio; i casi arrivano da lavori.json.
export const revalidate = 600;
export const dynamicParams = false;
export function generateStaticParams() {
  return SETTORI.map((s) => ({ settore: s.slug }));
}

async function carica(settore: string) {
  const s = SETTORI.find((x) => x.slug === settore);
  const o = s ? await osservatorio(s.slug) : null;
  return s && o ? { s, o } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ settore: string }> }): Promise<Metadata> {
  const { settore } = await params;
  const x = await carica(settore);
  if (!x) return { robots: { index: false } };
  const m = Object.fromEntries(x.o.dati.misure.map((y) => [y.id, y]));
  return {
    title: `${x.s.titolo} · Ivano Sciretta`,
    description: `${x.o.dati.campione.aziende} ${x.s.chi} analizzati: pagina per buyer non trovata nel ${m.buyer.perc}%, annata non trovata nel ${m.annata.perc}%. Mappa e Check di esempio, casi, domande frequenti.`,
    alternates: { canonical: `/soluzioni/${x.s.slug}` },
    openGraph: { url: `${SITO}/soluzioni/${x.s.slug}`, title: x.s.titolo, locale: "it_IT", ...(x.s.spot ? { images: [{ url: x.s.spot.poster }] } : {}) },
  };
}

export default async function Soluzione({ params }: { params: Promise<{ settore: string }> }) {
  const { settore } = await params;
  const x = await carica(settore);
  if (!x) notFound();
  const { s, o } = x;
  const d = o.dati;
  const m = Object.fromEntries(d.misure.map((y) => [y.id, y]));
  const casi = lavori.filter((l) => l.settori?.includes(s.slug));
  const url = `${SITO}/soluzioni/${s.slug}`;
  const domande = [
    { d: `Cosa manca di solito online ai ${s.chi}?`, r: `Su ${m.buyer.base} siti letti per intero (${d.mese}): pagina per buyer non trovata nel ${m.buyer.perc}%, annata o data di raccolta non trovata nel ${m.annata.perc}%, prezzi per formato non trovati nel ${m.prezzi_formato.perc}%.` },
    { d: "Gli assistenti AI consigliano questi produttori?", r: `A una domanda da buyer straniero, Claude e ChatGPT hanno nominato ${d.ai.nominate} aziende su ${d.ai.certe} con risultato certo (il ${d.ai.perc}%), il ${dataIt(d.ai.dal)}.` },
    { d: "Cos'è la mappa gratuita?", r: "Scrivi il nome della tua azienda: in pochi secondi vedi cosa trova online chi ti cerca prima di comprare, con le fonti. Gratis, senza registrazione." },
    { d: "Cos'è il Check 4D?", r: "L'analisi completa: le mosse in ordine, con il ritorno calcolato sui tuoi numeri e la pagina «dopo» già pronta da sfogliare. Il Check di esempio mostra com'è fatto." },
    { d: "I dati delle aziende sono pubblici?", r: "No: qui ci sono solo numeri aggregati e un caso dimostrativo con azienda e dati inventati. Nessun nome accanto a una mancanza." },
  ];
  const servizio = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.titolo,
    url,
    serviceType: "Analisi della presenza online e strumenti AI su misura",
    areaServed: { "@type": "Country", name: "Italia" },
    audience: { "@type": "Audience", audienceType: s.chi },
    provider: { "@type": "Person", "@id": ID_IVANO, name: "Ivano Sciretta" },
  };
  const briciole = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Soluzioni", item: `${SITO}/soluzioni` },
      { "@type": "ListItem", position: 2, name: s.nome, item: url },
    ],
  };
  return (
    <Cornice jsonLd={[servizio, briciole]}>
      <p className="text-sm"><Link href="/soluzioni" className="text-foreground/60 underline underline-offset-4">← Soluzioni</Link></p>
      <span hidden data-calcolato={d.calcolato_il}>{d.calcolato_il}</span>
      <div className="mt-2"><H1>{s.titolo}</H1></div>
      <InBreve>
        Ho analizzato {d.campione.aziende} {s.chi} in {d.campione.regioni} regioni: pagina per buyer non trovata nel {m.buyer.perc}% dei siti e l&apos;AI ne nomina il {d.ai.perc}%. Qui trovi una mappa e un Check di esempio, e come si parte.
      </InBreve>

      <H2>Il problema, in numeri</H2>
      <Barre
        titolo={`Cosa non si trova sui siti (su ${m.buyer.base} letti per intero, ${d.mese})`}
        max={100}
        barre={["buyer", "annata", "prezzi_formato"].map((id) => ({ etichetta: MANCA[id], valore: m[id].perc, testo: `${m[id].perc}%` }))}
        nota="Numeri aggregati: nessun nome di azienda."
      />
      <p className="mt-3"><Link href={`/osservatorio/${s.slug}`} className="text-primary-cyan underline underline-offset-4">Tutti i numeri, il metodo e i limiti nell&apos;osservatorio →</Link></p>

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
        <li><strong className="text-white">La mappa gratuita:</strong> scrivi il nome, vedi cosa trova online chi ti cerca, con le fonti. <a href={s.mappa} className="text-primary-cyan underline underline-offset-4">Guarda la mappa di esempio</a>.</li>
        <li><strong className="text-white">Il Check 4D:</strong> le mosse in ordine, con il ritorno calcolato sui tuoi numeri. <a href={s.check} className="text-primary-cyan underline underline-offset-4">Guarda il Check di esempio</a>.</li>
        <li><strong className="text-white">Le mosse, costruite:</strong> pagina per i buyer, scheda del prodotto in più lingue, materiali per chi rivende.</li>
      </ol>
      <p className="mt-3 text-sm text-foreground/60">Mappa e Check di esempio sono un caso dimostrativo: azienda e dati inventati.</p>

      {casi.length > 0 && (
        <>
          <H2>Casi</H2>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2">
            {casi.map((l) => (
              <li key={l.slug} className="overflow-hidden rounded-lg border border-white/10 bg-surface-base">
                <Link href={`/lavori/${l.slug}`} className="block">
                  {l.immagine && <Image src={l.immagine} alt={l.alt ?? ""} width={640} height={400} className="aspect-[16/10] w-full object-cover object-top" />}
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-white">{l.cliente}</h3>
                    <p className="mt-1 text-foreground/80">{l.problema}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <Faq domande={domande} />

      <section className="mt-14 rounded-lg border border-primary-cyan/40 bg-surface-low p-6 text-center">
        <p className="font-display text-2xl font-semibold text-white">Vuoi vedere dove si trova la tua azienda?</p>
        <p className="mt-2 text-foreground/80">Scrivi il nome: 10 secondi, gratis.</p>
        <a href={s.ponte} className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-primary-cyan px-6 font-semibold text-black">Scrivi il nome</a>
      </section>
    </Cornice>
  );
}
