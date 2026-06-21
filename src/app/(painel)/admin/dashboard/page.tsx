import { criarClienteServidor } from '@/lib/supabase/cliente-servidor'

export default async function PaginaDashboard() {
  const supabase = await criarClienteServidor()
  const { data: indicadores } = await supabase.rpc('obter_indicadores')

  const { data: { user } } = await supabase.auth.getUser()
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('perfil')
    .eq('auth_id', user?.id)
    .single()

  const ehAdmin = usuario?.perfil === 'administrador'

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--cor-texto)] mb-8 font-[family-name:var(--fonte-titulo)]">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ehAdmin && (
          <CardIndicador
            titulo="Valor Arrecadado"
            valor={`R$ ${Number(indicadores?.valor_arrecadado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icone="💰"
          />
        )}
        <CardIndicador titulo="Participantes Confirmados" valor={String(indicadores?.total_confirmados || 0)} icone="👥" />
        <CardIndicador titulo="Eventos Ativos" valor={String(indicadores?.eventos_ativos || 0)} icone="🎪" />
      </div>
    </div>
  )
}

function CardIndicador({ titulo, valor, icone }: { titulo: string; valor: string; icone: string }) {
  return (
    <div className="bg-[#141414] border border-[#2a2420] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icone}</span>
        <p className="text-sm text-[var(--cor-texto-muted)]">{titulo}</p>
      </div>
      <p className="text-3xl font-bold text-[var(--cor-dourada)] font-[family-name:var(--fonte-titulo)]">
        {valor}
      </p>
    </div>
  )
}
