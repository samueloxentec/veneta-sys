"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";

export function SecaoTrabalheConosco() {
  return (
    <ScrollFadeSection
      backgroundImage="/veneta_images/veneta_1.jpg"
      prioridade={6}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="text-xs text-[#AFAFAF] uppercase tracking-[0.3em] font-mono mb-4 block">─── Carreiras</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] leading-tight text-white mb-6">
              Junte-se à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] to-[#AFAFAF]">
                nossa equipa
              </span>
            </h2>
            <p className="text-[#8a8a8a] leading-relaxed mb-8">
              Procuramos profissionais apaixonados por arte, acabamentos decorativos e excelência artesanal. Se domina técnicas de aplicação ou quer aprender com os melhores mestres italianos, este é o seu lugar.
            </p>
            <div className="space-y-3 text-[#8a8a8a]">
              <p>🎨 Trabalho com técnicas centenárias venezianas</p>
              <p>🌍 Projectos internacionais em 4 países</p>
              <p>🤝 Formação contínua com mestres artesãos</p>
              <p>💡 Participação em eventos e feiras europeias</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-[#252525]">
            <h3 className="text-lg font-semibold text-white mb-6 font-[family-name:var(--fonte-titulo)]">
              Envie o seu Currículo
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nome Completo"
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#252525] text-white placeholder:text-[#5A5A5A] focus:border-[#AFAFAF]/50 focus:outline-none transition-colors text-sm"
              />
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#252525] text-white placeholder:text-[#5A5A5A] focus:border-[#AFAFAF]/50 focus:outline-none transition-colors text-sm"
              />
              <select
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#252525] text-[#AFAFAF] focus:border-[#AFAFAF]/50 focus:outline-none transition-colors text-sm appearance-none"
                style={{ colorScheme: "dark" }}
              >
                <option className="bg-[#0a0a0a] text-[#AFAFAF]">Aplicação de Técnicas Decorativas</option>
                <option className="bg-[#0a0a0a] text-[#AFAFAF]">Formação e Ensino</option>
                <option className="bg-[#0a0a0a] text-[#AFAFAF]">Gestão de Eventos</option>
                <option className="bg-[#0a0a0a] text-[#AFAFAF]">Comercial e Parcerias</option>
                <option className="bg-[#0a0a0a] text-[#AFAFAF]">Logística e Operações</option>
              </select>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#EAEAEC] hover:bg-[#d0d0d2] text-black font-semibold transition-all text-sm"
              >
                Enviar Candidatura
              </button>
            </form>
          </div>
        </div>
      </div>
    </ScrollFadeSection>
  );
}
