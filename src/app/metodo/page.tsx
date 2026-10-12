import type { Metadata } from "next";
import Image from "next/image";
import { Azione, Briciole, Continua, Cornice, Faq, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { ID_IVANO, SITO, briciole } from "@/lib/sito";

export const metadata: Metadata = {
  title: "Metodo: come funziona una scatola, dalla mappa gratuita al canone · Ivano Sciretta",
  description: "Quattro passi: la mappa gratuita, il Check 4D in 5 giorni, le mosse una alla volta, il canone dopo la consegna. Per ogni passo: cosa ricevi, quanto ci vuole, cosa decidi tu.",
  alternates: { canonical: "/metodo" },
  openGraph: { url: `${SITO}/metodo`, title: "Metodo · come funziona una scatola", description: "Mappa gratuita → Check 4D → mosse → canone. Cosa ricevi, quanto ci vuole, cosa decidi tu.", locale: "it_IT" },
};

type Passo = { n: number; nome: string; img: string; alt: string; w: number; h: number; ricevi: string; tempo: string; decidi: string };
const PASSI: Passo[] = [
  {
    n: 1,
    nome: "La mappa gratuita",
    img: "/metodo/1-mappa.jpg", w: 780, h: 1100,
    alt: "La mappa del Frantoio Dimostrativo: cosa si trova online sull'azienda, con la fonte di ogni riga. In alto la scritta «Caso dimostrativo: azienda e dati inventati».",
    ricevi: "Un link privato con quello che trova online chi ti cerca: sito e scheda Google, riga per riga, con la fonte e la prova di ogni mancanza.",
    tempo: "Pochi secondi dopo aver scritto il nome. Gratis, senza registrazione.",
    decidi: "Se ti serve guardare più a fondo. La mappa resta tua in ogni caso.",
  },
  {
    n: 2,
    nome: "Il Check 4D",
    img: "/metodo/2-check.jpg", w: 780, h: 1100,
    alt: "Il Check del Frantoio Dimostrativo in un minuto: quanto si perde ogni anno, in quanti mesi si ripaga, quanto costa partire. In alto la scritta «Caso dimostrativo».",
    ricevi: "24 punti misurati, il confronto con i 3 concorrenti più vicini, le 3 mosse da fare in ordine con costi e ritorno calcolato sui tuoi numeri, e una demo con i tuoi dati.",
    tempo: "5 giorni, con 2 telefonate da 30 minuti. Il resto lo faccio io.",
    decidi: "Se e da quale mossa partire. Se non prosegui, il piano resta tuo.",
  },
  {
    n: 3,
    nome: "Le mosse, una alla volta",
    img: "/metodo/3-mosse.jpg", w: 780, h: 380,
    alt: "Le tre mosse del caso dimostrativo su una linea del tempo: a 30, 60 e 90 giorni. I tempi sono indicativi e si fissano insieme.",
    ricevi: "Quello che hai scelto, costruito da me e consegnato. Si parte con la prima mossa; le altre vengono dopo, quando la prima rende.",
    tempo: "La prima mossa è pronta in 30 giorni. I tempi delle altre si fissano insieme.",
    decidi: "Quali mosse fare e quando. Per partire c'è un acconto del 50%; il saldo alla consegna.",
  },
  {
    n: 4,
    nome: "Il canone: un servizio, non rate",
    img: "/metodo/4-canone.jpg", w: 780, h: 390,
    alt: "La proposta della prima mossa del caso dimostrativo: acconto per partire, saldo alla consegna e canone mensile dal mese dopo la consegna.",
    ricevi: "Lo strumento resta vivo: aggiornato e curato da me, mese dopo mese. Il canone parte dal mese dopo la consegna.",
    tempo: "Ogni mese, dal mese dopo la consegna.",
    decidi: "Il canone è chiaro prima di partire: lo trovi scritto accanto a ogni mossa nel Check, insieme al costo per iniziare.",
  },
];

export default function Metodo() {
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Come funziona una scatola: dalla mappa gratuita al canone",
    description: "Quattro passi con Ivano Sciretta: la mappa gratuita, il Check 4D, le mosse, il canone.",
    inLanguage: "it",
    author: { "@id": ID_IVANO },
    step: PASSI.map((p) => ({ "@type": "HowToStep", position: p.n, name: p.nome, text: `${p.ricevi} ${p.tempo} ${p.decidi}`, url: `${SITO}/metodo#passo-${p.n}` })),
  };
  return (
    <Cornice jsonLd={[howto, briciole([["Metodo", "/metodo"]])]}>
      <Briciole voci={[["Metodo", "/metodo"]]} />
      <div className="mt-6"><H1>Come funziona una scatola: dalla mappa gratuita al canone</H1></div>
      <InBreve>
        Una scatola è un percorso in quattro passi: la mappa gratuita, il Check 4D, le mosse e il canone. A ogni passo ricevi qualcosa che puoi guardare e decidi tu se andare avanti. Gli esempi in questa pagina sono un <strong className="text-white">caso dimostrativo</strong>: azienda e dati inventati.
      </InBreve>

      <ol className="mt-10 space-y-14">
        {PASSI.map((p) => (
          <li key={p.n} id={`passo-${p.n}`}>
            <h2 className="font-display text-2xl font-semibold text-white"><span className="mr-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-cyan text-lg text-black" aria-hidden="true">{p.n}</span>{p.nome}</h2>
            <figure className="mt-5">
              <Image src={p.img} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 768px) 100vw, 672px" className="w-full max-w-md rounded-lg border border-white/10" priority={p.n === 1} />
              <figcaption className="mt-2 text-sm text-foreground/70"><span className="rounded border border-amber-400/70 bg-amber-400/10 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-300">caso dimostrativo</span> schermata da telefono</figcaption>
            </figure>
            <dl className="mt-5 space-y-3 text-lg leading-relaxed">
              <div><dt className="text-sm font-semibold uppercase tracking-wider text-primary-cyan">Cosa ricevi</dt><dd className="text-foreground/90">{p.ricevi}</dd></div>
              <div><dt className="text-sm font-semibold uppercase tracking-wider text-primary-cyan">Quanto ci vuole</dt><dd className="text-foreground/90">{p.tempo}</dd></div>
              <div><dt className="text-sm font-semibold uppercase tracking-wider text-primary-cyan">Cosa decidi tu</dt><dd className="text-foreground/90">{p.decidi}</dd></div>
            </dl>
          </li>
        ))}
      </ol>

      <H2>I prezzi</H2>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-foreground/85">
        <li><strong className="text-white">Frantoi:</strong> la mappa è gratuita; il Check 4D costa 500 €, scalati per intero dal lavoro se poi lo facciamo insieme.</li>
        <li><strong className="text-white">Botteghe ed empori:</strong> la mappa è gratuita; listino a breve.</li>
      </ul>
      <p className="mt-3 text-foreground/70">Quello che costa ogni mossa lo vedi scritto nel Check, prima di decidere.</p>

      <Faq
        domande={[
          { d: "Cos'è il Check 4D?", r: "L'analisi completa della presenza online di un'azienda: 24 punti misurati, il confronto con i 3 concorrenti più vicini, le 3 mosse da fare in ordine con costi e ritorno e una demo con i dati dell'azienda. Dura 5 giorni, con 2 telefonate da 30 minuti." },
          { d: "Posso fermarmi dopo la mappa?", r: "Sì. La mappa è gratuita e resta tua, senza obblighi. Anche il piano del Check resta tuo, se poi non prosegui." },
          { d: "Chi decide cosa si costruisce?", r: "Tu. Il Check mette le mosse in ordine e ne mostra costo e ritorno; si parte da una sola, e le altre si valutano dopo." },
          { d: "Cos'è il canone?", r: "Un servizio mensile che parte dal mese dopo la consegna: lo strumento resta vivo, aggiornato e curato. Non è una rata." },
          { d: "Come si paga la prima mossa?", r: "Un acconto del 50% per partire e il saldo alla consegna. Il Check già pagato si scala." },
        ]}
      />

      <Continua voci={[["Chi sono", "/chi-sono", "Chi costruisce, e perché puoi fidarti."], ["Soluzioni", "/soluzioni", "Il metodo applicato a frantoi e botteghe."], ["Lavori", "/lavori", "Casi veri, con il nome del cliente."]]} />
      <Azione titolo="Il primo passo è gratis" sotto="Scrivi il nome della tua azienda: 10 secondi, senza registrazione." href="/scatole" testo="Richiedi la mappa gratuita" />
    </Cornice>
  );
}
