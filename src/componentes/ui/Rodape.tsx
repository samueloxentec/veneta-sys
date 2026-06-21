export function Rodape() {
  return (
    <footer className="bg-black border-t border-[#252525] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Marca */}
          <div>
            <h3 className="text-xl font-bold font-[family-name:var(--fonte-titulo)] mb-4 tracking-tight">
              <span className="text-[#EAEAEC]">Veneta</span>
              <span className="text-[#5A5A5A]">mater</span>            </h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed mb-4">
              Excelência em decoração veneziana, eventos e formações especializadas em técnicas italianas.
            </p>
            {/* Tricolor italiano */}
            <div className="flex w-10 h-[2px] overflow-hidden rounded-full">
              <div className="flex-1 bg-[#366C20]" />
              <div className="flex-1 bg-[#EAEAEC]" />
              <div className="flex-1 bg-[#97150F]" />
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-xs font-semibold text-[#AFAFAF] uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-[#AFAFAF]">
              <li><a href="#sobre" className="hover:text-[#EAEAEC] transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-[#EAEAEC] transition-colors">Serviços</a></li>
              <li><a href="#eventos" className="hover:text-[#EAEAEC] transition-colors">Eventos</a></li>
              <li><a href="#portfolio" className="hover:text-[#EAEAEC] transition-colors">Portfólio</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs font-semibold text-[#AFAFAF] uppercase tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-[#AFAFAF]">
              <li><a href="#parceiros" className="hover:text-[#EAEAEC] transition-colors">Parceiros</a></li>
              <li><a href="#" className="hover:text-[#EAEAEC] transition-colors">Trabalhe Connosco</a></li>
              <li><a href="#contato" className="hover:text-[#EAEAEC] transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-semibold text-[#AFAFAF] uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-[#AFAFAF]">
              <li className="text-[#AFAFAF] font-mono">info@venetagroup.pt</li>
              <li>Portugal · venetagroup.pt</li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-12 pt-8 border-t border-[#252525] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8a8a8a]">© 2026 Veneta Mater. Todos os direitos reservados.</p>
          <div className="flex gap-1 items-center">
            <span className="text-[10px] text-[#8a8a8a] font-mono uppercase tracking-widest">Arte · Tradição · Veneza</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
