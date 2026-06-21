import { ProvedorFundoImagens } from "@/componentes/animacoes/FundoImagens";
import { Navegacao } from "@/componentes/ui/Navegacao";
import { Rodape } from "@/componentes/ui/Rodape";

export default function LayoutSite({ children }: { children: React.ReactNode }) {
  return (
    <ProvedorFundoImagens>
      <div className="relative z-10">
        <Navegacao />
        <main>{children}</main>
        <Rodape />
      </div>
    </ProvedorFundoImagens>
  );
}
