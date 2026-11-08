import {
  ArrowUpRight,
  ArrowRight,
  AudioLines,
  Code2,
  Headphones,
  Layers,
  Monitor,
  ShieldCheck,
  Smartphone,
  Wrench,
  Zap,
} from 'lucide-react';
import { Hero } from '@/components/Hero';
import { Laptop } from '@/components/Laptop';
import { Projects } from '@/components/Projects';
import { Plans } from '@/components/Plans';
import { QuoteForm } from '@/components/QuoteForm';
import { Animations } from '@/components/Animations';
import { services, steps } from '@/lib/content';
const differences = [
  { title: 'Alta performance', text: 'Sites rápidos, otimizados e responsivos.', Icon: Zap },
  { title: 'Design premium', text: 'Interfaces modernas e experiências únicas.', Icon: Layers },
  { title: 'Segurança', text: 'Boas práticas de proteção e estabilidade.', Icon: ShieldCheck },
  {
    title: 'Suporte especializado',
    text: 'Atendimento dedicado ao seu projeto.',
    Icon: Headphones,
  },
];
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <section id="diferenciais" className="differences">
        <div className="container differences-grid">
          {differences.map(({ title, text, Icon }) => (
            <div className="difference" key={title}>
              <div className="icon-well">
                <Icon size={25} strokeWidth={1.5} />
              </div>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="servicos" className="section services-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">02 / O QUE CRIAMOS</p>
              <h2>
                Tudo o que sua marca
                <br />
                precisa, <span className="accent">digitalmente.</span>
              </h2>
            </div>
            <p className="section-side">
              Da primeira ideia à evolução contínua,
              <br />
              desenvolvemos soluções digitais
              <br />
              para impulsionar negócios.
            </p>
          </div>
          <div className="services-layout">
            <Laptop />
            <div className="service-list">
              {services.map((s, i) => {
                const Icon = [Monitor, Smartphone, Wrench][i];
                return (
                  <details className="service-card glass" key={s.title} open={i === 0}>
                    <summary>
                      <span className="service-icon">
                        <Icon size={25} strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="service-index">0{i + 1} / SOLUÇÕES</span>
                        <h3>{s.title}</h3>
                        <span className="service-description">{s.description}</span>
                      </span>
                      <span className="service-arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </summary>
                    <div className="service-details">
                      <ul>
                        {s.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <a href="#orcamento">
                        Vamos criar juntos <ArrowRight size={14} />
                      </a>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
          <div className="services-bottom">
            <span>
              ESTRATÉGIA <i /> DESIGN <i /> DESENVOLVIMENTO <i /> EVOLUÇÃO
            </span>
            <span>UMA VISÃO. TODAS AS POSSIBILIDADES.</span>
          </div>
        </div>
      </section>
      <Projects />
      <Plans />
      <section id="sobre" className="section about-section">
        <div className="container about-layout">
          <div className="about-copy" data-reveal>
            <p className="eyebrow">05 / NOSSA ESSÊNCIA</p>
            <h2>
              Tecnologia, design
              <br />e estratégia.
              <br />
              <span className="muted-heading">Em cada detalhe.</span>
            </h2>
            <p className="body-copy">
              A LonyxWeb transforma ideias em experiências digitais personalizadas. Conectamos
              pensamento estratégico, design e desenvolvimento para criar projetos com identidade e
              propósito.
            </p>
            <div className="about-values">
              <div>
                <Code2 size={20} />
                <span>
                  <strong>Qualidade como princípio.</strong>
                  <br />
                  Da arquitetura ao último pixel.
                </span>
              </div>
              <div>
                <AudioLines size={20} />
                <span>
                  <strong>Proximidade em cada etapa.</strong>
                  <br />
                  Escuta, clareza e construção em conjunto.
                </span>
              </div>
            </div>
            <a href="#processo" className="text-link">
              Conheça nosso processo <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="sculpture-stage" aria-hidden="true">
            <div className="sculpture-grid" />
            <div className="sculpture-orbit orbit-one" />
            <div className="sculpture-orbit orbit-two" />
            <div className="metal-sculpture">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="sculpture-core" />
            <span className="sculpture-label">
              L / W<br />
              <small>THINK BEYOND.</small>
            </span>
            <div className="sculpture-floor" />
          </div>
        </div>
      </section>
      <section id="processo" className="section process-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">06 / DO PRIMEIRO INSIGHT AO PRÓXIMO NÍVEL</p>
              <h2>
                Intenção em cada etapa.
                <br />
                <span className="muted-heading">Excelência no caminho.</span>
              </h2>
            </div>
            <p className="section-side">
              Um processo claro.
              <br />
              Uma experiência construída com você.
            </p>
          </div>
          <ol className="process-list">
            {steps.map(([name, title, description], i) => (
              <li className="process-step" key={name}>
                <span className="step-number">0{i + 1}</span>
                <span className="step-track">
                  <i />
                </span>
                <span className="step-name">{name}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={20} />
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="final-cta section">
        <div className="cta-orbit" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">07 / O PRÓXIMO NÍVEL É SEU</p>
          <h2>
            Sua próxima grande ideia
            <br />
            merece uma experiência
            <br />
            <span className="accent">extraordinária.</span>
          </h2>
          <p>
            Transforme sua presença digital com soluções
            <br className="desktop-break" /> feitas para destacar sua marca.
          </p>
          <div className="button-row">
            <a href="#orcamento" className="button">
              Solicitar orçamento <ArrowUpRight size={18} />
            </a>
            <a href="#servicos" className="button button-outline">
              Conhecer serviços <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <QuoteForm />
      <Animations />
    </main>
  );
}
