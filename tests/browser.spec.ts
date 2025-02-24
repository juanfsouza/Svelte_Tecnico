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
  const countdown = page.locator('p:text("Tempo restante:")');
  await expect(countdown).toBeVisible();
});

test('deve mostrar o modal de sucesso quando o envio for clicado em 15 segundos', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  await page.waitForTimeout(3000);
  await page.click('button:has-text("Enviar")');
  await expect(page.locator('.modal-box p')).toContainText('Desafio finalizado com sucesso!');
});

test('deve mostrar modal de falha se não for enviado dentro de 15 segundos', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  await page.waitForTimeout(16000);
  await expect(page.locator('div.modal-box')).toContainText('Desafio finalizado com falha!');
});

test('deve navegar até a página do candidato e exibir informações', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('input[placeholder="Nome"]', 'Test User');
  await page.fill('input[placeholder="Telefone"]', '123456789');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.click('button:has-text("Iniciar Desafio")');
  await page.click('button:has-text("Enviar")');
  await page.click('button:has-text("Fechar")');
  await page.waitForTimeout(3000);
  await expect(page.locator('p:has-text("Nome:")')).toContainText('Nome: Test User');
  await expect(page.locator('p:has-text("Telefone:")')).toContainText('Telefone: 123456789');
  await expect(page.locator('p:has-text("Email:")')).toContainText('Email: test@example.com');  
});
