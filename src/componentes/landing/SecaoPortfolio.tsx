"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";
import { StaggerContainer, StaggerItem } from "@/componentes/animacoes/StaggerContainer";

const projetos = [
  { titulo: "Restauro Decorativo — Palácio de Lisboa", categoria: "Restauro", cor: "from-[#AFAFAF]/30 to-[#252525]" },
  { titulo: "Workshop Stucco Veneziano — Milão 2025", categoria: "Workshop", cor: "from-[#366C20]/50 to-[#252525]" },
  { titulo: "Acabamento Folha de Ouro — Hotel Boutique Porto", categoria: "Projecto", cor: "from-[#97150F]/40 to-[#252525]" },
  { titulo: "Formação Intensiva Marmorino — Barcelona", categoria: "Formação", cor: "from-[#5A5A5A] to-[#252525]" },
  { titulo: "Projecto Residencial Premium — Cascais", categoria: "Projecto", cor: "from-[#366C20]/30 to-[#5A5A5A]/30" },
  { titulo: "Demonstração ao Vivo — Feira de Design Veneza", categoria: "Evento", cor: "from-[#97150F]/30 to-[#5A5A5A]/30" },
];

export function SecaoPortfolio() {
  return (
    <ScrollFadeSection
      id="portfolio"
      backgroundImage="/veneta_images/veneta_5.jpg"
      prioridade={4}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#AFAFAF] uppercase tracking-[0.3em] font-mono mb-4 block">─── Portfólio</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] leading-tight text-white">
            Trabalhos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] to-[#AFAFAF]">excelência</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#5A5A5A] mt-6" />
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projetos.map((p) => (
            <StaggerItem key={p.titulo}>
              <div className="rounded-2xl overflow-hidden group cursor-pointer">
                <div className={`h-44 bg-gradient-to-br ${p.cor} relative`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver Projecto →</span>
                  </div>
                </div>
                <div className="p-5 bg-black/40 backdrop-blur-md border border-[#252525] border-t-0 rounded-b-2xl">
                  <span className="text-[10px] text-[#AFAFAF] uppercase tracking-wider font-mono">{p.categoria}</span>
                  <h3 className="text-sm font-semibold text-white mt-1 group-hover:text-[#EAEAEC] transition-colors">{p.titulo}</h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </ScrollFadeSection>
  );
}
