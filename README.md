# Hot & Juicy Podcast — Website

A world-class podcast and media platform. Pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no backend.

**Live URL:** https://hotandjuicypodcast.com  
**Deployment:** Vercel  
**Stack:** HTML · CSS · Vanilla JS

---

## File Structure

```
/
├── index.html                  ← Homepage
├── about.html                  ← About + host profiles
├── contact.html                ← Contact form (EmailJS)
├── community.html              ← Events, stories, audience
├── sponsors.html               ← Sponsor packages + inquiry form
├── press-kit.html              ← Press resources + brand assets
├── privacy-policy.html         ← Privacy policy
├── terms-of-service.html       ← Terms of service
├── 404.html                    ← Error page
│
├── episodes/
│   ├── index.html              ← Episode archive (search + filter)
│   └── episode-template.html  ← Single episode page (dynamic)
│
├── blog/
│   ├── index.html              ← Blog archive (category filter)
│   └── post-template.html     ← Single blog post (dynamic)
│
├── css/
│   └── style.css               ← All styles + design tokens
│
├── js/
│   ├── data.js                 ← ALL content data (edit this file)
│   └── main.js                 ← All shared JavaScript
│
├── images/                     ← All images go here
├── media-kit.pdf               ← Upload your media kit PDF here
│
├── vercel.json                 ← Vercel routing + security headers
├── sitemap.xml                 ← Main sitemap (update when adding pages)
├── podcast-sitemap.xml         ← Episode sitemap (update per episode)
├── robots.txt                  ← Search engine crawl rules
└── manifest.json               ← PWA configuration
```

---

## Local Development

```bash
# Option 1 — Python (any machine)
python -m http.server 5500

# Option 2 — VS Code Live Server
# Right-click index.html → Open with Live Server
```

Visit: `http://localhost:5500`

---

## 1. How to Add a New Episode

Open `js/data.js` and add a new object to the **top** of the `episodes` array:

```js
{
  id:          "ep-004",                        // Unique ID — never change after publishing
  number:      4,                               // Episode number
  type:        "full",                          // "full" or "short"
  title:       "Your Episode Title",
  slug:        "your-episode-slug",             // URL-safe, lowercase, hyphens only
  youtubeId:   "PASTE_YOUTUBE_ID_HERE",         // From youtube.com/watch?v=THIS_PART
  spotifyUrl:  "https://open.spotify.com/...",  // Direct episode link
  appleUrl:    "https://podcasts.apple.com/...",
  description: "2-3 sentence episode summary shown on cards.",
  showNotes:   "Detailed notes, timestamps, and links for the episode page.",
  transcript:  "",                              // Paste full transcript here (improves SEO)
  topics:      ["Topic one", "Topic two", "Topic three"],
  tags:        ["tag1", "tag2"],
  duration:    "55 min",
  publishedAt: "2025-07-01",                    // YYYY-MM-DD format
  featured:    false,                           // Set true for ONE episode (homepage feature)
  trending:    false,                           // Set true to appear in Trending section
  thumbnail:   "ep-004.jpg"                     // Place image in /images/
},
```

Then update `sitemap.xml` and `podcast-sitemap.xml` by adding a `<url>` block for the new episode.

**That's it.** The episode automatically appears on the homepage, episodes archive, and has its own page at:  
`/episodes/episode-template?id=ep-004`

---

## 2. How to Add a Transcript

In `js/data.js`, find the episode and paste the transcript into the `transcript` field:

```js
transcript: `[00:00] Mapettco: Welcome to Hot & Juicy...
[02:30] Kabua: Today we're talking about...
[05:00] Keithalfred01: I think the real question is...`,
```

Transcripts are critical for SEO — Google indexes every word, meaning episode content surfaces in search results for every topic mentioned.

---

## 3. How to Add a Blog Post

Open `js/data.js` and add a new object to the **top** of the `blogPosts` array:

```js
{
  id:          "post-003",
  title:       "Your Article Title",
  slug:        "your-article-slug",
  category:    "Diaspora Life",   // Options: Kenyan Culture, Diaspora Life, Business,
                                  // Relationships, Doha Life, Community Stories
  author:      "Hot & Juicy Team",
  excerpt:     "One or two sentence summary shown on cards.",
  image:       "blog-003.jpg",    // Place in /images/
  publishedAt: "2025-07-05",
  body: `
    <p>Your article content here. Use standard HTML tags.</p>
    <h2>Section Heading</h2>
    <p>More content...</p>
    <blockquote><p>A pull quote.</p></blockquote>
    <ul><li>List item</li></ul>
  `,
  relatedEpisode: "ep-003",       // Optional: links to a related episode on the post page
  featured:    false              // Set true for ONE post (featured on blog homepage)
},
```

The post automatically appears at: `/blog/post-template?id=post-003`

---

## 4. How to Update Homepage Featured Content

**Featured episode** (the large video section):  
In `js/data.js`, set `featured: true` on the episode you want featured. Set all others to `false`.

**Trending episodes** (the second episode grid):  
Set `trending: true` on up to 3 episodes.

**Latest episodes** are always auto-populated from the top 3 in the `episodes` array — newest first.

**Featured blog post** (the large card on the blog index):  
Set `featured: true` on one blog post in `blogPosts`.

---

## 5. How to Update Sponsor Information

All sponsor package copy is in `sponsors.html`. Edit the package cards directly in that file — they are clearly labelled with HTML comments.

To update the **media kit PDF**, upload a new file to the root as `media-kit.pdf`. All download links across the site point to this file.

Forms use EmailJS (configured in `js/data.js`). No Formspree setup needed.

---

## 6. How to Deploy via GitHub and Vercel

### First-time setup

1. Create a GitHub account at github.com if you don't have one
2. Create a new repository called `hotandjuicy-website`
3. Upload all files to the repository
4. Go to vercel.com and sign up with your GitHub account
5. Click **Add New Project** → Import your GitHub repository
6. Vercel auto-detects static HTML — click **Deploy**
7. Your site is live at a `vercel.app` URL
8. Add your custom domain in **Project Settings → Domains**

### Deploying updates

Every time you push changes to GitHub, Vercel automatically redeploys:

```bash
# If using Git on your computer:
git add .
git commit -m "Add Episode 4: Your Episode Title"
git push

# Vercel deploys automatically within ~30 seconds
```

Or: drag and drop updated files directly into the GitHub repository UI in your browser — no terminal needed.

---

## Placeholder Checklist — Complete Before Launch

### Blockers (must fix before going live)
- [ ] Replace all `REPLACE_WITH_YOUTUBE_ID` in `js/data.js` with real YouTube video IDs
- [x] Forms use EmailJS (configured in `js/data.js`)
- [ ] Replace Beehiiv placeholder blocks in `index.html`, `episodes/index.html`, `blog/index.html`, and `episodes/episode-template.html` with your real Beehiiv embed code
- [ ] Update Spotify episode URLs in `js/data.js` (`spotifyUrl` fields)
- [ ] Update Apple Podcasts episode URLs in `js/data.js` (`appleUrl` fields)

### Important (complete within 48 hours of launch)
- [ ] Add episode thumbnail images to `/images/` — `ep-001.jpg`, `ep-002.jpg`, `ep-003.jpg`
- [ ] Add host photos to `/images/` — `host-mapett.jpg`, `host-kabua.jpg`, `host-keith.jpg`
- [x] Add OG image: `/images/og-default.jpg` exists
- [ ] Add PWA icons: `/images/icon-192.png` and `/images/icon-512.png`
- [ ] Upload `media-kit.pdf` to root directory
- [ ] Update `sitemap.xml` `<lastmod>` dates
- [ ] Submit sitemap to Google Search Console after deployment

### Nice to have (first week)
- [ ] Add `favicon.ico` or `favicon.svg` to root
- [ ] Add episode transcripts to `js/data.js` for SEO
- [ ] Connect Google Analytics or Plausible Analytics
- [ ] Write and publish first real blog post

---

## Design Tokens (css/style.css)

| Token | Value | Usage |
|---|---|---|
| `--c-bg` | `#111111` | Page background |
| `--c-amber` | `#F5A623` | Primary accent, labels, CTAs |
| `--c-coral` | `#E8412A` | Hero CTAs, subscribe buttons |
| `--c-cream` | `#F9F5EF` | Body text, light sections |
| `--f-display` | `Syne` | Headings, labels, buttons |
| `--f-body` | `Inter` | Body text, forms |

---

## Contact

For website support: hotandjuicy24@gmail.com  
WhatsApp: https://wa.me/97433955120
