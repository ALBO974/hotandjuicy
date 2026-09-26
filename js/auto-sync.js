/**
 * auto-sync.js — new YouTube uploads appear on the site automatically.
 *
 * Fetches /api/youtube-rss (Vercel function serving the channel feed as
 * JSON), finds videos that are NOT already in js/data.js `episodes`, and:
 *   - on the episodes page: renders them as folder cards at the top of
 *     the grid (badge "New" or the video's own Ep number), linking to
 *     episode-template.html?yt=<videoId>
 *   - on the episode template: ?yt=<videoId> renders the full episode
 *     page (title, date, description, embed) straight from the feed
 *
 * Fails silently when the API isn't available (e.g. plain local preview).
 */
(function () {
  'use strict';

  var API = '/api/youtube-rss';
  var TEMPLATE_PATH = '/episodes/episode-template.html';
  var knownIds = null;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function episodeNumberFromTitle(title) {
    var m = /Ep(?:isode)?[.\s]*(\d{1,3})/i.exec(title || '');
    return m ? parseInt(m[1], 10) : null;
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return ''; }
  }

  /* ── EPISODES PAGE: prepend auto episodes as folder cards ── */
  function renderIntoGrid(videos) {
    var grid = document.getElementById('episodeGrid');
    if (!grid) return;
    var frag = document.createDocumentFragment();
    videos.forEach(function (v) {
      var num = episodeNumberFromTitle(v.title);
      var badge = num ? 'Ep ' + num : 'New';

      var a = document.createElement('a');
      a.className = 'card ep-card';
      a.href = TEMPLATE_PATH + '?yt=' + v.id;

      var thumb = document.createElement('div');
      thumb.className = 'ep-card__thumb';

      var img = document.createElement('img');
      img.src = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
      img.alt = '';
      img.loading = 'lazy';
      img.width = 480;
      img.height = 270;
      img.decoding = 'async';
      // thumbnail fallback chain: hqdefault -> mqdefault -> default -> placeholder
      var step = 0;
      img.onerror = function () {
        step++;
        if (step === 1) img.src = 'https://i.ytimg.com/vi/' + v.id + '/mqdefault.jpg';
        else if (step === 2) img.src = 'https://i.ytimg.com/vi/' + v.id + '/default.jpg';
        else {
          img.style.display = 'none';
          var ph = document.createElement('div');
          ph.className = 'ep-card__thumb-placeholder';
          ph.textContent = '🎙';
          thumb.replaceChildren(ph);
        }
      };
      thumb.appendChild(img);

      var badgeEl = document.createElement('span');
      badgeEl.className = 'ep-card__badge ep-card__badge--new';
      badgeEl.textContent = badge;
      thumb.appendChild(badgeEl);
      a.appendChild(thumb);

      var body = document.createElement('div');
      body.className = 'ep-card__body';
      var meta = document.createElement('span');
      meta.className = 'ep-card__meta';
      meta.textContent = fmtDate(v.published);
      var title = document.createElement('div');
      title.className = 'ep-card__title';
      title.textContent = v.title;
      var excerpt = document.createElement('p');
      excerpt.className = 'ep-card__excerpt';
      excerpt.textContent = (v.description || '').slice(0, 120) + '…';
      body.appendChild(meta); body.appendChild(title); body.appendChild(excerpt);
      a.appendChild(body);

      var foot = document.createElement('div');
      foot.className = 'ep-card__footer';
      foot.innerHTML = '<span>Hot &amp; Juicy Podcast</span><span>Watch on YouTube →</span>';
      a.appendChild(foot);

      frag.appendChild(a);
    });
    grid.insertBefore(frag, grid.firstChild);
  }

  /* ── EPISODE TEMPLATE: main.js replaces the whole #episodePage with a
     not-found panel when the id isn't in data.js — so for ?yt= links we
     rebuild the full episode page ourselves from the feed data ── */
  function renderTemplate(v) {
    var page = document.getElementById('episodePage');
    if (!page) return;
    var num = episodeNumberFromTitle(v.title);
    var badge = num ? 'Ep ' + num : 'New';
    var esc = v.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    var desc = (v.description || 'Fresh from the Hot & Juicy channel.');
    var date = fmtDate(v.published);

    page.innerHTML =
      '<section class="hero2" id="main-content" aria-label="Episode hero">' +
        '<div class="hero2-inner">' +
          '<div class="hero2-art">' +
            '<img src="/images/Logo.jpg" alt="Hot & Juicy Podcast logo" width="500" height="500" loading="eager" decoding="async">' +
          '</div>' +
          '<div class="hero2-copy">' +
            '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/episodes">Home</a><span>›</span><a href="/episodes">Episodes</a><span>›</span><span>' + esc.slice(0, 40) + '</span></nav>' +
            '<span class="hero2-pill">' + badge.toUpperCase() + '</span>' +
            '<div class="video-wrap" style="margin-top:var(--sp-4);">' +
              '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '?rel=0" title="' + esc + '" loading="lazy" credentialless allowfullscreen referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"></iframe>' +
            '</div>' +
            '<h1 class="hero2-title hero2-title--wrap" style="margin-top:var(--sp-4);">' + esc + '</h1>' +
            '<p class="hero2-desc">' + desc.slice(0, 300) + '</p>' +
            '<p class="hero2-kicker">' + date + '</p>' +
            '<div class="cta-row">' +
              '<a href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener noreferrer" class="btn-primary">Watch on YouTube</a>' +
              '<a href="https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV" target="_blank" rel="noopener noreferrer" class="btn btn--outline">Listen on Spotify</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';

    document.title = v.title + ' — Hot & Juicy Podcast';
    setMeta('description', desc.slice(0, 158));
    setMeta('og:title', v.title);
    setMeta('og:description', desc.slice(0, 160));
    setMeta('og:image', 'https://i.ytimg.com/vi/' + v.id + '/maxresdefault.jpg');
    setMeta('og:url', location.origin + location.pathname + '?yt=' + v.id);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', location.origin + location.pathname + '?yt=' + v.id);

    function setMeta(name, content) {
      var el = document.querySelector('meta[name="' + name + '"], meta[property="' + name + '"]');
      if (el) el.setAttribute('content', content);
    }
  }

  function merge(videos) {
    // data.js declares `episodes` as a top-level const in a classic script:
    // reachable as a bare identifier, but NOT as window.episodes
    if (typeof episodes === 'undefined' || !episodes || !episodes.length) return;
    knownIds = knownIds || {};
    episodes.forEach(function (ep) {
      if (ep.youtubeId) knownIds[ep.youtubeId] = true;
    });
    var fresh = videos.filter(function (v) {
      // skip live-stream VODs: their auto-thumbnails are dark "stream ended"
      // frames with no real content — they read as empty cards
      if (/is\s+live/i.test(v.title || '')) return false;
      return v.id && !knownIds[v.id];
    });
    if (!fresh.length) return;

    if (document.getElementById('episodeGrid')) renderIntoGrid(fresh);
    var yt = new URLSearchParams(location.search).get('yt');
    if (yt) {
      var match = fresh.filter(function (v) { return v.id === yt; })[0];
      if (match) renderTemplate(match);
    }
  }

  function init() {
    var ytParam = new URLSearchParams(location.search).get('yt');
    var onEpisodesPage = document.getElementById('episodeGrid');
    var onTemplatePage = location.pathname.indexOf('episode-template') !== -1;
    if (!onEpisodesPage && !onTemplatePage) return;
    fetch(API)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) { merge(data.videos || []); })
      .catch(function () { /* local preview / offline: silently skip */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
