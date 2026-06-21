// Server Component — busca os eventos no servidor (sem expor variáveis ao cliente)
import { criarClienteServidor } from "@/lib/supabase/cliente-servidor";
import { SecaoEventosCliente } from "./SecaoEventosCliente";

export async function SecaoEventos() {
  const supabase = await criarClienteServidor();
  const { data: eventos } = await supabase
    .from("eventos")
    .select("id, nome, data, horario, local, vagas_total, vagas_reservadas, valor_inscricao, status")
    .eq("status", "ativo")
    .order("data", { ascending: true })
    .limit(4);

  return <SecaoEventosCliente eventos={eventos ?? []} />;
}
