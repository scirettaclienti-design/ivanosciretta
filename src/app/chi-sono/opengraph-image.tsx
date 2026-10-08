import { ogImmagine, ogSize } from "@/lib/og";
export const alt = "Ivano Sciretta · Costruisco strumenti AI per aziende vere";
export const size = ogSize;
export const contentType = "image/png";
export default function Image() {
  return ogImmagine("Costruisco strumenti AI per aziende vere", "Costruzione, tecnica e bellezza — non magia per pigri.", "Chi sono");
}
