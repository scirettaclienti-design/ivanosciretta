import { notFound } from "next/navigation";
import { Direzione } from "@/components/nuova/Direzione";
import { DIREZIONI, type Tema } from "@/components/nuova/temi";

export const dynamicParams = false;
export function generateStaticParams() {
  return DIREZIONI.map((direzione) => ({ direzione }));
}

export default async function Pagina({ params, searchParams }: { params: Promise<{ direzione: string }>; searchParams: Promise<{ t?: string }> }) {
  const { direzione } = await params;
  const { t } = await searchParams;
  if (!DIREZIONI.includes(direzione as Tema["slug"])) notFound();
  return <Direzione slug={direzione as Tema["slug"]} variante={t === "b" ? "b" : "a"} />;
}
