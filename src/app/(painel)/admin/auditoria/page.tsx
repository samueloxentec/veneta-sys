import { criarClienteServidor } from '@/lib/supabase/cliente-servidor'
import { redirect } from 'next/navigation'

export default async function PaginaAuditoria() {
  const supabase = await criarClienteServidor()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: atual } = await supabase.from('usuarios').select('perfil').eq('auth_id', user?.id).single()
  if (atual?.perfil !== 'administrador') redirect('/admin/dashboard')

  const { data: registros } = await supabase
    .from('auditoria').select('*, usuarios(nome)')
    .order('criado_em', { ascending: false }).limit(100)

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--cor-texto)] mb-8 font-[family-name:var(--fonte-titulo)]">Auditoria</h1>
      <div className="bg-[#141414] border border-[#2a2420] rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#2a2420]">
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Data/Hora</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Usuário</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Ação</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {registros?.map((r) => (
              <tr key={r.id} className="border-b border-[#2a2420]/50 hover:bg-[#1a1612]">
                <td className="px-6 py-4 text-xs text-[var(--cor-texto-muted)]">{new Date(r.criado_em).toLocaleString('pt-BR')}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)]">{(r as any).usuarios?.nome || 'Sistema'}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-[var(--cor-dourada)]/10 text-[var(--cor-dourada)] rounded-full">{r.tipo_acao}</span></td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)] max-w-xs truncate">{r.descricao}</td>
              </tr>
            ))}
            {(!registros || registros.length === 0) && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-[var(--cor-texto-muted)]">Nenhum registro</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
