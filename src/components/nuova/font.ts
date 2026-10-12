import { Fraunces, Instrument_Sans } from "next/font/google";

// Titoli in serif elegante, testo in grotesk. Gli stessi due per tutte le direzioni: si sceglie il tono, non il carattere.
export const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"], display: "swap" });
export const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
