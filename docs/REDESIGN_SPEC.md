# Barnick Pracharani: "Press Sheet" redesign spec (Design Maker v1)

Branch: feat/redesign-2026. Repo: /Users/avee/workspace/barnick/barnick-website-v2. I based every decision on reading the current code and the live site (fetched 2026-11-15). The live site still shows "AI যুগে", "100+ clients" and a coming-soon sticker.

---

## 1. Concept

**"Press Sheet": the homepage set like a printer's specimen sheet.** The page uses a cream paper ground, ink type set in a Bengali serif, and burnt-orange used only where a pressman would mark a sheet: rules, registration marks, section numbers and the one button that matters. Edges stay sharp like trimmed stock. CSS crop marks and a tonal colour bar replace the dot pattern. Photos sit below the fold as numbered plates with captions.

**Why it fits.** The look tells the corporate/NGO admin and the SME owner that this is a 37-year-old press that owns its machines, which sets it apart from anonymous "inbox for price" pages. The F-commerce seller gets a mobile, one-thumb path: need card, then instant price, then Messenger. Restraint (one accent colour, typography first, no hero photo) keeps LCP text-driven and keeps the page light on low-end Android.

---

## 2. Design tokens

### 2.1 Colour roles
All colours come from cream #F3EEE3, ink #111111 and orange #D9541E, or from warm neutrals derived from them. There is no blue anywhere; the logo PNG sits on the palette untouched.

| Token (CSS var, HSL triplet) | Hex | Role | Measured contrast |
|---|---|---|---|
| `--background` 41 40% 92.2% | #F3EEE3 | page ground | – |
| `--card` / `--popover` 42 50% 96.1% | #FAF7F0 | raised "paper" surfaces (estimator form, portfolio captions, sheet menu) | – |
| `--secondary` / `--muted` 41 33% 87.1% | #E9E2D3 | sunken bands (trust strip, how-it-works) and inactive segment fill | – |
| `--foreground` 0 0% 6.7% | #111111 | body text, rules, ink surfaces | 16.32:1 on cream |
| `--ink-2` 37 7% 22.4% | #3D3A35 | secondary body / lead copy | 9.78 on cream, 8.78 on #E9E2D3 |
| `--muted-foreground` 37 9% 33.7% | #5E584E | captions, meta, helper text | 6.09 on cream, 5.46 on #E9E2D3, 6.58 on paper |
| `--input` 37 7% 51% | #8A8378 | form-control borders (non-text, needs 3:1) | 3.24 on cream |
| `--border` 41 23% 79% | #D6CEBD | hairlines and dividers (decorative only) | – |
| `--primary` 17 76% 48.4% | #D9541E | primary CTA fill, rules, icons, registration marks, display accent text ≥24px | 3.47 on cream (large text and graphics only) |
| `--primary-foreground` **0 0% 6.7%** (changed from cream) | #111111 | text on orange buttons | 4.71:1 |
| `--primary-hover` 17 77% 60% | #E8774A | hover fill for orange buttons (lighter, so ink text gets more contrast) | ink on it 6.45 |
| `--primary-strong` 18 78% 36.5% | #A63F14 | the **only** orange allowed for small text: section numbers, inline links, warning icons | 5.43 on cream, 4.87 on #E9E2D3, 5.87 on paper, 4.84 on tint |
| `--accent` 22 68% 88.8% | #F6DDCF | orange tint: note boxes, selected-row wash | ink on it 14.53 |
| `--surface-ink` 0 0% 6.7% | #111111 | design-service band, price panel, footer | – |
| `--on-ink` 41 40% 92.2% | #F3EEE3 | text on ink | 16.32 |
| `--on-ink-muted` 40 14% 70% | #BDB6A8 | secondary text on ink | 9.37 |
| (orange on ink) | #D9541E | eyebrows and icons on ink | 4.71 (passes for normal text) |
| `--destructive` 4 76% 40% | #B42318 | form errors only | – |
| `--ring` 0 0% 6.7% | #111111 | focus outline (switches to cream on ink surfaces) | – |

**Hard rules**
- Orange #D9541E as text only at ≥24px regular or ≥18.66px bold. Anything smaller uses #A63F14, or the colour is used for rules and icons only.
- Primary buttons: ink text on orange, never white text on orange.
- Focus: everywhere `outline: 2px solid var(--focus-ring); outline-offset: 2px`. `--focus-ring` is #111111 by default and #F3EEE3 inside `[data-surface="ink"]`.
- `::selection`: orange background with ink text.

### 2.2 Typography
No new font families or weights. Fix `Geist` in app/layout.tsx so it has `display: "swap"`, as the constraint requires (it currently has none).

| Stack | Tailwind | Families |
|---|---|---|
| Display | `font-display` | Fraunces 500/600 (Latin), then Noto Serif Bengali 800 (Bangla glyphs fall through), then Georgia |
| Body (en) | `font-sans` | Geist |
| Body (bn) | `font-bengali` (applied on `html[lang=bn] body`) | Noto Sans Bengali 400/600/700, then Geist |

**Scale.** Add these to the `fontSize` extension in tailwind.config.ts. Bengali line-heights are enforced in globals.css under `html[lang="bn"]`.

| Token | Size | Weight | LH en / bn | Tracking en / bn | Use |
|---|---|---|---|---|---|
| `text-display-xl` | `clamp(2.125rem, 1.35rem + 3.3vw, 3.75rem)` (34px at 360, 60px at 1280) | 600 serif | 1.06 / 1.25 | -0.02em / 0 | hero h1 |
| `text-display-l` | `clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)` (28 to 40px) | 600 serif | 1.1 / 1.3 | -0.015em / 0 | section h2 |
| `text-display-m` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` (22 to 28px) | 500 serif | 1.2 / 1.35 | 0 | card titles in need cards, CTA phone number, footer wordmark at smaller sizes |
| `text-price` | `clamp(2.5rem, 2.1rem + 1.6vw, 3rem)` (40 to 48px) | 600 serif, `tabular-nums` | 1 / 1.15 | -0.01em / 0 | estimator total |
| `text-lead` | 18px (1.125rem) | 400 | 1.6 / 1.75 | 0 | hero subtitle, section intros |
| `text-base` | 16px | 400 | 1.6 / 1.75 | 0 | body. **Bengali body never below 16px.** |
| `text-sm` | 14px | 400/600 | 1.5 / 1.6 | 0 | captions, meta, helper text (minimum size for any Bengali label) |
| eyebrow | bn 14px / en 12px | 600 | 1.4 | en `uppercase tracking-[0.14em]` / bn none | section labels |
| h3 | 18px mobile, 20px at lg | 600 sans | 1.35 / 1.45 | 0 | card and step titles (stay sans) |

- Never apply uppercase or letter-spacing to Bengali. The existing globals.css overrides stay. Delete the `html[lang="bn"] .text-\[11px\]` hack: no `text-[11px]` remains after the redesign.
- **Eyebrow component.** Update `sectionLabelClass` in lib/typography.ts and add a new `<Eyebrow>` in `components/ui/eyebrow.tsx`. It renders an optional section number in `font-display text-primary-strong` (for example "০২"), a 24px × 1px orange rule (`h-px w-6 bg-primary`), then the label in ink-2. Bengali numbers come from `toBengaliDigits` (lib/formatBn.ts).

### 2.3 Spacing, grid, containers
- Base unit 4px (the Tailwind default).
- Gutters: `px-4` (16px) below 640, `sm:px-6`, `lg:px-8`.
- Container: `max-w-[75rem] mx-auto` (1200px). Long-form reading width: `max-w-[68ch]`.
- Section padding: `py-16` mobile (64px), `lg:py-28` desktop (112px). Dense bands (trust strip, logo band): `py-10 lg:py-14`.
- Grid: 4 columns with `gap-4` on mobile; 12 columns with `gap-8` at lg.
- **Section header pattern** ("masthead rule"): a 1px ink top rule (`border-t border-foreground`) across the container, then `pt-6`, the Eyebrow, then `mt-3` and the h2 (`text-display-l`), then `mt-4` and an optional lead (`text-lead text-ink-2 max-w-[56ch]`). The block is left-aligned everywhere, with no centred headers.
- Navbar height: 64px (`h-16`), 72px at lg (`lg:h-[72px]`).
- Mobile sticky bar: 72px including the safe area. Set `main` to `pb-24 md:pb-0`.

### 2.4 Radii, borders, shadows
- **Radius 0 everywhere** (trimmed-stock edges). Keep the global `[class*="rounded"]{border-radius:0!important}` safety net and the `--radius: 0` token, and also delete every `rounded-full`, `rounded-xl` and `rounded-2xl` from the touched components. The only round things are the logo PNG itself and the registration-mark SVG.
- Borders:
  - hairline `border-border` (#D6CEBD, 1px) for dividers;
  - control border `border-input` (#8A8378) for inactive pills and inputs;
  - emphasis `border-foreground` (1px) for masthead rules and selected states.
- Shadows: only one, `shadow-paper` = `0 1px 0 #D6CEBD, 0 18px 32px -24px rgba(17,17,17,.22)`, defined in tailwind `boxShadow`. It is used on the estimator form card, need cards on hover and the mobile sheet. Remove the default `shadow` and `shadow-sm` from button variants.

### 2.5 Decorative motifs (CSS and inline SVG only)
1. **`.crop-marks` utility** (globals.css `@layer utilities`): corner ticks drawn with 8 background gradients.
   ```css
   .crop-marks{--cm:14px;--cw:1px;--cc:hsl(var(--foreground)/.5);
     background-image:linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc)),linear-gradient(var(--cc),var(--cc));
     background-repeat:no-repeat;
     background-size:var(--cm) var(--cw),var(--cw) var(--cm),var(--cm) var(--cw),var(--cw) var(--cm),var(--cm) var(--cw),var(--cw) var(--cm),var(--cm) var(--cw),var(--cw) var(--cm);
     background-position:0 0,0 0,100% 0,100% 0,0 100%,0 100%,100% 100%,100% 100%;}
   ```
   Used on the hero process frame (desktop), the price panel wrapper and the portfolio "ask" tile.
2. **`<RegMark/>`** (new: `components/ui/reg-mark.tsx`): a 16px inline SVG with a circle r=5 and a crosshair, stroke `currentColor` 1.25, `aria-hidden`, class `text-primary`. Used in the hero eyebrow and before the CTA eyebrow.
3. **`<ColorBar/>`** (new: `components/ui/color-bar.tsx`): a press colour-control strip, `aria-hidden`, height 6px, `flex`. Ten equal segments in this order: #111111, #3D3A35, #5E584E, #8A8378, #D6CEBD, #F3EEE3 (with a 1px #D6CEBD outline), #F6DDCF, #E8774A, #D9541E, #A63F14. These are palette tints only. Placed at the bottom edge of the hero and the top edge of the footer.
4. **No grain and no dot pattern.** Remove every `<DotPattern/>` usage (hero, estimator, FAQ). Keep `components/ui/dot-pattern.tsx` unused, or delete it if nothing imports it.

### 2.6 Motion
- Durations: 150ms for colour and hover, 240ms for accordion, menu sheet and sticky bar. Easing `cubic-bezier(0.2,0,0,1)`. Add `transitionTimingFunction.press` to Tailwind.
- No scroll-triggered reveal animations, and nothing animates in the hero text block (protects LCP and INP).
- Hover: buttons change fill. Need cards lift (`-translate-y-0.5 shadow-paper`). Portfolio images scale 1.02 inside an overflow-hidden frame.
- Marquee (logo band, desktop only): `--duration: 60s`, paused on hover **and** `:focus-within`. Under `prefers-reduced-motion: reduce` the marquee is not rendered; a static wrapping grid takes its place.
- Every transition gets `motion-reduce:transition-none motion-reduce:transform-none`. HeroProductionFlow already respects reduced motion through `hooks/use-process-step-animation.ts`; keep that.
- `html { scroll-behavior: smooth }` only inside `@media (prefers-reduced-motion: no-preference)`. Today `scroll-smooth` is unconditional; move it.

---

## 3. Global shell

### 3.1 globals.css (rewrite the token block, keep the Bengali rules)
- Replace the `:root` vars with §2.1, adding the new vars `--ink-2`, `--primary-hover`, `--primary-strong`, `--surface-ink`, `--on-ink`, `--on-ink-muted` and `--focus-ring: 0 0% 6.7%`.
- Replace `* { @apply border-border outline-ring/50; }` with `* { @apply border-border; }`. Then add:
  ```css
  :focus-visible{outline:2px solid hsl(var(--focus-ring));outline-offset:2px}
  [data-surface="ink"]{--focus-ring:41 40% 92.2%}
  ```
- Scroll offset:
  ```css
  html{scroll-padding-top:5rem}
  @media(min-width:1024px){html{scroll-padding-top:6rem}}
  ```
  Delete the `#estimate,#faq,#products,#contact{scroll-margin-top}` block and every `scroll-mt-[7.5rem]` class in components.
- Bengali: `html[lang="bn"] body{line-height:1.75}`. h1 and h2 in bn get `line-height:1.25` (display) and `1.3` (h2) through `html[lang="bn"] .text-display-xl{line-height:1.25}` and `html[lang="bn"] .text-display-l{line-height:1.3}`. h3 in bn gets 1.45. Keep the uppercase and tracking neutralisers.
- Add `.crop-marks`. Keep `.scrollbar-hide`.

### 3.2 tailwind.config.ts
- Add colours `ink-2`, `primary.hover`, `primary.strong` and `surface-ink`, plus `on-ink.DEFAULT` and `on-ink.muted`.
- Add the `fontSize` tokens from §2.2, `boxShadow.paper` and `transitionTimingFunction.press`.
- Keep the `xs: 375px` screen. Keep the `marquee` keyframes.

### 3.3 components/ui/button.tsx (variants)
- Base: `inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-150 ease-press disabled:opacity-50 [&_svg]:size-[18px] [&_svg]:shrink-0`. Remove the ring classes; global focus-visible handles focus.
- Variants:
  - `default`: `bg-primary text-primary-foreground hover:bg-primary-hover` (ink on orange)
  - `ink`: `bg-foreground text-background hover:bg-ink-2`
  - `outline`: `border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background`
  - `ghost`: `hover:bg-muted`
  - `link`: `text-primary-strong underline underline-offset-4 decoration-1 hover:decoration-2`
  - delete `secondary` if unused (grep first)
- Sizes: `default h-11 px-5 text-sm`, `lg h-12 px-6 text-base`, `sm h-9 px-3 text-sm` (desktop-only contexts), `icon h-11 w-11`.

### 3.4 Navbar (components/navbar/navbar.tsx, nav-menu.tsx, navigation-sheet.tsx, logo.tsx, components/language-toggle.tsx)
- **Structure**: `<header className="fixed inset-x-0 top-0 z-40 h-16 lg:h-[72px] border-b border-border bg-background/90 backdrop-blur-sm" data-track-source="navbar">` with an inner container `max-w-[75rem] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between`. This replaces the floating `top-6 inset-x-4` card. The `data-track-source` fixes contact clicks from the nav, which today fall through to the page path.
- **Skip link** as the first child of `<body>` content: `<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-foreground text-background px-4 py-3">{t("a11y.skip")}</a>`. Render it in navbar.tsx before the header. The `main` element in app/page.tsx and content-page gets `id="main"`.
- **Logo** (logo.tsx):
  - `/barnick.png` at 36×36 (`h-9 w-9`, lg `h-10 w-10`), with no filter, crop or background change.
  - `alt={t("logo.name")}` (today it is "barnick Logo").
  - Wordmark `font-display text-lg lg:text-xl font-semibold` showing `t("logo.name")`.
  - The link is `min-h-11` and gets `aria-label={t("logo.name")}`.
- **Desktop nav** (md and up), `<nav aria-label={t("nav.primaryLabel")}>`, gap-7, links `text-sm font-medium py-3`, hover with a 1px underline offset 6px in `decoration-primary`.
  - Order: `nav.portfolio` (/#products), `nav.estimate` (/#estimate), `nav.design` (/#design), `nav.guide` (/guide), `nav.faq` (/#faq).
  - `nav.contact` is dropped from desktop because the CTA button replaces it.
- **Right cluster**: LanguageToggle, then (md and up) `<Button size="default">` as `<a href={facebookInsights.messengerUrl} target="_blank" rel="noopener noreferrer" data-track-item="nav_messenger">` with the MessageCircle icon and `t("cta.messenger")`.
- **LanguageToggle**:
  - Variant `ghost`, `h-11 px-3 border border-input`.
  - Label shows the *target* language: `t("lang.switchTo")` ("English" in bn mode, "বাংলা" in en mode). `title` and `aria-label` are `t("lang.switchTitle")`. Remove the Languages icon on mobile (`hidden sm:inline`).
  - The pre-mount placeholder keeps the same box (`h-11 w-[84px]`) to avoid CLS.
- **Mobile sheet** (navigation-sheet.tsx):
  - Trigger: `Button variant="outline" size="icon"` with `aria-label={t("nav.menuOpen")}`.
  - Content: `side="right"`, `bg-card w-[86vw] max-w-sm p-0 shadow-paper`.
  - Header row: Logo plus the close control (44px).
  - List: each link wrapped in `SheetClose asChild`, so the sheet closes on hash links. Rows are `min-h-14 border-b border-border px-5 flex items-center font-display text-xl`, in the order portfolio, estimate, design, guide, faq, contact, policies.
  - Footer block `p-5 space-y-3`: Messenger `Button size="lg" className="w-full"` (data-track-item="menu_messenger"), Call `Button variant="outline" size="lg" className="w-full"` as `<a href={getPhoneUrl()} data-track-item="menu_call">`, and LanguageToggle.
  - **Delete** the hard-coded English "Get Started" button.
  - Wrap the sheet content in `<div data-track-source="nav_menu">`.

### 3.5 Sticky mobile contact bar (components/sticky-contact-bar.tsx)
- `<nav aria-label={t("sticky.label")} data-track-source="sticky_bar">` (aria-label is hard-coded Bengali today). `md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-foreground bg-background/95 backdrop-blur-sm px-4 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))]`.
- Row: `flex gap-3`.
  - Messenger: `flex-1 h-12 bg-primary text-primary-foreground font-semibold hover:bg-primary-hover`, plain `<a href={facebookInsights.messengerUrl} target="_blank" rel="noopener noreferrer" data-track-item="sticky_messenger">`, with the icon and `t("cta.messenger")`.
  - Call: `h-12 px-5 border border-foreground text-foreground`, `<a href={getPhoneUrl()} data-track-item="sticky_call">`, with the Phone icon and `t("cta.call")`. Change `aria-label` to `` `${t("cta.call")} ${facebookInsights.phone}` ``.
  - `{/* OWNER-GATED: WhatsApp (wa.me) button slot — render only when owner supplies number and staffs inbox. Keep same ref logic via ContactTracker. */}`
- Visibility: unchanged (shown after `#hero` bottom ≤ 0). Additionally **hide while `#contact` is in view**, using an IntersectionObserver on `#contact` with threshold 0.25, so there are no duplicate CTAs. Add `motion-reduce:transition-none`.

### 3.6 Footer (components/footer.tsx)
- `<footer data-surface="ink" className="bg-surface-ink text-on-ink">`, with `<ColorBar/>` as the first child at full width.
- Container `py-14 lg:py-20`. Grid: 1 column mobile, `sm:grid-cols-2`, `lg:grid-cols-12 gap-10`.
  1. **Brand** (`lg:col-span-5`):
     - Logo `/barnick.png` at 56×56 on a cream chip (`inline-flex bg-background p-2`, as today). Unaltered.
     - `t("footer.tagline")` in on-ink-muted.
     - The address `t("footer.addressValue")` in a `<address className="not-italic">`.
  2. **Links** (`lg:col-span-3`): heading `t("footer.links")` in eyebrow style (on-ink-muted). The list is portfolio, estimate, design, guide, policies, faq. Each link is `min-h-11 inline-flex items-center text-on-ink hover:text-primary`.
  3. **Contact** (`lg:col-span-4`): heading `t("nav.contact")`.
     - Phone `<a href={getPhoneUrl()}>` showing `facebookInsights.phone` in `font-display text-display-m tabular-nums`.
     - Messenger text link `t("cta.messenger")` with an arrow.
     - Social icons: 44×44 squares, `border border-on-ink/25`, hover `bg-primary text-primary-foreground border-primary`, `aria-label` = network name. Keep the same three URLs.
- **Sign-off wordmark** below the grid: `t("logo.name")` in `font-display font-semibold text-[clamp(2.75rem,8vw,6.5rem)] leading-none text-on-ink/90 border-t border-on-ink/15 pt-8 mt-12`, `aria-hidden="true"` (decorative; the brand name is already in the logo alt).
- Bottom row: `© {year} t("footer.copyright"). t("footer.rights")` on the left, a `/policies` link on the right, in text-sm on-ink-muted. `min-h-11` on the link.

---

## 4. Homepage architecture (app/page.tsx)

```
<Navbar/>                                   (static import)
<main id="main" className="pt-16 lg:pt-[72px] pb-24 md:pb-0">
  <Hero/>                 #hero             (static import, LCP)
  <TrustStrip/>           data-track-section="stats"   (dynamic) — contains <LogoCloud/> (#clients)
  <ShopByNeed/>           data-track-section="need"    (dynamic, NEW)
  <PriceEstimator/>       #estimate          (dynamic)
  <PortfolioSection/>     #products          (dynamic)
  <HowItWorks/>           data-track-section="how"     (dynamic, NEW)
  <DesignService/>        #design            (dynamic)
  <FAQ/>                  #faq               (dynamic)
  {/* OWNER-GATED: <Testimonials/> — render only with real, attributable reviews (GBP etc.). */}
  {/* OWNER-GATED: <Kits/> — F-commerce starter kits; needs owner packaging prices (P1b). */}
  {/* OWNER-GATED: <HeritageStory/> — shop/machines/founder photos + owner-confirmed history. */}
  <CTABanner/>            #contact           (dynamic)
</main>
<Footer/>                                   (dynamic; MOVE outside <main> — footer is a landmark sibling)
<StickyContactBar/>                         (dynamic)
```

Moving the footer outside `<main>` is safe. AnalyticsTracker scans `footer` globally, and ContactTracker detects the `FOOTER` tag. Apply the same move in content-page.

Rhythm of surfaces: cream (hero), then #E9E2D3 (trust), cream (need), cream with a paper card (estimator), cream (portfolio), #E9E2D3 (how), ink (design), cream (FAQ), orange (CTA), ink (footer).

---

### 4.1 Hero (#hero): components/hero.tsx
**Purpose**: within 5 seconds, say what Barnick is and since when, and convert in one tap.

**Content**
- Eyebrow: `<RegMark/>` then `t("hero.eyebrow")` (NEW: "পুরান ঢাকায়, ১৯৮৯ থেকে").
- H1, two spans:
  - `t("hero.titleLead")` (NEW) in ink;
  - a line break (`<br className="hidden sm:block"/>` plus a space);
  - `t("hero.titleAccent")` (NEW) in `text-primary`. It is display size, ≥34px, so orange text is allowed.
- Lead: `t("hero.subtitle")` (existing), `text-lead text-ink-2 max-w-[48ch]`.
- CTAs:
  1. Primary `Button size="lg"` as `<a href={facebookInsights.messengerUrl} target="_blank" rel="noopener noreferrer" data-track-item="hero_messenger">` with MessageCircle and `t("hero.orderMessenger")`.
  2. Secondary `Button variant="outline" size="lg"` as `<a href="#estimate" data-track-item="hero_estimate">` with `t("hero.seePrices")` (NEW) and an ArrowDown icon.
  3. Tertiary text line: `t("hero.orCall")` (NEW), then `<a href={getPhoneUrl()} data-track-item="hero_call" className="font-semibold underline underline-offset-4 decoration-primary min-h-11 inline-flex items-center">{facebookInsights.phone}</a>`.
- Price anchor line (below the CTAs, text-sm, ink-2): `t("hero.anchor")` with `{qty}` = 500 and `{price}` = `VISITING_FIXED_TIER_PRICES[500]`, both formatted through `toLocaleString(locale)` where locale = `bn-BD` or `en-BD`. Import the constant from lib/calculateEstimate.ts; never hard-code 1000.
- Trust row: a `<ul>` of 3 inline items separated by 4px orange squares (`h-1 w-1 bg-primary`), text-sm in muted-foreground:
  - "১৯৮৯ থেকে": `t("trust.since")` (NEW);
  - `t("hero.trustLine")`, the existing "১–৩ দিনে ডেলিভারি · সারা বাংলাদেশে কুরিয়ার". Split it on " · " into two items, so the row has three in total.
- Right column (lg and up only): `<div className="hidden lg:block crop-marks p-6">` containing `<HeroProductionFlow/>`, restyled with tokens only:
  - replace `bg-muted/20`, `bg-muted/35` and `shadow-sm` with `bg-card`;
  - borders become `border-border`;
  - active labels use `text-foreground`;
  - icons use `text-primary`.
- Bottom: `<ColorBar/>` at full bleed.
- **Remove**: the Badge with `hero.badge` and 🚀, `<DotPattern/>`, the third "estimate" outline button (merged into "দাম দেখুন"), and `<LogoCloud/>` (moved to TrustStrip). Also remove the `facebookInsights` stats import if nothing else uses it (messengerUrl stays).

**Layout, mobile (390)**
- Section `pt-10 pb-12 px-4`. Single column.
- Eyebrow, then `mt-5` H1 (34px, bn lh 1.25), `mt-4` lead, `mt-8` CTAs stacked full width (`flex flex-col gap-3`, each h-12), `mt-4` call line, `mt-6` anchor and trust row (wrap).
- No production flow (`hidden lg:block`). This removes a large block above the fold; the How-it-works section covers the process later.
- ColorBar at the bottom.

**Layout, desktop (1280)**
- `lg:py-24`. 12-column grid, `items-center`.
- Text in `lg:col-span-7` (H1 60px, `max-w-[14ch]` in en, `max-w-[16ch]` in bn).
- CTAs in a row (`sm:flex-row sm:w-auto`, primary and secondary side by side, each `px-7`).
- `lg:col-span-5` holds the crop-marked production flow.

**LCP**: the H1 is the LCP element. It is text-only and server-rendered as a client component (as today), with no image, no background image and no motion on the text.

### 4.2 Trust strip (NEW: components/trust-strip.tsx; replaces components/stats-infographic.tsx)
**Purpose**: heritage and proof with safe facts only. `<section data-track-section="stats" aria-labelledby="trust-heading" className="bg-muted">`. It keeps the GA section name "stats" so section_view reports continue.

**Content**
- `<h2 id="trust-heading" className="sr-only">{t("trust.heading")}</h2>`.
- A `<dl>` with 4 cells. The value is `font-display text-display-l tabular-nums`; the label is text-sm muted-foreground.
  1. Value `toBengaliDigits(1989)` in bn, `1989` in en. Label `t("trust.sinceLabel")`.
  2. Value `{years}+`, with `years = new Date().getFullYear() - facebookInsights.foundedYear` and bn digits in bn. Label `t("trust.yearsLabel")`.
  3. Value `facebookInsights.turnaroundDays` (shown as "১–৩" in bn through toBengaliDigits). Label `t("stats.turnaround")` (existing).
  4. Value `t("trust.reprintValue")` (in serif). Label `t("trust.reprintLabel")`, followed by `<Link href="/policies#reprint" className="text-primary-strong underline">{t("trust.reprintLink")}</Link>`.
- `{/* OWNER-GATED: clients count / followers / reach / rating from data/insights.ts — unverified, do not render. */}`
- Below the facts: `<LogoCloud variant="band"/>` (restyled, see the next part).

**Layout**
- Mobile: `px-4 py-10`; `grid grid-cols-2 gap-px bg-border` (hairline grid), each cell `bg-muted p-4 min-h-[112px]`.
- Desktop: `lg:grid-cols-4`, each cell `p-8`, separated by vertical hairlines.

**LogoCloud restyle** (components/logo-cloud.tsx)
- Keep the `clients` array and `id="clients"`.
- Change the root to a `<div id="clients">` inside the trust section, `mt-10 lg:mt-14`.
- Title row: Eyebrow `t("logo.trustedBy")` (existing), left-aligned. Drop `logo.subtitle` from the render; it reads as a superlative claim ("শীর্ষ প্রতিষ্ঠান").
- Tile: `h-20 w-36 lg:h-24 lg:w-44 bg-card border border-border px-4`.
  - Logo image `max-h-12 lg:max-h-14 object-contain grayscale opacity-80`.
  - On hover or focus-within: `grayscale-0 opacity-100`, 150ms.
  - Client logos only; this never applies to /barnick.png.
  - Each tile is non-interactive, so no tab stop.
- Mobile: a swipe row (`overflow-x-auto snap-x px-4 gap-3`), with `t("logo.swipeHint")` as text-sm muted below.
- Desktop: `<Marquee pauseOnHover className="[--duration:60s] [--gap:1rem]">`, with the gradient edges fading into `from-muted`. The wrapper gets `[&:focus-within_*]:[animation-play-state:paused]`.
  - Under reduced motion: `const reduce = useReducedMotion()` from `motion/react` (already a dependency). If true, render `flex flex-wrap gap-4` instead of the marquee.
- Remove `md:min-h-[50vh]`, `rounded-2xl` and `shadow-sm`.

### 4.3 Shop by need (NEW: components/shop-by-need.tsx)
**Purpose**: route by need, not by product taxonomy. `<section aria-labelledby="need-heading" data-track-section="need" className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">`.

**Header**: masthead rule, Eyebrow (number "০১", `t("need.eyebrow")`), h2 `id="need-heading"` `t("need.title")`.

**Cards**: an `<ul>` of 3 `<li>` items. Each card is an `<article className="group relative bg-card border border-border p-6 lg:p-8 flex flex-col hover:-translate-y-0.5 hover:shadow-paper transition">`.
- Top: a lucide icon (24px, `text-primary`) and a small serif index ("ক/খ/গ" in bn, "A/B/C" in en, `text-primary-strong font-display`).
- h3 `text-display-m font-display` (title), then `mt-3` desc in text-base ink-2.
- Price anchor box `mt-6 border-t border-border pt-4`: an eyebrow-sized `t("product.from")` (existing "শুরু / From"), then the anchor text in `font-display text-2xl`, showing the formatted price and quantity.
- Actions `mt-auto pt-6 flex flex-col gap-2`:
  - primary `Button size="lg" className="w-full justify-between"` as an `<a href="#estimate">`;
  - secondary `Button variant="link"` as an in-page `<a>`, `min-h-11`.

| Card | icon | title / desc keys | anchor (computed) | primary | secondary |
|---|---|---|---|---|---|
| Online sellers | `Package` | `need.seller.title` / `need.seller.desc` | `need.seller.anchor`: qty 1000, price `STICKER_2X2_FIXED_TIER_PRICES[1000]` | `need.seller.cta`, `#estimate`, preselect `round-sticker` | `need.samples` to `#products` |
| Business & corporate | `IdCard` | `need.business.title` / `need.business.desc` | `need.business.anchor`: qty 500, price `VISITING_FIXED_TIER_PRICES[500]` | `need.business.cta`, `#estimate`, preselect `visiting-card` | `need.business.cta2`, `#estimate`, preselect `cash-memo` |
| Events & occasions | `PartyPopper` (or `Sparkles`) | `need.events.title` / `need.events.desc` | none (no event pricing exists); show `t("need.events.note")` instead | `need.events.cta` to `#design` | `need.samples` to `#products` |

**Every action anchor** carries `data-track-source="shop_by_need"`, `data-track-item="need_{seller|business|events}_{estimate|samples|design|memo}"`, and `data-track-value={anchorPrice}` only where an anchor price exists. ContactTracker ignores non-positive values; omit the attribute rather than writing 0. In-page links are not contact links, so also call `trackEvent("need_select", { need, target, product })` in onClick.

**Preselect mechanism** (no reload, estimator logic untouched):
- The card's onClick runs `window.dispatchEvent(new CustomEvent("barnick:estimate-product", { detail: "round-sticker" }))`, then the default hash navigation proceeds.
- In PriceEstimator, add a `useEffect` that listens for `barnick:estimate-product` and calls the existing `handleProductChange(detail)` when detail is one of the three ProductIds.
- Export the event-name constant from a new `lib/estimateEvents.ts`: `export const ESTIMATE_PRODUCT_EVENT = "barnick:estimate-product"`.

**Layout**
- Mobile: a single column, `gap-4`. Each card is full width; actions stack.
- Desktop: `lg:grid-cols-3 gap-6`, with equal-height cards (`h-full`).
- `{/* OWNER-GATED: kit tiers / packaging price anchors — needs owner costing (P1b). */}`

### 4.4 Price estimator (#estimate): components/price-estimator.tsx, restyle only
**Do not touch**:
- `lib/calculateEstimate.ts` and `lib/estimateQuery.ts`;
- every `calculate*` call, the state shapes and defaults (`DEFAULT_VISITING` and so on);
- `buildEstimateMessengerMessage`;
- the `trackEvent` calls (`estimate_product_select`, `estimate_link_open`, and the 1500ms result event);
- `markInteracted`;
- the `data-track-item={product}` and `data-track-value={result.minPrice}` on the result CTA;
- `data-track-item={\`notify_${p.id}\`}`;
- `id="estimate"`, `id="visiting-custom-qty"` and `id="memo-custom-qty"`.

The only behavioural addition is the preselect listener from §4.3.

**Section**: `<section id="estimate" aria-labelledby="estimate-heading" className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">`. No border-y and no muted fill: the paper card provides the contrast. Remove `<DotPattern/>`.

**Header**
- Masthead rule; Eyebrow ("০২", `t("estimate.eyebrow")`, NEW); h2 `id="estimate-heading"` `t("estimate.title")`; lead `t("estimate.subtitle")`.
- Disclaimer note (`role="note"`), left-aligned under the lead: `mt-4 flex gap-2 text-sm text-ink-2 border-l-2 border-primary pl-3`, AlertTriangle 16px in `text-primary-strong`, text `t("estimate.disclaimer")`.
- **Remove** the "১. পণ্য → ২. পরিমাণ → ৩. দাম" hint row. The numbered field groups replace it, and `estimate.step1/2/3` are reused there.

**Grid**: `mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start`.
- Form card: `lg:col-span-8 bg-card border border-border shadow-paper`, divided into **field groups**. Each group is `p-5 lg:p-8 border-b border-border last:border-0`. Each group has a header made of a serif number in `text-primary-strong` plus a label in h3 style: "০১ {t('estimate.step1')}", "০২ {t('estimate.step2')}", "০৩ {t('estimate.moreOptions')}" (the last for options).
  - **Group 01, product**: a `role="group"` with `grid grid-cols-3 gap-2`. Each product is a button with `aria-pressed`, `min-h-12 px-2 text-sm sm:text-base font-semibold border`.
    - Active: `bg-foreground text-background border-foreground`.
    - Inactive: `bg-background border-input hover:border-foreground`.
    - Under it, `mt-3 text-sm text-muted-foreground`: `t("estimate.comingSoon")` + " · " + the existing notify `<a>`, restyled as `text-primary-strong underline min-h-11 inline-flex items-center`. It keeps `href={getMessengerUrlWithText(t("estimate.comingSoonMessenger"))}` and `data-track-item="notify_coming-soon"`. The dashed coming-soon pill is removed from the grid; the `PRODUCT_PILLS` array may keep the entry, but render disabled entries in this text line.
  - **Group 02, quantity**: VisitingQtySelector, MemoQtySelector and the RoundStickerOptions quantity grid.
    - Tiles: `min-h-14` (two lines), `grid grid-cols-3 sm:grid-cols-4 gap-2` (sticker: `grid-cols-2 sm:grid-cols-4`).
    - Each tile shows the quantity (`font-semibold tabular-nums`), and for fixed tiers only a second line `text-xs text-muted-foreground`: `৳{(VISITING_FIXED_TIER_PRICES[q]/q).toFixed(2)}{t("estimate.perPiece")}`. Stickers do the same with STICKER_2X2_FIXED_TIER_PRICES. Visiting 5000, custom and all memo tiles show no hint, because their prices are formula-based.
    - Selected tile: `bg-foreground text-background border-foreground`; drop the ring-offset styling. Add `aria-pressed`.
    - Sticker size: the single 2" chip restyled `min-h-11 px-4 bg-foreground text-background`, with `aria-current="true"`.
    - Custom input: `min-h-12 text-base border-input bg-background`, `inputMode="numeric"`, and the label kept.
    - **Mobile live total** (new, `lg:hidden`), directly under the quantity tiles: `<p aria-live="polite" className="mt-4 flex items-baseline justify-between border-t border-border pt-3">`, showing `t("estimate.result.total")` on the left and on the right either `৳ {formatPrice(result.minPrice)}` (plus `–৳{max}` when it is a range) in `font-display text-2xl tabular-nums`, or `t("estimate.selectQty")`. Add `<a href="#estimate-result" className="text-sm text-primary-strong underline">{t("estimate.seeOrder")}</a>` when a result exists. Read-only display of the existing `result`.
  - **Group 03, options** (visiting sides and colours plus the `<details>` extras; memo size, binding and colours). Keep the existing `<details>` with `t("estimate.moreOptions")`, but its summary becomes `min-h-11`.
    - CompactToggle and the colour toggles: segmented control `inline-flex border border-input`, each button `min-h-11 px-4 text-sm font-medium` (fixes the `min-h-9` instances), active `bg-foreground text-background`, `aria-pressed`. Remove `rounded-full` and `p-0.5`.
    - Paper note `t("estimate.paperNote")` becomes `text-sm text-muted-foreground` (was `text-[11px]`).
- **PricePanel**: `lg:col-span-4`, wrapped in `<div className="crop-marks p-3 lg:sticky lg:top-28">`, then `<aside id="estimate-result" data-surface="ink" aria-labelledby="estimate-result-label" className="bg-surface-ink text-on-ink p-6 lg:p-8 border-t-4 border-primary">`.
  - Label `id="estimate-result-label"` in eyebrow style, on-ink-muted, `t("estimate.result.total")`.
  - Total: `text-price font-display tabular-nums`, `aria-live="polite"`. For a range, show "৳min" over a smaller `t("estimate.result.rangeTo")` line and "৳max", as today, at the new size.
  - Per-unit: text-sm on-ink-muted.
  - Disclaimer: text-sm on-ink-muted (was `text-[11px] text-background/50`, which fails contrast) with an AlertTriangle in `text-primary`.
  - CTA: `mt-6 flex w-full min-h-12 items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold hover:bg-primary-hover`. Keep **the same `<a href={messengerUrl ?? facebookInsights.messengerUrl}` target, rel, data-track-item and data-track-value**. Label `t("estimate.ctaShort")`.
  - Trust micro under the CTA: `mt-4 text-sm text-on-ink-muted` with `t("estimate.trustNote")` (NEW).
  - Empty state: the Calculator icon in `text-on-ink/40` plus `t("estimate.selectQty")`.
- **Mobile order**: form card (01, 02 with the live total, 03), then PricePanel full width. Desktop: form left, sticky panel right.

### 4.5 Portfolio (#products): components/portfolio/PortfolioSection.tsx, PortfolioCard.tsx, lib/portfolioData.ts
**Purpose**: prove craft with the 7 real photos, editorially.
- `<section id="products" aria-labelledby="products-heading" className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">`, container `max-w-[75rem]` (was `max-w-5xl`).
- Header: masthead rule; Eyebrow ("০৩", `t("portfolio.eyebrow")`); h2 `t("portfolio.title")` (existing key, currently hard-coded); lead `t("portfolio.subtitle")` (NEW; replaces the hard-coded subtitle).
- **Remove the CategoryFilter render**. With 7 items in 7 single-item categories it adds a tap with no value. Keep the file. Remove the `portfolio_filter` call along with it, and `motion` layout/AnimatePresence in the grid (it is no longer needed; this lightens the chunk). PortfolioLightbox keeps its own motion.
- **Grid**: `grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 lg:gap-x-6 lg:gap-y-12`. It holds 7 plates plus 1 "ask" tile, which fills 4×2 on desktop and 2×4 on mobile. Set INITIAL_COUNT to 8; the load-more stays in code but won't show, and its label moves to `t("portfolio.loadMore")` with `{n}`.
- **Plate (PortfolioCard)**: a `<figure>`.
  - Image button: `<button type="button" onClick aria-label={\`${t("portfolio.enlarge")}: ${name}\`} className="block w-full aspect-[4/5] overflow-hidden bg-muted border border-border">`.
  - Inside it, the `next/image` keeps its `width/height`, `sizes="(max-width:1023px) 50vw, 25vw"`, `loading="lazy"` (no priority) and `object-contain`, with hover `scale-[1.02]` (`motion-reduce:transform-none`).
  - `<figcaption className="mt-3">`:
    - `text-xs text-primary-strong font-display`: `t("portfolio.plate")` with `{n}` (number padded "০১", bn digits);
    - name `text-base font-semibold`: `t(\`portfolio.item.${id}.name\`)`;
    - specs (only when `specs` is non-empty after tidying): text-sm muted;
    - the order link `<a href={getMessengerUrlWithText(item.messengerText)} data-track-item={item.productName} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline underline-offset-4 decoration-primary">{t("portfolio.orderLike")} →</a>`.
  - Keep `data-track-item={item.productName}`, the Bengali value, for GA continuity.
  - Remove the hover overlay and the mobile gradient caption. This fixes the nested interactive (a link inside a clickable div) and makes captions visible on touch.
  - Alt: `t(\`portfolio.item.${id}.alt\`)`.
- **Ask tile** (8th cell): `crop-marks bg-card aspect-[4/5] p-5 flex flex-col justify-end`, `data-track-source="portfolio_ask"`.
  - h3 `t("portfolio.askTitle")` in serif and text-sm `t("portfolio.askBody")`.
  - Messenger `Button size="default" className="w-full mt-4"` (`t("portfolio.ask")`, data-track-item="portfolio_ask").
  - Call `Button variant="outline"` (`t("cta.call")`).
  - This **merges and replaces** the bottom "আপনার প্রয়োজনীয় পণ্য খুঁজে পাচ্ছেন না?" banner.
- **lib/portfolioData.ts tidy**: blank out `specs` wherever it merely repeats `productName` (ids 1, 2, 3, 4, 6, 7). Keep id 5's real spec. Add no new data. Leave `messengerText` in Bengali; staff read Bengali.
- `{/* OWNER-GATED: packaging gallery / more job photos — add to portfolioItems only with real photos. */}`
- PortfolioLightbox: token restyle only (black/80 overlay is fine). Close and prev/next buttons ≥44px. Its order link keeps `data-track-item`. Strings go through `t()` (`portfolio.orderLike`, `nav.menuClose` for close).

### 4.6 How ordering works (NEW: components/how-it-works.tsx)
**Purpose**: remove process anxiety (file, check, approve, print and deliver). `<section aria-labelledby="how-heading" data-track-section="how" className="bg-muted px-4 sm:px-6 lg:px-8 py-16 lg:py-24">`.
- Header: masthead rule; Eyebrow ("০৪", `t("how.eyebrow")`); h2 `t("howTo.title")` (existing).
- Steps: reuse **`guidePage.flow.steps`** from data/guide.ts. This is existing, factual Localized content with icons (FileUp, ScanSearch, CheckCheck, Truck). Render with `step.title[language]` and `step.description[language]`. It already lives in /guide, so the homepage and the guide stay consistent.
  - `<ol>` with `grid grid-cols-1 lg:grid-cols-4`.
  - Each `<li className="relative border-t border-foreground pt-5 pb-6 lg:pr-8">`: serif step number `text-display-m text-primary-strong` ("০১" to "০৪"), icon 24px `text-primary`, h3 title, and description text-base ink-2.
  - Mobile: a vertical list with a 1px vertical orange line connecting the numbers (`before:absolute before:left-[11px] before:top-14 before:bottom-0 before:w-px before:bg-primary/40`). Desktop: 4 columns with ink top rules.
- Note line under the steps: `mt-8 text-base border-l-2 border-primary pl-4`, showing `t("howTo.step3.desc")` **verbatim** (the existing 50% copy is untouched; `{/* OWNER-GATED: replace with the resolved advance rule + free-proof promise once owner decides (P1a). */}`).
- Link: `<Link href="/guide" className="mt-4 inline-flex min-h-11 items-center text-primary-strong font-semibold underline">{t("how.guideLink")} →</Link>`.

### 4.7 Design service (#design): components/design-service.tsx
- `<section id="design" aria-labelledby="design-heading" data-surface="ink" className="bg-surface-ink text-on-ink px-4 sm:px-6 lg:px-8 py-16 lg:py-28">`.
- **Move the inline `copy` object into translations** as `design.*` keys, verbatim bn and en (see §6). Use `t()` throughout; icons stay mapped in the component.
- Header: masthead rule in `border-on-ink/30`; Eyebrow ("০৫") in **orange #D9541E on ink** (4.71, allowed) with `t("design.eyebrow")`; h2 `t("design.title")` in `text-display-l`; lead `t("design.subtitle")` in on-ink-muted.
- Left (`lg:col-span-6`): services as a 2×2 list, `grid grid-cols-1 xs:grid-cols-2 gap-px bg-on-ink/15`. Each cell is `bg-surface-ink p-5 flex gap-3`, with the icon in `text-primary` and text-base.
- Right (`lg:col-span-6`): an `<ol>` of 4 steps. Each row is `flex gap-5 py-5 border-b border-on-ink/15`, with a 44px square number `bg-primary text-primary-foreground font-display` (ink on orange) and the step text.
- Then the note `t("design.note")` in text-sm on-ink-muted, and the CTA `Button size="lg"` (orange, ink text) as `<a href={getMessengerUrlWithText(t("design.messengerText"))} target="_blank" rel="noopener noreferrer" data-track-item="design_messenger">` with `t("design.cta")`.
- `{/* OWNER-GATED: fixed-price design packages; "Canva link accepted" line. */}`

### 4.8 FAQ (#faq): components/faq.tsx
- `<section id="faq" aria-labelledby="faq-heading">` (was a div; keep the id). `px-4 sm:px-6 lg:px-8 py-16 lg:py-24`. Remove DotPattern and the icon circles.
- Desktop grid `lg:grid-cols-12 gap-12`.
- Left `lg:col-span-4 lg:sticky lg:top-28 self-start`:
  - masthead rule; Eyebrow ("০৬", `t("faq.eyebrow")`); h2 `t("faq.title")`;
  - `mt-6 text-ink-2` with `t("faq.more")`;
  - Messenger `Button variant="ink"` (`t("cta.messenger")`, data-track-item="faq_messenger");
  - link to `/policies` with `t("faq.policiesLink")`.
- Right `lg:col-span-8`: **all six** existing Q&As (faq.1 to faq.6; today only 4 render) as native `<details className="group border-t border-foreground last:border-b">`.
  - `<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-base lg:text-lg">`, with a Plus icon that rotates 45° in the open state (`transition-transform duration-200 motion-reduce:transition-none`).
  - Answer `pb-5 text-ink-2 max-w-[60ch]`.
  - The first item is `open` by default. No JS.
- Mobile: left block on top (without sticky), then the accordion.
- faq.3.a (50% advance) stays unedited.

### 4.9 CTA (#contact): components/cta-banner.tsx
- `<section id="contact" aria-labelledby="contact-heading" className="bg-primary text-foreground px-4 sm:px-6 lg:px-8 py-16 lg:py-24">`. Ink on orange is 4.71, so all text is ink; body text is ≥16px and fine at 4.71.
- Grid `lg:grid-cols-12 gap-10 items-end`.
- Left `lg:col-span-7`:
  - Eyebrow with RegMark (ink stroke here) and `t("contact.eyebrow")`;
  - h2 `t("contact.headline")` (NEW) in `text-display-xl` capped at 52px (`lg:text-[3.25rem]`);
  - `t("contact.subtitle")` (existing) in text-lead.
- Right `lg:col-span-5 flex flex-col gap-3`:
  - Messenger `Button variant="ink" size="lg" className="w-full"` as an `<a href={facebookInsights.messengerUrl} target="_blank" rel="noopener noreferrer" data-track-item="contact_messenger">` (cream text on ink, 16.3);
  - Call `Button variant="outline" size="lg"` (ink border; hover becomes an ink fill) as an `<a href={getPhoneUrl()} data-track-item="contact_call">` showing `t("cta.call")` · `facebookInsights.phone`.
- Below, a full-width trust row: `mt-12 pt-6 border-t border-foreground/40 grid sm:grid-cols-3 gap-6 text-sm`.
  1. `t("contact.reprint")` with a link `t("contact.policiesLink")` to `/policies#reprint`.
  2. `t("contact.payment")` with a link to `/policies#payment`.
  3. `t("footer.address")` with `t("footer.addressValue")`.
  - Links on orange: ink, underlined, `min-h-11`.
  - Focus ring: ink, visible on orange.
- `{/* OWNER-GATED: WhatsApp, email, bKash/Nagad merchant number or QR, business hours, map. */}`

---

## 5. /guide and /policies: components/content-page.tsx (shared)
- `<main id="main" className="pt-16 lg:pt-[72px] pb-24 md:pb-0">`. Move `<Footer/>` after `</main>`.
- **Header**: `px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 max-w-[75rem] mx-auto`, with a reading column of `max-w-[68ch]`.
  - Eyebrow (no number), `l(eyebrow)`.
  - h1 `text-display-l lg:text-[3rem] font-display`.
  - Lead `text-lead text-ink-2`.
  - Updated date in text-sm muted.
  - `<ColorBar/>` `mt-8` at the column width.
- **On-this-page nav**: `aria-label={t("content.onThisPage")}`.
  - Mobile: a horizontal scroll row (`flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4`). Chips `min-h-11 px-4 border border-input text-sm whitespace-nowrap`, hover `bg-foreground text-background`.
  - Desktop (lg and up): a **left sticky TOC**. The layout becomes `lg:grid lg:grid-cols-12 gap-12`: the TOC sits in `lg:col-span-3 lg:sticky lg:top-28 self-start` as a vertical list with numbered entries ("০১ পেমেন্ট"), and the content takes `lg:col-span-8`.
- **Flow strip** (guide only): the same visual as homepage How-it-works, on paper (`bg-card border border-border`), keeping 4 columns at sm. Remove the rotated-square connector and use top rules instead.
- **Sections**: `border-t border-foreground pt-8`.
  - h2 `text-display-m`, prefixed with a serif number in `text-primary-strong`.
  - Body text-base, bn lh 1.75.
  - Bullets: a 6px orange square (keep).
  - Table `<dl>`: `border border-border bg-card`, rows separated by hairlines.
  - Note: `border-l-2 border-primary bg-accent px-4 py-3 text-base` (was `bg-primary/10`; #F6DDCF is the explicit equivalent).
- **CTA block**: replace the ink box with the homepage CTA language. `bg-primary text-foreground px-6 py-10 lg:px-12` inside the wrapper with `data-track-source={ctaSource}` (keep). It contains `l(ctaText)` in `font-display text-display-m`, a Messenger `Button variant="ink" size="lg"` with `t("content.chat")` (replacing the inline bn/en ternary) and `data-track-item={\`${ctaSource}_messenger\`}`, and a Call `Button variant="outline" size="lg"` with `data-track-item={\`${ctaSource}_call\`}`.
- Data files data/guide.ts and data/policies.ts: unchanged.

---

## 6. Translations: contexts/language-context.tsx

### 6.1 New keys (add to both `bn` and `en`)
| key | bn | en |
|---|---|---|
| a11y.skip | মূল অংশে যান | Skip to content |
| nav.primaryLabel | প্রধান মেনু | Main menu |
| nav.menuOpen | মেনু খুলুন | Open menu |
| nav.menuClose | বন্ধ করুন | Close |
| lang.switchTo | English | বাংলা |
| lang.switchTitle | Switch to English | বাংলায় দেখুন |
| sticky.label | দ্রুত যোগাযোগ | Quick contact |
| hero.eyebrow | পুরান ঢাকায়, ১৯৮৯ থেকে | Old Dhaka, since 1989 |
| hero.titleLead | প্রিন্টিং, প্যাকেজিং ও ব্র্যান্ডিং | Printing, packaging & branding |
| hero.titleAccent | সহজ, দ্রুত, নির্ভরযোগ্য। | Easy, fast, trusted. |
| hero.seePrices | দাম দেখুন | See prices |
| hero.orCall | অথবা সরাসরি কল করুন: | Or call us directly: |
| hero.anchor | ভিজিটিং কার্ড {qty} পিস — ৳{price} থেকে | Visiting cards — {qty} pcs from ৳{price} |
| trust.heading | কেন বর্ণিক প্রচারাণী | Why Barnick Pracharani |
| trust.since | ১৯৮৯ থেকে | Since 1989 |
| trust.sinceLabel | সাল থেকে পুরান ঢাকায় | in Old Dhaka since |
| trust.yearsLabel | বছরের অভিজ্ঞতা | years of experience |
| trust.reprintValue | রিপ্রিন্ট | Reprint |
| trust.reprintLabel | আমাদের ভুল হলে বিনা খরচে | free if it's our mistake |
| trust.reprintLink | শর্ত দেখুন | See terms |
| need.eyebrow | আপনার প্রয়োজন অনুযায়ী | Shop by need |
| need.title | কী ছাপাতে চান? | What do you need printed? |
| need.seller.title | অনলাইন সেলার | Online sellers |
| need.seller.desc | প্রোডাক্ট স্টিকার, লেবেল, শপিং ব্যাগ ও কাস্টম বক্স। | Product stickers, labels, shopping bags and custom boxes. |
| need.seller.anchor | রাউন্ড স্টিকার (২") {qty} পিস — ৳{price} | Round stickers (2"), {qty} pcs — ৳{price} |
| need.seller.cta | স্টিকারের দাম দেখুন | Price round stickers |
| need.business.title | ব্যবসা ও প্রতিষ্ঠান | Business & corporate |
| need.business.desc | ভিজিটিং কার্ড, ক্যাশ মেমো, প্যাড, নোটপ্যাড, ব্রোশিওর ও ক্যাটালগ। | Visiting cards, cash memos, pads, notepads, brochures and catalogues. |
| need.business.anchor | ভিজিটিং কার্ড {qty} পিস — ৳{price} | Visiting cards, {qty} pcs — ৳{price} |
| need.business.cta | কার্ডের দাম দেখুন | Price visiting cards |
| need.business.cta2 | ক্যাশ মেমোর দাম দেখুন | Price cash memos |
| need.events.title | অনুষ্ঠান ও উৎসব | Events & occasions |
| need.events.desc | ইনভাইটেশন কার্ড, ফ্লায়ার ও ব্যানার — চাইলে ডিজাইনসহ। | Invitation cards, flyers and banners — with design if you need it. |
| need.events.note | দাম ডিজাইন ও পরিমাণ অনুযায়ী — মেসেঞ্জারে জানিয়ে দেওয়া হয়। | Priced by design and quantity — we quote on Messenger. |
| need.events.cta | ডিজাইন সার্ভিস দেখুন | See design service |
| need.samples | কাজের নমুনা দেখুন | See samples |
| estimate.eyebrow | তাৎক্ষণিক দাম | Instant price |
| estimate.perPiece | /পিস | /pc |
| estimate.seeOrder | অর্ডার করুন ↓ | Order ↓ |
| estimate.trustNote | ১–৩ দিনে ডেলিভারি · পেমেন্ট শুধু অফিসিয়াল নম্বরে | Delivery in 1–3 days · Pay only to our official number |
| portfolio.eyebrow | আমাদের ছাপা কাজ | Our work |
| portfolio.subtitle | পছন্দ হলে এক ট্যাপে মেসেঞ্জারে এই রকম অর্ডার করুন। | Like one? Order something similar on Messenger in one tap. |
| portfolio.plate | নমুনা {n} | Sample {n} |
| portfolio.enlarge | বড় করে দেখুন | View larger |
| portfolio.orderLike | এই রকম অর্ডার করুন | Order one like this |
| portfolio.loadMore | আরও দেখুন ({n}টি বাকি) | Show more ({n} left) |
| portfolio.askTitle | আপনার পণ্যটি এখানে নেই? | Don't see your item? |
| portfolio.askBody | যেকোনো প্রিন্ট বা প্যাকেজিংয়ের কথা জানান — দাম জানিয়ে দেব। | Tell us about any print or packaging job — we'll quote it. |
| portfolio.ask | মেসেঞ্জারে জিজ্ঞেস করুন | Ask on Messenger |
| portfolio.item.1.name / .alt | প্রিমিয়াম শপিং ব্যাগ / প্রিমিয়াম শপিং ব্যাগের নমুনা | Premium shopping bag / Sample of a premium shopping bag |
| portfolio.item.2.name / .alt | ইনভাইটেশন কার্ড / ইনভাইটেশন কার্ডের নমুনা | Invitation card / Sample of an invitation card |
| portfolio.item.3.name / .alt | ব্রশিউর / পোর্টফলিও / ব্রোশিওর ও পোর্টফোলিওর নমুনা | Brochure / portfolio / Sample of a brochure and portfolio |
| portfolio.item.4.name / .alt | নোটপ্যাড / নোটপ্যাডের নমুনা | Notepad / Sample of a notepad |
| portfolio.item.5.name / .alt / .specs | ট্রাই-ফোল্ড ব্রোশিওর / ফ্লায়ারের নমুনা / 170gsm গ্লসি · ফুল কালার · দুই পাশ | Tri-fold brochure / Sample of a tri-fold brochure / 170gsm gloss · full colour · double-sided |
| portfolio.item.6.name / .alt | ভিজিটিং কার্ড / ভিজিটিং কার্ডের নমুনা | Visiting card / Sample of a visiting card |
| portfolio.item.7.name / .alt | স্টিকার / লেবেল / স্টিকার ও লেবেলের নমুনা | Stickers / labels / Sample of stickers and labels |
| how.eyebrow | অর্ডার যেভাবে হয় | How ordering works |
| how.guideLink | পুরো প্রিন্টিং গাইড পড়ুন | Read the full printing guide |
| design.eyebrow, design.title, design.subtitle, design.service.1–4, design.step.1–4, design.note, design.cta, design.messengerText | **verbatim bn** from the `copy` object in components/design-service.tsx | **verbatim en** from the same object |
| faq.eyebrow | প্রশ্ন ও উত্তর | Questions & answers |
| faq.more | উত্তর খুঁজে পাননি? সরাসরি জিজ্ঞেস করুন। | Didn't find your answer? Ask us directly. |
| faq.policiesLink | পেমেন্ট, ডেলিভারি ও রিপ্রিন্ট নীতিমালা | Payment, delivery & reprint policies |
| contact.eyebrow | অর্ডার শুরু করুন | Start your order |
| contact.headline | আপনার কাজের কথা আমাদের জানান। | Tell us about your job. |
| contact.reprint | ছাপা কাজ অনুমোদিত ডিজাইনের সাথে না মিললে, আমাদের ভুলে বিনা খরচে রিপ্রিন্ট। | If the print doesn't match your approved design through our mistake, we reprint free. |
| contact.payment | পেমেন্ট শুধু আমাদের অফিসিয়াল নম্বরে করুন — সন্দেহ হলে আগে কল করুন। | Pay only to our official number — if in doubt, call us first. |
| contact.policiesLink | বিস্তারিত নীতিমালা | Full policies |
| content.onThisPage | এই পাতায় | On this page |
| content.chat | মেসেঞ্জারে কথা বলুন | Chat on Messenger |

All the "trust", "contact.reprint" and "contact.payment" lines restate /policies (data/policies.ts: the reprint section and the payment bullet 3). No new facts.

### 6.2 Changed existing values
- `estimate.comingSoonMessenger`: bn "আমি অন্য একটি পণ্যের দাম জানতে চাই", en "I'd like a price for another product". The current text asks about round stickers, which are now live.
- `faq.6.a` (bn): drop the leading "হ্যাঁ, ", which is a non-sequitur after a "how" question. The en value stays unless it has the same issue.
- `logo.name` (bn): "বর্ণিক প্রচারণী" becomes **"বর্ণিক প্রচারাণী"** to match the site title, OG siteName and footer.copyright. **Flag to the owner**; it is a brand-spelling decision, so the engineer applies it only if the checker and owner agree.

### 6.3 Left in the file but no longer rendered on the homepage
`hero.badge` (contains "AI যুগে"), `stats.clients`, `stats.followers`, `stats.yearsNote`, `logo.subtitle`, `estimate.comingSoonList`, `estimate.step3`, `howTo.step1/2.*`. Leave them in place; other pages may use them (grep before deleting).

**Never edit**: `howTo.step3.desc`, `product.advanceNote` and `faq.3.a` (the 50% copy, bn and en).

---

## 7. Remove, merge, keep

**Remove**
- the hero 🚀 badge and `hero.badge` render;
- every DotPattern usage;
- the hero third button;
- StatsInfographic from page.tsx (delete components/stats-infographic.tsx once grep shows no other import);
- the "100+" figure everywhere;
- the estimator 1→2→3 hint row and the dashed coming-soon pill;
- the portfolio CategoryFilter render, motion layout and hover overlays;
- the portfolio "can't find" banner (merged into the ask tile);
- FAQ icon cards;
- the "Get Started" button in the mobile sheet;
- every `rounded-*`, `text-[11px]`, `min-h-9` and `min-h-10` on interactive elements;
- the per-element `scroll-mt-[7.5rem]`.

**Merge**: LogoCloud into TrustStrip; the hero "estimate" and "see prices" buttons into one; the portfolio banner into the ask tile; design-service inline copy into `t()`.

**Must stay**
- Section ids `hero`, `estimate`, `products`, `design`, `faq`, `contact` (plus `clients`, `visiting-custom-qty`, `memo-custom-qty`).
- `data-track-source="sticky_bar"` and `data-track-source={ctaSource}` on content pages.
- The `data-track-section="stats"` name.
- All existing `data-track-item` and `data-track-value` attributes (estimator result, `notify_*`, portfolio card and lightbox).
- Every Messenger link is a plain `<a href="https://m.me/heybarnick…">` (from `facebookInsights.messengerUrl`, `getMessengerUrlWithText` or `messengerUrl`), and every phone link is a plain `<a href={getPhoneUrl()}>`. No `onClick` navigation, no `next/link` for them.
- `<ContactTracker/>` and `<AnalyticsTracker/>` in app/layout.tsx; app/go/route.ts; the `/go/*` redirects in next.config.ts.
- `lib/calculateEstimate.ts`, `lib/estimateQuery.ts`, `lib/order.ts` and `lib/analytics.ts` unchanged.
- The estimator state and calculation code unchanged.
- `next/dynamic` for every below-fold section.
- The logo `/barnick.png`, favicons and OG images untouched.

---

## 8. Implementation checklist (in order)

1. **app/layout.tsx**: add `display: "swap"` to Geist. Nothing else changes; keep the trackers, GA, JSON-LD and fonts.
2. **tailwind.config.ts**: add the new colours, `fontSize` tokens, `shadow-paper` and `ease-press` (§2, §3.2).
3. **app/globals.css**: new token vars, focus-visible rules, `[data-surface=ink]`, scroll-padding, reduced-motion `scroll-behavior`, Bengali line-heights for the display tokens, `.crop-marks`. Delete the old scroll-margin block and the `text-[11px]` hack (§3.1).
4. **lib/typography.ts**: update `sectionLabelClass` (bn 14px/600 ink-2; en 12px uppercase tracking). Add `displayClass(language, size)` helper returning the display token plus tracking.
5. **New UI primitives**: `components/ui/eyebrow.tsx` (props: `number?: number`, `children`, `className`, `tone?: "default"|"onInk"|"onOrange"`), `components/ui/reg-mark.tsx`, `components/ui/color-bar.tsx`, `lib/estimateEvents.ts`.
6. **components/ui/button.tsx**: the variants and sizes from §3.3. Grep for `variant="secondary"` and `size="sm"` usages and adjust.
7. **contexts/language-context.tsx**: add every key in §6.1 to both bn and en, apply §6.2, and keep keys alphabetised within their comment groups.
8. **Navbar**: navbar.tsx (header, skip link, CTA, data-track-source), nav-menu.tsx (links and classes), navigation-sheet.tsx (SheetClose, rows, CTAs, remove Get Started), logo.tsx (sizes, alt), language-toggle.tsx (target-language label, 44px, stable placeholder).
9. **components/hero.tsx**: §4.1. Remove the LogoCloud import, DotPattern and Badge. Add the anchor using `VISITING_FIXED_TIER_PRICES[500]`.
10. **components/hero-production-flow.tsx**: token restyle only (bg, borders, shadows). Leave the logic and animation hook alone.
11. **components/logo-cloud.tsx**: §4.2 band variant, grayscale tiles, reduced-motion static grid, root becomes `div#clients`.
12. **components/trust-strip.tsx** (new): §4.2. **app/page.tsx**: swap StatsInfographic for TrustStrip (dynamic).
13. **components/shop-by-need.tsx** (new): §4.3, with tracking attrs, `trackEvent("need_select")` and dispatch of `ESTIMATE_PRODUCT_EVENT`.
14. **components/price-estimator.tsx**: §4.4 classes and markup only, plus the preselect `useEffect` listener. Diff-check that no line inside the `useMemo` result block, the state defaults, `buildEstimateMessengerMessage` or the `trackEvent` effects changed.
15. **lib/portfolioData.ts**: blank the duplicated `specs`. **components/portfolio/PortfolioCard.tsx**: figure/caption, button image, order link. **PortfolioSection.tsx**: header via `t()`, remove the filter and motion, 8-cell grid with the ask tile, INITIAL_COUNT=8. **PortfolioLightbox.tsx**: 44px controls, `t()` strings.
16. **components/how-it-works.tsx** (new): §4.6, importing `guidePage` from `@/data/guide`.
17. **components/design-service.tsx**: §4.7, copy into `t()`, data-surface ink, tracking attr.
18. **components/faq.tsx**: §4.8, a `<section>` with `<details>` for all six items.
19. **components/cta-banner.tsx**: §4.9, orange band, ink buttons, trust row.
20. **components/footer.tsx**: §3.6.
21. **components/sticky-contact-bar.tsx**: §3.5 (t() label, orange primary, hide over #contact, WhatsApp OWNER-GATED comment).
22. **app/page.tsx**: final order (§4), `main id="main"`, padding `pt-16 lg:pt-[72px] pb-24 md:pb-0`, Footer moved after `</main>`, OWNER-GATED comments, every below-fold import through `next/dynamic`.
23. **components/content-page.tsx**: §5 (main id, footer outside, sticky TOC, ColorBar, CTA in orange with `t()` strings, `data-track-source={ctaSource}` kept).
24. **Cleanup**: delete components/stats-infographic.tsx and, if unused, components/ui/dot-pattern.tsx (grep first). Leave data/insights.ts untouched; its URLs and phone are still used.
25. **Verify**:
    - `npm run lint`, `npm run build`.
    - Grep that every `m.me` and `tel:` link is a plain `<a href>`.
    - Grep that the ids `hero|estimate|products|design|faq|contact` exist once each.
    - Grep for leftover `min-h-9`, `min-h-10`, `rounded-full`, `text-[11px]` and emoji.
    - Grep that no `#D9541E`/`text-primary` sits on text smaller than 24px (use `text-primary-strong`).
    - Check 360/390/1280 for horizontal scroll.
    - Lighthouse mobile: LCP element is the hero h1; CLS < 0.05 (language-toggle placeholder sized).
    - Keyboard pass: skip link, focus ring visible on cream, ink and orange; `<details>` operable.
    - `prefers-reduced-motion`: no marquee, no transforms.
    - GA DebugView (`NEXT_PUBLIC_GA_DEBUG=true`): `contact_click` sources hero, navbar, sticky_bar, shop_by_need, estimate, products, contact and footer; `section_view` for stats, need, estimate, products, how, design, faq, contact.

---

## 9. Open points for the checker and owner
- `logo.name` spelling (প্রচারণী vs প্রচারাণী), §6.2.
- The advance-payment rule and the free-proof wording stay owner-gated. The How-it-works note shows the current `howTo.step3.desc` verbatim.
- WhatsApp, kits, testimonials, packaging prices and the heritage story are placeholder comments only and never rendered.
- `need.events.note` and `contact.headline` are new marketing copy containing no factual claims; the checker should confirm the tone.
