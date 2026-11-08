# Validação da entrega — LonyxWeb V1

Data: 08/11/2026.

## Resultado observado

- Build de produção Next.js/Webpack concluído; todas as rotas exportadas.
- TypeScript em modo estrito: sem erros.
- Três testes unitários passaram: progressão/reversão/limites do vídeo; briefing inválido; briefing válido.
- Servidor de produção executado e validado por HTTP: home, área do cliente, privacidade e termos retornam 200; rota inexistente retorna 404.
- Dezoito recursos locais e as âncoras principais verificados; MP4 responde a Range com HTTP 206 e conteúdo parcial correto.
- 35 verificações reais no Chromium passaram. Relatório detalhado em `output/playwright/report.json`.

## Interações verificadas no Chromium

- Filtros Todos, Websites, Aplicativos e Sistemas.
- Modal de detalhes e fechamento com Escape.
- Plano Avançado seleciona manutenção no formulário.
- Validação inline, foco no primeiro erro, preparação sem envio e download do arquivo TXT.
- Rotas de entrada, privacidade e termos.
- Avanço do vídeo no scroll: quadro em 5,251111 s; retorno no sentido contrário: 2,297361 s; quadro estável ao parar. Reprodução permaneceu pausada.
- Vídeo em viewport mobile: avanço para 5,488966 s e retorno para 1,646689 s.
- Menu mobile abre, navega, fecha após escolha e responde a Escape.
- Nenhuma rolagem horizontal em 375, 390, 768, 1024 e 1440 px.
- Canvas 3D presente no desktop; notebook CSS e remoção do WebGL ao passar para mobile.
- Expansão nativa dos serviços.
- Redução de movimento remove o trecho longo da hero e mantém o primeiro quadro.
- Indicador de carregamento desaparece quando o vídeo está pronto.
- Links de âncora válidos.
- Nenhum erro de execução JavaScript observado nas interações testadas.

O Chromium apresentou avisos do driver gráfico sobre `GPU stall due to ReadPixels` durante a captura da cena WebGL. O notebook foi renderizado. Isso não é uma medição de desempenho em GPU de celular.

## Capturas reais

Na pasta `output/playwright/`:

- `desktop-hero.png`
- `desktop-services.png`
- `desktop-projects.png`
- `desktop-plans.png`
- `desktop-about.png`
- `desktop-briefing.png`
- `mobile-hero.png`
- `mobile-plans.png`
- `mobile-services.png`

## Correções realizadas após os testes

1. Indicador de carregamento preso quando o vídeo carregava antes da hidratação: estado inicial agora considera `readyState`.
2. Canvas mantido após redimensionar desktop para mobile: listener da media query desativa a cena e também responde a mudanças de redução de movimento.
3. Áreas de toque mobile ampliadas nos controles menores.

## Limites e pendências

- Testes mobile realizados por viewport no Chromium. Não foram executados Safari iOS, Android físico, leitores de tela reais, rede lenta ou benchmarks de desempenho em hardware intermediário.
- O serviço gerenciado de preview retornou `preview relay unavailable`. Os testes e capturas foram feitos no servidor local do build, sem depender desse relay. Não há URL de preview compartilhado ou publicação hospedada nesta entrega.
- Os helpers de empacotamento/publicação do Sites não estão disponíveis no filesystem deste ambiente. Nenhum Site remoto foi criado. O ZIP inclui código e exportação estática para execução local e publicação posterior.
- Sem backend, autenticação, contatos oficiais ou envio de orçamento. A interface informa as pendências; o briefing é apenas local.
- 21st.dev foi consultado. A instalação do componente consultado exige chave de API, que não foi fornecida. Nenhum componente do catálogo foi apresentado como instalado ou incorporado.
