# LonyxWeb — website cinematográfico / V1

Website em português, Next.js App Router, React, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger, Motion, Three.js/React Three Fiber e Lucide. Exportação estática: o site funciona sem servidor de aplicação; a arquitetura aceita adicionar backend posteriormente.

## Visualizar o pacote pronto

O ZIP de entrega inclui `out/`, já compilado. Com Node.js e npm instalados, extraia o ZIP, entre na pasta `lonyxweb` e execute `npm start`. Abra `http://localhost:3000`. Para essa visualização pronta, o servidor usa apenas módulos nativos do Node.js.

## Executar

Node.js 22 ou 24 LTS e npm.

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para produção:

```bash
npm run typecheck
npm test
npm run build
npm run smoke
npm start
```

`npm start` serve `out/` com suporte a requisições parciais de vídeo (HTTP Range). `PORT=3001 npm start` altera a porta. Em uma hospedagem estática, publique o conteúdo de `out/` e preserve suporte a Range. Use sempre HTTP; abrir os arquivos diretamente via `file://` não carrega corretamente as rotas e módulos.

Webpack é utilizado explicitamente para compatibilidade com ambientes que restringem processos do Turbopack. Tailwind é compilado via PostCSS. As páginas podem ser hospedadas em Vercel, Netlify, Cloudflare Pages ou outro host de arquivos estáticos.

## Estrutura

- `app/`: página inicial, layout, estilos, erro, 404 e rotas `/entrar`, `/privacidade`, `/termos`.
- `components/`: header/menu, hero, animações, notebook 3D, projetos/filtros/modal, planos, briefing e rodapé.
- `lib/content.ts`: conteúdo editável, projetos, serviços e planos.
- `lib/validation.mjs`: validação e mapeamento de progresso do vídeo.
- `public/videos/`: vídeo otimizado para a experiência.
- `media/original.mp4`: original preservado, fora dos arquivos publicados.
- `public/images/`: primeiro quadro do vídeo e estudos visuais SVG de projetos.
- `public/fonts/`: Manrope servida localmente; licença em `public/fonts/OFL.txt`.
- `scripts/`: servidor de produção estático e geração dos estudos de interface.
- `tests/`: verificações da validação do briefing e progressão/reversão do vídeo.

## Experiência cinematográfica

A hero usa uma seção de 340svh no desktop e 270svh no celular. O vídeo fica em `position: sticky`, enquanto o ScrollTrigger calcula o progresso. A posição da rolagem determina `currentTime`; não existe autoplay nem botão de play. Durante um seek, o alvo mais recente é mantido e aplicado após `seeked`, evitando perder o último quadro solicitado. Ao parar a rolagem, o vídeo permanece pausado naquele ponto.

O poster mostra o primeiro quadro real. O MP4 foi recodificado em H.264, sem áudio, com keyframe a cada 8 quadros e faststart, sem cortes ou mudanças de enquadramento na mídia. A exibição usa `cover`; em celulares as laterais são cortadas. Ajuste `object-position` em `.hero-video` se necessário. O arquivo original não foi modificado e também está incluído.

Em `prefers-reduced-motion`, a hero se torna uma seção simples, o vídeo fica no primeiro quadro e as animações são removidas. A página permanece inteiramente navegável.

## Funcionalidades

- Navbar fixa com fundo de vidro na rolagem, seção ativa e menu mobile com Escape.
- Links reais para todas as seções, área do cliente e páginas informativas.
- Serviços expansíveis com detalhes e CTA.
- Notebook procedural Three.js, sem modelos externos; carregamento dinâmico perto da seção, renderização sob demanda, resposta ao cursor e scroll. Em mobile e redução de movimento: notebook CSS sem WebGL. Falhas do canvas usam a alternativa CSS.
- Projetos de exemplo com filtros, animação Motion e detalhes em diálogo nativo acessível.
- Planos sem preços inventados. A escolha preenche o serviço de manutenção no formulário.
- Processo com cinco etapas e indicadores de rolagem.
- Formulário com validação, erros junto dos campos, foco no primeiro erro, estado de preparação e download do briefing.
- Fontes, imagens e vídeo locais; nenhum rastreador, CDN de runtime ou recurso remoto necessário para navegar.
- Página 404 e recuperação de erro.

## Conteúdo e configuração

Os planos são **exclusivamente de manutenção**. Configure `price` em `lib/content.ts`; `null` mostra “Consultar valores”. Destaque do Avançado é apenas visual: não há selo de popularidade, preços, SLA ou atendimento 24/7 não confirmados.

Os três projetos e suas imagens são estudos conceituais, não trabalhos para clientes. Para cadastrar trabalhos reais, substitua os objetos em `projects`, as imagens e o conteúdo do modal. Não há métricas, depoimentos ou clientes inventados.

O logo é uma interpretação vetorial da identidade de referência. Substitua por um arquivo oficial em `Logo.tsx` quando disponível. A Manrope é distribuída sob SIL OFL.

## Integrações pendentes

1. Endpoint de orçamento e serviço de entrega de mensagens. Hoje os dados ficam na memória da página; o usuário pode baixar um TXT. **Nenhuma solicitação é enviada.** Não há mensagem de “orçamento enviado” simulada.
2. Autenticação e plataforma do cliente. `/entrar` explica o estado da integração e não pede credenciais.
3. Contatos oficiais, WhatsApp, redes sociais e dados empresariais. Não foram inventados canais.
4. Preços, contratos e condições reais dos planos.
5. Projetos reais e suas mídias.
6. Revisão dos avisos legais conforme os dados e integrações reais.
7. Integração autenticada opcional com o catálogo 21st.dev. Nenhuma chave ou conta foi fornecida; esta versão usa componentes próprios e não atribui componentes ao catálogo sem verificar sua origem/licença.
8. Domínio e hospedagem pública.

Para backend Next.js, remova `output: 'export'` e implemente Route Handlers ou use uma API externa configurada por variável de ambiente. Valide também no servidor; nunca exponha chaves privadas no cliente. A estrutura de componentes independe da futura integração.

## Verificação

Veja `VALIDACAO.md` para o resultado observado nesta entrega e seus limites. Os testes unitários da fórmula de scroll não substituem testes reais de codec e navegador. Safari iOS e Chrome Android em dispositivos físicos devem ser verificados antes da publicação comercial.

## Capturas e testes de navegador

As capturas reais estão em `output/playwright/`. A rotina `tests/browser-qa.js` pode ser executada com Playwright CLI, com o build servido na porta 4318 (`PORT=4318 npm start`):

```bash
npx --yes --package @playwright/cli playwright-cli -s=lonyx open http://127.0.0.1:4318
npx --yes --package @playwright/cli playwright-cli -s=lonyx run-code --filename=tests/browser-qa.js
```

É necessário um navegador compatível instalado. A rotina testa desktop e mobile por viewport; não equivale a um teste em dispositivo físico.
