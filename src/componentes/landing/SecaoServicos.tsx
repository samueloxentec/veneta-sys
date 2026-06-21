"use client";

import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";
import { StaggerContainer, StaggerItem } from "@/componentes/animacoes/StaggerContainer";

const servicos = [
  {
    icone: "🎨",
    titulo: "Workshops de Técnicas Venezianas",
    descricao: "Formações práticas em stucco veneziano, marmorino, velatura e efeitos metálicos, conduzidas por mestres artesãos italianos.",
  },
  {
    icone: "🏛️",
    titulo: "Consultoria em Decoração",
    descricao: "Assessoria especializada para projectos residenciais e comerciais com acabamentos decorativos de tradição italiana.",
  },
  {
    icone: "🎓",
    titulo: "Formações Especializadas",
    descricao: "Cursos intensivos para profissionais da construção e decoração que desejam dominar técnicas de acabamento premium.",
  },
  {
    icone: "🖼️",
    titulo: "Projectos Personalizados",
    descricao: "Execução de acabamentos decorativos sob medida — da concepção à aplicação final em espaços de alta exigência.",
  },
  {
    icone: "🌍",
    titulo: "Eventos Internacionais",
    descricao: "Demonstrações, encontros e feiras em cidades europeias para promover as técnicas decorativas venezianas.",
  },
  {
    icone: "🤝",
    titulo: "Parcerias Comerciais",
    descricao: "Representação de produtos e materiais italianos de referência para profissionais do sector decorativo.",
  },
];

export function SecaoServicos() {
  return (
    <ScrollFadeSection
      id="servicos"
      backgroundImage="/veneta_images/veneta_3.jpg"
      prioridade={2}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#AFAFAF] uppercase tracking-[0.3em] font-mono mb-4 block">─── Serviços</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] leading-tight text-white">
            O que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] to-[#AFAFAF]">oferecemos</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#5A5A5A] mt-6" />
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicos.map((s) => (
            <StaggerItem key={s.titulo}>
              <div className="h-full p-7 rounded-2xl bg-black/40 backdrop-blur-md border border-[#252525] hover:border-[#5A5A5A] transition-colors duration-500 group">
                <span className="text-3xl mb-5 block">{s.icone}</span>
                <h3 className="text-lg font-semibold font-[family-name:var(--fonte-titulo)] text-white mb-3 group-hover:text-[#EAEAEC] transition-colors">{s.titulo}</h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">{s.descricao}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </ScrollFadeSection>
  );
}
