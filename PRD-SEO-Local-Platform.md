# PRD: SEO Local Platform
**Elevate Digital — Internal Growth Engine**
Version 1.1 | March 2026 — Open Questions Resolved

---

## 1. Summary

This document defines the requirements for an internal SEO platform that powers Elevate Digital's organic growth engine. The platform has two pillars: a **mass content factory** that generates and publishes AI-powered blog posts and local landing pages across every target niche and US city, and an **SEO situation dashboard** that gives real-time visibility into rankings, traffic, and content health. The goal is to grow organic sessions from near-zero to 5,000+/month within 6 months through programmatic local SEO and consistent content publishing.

---

## 2. Contacts

| Name | Role | Responsibility |
|------|------|----------------|
| Tal Shani | Founder / Product Owner | Final decisions, content review, platform strategy |
| TBD | Content Assistant (future hire) | AI draft review, publishing approvals |
| TBD | Developer | Platform build, API integrations |

---

## 3. Background

### What is this?
Elevate Digital is a founder-led AI automation agency serving US small businesses. The website currently has **3 blog posts, no sitemap, no structured data, and no local landing pages**. There is essentially zero organic search presence.

### Why now?
- Both the internal `WEBSITE_OPTIMIZATION_PLAN.md` and `COMPETITIVE_ANALYSIS_REPORT.md` flag SEO as the most critical gap
- Competitors like Smith.ai rank for hundreds of niche + local keywords and capture high-intent leads organically
- AI content generation tools (Claude, GPT-4) have made it economically viable to produce hundreds of quality pages at low cost
- Local SEO for service businesses is still a **winnable game** — most AI automation agencies have not yet built programmatic local content at scale
- Every month without content is organic traffic permanently lost (SEO is compounding — starting sooner multiplies returns)

### What changed?
The agency has reached a point where paid outreach alone cannot scale lead volume cost-effectively. Organic traffic is the only channel that compounds — a blog post written today can generate leads for years. With AI tools now capable of producing high-quality first drafts, the bottleneck is infrastructure and workflow, not writing time.

---

## 4. Objective

### Objective
Build the infrastructure that turns Elevate Digital's domain into the **go-to organic resource for AI automation in every US local market**, driving inbound leads without increasing ad spend.

### Why it matters
- **For the business:** Organic leads cost $0 to acquire once content is live. One ranked page can generate 10–50 leads/month indefinitely.
- **For customers:** Business owners searching "AI voice agent for HVAC Dallas" find Elevate Digital first — before competitors — and arrive pre-educated.
- **Strategic alignment:** Content-led growth is the moat. Service businesses can copy pricing; they cannot easily copy 300 ranked local pages and 100 blog posts.

### Key Results (OKRs)

**O1: Establish Elevate Digital as the dominant organic result for AI automation in US local markets**

| Key Result | Target | Timeline |
|------------|--------|----------|
| KR1: Monthly organic sessions | 0 → 5,000+ | Month 6 |
| KR2: Indexed local landing pages | 0 → 300+ | Month 3 |
| KR3: Blog posts published | 0 → 50+ | Month 6 |
| KR4: Keywords ranking in top 10 | 0 → 50+ | Month 6 |
| KR5: Keywords ranking in top 20 | 0 → 150+ | Month 6 |
| KR6: Content health score | — → >80% avg | Month 3 |
| KR7: Inbound leads from organic | 0 → 10+/month | Month 6 |

---

## 5. Market Segments

### Primary User: Tal Shani (Founder / Solo Operator)
**Job to be done:** Publish high-quality, SEO-optimized content at scale without spending 40+ hours/week writing.

**Constraints:**
- Solo operator — every workflow must be fast and mostly automated
- Limited time for manual SEO tasks (no time to manually write meta tags for 300 pages)
- Needs to review and approve AI drafts before publishing (quality control)
- Must manage content calendar without a dedicated content team

**Success looks like:** Tal opens the platform on Monday morning, sees 5 AI-drafted blog posts ready for quick review, approves them with minor edits, and schedules them — all in under 1 hour.

### Secondary User: Content Assistant (Future)
**Job to be done:** Review AI-generated drafts, fact-check, add personal touches, and publish approved content.

**Constraints:**
- Non-technical — must not require coding or CMS expertise
- Needs clear review workflow (what to check, how to approve)

### End Beneficiary: Potential Elevate Digital Clients
**Job to be done:** Find a trustworthy AI automation agency that understands their specific industry and local market.

**What they search:** "AI chatbot for dental office in Austin TX", "voice agent for HVAC company", "AI automation for law firms Chicago"

---

## 6. Value Propositions

### What customer jobs are we addressing?

| Job | Current Pain | Platform Solution |
|-----|-------------|-------------------|
| Rank for local + niche keywords | No local pages exist | 300+ programmatic city × niche pages |
| Publish consistent blog content | 3 posts published in 6 months | AI drafts ready daily; publish 2–4/week |
| Know which content is working | No analytics visibility | SEO dashboard with rankings + traffic |
| Find keyword gaps | No keyword research infrastructure | Competitor gap analysis tool |
| Keep pages technically healthy | No schema, no meta, no canonical | Automated on-page SEO for every page |
| Identify quick wins | No ranking data | "Keywords ranking 4–20" opportunity report |

### Gains
- Inbound leads from people who already trust Elevate Digital before the first call
- Authority in each niche — being the "AI automation for HVAC" expert nationally
- Compounding returns — content built today earns forever
- Competitive moat — 300 ranked local pages is very hard to replicate quickly

### Pains avoided
- Wasting $3K–$10K/month on paid ads for cold traffic
- Manually writing meta tags, schema, and canonical tags for hundreds of pages
- Flying blind on which pages drive leads vs. which need improvement
- Losing high-intent leads to competitors who have content and Elevate Digital doesn't

---

## 7. Solution

### 7.1 User Flows

#### Flow A: Generate & Publish a Local Landing Page
```
1. Tal selects niche (e.g., "HVAC") + city (e.g., "Dallas, TX")
2. Platform pulls target keywords for that combination from Ahrefs/SEMrush API
3. AI generates page draft: headline, body copy, FAQ section, CTA
4. Platform auto-fills: meta title, meta description, schema markup (LocalBusiness + Service), canonical URL, OG image
5. Tal reviews draft in side-by-side editor (AI draft | live preview)
6. Tal approves → page is pushed to website as /ai-automation/hvac/dallas
7. Sitemap auto-updates, Google Search Console pings for indexing
```

#### Flow B: Generate & Schedule a Blog Post
```
1. Platform suggests 5 blog post ideas based on keyword gaps
2. Tal selects one (e.g., "AI Voice Agent for HVAC Companies: Complete Guide")
3. AI generates full draft (~1,500–2,500 words): intro, H2 sections, internal links, FAQ
4. Tal edits in rich text editor, approves
5. Tal sets publish date → added to content calendar
6. On publish date: post goes live, social sharing prompts appear
```

#### Flow C: Morning SEO Briefing (Dashboard)
```
1. Tal opens dashboard — sees weekly summary card at top
2. Scans: organic sessions vs. last week, new keywords entered top 10, pages with score drop
3. Clicks "Opportunities" → sees 12 keywords ranking 4–10 with low content quality score
4. Picks top 3 → queues AI content improvement tasks
5. Done in 15 minutes
```

---

### 7.2 Key Features

#### PILLAR 1: Content Factory

---

**F1 — Niche × City Landing Page Generator**
*Priority: P0 — Must Have (MVP)*

Generates programmatic local landing pages for every combination of service niche and US city.

- **Content matrix:** 6 niches × 50 cities = 300 base pages (expandable)
  - Niches: Home Services, HVAC, Real Estate, Dental/Medical, Law Firms, Construction
  - Cities: Top 50 US cities by SMB density (NYC, LA, Chicago, Houston, Phoenix, Dallas, etc.)
- **URL structure:** `/ai-automation/[niche-slug]/[city-slug]` (e.g., `/ai-automation/hvac/dallas`)
- **Page template per landing page:**
  - Hero: "AI Automation for [Niche] Businesses in [City]"
  - Pain points section (niche-specific)
  - Services section (which Elevate Digital services apply to this niche)
  - Local social proof hook ("Serving [Niche] businesses across [City] and the [Metro] area")
  - FAQ section (5 questions, auto-generated, schema-marked)
  - CTA: "Book a Free AI Audit"
- **AI generation:** Each page uses a template + AI fill-in for unique body copy (avoids duplicate content penalties)
- **Batch generation:** Generate all 300 pages in one click, review queue for spot-check before publish

**Acceptance criteria:**
- Each page has unique meta title, meta description, canonical URL
- Each page includes LocalBusiness + Service JSON-LD schema
- Page word count > 800 words
- All pages submitted to sitemap on publish
- No two pages have >40% content overlap (duplicate content check)

---

**F2 — Blog Post Generator**
*Priority: P0 — Must Have (MVP)*

AI-powered blog content creation targeting mid-funnel keywords.

- **Content types supported:**
  - Comparison: "AI Voice Agent vs. Live Receptionist for [Niche]"
  - How-to guide: "How to Automate Appointment Booking for [Niche]"
  - Pillar page: "Complete Guide to AI Automation for [Niche] Businesses"
  - Local guide: "Best AI Tools for [Niche] Businesses in [City]"
  - Case study format: "How a [Niche] Business Added $X in Revenue with AI"
- **Keyword targeting:** Each post is built around a primary keyword + 3–5 secondary keywords
- **Content brief → AI draft pipeline:**
  1. Enter target keyword
  2. Platform generates content brief (title, H2 outline, word count target, competitor URLs to beat)
  3. One-click AI draft generation
  4. Rich text editor for review/editing
  5. Readability score + SEO score displayed live
- **Internal linking:** Platform suggests internal links to existing pages/posts as you write
- **Target output:** 2–4 posts/week

**Acceptance criteria:**
- AI draft generated in < 30 seconds
- Post includes: meta title, meta description, Article schema, OG image placeholder
- Word count ≥ 1,200 words for standard posts; ≥ 2,500 for pillar pages
- Readability score > 60 (Flesch-Kincaid)
- At least 2 internal links suggested per post

---

**F3 — Content Calendar**
*Priority: P0 — Must Have (MVP)*

Visual calendar view of all planned, drafted, scheduled, and published content.

- **Kanban view:** Draft → Review → Scheduled → Published
- **Calendar view:** Month view showing publish dates
- **Content card shows:** title, type (blog/landing page), target keyword, niche, author, SEO score
- **Bulk scheduling:** Assign publish dates to multiple pieces at once
- **Publishing integration:** Scheduled posts auto-publish to website at set time (via API or webhook)
- **Status filters:** Filter by niche, content type, status, date range

**Acceptance criteria:**
- Calendar loads in < 2 seconds with 200+ content items
- One-click status change (Draft → Scheduled)
- Publishing action triggers website deployment or CMS update

---

**F4 — On-Page SEO Automation**
*Priority: P0 — Must Have (MVP)*

Automatically applies technical SEO best practices to every piece of content.

- **Auto-generated for every page:**
  - Meta title (≤ 60 characters, includes primary keyword)
  - Meta description (≤ 160 characters, includes CTA)
  - Canonical URL
  - Open Graph title + description
  - OG image (auto-generated or template-based with page title)
- **Schema markup auto-applied:**
  - Blog posts → `Article` schema
  - Local landing pages → `LocalBusiness` + `Service` schema
  - FAQ sections → `FAQPage` schema
  - Homepage → `Organization` schema
- **Sitemap management:**
  - Auto-updates sitemap.xml on every publish
  - Pings Google Search Console for re-crawl
  - Generates robots.txt with correct directives

**Acceptance criteria:**
- Zero pages published without meta title + description
- Schema validation passes Google's Rich Results Test
- sitemap.xml always reflects current published pages
- robots.txt present and correctly configured

---

**F5 — Keyword Research & Content Brief Builder**
*Priority: P1 — Should Have (MVP+)*

Reduces time from "I want to write about X" to "here's the brief" from hours to minutes.

- **Keyword input:** Enter seed keyword → see search volume, difficulty, CPC, SERP overview
- **Related keywords:** Auto-suggest 20 related keywords with metrics
- **Content brief auto-generation:**
  - Recommended word count (based on top 10 competitors)
  - Suggested H2/H3 structure (based on PAA + competitor headings)
  - Questions to answer (from People Also Ask)
  - Internal link suggestions
- **Keyword clustering:** Group related keywords into content clusters (pillar + spoke model)
- **Data source:** Ahrefs API or SEMrush API

---

#### PILLAR 2: SEO Situation Dashboard

---

**F6 — SEO Overview Dashboard**
*Priority: P0 — Must Have (MVP)*

The "morning briefing" view. One page that tells you everything important about SEO health right now.

**Cards / widgets:**
- **Organic Sessions This Week** — vs. last week + sparkline
- **Total Keywords Tracked** — count in top 3 / top 10 / top 20 / not ranking
- **Top Movers** — keywords with biggest rank change (up and down) this week
- **Content Health** — % of pages with score > 80
- **Indexed Pages** — total indexed vs. total published
- **Quick Win Opportunities** — count of keywords ranking 4–20 (one click to see list)

**Filters:** date range (7d / 30d / 90d / custom), niche filter, content type filter

**Acceptance criteria:**
- Dashboard loads in < 3 seconds
- Data refreshed daily from Google Search Console + rank tracker
- Mobile-responsive (Tal may check on phone)

---

**F7 — Keyword Rank Tracker**
*Priority: P0 — Must Have (MVP)*

Tracks 200+ target keywords across niches and cities.

- **Keyword groups:** Organized by niche (HVAC, Dental, Real Estate, etc.) and type (local, service, comparison, informational)
- **Per keyword view:** current rank, rank history chart (30/90 days), search volume, URL ranking, featured snippet status
- **Rank change indicators:** +5 (green), -3 (red), new entry (blue star)
- **SERP features:** shows if keyword has featured snippet, PAA, local pack
- **Bulk import:** paste list of 200 keywords and auto-assign to groups
- **Alerts:** email/notification when keyword enters top 10 or drops > 5 positions

**Target keywords to pre-seed (examples):**
- "AI voice agent for [niche]" (6 niches × service type = ~30 keywords)
- "AI automation for [niche] [city]" (6 niches × 50 cities = 300 keywords)
- "AI chatbot for [niche]" (6 niches)
- "best AI tools for [niche] business" (6 niches)
- Competitor brand comparison: "elevate digital vs [competitor]" (10 competitors)

---

**F8 — Organic Traffic Analytics**
*Priority: P0 — Must Have (MVP)*

Google Search Console data surfaced in a clean, actionable view.

- **Traffic sources:** Organic sessions broken down by page, keyword, device, location
- **Top pages:** ranked by organic clicks, with impressions + CTR + avg position
- **Click-through rate analysis:** pages with high impressions but low CTR (fix title/meta)
- **Trend chart:** week-over-week, month-over-month organic session trend
- **New vs. returning:** organic new visitor ratio
- **Goal events:** form submissions, "Book a Call" clicks attributed to organic traffic (requires GA4 integration)

---

**F9 — Content Health Scorer**
*Priority: P1 — Should Have (MVP+)*

Gives every published page a score from 0–100 based on SEO best practices.

**Score components:**
| Factor | Weight | What's checked |
|--------|--------|----------------|
| Meta title quality | 15% | Length, keyword inclusion, uniqueness |
| Meta description quality | 10% | Length, CTA presence, uniqueness |
| Word count | 15% | Meets minimum for content type |
| Schema markup | 15% | Correct schema type present and valid |
| Internal links | 10% | At least 2–3 links to/from other pages |
| Heading structure | 10% | H1 present, H2s used correctly |
| Image alt text | 5% | All images have descriptive alt text |
| Page speed | 10% | Core Web Vitals pass |
| Canonical tag | 5% | Present and correct |
| Readability | 5% | Flesch-Kincaid > 60 |

- **Bulk view:** Table of all pages sorted by score (lowest first = fix queue)
- **Fix suggestions:** Each score issue shows specific fix recommendation
- **Re-score trigger:** Manually re-score a page after edits

---

**F10 — Competitor Content Gap Analysis**
*Priority: P1 — Should Have (MVP+)*

Finds keywords competitors rank for that Elevate Digital does not.

- **Competitor input:** Enter up to 5 competitor domains (Smith.ai, Axe Automation, etc.)
- **Gap report:** Keywords competitor ranks for (top 20) that we don't have a page for
- **Prioritization:** Sort by search volume, difficulty, or estimated traffic potential
- **One-click action:** Select a keyword gap → create content brief → queue for AI draft
- **Data source:** Ahrefs or SEMrush API

---

**F11 — Index Coverage Monitor**
*Priority: P1 — Should Have (MVP+)*

Tracks which pages are indexed by Google and flags issues.

- **Indexed vs. not indexed:** Real-time count with trend
- **Crawl errors:** 404s, redirect chains, blocked by robots.txt
- **Sitemap health:** Last submitted, pages accepted vs. rejected
- **New pages time-to-index:** Average days from publish to Google indexing
- **Quick actions:** Submit individual URL to Google, bulk resubmit sitemap

---

**F12 — Quick Win Opportunities Report**
*Priority: P1 — Should Have (MVP+)*

The highest-ROI feature — surfaces keywords already ranking 4–20 where a small content improvement could push to top 3.

- **Criteria:** Ranking position 4–20, search volume > 50/month, content health score < 70
- **Sorted by:** Estimated traffic gain if moved to top 3
- **Shows:** Current URL ranking, current position, content health score, suggested fix
- **One-click:** "Improve this page" → opens content editor with AI improvement suggestions

---

### 7.3 Technical Architecture

#### System Overview

```
┌─────────────────────────────────────────────────────┐
│              SEO Platform (Admin Dashboard)          │
│  ┌─────────────────┐  ┌──────────────────────────┐  │
│  │  Content Factory │  │    SEO Dashboard          │  │
│  │  - Page generator│  │    - Rankings             │  │
│  │  - Blog drafts   │  │    - Traffic              │  │
│  │  - Calendar      │  │    - Health scores        │  │
│  │  - On-page SEO   │  │    - Opportunities        │  │
│  └────────┬─────────┘  └────────────┬─────────────┘  │
└───────────┼─────────────────────────┼────────────────┘
            │                         │
            ▼                         ▼
    ┌───────────────┐        ┌─────────────────────┐
    │  Elevate       │        │   External APIs      │
    │  Digital       │        │  - Google Search     │
    │  Website       │        │    Console API       │
    │  (React/Vite)  │        │  - Ahrefs/SEMrush    │
    │  + CMS/Store   │        │  - OpenAI/Claude API │
    └───────────────┘        │  - Google Analytics  │
                             │    4 API             │
                             └─────────────────────┘
```

#### Content Storage: MDX Files in Git ✅ Decided

Blog posts and landing pages stored as `.mdx` files in `/content/blog/` and `/content/local/`.
- Git commit = publish trigger → auto-deploys via Vercel
- Simple, zero extra cost, version history built-in
- ~60–90 second publish delay (acceptable for this workflow)
- **Migration note:** Current site has all content hardcoded in JSX/TSX files. Phase 1 includes refactoring blog and landing page content into MDX data files so the content pipeline can plug in without code changes.

#### API Integrations

| Integration | Purpose | API/Tool | Cost | Decision |
|-------------|---------|---------|------|----------|
| Content generation | AI drafts | Claude API (claude-sonnet-4-6) | ~$0.01–0.05/post | ✅ Use Claude |
| Keyword data | Search volume, difficulty | Google Keyword Planner | Free | ✅ Free only |
| Search performance | Clicks, impressions, CTR | Google Search Console API | Free | ✅ Required |
| Traffic analytics | Sessions, goals | Google Analytics 4 API | Free | ✅ Required |
| Rank tracking | Daily rank checks | GSC API (position data) | Free | ✅ GSC only |
| Schema validation | Verify structured data | Google Rich Results API | Free | ✅ Use it |
| OG Images | Auto-generate social images | Vercel OG | Free | ✅ Use it |

> **Note:** No paid SEO tool (Ahrefs/SEMrush/DataForSEO) for now. Keyword research relies entirely on Google Search Console + Google Keyword Planner. Competitor gap analysis (F10) is deferred to Phase 3+ when a paid tool is added.

#### Hosting & Deployment: Vercel ✅ Decided

Site will be deployed to **Vercel** as part of Phase 1 prerequisites (~30 min setup):
1. Create Vercel account → connect GitHub repo
2. Set custom domain
3. Enable auto-deploy on push to `main`

Every content approval (git commit) automatically triggers a Vercel rebuild and deploy. No manual deploy steps needed.

#### Platform Stack (Recommendation)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React + Tailwind (same as main site) | Consistency, reuse components |
| Backend | Node.js + Express or Next.js API routes | Simple REST API |
| Database | PostgreSQL (via Supabase) | Content metadata, keyword tracking, scores |
| Auth | Supabase Auth | Simple, secure, free tier |
| Hosting | Vercel | Auto-deploy on content publish |
| Cron jobs | Vercel Cron or Upstash | Daily rank checks, GSC sync |

---

### 7.4 Assumptions

1. **Domain not yet live** — Vercel deployment is a prerequisite (Phase 0). SEO work cannot have any effect until the site is publicly accessible at a custom domain.
2. **Content hardcoded today** — Current blog posts and case studies live in JSX/TSX files. Phase 0 includes migrating these to MDX/data files before the content pipeline can work.
3. **Free keyword tools are sufficient for MVP** — GSC + Google Keyword Planner will drive keyword decisions for Phases 1–2. Paid tools (Ahrefs/SEMrush) can be added later if gaps become limiting.
4. **Under 1 hour/week review time** — Platform must auto-approve AI drafts scoring ≥ 80 and only surface lower-scoring content for human review. Target content cadence: 1–2 posts/week.
5. **No link building budget** — Rankings will develop more slowly (9–12 months to competitive terms). Free tactics (Google Business Profile, free local directories) run in parallel.
6. **City pages require unique content to avoid thin-content penalty** — Each city × niche page uses AI to generate unique body copy. Pages with > 40% content overlap with another page are blocked from publishing.
7. **Content quality meets Google's helpful content standards** — All AI drafts reviewed by Tal before publish. Auto-approve only applies to high-scoring drafts (≥ 80) on local pages where Tal has signed off on the template quality.

---

## 8. Release Plan

### Phase 0 — Prerequisites (Before Phase 1): Deploy the Site

**Goal:** Get the site live so SEO work has actual effect. Nothing in Phase 1 matters until this is done.

**Deliverables:**
- [ ] Deploy to Vercel: connect GitHub repo, set custom domain, enable HTTPS
- [ ] Remove any `noindex` meta tags from the live build
- [ ] Verify domain in Google Search Console
- [ ] Set up GA4 with goal events (form submissions, "Book a Call" clicks)
- [ ] Migrate hardcoded JSX content (blog posts, case studies) into MDX/data files so the content pipeline can inject new content without code changes

**Success check:** Site live at custom domain, GSC verified, GA4 tracking events

---

### Phase 1 — Foundation (Weeks 1–4): SEO Infrastructure + First 50 Pages

**Goal:** Fix the technical SEO foundation and get 50 local landing pages indexed.

**Deliverables:**
- [ ] robots.txt and sitemap.xml implemented
- [ ] Schema markup on all existing pages (Organization, Service, Article, FAQ)
- [ ] Meta titles + descriptions on all existing pages
- [ ] Canonical tags on all pages
- [ ] Content platform MVP: basic UI, AI draft generation, MDX file output, auto-approve workflow (score ≥ 80 → queue; below → flag)
- [ ] First 50 local landing pages generated and published (10 cities × 5 niches, top 50 SMB-density cities prioritized)
- [ ] Sitemap auto-updates and pings GSC on every publish

**Success check:** 50 pages indexed within 2 weeks of publish, GSC showing data for all pages

---

### Phase 2 — Content Velocity (Weeks 5–10): Blog Engine + Dashboard

**Goal:** Reach 20+ blog posts and launch the SEO dashboard.

**Deliverables:**
- [ ] Blog post generator with content brief builder
- [ ] Content calendar (kanban + calendar view)
- [ ] 20 blog posts published (targeting top keywords per niche)
- [ ] SEO Overview Dashboard (F6) live with GSC data
- [ ] Keyword rank tracker (F7) with 200 keywords seeded
- [ ] Organic traffic analytics view (F8)
- [ ] Remaining 250 local landing pages published (total 300)
- [ ] Internal linking strategy implemented across all content

**Success check:** First keywords appearing in top 20; organic sessions > 500/month

---

### Phase 3 — Optimization Engine (Weeks 11–16): Advanced Intelligence

**Goal:** Accelerate rankings through data-driven optimization.

**Deliverables:**
- [ ] Content Health Scorer (F9) for all published pages
- [ ] Competitor Content Gap Analysis (F10)
- [ ] Quick Win Opportunities Report (F12)
- [ ] Index Coverage Monitor (F11)
- [ ] Keyword clustering and content cluster visualization
- [ ] Automated weekly SEO email digest to Tal
- [ ] OG image auto-generation for all pages
- [ ] Headless CMS migration (if markdown approach proves limiting)

**Success check:** 50+ keywords in top 10; organic sessions > 2,000/month; first inbound leads from organic

---

### Phase 4 — Scale (Month 5–6+): Geographic Expansion + Conversion

**Goal:** Hit 5,000 organic sessions/month and measurable inbound leads.

**Deliverables:**
- [ ] Expand city coverage: 50 → 100+ cities
- [ ] Add new niches: E-commerce, SaaS, Restaurants, Veterinary
- [ ] CRO optimization on top organic landing pages
- [ ] Lead attribution: track which blog/landing page each lead came from
- [ ] Content refresh workflow: auto-detect posts >6 months old, queue for update
- [ ] Backlink opportunity finder (guest post targets, local directories)

---

## Out of Scope (v1)

- **Paid search / PPC** — this platform is organic-only
- **Social media scheduling** — not part of this platform
- **Email marketing** — separate tool (e.g., ConvertKit)
- **Client-facing SEO reports** — this is for internal use only (not a product to sell to clients)
- **Multi-user team collaboration** — v1 is single-user (Tal only)
- **Multilingual content** — English only for US market
- **Link building automation** — manual link building strategy runs in parallel
- **Video SEO** — out of scope for v1

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Google penalizes AI-generated content as spam | Medium | High | Human review gate for all posts; auto-approve only on local pages with approved templates; no keyword stuffing |
| City landing pages treated as thin/duplicate content | High | High | AI generates unique body copy per page; 800+ word minimum; block publish if >40% overlap detected |
| No link building = slow rankings (9–12 months) | High | Medium | **Accepted risk.** Mitigate with free tactics: Google Business Profile, local directory listings, internal link structure |
| Site not live yet delays all SEO progress | High | High | Phase 0 is mandatory before any other work. Vercel deployment is a Day 1 task. |
| Content hardcoded in JSX blocks content pipeline | High | High | Phase 0 MDX migration must complete before content factory can operate. |
| Under 1 hr/week review = quality risk at scale | Medium | High | Auto-approve threshold set to 80+; templates tightly controlled; spot-check 10% of auto-approved pages monthly |
| GSC API rate limits delay dashboard data | Low | Low | Cache GSC data daily; not a real-time dashboard |
| Build time (git-based publish) slows content ops | Low | Low | ~90 second delay is acceptable for 1–2 posts/week cadence |

---

## Open Questions — Resolved ✅

All questions have been answered. Decisions are locked.

| # | Question | Decision |
|---|----------|----------|
| 1 | Content storage approach? | **MDX files in Git** — simple, free, version history built-in |
| 2 | Keyword tool budget? | **Free only** — GSC + Google Keyword Planner. No paid tool for now. |
| 3 | Weekly review time? | **Under 1 hour/week** — platform auto-approves drafts scoring ≥ 80; only flags outliers |
| 4 | City prioritization? | **Top 50 US cities by SMB density** (NYC, LA, Chicago, Houston, Phoenix, Dallas first) |
| 5 | Domain / GSC status? | **Not live yet** — Vercel deployment + GSC verification are Phase 0 prerequisites |
| 6 | Hosting? | **Not deployed yet** — set up Vercel (connect GitHub, custom domain, auto-deploy) in Phase 0 |
| 7 | Link building budget? | **No budget** — content-only strategy; expect 9–12 month runway to competitive rankings |
| 8 | Current content structure? | **All hardcoded in JSX/TSX** — Phase 0 includes migrating to MDX files |

---

*Document owner: Tal Shani | Last updated: March 2026 | Status: Draft v1.0*
