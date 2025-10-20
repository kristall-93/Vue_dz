import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Fjallraven - Foldsack No. 1' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Корзина' }).click();
  await page.getByRole('button', { name: 'Очистить корзину ' }).click();
  await expect(page.locator('h2')).toContainText('Корзина пуста');
  await page.getByRole('link', { name: 'Главная' }).click();
  await page.getByRole('link', { name: 'Fjallraven - Foldsack No. 1' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Корзина' }).click();
  await expect(page.getByTestId('summary')).toContainText('$109.95');
  await page.getByTestId('plus').click();
  await expect(page.getByTestId('count')).toHaveValue('2');
  await expect(page.getByTestId('summary')).toContainText('$219.9');
});