import { test, expect } from '@playwright/test';

test('deve exibir o formulário de desafio', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await expect(page.locator('input[placeholder="Nome"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Telefone"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
});

test('deve iniciar a contagem regressiva quando o desafio for iniciado', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  const countdown = page.locator('p:text("Tempo restante:")');
  await expect(countdown).toBeVisible();
});

test('deve mostrar o modal de sucesso quando o envio for clicado em 15 segundos', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  await page.click('button:has-text("Enviar")');
  console.log('Botão "Enviar" clicado');
  await page.waitForTimeout(3000);
  await page.waitForSelector('.modal-box', { state: 'visible' });
  await expect(page.locator('.modal-box p')).toContainText('Desafio finalizado com sucesso!');
});

test('deve mostrar modal de falha se não for enviado dentro de 15 segundos', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  await page.waitForTimeout(16000);
  await page.waitForSelector('.modal-box', { state: 'visible' });
  await expect(page.locator('.modal-box p')).toContainText('Desafio finalizado com falha!');
});

test('deve enviar o desafio e depois testar os botão voltar e página do candidato', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  await page.click('button:has-text("Enviar")');
  console.log('Botão "Enviar" clicado');
  await page.click('button:has-text("✕")');
  console.log('Botão "✕" clicado');
  await page.click('button:has-text("Voltar")');
  console.log('Botão "Voltar" clicado');
  await page.waitForTimeout(3000);
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  const candidateButton = page.locator('a:has-text("Página do Candidato")');
  await candidateButton.waitFor({ state: 'visible' });
  await candidateButton.click();
  console.log('Botão "Página do Candidato" clicado');
  await page.waitForTimeout(3000);
});

test('Ao entrar e sair da página "candidate", a contagem do tempo não deve ser interrompida', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  await page.waitForTimeout(2000);
  const candidateButton = page.locator('a:has-text("Página do Candidato")');
  await candidateButton.waitFor({ state: 'visible' });
  await candidateButton.click();
  console.log('Botão "Página do Candidato" clicado');
  await page.click('button:has-text("Voltar")');
  console.log('Botão "Voltar" clicado');
  console.log('Botão "Página do Candidato" clicado');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Enviar")');
  console.log('Botão "Enviar" clicado');
  await page.click('button:has-text("✕")');
  console.log('Botão "✕" clicado');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("Voltar")');
  console.log('Botão "Voltar" clicado');
  await page.waitForTimeout(3000);
});

test('deve navegar até a página do candidato e exibir informações', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  console.log('Botão "Iniciar Desafio" clicado');
  await page.click('button:has-text("Enviar")');
  console.log('Botão "Enviar" clicado');
  await page.click('button:has-text("✕")');
  console.log('Botão "✕" clicado');
});