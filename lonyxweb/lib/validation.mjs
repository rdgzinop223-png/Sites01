export function validateBrief(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2)
    errors.name = 'Informe seu nome (pelo menos 2 caracteres).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || ''))
    errors.email = 'Informe um e-mail válido.';
  if (!values.service) errors.service = 'Selecione o que você precisa.';
  if (!values.message || values.message.trim().length < 20)
    errors.message = 'Conte um pouco mais: use pelo menos 20 caracteres.';
  if (!values.consent) errors.consent = 'Confirme que leu o aviso de privacidade.';
  return errors;
}
export function scrollTime(progress, duration) {
  return Math.min(1, Math.max(0, progress)) * Math.max(0, duration - 0.04);
}
