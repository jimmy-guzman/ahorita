import AxeBuilder from "@axe-core/playwright";
import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

const getAxeViolations = async (page: AxeBuilder["page"]) => {
  const { violations } = await new AxeBuilder({ page }).analyze();

  return violations;
};

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

test("should create tag and task", async ({ page }) => {
  const randomTag = faker.word.noun();
  const randomTagDescription = faker.word.words();
  const randomTask = `${faker.word.verb()} ${faker.word.noun()}`;

  await page.goto("/");

  expect(await getAxeViolations(page)).toEqual([]);

  await page.getByRole("link", { name: "Get Started" }).click();

  await expect(
    page.getByRole("heading", { name: "Add Your New Tag", level: 1 }),
  ).toBeVisible();

  expect(await getAxeViolations(page)).toEqual([]);

  await page.getByRole("textbox", { name: "Your Tag's Name?" }).fill(randomTag);
  await page
    .getByRole("textbox", { name: "Your Tag's Description?" })
    .fill(randomTagDescription);

  await page.getByRole("button", { name: "Add Tag" }).click();

  await expect(
    page.getByRole("heading", { name: randomTag, level: 1 }),
  ).toBeVisible();

  expect(await getAxeViolations(page)).toEqual([]);

  await page.getByRole("button", { name: "Add Task" }).click();

  await expect(
    page.getByRole("heading", { name: "Add Your New Task", level: 2 }),
  ).toBeVisible();

  expect(await getAxeViolations(page)).toEqual([]);

  await page
    .getByRole("textbox", { name: "Your Task's Name?" })
    .fill(randomTask);

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByRole("link", { name: "View Tasks" }).click();

  await expect(
    page.getByRole("heading", { name: "Your Tasks", level: 2 }),
  ).toBeVisible();

  await expect(page.getByRole("cell", { name: randomTask })).toBeVisible();

  expect(await getAxeViolations(page)).toEqual([]);

  await expect(page.getByRole("cell", { name: "Todo" })).toBeVisible();

  const row = page.getByRole("row", {
    name: `${randomTask} Todo Medium Open Menu`,
  });

  await row.getByRole("button", { name: "Open menu" }).click();

  const actions = row.getByRole("list", { name: `${randomTask} actions` });

  await actions.getByText("Status").click();

  await actions.getByRole("button", { name: "Done" }).click();

  await expect(
    page.getByRole("row", { name: `${randomTask} Done Medium Open Menu` }),
  ).toBeVisible();

  await page.getByRole("button", { name: `Delete ${randomTask}` }).click();

  await expect(actions).not.toBeVisible();

  await expect(page.getByRole("cell", { name: randomTask })).not.toBeVisible();

  await page.getByRole("button", { name: "Delete Tag" }).click();

  await expect(page.getByRole("link", { name: randomTag })).not.toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Add Your New Tag", level: 1 }),
  ).toBeVisible();
});
