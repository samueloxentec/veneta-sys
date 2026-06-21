"use client";

import { useState, useEffect } from "react";

interface Evento {
  id: string;
  nome: string;
  data: string;
  horario: string;
  local: string;
  valor_inscricao: number;
}

interface PropsModal {
  evento: Evento;
  aoFechar: () => void;
}

export function ModalInscricao({ evento, aoFechar }: PropsModal) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") aoFechar();
    }
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [aoFechar]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const resposta = await fetch(`/api/funcoes/inscrever-participante`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ evento_id: evento.id, nome, email, telefone }),
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      setErro(data.erro || "Erro ao realizar inscrição");
      setCarregando(false);
      return;
    }

    if (data?.checkout_url) {
      window.location.href = data.checkout_url;
    }
  }

  const inputClasses =
    "w-full px-4 py-3 bg-black border border-[#252525] rounded-lg text-[#EAEAEC] placeholder-[#5A5A5A] focus:outline-none focus:ring-1 focus:ring-[#AFAFAF]/40 focus:border-[#AFAFAF]/50 transition text-sm";
  const labelClasses =
    "block text-xs text-[#8a8a8a] mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={aoFechar} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0f0f0f] border border-[#252525] rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Fechar */}
        <button
          onClick={aoFechar}
          className="absolute top-4 right-4 text-[#5A5A5A] hover:text-[#EAEAEC] transition text-lg leading-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#EAEAEC] font-[family-name:var(--fonte-titulo)]">
            Inscrição
          </h2>
          <div className="mt-3 p-3 bg-black rounded-lg border border-[#252525]">
            <p className="text-sm text-[#EAEAEC] font-semibold">{evento.nome}</p>
            <p className="text-xs text-[#8a8a8a] mt-1">
              {new Date(evento.data).toLocaleDateString("pt-BR")} às {evento.horario} · {evento.local}
            </p>
            <p className="text-xs text-[#AFAFAF] mt-1 font-medium font-mono">
              R$ {Number(evento.valor_inscricao).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClasses}>Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className={inputClasses}
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className={labelClasses}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClasses}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className={labelClasses}>Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className={inputClasses}
              placeholder="+351 912 345 678"
            />
          </div>

          {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-3 bg-[#EAEAEC] hover:bg-[#d0d0d2] disabled:opacity-50 text-black font-semibold rounded-lg transition mt-2 text-sm"
          >
            {carregando ? "Processando..." : "Confirmar e Pagar"}
          </button>

          <p className="text-[10px] text-[#5A5A5A] text-center mt-3">
            Ao clicar, será redirecionado para concluir o pagamento de forma segura.
          </p>
        </form>
      </div>
    </div>
  );
}
