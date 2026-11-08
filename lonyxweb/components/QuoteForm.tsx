'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDownToLine, ArrowUpRight, Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import { validateBrief } from '@/lib/validation.mjs';
const initial = { name: '', email: '', service: '', message: '', consent: false };
export function QuoteForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [draft, setDraft] = useState('');
  useEffect(() => {
    const choose = (event: Event) => {
      const name = (event as CustomEvent<string>).detail;
      if (['Iniciante', 'Avançado', 'Empresarial'].includes(name)) {
        setValues((v) => ({ ...v, service: `Manutenção — ${name}` }));
        setStatus('idle');
      }
    };
    window.addEventListener('lonyx:plan', choose);
    return () => window.removeEventListener('lonyx:plan', choose);
  }, []);
  const change = (key: keyof typeof initial, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
    setStatus('idle');
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validateBrief(values);
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`quote-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setStatus('loading');
    try {
      const text = `BRIEFING LONYXWEB\n\nNome: ${values.name.trim()}\nE-mail: ${values.email.trim()}\nServiço: ${values.service}\n\nSobre o projeto:\n${values.message.trim()}\n\nEste documento foi preparado localmente. Nenhuma solicitação foi enviada.\n`;
      setDraft(text);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'briefing-lonyxweb.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section id="orcamento" className="section quote-section">
      <div className="container quote-layout">
        <div data-reveal>
          <p className="eyebrow">08 / VAMOS CONVERSAR</p>
          <h2>
            Grandes projetos
            <br />
            começam com
            <br />
            <span className="accent">uma boa ideia.</span>
          </h2>
          <p className="body-copy">
            Conte o que você tem em mente. Vamos dar forma ao seu próximo passo digital.
          </p>
          <div className="form-info">
            <ShieldCheck size={20} />
            <p>
              <strong>Seu briefing fica com você.</strong>
              <br />O envio online ainda não está disponível. Prepare e baixe seu briefing neste
              formulário, sem transmitir dados.
            </p>
          </div>
        </div>
        <form className="quote-form glass" onSubmit={submit} noValidate>
          <div className="form-row">
            <div className="field">
              <label htmlFor="quote-name">
                Seu nome <span>*</span>
              </label>
              <input
                id="quote-name"
                name="name"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                value={values.name}
                onChange={(e) => change('name', e.target.value)}
                required
                maxLength={120}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'error-name' : undefined}
              />
              {errors.name && (
                <span className="field-error" id="error-name">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="quote-email">
                E-mail <span>*</span>
              </label>
              <input
                id="quote-email"
                name="email"
                type="email"
                spellCheck={false}
                autoComplete="email"
                placeholder="voce@empresa.com"
                value={values.email}
                onChange={(e) => change('email', e.target.value)}
                required
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'error-email' : undefined}
              />
              {errors.email && (
                <span className="field-error" id="error-email">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="quote-service">
              O que você precisa? <span>*</span>
            </label>
            <select
              id="quote-service"
              name="service"
              value={values.service}
              onChange={(e) => change('service', e.target.value)}
              required
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'error-service' : undefined}
            >
              <option value="">Selecione uma solução</option>
              <option>Criação de site</option>
              <option>Desenvolvimento de aplicativo ou sistema</option>
              <option>Manutenção — Iniciante</option>
              <option>Manutenção — Avançado</option>
              <option>Manutenção — Empresarial</option>
              <option>Quero conversar sobre minha ideia</option>
            </select>
            {errors.service && (
              <span className="field-error" id="error-service">
                {errors.service}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor="quote-message">
              Conte um pouco sobre seu projeto <span>*</span>
            </label>
            <textarea
              id="quote-message"
              name="message"
              rows={4}
              placeholder="Sua ideia, seus objetivos e o que você quer transformar…"
              value={values.message}
              onChange={(e) => change('message', e.target.value)}
              required
              minLength={20}
              maxLength={4000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'error-message' : undefined}
            />
            {errors.message && (
              <span className="field-error" id="error-message">
                {errors.message}
              </span>
            )}
          </div>
          <div>
            <label className="checkbox-label">
              <input
                id="quote-consent"
                type="checkbox"
                checked={values.consent}
                onChange={(e) => change('consent', e.target.checked)}
                required
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'error-consent' : undefined}
              />
              <span>
                Li o <Link href="/privacidade">aviso de privacidade</Link> e entendo que este
                formulário prepara um arquivo local, sem enviar uma solicitação.
              </span>
            </label>
            {errors.consent && (
              <span className="field-error" id="error-consent">
                {errors.consent}
              </span>
            )}
          </div>
          <button type="submit" className="button form-submit" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                <LoaderCircle className="spin" size={18} /> Preparando briefing…
              </>
            ) : (
              <>
                Preparar meu briefing <ArrowUpRight size={18} />
              </>
            )}
          </button>
          <div aria-live="polite">
            {status === 'ready' && (
              <div className="form-result">
                <Check size={21} />
                <div>
                  <strong>Briefing preparado. Nenhuma solicitação foi enviada.</strong>
                  <p>Baixe o documento para guardar os detalhes do seu projeto.</p>
                  <button type="button" onClick={download}>
                    Baixar briefing <ArrowDownToLine size={16} />
                  </button>
                </div>
              </div>
            )}
            {status === 'error' && (
              <p className="field-error">Não foi possível preparar o arquivo. Tente novamente.</p>
            )}
          </div>
          <p className="form-footnote">
            * Campos obrigatórios · Integração de atendimento pendente.
          </p>
        </form>
      </div>
    </section>
  );
}
