'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { invocarFuncao } from '@/lib/supabase/invocar-funcao'

export default function PaginaNovoEvento() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    const fd = new FormData(e.currentTarget)

    const { erro: erroResp } = await invocarFuncao('gerenciar-eventos', {
      corpo: {
        nome: fd.get('nome') as string,
        descricao: fd.get('descricao') as string,
        data: fd.get('data') as string,
        horario: fd.get('horario') as string,
        local: fd.get('local') as string,
        vagas_total: Number(fd.get('vagas_total')),
        valor_inscricao: Number(fd.get('valor_inscricao')),
      },
    })

    if (erroResp) {
      setErro(erroResp)
      setCarregando(false)
      return
    }

    router.push('/admin/eventos')
    router.refresh()
  }

  const inputCls = "w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2420] rounded-lg text-[var(--cor-texto)] focus:outline-none focus:ring-2 focus:ring-[var(--cor-dourada)]/30 transition"

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[var(--cor-texto)] mb-8 font-[family-name:var(--fonte-titulo)]">Novo Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Nome do Evento</label><input name="nome" required className={inputCls} /></div>
        <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Descrição</label><textarea name="descricao" rows={3} className={inputCls} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Data</label><input name="data" type="date" required className={inputCls} /></div>
          <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Horário</label><input name="horario" type="time" required className={inputCls} /></div>
        </div>
        <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Local</label><input name="local" required className={inputCls} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Vagas</label><input name="vagas_total" type="number" required className={inputCls} /></div>
          <div><label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">Valor (R$)</label><input name="valor_inscricao" type="number" step="0.01" required className={inputCls} /></div>
        </div>
        {erro && <p className="text-red-400 text-sm">{erro}</p>}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={carregando} className="px-6 py-3 bg-[var(--cor-dourada)] hover:bg-[var(--cor-dourada-hover)] disabled:opacity-50 text-black font-semibold rounded-lg transition">
            {carregando ? 'Criando...' : 'Criar Evento'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-[#2a2420] text-[var(--cor-texto-muted)] hover:bg-[#1a1612] rounded-lg transition">Cancelar</button>
        </div>
      </form>
    </div>
  )
}
