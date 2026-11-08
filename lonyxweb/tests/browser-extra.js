async (page) => {
  const results = [];
  const check = (ok, label) => {
    if (!ok) throw new Error(label);
    results.push(label);
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:4318/');
  await page.waitForTimeout(700);
  check(
    (await page.locator('.media-state').textContent()) === '',
    'Indicador de carregamento desaparece após vídeo pronto',
  );
  const invalid = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter(
        (h) =>
          h === '#' ||
          (h.startsWith('#') && !document.getElementById(h.slice(1))) ||
          (h.startsWith('/#') && !document.getElementById(h.slice(2))),
      ),
  );
  check(invalid.length === 0, 'Todos os links de âncora apontam para seções existentes');
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Serviços', exact: true })
    .click();
  await page.waitForTimeout(1000);
  await page.locator('canvas').waitFor();
  check(
    await page.locator('canvas').evaluate((c) => c.width > 0 && c.height > 0),
    'Notebook 3D renderizado no desktop',
  );
  await page.mouse.move(450, 600);
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'output/playwright/desktop-services.png' });
  await page.locator('.service-card').nth(1).locator('summary').click();
  check(
    (await page.locator('.service-card').nth(1).getAttribute('open')) !== null,
    'Serviço expande pelo controle nativo',
  );
  await page.locator('.service-card').nth(1).locator('summary').click();
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Planos', exact: true })
    .click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'output/playwright/desktop-plans.png' });
  await page.getByRole('link', { name: 'Sobre', exact: true }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'output/playwright/desktop-about.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4318/');
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const forward = await page.locator('video').evaluate((v) => v.currentTime);
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const reverse = await page.locator('video').evaluate((v) => v.currentTime);
  check(forward > reverse && reverse > 0, 'Vídeo também avança e retrocede no viewport mobile');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.keyboard.press('Escape');
  check(!(await page.locator('#mobile-navigation').count()), 'Menu mobile fecha com Escape');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'output/playwright/mobile-hero.png' });
  return { checks: results.length, results, mobileVideo: { forward, reverse } };
};
