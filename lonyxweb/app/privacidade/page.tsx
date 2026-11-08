import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Aviso de privacidade' };
export default function Privacy() {
  return (
    <main id="main" className="document-page">
      <article className="container">
        <p className="eyebrow">LONYXWEB / TRANSPARÊNCIA</p>
        <h1>Aviso de privacidade</h1>
        <p>
          Este aviso descreve o funcionamento da versão 1 do website da LonyxWeb. As informações
          devem ser atualizadas e revisadas antes da ativação de qualquer coleta de dados ou
          integração externa.
        </p>
        <h2>Formulário de briefing</h2>
        <p>
          Nome, e-mail, serviço e descrição são usados apenas no seu navegador para preparar um
          arquivo de texto que você pode baixar. O formulário não transmite esses dados, não envia
          uma solicitação e não os salva em banco de dados ou armazenamento persistente do
          navegador. Ao recarregar ou fechar a página, o conteúdo do formulário é descartado.
        </p>
        <h2>Arquivos e recursos</h2>
        <p>
          Vídeo, imagens, fontes e código da interface são fornecidos com o próprio site. Esta
          versão não inclui cookies de análise, pixels de publicidade ou rastreadores de terceiros.
          O serviço de hospedagem pode processar dados técnicos de acesso, como endereço IP e
          registros de requisições, conforme sua própria política.
        </p>
        <h2>Área do cliente</h2>
        <p>
          A autenticação ainda não está integrada. A página de entrada não solicita credenciais e
          não cria contas.
        </p>
        <h2>Antes de novas integrações</h2>
        <p>
          Quando o envio de solicitações e a área do cliente forem ativados, este aviso deverá
          identificar o responsável pelo tratamento, canal de contato, finalidades, bases legais,
          prazos de retenção, operadores e meios de exercício dos direitos previstos na legislação
          aplicável, incluindo a LGPD.
        </p>
        <Link href="/" className="button">
          Voltar ao site
        </Link>
      </article>
    </main>
  );
}
