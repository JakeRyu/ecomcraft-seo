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
    await expect(pricing.getByText("Snapshot", { exact: true }).first()).toBeVisible();
    await expect(pricing.getByText("Insight", { exact: true }).first()).toBeVisible();
    await expect(pricing.getByText("Deep Dive", { exact: true }).first()).toBeVisible();
  });

  test("shows correct prices", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByText("£9", { exact: true })).toBeVisible();
    await expect(pricing.getByText("£19", { exact: true })).toBeVisible();
    await expect(pricing.getByText("£39", { exact: true })).toBeVisible();
  });

  test("Insight card has Most Popular badge", async ({ page }) => {
    await expect(page.getByText("Most Popular")).toBeVisible();
  });

  test("shows three Choose Plan buttons", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByRole("button", { name: /Choose Plan|Selected/ })).toHaveCount(3);
  });
});

// ── Pricing → plan selection interaction ────────────────────────

test.describe("Pricing plan selection", () => {
  const PLANS = ["Snapshot", "Insight", "Deep Dive"] as const;

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
    const snapshot = form.getByRole("button", { name: /Snapshot/ });
    await snapshot.click();
    await expect(snapshot).toHaveAttribute("aria-pressed", "true");
  });

  test("plan selector shows all three plans with prices", async ({ page }) => {
    const form = page.locator("#report-form");
    await expect(
      form.getByRole("button", { name: /Snapshot/ }).filter({ hasText: "£9" })
    ).toBeVisible();
    await expect(
      form.getByRole("button", { name: /Insight/ }).filter({ hasText: "£19" })
    ).toBeVisible();
    await expect(
      form.getByRole("button", { name: /Deep Dive/ }).filter({ hasText: "£39" })
    ).toBeVisible();
  });
});

// ── Report Form validation ──────────────────────────────────────

test.describe("Report Form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() =>
      document.getElementById("report-form")?.scrollIntoView()
    );
  });

  const fillValid = async (page: import("@playwright/test").Page) => {
    const form = page.locator("#report-form");
    await form.getByLabel("Email address").fill("test@example.com");
    const kwInput = page.getByPlaceholder("e.g. plumber in Manchester");
    await kwInput.fill("plumber");
    await kwInput.press("Enter");
    await form.getByLabel("Location or postcode").fill("Bristol");
    await form.getByRole("button", { name: /Snapshot/ }).click();
  };

  test("submitting empty form shows all four errors", async ({ page }) => {
    const form = page.locator("#report-form");
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please enter a valid email address")).toBeVisible();
    await expect(form.getByText("Please add at least one keyword")).toBeVisible();
    await expect(form.getByText("Please enter your location or postcode")).toBeVisible();
    await expect(form.getByText("Please choose a plan")).toBeVisible();
  });

  test("invalid email (no @) shows email error", async ({ page }) => {
    const form = page.locator("#report-form");
    await form.getByLabel("Email address").fill("notanemail");
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("typing in email clears the email error", async ({ page }) => {
    const form = page.locator("#report-form");
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please enter a valid email address")).toBeVisible();

    await form.getByLabel("Email address").fill("a");
    await expect(form.getByText("Please enter a valid email address")).toBeHidden();
  });

  test("adding a keyword clears the keyword error", async ({ page }) => {
    const form = page.locator("#report-form");
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please add at least one keyword")).toBeVisible();

    const kwInput = page.getByPlaceholder("e.g. plumber in Manchester");
    await kwInput.fill("plumber");
    await kwInput.press("Enter");
    await expect(form.getByText("Please add at least one keyword")).toBeHidden();
  });

  test("typing in location clears the location error", async ({ page }) => {
    const form = page.locator("#report-form");
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please enter your location or postcode")).toBeVisible();

    await form.getByLabel("Location or postcode").fill("B");
    await expect(form.getByText("Please enter your location or postcode")).toBeHidden();
  });

  test("selecting a plan clears the plan error", async ({ page }) => {
    const form = page.locator("#report-form");
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please choose a plan")).toBeVisible();

    await form.getByRole("button", { name: /Snapshot/ }).click();
    await expect(form.getByText("Please choose a plan")).toBeHidden();
  });

  test("valid submission shows no errors", async ({ page }) => {
    const form = page.locator("#report-form");
    await fillValid(page);
    await form.getByRole("button", { name: "Get My Visibility Report" }).click();
    await expect(form.getByText("Please enter a valid email address")).toBeHidden();
    await expect(form.getByText("Please add at least one keyword")).toBeHidden();
    await expect(form.getByText("Please enter your location or postcode")).toBeHidden();
    await expect(form.getByText("Please choose a plan")).toBeHidden();
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

  test("About link opens ecomcraft.co.uk in a new tab", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    const about = footer.getByRole("link", { name: "About" });
    await expect(about).toHaveAttribute("href", "https://www.ecomcraft.co.uk");
    await expect(about).toHaveAttribute("target", "_blank");
    await expect(about).toHaveAttribute("rel", /noopener/);
  });

  test("Contact links open ecomcraft.co.uk/contact in a new tab", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    const contacts = footer.getByRole("link", { name: "Contact" });
    await expect(contacts).toHaveCount(2);
    for (const contact of await contacts.all()) {
      await expect(contact).toHaveAttribute(
        "href",
        "https://www.ecomcraft.co.uk/contact"
      );
      await expect(contact).toHaveAttribute("target", "_blank");
      await expect(contact).toHaveAttribute("rel", /noopener/);
    }
  });
});
