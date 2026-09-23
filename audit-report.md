# Website Audit Report — Hot & Juicy Podcast (post-rebrand)

**Date:** 2026-09-23 · **Scope:** full codebase in `C:\Users\ALBO\OneDrive\Desktop\HotandJuicy` (working tree incl. uncommitted rebrand + hero2 changes) · **Live site:** https://hotandjuicypodcast.com
**Method:** static code scans (links, metadata, references), live HTTP validation of every external URL and YouTube ID, browser-based layout sweeps at 360/428/768/1920px on a local server, WCAG contrast computation, CSS/JS weight analysis.

---

## 1. Executive Summary

Overall health is **good-to-moderate**. The rebrand (new palette `#F6A00F`/`#FF1016`, hero2 banner, new logo assets) is consistently applied, all social/YouTube links are secure and live, and SEO basics (titles, descriptions, sitemap, robots, canonicals, JSON-LD, alt text, single-h1) are largely in place.

**Top urgent fixes:**

1. **HIGH — Sponsors page scrolls horizontally at every viewport width** (360px → 1920px+). The 3-package pricing grid overflows its container by 118–501px. This is the money page for advertisers.
2. **HIGH — Contact page unusable-wide overflow on mobile** (386px at 360w): the "ways to reach us" card grid has a fixed-width column that never collapses.
3. **HIGH — Apple Podcasts CTA is a dead placeholder** (`id123456789` on `index.html`). Every tap 404s the brand's biggest subscribe path after YouTube/Spotify.
4. **MEDIUM — 40+ literal `?` glyphs render on the live site** (sponsors pricing lists, YouTube icon links in community/contact footers, index/live/episode-template). These are emoji destroyed by the historical encoding corruption; the earlier fix passes missed the `>?</span>` pattern.
5. **MEDIUM — `live.html` duplicates the homepage's exact title/description/canonical** → Google sees duplicate content and may canonical the wrong page.

---

## 2. Findings by Section

### Section 1 — Responsive & Touch Behavior

| Sev | Location | Issue | Recommended fix |
|---|---|---|---|
| High | `sponsors.html` (~L196–215 pricing grid) | Horizontal overflow at **all** widths: package card `<div>` reaches 531px fixed track; 501px overflow at 360w, still 118px at 1920w | Make the packages grid `grid-template-columns: repeat(auto-fit, minmax(min(100%,340px),1fr))` or stack below 1024px |
| High | `contact.html` (~L183–212 aside grid) | "Email/WhatsApp/Be a Guest" aside keeps a 360px fixed column on mobile → 386px overflow at 360w | Collapse to single column under 600px (`grid-template-columns: 1fr`) |
| Medium | `episodes/index.html` L137 | CTA `▶️ Subscribe on YouTube — Free` is `white-space: nowrap`, 376px wide → 16px overflow at 360w | Allow wrap or shorten label on small screens |
| Medium | `.platform-pill` (css/style.css L834), `.nav__toggle` (L348) | Touch targets ≈34–36px and ≈30px tall — below the 44×44px minimum. Footer social icon links (emoji-sized) likewise | Add `min-height:44px` + vertical centering to pills/toggle; give footer icons `padding:0.6rem` |
| Medium | `js/main.js` L17–31 | Mobile menu closes on outside-tap but **not** on in-panel link tap — anchor links (`#featured`, `#contact-form`) leave the menu open over the page | Add `mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', close))` |
| Low | `css/style.css` (0 hits for `safe-area-inset`) | Sticky bottom CTA bar has no iOS safe-area padding; can sit under the home-indicator on iPhone | `padding-bottom: calc(8px + env(safe-area-inset-bottom))` on `.sticky-cta` |
| Low | `css/style.css` L713+ | Old `.hero` background (`hero-bg.jpg`, 60KB) now dead CSS after hero2 migration (~52 stale selector references ≈ 4–6KB) | Delete the old hero block in a follow-up cleanup commit |
| Pass | Breakpoints 768/1024/1280/1440/1920 | No overflow or overlap found on index, episodes index, blog index, live at these widths | — |
| Pass | `hero2` | Single-row layout scales via `clamp()` at 360–1920px, never restacks; titles wrap safely (`--fit`/`--wrap` variants) | — |

### Section 2 — Social Media & External Links

| Sev | Location | Issue | Recommended fix |
|---|---|---|---|
| High | `index.html` (Apple Podcasts CTA) | `podcasts.apple.com/podcast/hot-juicy-podcast/id123456789` — placeholder ID, resolves to nothing | Replace with the real show ID (candidate found in Apple's catalog: `id1768033282` "Hot and juicy podcast" — **verify ownership before shipping**) |
| Low | `wa.me/97433955120` (9 pages) | Number format is valid Qatari (+974 8-digit) but ownership unverified | Confirm it rings the team's business WhatsApp |
| Pass | Instagram ×21, TikTok ×31, YouTube channel ×16, Spotify ×50 | All resolve live, correct handle `@hotandjuicypodcast` | — |
| Pass | All 91 external `<a>` | Every one has `target="_blank"` **and** `rel="noopener"` | Consider adding `noreferrer` as belt-and-braces |
| Pass | `mailto:hotandjuicy24@gmail.com` ×8 | Valid, consistent | — |
| Pass | Anchor links | All in-page `#` anchors resolve to existing ids (incl. new hero2 pages) | — |

### Section 3 — YouTube Integration

| Sev | Location | Issue | Recommended fix |
|---|---|---|---|
| Medium | `js/data.js` — ep-015 "SEND ME ANONYMOUS MESSAGES", ep-002, ep-001 | `youtubeId: ""` → cards render 🎧 placeholder, embed shows fallback panel (ep-015 is the **newest** episode) | Backfill the 3 missing IDs from the channel |
| Pass | 12 video IDs (17uCk6-19Bw … o0nvshL0_7c) | All validated live via YouTube oEmbed — every title is genuine Hot & Juicy content, no old-brand/placeholder IDs | — |
| Pass | `js/main.js` embed builder | 16:9 `aspect-ratio` wrapper, `youtube-nocookie`-style embed pattern, thumbnail lazy-load → click-to-play (good CWV pattern) | — |
| Pass | Subscribe CTAs ×11 | All point to `@hotandjuicypodcast` (live channel) | — |
| Pass | `index.html`/`live.html` L24–25 | Bare `https://www.youtube.com` hrefs are `dns-prefetch`/`preconnect` hints only, not links | — |

### Section 4 — SEO & Google Indexing

| Sev | Location | Issue | Recommended fix |
|---|---|---|---|
| High | `live.html` `<head>` | Identical title, description **and canonical `https://hotandjuicypodcast.com/`** as index.html — duplicate-content signal; Google may drop one | Give live.html its own title/desc and self-canonical (or `noindex` it if it's a variant page) |
| Medium | canonicals vs `sitemap.xml` | Canonicals use `.html` (`/about.html`) while sitemap + internal links use clean URLs (`/about`); blog/episodes canonicals use trailing slash (`/blog/`) vs sitemap `/blog` | Standardize: canonical = sitemap = clean, no trailing slash, no `.html` |
| Medium | `blog/post-template.html`, `episodes/episode-template.html` | Title/desc/og set **only via JS** (`main.js:617/833/619`). Social scrapers (Facebook/Twitter/WhatsApp) and some crawlers never run JS → shared episode links show the generic site card, and crawlers see an empty `<title>` | Emit per-episode static meta via a tiny build step (or Vercel edge function/SSG) — biggest sharing win available |
| Medium | `index.html` meta description | 191 chars — Google truncates ~160 | Trim to "Hot & Juicy is where Mapettco, Kabua, and Keithalfred01 get into the conversations everyone's thinking but nobody's saying. New episodes weekly." (~145) |
| Medium | `sponsors.html` L131–137, L233–238; `community.html` L268; `contact.html` L316; `index.html`, `live.html`, `episodes/episode-template.html` (26+ total) | Literal `?` glyphs visible in content (pricing bullets, YouTube icon links) — looks broken to users *and* to quality raters. **Present in committed/live files, not just working tree** | Replace with ✓/▶ icons (same fix as the earlier emoji restoration, extended to the `>?</span>` pattern) |
| Low | `404.html` | Missing meta description + canonical; indexable error page | Add `<meta name="robots" content="noindex">` and skip canonical |
| Low | `media-kit.html`, `privacy-policy.html`, `terms-of-service.html` | No OG/Twitter tags (media-kit is print-oriented; privacy/terms rarely shared) | Add the standard OG block to media-kit at least |
| Low | favicon set | `favicon.svg` + manifest icons present and rebranded, but **no `apple-touch-icon`** — iOS bookmarks get a screenshot | Add 180×180 PNG apple-touch-icon (can derive from icon-512) |
| Pass | Titles | Unique, correct brand, 29–63 chars on all static pages | — |
| Pass | `robots.txt` / `sitemap.xml` | Not blocking; sitemap referenced; 31 URLs | — |
| Pass | JSON-LD (index PodcastSite + about Organization) | New brand name/logo/URLs, hosts listed | — |
| Pass | Old-brand references | None in content/alt/metadata (email `hotandjuicy24@gmail.com` is the brand address, not legacy) | — |
| Pass | Headings / alt text | Exactly one `<h1>` per page; every `<img>` has alt | — |
| Pass | 301s | `/home → /` permanent redirect present in vercel.json | — |

### Section 5 — Performance & Core Web Vitals

> Lighthouse CLI is not available in this environment — scores below are **proxy measurements** (weights, blocking resources, loading patterns). Run `npx lighthouse https://hotandjuicypodcast.com` for certified numbers.

| Sev | Location | Issue | Recommended fix |
|---|---|---|---|
| Medium | `images/gallery-17.jpg` … `gallery-22.jpg` | 6 images at **1.6–1.9MB each** (~10MB total) | Recompress to WebP ≤400KB (typically 75–85% smaller); add `srcset` |
| Medium | `images/Re-brand-images/` | 5.5MB of source design assets (Logo.pdf, templates) tracked in the repo → deployed to production on every build | Move to a design folder outside the deploy or add to `.vercelignore` |
| Medium | `index.html` L466 (all pages) | EmailJS SDK loaded synchronously on **every** page; only contact/sponsors forms use it | `defer` it, or load conditionally when a form exists |
| Low | Google Fonts CSS | 2 render-blocking font stylesheets (preconnect + `display=swap` already correct) | Acceptable; optionally self-host WOFF2 for a ~100ms LCP win |
| Low | `css/style.css` | 64KB with ~52 stale old-hero references post-hero2 | Prune dead rules in cleanup commit |
| Pass | Hero images | Logo 92KB, lazy/decoding attrs present, width/height on all imgs (no CLS) | — |
| Pass | Caching | `max-age=0, must-revalidate` on CSS/JS; immutable on images; SW network-first for code | — |
| Pass | JS | main.js 36KB + data.js 48KB, both `defer`-safe at end of body, syntax-clean | — |

### Section 6 — Cross-Browser & Accessibility

| Sev | Location | Issue | Recommended fix |
|---|---|---|---|
| Medium | `.btn-primary`, `.hero2-pill` (white on `#FF1016`) | Contrast **3.93:1** — fails WCAG AA for normal text (needs 4.5:1; large-text pass only) | Darken button coral to ~`#E0120F` (≈4.6:1) for button fills, keep `#FF1016` for decorative pill/accents |
| Medium | iOS/Safari | Sticky bottom CTA lacks `env(safe-area-inset-bottom)` (see §1); no other Safari-fragile patterns found (`-webkit-backdrop-filter` present, `svh` used, no date inputs, flex/grid usage is quirk-free) | Safe-area padding only |
| Low | Focus states | `:focus-visible` outlines defined (L1122) — good; verify outline survives the amber hero background (dark outline on dark text possible) | Add `outline-color: var(--c-coral)` inside `.hero2` |
| Pass | Forms | All 5 contact-form fields have `<label>`; success/error states scripted | — |
| Pass | ARIA | Nav toggle has `aria-label` + `aria-expanded`; hero sections have `aria-label` | — |
| Pass | Contrast (rest) | Hero title 8.95:1, desc 6.49:1, muted-on-dark 6.63:1 — all pass AA | — |

---

## 3. "Stand Out" Recommendations

Beyond fixes, these would make the rebranded site measurably more distinctive and conversion-focused:

1. **Per-episode social cards (biggest sharing win).** Episode URLs currently share a generic card. A tiny build script (or Vercel edge function) that stamps each `/episodes/ep-###` with its YouTube thumbnail as `og:image` + title/description would make every WhatsApp/Twitter share look premium — most podcast sites never do this.
2. **PodcastEpisode JSON-LD.** You already emit PodcastSite/Organization. Adding per-episode `PodcastEpisode` schema (name, date, duration, `associatedMedia`) unlocks episode-level rich results in Google — competitors in the Kenyan/diaspora podcast niche almost never have it. The data is already structured in `data.js`; it's a 20-line addition to the template renderer.
3. **Listen-first CTA hierarchy.** Hero CTAs currently lead with YouTube. Consider primary = "Listen on Spotify" (dark pill, brand coral hover), secondary = YouTube, and a persistent mini-player stub in the sticky mobile bar — podcast conversion tracks with one-tap audio.
4. **Social proof strip directly under the hero.** Move the strongest testimonials (currently buried mid-page) into a thin amber-on-dark marquee under hero2: "★★★★★ 'Feels like a call with friends' — Diaspora Listener · 15+ episodes · New every week". Instant credibility above the fold.
5. **Brand-pattern section dividers.** You now own a strong flame/mic mark (`images/logo.svg`, sticker assets in `Re-brand-images/`). A subtle repeating flame-dash divider (SVG, 2-color: amber/coral) between sections would make the rebrand feel intentional site-wide rather than a recolor.
6. **Image pipeline.** WebP/AVIF conversions + `srcset` would cut total image payload ~70% (15.7MB → ~5MB) — directly improves LCP on mobile data plans in your audience's markets.
7. **Micro-interactions, cheap wins:** episode cards lift + coral border on hover (exists on pills — extend), hero pill subtle pulse on load, count-up animation on "15+ episodes", and `prefers-reduced-motion` is already respected — keep honoring it.
8. **Verify + ship the real Apple Podcasts link**, then add `<link rel="alternate" type="application/rss+xml">` feed autodiscovery so browsers offer subscription natively.

---

## 4. Verification Notes

- Live HTTP checks: every social URL, all 12 YouTube IDs (oEmbed), Spotify show, WhatsApp, mailto — performed against production endpoints.
- Layout sweeps executed in Chromium at 360/428/768/1920×900 on local server for 6 key pages; culprit elements isolated via `getBoundingClientRect()` diffs.
- Contrast ratios computed per WCAG 2.1 relative-luminance formula against the extracted brand palette (`#F6A00F`, `#FF1016`, `#111111`, `#FFFFFF`).
- Lighthouse: not runnable here (no CLI/chromium flags in sandbox) — flagged proxy metrics instead; recommend one run before and after the §5 fixes.
