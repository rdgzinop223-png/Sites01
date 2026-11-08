'use client';
import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Logo } from './Logo';
const Scene = dynamic(() => import('./LaptopScene'), { ssr: false, loading: () => null });
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function Laptop() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const query = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    let visible = false;
    const sync = () => setActive(visible && query.matches);
    const observer = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { rootMargin: '100px' },
    );
    observer.observe(ref.current);
    query.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', sync);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`laptop-stage ${active ? 'scene-enabled' : ''}`}
      aria-label="Notebook tridimensional com a identidade LonyxWeb"
      role="img"
    >
      <div className="orbital-ring" />
      <div className="laptop-fallback">
        <div className="laptop-screen">
          <Logo />
          <span>IDEIAS EM OUTRA DIMENSÃO.</span>
        </div>
        <div className="laptop-keyboard" />
      </div>
      {active && (
        <SceneBoundary>
          <Scene />
        </SceneBoundary>
      )}
      <div className="laptop-plinth" />
      <div className="stage-caption">
        <span className="status-dot" /> CONSTRUÍDO PARA O EXTRAORDINÁRIO
      </div>
    </div>
  );
}
