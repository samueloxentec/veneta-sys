"use client";

import { useEffect, useState } from "react";
import { ScrollFadeSection } from "@/componentes/animacoes/ScrollFadeSection";
import { StaggerContainer, StaggerItem } from "@/componentes/animacoes/StaggerContainer";
import { Card3D } from "@/componentes/ui/Card3D";
import { ModalInscricao } from "@/componentes/landing/ModalInscricao";
import { criarClienteBrowser } from "@/lib/supabase/cliente-browser";

interface Evento {
  id: string;
  nome: string;
  data: string;
  horario: string;
  local: string;
  vagas_total: number;
  vagas_reservadas: number;
  valor_inscricao: number;
  status: string;
}

const cores = [
  "from-[#5A5A5A] to-[#252525]",
  "from-[#366C20]/80 to-[#252525]",
  "from-[#97150F]/70 to-[#252525]",
  "from-[#AFAFAF]/30 to-[#252525]",
];

export function SecaoEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    async function carregarEventos() {
      const supabase = criarClienteBrowser();
      const { data } = await supabase
        .from("eventos")
        .select("*")
        .eq("status", "ativo")
        .order("data", { ascending: true })
        .limit(4);

      if (data) setEventos(data);
    }
    carregarEventos();
  }, []);

  function abrirModal(evento: Evento) {
    setEventoSelecionado(evento);
    setModalAberto(true);
  }

  return (
    <ScrollFadeSection
      id="eventos"
      backgroundImage="/veneta_images/veneta_4.jpg"
      prioridade={3}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#AFAFAF] uppercase tracking-[0.3em] font-mono mb-4 block">
            ─── Eventos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--fonte-titulo)] leading-tight text-white">
            Experiências que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAEAEC] to-[#AFAFAF]">
              transformam
            </span>
          </h2>
          <div className="w-12 h-[1px] bg-[#5A5A5A] mt-6" />
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eventos.map((ev, i) => {
            const vagasDisp = ev.vagas_total - ev.vagas_reservadas;
            return (
              <StaggerItem key={ev.id}>
                <Card3D>
                  <div className="rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-[#252525] group hover:border-[#5A5A5A] transition-all duration-500">
                    <div className={`h-32 bg-gradient-to-br ${cores[i % cores.length]} relative`}>
                      <span className="absolute top-3 right-4 text-4xl font-bold font-[family-name:var(--fonte-titulo)] text-[#5A5A5A]/50">
                        0{i + 1}
                      </span>
                      <span className="absolute bottom-3 left-4 text-[10px] text-[#EAEAEC] bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider">
                        {vagasDisp} vagas
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-white mb-3 group-hover:text-[#EAEAEC] transition-colors">
                        {ev.nome}
                      </h3>
                      <p className="text-xs text-[#8a8a8a] font-mono">
                        {new Date(ev.data).toLocaleDateString("pt-BR")} · {ev.local}
                      </p>
                      <p className="text-xs text-[#AFAFAF] font-semibold mt-2">
                        R$ {Number(ev.valor_inscricao).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                      <button
                        onClick={() => abrirModal(ev)}
                        disabled={vagasDisp <= 0}
                        className="mt-4 w-full py-2.5 rounded-lg border border-[#252525] text-xs text-[#AFAFAF] hover:border-[#5A5A5A] hover:text-[#EAEAEC] hover:bg-[#EAEAEC]/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {vagasDisp <= 0 ? "Esgotado" : "Inscrever-se →"}
                      </button>
                    </div>
                  </div>
                </Card3D>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {eventos.length === 0 && (
          <p className="text-center text-[#8a8a8a] mt-12">
            Nenhum evento disponível no momento.
          </p>
        )}
      </div>

      {modalAberto && eventoSelecionado && (
        <ModalInscricao
          evento={eventoSelecionado}
          aoFechar={() => setModalAberto(false)}
        />
      )}
    </ScrollFadeSection>
  );
}
