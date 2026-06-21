import { criarClienteServidor } from '@/lib/supabase/cliente-servidor'
import { redirect } from 'next/navigation'
import { BarraLateral } from '@/componentes/admin/BarraLateral'
import { CabecalhoAdmin } from '@/componentes/admin/CabecalhoAdmin'

export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const supabase = await criarClienteServidor()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('id, nome, email, perfil, ativo')
    .eq('auth_id', user.id)
    .single()

  // Bloqueia usuários não encontrados ou desativados pelo admin
  if (!usuario || !usuario.ativo) redirect('/login')

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
      <BarraLateral perfil={usuario.perfil} />
      <div className="flex-1 flex flex-col min-h-screen">
        <CabecalhoAdmin nome={usuario.nome} perfil={usuario.perfil} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
