import Link from 'next/link';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/#inicio" aria-label="LonyxWeb início">
              <Logo />
            </Link>
            <p>
              Design com intenção.
              <br />
              Tecnologia com propósito.
              <br />
              Experiências além do comum.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="/#servicos">Serviços</a>
            <a href="/#projetos">Projetos</a>
            <a href="/#planos">Planos de manutenção</a>
            <a href="/#sobre">Sobre a LonyxWeb</a>
          </div>
          <div>
            <h3>Soluções</h3>
            <a href="/#servicos">Criação de sites</a>
            <a href="/#servicos">Aplicativos e sistemas</a>
            <a href="/#planos">Manutenção digital</a>
          </div>
          <div className="footer-contact">
            <h3>Uma ideia em mente?</h3>
            <a href="/#orcamento">
              Vamos dar o próximo passo. <ArrowUpRight size={17} />
            </a>
            <Link href="/entrar">
              Área do cliente <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LonyxWeb. Todos os direitos reservados.</span>
          <div>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de uso</Link>
            <a href="#top" className="back-top" aria-label="Voltar ao topo">
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
