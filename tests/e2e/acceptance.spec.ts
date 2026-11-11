import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const VIEWPORT_WIDTHS = [320, 375, 390, 768, 1024, 1280, 1440];
const ALL_ROUTES = [
  "/",
  "/about",
  "/games",
  "/games/chronicles-of-babaylan",
  "/games/habulan",
  "/games/myth-mayhem",
  "/achievements",
  "/news",
  "/connect",
];

test.describe("AVERXON v2.1 E2E Acceptance Suite (AT01 - AT11)", () => {
  test("AT01 & AT02: all primary routes and 4 game pages render semantic landmarks and headings", async ({
    page,
  }) => {
    for (const route of ALL_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("header[role='banner']")).toBeVisible();
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page.locator("footer[role='contentinfo']")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });

  test("AT02 & AT03: homepage renders all 6 chapters with deep-link anchors", async ({
    page,
  }) => {
    await page.goto("/");
    const chapters = [
      "awakening",
      "heritage",
      "four-worlds",
      "milestones",
      "creation",
      "future",
    ];
    for (const id of chapters) {
      await expect(page.locator(`section#${id}`)).toBeVisible();
    }
  });

  test("AT05: prefers-reduced-motion defaults to STATIC fallback without mounting WebGL canvas", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(
      page.locator("[data-quality-resolved='STATIC']")
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='experience-canvas-container']")
    ).toHaveCount(0);
  });

  test("AT06: zero horizontal overflow across 320, 375, 390, 768, 1024, 1280, 1440px", async ({
    page,
  }) => {
    for (const width of VIEWPORT_WIDTHS) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const overflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth
        );
      });
      expect(overflow).toBe(false);
    }
  });

  test("AT08: Connect form validates errors and submits valid inquiry", async ({
    page,
  }) => {
    await page.goto("/connect");
    await page.getByRole("button", { name: /Submit Inquiry/i }).click();
    await expect(page.getByTestId("contact-form-status")).toHaveAttribute(
      "data-form-state",
      "ERROR"
    );

    await page.getByLabel(/Full Name/i).fill("Maria Clara");
    await page.getByLabel(/Email Address/i).fill("maria@averxon.ph");
    await page
      .getByLabel(/Message/i)
      .fill(
        "We would like to partner with AVERXON on a Philippine cultural game exhibition."
      );
    await page.getByRole("button", { name: /Submit Inquiry/i }).click();
    await expect(page.getByTestId("contact-form-status")).toHaveAttribute(
      "data-form-state",
      "SUCCESS"
    );
  });

  test("AT10: passes automated WCAG 2.2 AA axe-core checks on Home, Games, and Connect", async ({
    page,
  }) => {
    for (const route of ["/", "/games", "/connect"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  });
});
