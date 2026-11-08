async (page) => {
  const results = [];
  const check = (condition, label) => {
    if (!condition) throw new Error(label);
    results.push(label);
  };
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Websites', exact: true }).click();
  await page.waitForTimeout(450);
  check((await page.locator('.project-card').count()) === 1, 'Filtro Websites: um projeto');
  await page.getByRole('button', { name: 'Aplicativos', exact: true }).click();
  await page.waitForTimeout(450);
  check(
    (await page.locator('.project-card h3').textContent()) === 'Orbit Workspace',
    'Filtro Aplicativos: Orbit',
  );
  await page.getByRole('button', { name: 'Sistemas', exact: true }).click();
  await page.waitForTimeout(450);
  check(
    (await page.locator('.project-card h3').textContent()) === 'Nexus Analytics',
    'Filtro Sistemas: Nexus',
  );
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await page.waitForTimeout(450);
  check((await page.locator('.project-card').count()) === 3, 'Filtro Todos: três projetos');
  await page.getByRole('button', { name: 'Ver projeto demonstrativo Veloce Motors' }).click();
  check(await page.locator('dialog').evaluate((d) => d.open), 'Modal de projeto abre');
  await page.keyboard.press('Escape');
  check(!(await page.locator('dialog').evaluate((d) => d.open)), 'Modal fecha com Escape');
  await page.locator('#projetos').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'output/playwright/desktop-projects.png' });
  await page.getByRole('link', { name: 'Escolher Avançado', exact: true }).click();
  await page.waitForTimeout(800);
  check(
    (await page.locator('#quote-service').inputValue()) === 'Manutenção — Avançado',
    'Plano preenche a seleção de manutenção',
  );
  await page.getByRole('button', { name: 'Preparar meu briefing' }).click();
  check(
    (await page.locator('.field-error').count()) === 4,
    'Validação apresenta erros junto aos campos',
  );
  check(
    await page.locator('#quote-name').evaluate((el) => el === document.activeElement),
    'Foco vai para primeiro campo inválido',
  );
  await page.locator('#quote-name').fill('Pessoa de Teste');
  await page.locator('#quote-email').fill('teste@example.com');
  await page
    .locator('#quote-message')
    .fill('Gostaria de criar uma experiência digital cinematográfica para minha marca.');
  await page.locator('#quote-consent').check();
  await page.getByRole('button', { name: 'Preparar meu briefing' }).click();
  check(
    await page
      .getByText('Briefing preparado. Nenhuma solicitação foi enviada.', { exact: true })
      .isVisible(),
    'Feedback esclarece que nada foi enviado',
  );
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Baixar briefing' }).click();
  const download = await downloadPromise;
  check(download.suggestedFilename() === 'briefing-lonyxweb.txt', 'Download do briefing funciona');
  await page.screenshot({ path: 'output/playwright/desktop-briefing.png' });
  for (const route of ['entrar', 'privacidade', 'termos']) {
    const response = await page.goto(`http://127.0.0.1:4318/${route}/`);
    check(
      response.status() === 200 && (await page.locator('h1').count()) === 1,
      `Rota /${route} abre corretamente`,
    );
  }
  await page.goto('http://127.0.0.1:4318/');
  await page
    .locator('video')
    .evaluate((v) =>
      v.readyState >= 2
        ? Promise.resolve()
        : new Promise((r) => v.addEventListener('loadeddata', r, { once: true })),
    );
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
  await page.waitForTimeout(650);
  const forward = await page
    .locator('video')
    .evaluate((v) => ({ time: v.currentTime, paused: v.paused }));
  check(forward.time > 4 && forward.paused, 'Vídeo avança pelo scroll e permanece pausado');
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
  await page.waitForTimeout(650);
  const reverse = await page.locator('video').evaluate((v) => v.currentTime);
  check(reverse < forward.time && reverse > 1, 'Vídeo retrocede com scroll reverso');
  await page.waitForTimeout(500);
  check(
    Math.abs((await page.locator('video').evaluate((v) => v.currentTime)) - reverse) < 0.03,
    'Vídeo mantém o quadro quando o scroll para',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(600);
  check(
    await page.getByRole('button', { name: 'Abrir menu' }).isVisible(),
    'Menu mobile disponível',
  );
  await page.screenshot({ path: 'output/playwright/mobile-hero.png' });
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  check(
    await page.getByRole('navigation', { name: 'Navegação mobile' }).isVisible(),
    'Menu mobile abre',
  );
  await page
    .getByRole('navigation', { name: 'Navegação mobile' })
    .getByRole('link', { name: 'Planos', exact: true })
    .click();
  await page.waitForTimeout(900);
  check(!(await page.locator('#mobile-navigation').count()), 'Menu fecha após navegação');
  await page.screenshot({ path: 'output/playwright/mobile-plans.png' });
  for (const width of [375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(150);
    check(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `Sem overflow horizontal em ${width}px`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  check((await page.locator('canvas').count()) === 0, 'Mobile usa alternativa leve sem WebGL');
  await page.screenshot({ path: 'output/playwright/mobile-services.png' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4318/');
  await page.waitForTimeout(1000);
  check(
    await page.evaluate(
      () => document.querySelector('#inicio').offsetHeight <= Math.max(innerHeight, 650) + 1,
    ),
    'Redução de movimento remove trecho longo de scroll',
  );
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await page.waitForTimeout(300);
  check(
    (await page.locator('video').evaluate((v) => v.currentTime)) === 0,
    'Redução de movimento mantém primeiro quadro',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:4318/');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'output/playwright/desktop-hero.png' });
  check(errors.length === 0, 'Sem erros de execução JavaScript nas interações');
  return {
    checks: results.length,
    results,
    errors,
    videoEvidence: { forward: forward.time, reverse },
  };
};
