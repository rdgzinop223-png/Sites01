import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const port = Number(process.env.SMOKE_PORT || 4319);
const server = spawn(process.execPath, ['scripts/serve.mjs'], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Servidor não iniciou em 10 segundos')), 10000);
    server.stdout.once('data', () => {
      clearTimeout(timer);
      resolve();
    });
    server.once('error', reject);
    server.stderr.once('data', (data) => reject(new Error(data.toString())));
  });
  const origin = `http://127.0.0.1:${port}`;
  for (const route of ['/', '/entrar/', '/privacidade/', '/termos/']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /LonyxWeb/);
    console.log(`OK HTTP 200 ${route}`);
  }
  const home = await (await fetch(origin)).text();
  for (const id of [
    'inicio',
    'diferenciais',
    'servicos',
    'projetos',
    'planos',
    'sobre',
    'processo',
    'orcamento',
  ])
    assert.ok(home.includes(`id="${id}"`), `Seção ${id}`);
  const assets = new Set(
    [...home.matchAll(/(?:src|href)="(\/[^"#?]+)(?:\?[^" ]*)?"/g)]
      .map((m) => m[1])
      .filter((path) => !path.endsWith('/')),
  );
  assets.add('/images/project-veloce.svg');
  assets.add('/images/project-orbit.svg');
  assets.add('/images/project-nexus.svg');
  assets.add('/fonts/manrope-regular.ttf');
  assets.add('/fonts/manrope-bold.ttf');
  for (const asset of assets) {
    const response = await fetch(origin + asset, { method: 'HEAD' });
    assert.equal(response.status, 200, asset);
  }
  console.log(`OK ${assets.size} recursos locais e todas as âncoras principais`);
  const range = await fetch(origin + '/videos/concessionaria.mp4', {
    headers: { Range: 'bytes=0-1023' },
  });
  assert.equal(range.status, 206);
  assert.equal((await range.arrayBuffer()).byteLength, 1024);
  assert.ok(range.headers.get('content-range')?.startsWith('bytes 0-1023/'));
  console.log('OK MP4 com HTTP Range / seek');
  const missing = await fetch(origin + '/rota-inexistente/');
  assert.equal(missing.status, 404);
  console.log('OK página 404');
  const hero = await readFile('components/Hero.tsx', 'utf8');
  assert.ok(!hero.includes('autoPlay'));
  assert.ok(!hero.includes('controls='));
  console.log('OK sem autoplay ou controles de reprodução');
} finally {
  server.kill('SIGTERM');
}
