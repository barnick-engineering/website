# Barnick Pracharani: Business Analysis and Redesign Brief (Business Maker, revised)

Date: 2026-11-15. Sources: the live site https://barnickpracharani.com; the repo at /Users/avee/workspace/barnick/barnick-website-v2 (components/price-estimator.tsx, lib/calculateEstimate.ts, lib/portfolioData.ts, lib/order.ts, data/*.ts, contexts/language-context.tsx, app/layout.tsx); and web research. Every external claim carries a URL. Anything I could not confirm is marked **unverified**.

## Executive summary
1. Barnick is a production-owning offset press in Old Dhaka, running since 1989. It sells volume print (cards, memos, stickers, bags and boxes) and takes orders through Messenger or phone.
2. Its pricing is volume-based. Visiting cards cost ৳2.00 each at 500 and ৳0.95 at 4,000; 2" stickers cost ৳1.35 at 1,000 and ৳0.80 at 5,000. That suits repeat SME buyers and F-commerce sellers.
3. The estimator in the repo prices three products. The live site lags behind the repo, so the redesign branch has not been deployed yet.
4. The safe facts to build trust on are: founded 1989, 1–3 day delivery, the existing client logos (Navy, World Vision, Swimming Federation), published prices and the reprint and payment-safety policies.
5. Gaps: only 7 portfolio images, no customer reviews, packaging cannot be priced online, and "100+ clients" plus the follower and reach figures are unverified placeholders.
6. The market favours this model. Bangladesh has about 77.1M Facebook users. bKash reports 83M+ registered customers but only about 47M active. The 2024 polythene-bag ban pushes demand toward paper bags and kraft packaging.
7. Abroad, the patterns worth copying are: unlimited free proofs, proof-free reorders, starting-price anchors, craft storytelling, need-based navigation and visible review counts. Sources: Sticker Mule, MOO, Jukebox, Printo and PrintStop.
8. P1a needs no engineering: a proof promise, a reorder CTA, one advance-payment rule and a Google Business Profile. P1b depends on the owner's costing: packaging tiers and F-commerce kits.
9. The redesign should be an editorial heritage look in cream, ink and orange, with a text- and CSS-only hero and photos below the fold. Contrast rules are set as hard numbers.
10. The redesign uses existing data only. Kits, testimonials, WhatsApp, payment details and packaging prices stay owner-gated and hidden until the owner supplies real data.

---

## 1. Current business snapshot

### Offer
- **Hero (live):** "প্রিন্টিং, প্যাকেজিং ও ব্রান্ডিং — সহজ, দ্রুত, নির্ভরযোগ্য", with the badge "১৯৮৯ সাল থেকে AI যুগে 🚀". The site promises 1–3 day delivery and courier delivery across Bangladesh.
- **Products (FAQ and portfolio):** visiting cards, stickers and labels, cash memos and pads, notepads, flyers, banners, brochures and catalogues, invitation cards, premium shopping bags and custom boxes.
- **Hidden data:** `data/products.ts` and `data/categories.ts` list 12 products in 8 categories, including mugs, t-shirts, certificates, "security printing" and vehicle wraps. They are not visible because `/shop`, `/product/*` and `/category/*` redirect to "/". These capabilities have **not been confirmed with the owner**, so they should not be shown.
- **Design service:** logo and identity, stationery, labels and packaging, and flyers. Design is charged separately and quoted first. The process has four steps: idea → draft → revisions → print.

### Estimator status (corrected)
- **Repo:** `components/price-estimator.tsx` lines 30–33 enable three products: `visiting-card`, `cash-memo` and `round-sticker`. A fourth entry, `coming-soon`, is disabled ("শীঘ্রই আসছে") and links to Messenger.
- **Live (review fetch, 2026-11-15):** visiting card and cash memo work. Round sticker and coming-soon show "শীঘ্রই আসছে". **The live deploy lags behind the repo**, which means the current branch has not been shipped.
- **What this means:** stickers and memos already have estimators. The only genuinely new estimator is **packaging**, and it is owner-gated (§4, P1b).

### Pricing signals (`lib/calculateEstimate.ts`)
| Item | Tier | Total (৳) | Per unit |
|---|---|---|---|
| Visiting card, 300gsm art | 500 / 1,000 | 1,000 / 1,200 | ৳2.00 / ৳1.20 |
| | 2,000 / 3,000 / 4,000 | 2,200 / 3,000 / 3,800 | ৳1.10 → ৳0.95 |
| | 5,000+ / custom | cost-plus formula, ±10% range | – |
| Round sticker 2" | 1,000 / 2,000 / 3,000 / 5,000 | 1,350 / 2,500 / 3,200 / 4,000 | ৳1.35 → ৳0.80 |
| Cash memo | any | formula: sheets + plate ৳120/colour + printing ৳300/colour + binding | – |

This is offset volume economics. The useful minimum runs are 500 cards or 1,000 stickers, and the unit price falls steeply as quantity rises. The site states that prices move with the paper market ("মূল্য পরিবর্তনশীল").

### How the site converts
- **Primary path:** an m.me/heybarnick deep link with prefilled text, a session `BR-XXXXX` reference and the traffic source (`lib/order.ts`, `withMessengerRef`).
- **Secondary paths:** a `tel:` link and a mobile sticky bar. GA4 records this through `data-track-*` attributes, ContactTracker, AnalyticsTracker and the `/go` links.
- **Not available:** WhatsApp, email, file upload, online payment, a reorder path and a quote form.

### Strengths
1. **37 years of heritage and institutional clients on the logo wall.** This is rare in a market of young Facebook print pages.
2. **It owns production.** Aggregators such as Print Wizard resell other presses' capacity ([TBS, 2021](https://www.tbsnews.net/node/291352)).
3. **Published tier prices.** Most local rivals say "inbox for price".
4. **Strong process content already exists.** /guide covers files, paper, finishing and proofs. /policies covers the reprint promise, a payment-fraud warning and privacy.
5. **Messenger-native funnel with attribution already in place.**

### Weaknesses
1. **Thin portfolio.** There are only 7 images (`public/testimonials/1–7.webp`), and several "specs" fields just repeat the product name.
2. **Unverified numbers.** `data/insights.ts` is headed "update with real Meta Business Suite data". **Every** figure in it is unverified, including `trustedClients: 100` (the "100+ clients" on the live site), followers 12,500, reach 45,000 and the category percentages. The only safe numbers are **1989**, the years derived from it, and **1–3 days**, which policies and FAQ already state.
3. **Conflicting advance-payment rule.** "৫০% অগ্রিম" appears in `contexts/language-context.tsx` at line 76 (`howTo.step3.desc`), line 104 (the 50% advance note) and line 151 (FAQ answer). The English versions are at lines 300, 328 and 374. It also appears as `insights.advancePercent: 50`. Only /policies differs, saying the amount is confirmed in chat. 50% is therefore the dominant message and /policies is the outlier. **The owner must choose one rule. The redesign must not change this copy until they do.**
4. **Packaging cannot be quoted.** It is a headline category, yet there are no sizes, minimums or prices.
5. **Tone mismatch.** "AI যুগে 🚀" undercuts the heritage story, and the page does not support the AI claim.
6. **No customer-voice proof.** There are no reviews, ratings or case studies.
7. **Messenger-only intake.** WhatsApp-preferring and email/PO corporate buyers have no comfortable channel.
8. **Estimator tap targets fail the 44px minimum.** Quantity and option pills use `min-h-9` (36px) at `price-estimator.tsx` lines 108, 688 and 785. Several buttons are `min-h-10` (40px).

---

## 2. Bangladesh market

### F-commerce and payments
- **Facebook:** 77,135,200 users in Bangladesh, 42.5% of the population (October 2026), from Meta ad-reach data via [NapoleonCat](https://napoleoncat.com/stats/facebook-users-in-bangladesh/). Messenger reach is of a similar order, but estimates vary widely by method (compare the [Daily Star](https://images.thedailystar.net/node/3735526) DataReportal figure). Treat these as approximate.
- **E-commerce size:** about $3–3.5B (2025–26) per Statista and e-CAB, cited by [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/409462/the-price-puzzle-in-bangladesh%E2%80%99s-booming-online). A conflicting estimate puts it at $7.41B ([Research and Markets](https://www.researchandmarkets.com/r/1r2vfp)). The F-commerce share is reported only in dated sources ([fibre2fashion, 2023](https://fibre2fashion.com/news/e-commerce-retail/bangla-2-bn-e-com-market-rising-at-50-per-year-dcci-270823-newsdetails.htm); [DHL guide](https://www.dhl.com/discover/en-bd/e-commerce-advice/e-commerce-trends/guide-to-f-commerce-in-bangladesh)). **I found no reliable 2025–26 count of sellers.** None of these figures should go on the website.
- **What these sellers buy:** jar and pouch labels, thank-you cards, mailer boxes, paper bags, hang tags and memos. They order small batches repeatedly, decide on mobile in Messenger and pay by bKash.
- **bKash:**
  - 83M+ registered customers as of April 2026, per the first-party [bKash About page](https://www.bkash.com/en/about). I could not re-fetch it directly (HTTP 403); the figure was confirmed through search snippets.
  - About 82M verified registered and about 47M active in the last three months at the end of 2025, per [Bonik Barta](https://en.bonikbarta.com/business/dt2VlJjSIXS99Mic).
  - So *registered* is roughly 1.75× *active*.
  - About 800k Bangla QR points ([Daily Star](https://www.thedailystar.net/supplements/the-qr-era/news/bkash-deploys-800000-interoperable-bangla-qrs-4232551)).
  - Payment links through bKash for Business ([Business Insider BD](https://www.businessinsiderbd.com/corporates/news/15717/bkash-for-business-rolls-out-for-merchants-entrepreneurs)).
  - Gateways such as [ShurjoPay](https://shurjopay.com.bd/) aggregate bKash and Nagad.

### Regulatory tailwind: polythene ban
- Polythene and PP shopping bags were banned in superstores from 1 Oct 2024 and in all markets from 1 Nov 2024 ([Financial Express](https://today.thefinancialexpress.com.bd/print/ban-on-polythene-bags-at-all-markets-from-nov-1-1727201758)).
- Enforcement is weak outside superstores ([UNB](https://unb.com.bd/category/Special/weak-enforcement-keeps-polythene-thriving-in-bangladesh-markets-insiders/177093)). Status in 2026 is **unverified**.
- Even so, demand for printed paper and kraft bags is structurally up.

### Corporate, NGO and events
- **Corporate and NGO buyers** order cards, letterheads, envelopes, certificates, notepads, calendars and diaries. Demand peaks seasonally: year-end, Eid and Pohela Boishakh.
- **Wedding and event cards** are a large, design-led segment in Old Dhaka. I found no market sizing (**unverified**).

### Local players
| Player | Model | Note |
|---|---|---|
| Print Wizard | Aggregator, instant quote | 2021 profile; **current status unverified** ([TBS](https://www.tbsnews.net/node/291352)) |
| Rubik Print | Design + print e-commerce | Launched 2019; **status unverified** ([Future Startup](https://futurestartup.com/2019/02/10/design-and-printing-ecommerce-startup-rubik-print-launches/)) |
| MANS Packaging | Box manufacturer, MOQ 1,000 | Directory listing ([automa](https://automa.net/company/by-mans-packaging)) |
| Bikroy listings | Many presses, "price on request" | ([Bikroy](https://bikroy.com/bn/printing-services/carton)) |
| Old Dhaka cluster | Hundreds of small presses competing on price | ([Banglapedia](https://en.banglapedia.org/index.php/Printing)) |

I dropped "PackBox BD" because it is hosted on a prototype subdomain and could not be verified.

**Positioning gap:** local rivals are either anonymous "inbox for price" pages or aggregators that don't own production. Barnick can be the *trusted, transparent, production-owning* press with a polished web presence.

---

## 3. Abroad competitors

| # | Competitor | What they do well (verified) | What Barnick can borrow at its scale |
|---|---|---|---|
| 1 | **Sticker Mule** (stickers, US) | "Unlimited free proofs" on all orders. "Reorders skip our proof approval process and go directly into our production queue." For order-ahead deliveries, "Upon proof approval you'll be charged" ([ordering FAQ](https://stickermule.com/support/ordering)). No proof turnaround time is stated, and charge timing for standard orders is not stated. A $1 sample pack is offered ([samples](https://stickermule.com/en-in/products/sample-pack)) | Free digital proofs until approval. One-tap reorder that skips re-proofing for an unchanged job. Advance payment taken after proof approval. A time promise for proofs is Barnick's own idea and must be set by the owner |
| 2 | **Printo** (India, 29+ stores in 6 cities) | Templates or "upload print-ready files", an online design tool, and "your order in just 4 Hrs" for selected products in 4 cities ([printo.in](https://www.printo.in/)). A South Asian, price-sensitive market close to Barnick's | "Upload your file / start from a template / send your Canva link" entry points. A physical-press story (Printo's stores, Barnick's Old Dhaka shop). An express tier only if the owner prices it |
| 3 | **PrintStop** (India, corporate print) | "Every order includes a digital proof for approval before production begins." Designs saved for reordering. "Starts at" price anchors (diaries and calendars from ₹9). Cites "4.7 star average across 500 plus Google reviews" ([printstop.co.in](https://www.printstop.co.in/); self-reported) | Proof-before-production as a stated promise. "শুরু ৳…" anchors. Showing a **Google review rating** honestly once one exists. A corporate calendar and diary season page |
| 4 | **MOO** (premium cards) | Paper storytelling, e.g. Luxe 32pt, layered, coloured seam ([MOO Luxe](https://www.moo.com/business-cards/luxe)). Templates filterable by industry ([templates](https://www.moo.com/design-templates/business-cards/)) | Macro photos of paper and finish for a premium tier above the ৳1/card line. "Different names, one print run" for corporate teams |
| 5 | **Jukebox Print** (single-location press, Vancouver) | Named Forbes Advisor "Best Overall" 2025 ([press](https://www.finanzen.net/nachricht/aktien/jukebox-print-named-best-overall-business-card-printing-service-for-2025-by-forbes-advisor-and-top-pick-by-the-new-york-times-wirecutter-15049715)); review count shown publicly ([Trustpilot](https://www.trustpilot.com/review/jukeboxprint.com?page=5)) | The closest analogue: craft plus trust from a single owned press. A "visit our press" heritage story and specialty-finish showcases |
| 6 | **Packhelp** (custom mailers, EU) | The current mailer page shows a "Get a quote" / "send us a brief" path; no MOQ or instant calculator was visible today ([packhelp.com/mailer-boxes](https://packhelp.com/mailer-boxes/)). Earlier "instant quote" and low-MOQ claims are **unverified for now** | A brief-led packaging enquiry. A packaging estimator with standard sizes is **Barnick's own proposal** and does not rest on Packhelp evidence |
| 7 | **noissue** (eco packaging) | Sustainability as the brand; low-MOQ tissue and mailers ([tissue](https://noissue.co/category/tissue-and-wrapping)) | A "polythene-free paper and kraft" line, with honest claims only |
| 8 | **Vistaprint** (mass web-to-print) | Templates or upload, and reorder of past designs ([G2](https://g2.com/products/vistaprint/reviews)) | A reorder flow keyed on the `BR-` reference and the phone number |
| 9 | **Canva Print** | Removes the "I have no design" barrier ([Canva](https://www.canva.com/print/wedding-stationery/)) | Say "Canva files and links accepted" in /guide, once the owner confirms |
| 10 | **Zazzle** | Coordinated invitation suites ([Budget Savvy Bride](https://thebudgetsavvybride.com/?p=34724)) | A later curated Bengali wedding-suite gallery (P3) |

I dropped PrintNinja and Printful/Printify as low relevance, and dropped the unverified merger claim.

**Common patterns worth adopting:**
- Free proof before production.
- Reorders that skip re-proofing.
- "Starts at" price anchors.
- Upload, template or Canva entry points.
- Visible third-party review counts.
- Paper and finish storytelling.
- A physical-press or heritage story.
- Navigation by need, not by product taxonomy.

---

## 4. Future business scope (prioritised, with success metrics)

Metrics use the existing GA4 events and Messenger `BR-` reference codes. Baseline them for four weeks before making changes.

| Pri | Opportunity | Why | Effort | Gate | Success metric |
|---|---|---|---|---|---|
| **P1a** | **Free-proof promise** ("ছাপার আগে ফ্রি ডিজিটাল প্রুফ, অনুমোদনের পর অগ্রিম") | Removes the biggest anxiety; matches the Sticker Mule and PrintStop practice | Process only | Owner confirms the rule (and any turnaround time) | Messenger clicks per GA4 session; chat-to-order rate from the `BR-` ref log |
| **P1a** | **Reorder CTA** that opens Messenger with "Reorder: <BR-ref / job>" | Labels and memos are consumables; reorders are high-margin | Process + one CTA | Staff keep a job archive by phone number | Share of orders that are reorders; 90-day repeat rate |
| **P1a** | **One advance-payment rule** across FAQ, howTo, notes and /policies | Removes a trust contradiction | Copy only | Owner decision | Fewer "how much advance?" chat questions (staff tally) |
| **P1a** | **Google Business Profile and Maps reviews** | The main channel for local trust and "printing press near me" searches; free. Whether a listing exists today is **unverified** | Low | Owner claims or verifies the listing | Count and average of GBP reviews; GBP calls and direction requests. Show the rating on the site only when real |
| **P1b** | **Productised packaging** (3–5 standard mailer sizes, paper bags, labels) plus a packaging estimator | Headline category that can't be quoted; polythene-ban tailwind | Med–High: die and stock decisions, costing, photography | Owner costing, minimums and photos | Packaging share of orders; average order value |
| **P1b** | **F-commerce starter kits** (stickers + thank-you cards + boxes or bags, three fixed tiers) | Bundles raise order value and simplify choice | Med | Depends on P1b packaging prices | Kit-ID Messenger clicks; kit orders per month; average order value |
| **P2** | WhatsApp channel (wa.me, same ref logic) | Corporate and diaspora preference | Low | Owner gives the number and staffs a second inbox | WhatsApp clicks vs Messenger clicks |
| **P2** | bKash/Nagad advance: official merchant number or QR, later a payment link or gateway | Formalises the advance; fights impersonation scams | Low → Med | Owner provides the merchant details | Share of orders paid via link; fraud complaints |
| **P2** | Corporate accounts and kits; year-end calendars and diaries; quote form | Logo wall shows fit; high ticket value | Med | Owner pricing, a lead-handling process, an email address | Quote requests per month; corporate revenue share |
| **P2** | Fixed-price design packages | Many sellers have no artwork | Low | Owner prices | Design-to-print conversion |
| **P3** | Eco line (kraft and paper; claims only if backed) | Regulation and differentiation | Med | Material specs; no claimed certifications | Eco SKU share |
| **P3** | Wedding and event suites | Seasonal, design-led segment | Med | Gallery photos | Seasonal enquiries |
| **P3** | Label subscription | Predictable revenue | Med | Only after the reorder habit is proven | Active subscribers |
| **P4** | Export and diaspora | Low-cost offset plus heritage | High | Validate demand first (**unverified**) | – |

**Sequencing:**
1. Weeks 0–4: P1a, plus shipping this redesign.
2. Months 1–4: P1b once costing is ready.
3. Months 3–6: P2.
4. Months 6–12: P3.

---

## 5. Build now vs owner-gated

| Ship in this redesign (existing data only) | Owner-gated (hidden or placeholder, marked in code comments, never shown live with dummy content) |
|---|---|
| Restyled hero: CSS/text only, existing value line, heritage line "পুরান ঢাকায়, ১৯৮৯ থেকে / Old Dhaka, since 1989" | "তিন প্রজন্মের…" or any generational or founder claim |
| Trust strip: 1989, years since 1989, 1–3 days, nationwide courier, existing client logos, the reprint promise from /policies | "100+ clients", followers, reach, review rating, any count from `data/insights.ts` |
| Restyled estimator for all three repo products (logic unchanged), with ≥44px targets | Packaging estimator and tiers |
| Portfolio with the 7 existing images (specs tidied only from existing data) | Additional job photos; packaging gallery |
| "Shop by need" cards (online sellers / business and corporate / events) linking **only to existing sections**: #estimate, #products, #design, #contact | F-commerce kits with prices; corporate quote form |
| How-ordering-works steps from existing `howTo.*` copy (50% wording untouched) | The resolved advance rule; the free-proof promise wording |
| Design service with the existing four steps | Fixed-price design packages; "Canva link accepted" |
| FAQ and CTA restyled; Messenger and phone only | WhatsApp button, email, bKash/Nagad merchant number or QR, business hours, map |
| Remove "AI যুগে 🚀" and the emoji | Testimonials and reviews section; heritage photo story (shop, machines, founder) |

---

## Design brief for the redesign

**Personas (in priority order)**
1. **F-commerce seller.** 22–35, on mobile, reads Bengali, sells food, cosmetics or fashion on FB/IG. Needs stickers, labels, bags and boxes in short runs, fast. Decides on price, examples and trust, then messages. Pays by bKash.
2. **SME owner or shopkeeper.** Buys cards, memos, pads and banners. Price-sensitive repeat buyer; may call instead of chatting.
3. **Corporate or NGO admin.** Needs credibility, deadline reliability and English parity.
4. **Event or wedding customer.** Design-led and seasonal.

**Homepage jobs (in order)**
5. Within 5 seconds, say what Barnick is and since when: printing and packaging, Old Dhaka, since 1989.
6. Route by need (online sellers / business and corporate / events), not by product taxonomy.
7. Show an instant price for visiting card, cash memo and round sticker.
8. Prove craft with real photos and specs.
9. Prove trust with heritage, logos, the reprint promise and the payment-safety warning.
10. Remove process anxiety: file → proof → advance → delivered in 1–3 days.
11. Convert in one tap: Messenger first, phone second.

**Section order** (keep the ids hero, estimate, products, design, faq, contact)
12. Navbar → Hero `#hero` → Trust strip → Shop-by-need cards → Price estimator `#estimate` → Portfolio `#products` → How ordering works → Design service `#design` → FAQ `#faq` → CTA `#contact` → Footer → mobile StickyContactBar.
13. Testimonials, kits and the heritage photo story get placeholder slots. These slots stay **unrendered** until the owner provides data, and are marked with `// OWNER-GATED: …` comments.
14. Below-fold sections stay `next/dynamic`.

**Hero (LCP rule)**
15. The hero is typographic and CSS-only. Noto Serif Bengali display headline on the cream ground. Small tracked Bengali eyebrow "পুরান ঢাকায়, ১৯৮৯ থেকে" (en: "Old Dhaka, since 1989").
16. Primary CTA is an orange Messenger button. Secondary is "দাম দেখুন" linking to #estimate.
17. The existing CSS production flow and logo cloud may stay.
18. No hero photograph and no background image.
19. Any grain is inline SVG/CSS noise at ≤4% opacity, or none at all.
20. The logo `public/barnick.png` is used as-is: never recoloured, cropped, inverted or redrawn.

**Palette and contrast** (computed)
21. Tokens: cream `#F3EEE3` background, ink `#111111` text, orange `#D9541E` for accents and primary CTAs. Derived tints and shades and neutral greys are allowed. No blue or navy anywhere except the logo itself.
22. Measured contrast: orange on cream = 3.47:1, white on orange = 4.01:1, ink on orange = 4.71:1. Body text is always ink on cream (passes easily).
23. Orange **text** only at ≥24px regular or ≥18.66px bold. Otherwise use orange only for rules, icons and underlines.
24. Primary buttons use ink `#111111` text on orange. White text on orange only at bold ≥18.66px.
25. Focus: a 2px ink outline with a 2px offset on every interactive element, visible on both cream and orange.

**Typography**
26. No new fonts. Display: Noto Serif Bengali, with the already-loaded Fraunces for Latin glyphs. Body: Noto Sans Bengali (Geist for Latin). All through next/font with `display: "swap"`.
27. Bengali body ≥16px with line-height ≥1.7. Display line-height about 1.25.
28. Eyebrows are small, tracked, medium-weight Bengali labels with English through the toggle. No Latin small caps on the Bengali UI.

**Tone and copy**
29. Use a calm, crafted, confident heritage voice. Remove "AI যুগে 🚀" and all emoji from headings.
30. Every new string goes through `t()` with both bn and en entries in `contexts/language-context.tsx`.
31. Use only facts already in `data/*.ts`, `lib/*` and the existing translations. Do not show anything from `data/insights.ts`, including "100+".
32. Do not edit the 50% advance copy.

**Trust signals near CTAs**
33. Next to the primary CTAs, show "১৯৮৯ থেকে", "১–৩ দিনে ডেলিভারি", the reprint promise (existing policy text) and the official-number payment warning (existing policy text).
34. Show price anchors ("শুরু ৳১,০০০ / ৫০০ পিস") derived only from `calculateEstimate.ts`.

**Analytics preservation**
35. Every new card or CTA (shop-by-need, hero, trust, sticky bar) is a plain `<a href>` to `m.me/...` or `tel:`, or an in-page `#id` link, and carries `data-track-section`, `data-track-item`, `data-track-value` and `data-track-source`.
36. Keep `<ContactTracker/>` and `<AnalyticsTracker/>` in `app/layout.tsx`, plus `app/go/route.ts` and the `/go` redirects in `next.config.ts`.
37. Estimator calculation logic is unchanged; restyle only.

**Mobile-first rules**
38. Design for a 360px baseline with 16px gutters and no horizontal scroll.
39. All tap targets ≥44px. Raise the estimator pills from `min-h-9` and `min-h-10` to `min-h-11`.
40. Sticky bottom bar on mobile with Messenger (primary) and Call. Leave a slot for WhatsApp, which stays owner-gated and hidden.
41. The estimator must be usable one-handed. Results must be visible without hunting.
42. Photos: below the fold only, `next/image` with explicit sizes, lazy-loaded, WebP, with Bengali alt text.
43. No new UI kits, 3D or heavy libraries. Motion is subtle. Honour `prefers-reduced-motion`, and keep the logo marquee light and pausable.
44. Use semantic landmarks (header, nav, main, section with aria-labelledby, footer) and AA contrast throughout.

---

## Review log
| Checker point | Resolution |
|---|---|
| [major] Estimator status wrong | Rewritten from `price-estimator.tsx` lines 30–33 (three active products plus coming-soon) and the live site. Noted that the live deploy lags the repo. Removed "expand to stickers/memos"; only packaging is new (P1b, gated) |
| [major] Sticker Mule claims unsupported | Re-fetched the ordering FAQ. Kept only: unlimited free proofs, reorders skip proofing, charge on proof approval for order-ahead. Dropped "4h", "4-day" and the dead link. A proof time promise is now Barnick's owner-set idea |
| [major] Packhelp unverified | Re-fetched packhelp.com/mailer-boxes: "Get a quote" / brief only, no MOQ visible. Marked the earlier claims unverified. The packaging estimator is presented as Barnick's own proposal |
| [major] Hero vs LCP constraint | Hero is specified as typographic, CSS-only, with no photo or background image. Grain is inline SVG/CSS at ≤4% or dropped. Photos go below the fold via next/image (items 15–19, 42) |
| [major] No build-now vs owner-gated split | Added the §5 two-column table and items 13 and 31 |
| [major] Vague accessibility | Added computed ratios and hard rules for orange text, button text colour, focus rings and 44px targets, naming the `min-h-9` pill lines (items 22–25, 39) |
| [major] "100+ clients" inconsistency | `trustedClients` is treated as unverified along with the rest of `insights.ts`. The safe numbers are 1989, derived years and 1–3 days only |
| [minor] Advance contradiction understated | Listed every location (language-context lines 76/104/151 and en 300/328/374, plus `insights.advancePercent`). Owner to decide; copy frozen in the redesign; added as P1a |
| [minor] Stale market figures | Facebook updated to 77.1M / 42.5% (Oct 2026, NapoleonCat new URL). bKash updated to 83M+ registered (first-party, Apr 2026) vs about 47M active (Bonik Barta). The third-party blog was removed |
| [minor] Typography conflicts with stack | No new fonts. Noto Serif/Sans Bengali (plus the existing Fraunces/Geist for Latin). Bengali tracked eyebrows with an en toggle. Line-heights 1.7 body and 1.25 display |
| [minor] Unverified generational badge | Replaced with "পুরান ঢাকায়, ১৯৮৯ থেকে / Old Dhaka, since 1989". The generational line moved to owner-gated |
| [minor] Too many P1 items | Split into P1a (process only: proof, reorder, advance rule, GBP) and P1b (packaging, kits, gated on costing). Each has a success metric |
| [minor] Missing South Asian competitors and GBP | Added Printo and PrintStop (both fetched 2026-11-15) and a Google Business Profile item at P1a. Dropped PackBox BD, PrintNinja and Printful/Printify as unverified or low relevance |
| Missing: tracking preservation for new cards | Item 35, plus section ids kept in item 12 |
| Missing: success metrics | Added a metric column in §4 tied to GA4 and `BR-` refs |
