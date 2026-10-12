import type { Metadata } from "next";
import Link from "next/link";
import { Briciole, Continua, Cornice, H1, InBreve } from "@/components/pagine/Cornice";
import { SETTORI } from "@/data/settori";
import { briciole, osservatorio } from "@/lib/sito";

export const revalidate = 600;
export const metadata: Metadata = {
  title: "Osservatorio · come si presentano online le aziende italiane",
  description: "Letture pubbliche, con soli numeri aggregati e anonimi, di come si presentano online le aziende italiane di un settore: frantoi e botteghe ed empori.",
  alternates: { canonical: "/osservatorio" },
};

export default async function Indice() {
  const attivi = SETTORI.filter((s) => s.stato === "attivo");
  const dati = await Promise.all(attivi.map(async (s) => ({ s, o: await osservatorio(s.slug) })));
  return (
    <Cornice jsonLd={[briciole([["Osservatorio", "/osservatorio"]])]}>
      <Briciole voci={[["Osservatorio", "/osservatorio"]]} />
      <div className="mt-6"><H1>Osservatorio</H1></div>
      <InBreve>Come si presentano online le aziende italiane, settore per settore: soli numeri aggregati e anonimi, con metodo e limiti scritti. Di Ivano Sciretta.</InBreve>
      <ul className="mt-8 space-y-3 text-lg">
        {dati.map(({ s, o }) => (
          <li key={s.slug}>
            {o ? (
              <Link href={`/osservatorio/${s.slug}`} className="text-primary-cyan underline underline-offset-4">{s.nome} · {o.dati.mese} ({o.dati.campione.aziende} aziende, {o.dati.campione.regioni} regioni)</Link>
            ) : (
              <span className="text-foreground/70">{s.nome}: in arrivo</span>
            )}
          </li>
        ))}
      </ul>
      <Continua voci={[["Soluzioni", "/soluzioni", "Mercato, struttura e mosse per settore."], ["Metodo", "/metodo", "Come si fanno queste letture."], ["Lavori", "/lavori", "Casi veri, con il nome del cliente."]]} />
    </Cornice>
  );
}
