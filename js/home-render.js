/* home-render.js — homepage renderers, extracted from inline <script>
   and loaded with defer so mainthread work never blocks first paint. */
(function () {
'use strict';
// -- HOME HERO (artwork + latest-episode CTA) --
(function initHomeHero() {
  const ep = episodes.find(e => e.featured) || episodes[0];
  if (!ep) return;

  const img = document.getElementById('heroArtworkImg');
  if (img) {
    const thumb = getYouTubeThumb(ep.youtubeId, 'hqdefault');
    if (thumb) img.src = thumb;
    img.alt = `${ep.title} — Hot & Juicy Podcast latest episode artwork`;
    img.onerror = function () {
      this.src = 'images/Logo.jpg';
      this.onerror = null;
    };
  }

  const heroCta = document.getElementById('heroCta');
  if (heroCta) {
    heroCta.href = episodeUrl(ep);
    heroCta.setAttribute('aria-label', `Listen to latest episode: ${ep.title}`);
  }

  const stickyLink = document.getElementById('stickyCtaLink');
  if (stickyLink) stickyLink.href = episodeUrl(ep);
})();

// -- FEATURED EPISODE --
(function renderFeatured() {
  const ep = episodes.find(e => e.featured) || episodes[0];
  const el = document.getElementById('featuredEpisode');
  if (!ep || !el) return;
  el.innerHTML = `
    <div class="video-wrap">
      ${ep.youtubeId
        ? `<iframe src="https://www.youtube-nocookie.com/embed/${ep.youtubeId}?rel=0${/^https?:$/.test(location.protocol) ? `&enablejsapi=1&origin=${encodeURIComponent(location.origin)}` : ``}" title="${ep.title}" loading="lazy" credentialless allowfullscreen referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"></iframe>`
        : `<div style="width:100%;aspect-ratio:16/9;background:var(--c-bg-3);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:3rem;">🎬</div>`}
    </div>
    <div>
      <span class="eyebrow">Episode ${ep.number}</span>
      <h3 style="font-size:clamp(1.3rem,2.2vw,var(--fs-2xl));margin-bottom:var(--sp-3);">${ep.title}</h3>
      <p style="margin-bottom:var(--sp-4);">${ep.description}</p>
      <div class="flex gap-2 flex-wrap">
        <a href="${episodeUrl(ep)}" class="btn btn--primary">Watch Full Episode</a>
        <a href="${ep.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--outline">🎧 Spotify</a>
      </div>
    </div>`;
})();

// -- STATS GRID --
(function renderStats() {
  const el = document.getElementById('statsGrid');
  if (!el) return;
  stats.forEach(s => {
    el.innerHTML += `
      <div class="stat-card">
        <div class="stat-card__value">${s.value}</div>
        <div class="stat-card__label">${s.label}</div>
      </div>`;
  });
})();

// -- TRENDING EPISODES --
(function renderTrending() {
  const el = document.getElementById('trendingEpisodes');
  if (!el) return;
  const trending = episodes.filter(e => e.trending);
  const list = trending.length ? trending : episodes.slice(-3);
  list.slice(0, 3).forEach(ep => {
    const ytThumb = getYouTubeThumb(ep.youtubeId, 'hqdefault');
    el.innerHTML += `
      <a href="${episodeUrl(ep)}" class="card ep-card">
        <div class="ep-card__thumb">
          ${ytThumb ? `<img src="${ytThumb}" alt="${ep.title}" loading="lazy" width="480" height="270" decoding="async">` : `<div class="ep-card__thumb-placeholder">🎧</div>`}
          <div class="ep-card__overlay"><div class="ep-card__play">?</div></div>
        </div>
        <div class="ep-card__body">
          <div class="ep-card__meta"><span class="ep-card__tag">${(ep.tags||[])[0]}</span><span>${ep.duration}</span></div>
          <div class="ep-card__title">${ep.title}</div>
          <p class="ep-card__desc">${ep.description}</p>
        </div>
        <div class="ep-card__footer">
          <span class="ep-card__cta">Listen Now ?</span>
        </div>
      </a>`;
  });
})();

// -- HOSTS --
(function renderHosts() {
  const el = document.getElementById('hostsGrid');
  if (!el) return;
  hosts.forEach(h => {
    const socIcons = {instagram:'📸',tiktok:'🎵',youtube:'▶️',x:'𝕏'};
    const socLinks = Object.entries(h.socials).map(([k,v]) =>
      `<a href="${v}" target="_blank" rel="noopener noreferrer" aria-label="${socIcons[k]||'🔗'} ${k}">${socIcons[k]||'🔗'}</a>`
    ).join('');
    el.innerHTML += `
      <div class="host-card">
        <div class="host-card__avatar">${h.image ? `<img src="images/${h.image}" alt="${h.name}" width="1587" height="2245" decoding="async" loading="lazy">` : h.name[0]}</div>
        <div class="host-card__name">${h.name}</div>
        <div class="host-card__title">${h.title}</div>
        <p class="host-card__bio">${h.bio}</p>
        <div class="host-card__socials">${socLinks}</div>
      </div>`;
  });
})();

// -- BLOG PREVIEW --
(function renderBlogPreview() {
  const el = document.getElementById('blogPreview');
  if (!el) return;
  blogPosts.slice(0, 2).forEach(post => {
    el.innerHTML += `
      <a href="blog/${post.id}" class="card blog-card">
        <div class="blog-card__thumb">
          ${post.image
            ? `<img src="images/${post.image}" alt="${post.title}" loading="lazy" width="1200" height="630" decoding="async">`
            : `<div style="height:100%;background:var(--c-bg-3);display:flex;align-items:center;justify-content:center;font-size:2.5rem;min-height:180px;">🖼️</div>`}
        </div>
        <div class="blog-card__body">
          <div class="blog-card__category">${post.category}</div>
          <div class="blog-card__title">${post.title}</div>
          <p class="blog-card__excerpt">${post.excerpt}</p>
        </div>
        <div class="blog-card__footer">
          <span>${post.author}</span>
          <span>${new Date(post.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span>
        </div>
      </a>`;
  });
})();
})();
