import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Área do cliente',
  robots: { index: false, follow: true },
};
export default function Login() {
  return (
    <main id="main" className="document-page">
      <div className="container">
        <div className="glass login-panel">
          <div className="login-icon">
            <LockKeyhole size={27} />
          </div>
          <p className="eyebrow">LONYXWEB / PLATAFORMA DE CLIENTES</p>
          <h1>
            Seu projeto.
            <br />
            Um espaço só seu.
          </h1>
          <p>
            A área do cliente será o ponto de acesso para acompanhar seu projeto e os serviços
            contratados.
          </p>
          <div className="notice">
            A plataforma ainda não está disponível. A integração de autenticação está pendente; esta
            página não coleta e-mail ou senha.
          </div>
          <Link className="button" href="/#orcamento">
            Conhecer nossas soluções <ArrowUpRight size={17} />
          </Link>
          <p>
            <Link href="/">← Voltar ao site</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
