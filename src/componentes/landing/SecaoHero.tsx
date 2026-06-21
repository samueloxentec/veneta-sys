"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";

export function SecaoHero() {
  return (
    <ScrollFadeSection
      id="inicio"
      backgroundImage="/veneta_images/veneta_1.jpg"
      prioridade={0}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EAEAEC]/15 bg-[#EAEAEC]/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#366C20] animate-pulse" />
          <span className="text-xs text-[#AFAFAF] tracking-wide font-mono uppercase">
            Workshops Disponíveis
          </span>
        </div>

        {/* Título */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold font-[family-name:var(--fonte-titulo)] leading-[0.95] tracking-tight mb-6">
          <span className="block text-[#EAEAEC]">A Arte da</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] via-[#AFAFAF] to-[#EAEAEC]">
            Decoração Veneziana
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg md:text-xl text-[#AFAFAF] max-w-xl mx-auto mb-12 leading-relaxed font-light">
          Eventos, workshops e formações especializadas em técnicas decorativas italianas de alta qualidade.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#servicos"
            className="px-8 py-4 rounded-full bg-[#EAEAEC] hover:bg-[#d0d0d2] text-black font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(234,234,236,0.2)]"
          >
            Explorar Serviços
          </a>
          <a
            href="#eventos"
            className="px-8 py-4 rounded-full border border-[#EAEAEC]/30 text-[#EAEAEC] hover:border-[#EAEAEC]/60 font-medium transition-all"
          >
            Próximos Eventos →
          </a>
        </div>
      </div>
    </ScrollFadeSection>
  );
}
