'use client';
import { useEffect } from 'react';
export function Animations() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let revert = () => {};
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0.35 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 93%', once: true },
              },
            );
          });
          gsap.utils.toArray<HTMLElement>('.process-step').forEach((el) => {
            ScrollTrigger.create({
              trigger: el,
              start: 'top 68%',
              end: 'bottom 38%',
              toggleClass: 'step-active',
            });
          });
        });
        revert = () => context.revert();
      },
    );
    return () => {
      disposed = true;
      revert();
    };
  }, []);
  return null;
}
