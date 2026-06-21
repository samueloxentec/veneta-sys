"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";

export function SecaoCTA() {
  return (
    <ScrollFadeSection
      id="contato"
      backgroundImage="/veneta_images/veneta_2.jpg"
      prioridade={7}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center">
          {/* Fundo interno sutil */}
          <div className="absolute inset-0 bg-black/50 rounded-3xl" />
          <div className="absolute inset-0 border border-[#EAEAEC]/10 rounded-3xl" />

          {/* Linha tricolor no topo como detalhe de identidade */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex w-24 h-[2px] overflow-hidden rounded-full">
            <div className="flex-1 bg-[#366C20]" />
            <div className="flex-1 bg-[#EAEAEC]" />
            <div className="flex-1 bg-[#97150F]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] text-[#EAEAEC] leading-tight mb-6">
              Pronto para elevar os seus espaços?
            </h2>
            <p className="text-lg text-[#8a8a8a] max-w-xl mx-auto mb-10 leading-relaxed">
              Entre em contacto e descubra como a Veneta Mater pode transformar interiores com a excelência da arte decorativa italiana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@venetagroup.pt"
                className="px-10 py-4 rounded-full bg-[#EAEAEC] text-black font-semibold hover:bg-[#d0d0d2] hover:scale-105 transition-all"
              >
                Iniciar Conversa
              </a>
              <a
                href="#eventos"
                className="px-10 py-4 rounded-full border border-[#EAEAEC]/30 text-[#EAEAEC] font-medium hover:border-[#EAEAEC]/60 transition-all"
              >
                Ver Eventos
              </a>
            </div>
            <p className="mt-8 text-xs text-[#5A5A5A] font-mono">info@venetagroup.pt</p>
          </div>
        </div>
      </div>
    </ScrollFadeSection>
  );
}
