import type { Metadata } from "next";
import Link from "next/link";
import { Cornice, H1, InBreve } from "@/components/pagine/Cornice";
import { osservatorio } from "@/lib/sito";

export const revalidate = 600;
export const metadata: Metadata = {
  title: "Osservatorio · come si presentano online le aziende italiane",
  description: "Letture pubbliche, con soli numeri aggregati, di come si presentano online le aziende italiane di un settore. Primo settore: i frantoi.",
  alternates: { canonical: "/osservatorio" },
};

export default async function Indice() {
  const o = await osservatorio("olio");
  return (
    <Cornice>
      <H1>Osservatorio</H1>
      <InBreve>Come si presentano online le aziende italiane, settore per settore: soli numeri aggregati, con metodo e limiti scritti. Di Ivano Sciretta.</InBreve>
      <ul className="mt-8 space-y-3 text-lg">
        <li>{o ? <Link href="/osservatorio/olio" className="text-primary-cyan underline underline-offset-4">Frantoi · {o.dati.mese} ({o.dati.campione.aziende} frantoi, {o.dati.campione.regioni} regioni)</Link> : <span className="text-foreground/60">Frantoi · in preparazione</span>}</li>
      </ul>
    </Cornice>
  );
}
