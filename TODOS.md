# TODOS

## P1 — Native Join / Purchase Flow

**What:** Replace the `store.socials.website` stopgap with a proper in-app purchase or join flow (Razorpay payment link, community platform redirect with UTM tracking, or Reflock-native checkout).

**Why:** Every user who clicks "Join →" and leaves Reflock to the creator's own website is a user you lose data on and can't retain. The conversion funnel ends at the click event — you don't know if they actually joined, how much they paid, or whether they came back.

**Context:** `JoinButton` in `components/creator/JoinButton.tsx` currently tracks a `product_click` event via Vercel Analytics + `/api/track` → Google Sheets, then navigates to `store.socials.website`. This is a stopgap added in the `claude/blog-seo-pages` branch. The real business model requires keeping the transaction on platform.

**Pros:** Full conversion funnel visibility, in-platform retention, ability to show verified purchase counts, future upsell.

**Cons:** Payment integrations are complex (KYC, GST, payout reconciliation for Indian market). Could take weeks to get right.

**Effort:** L (human ~1 week / CC ~2h for the integration shell)

**Depends on:** Agreement on payment provider (Razorpay / Cashfree / Stripe India)

---

## P3 — Rate Limiting on /api/track

**What:** Add basic rate limiting to `POST /api/track` — e.g., max 10 events per IP per minute. Can use Vercel KV or a simple in-memory counter for Edge functions.

**Why:** Anyone can POST unlimited events to `/api/track`, polluting the analytics Google Sheet with garbage data. Low security risk (no user data is returned), but real data quality risk — noisy events make conversion analytics untrustworthy.

**Context:** `app/api/track/route.ts` accepts `{ event, handle, meta }` with no auth, no input validation, no rate limiting. It appends to `events!A:D` in the Google Sheet using a service account. Current attack vector: `curl -X POST /api/track -d '{"event":"fake","handle":"notreal","meta":"..."}'` × N.

**Pros:** Keeps analytics clean, prevents abuse.

**Cons:** Adds a Vercel KV dependency (small cost) or requires edge middleware.

**Effort:** S (human ~2h / CC ~10min)

**Depends on:** Nothing — standalone addition.
