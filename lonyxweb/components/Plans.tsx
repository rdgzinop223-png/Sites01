'use client';
import { ArrowUpRight, Box, Check, Crown, Layers } from 'lucide-react';
import { plans } from '@/lib/content';
export function Plans() {
  return (
    <section id="planos" className="section plans-section">
      <div className="container">
        <div className="center-heading" data-reveal>
          <p className="eyebrow">04 / EVOLUÇÃO CONTÍNUA</p>
          <h2>
            Mantenha seu projeto
            <br />
            sempre <span className="accent">no topo.</span>
          </h2>
          <p>
            Soluções de manutenção para manter seu ambiente digital
            <br className="desktop-break" /> atualizado, seguro e eficiente.
          </p>
        </div>
        <div className="plans-grid">
          {plans.map((p, i) => {
            const Icon = [Box, Layers, Crown][i];
            return (
              <article
                key={p.name}
                className={`plan-card glass ${p.featured ? 'featured' : ''}`}
                data-reveal
              >
                <div className="plan-icon">
                  <Icon size={29} strokeWidth={1.5} />
                </div>
                <span className="plan-number">0{i + 1}</span>
                <h3>{p.name}</h3>
                <p className="plan-description">{p.description}</p>
                <p className="plan-price">{p.price ?? 'Consultar valores'}</p>
                <span className="plan-price-note">Plano de manutenção digital</span>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={17} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#orcamento"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent('lonyx:plan', { detail: p.name }))
                  }
                  className={`button ${p.featured ? '' : 'button-outline'}`}
                >
                  {p.cta}
                  <ArrowUpRight size={17} />
                </a>
              </article>
            );
          })}
        </div>
        <p className="plans-note">
          Manutenção é continuidade. A criação de sites, aplicativos e sistemas é orçada
          separadamente.
          <br />
          Escopo, prazos e condições de atendimento são definidos em contrato.
        </p>
      </div>
    </section>
  );
}
