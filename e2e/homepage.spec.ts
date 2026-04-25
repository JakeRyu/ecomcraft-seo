import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// ── Nav ─────────────────────────────────────────────────────────

test.describe("Navigation", () => {
  test("shows logo and desktop links on wide screens", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const nav = page.getByRole("navigation", { name: "main navigation" });
    await expect(page.getByRole("link", { name: "ecomcraft SEO home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "How it works" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Sample Report" })).toBeVisible();
  });

  test("CTA in nav links to the report form", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const nav = page.getByRole("navigation", { name: "main navigation" });
    await expect(
      nav.getByRole("link", { name: "Get My Visibility Report" })
    ).toHaveAttribute("href", "#report-form");
  });

  test("shows hamburger on mobile and hides desktop links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const nav = page.getByRole("navigation", { name: "main navigation" });
    await expect(page.getByRole("button", { name: "Toggle menu" })).toBeVisible();
    // Desktop links are display:none — getByRole excludes them from accessibility tree
    await expect(nav.getByRole("link", { name: "How it works" })).toBeHidden();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const nav = page.getByRole("navigation", { name: "main navigation" });
    const hamburger = page.getByRole("button", { name: "Toggle menu" });

    await hamburger.click();
    await expect(nav.getByRole("link", { name: "How it works" })).toBeVisible();

    await hamburger.click();
    await expect(nav.getByRole("link", { name: "How it works" })).toBeHidden();
  });

  test("mobile menu CTA links to report form", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.getByRole("button", { name: "Toggle menu" }).click();
    const nav = page.getByRole("navigation", { name: "main navigation" });
    await expect(
      nav.getByRole("link", { name: "Get My Visibility Report" })
    ).toHaveAttribute("href", "#report-form");
  });
});

// ── Hero ────────────────────────────────────────────────────────

test.describe("Hero", () => {
  test("renders headline and supporting copy", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Find out how visible your business is online",
      })
    ).toBeVisible();
    await expect(
      page.getByText("An affordable SEO visibility report")
    ).toBeVisible();
  });

  test("primary CTA links to report form", async ({ page }) => {
    // Use hero section scope to avoid nav/form duplicates
    const hero = page.locator("#top");
    await expect(
      hero.getByRole("link", { name: "Get My Visibility Report" })
    ).toHaveAttribute("href", "#report-form");
  });

  test("secondary CTA links to sample report", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "See sample report" })
    ).toHaveAttribute("href", "#sample-report");
  });

  test("shows proof points", async ({ page }) => {
    // Use exact: true to avoid partial match with "No subscriptions, no monthly fees..."
    await expect(page.getByText("No monthly fees", { exact: true })).toBeVisible();
    await expect(page.getByText("UK businesses only", { exact: true })).toBeVisible();
    await expect(page.getByText("Delivered by email", { exact: true })).toBeVisible();
  });

  test("score card shows visibility score and quick wins", async ({ page }) => {
    // exact: true prevents case-insensitive partial match with "Overall visibility score"
    await expect(page.getByText("Visibility Score", { exact: true })).toBeVisible();
    await expect(page.getByText("Quick wins identified")).toBeVisible();
    await expect(page.getByText("Google Business Profile incomplete")).toBeVisible();
  });
});

// ── How It Works ────────────────────────────────────────────────

test.describe("How It Works", () => {
  test("shows three numbered steps", async ({ page }) => {
    const section = page.locator("#how-it-works");
    // exact: true prevents "01" matching "2026" in copyright
    await expect(section.getByText("01", { exact: true })).toBeVisible();
    await expect(section.getByText("02", { exact: true })).toBeVisible();
    await expect(section.getByText("03", { exact: true })).toBeVisible();
    await expect(section.getByText("Enter your keywords")).toBeVisible();
    await expect(section.getByText("Choose your plan")).toBeVisible();
    await expect(section.getByText("Receive your report")).toBeVisible();
  });
});

// ── Pricing ─────────────────────────────────────────────────────

test.describe("Pricing", () => {
  test("shows all three plans", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByText("Starter", { exact: true }).first()).toBeVisible();
    await expect(pricing.getByText("Growth", { exact: true }).first()).toBeVisible();
    await expect(pricing.getByText("Pro", { exact: true }).first()).toBeVisible();
  });

  test("shows correct prices", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByText("£9", { exact: true })).toBeVisible();
    await expect(pricing.getByText("£19", { exact: true })).toBeVisible();
    await expect(pricing.getByText("£39", { exact: true })).toBeVisible();
  });

  test("Growth card has Most Popular badge", async ({ page }) => {
    await expect(page.getByText("Most Popular")).toBeVisible();
  });

  test("shows three Choose Plan buttons", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByRole("button", { name: /Choose Plan|Selected/ })).toHaveCount(3);
  });
});

// ── Pricing → plan selection interaction ────────────────────────

test.describe("Pricing plan selection", () => {
  const PLANS = ["Starter", "Growth", "Pro"] as const;

  for (const plan of PLANS) {
    test(`clicking ${plan} changes button to "Selected ✓" with selected styling`, async ({
      page,
    }) => {
      const pricing = page.locator("#pricing");
      const btn = pricing
        .getByRole("button", { name: /Choose Plan|Selected/ })
        .nth(PLANS.indexOf(plan));

      await btn.click();

      await expect(btn).toHaveText("Selected ✓");
      await expect(btn).toHaveAttribute("aria-pressed", "true");
    });

    test(`clicking ${plan} scrolls to the report form`, async ({ page }) => {
      const pricing = page.locator("#pricing");
      const btn = pricing
        .getByRole("button", { name: /Choose Plan|Selected/ })
        .nth(PLANS.indexOf(plan));

      await btn.click();

      // The report form section should be scrolled into view
      const form = page.locator("#report-form");
      await expect(form).toBeInViewport({ ratio: 0.5 });
    });

    test(`clicking ${plan} pre-selects that plan in the report form`, async ({
      page,
    }) => {
      const pricing = page.locator("#pricing");
      const btn = pricing
        .getByRole("button", { name: /Choose Plan|Selected/ })
        .nth(PLANS.indexOf(plan));

      await btn.click();

      // The matching plan button in the form should be aria-pressed=true
      const form = page.locator("#report-form");
      const planBtn = form.getByRole("button", { name: new RegExp(plan) });
      await expect(planBtn).toHaveAttribute("aria-pressed", "true");
    });
  }
});

// ── Report Form ─────────────────────────────────────────────────

test.describe("Report Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() =>
      document.getElementById("report-form")?.scrollIntoView()
    );
  });

  test("shows all form fields", async ({ page }) => {
    const form = page.locator("#report-form");
    await expect(form.getByLabel("Email address")).toBeVisible();
    await expect(form.getByLabel(/Target keywords/)).toBeVisible();
    await expect(form.getByLabel("Location or postcode")).toBeVisible();
    await expect(form.getByRole("group", { name: "Report plan" })).toBeVisible();
  });

  test("submit button is labelled Get My Visibility Report", async ({ page }) => {
    const form = page.locator("#report-form");
    await expect(
      form.getByRole("button", { name: "Get My Visibility Report" })
    ).toBeVisible();
  });

  test("can add and remove a keyword tag", async ({ page }) => {
    const input = page.getByPlaceholder("e.g. plumber in Manchester");
    await input.fill("plumber London");
    await input.press("Enter");

    // tag div text is "plumber London ×", so use contains match
    await expect(page.getByText("plumber London")).toBeVisible();

    await page.getByRole("button", { name: "Remove plumber London" }).click();
    await expect(page.getByText("plumber London")).toBeHidden();
  });

  test("can select a plan in the form", async ({ page }) => {
    const form = page.locator("#report-form");
    const starter = form.getByRole("button", { name: /Starter/ });
    await starter.click();
    await expect(starter).toHaveAttribute("aria-pressed", "true");
  });

  test("plan selector shows all three plans with prices", async ({ page }) => {
    const form = page.locator("#report-form");
    await expect(
      form.getByRole("button", { name: /Starter/ }).filter({ hasText: "£9" })
    ).toBeVisible();
    await expect(
      form.getByRole("button", { name: /Growth/ }).filter({ hasText: "£19" })
    ).toBeVisible();
    await expect(
      form.getByRole("button", { name: /Pro/ }).filter({ hasText: "£39" })
    ).toBeVisible();
  });
});

// ── Sample Report ───────────────────────────────────────────────

test.describe("Sample Report", () => {
  test("shows score ring and metrics", async ({ page }) => {
    const section = page.locator("#sample-report");
    await expect(section.getByText("Overall Visibility")).toBeVisible();
    // "SEO Score" is unique to the sample report (hero uses plain "SEO")
    await expect(section.getByText("SEO Score")).toBeVisible();
    await expect(section.getByText("Google Presence")).toBeVisible();
    await expect(section.getByText("Local Listings")).toBeVisible();
    await expect(section.getByText("Social Visibility")).toBeVisible();
  });

  test("shows top recommendation callout", async ({ page }) => {
    const section = page.locator("#sample-report");
    await expect(section.getByText("Top recommendation")).toBeVisible();
    // Scope avoids hero card's "Google Business Profile incomplete"
    await expect(
      section.getByText("Your Google Business Profile is missing key information", { exact: false })
    ).toBeVisible();
  });

  test("shows disclaimer", async ({ page }) => {
    await expect(
      page.getByText("Sample report for illustration purposes only")
    ).toBeVisible();
  });
});

// ── Footer ──────────────────────────────────────────────────────

test.describe("Footer", () => {
  test("shows logo and tagline", async ({ page }) => {
    await expect(
      page.getByText("Affordable online visibility reports")
    ).toBeVisible();
  });

  test("shows both link columns", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("Product", { exact: true })).toBeVisible();
    await expect(footer.getByText("Company", { exact: true })).toBeVisible();
  });

  test("shows copyright line", async ({ page }) => {
    await expect(page.getByText(/© 2026 ecomcraft Ltd/)).toBeVisible();
  });
});
