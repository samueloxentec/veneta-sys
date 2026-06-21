"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { createContext, useCallback, useContext, useRef, useState } from "react";

// ─── Contexto global ─────────────────────────────────────────────────────────

interface FundoCtx {
  registrar: (id: string, imagem: string, prioridade: number) => void;
  ativar: (id: string) => void;
  desativar: (id: string) => void;
}

const Ctx = createContext<FundoCtx>({
  registrar: () => {},
  ativar: () => {},
  desativar: () => {},
});

export function useFundoImagem() {
  return useContext(Ctx);
}

// ─── Provedor + camada fixed ──────────────────────────────────────────────────

interface EntradaSecao {
  imagem: string;
  prioridade: number;
  ativo: boolean;
}

export function ProvedorFundoImagens({ children }: { children: React.ReactNode }) {
  const [secoes, setSecoes] = useState<Record<string, EntradaSecao>>({});
  const registro = useRef<Record<string, EntradaSecao>>({});

  const registrar = useCallback((id: string, imagem: string, prioridade: number) => {
    registro.current[id] = { imagem, prioridade, ativo: false };
    setSecoes({ ...registro.current });
  }, []);

  const ativar = useCallback((id: string) => {
    if (!registro.current[id]) return;
    registro.current[id].ativo = true;
    setSecoes({ ...registro.current });
  }, []);

  const desativar = useCallback((id: string) => {
    if (!registro.current[id]) return;
    registro.current[id].ativo = false;
    setSecoes({ ...registro.current });
  }, []);

  // Escolhe a imagem ativa de maior prioridade
  const imagemAtiva = Object.values(secoes)
    .filter((s) => s.ativo)
    .sort((a, b) => a.prioridade - b.prioridade)[0]?.imagem ?? null;

  return (
    <Ctx.Provider value={{ registrar, ativar, desativar }}>
      {/* Fundo fixo com crossfade */}
      <div className="fixed inset-0 z-0 bg-black">
        <AnimatePresence mode="sync">
          {imagemAtiva && (
            <motion.div
              key={imagemAtiva}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={imagemAtiva}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* overlay escuro consistente */}
              <div className="absolute inset-0 bg-black/65" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Conteúdo da página por cima */}
      {children}
    </Ctx.Provider>
  );
}
