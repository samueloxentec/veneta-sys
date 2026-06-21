import { criarClienteServidor } from '@/lib/supabase/cliente-servidor'

export default async function PaginaParticipantes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await criarClienteServidor()

  const { data: evento } = await supabase.from('eventos').select('nome').eq('id', id).single()
  const { data: participantes } = await supabase
    .from('participantes').select('*').eq('evento_id', id).order('criado_em', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--cor-texto)] mb-2 font-[family-name:var(--fonte-titulo)]">Participantes</h1>
      <p className="text-[var(--cor-texto-muted)] mb-8">{evento?.nome}</p>

      <div className="bg-[#141414] border border-[#2a2420] rounded-xl overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-[#2a2420]">
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Nome</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Email</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Telefone</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Status</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-[var(--cor-texto-muted)] uppercase">Código</th>
            </tr>
          </thead>
          <tbody>
            {participantes?.map((p) => (
              <tr key={p.id} className="border-b border-[#2a2420]/50 hover:bg-[#1a1612]">
                <td className="px-6 py-4 text-sm text-[var(--cor-texto)]">{p.nome}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)]">{p.email}</td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)]">{p.telefone}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    p.status === 'presente' ? 'bg-green-900/30 text-green-400' :
                    p.status === 'confirmado' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>{p.status}</span>
                </td>
                <td className="px-6 py-4 text-sm text-[var(--cor-texto-muted)] font-mono">{p.codigo_ingresso}</td>
              </tr>
            ))}
            {(!participantes || participantes.length === 0) && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--cor-texto-muted)]">Nenhum participante</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
