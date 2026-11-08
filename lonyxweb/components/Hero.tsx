'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, LoaderCircle } from 'lucide-react';
import { scrollTime } from '@/lib/validation.mjs';
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  useEffect(() => {
    const el = video.current;
    const root = section.current;
    if (!el || !root) return;
    if (el.readyState >= 2) setState('ready');
    if (el.error) setState('error');
    let disposed = false;
    let cleanup = () => {};
    let pending = 0;
    let trigger: { kill: () => void } | undefined;
    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const sync = () => {
          if (!el.seeking && el.readyState >= 1 && Math.abs(el.currentTime - pending) > 0.025)
            el.currentTime = pending;
        };
        const setup = () => {
          trigger?.kill();
          trigger = ScrollTrigger.create({
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
              pending = scrollTime(self.progress, el.duration);
              sync();
              root.style.setProperty('--video-progress', String(self.progress));
            },
          });
          pending = scrollTime(
            Math.min(
              1,
              Math.max(0, -root.getBoundingClientRect().top / (root.offsetHeight - innerHeight)),
            ),
            el.duration,
          );
          sync();
        };
        el.addEventListener('seeked', sync);
        el.addEventListener('loadedmetadata', setup);
        if (el.readyState >= 1) setup();
        return () => {
          trigger?.kill();
          el.removeEventListener('seeked', sync);
          el.removeEventListener('loadedmetadata', setup);
          el.pause();
        };
      });
      media.add('(prefers-reduced-motion: reduce)', () => {
        el.pause();
        if (el.readyState >= 1) el.currentTime = 0;
      });
      cleanup = () => media.revert();
    };
    const pause = () => el.pause();
    el.addEventListener('play', pause);
    void init();
    return () => {
      disposed = true;
      cleanup();
      el.removeEventListener('play', pause);
    };
  }, []);
  return (
    <section
      ref={section}
      className="hero-scroll"
      id="inicio"
      aria-label="Experiência cinematográfica LonyxWeb"
    >
      <div className="hero-sticky">
        <video
          ref={video}
          className="hero-video"
          poster="/images/ferrari-poster.webp"
          muted
          playsInline
          preload="auto"
          aria-label="Ferrari preta e uma concessionária de luxo, com vídeo controlado pela rolagem"
          onLoadedData={() => setState('ready')}
          onError={() => setState('error')}
        >
          <source src="/videos/concessionaria.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>ESTÚDIO DIGITAL INDEPENDENTE</span>
          <span>DESIGN. CÓDIGO. EXPERIÊNCIA.</span>
        </div>
        <div className="hero-content container">
          <p className="eyebrow">
            <span className="status-dot" /> SOLUÇÕES DIGITAIS EXTRAORDINÁRIAS
          </p>
          <h1>
            Seu projeto digital
            <br />
            no <span>próximo nível.</span>
          </h1>
          <p className="hero-description">
            Sites, aplicativos e soluções digitais criados para marcas que não aceitam o comum.
          </p>
          <div className="button-row">
            <a href="#orcamento" className="button">
              Solicitar orçamento <ArrowUpRight size={19} />
            </a>
            <a href="#projetos" className="button button-outline">
              Explorar projetos <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="hero-note">
            <span className="tiny-line" /> FEITO PARA IR ALÉM DO ESPERADO.
          </div>
        </div>
        <div className="hero-bottom container">
          <a className="scroll-cue" href="#diferenciais">
            <span className="mouse">
              <span />
            </span>
            <span>
              Role para explorar
              <ChevronDown size={14} />
            </span>
          </a>
          <span className="hero-caption">
            PRECISÃO EM CADA DETALHE.
            <br />
            <strong>PERFORMANCE EM CADA EXPERIÊNCIA.</strong>
          </span>
          <span className="sequence-label">
            01 <span>/</span> 05 <ArrowDown size={14} />
          </span>
        </div>
        <div className="hero-progress" />
        <span className="media-state" role="status">
          {state === 'loading' ? (
            <>
              <LoaderCircle size={12} className="spin" /> Preparando experiência…
            </>
          ) : state === 'error' ? (
            'Vídeo indisponível. Exibindo imagem de capa.'
          ) : (
            ''
          )}
        </span>
      </div>
    </section>
  );
}
