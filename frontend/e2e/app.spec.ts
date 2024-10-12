import { expect, test } from "@playwright/test";

test("should have title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Ahorita/);
});

test("should navigate to api docs", async ({ page, context }) => {
  const pagePromise = context.waitForEvent("page");

  await page.goto("/");

  await page.getByRole("link", { name: "Get Started" }).click();

  await page.getByRole("link", { name: "API Docs" }).click();

  const newPage = await pagePromise;

  await newPage.waitForLoadState();

  await expect(newPage).toHaveTitle("API Reference");

  await expect(
    newPage.getByRole("heading", { name: "Ahorita API Docs", level: 1 }),
  ).toBeVisible();
});
