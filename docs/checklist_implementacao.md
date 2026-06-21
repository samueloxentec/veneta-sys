# Checklist de Implementação — Landing Page Venetagroup

## Fase 1: Inicialização do Projeto

- [ ] 1.1 — Criar projeto Next.js 15 com App Router, TypeScript, Tailwind CSS e diretório `src/`
- [ ] 1.2 — Configurar `tsconfig.json` com alias `@/` apontando para `src/`
- [ ] 1.3 — Instalar dependências: `gsap`, `@gsap/react`
- [ ] 1.4 — Configurar estrutura de pastas dentro de `src/`
- [ ] 1.5 — Configurar fontes com `next/font/google` (tipografia forte)
- [ ] 1.6 — Criar arquivo `globals.css` com variáveis CSS e estilos base

## Fase 2: Arquitetura de Componentes

- [ ] 2.1 — Criar `src/app/layout.tsx` (Root Layout com metadata, fontes, body)
- [ ] 2.2 — Criar `src/app/page.tsx` (página principal — Landing Page)
- [ ] 2.3 — Criar componente `src/componentes/animacoes/ProvedorGsap.tsx` (registro de plugins)
- [ ] 2.4 — Criar componente `src/componentes/landing/SecaoHero.tsx`
- [ ] 2.5 — Criar componente `src/componentes/landing/SecaoSobre.tsx`
- [ ] 2.6 — Criar componente `src/componentes/landing/SecaoServicos.tsx`
- [ ] 2.7 — Criar componente `src/componentes/landing/SecaoEventos.tsx`
- [ ] 2.8 — Criar componente `src/componentes/landing/SecaoPortfolio.tsx`
- [ ] 2.9 — Criar componente `src/componentes/landing/SecaoParceiros.tsx`
- [ ] 2.10 — Criar componente `src/componentes/landing/SecaoTrabalheConosco.tsx`
- [ ] 2.11 — Criar componente `src/componentes/landing/SecaoCTA.tsx`
- [ ] 2.12 — Criar componente `src/componentes/ui/Navegacao.tsx` (navbar fixa)
- [ ] 2.13 — Criar componente `src/componentes/ui/Rodape.tsx`

## Fase 3: Animações GSAP + ScrollTrigger

- [ ] 3.1 — Implementar timeline pinned + scrub na `SecaoHero` (parallax multi-camada)
- [ ] 3.2 — Implementar SplitText no título principal (reveal letra a letra)
- [ ] 3.3 — Implementar `ScrollTrigger.batch()` nos cards de serviços (stagger de entrada)
- [ ] 3.4 — Implementar horizontal scroll fake na `SecaoEventos` (containerAnimation)
- [ ] 3.5 — Implementar scale/reveal com scrub na `SecaoPortfolio`
- [ ] 3.6 — Implementar fade-in coordenado na `SecaoParceiros`
- [ ] 3.7 — Implementar zoom-in dramático com scrub na `SecaoCTA`
- [ ] 3.8 — Configurar `gsap.matchMedia()` para responsividade (desktop/mobile/reduced-motion)
- [ ] 3.9 — Implementar cursor follower com `gsap.quickTo()`
- [ ] 3.10 — Implementar transições suaves entre seções (autoAlpha + y)

## Fase 4: Design e Estilização

- [ ] 4.1 — Definir paleta de cores e variáveis CSS customizadas
- [ ] 4.2 — Estilizar `SecaoHero` (gradientes, blur, tipografia forte)
- [ ] 4.3 — Estilizar cards de serviços (glassmorphism, bordas suaves)
- [ ] 4.4 — Estilizar seção de eventos (layout horizontal, cards visuais)
- [ ] 4.5 — Estilizar portfólio/galeria (grid responsivo)
- [ ] 4.6 — Estilizar navegação (transparente → sólida no scroll)
- [ ] 4.7 — Estilizar rodapé (informações de contato, links)
- [ ] 4.8 — Garantir responsividade completa (mobile-first)
- [ ] 4.9 — Adicionar `will-change: transform` apenas em elementos animados

## Fase 5: Geração de Assets com Higgsfield

- [ ] 5.1 — Gerar vídeo hero background (cinematográfico, loop, corporativo)
- [ ] 5.2 — Gerar vídeos/imagens para seção de eventos
- [ ] 5.3 — Integrar vídeos gerados no componente Hero (autoplay, muted, loop)

## Fase 6: Otimização e Performance

- [ ] 6.1 — Otimizar imagens com `next/image`
- [ ] 6.2 — Configurar lazy loading para seções abaixo do fold
- [ ] 6.3 — Implementar `IntersectionObserver` para pausar animações off-screen
- [ ] 6.4 — Debounce no `ScrollTrigger.refresh()` para resize
- [ ] 6.5 — Verificar Core Web Vitals (LCP, CLS, FID)
- [ ] 6.6 — Testar em diferentes navegadores e dispositivos

## Fase 7: Metadata e SEO

- [ ] 7.1 — Configurar metadata no `layout.tsx` (title, description, openGraph)
- [ ] 7.2 — Adicionar favicon e ícones
- [ ] 7.3 — Configurar `robots.txt` e `sitemap.xml`

## Fase 8: Validação Final

- [ ] 8.1 — Build de produção sem erros (`next build`)
- [ ] 8.2 — Testar scroll bidirecional (avança e retrocede corretamente)
- [ ] 8.3 — Testar acessibilidade (prefers-reduced-motion desativa animações)
- [ ] 8.4 — Testar responsividade em mobile, tablet e desktop
- [ ] 8.5 — Revisão final do código e limpeza

---

**Legenda:**
- [ ] = Pendente
- [x] = Concluído
