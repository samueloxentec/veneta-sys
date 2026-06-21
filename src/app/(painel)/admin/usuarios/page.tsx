import { criarClienteServidor } from '@/lib/supabase/cliente-servidor'
import { redirect } from 'next/navigation'

export default async function PaginaUsuarios() {
  const supabase = await criarClienteServidor()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: atual } = await supabase.from('usuarios').select('perfil').eq('auth_id', user?.id).single()
  if (atual?.perfil !== 'administrador') redirect('/admin/dashboard')

  const { data: usuarios } = await supabase.from('usuarios').select('*').order('criado_em', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--cor-texto)] mb-8 font-[family-name:var(--fonte-titulo)]">Usuários</h1>
      <div className="bg-[#141414] border border-[#2a2420] rounded-xl overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-[#2a2420]">
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Nome</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Email</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Perfil</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((u) => (
              <tr key={u.id} className="border-b border-[#2a2420]/50 hover:bg-[#1a1612]">
                <td className="px-6 py-4 text-sm text-[var(--cor-texto)]">{u.nome}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)]">{u.email}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)] capitalize">{u.perfil}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${u.ativo ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {u.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
