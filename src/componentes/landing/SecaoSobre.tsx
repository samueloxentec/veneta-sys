"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";
import { StaggerContainer, StaggerItem } from "@/componentes/animacoes/StaggerContainer";

const estatisticas = [
  { valor: "15+", rotulo: "Técnicas" },
  { valor: "50+", rotulo: "Workshops" },
  { valor: "4", rotulo: "Países" },
  { valor: "200+", rotulo: "Artesãos Formados" },
];

export function SecaoSobre() {
  return (
    <ScrollFadeSection
      id="sobre"
      backgroundImage="/veneta_images/veneta_2.jpg"
      prioridade={1}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span className="text-xs text-[#AFAFAF] uppercase tracking-[0.3em] font-mono mb-4 block">─── Sobre nós</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] leading-tight text-white mb-6">
              Tradição veneziana com <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] to-[#AFAFAF]">excelência contemporânea</span>
            </h2>
            <p className="text-[#8a8a8a] leading-relaxed mb-4">
              A Veneta Mater preserva e transmite a arte decorativa veneziana através de workshops, formações e eventos especializados. Trabalhamos com técnicas centenárias como stucco veneziano, marmorino, efeitos metálicos e aplicações em folha de ouro.
            </p>
            <p className="text-[#8a8a8a] leading-relaxed">
              Com atuação em Portugal, Itália, Espanha e mercados de língua inglesa, levamos a sofisticação dos acabamentos italianos a profissionais e espaços por toda a Europa.
            </p>
            {/* Tricolor italiano sutil */}
            <div className="flex gap-0 mt-8 w-12 h-[2px] overflow-hidden rounded-full">
              <div className="flex-1 bg-[#366C20]" />
              <div className="flex-1 bg-[#EAEAEC]" />
              <div className="flex-1 bg-[#97150F]" />
            </div>
          </div>
          <StaggerContainer className="grid grid-cols-2 gap-4">
            {estatisticas.map((s) => (
              <StaggerItem key={s.rotulo}>
                <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-[#252525] text-center">
                  <span className="text-3xl md:text-4xl font-bold font-[family-name:var(--fonte-titulo)] text-[#EAEAEC]">{s.valor}</span>
                  <p className="text-xs text-[#8a8a8a] mt-2 font-mono uppercase tracking-wider">{s.rotulo}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </ScrollFadeSection>
  );
}
