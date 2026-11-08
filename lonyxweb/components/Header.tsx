'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { navigation } from '@/lib/content';
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-15% 0px -55% 0px' },
    );
    navigation.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-shell">
        <Link href="/#inicio" aria-label="LonyxWeb — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav aria-label="Navegação principal" className="desktop-nav">
          {navigation.map(([id, label]) => (
            <a
              key={id}
              href={`/#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/entrar" className="login-link">
            Entrar <ArrowUpRight size={13} />
          </Link>
          <a href="/#orcamento" className="button button-small">
            Começar agora <ArrowUpRight size={15} />
          </a>
        </div>
        <button
          className="menu-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação mobile">
          {navigation.map(([id, label]) => (
            <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={17} />
            </a>
          ))}
          <Link href="/entrar" onClick={() => setOpen(false)}>
            Área do cliente
            <ArrowUpRight size={17} />
          </Link>
          <a href="/#orcamento" className="button" onClick={() => setOpen(false)}>
            Começar agora <ArrowUpRight size={17} />
          </a>
        </nav>
      )}
    </header>
  );
}
