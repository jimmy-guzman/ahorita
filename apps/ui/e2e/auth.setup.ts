import { test as setup } from "@playwright/test";

const authFile = "e2e/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: /your username\?/i }).fill("hippea");
  await page.getByRole("textbox", { name: /your password\?/i }).fill("123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("link", { name: "Get Started" }).isVisible();

  await page.waitForTimeout(1000);

  await page.context().storageState({ path: authFile });
});
