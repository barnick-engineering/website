# Analytics

GA4 property: `G-M37QBL6ZZN` (constant in `lib/analytics.ts`).

Orders close in Messenger or on the phone, so **`generate_lead` is the conversion**. Everything
else explains what happened before it, and where the visitor came from.

## Where the code lives

| File | What it does |
|---|---|
| `lib/analytics.ts` | `trackEvent()` / `setUserProperties()`. Queues calls until gtag loads. Logs to the console in dev. |
| `lib/attribution.ts` | Classifies each landing (UTM → referrer → `fbclid`) and stores the first and session touch. |
| `components/analytics-tracker.tsx` | Traffic source, language, scroll depth, section views, Web Vitals. |
| `components/contact-tracker.tsx` | Contact clicks (Messenger, phone, WhatsApp) and social profile clicks. Adds the ref code and source to Messenger links. |
| `app/layout.tsx` | Loads gtag (`afterInteractive`, **production only**). |
| `next.config.ts` → `redirects()` | `/go/*` tagged short links. |

GA does not load in `npm run dev`. To test locally against GA DebugView, run with
`NEXT_PUBLIC_GA_DEBUG=true`. Without it, events are only printed to the browser console as `[analytics]`.

## Event dictionary

| Event | Fires when | Parameters |
|---|---|---|
| `generate_lead` ⭐ | Any Messenger, phone or WhatsApp link is clicked | `method`, `source`, `item`, `ref_code`, `traffic_source`, `traffic_campaign`, `first_source`, `page_path`, `value` + `currency` (estimator only) |
| `contact_click` | Same click (same parameters, without value). Kept for history from before Nov 2026. | as above |
| `estimate_product_select` | Estimator product tab changed | `product` |
| `estimate_update` | Visitor builds or changes a quote (sent 1.5 s after their last change) | `product`, `qty`, `config`, `value`, `value_max`, `currency` |
| `estimate_link_open` | Someone opens a shared estimate link (`?product=…`) | `product` |
| `portfolio_filter` | Portfolio category chosen | `category` |
| `portfolio_open` | Portfolio item opened in the lightbox | `item_id`, `item_name`, `category` |
| `portfolio_load_more` | "Show more" clicked | `category`, `shown` |
| `section_view` | A section stays in the middle of the screen for 1 s | `section`, `page_path` |
| `scroll_depth` | 25 / 50 / 75 / 100 % of a page | `percent`, `page_path` |
| `social_click` | Facebook, Instagram, LinkedIn, etc. profile link clicked | `network`, `source`, `page_path` |
| `language_change` | Language toggle clicked | `from`, `to` |
| `traffic_source` | New session source recorded (once per session or campaign) | `source`, `medium`, `campaign`, `landing_page` |
| `web_vitals` | Real-visitor page speed metrics | `metric_name` (LCP/INP/CLS/FCP/TTFB), `metric_value` (CLS ×1000), `metric_rating`, `page_path` |
| `exception` | Error page shown | `description`, `digest`, `fatal`, `page_path` |
| `page_not_found` | 404 page shown | `page_path`, `referrer` |

**User properties:** `first_source`, `first_medium`, `first_campaign`, `preferred_language`.

**`source` values** (where on the site the click happened): `data-track-source` on a parent element,
otherwise the nearest section id (`hero`, `estimate`, `products`, `design`, `contact`, …), `footer`,
or the page path.

**Adding tracking to a new link:** contact and social links are picked up automatically. Add
`data-track-item="…"` or `data-track-value="1200"` to a link (or a parent element) to attach an
item or a ৳ value to its lead.

## GA Admin checklist (one-time, in analytics.google.com)

1. **Admin → Events:** mark `generate_lead` as a **key event**. Optionally set a default value of ৳500.
2. **Admin → Custom definitions → Create custom dimension.** Data only shows up in reports *after* the
   dimension is created; nothing is filled in for earlier dates.
   - Event scope: `method`, `source`, `item`, `ref_code`, `traffic_source`, `traffic_campaign`, `product`,
     `config`, `category`, `item_name`, `section`, `percent`, `network`, `metric_name`, `metric_rating`
   - User scope: `first_source`, `first_medium`, `first_campaign`, `preferred_language`
   - Custom **metrics**: `qty` (standard), `metric_value` (standard), `value_max` (currency)
3. **Admin → Data collection → Data retention:** change 2 months → **14 months**.
4. **Admin → Data streams → Web → Configure tag settings → Define internal traffic:** add the office/home
   IP addresses. Then **Admin → Data filters:** activate the *Internal traffic* filter.
5. **Admin → Data streams → Web → Enhanced measurement:** keep page views (including *browser history
   changes*), outbound clicks and file downloads on. You can turn **Scrolls** off, since `scroll_depth`
   replaces it.
6. **Admin → Product links → Search Console:** link it to see Google search queries.
7. **Admin → Data collection:** turn on **Google signals** to get age, gender and interest reports.

### Useful reports and explorations

- **Acquisition → Traffic acquisition**, add a key-event column for `generate_lead`: which channel brings leads.
- **Explore → Funnel:** `session_start` → `section_view (estimate)` → `estimate_update` → `generate_lead`.
- **Explore → Free form:** `generate_lead` broken down by `source` × `method` (which button, which channel).
- **Explore → Path exploration:** starting from `page_view`, to see the order visitors move through the site.
- `traffic_source` events by `source`: includes `meta` (Facebook/Instagram in-app visits that GA itself
  often files under *Direct*).

### Matching an order back to its visit

Every Messenger message ends with `Ref: BR-XXXXX · <button> · via <source>`. Search that `ref_code`
in **Explore → Free form** (dimension `ref_code`) to see the visitor's session. Your staff can also read
the source directly in the chat.

## Social and campaign links

GA files a visit by its UTM tags first, then by its referrer. Facebook and Instagram in-app browsers,
Messenger and WhatsApp often send no referrer, so **untagged links usually show up as Direct.
Always tag what you post.**

### Flexible link: `/go?source=…` (`app/go/route.ts`)

```
barnickpracharani.com/go?source=facebook
barnickpracharani.com/go?source=instagram&campaign=eid_offer
barnickpracharani.com/go?source=linkedin&to=/guide
```

| Parameter | Becomes | Notes |
|---|---|---|
| `source` | `utm_source` | Required for tagging. Lowercased, spaces become `_`. |
| `campaign` | `utm_campaign` | optional |
| `content` | `utm_content` | optional |
| `medium` | `utm_medium` | Optional. Defaults to `social` for social networks, `qr` for `print`/`qr`, `organic` for google/bing, `email` for email/newsletter, otherwise `referral`. |
| `to` | landing page | Optional. Only paths on this site, e.g. `/guide`. Defaults to the homepage. |

### Short links (already set up)

| Use | Link | Tags it adds |
|---|---|---|
| Facebook page "Website" field | `barnickpracharani.com/go/fb` | facebook / social / page_profile |
| Instagram bio | `barnickpracharani.com/go/ig` | instagram / social / profile_bio |
| LinkedIn company page | `barnickpracharani.com/go/li` | linkedin / social / company_page |
| WhatsApp status / broadcast | `barnickpracharani.com/go/wa` | whatsapp / social / whatsapp_share |
| YouTube channel | `barnickpracharani.com/go/yt` | youtube / social / channel |
| Google Business Profile website | `barnickpracharani.com/go/gmb` | google / organic / business_profile |
| QR on your own visiting cards | `barnickpracharani.com/go/qr` | print / qr / business_card |
| QR on packaging / bags | `barnickpracharani.com/go/qr-pack` | print / qr / packaging |

Add more in `next.config.ts` → `redirects()`.

### Tagging individual posts

```
https://barnickpracharani.com/?utm_source=facebook&utm_medium=social&utm_campaign=eid_offer_2026&utm_content=reel1
```

Rules: lowercase only, `_` instead of spaces.
- `utm_source` is the platform (`facebook`, `instagram`, `linkedin`, `whatsapp`).
- `utm_medium` is `social` for organic posts, `paid_social` for boosted posts and ads.
- `utm_campaign` names the offer or post series. Use `utm_content` to tell posts within a campaign apart.
