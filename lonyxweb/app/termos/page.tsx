import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Termos de uso' };
export default function Terms() {
  return (
    <main id="main" className="document-page">
      <article className="container">
        <p className="eyebrow">LONYXWEB / INFORMAÇÕES DE USO</p>
        <h1>Termos de uso</h1>
        <p>
          Este website apresenta os serviços da LonyxWeb. Esta versão inicial disponibiliza
          informações institucionais e ferramentas para preparar um briefing localmente.
        </p>
        <h2>Serviços e contratação</h2>
        <p>
          O conteúdo do site não constitui contratação automática. Escopo, valores, prazos e
          condições de cada projeto ou plano de manutenção serão definidos em proposta e contrato
          específicos. Os planos de manutenção não incluem a criação de um novo site, aplicativo ou
          sistema, salvo acordo expresso.
        </p>
        <h2>Portfólio demonstrativo</h2>
        <p>
          Os projetos identificados como exemplos são estudos de interface. Eles não representam
          clientes atendidos, produtos comerciais ou comprovação de resultados. Dados presentes nas
          imagens desses estudos são ilustrativos.
        </p>
        <h2>Formulário e acesso</h2>
        <p>
          O briefing é preparado no navegador e pode ser baixado. Não há envio online nesta versão.
          A área do cliente está em preparação e não oferece autenticação ou gestão de contratos.
        </p>
        <h2>Conteúdo e identidade</h2>
        <p>
          A referência visual automotiva é usada para compor a apresentação cinematográfica. Não
          existe afirmação de parceria, patrocínio ou associação da LonyxWeb com fabricantes de
          veículos.
        </p>
        <h2>Atualizações</h2>
        <p>
          Este texto deverá ser revisado para refletir os dados empresariais, canais oficiais e
          funcionalidades efetivamente oferecidas ao público quando novas integrações forem
          disponibilizadas.
        </p>
        <Link href="/" className="button">
          Voltar ao site
        </Link>
      </article>
    </main>
  );
}
