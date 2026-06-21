"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";
import { StaggerContainer, StaggerItem } from "@/componentes/animacoes/StaggerContainer";

const parceiros = [
  "Colorificio Veneziano",
  "Atelier Marmorino",
  "Istinto Veneziano",
  "Stucco Italiano",
  "Valpaint",
  "Oikos Decorativi",
  "La Calce del Brenta",
  "Arte Veneziana",
];

export function SecaoParceiros() {
  return (
    <ScrollFadeSection
      id="parceiros"
      backgroundImage="/veneta_images/veneta_6.jpg"
      prioridade={5}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs text-[#AFAFAF] uppercase tracking-[0.3em] font-mono mb-4 block">─── Parceiros</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] leading-tight text-white">
            Marcas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] to-[#AFAFAF]">nos inspiram</span>
          </h2>
          <p className="text-[#8a8a8a] mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Trabalhamos com fornecedores e produtores italianos de referência para garantir materiais de qualidade excepcional.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {parceiros.map((p) => (
            <StaggerItem key={p}>
              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-md border border-[#252525] text-center hover:border-[#5A5A5A] transition-all duration-300">
                <span className="text-sm font-semibold font-[family-name:var(--fonte-titulo)] text-[#AFAFAF]">{p}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <a
            href="#contato"
            className="inline-flex px-6 py-3 rounded-full border border-[#EAEAEC]/30 text-[#EAEAEC] text-sm hover:bg-[#EAEAEC] hover:text-black font-medium transition-all"
          >
            Seja Parceiro →
          </a>
        </div>
      </div>
    </ScrollFadeSection>
  );
}
