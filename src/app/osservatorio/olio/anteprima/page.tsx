import type { Metadata } from "next";
import { Osservatorio } from "@/components/pagine/Osservatorio";
import { Cornice, H1 } from "@/components/pagine/Cornice";
import { osservatorio } from "@/lib/sito";

// Anteprima della BOZZA per Ivano: si apre solo con il link firmato di Telegram (?k=…), mai indicizzata.
export const metadata: Metadata = { title: "Anteprima osservatorio (bozza)", robots: { index: false, follow: false } };

export default async function Anteprima({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  const o = k ? await osservatorio("olio", k) : null;
  if (!o)
    return (
      <Cornice>
        <H1>Link scaduto o non valido</H1>
        <p className="mt-4 text-foreground/80">L&apos;anteprima si apre solo dal link firmato arrivato su Telegram (vale 7 giorni).</p>
      </Cornice>
    );
  return (
    <>
      <div className="sticky top-0 z-50 bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-black">BOZZA · non pubblicata · si pubblica con: node scripts/osservatorio.mjs pubblica olio</div>
      <Osservatorio o={o} />
    </>
  );
}
