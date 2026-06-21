import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--fonte-corpo", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--fonte-titulo", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Veneta Mater — Arte Decorativa Veneziana",
  description: "Eventos, workshops e formações especializadas em técnicas decorativas italianas de alta qualidade.",
};

export default function LayoutRaiz({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-black text-[var(--cor-texto)] font-[family-name:var(--fonte-corpo)] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
