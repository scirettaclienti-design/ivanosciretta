import type { Metadata } from "next";
import Link from "next/link";
import { Azione, Briciole, Continua, Cornice, Faq, FotoIvano, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { settoriConDati } from "@/data/settori";
import { CREDLY, ID_IVANO, LINKEDIN, SITO, briciole, lavori } from "@/lib/sito";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Chi è Ivano Sciretta · costruisco strumenti AI per aziende",
  description: "Ivano Sciretta, pugliese con base a Roma: dal marketing e dalla grafica a costruire da sé strumenti AI per frantoi, botteghe ed empori. Certificazioni su Credly, lavori veri, metodo scritto.",
  alternates: { canonical: "/chi-sono" },
  openGraph: { type: "profile", url: `${SITO}/chi-sono`, title: "Chi è Ivano Sciretta", description: "Costruisco strumenti AI per aziende vere. Costruzione, tecnica e bellezza — non magia per pigri.", locale: "it_IT" },
};

// Le certificazioni pubbliche sul profilo Credly, controllate il 13/10/2026: 9 di Google Career Certificates e 5 di IBM SkillsBuild.
const CERTIFICAZIONI_CONTROLLATE = { totale: 14, google: 9, ibm: 5, il: "13 ottobre 2026" };
const ESEMPI = ["Google AI Essentials", "Google Prompting Essentials", "Google Data Analytics", "Google Digital Marketing & E-commerce", "IBM AI Fundamentals", "IBM Development with AI and Web Services"];

export default async function ChiSono() {
  const settori = await settoriConDati();
  const analizzati = settori.filter((x) => !x.bozza).reduce((n, x) => n + x.o.dati.campione.aziende, 0);
  // La foto vera arriva da Ivano (public/ivano-foto.jpg): finché non c'è, un segnaposto.
  const fotoVera = existsSync(join(process.cwd(), "public", "ivano-foto.jpg"));
  const pagina = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITO}/chi-sono`,
    name: "Chi è Ivano Sciretta",
    inLanguage: "it",
    mainEntity: { "@id": ID_IVANO },
  };
  return (
    <Cornice jsonLd={[pagina, briciole([["Chi sono", "/chi-sono"]])]}>
      <Briciole voci={[["Chi sono", "/chi-sono"]]} />
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <FotoIvano vera={fotoVera} />
        <H1>Ivano Sciretta · costruisco strumenti AI per aziende vere</H1>
      </div>
      <InBreve>
        Ivano Sciretta è un costruttore di strumenti AI per aziende: pugliese con base a Roma, viene dal marketing e dalla grafica e dal 2025 costruisce da sé, con l&apos;AI, mappe, analisi e strumenti su misura per frantoi, botteghe ed empori. È iscritto a Ingegneria informatica, curriculum AI &amp; Data Science.
      </InBreve>

      <blockquote className="mt-8 rounded-lg border border-white/10 bg-surface-low px-5 py-6 font-display text-2xl leading-snug text-white md:text-3xl">
        Costruzione, tecnica e bellezza — non magia per pigri.
        <footer className="mt-3 text-sm font-normal text-foreground/70">Il modo in cui lavoro, in una riga.</footer>
      </blockquote>

      <H2>1. Da grafico e marketing a costruttore con l&apos;AI</H2>
      <p className="mt-3 text-lg leading-relaxed text-foreground/85">
        Vengo dal marketing e dalla grafica: il mio mestiere era capire cosa cerca chi compra e come mostrarglielo. Dal 2025 costruisco io stesso, con l&apos;AI, quello che prima avrei solo disegnato. Tra dicembre 2025 e gennaio 2026 ho preso {CERTIFICAZIONI_CONTROLLATE.totale} certificazioni pubbliche su Credly e intanto studio: sono iscritto a Ingegneria informatica.
      </p>

      <H2>2. Cosa costruisco oggi</H2>
      <ul className="mt-4 space-y-3 text-lg leading-relaxed text-foreground/85">
        <li><strong className="text-white">Mappe e Check 4D</strong> per frantoi, botteghe ed empori: cosa trova online chi li cerca e cosa fare, in ordine. <Link href="/soluzioni" className="text-primary-cyan underline underline-offset-4">Le soluzioni per settore</Link>.</li>
        <li><strong className="text-white">Un motore di valutazione immobiliare</strong> per un&apos;agenzia di Roma. <Link href="/lavori/casa-incontro-valutazione" className="text-primary-cyan underline underline-offset-4">Casa Incontro</Link>.</li>
        <li><strong className="text-white">Un sistema di coupon anonimi</strong> contro il bullismo, per i locali Smashtag. <Link href="/lavori/smasha-il-bullismo" className="text-primary-cyan underline underline-offset-4">Smasha il Bullismo</Link>.</li>
        <li><strong className="text-white">Siti ed esperienze</strong> con l&apos;AI dentro: <Link href="/lavori/lumina-xp" className="text-primary-cyan underline underline-offset-4">Lumina XP</Link>, <Link href="/lavori/mykonos-made-in-italy" className="text-primary-cyan underline underline-offset-4">Mykonos Made in Italy</Link>. <Link href="/lavori" className="underline underline-offset-4">Tutti i lavori</Link>.</li>
      </ul>

      <H2>3. Come lavoro</H2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
        <li><strong className="text-white">Da solo, dall&apos;idea alla messa online:</strong> ogni strumento lo costruisco io.</li>
        <li><strong className="text-white">Si parte da qualcosa che puoi guardare gratis:</strong> la mappa della tua azienda.</li>
        <li><strong className="text-white">Ogni numero ha la sua fonte e ogni mancanza la sua prova.</strong> Se non l&apos;ho letta, non la scrivo.</li>
        <li><strong className="text-white">Un servizio, non una magia:</strong> dopo la consegna c&apos;è un canone, non rate.</li>
      </ol>
      <p className="mt-3"><Link href="/metodo" className="text-primary-cyan underline underline-offset-4">Il metodo, passo per passo →</Link></p>

      <H2>4. Perché fidarsi</H2>
      <p className="mt-3 text-lg text-foreground/85">Non te lo chiedo sulla parola: queste prove le puoi aprire tu.</p>
      <ul className="mt-4 space-y-3 text-lg leading-relaxed text-foreground/85">
        <li>
          <a href={CREDLY} className="text-primary-cyan underline underline-offset-4" rel="me">{CERTIFICAZIONI_CONTROLLATE.totale} certificazioni pubbliche su Credly</a>: {CERTIFICAZIONI_CONTROLLATE.google} di Google (Career Certificates) e {CERTIFICAZIONI_CONTROLLATE.ibm} di IBM (SkillsBuild), tra cui {ESEMPI.join(", ")}. Controllate il {CERTIFICAZIONI_CONTROLLATE.il}.
        </li>
        <li><a href={LINKEDIN} className="text-primary-cyan underline underline-offset-4" rel="me">Il profilo LinkedIn</a>.</li>
        <li><strong className="text-white">Studi:</strong> iscritto al corso di laurea in Ingegneria informatica (L-8), curriculum AI &amp; Data Science. Non sono laureato: sto studiando.</li>
        <li><strong className="text-white">Lavori con il nome del cliente:</strong> {lavori.filter((l) => !l.permesso?.startsWith("caso dimostrativo")).map((l, i, t) => (<span key={l.slug}><Link href={`/lavori/${l.slug}`} className="underline underline-offset-4">{l.cliente.replace(/ \(progetto mio\)/, "")}</Link>{i < t.length - 1 ? ", " : "."}</span>))}</li>
        <li><strong className="text-white">Numeri che si possono rifare:</strong> {analizzati ? `ho letto ${analizzati} aziende, una per una, e ` : ""}ho scritto metodo e limiti in ogni <Link href="/osservatorio" className="text-primary-cyan underline underline-offset-4">osservatorio</Link>. Nessun nome di azienda accanto a una mancanza.</li>
        <li><strong className="text-white">Cosa non faccio:</strong> testimonianze inventate, risultati promessi, numeri non misurati.</li>
      </ul>

      <Faq
        domande={[
          { d: "Chi è Ivano Sciretta?", r: "Un costruttore di strumenti AI per aziende, pugliese con base a Roma. Viene dal marketing e dalla grafica, dal 2025 costruisce da sé con l'AI ed è iscritto a Ingegneria informatica, curriculum AI & Data Science." },
          { d: "Ha una laurea?", r: "No: è iscritto al corso di laurea in Ingegneria informatica (L-8), curriculum AI & Data Science, e sta studiando." },
          { d: "Come si verificano le sue certificazioni?", r: `Sono pubbliche su Credly (credly.com/users/ivano-sciretta): ${CERTIFICAZIONI_CONTROLLATE.totale} certificazioni, ${CERTIFICAZIONI_CONTROLLATE.google} di Google e ${CERTIFICAZIONI_CONTROLLATE.ibm} di IBM, controllate il ${CERTIFICAZIONI_CONTROLLATE.il}.` },
          { d: "Cosa costruisce?", r: "Mappe e Check 4D per frantoi, botteghe ed empori, un motore di valutazione immobiliare, un sistema di coupon anonimi e siti con esperienze costruite su misura. L'elenco con i clienti è nella pagina Lavori." },
          { d: "Lavora da solo o con un team?", r: "Costruisce ogni strumento da sé, dall'idea al codice alla messa online." },
          { d: "Come si lavora con lui?", r: "Si parte dalla mappa gratuita della propria azienda, poi c'è il Check 4D con le mosse in ordine, poi si sceglie cosa far costruire. Il metodo è spiegato nella pagina Metodo." },
        ]}
      />

      <Continua voci={[["Metodo", "/metodo", "Come funziona una scatola, passo per passo."], ["Soluzioni", "/soluzioni", "Frantoi, botteghe ed empori: mercato, struttura, mosse."], ["Lavori", "/lavori", "I casi, con problema e cosa ho costruito."]]} />
      <Azione titolo="Vuoi vedere dove si trova la tua azienda?" sotto="Scrivi il nome: 10 secondi, gratis, senza registrazione." href="/scatole" testo="Richiedi la mappa gratuita" />
    </Cornice>
  );
}
