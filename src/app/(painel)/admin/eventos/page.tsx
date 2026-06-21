import { criarClienteServidor } from '@/lib/supabase/cliente-servidor'
import Link from 'next/link'

export default async function PaginaEventos() {
  const supabase = await criarClienteServidor()
  const { data: eventos } = await supabase
    .from('eventos')
    .select('*')
    .order('data', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--cor-texto)] font-[family-name:var(--fonte-titulo)]">Eventos</h1>
        <Link href="/admin/eventos/novo" className="px-4 py-2 bg-[var(--cor-dourada)] hover:bg-[var(--cor-dourada-hover)] text-black text-sm font-medium rounded-lg transition">
          + Novo Evento
        </Link>
      </div>

      <div className="bg-[#141414] border border-[#2a2420] rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#2a2420]">
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Nome</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Data</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Vagas</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Status</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos?.map((evento) => (
              <tr key={evento.id} className="border-b border-[#2a2420]/50 hover:bg-[#1a1612]">
                <td className="px-6 py-4 text-sm text-[var(--cor-texto)]">{evento.nome}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)]">{new Date(evento.data).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)]">{evento.vagas_reservadas}/{evento.vagas_total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    evento.status === 'ativo' ? 'bg-green-900/30 text-green-400' :
                    evento.status === 'lotado' ? 'bg-amber-900/30 text-amber-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>{evento.status}</span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/eventos/${evento.id}/participantes`} className="text-xs text-[var(--cor-dourada)] hover:text-[var(--cor-dourada-clara)]">
                    Participantes
                  </Link>
                </td>
              </tr>
            ))}
            {(!eventos || eventos.length === 0) && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--cor-texto-muted)]">Nenhum evento cadastrado</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
