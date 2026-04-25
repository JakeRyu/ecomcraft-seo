# Implement: Business Identity Fields on the Report Request Form

## Context
The "Request your visibility report" form currently asks for email, keywords, service area, and plan. To accurately match a customer's business in SERP results (organic listings, Local Pack, Map results), we need stronger identifiers. This spec adds a **two-section form** with required business basics and an optional accuracy-boosting block. The behaviour is already prototyped in the design — implement faithfully.

## Form Structure (two numbered sections)

### Section 1 — "About your business" (required)
Visual marker: a small ink-black numbered circle `1` next to a 13px uppercase label.

Fields:

| Field | Type | Required | Placeholder | Helper text |
|-------|------|----------|-------------|-------------|
| `bizName` | text | ✅ | `e.g. Smith & Sons Plumbing Ltd` | "Use the exact name on your Google Business Profile for best matching" |
| `website` | url | ✅ | `https://yourbusiness.co.uk` | — |
| `postcode` | text (auto-uppercase on input) | ✅ | `BS1 4EJ` | — |

Layout: `bizName` full-width, then `website` + `postcode` in a 2-column split (`grid-template-columns: 1fr 1fr; gap: 12px`). On screens ≤540px, collapses to a single column via the `.ec-form-row` media query.

### Optional reveal panel — "Improve report accuracy"
A clickable card with `1px dashed rgba(20,20,19,0.2)` border, `16px` radius, `12–18px` padding. Acts as a disclosure trigger.

**Collapsed state**:
- Title: "Improve report accuracy" + an inline accent-orange uppercase pill `+60% MATCH` (10–11px, weight 700, letter-spacing 0.4px) — only show this pill when collapsed
- Subtitle: "Add your Google Business Profile link, phone, and category — optional"
- Trailing chevron `▾` rotates 180° when expanded (transition 0.2s)

**Expanded state**: reveals fields inside a sub-block with `padding: 4px 0 4px 16px` and a left border `2px solid var(--ghost)` to visually group them as optional/secondary.

Optional fields:

| Field | Type | Placeholder | Helper text |
|-------|------|-------------|-------------|
| `gbpUrl` | url | `https://maps.app.goo.gl/...` | "Find yours at [google.com/business](https://google.com/business) → Share" (link in `--link-blue`) |
| `phone` | tel | `+44 117 123 4567` | — |
| `category` | select | `Select category…` | — |

Layout inside the panel: `gbpUrl` full-width, then `phone` + `category` in a 2-column split (same `.ec-form-row` behaviour).

Each optional label gets a muted `· optional` suffix in `--dust-taupe` (`#D1CDC7`).

Category dropdown options:
```
Restaurant / Café
Retail shop
Trades (plumber, electrician, builder)
Beauty & wellness
Professional services (legal, accounting)
Health & medical
Auto services
Home services
Other
```
Style the `<select>` with a custom inline-SVG chevron (no native arrow), placeholder text in `--slate` until a value is chosen.

### Divider
A 1px line in `--ghost` (`#E8E2DA`) separates sections 1 and 2.

### Section 2 — "What to analyse"
Same numbered-circle treatment, label `2`. Wraps the existing Email / Keywords / Service area / Plan fields. Two label changes:
- "Location or postcode" → **"Service area or target city"**
- Placeholder: `e.g. Bristol, or 'Bristol + 10 miles'`

The plan-aware keyword behaviour from the previous handoff stays exactly as-is.

## Validation Rules

In `validate()`, in this order:
1. `!bizName.trim()` → `"Please enter your business name"`
2. `!website.trim()` → `"Please enter your website"`
3. `!postcode.trim()` → `"Please enter your postcode"`
4. `!email || !email.includes('@')` → `"Please enter a valid email address"`
5. `keywords.length === 0` → `"Please add at least one keyword"`
6. `!selectedPlan` → `"Please choose a plan"`
7. `selectedPlan && keywords.length > limit` → existing over-limit message
8. `!location.trim()` → `"Please enter your service area"`

Optional fields (`gbpUrl`, `phone`, `category`) never block submission.

Inline error styling unchanged: 12px text in `--signal-orange` (`#CF4500`), 6px top margin, 12px left padding under each input.

## Field Behaviour Details
- **Postcode** auto-uppercases on every keystroke (`e.target.value.toUpperCase()`)
- **Website** — accept either `https://...` or bare domain; consider light client-side normalisation but don't block on shape
- **GBP URL** — accept `maps.app.goo.gl/*`, `google.com/maps/place/*`, or a Place ID string; backend will resolve

## Design Tokens (reference)
- `--ink` `#141413`, `--canvas` `#F3F0EE`, `--white` `#FFFFFF`
- `--slate` `#696969`, `--ghost` `#E8E2DA`, `--dust-taupe` `#D1CDC7`
- `--signal-orange` `#CF4500`, accent (orange) `#F37338`, link `--link-blue` `#3860BE`
- Pill radius `999px`, card radius `40px`, dashed-card / inline-block radius `16px`, divider 1px
- Inter variable font, weights 450 / 500 / 600 / 700

## State Shape (suggested)
```ts
type ReportFormState = {
  // Section 1 — required
  bizName: string;
  website: string;
  postcode: string;
  // Section 1 — optional
  gbpUrl: string;
  phone: string;
  category: string;
  showOptional: boolean;
  // Section 2 — required (existing)
  email: string;
  keywords: string[];
  kwInput: string;
  location: string;
  selectedPlan: 'Starter' | 'Growth' | 'Pro' | null;
};
```

Persist `selectedPlan` in `localStorage` under `ec_seo_plan` (already working). Consider persisting `bizName`/`website`/`postcode`/`gbpUrl`/`phone`/`category` under `ec_seo_business` for return-visit convenience — opt-in, with a "Forget this info" link in the success state.

## Backend Payload (when wiring submit)
```json
{
  "business": {
    "name": "Smith & Sons Plumbing Ltd",
    "website": "https://smithsplumbing.co.uk",
    "postcode": "BS1 4EJ",
    "gbpUrl": "https://maps.app.goo.gl/abc123",
    "phone": "+44 117 123 4567",
    "category": "Trades (plumber, electrician, builder)"
  },
  "report": {
    "email": "owner@smithsplumbing.co.uk",
    "keywords": ["plumber bristol", "boiler repair bs1"],
    "serviceArea": "Bristol + 10 miles",
    "plan": "Growth"
  }
}
```

## Acceptance Criteria
- [ ] Section 1 numbered "1" with `bizName`, `website`, `postcode` — all required, validated in order
- [ ] `website` + `postcode` render side-by-side on ≥540px, stack below
- [ ] Optional reveal card shows `+60% MATCH` accent pill when collapsed only; chevron rotates on expand
- [ ] Expanded panel has the left ghost border treatment grouping the three optional fields
- [ ] `phone` + `category` render side-by-side; category select uses custom chevron and styles placeholder
- [ ] Divider between sections is `1px var(--ghost)`
- [ ] Section 2 label is "What to analyse"; service-area field renamed
- [ ] Postcode input auto-uppercases
- [ ] Optional fields never trigger validation errors
- [ ] Submit payload nests `business` and `report` correctly
- [ ] No console errors; mobile (≤540px) stacks all split rows cleanly; tap targets ≥44px

## Files Likely Touched
- The form component (search for `id="report-form"` / "Request your visibility report")
- Shared types/constants — add `BUSINESS_CATEGORIES` array
- Form validation module — extend with new required-field checks
- Backend API contract — update to accept the new `business` object
