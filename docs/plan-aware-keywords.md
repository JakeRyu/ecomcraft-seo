# Implement: Plan-Aware Keyword Input on the Report Request Form

## Context
The "Request your visibility report" form currently lets users add up to 5 keywords with a tag-style input. We need it to respect the **selected pricing plan's keyword limit** without ever destroying user input. The behaviour described below is already prototyped in the design — implement it faithfully in production code.

## Plan Limits
| Plan | Price | Keyword sets |
|------|-------|--------------|
| Starter | £9 (one-time) | **1** |
| Growth | £19 (one-time) | **2** |
| Pro | £39 (one-time) | **5** |

Define this as a single source of truth, e.g.:
```ts
const PLAN_LIMITS = { Starter: 1, Growth: 2, Pro: 5 } as const;
```
When no plan is selected, default the cap to the maximum (5) so the user can keep typing — the constraint kicks in once they pick a plan.

## Required Behaviour

### 1. Counter chip on the label row
On the same row as the "Target keywords" label, show a small pill on the right with `{currentCount} / {limit}`.
- Idle state: muted text on `--canvas` background
- When `currentCount >= limit`: switch text colour to `--ink` (full strength) to signal we're at the cap
- If no plan is selected yet, append a subtle `· max` after the limit to clarify it's a global ceiling

### 2. Tag display — preserve over-limit entries
Render each added keyword as a removable tag.
- **Within limit** (`index < limit`): default styling — `--canvas` background, `--ink` text, transparent border
- **Over limit** (`index >= limit`): warning styling — light orange background (`#FCE8DD`), dashed `1px` border in `--signal-orange` (`#CF4500`), text in `--signal-orange`, plus an `OVER LIMIT` 10px uppercase label inside the tag
- **Never auto-delete tags** when the user changes plan. They must be the one to remove them.

### 3. Input behaviour at the cap
- `keywords.length < limit` → show input + "Add" button as today
- `keywords.length >= limit` → **hide the input row** and replace it with an inline notice:
  - Text: `{Plan} plan limit reached.` (or just `Limit reached.` if no plan picked)
  - Trailing question: "Need more?" + an outline pill button **"Upgrade to {nextPlan} →"** (Starter→Growth, Growth→Pro, Pro→nothing)
- Pressing Enter or clicking Add when at the cap is a no-op (the input shouldn't be visible anyway, but guard the `addKeyword` function too).

### 4. Over-limit warning banner
When `keywords.length > limit` (i.e. user downgraded after adding), show an alert block below the input area:
- Light orange background (`#FCE8DD`), 1px border `rgba(207,69,0,0.25)`, 12px radius
- `!` glyph in `--signal-orange` on the left
- Headline: `{N} keyword(s) exceed your {Plan} plan` in `--signal-orange`, weight 600
- Body: `Remove the highlighted ones, or upgrade to {nextPlan} to keep them.` (drop the upgrade clause if `Plan === 'Pro'`)
- Right-aligned compact "Upgrade" CTA button (ink black, white text) when a `nextPlan` exists

### 5. Submit validation
In `validate()`:
- `keywords.length === 0` → `"Please add at least one keyword"`
- `selectedPlan && keywords.length > limit` → `"Your {Plan} plan supports {limit} keyword set(s). Remove {N} to continue."` — block submission until resolved
- The existing email / location / plan-required checks stay as-is

### 6. Plan selection wiring
The plan buttons already call `onSelectPlan(plan)`. Make sure:
- Clicking a pricing card on the homepage scrolls to `#report-form` AND pre-selects the plan (already working — preserve it)
- Clicking the **Upgrade to {nextPlan}** buttons inside the keyword section calls `onSelectPlan(nextPlan)` — no scroll needed, the plan-selector buttons in the form should reflect the change immediately
- Selected plan persists in `localStorage` under `ec_seo_plan` (already working)

## Design Tokens (reference)
Use the existing CSS variables / Tokens:
- `--canvas` `#F3F0EE`, `--white` `#FFFFFF`, `--lifted` `#FCFBFA`
- `--ink` `#141413`, `--slate` `#696969`
- `--signal-orange` `#CF4500`, light variant `#FCE8DD` for backgrounds
- Pill radius `999px`, card radius `40px`, inline-alert radius `12–16px`
- Inter variable font, weights 450 / 500 / 600 / 700

## Edge Cases to Cover
1. User adds 5 tags with no plan → picks Starter → 4 tags become "OVER LIMIT" → warning banner shows "4 keywords exceed your Starter plan"
2. User at Pro with 5 tags → downgrades to Starter → warning shows nextPlan upgrade path back to Growth (closest valid), or if you prefer simpler logic, just to the immediate next tier — pick one and document it
3. User at Pro plan limit (5) → no Upgrade button anywhere, just "Pro plan limit reached." with no CTA
4. User removes plan selection (if that's possible in your impl) → cap returns to 5, all tags become valid again

## Files Likely Touched
- The form component (search for "Request your visibility report" / `id="report-form"`)
- Pricing component (already wires `onSelectPlan` — verify the click handler still scrolls to the form)
- Any shared types/constants file — add `PLAN_LIMITS`

## Acceptance Criteria
- [ ] Counter chip visible at all times, accurate
- [ ] Tags never auto-delete on plan change
- [ ] Over-limit tags are visually distinct (dashed orange border + "OVER LIMIT" label)
- [ ] Input row hides at cap, replaced by upgrade prompt
- [ ] Warning banner appears only when over limit, with correct count
- [ ] Submit blocked with clear error when over limit
- [ ] Upgrade CTAs change `selectedPlan` and the cap updates live
- [ ] No console errors; mobile layout (≤640px) wraps cleanly — chip, tags, banner all reflow
