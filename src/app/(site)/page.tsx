import { SecaoHero } from "@/componentes/landing/SecaoHero";
import { SecaoSobre } from "@/componentes/landing/SecaoSobre";
import { SecaoServicos } from "@/componentes/landing/SecaoServicos";
import { SecaoEventos } from "@/componentes/landing/SecaoEventos";
import { SecaoPortfolio } from "@/componentes/landing/SecaoPortfolio";
import { SecaoParceiros } from "@/componentes/landing/SecaoParceiros";
import { SecaoTrabalheConosco } from "@/componentes/landing/SecaoTrabalheConosco";
import { SecaoCTA } from "@/componentes/landing/SecaoCTA";

export default function PaginaInicial() {
  return (
    <>
      <SecaoHero />
      <SecaoSobre />
      <SecaoServicos />
      <SecaoEventos />
      <SecaoPortfolio />
      <SecaoParceiros />
      <SecaoTrabalheConosco />
      <SecaoCTA />
    </>
  );
}
