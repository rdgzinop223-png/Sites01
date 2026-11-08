'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { projects } from '@/lib/content';
export function Projects() {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  return (
    <section id="projetos" className="section projects-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">03 / EXPLORAR POSSIBILIDADES</p>
            <h2>
              Ideias ganham forma.
              <br />
              <span className="muted-heading">Experiências ganham vida.</span>
            </h2>
          </div>
          <p className="section-side">
            Projetos que transformam ideias em experiências.
            <br />
            <span>Estudos conceituais. Possibilidades reais.</span>
          </p>
        </div>
        <div className="project-toolbar">
          <div className="filters" role="group" aria-label="Filtrar projetos">
            {['Todos', 'Websites', 'Aplicativos', 'Sistemas'].map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                className={filter === item ? 'selected' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="demo-note">PORTFÓLIO DEMONSTRATIVO</span>
        </div>
        <motion.div layout={!reduced} className="projects-grid">
          <AnimatePresence mode="popLayout">
            {projects
              .filter((p) => filter === 'Todos' || p.category === filter)
              .map((p, index) => (
                <motion.article
                  layout={!reduced}
                  key={p.id}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                  className="project-card"
                >
                  <button
                    className="project-cover"
                    onClick={() => setSelected(p)}
                    aria-label={`Ver projeto demonstrativo ${p.name}`}
                  >
                    <Image
                      src={p.image}
                      alt={`Interface conceitual do projeto ${p.name}`}
                      width={900}
                      height={650}
                    />
                    <span className="example-badge">EXEMPLO CONCEITUAL</span>
                    <span className="project-open">
                      <ArrowUpRight size={23} />
                    </span>
                  </button>
                  <div className="project-meta">
                    <span>
                      {p.category} / 0{index + 1}
                    </span>
                    <span>ESTUDO LONYXWEB</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="project-bottom">
                    <span>{p.tech.join(' · ')}</span>
                    <button onClick={() => setSelected(p)} aria-label={`Ver detalhes de ${p.name}`}>
                      Ver projeto <ArrowUpRight size={16} />
                    </button>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </motion.div>
        <p className="project-disclaimer">
          Os projetos acima são exemplos criados para apresentar possibilidades visuais. Não
          representam clientes ou resultados comerciais.
        </p>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="dialog-inner">
            <button
              className="dialog-close"
              onClick={() => setSelected(null)}
              aria-label="Fechar detalhes do projeto"
            >
              <X />
            </button>
            <Image
              src={selected.image}
              alt={`Conceito ${selected.name}`}
              width={900}
              height={650}
            />
            <div className="dialog-content">
              <p className="eyebrow">PROJETO DEMONSTRATIVO / {selected.category}</p>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <div className="tech-tags">
                {selected.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <p className="notice">
                Este é um estudo de interface, sem cliente associado e sem aplicação externa
                publicada.
              </p>
              <a href="#orcamento" className="button" onClick={() => setSelected(null)}>
                Quero criar meu projeto <ArrowRight size={17} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
