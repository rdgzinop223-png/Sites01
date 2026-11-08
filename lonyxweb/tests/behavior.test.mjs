import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBrief, scrollTime } from '../lib/validation.mjs';
test('scroll avança, retrocede e mantém um quadro com o mesmo progresso', () => {
  const d = 7.93;
  assert.equal(scrollTime(0, d), 0);
  assert.ok(scrollTime(0.8, d) > scrollTime(0.3, d));
  assert.ok(scrollTime(0.2, d) < scrollTime(0.8, d));
  assert.equal(scrollTime(0.5, d), scrollTime(0.5, d));
  assert.ok(scrollTime(1, d) < d);
  assert.equal(scrollTime(-1, d), 0);
  assert.equal(scrollTime(2, d), d - 0.04);
});
test('briefing rejeita dados inválidos e exige aviso de privacidade', () => {
  const e = validateBrief({
    name: 'a',
    email: 'invalido',
    service: '',
    message: 'curto',
    consent: false,
  });
  assert.deepEqual(Object.keys(e), ['name', 'email', 'service', 'message', 'consent']);
});
test('briefing completo passa na validação sem fazer uma requisição', () => {
  assert.deepEqual(
    validateBrief({
      name: 'Ana Silva',
      email: 'ana@example.com',
      service: 'Criação de site',
      message: 'Gostaria de um site institucional para apresentar meus serviços.',
      consent: true,
    }),
    {},
  );
});
