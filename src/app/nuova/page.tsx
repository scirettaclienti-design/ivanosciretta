import Link from "next/link";
import { DIREZIONI, TEMI } from "@/components/nuova/temi";

export default function Indice() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16" style={{ color: "#1C1A16" }}>
      <style>{`html,body{background:#F3EEE4 !important}`}</style>
      <h1 className="text-3xl font-semibold">Bozze della nuova home · passo 1</h1>
      <p className="mt-3">Solo apertura e scena della mappa, in tre direzioni. Ogni bozza ha due titoli (A e B).</p>
      <ul className="mt-8 space-y-6">
        {DIREZIONI.map((d) => (
          <li key={d}>
            <p className="text-xl font-semibold">{TEMI[d].nome}</p>
            <p className="mt-1">{TEMI[d].descr}</p>
            <p className="mt-2 flex gap-5 underline underline-offset-4">
              <Link href={`/nuova/${d}?t=a`}>Titolo A</Link>
              <Link href={`/nuova/${d}?t=b`}>Titolo B</Link>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
