import { ogImmagine, ogSize } from "@/lib/og";
import { lavori } from "@/lib/sito";
export const alt = "Lavori di Ivano Sciretta";
export const size = ogSize;
export const contentType = "image/png";
export default function Image() {
  return ogImmagine(`${lavori.length} strumenti costruiti per aziende vere`, "Problema, cosa ho costruito, schermate reali.", "Lavori");
}
