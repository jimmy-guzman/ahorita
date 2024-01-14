import { expect, test } from '@playwright/test';

test('should have title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Ahorita/);
});
