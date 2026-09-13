/* ============================================================
   HOT & JUICY PODCAST — main.js
   Shared JavaScript for all pages
   ============================================================ */

'use strict';

/* ── EMAILJS INIT ────────────────────────────────────────── */
(function initEmailJS() {
  if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
})();

/* ── NAV ─────────────────────────────────────────────────── */
(function initNav() {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobile.classList.toggle('is-open', !isOpen);
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !mobile.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      mobile.classList.remove('is-open');
    }
  });

  // Set active link
  const path = window.location.pathname;
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    a.classList.remove('active');
    const text = a.textContent.trim();
    const isHome = (href === 'index.html' || href === '/') &&
      (path === '/' || path === '/index.html');
    const isSubpageSelf = href === 'index.html' && path !== '/' &&
      ((text === 'Episodes' && path.startsWith('/episodes')) ||
       (text === 'Blog' && path.startsWith('/blog')));
    const cleanHref = href.replace('../', '').replace('./', '');
    const isMatch = path !== '/' && href !== 'index.html' && href !== '/' &&
      href !== '#' && path.includes(cleanHref);
    if (isHome || isMatch || isSubpageSelf) a.classList.add('active');
  });
})();

/* ── FAQ ACCORDION ───────────────────────────────────────── */
(function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ans = document.getElementById(b.getAttribute('aria-controls'));
        if (ans) ans.classList.remove('is-open');
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const ans = document.getElementById(btn.getAttribute('aria-controls'));
        if (ans) ans.classList.add('is-open');
      }
    });
  });
})();

/* ── TRANSCRIPT TOGGLE ───────────────────────────────────── */
(function initTranscript() {
  document.querySelectorAll('.transcript-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      const body = document.getElementById(btn.getAttribute('aria-controls'));
      if (body) body.classList.toggle('is-open', !isOpen);
    });
  });
})();

/* ── FOOTER YEAR ─────────────────────────────────────────── */
(function setYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── FORM VALIDATION ─────────────────────────────────────── */
function validateField(inputId, errorId, testFn) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input || !error) return true;
  const valid = testFn(input.value);
  input.classList.toggle('has-error', !valid);
  error.classList.toggle('is-visible', !valid);
  return valid;
}

// Real-time validation on blur
function initRealTimeValidation(inputId, errorId, testFn) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input || !error) return;
  
  input.addEventListener('blur', () => {
    const valid = testFn(input.value);
    input.classList.toggle('has-error', !valid);
    error.classList.toggle('is-visible', !valid);
  });
  
  // Clear error on input
  input.addEventListener('input', () => {
    if (input.classList.contains('has-error')) {
      const valid = testFn(input.value);
      input.classList.toggle('has-error', !valid);
      error.classList.toggle('is-visible', !valid);
    }
  });
}

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

function validateNotEmpty(val, min = 1) {
  return val.trim().length >= min;
}

/* ── EMAILJS FORM HANDLER ────────────────────────────────── */
function sendViaEmailJS(formEl, templateId, successElId, btnEl) {
  if (typeof emailjs === 'undefined' || typeof EMAILJS_CONFIG === 'undefined') {
    alert('Email service not initialized. Please contact us at hotandjuicy24@gmail.com');
    if (btnEl) { btnEl.textContent = 'Try Again'; btnEl.disabled = false; }
    return;
  }
  emailjs.sendForm(EMAILJS_CONFIG.serviceId, templateId, formEl)
    .then(() => {
      formEl.style.display = 'none';
      const success = document.getElementById(successElId);
      if (success) success.style.display = 'block';
    })
    .catch((err) => {
      if (btnEl) { btnEl.textContent = 'Try Again'; btnEl.disabled = false; }
      console.error('EmailJS error:', err);
      alert('Something went wrong. Please email us at hotandjuicy24@gmail.com');
    });
}

/* ── CONTACT FORM ────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Initialize real-time validation
  initRealTimeValidation('cf-name',    'cf-name-err',    v => validateNotEmpty(v, 2));
  initRealTimeValidation('cf-email',   'cf-email-err',   v => validateEmail(v));
  initRealTimeValidation('cf-type',    'cf-type-err',    v => validateNotEmpty(v));
  initRealTimeValidation('cf-subject', 'cf-subject-err', v => validateNotEmpty(v, 3));
  initRealTimeValidation('cf-message', 'cf-message-err', v => validateNotEmpty(v, 10));

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameOk    = validateField('cf-name',    'cf-name-err',    v => validateNotEmpty(v, 2));
    const emailOk   = validateField('cf-email',   'cf-email-err',   v => validateEmail(v));
    const typeOk    = validateField('cf-type',    'cf-type-err',    v => validateNotEmpty(v));
    const subjectOk = validateField('cf-subject', 'cf-subject-err', v => validateNotEmpty(v, 3));
    const msgOk     = validateField('cf-message', 'cf-message-err', v => validateNotEmpty(v, 10));

    if (!nameOk || !emailOk || !typeOk || !subjectOk || !msgOk) return;

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.classList.add('btn--loading');

    sendViaEmailJS(form, EMAILJS_CONFIG.contactTemplate, 'formSuccess', btn);
  });
})();

/* ── SPONSORS FORM ───────────────────────────────────────── */
(function initSponsorForm() {
  const form = document.getElementById('sponsorForm');
  if (!form) return;

  // Initialize real-time validation
  initRealTimeValidation('sf-name',  'sf-name-err',  v => validateNotEmpty(v, 2));
  initRealTimeValidation('sf-email', 'sf-email-err', v => validateEmail(v));
  initRealTimeValidation('sf-message','sf-message-err', v => validateNotEmpty(v, 10));

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameOk  = validateField('sf-name',  'sf-name-err',  v => validateNotEmpty(v, 2));
    const emailOk = validateField('sf-email', 'sf-email-err', v => validateEmail(v));
    const msgOk   = validateField('sf-message','sf-message-err', v => validateNotEmpty(v, 10));

    if (!nameOk || !emailOk || !msgOk) return;

    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.classList.add('btn--loading');

    sendViaEmailJS(form, EMAILJS_CONFIG.sponsorTemplate, 'sponsorSuccess', btn);
  });
})();

/* ── NEWSLETTER FORMS ────────────────────────────────────── */
(function initNewsletter() {
  document.querySelectorAll('[data-nl-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput || !validateEmail(emailInput.value)) {
        if (emailInput) emailInput.classList.add('has-error');
        return;
      }
      const btn = form.querySelector('button');
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

      if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
        emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.nlTemplate, form)
          .then(() => {
            if (btn) { btn.textContent = '✓ You\'re in!'; }
            emailInput.value = '';
            emailInput.placeholder = 'Check your inbox!';
          })
          .catch((err) => {
            if (btn) { btn.textContent = 'Try Again'; btn.disabled = false; }
            console.error('EmailJS newsletter error:', err);
          });
      } else {
        setTimeout(() => {
          if (btn) { btn.textContent = '✓ You\'re in!'; btn.disabled = true; }
          emailInput.value = '';
          emailInput.placeholder = 'Check your inbox!';
        }, 500);
      }
    });
  });

  // Footer standalone newsletter inputs
  document.querySelectorAll('.footer__nl').forEach(wrapper => {
    const btn = wrapper.querySelector('button');
    const input = wrapper.querySelector('input[type="email"]');
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      if (!validateEmail(input.value)) {
        input.classList.add('has-error');
        return;
      }
      btn.textContent = 'Sending…';
      btn.disabled = true;

      if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.nlTemplate, {
          email: input.value,
          name: input.value,
          message: 'Newsletter subscription'
        })
        .then(() => {
          btn.textContent = '✓ You\'re in!';
          input.value = '';
          input.placeholder = 'Check your inbox!';
        })
        .catch((err) => {
          btn.textContent = 'Try Again';
          btn.disabled = false;
          console.error('EmailJS footer newsletter error:', err);
        });
      } else {
        btn.textContent = '✓ Sent!';
        btn.disabled = true;
        input.value = '';
        input.placeholder = 'Check your inbox!';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
          input.placeholder = 'Your email';
        }, 3000);
      }
    });
  });
})();

/* ── GALLERY LIGHTBOX (community.html) ──────────────────── */
(function initGallery() {
  let lb = null;
  let lbIdx = 0;
  let lbImgs = [];

  function renderLightbox() {
    if (!lb) return;
    const img = lb.querySelector('.lightbox__img');
    const counter = lb.querySelector('.lightbox__counter');
    if (img) img.src = lbImgs[lbIdx];
    if (counter) counter.textContent = `${lbIdx + 1} / ${lbImgs.length}`;
  }

  function openLightbox(index, images) {
    lbIdx = index;
    lbImgs = images;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox__prev" aria-label="Previous image">&#8249;</button>
      <img class="lightbox__img" src="${images[index]}" alt="Gallery image">
      <button class="lightbox__next" aria-label="Next image">&#8250;</button>
      <div class="lightbox__counter">${index + 1} / ${images.length}</div>
    `;
    document.body.appendChild(lb);

    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__prev').addEventListener('click', function () {
      if (lbIdx > 0) { lbIdx--; renderLightbox(); }
    });
    lb.querySelector('.lightbox__next').addEventListener('click', function () {
      if (lbIdx < lbImgs.length - 1) { lbIdx++; renderLightbox(); }
    });

    /* swipe support */
    let touchStartX = 0;
    lb.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) < 50) return;
      if (dx > 0 && lbIdx > 0) { lbIdx--; renderLightbox(); }
      if (dx < 0 && lbIdx < lbImgs.length - 1) { lbIdx++; renderLightbox(); }
    }, { passive: true });

    document.addEventListener('keydown', lbKeydown);
  }

  function closeLightbox() {
    if (lb) { lb.remove(); lb = null; }
    document.removeEventListener('keydown', lbKeydown);
  }

  function lbKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lbIdx > 0) { lbIdx--; renderLightbox(); }
    if (e.key === 'ArrowRight' && lbIdx < lbImgs.length - 1) { lbIdx++; renderLightbox(); }
  }

  document.addEventListener('click', function (e) {
    const item = e.target.closest('[data-gallery-img]');
    if (!item) return;
    const src = item.getAttribute('data-gallery-img');
    const all = Array.from(document.querySelectorAll('[data-gallery-img]'));
    const idx = all.findIndex(el => el.getAttribute('data-gallery-img') === src);
    const urls = all.map(el => el.getAttribute('data-gallery-img'));
    openLightbox(idx, urls);
  });
})();

/* ── SHARE BUTTONS ───────────────────────────────────────── */
(function initShareButtons() {
  document.addEventListener('click', function (e) {
    const wa = e.target.closest('[data-share-whatsapp]');
    if (wa) {
      e.preventDefault();
      const text = wa.getAttribute('data-share-text') || document.title;
      const url  = wa.getAttribute('data-share-url') || window.location.href;
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank', 'noopener');
      return;
    }
    const tw = e.target.closest('[data-share-twitter]');
    if (tw) {
      e.preventDefault();
      const text = tw.getAttribute('data-share-text') || document.title;
      const url  = tw.getAttribute('data-share-url') || window.location.href;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener');
      return;
    }
    const cl = e.target.closest('[data-copy-link]');
    if (cl) {
      e.preventDefault();
      const url = cl.getAttribute('data-share-url') || window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        const orig = cl.textContent;
        cl.textContent = '✅ Copied!';
        setTimeout(() => cl.textContent = orig, 2000);
      });
    }
  });
})();

/* ── IMAGE ERROR HANDLER ─────────────────────────────────── */
function handleImageError(img, fallback) {
  img.onerror = function() {
    this.parentElement.innerHTML = fallback;
  };
}

/* ── EPISODE FILTER + SEARCH (episodes/index.html) ───────── */
(function initEpisodeFilter() {
  const grid      = document.getElementById('episodeGrid');
  const countEl   = document.getElementById('episodeCount');
  const noResults = document.getElementById('noResults');
  const loadMore  = document.getElementById('loadMoreBtn');
  const searchEl  = document.getElementById('epSearch');
  const tabs      = document.querySelectorAll('[data-filter-tab]');
  if (!grid || typeof episodes === 'undefined') return;

  let activeFilter = 'all';
  let searchQuery  = '';
  let visibleCount = 9;
  const PAGE = 9;

  function getFiltered() {
    return episodes.filter(ep => {
      const matchType = activeFilter === 'all' ||
        (activeFilter === 'shorts' ? ep.type === 'short' : ep.type !== 'short');
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        ep.title.toLowerCase().includes(q) ||
        ep.description.toLowerCase().includes(q) ||
        (ep.tags || []).some(t => t.toLowerCase().includes(q));
      return matchType && matchSearch;
    });
  }

  function renderCards(list) {
    return list.map(ep => {
      const thumbSrc = getYouTubeThumb(ep.youtubeId) || '';
      const thumbHtml = thumbSrc
        ? `<img src="${thumbSrc}" alt="${ep.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'ep-card__thumb-placeholder\\'>🎙</div>'">`
        : `<div class="ep-card__thumb-placeholder">🎙</div>`;
      return `
      <a href="${episodeUrl(ep)}" class="card ep-card">
        <div class="ep-card__thumb">
          ${thumbHtml}
          <div class="ep-card__overlay"><div class="ep-card__play">▶</div></div>
          <span class="ep-card__badge${ep.type==='short'?' ep-card__badge--short':''}">${ep.type==='short'?'Short':'Ep '+ep.number}</span>
        </div>
        <div class="ep-card__body">
          <div class="ep-card__meta">
            <span class="ep-card__tag">${(ep.tags||[])[0]||'podcast'}</span>
            <span>${ep.duration||''}</span>
          </div>
          <div class="ep-card__title">${ep.title}</div>
          <p class="ep-card__desc">${ep.description}</p>
        </div>
        <div class="ep-card__footer">
          <span class="ep-card__cta">Listen Now →</span>
          <span class="text-xs text-muted">${formatDate(ep.publishedAt)}</span>
        </div>
      </a>`;
    }).join('');
  }

  function render() {
    const filtered = getFiltered();
    const visible  = filtered.slice(0, visibleCount);
    if (countEl) countEl.textContent = `${filtered.length} episode${filtered.length !== 1 ? 's' : ''}`;
    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      if (loadMore)  loadMore.style.display  = 'none';
      return;
    }
    if (noResults) noResults.style.display = 'none';
    grid.innerHTML = renderCards(visible);
    if (loadMore) loadMore.style.display = filtered.length > visibleCount ? 'flex' : 'none';
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeFilter = tab.dataset.filterTab;
      visibleCount = PAGE;
      render();
    });
  });

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      searchQuery  = searchEl.value;
      visibleCount = PAGE;
      render();
    });
  }

  if (loadMore) {
    loadMore.addEventListener('click', () => {
      visibleCount += PAGE;
      render();
    });
  }

  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchEl) searchEl.value = '';
      searchQuery = '';
      tabs.forEach((t, i) => t.classList.toggle('is-active', i === 0));
      activeFilter = 'all';
      visibleCount = PAGE;
      render();
    });
  }

  render();
})();

/* ── BLOG FILTER + SEARCH (blog/index.html) ──────────────── */
(function initBlogFilter() {
  const grid    = document.getElementById('blogGrid');
  const searchEl = document.getElementById('blogSearch');
  const tabs    = document.querySelectorAll('[data-blog-tab]');
  if (!grid || typeof blogPosts === 'undefined') return;

  let activeCategory = 'all';
  let searchQuery    = '';

  function getFiltered() {
    return blogPosts.filter(post => {
      const matchCat = activeCategory === 'all' || post.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }

  function renderBlogCards(list) {
    return list.map(post => `
      <a href="${blogPostUrl(post)}" class="card blog-card">
        <div class="blog-card__thumb">
          ${post.image
            ? `<img src="images/${post.image}" alt="${post.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'height:100%;background:var(--c-bg-3);display:flex;align-items:center;justify-content:center;font-size:2.5rem;min-height:180px;\\'>✍️</div>'">`
            : `<div style="height:100%;background:var(--c-bg-3);display:flex;align-items:center;justify-content:center;font-size:2.5rem;min-height:180px;">✍️</div>`}
        </div>
        <div class="blog-card__body">
          <div class="blog-card__category">${post.category}</div>
          <div class="blog-card__title">${post.title}</div>
          <p class="blog-card__excerpt">${post.excerpt}</p>
        </div>
        <div class="blog-card__footer">
          <span>${post.author}</span>
          <span>${formatDate(post.publishedAt)}</span>
        </div>
      </a>`).join('');
  }

  function render() {
    const filtered = getFiltered();
    grid.innerHTML = filtered.length
      ? renderBlogCards(filtered)
      : `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--c-muted);">No posts found for this filter.</div>`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeCategory = tab.dataset.blogTab;
      render();
    });
  });

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      searchQuery = searchEl.value;
      render();
    });
  }

  render();
})();

/* ── UTILS ───────────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

/* ── EPISODE PAGE LOADER ─────────────────────────────────── */
(function initEpisodePage() {
  const page = document.getElementById('episodePage');
  if (!page || typeof episodes === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  // Also check clean URL path: /episodes/ep-015
  if (!id) {
    const match = window.location.pathname.match(/\/episodes\/(ep-\d+)/);
    if (match) id = match[1];
  }
  const ep = id ? episodes.find(e => e.id === id) : null;

  if (!ep) {
    page.innerHTML = `
      <div style="text-align:center;padding:80px 24px;">
        <div style="font-size:3rem;margin-bottom:16px;">🔍</div>
        <h2>Episode not found</h2>
        <p style="margin:12px 0 28px;">This episode may have moved or the link is incorrect.</p>
        <a href="/episodes" class="btn btn--primary">Browse All Episodes</a>
      </div>`;
    return;
  }

  document.title = `${ep.title} — Hot & Juicy Podcast`;
  setMeta('description', ep.description);
  setMeta('og:title', `${ep.title} — Hot & Juicy Podcast`);
  setMeta('og:description', ep.description);
  setMeta('og:url', window.location.href);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', window.location.href);

  if (ep.youtubeId) {
    setMeta('og:image', `https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`);
  }

  const bc = document.getElementById('ep-breadcrumb');
  if (bc) bc.textContent = ep.title;

  const embedEl = document.getElementById('ep-embed');
  if (embedEl && ep.youtubeId) {
    embedEl.innerHTML = `<iframe src="https://www.youtube.com/embed/${ep.youtubeId}" title="${ep.title}" loading="lazy" allowfullscreen allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"></iframe>`;
  }

  const tagsEl = document.getElementById('ep-tags');
  if (tagsEl && ep.tags) {
    tagsEl.innerHTML = ep.tags.map(t => `<span class="tag">${t}</span>`).join('');
  }

  const fields = {
    'ep-number':   ep.number ? `Episode ${ep.number}` : '',
    'ep-title':    ep.title,
    'ep-date':     formatDate(ep.publishedAt),
    'ep-duration': ep.duration || '',
    'ep-desc':     ep.description,
    'ep-notes':    ep.showNotes || '',
  };
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  const topicsEl = document.getElementById('ep-topics');
  if (topicsEl && ep.topics) {
    topicsEl.innerHTML = ep.topics.map(t => `<li style="display:flex;align-items:flex-start;gap:var(--sp-3);font-size:var(--fs-base);color:var(--c-muted);"><span style="color:var(--c-amber);flex-shrink:0;margin-top:2px;">→</span>${t}</li>`).join('');
  }

  // Transcript
  if (ep.transcript) {
    const tb = document.getElementById('transcript-body');
    if (tb) tb.innerHTML = `<p>${ep.transcript.replace(/\n\n/g,'</p><p>')}</p>`;
  }

  // Platform links (scoped to episode page)
  const spLink = document.getElementById('ep-spotify-link');
  const ytLink = document.getElementById('ep-youtube-link');
  if (spLink) {
    if (ep.spotifyUrl) { spLink.href = ep.spotifyUrl; }
    else { spLink.style.display = 'none'; }
  }
  if (ytLink) {
    if (ep.youtubeId) { ytLink.href = `https://www.youtube.com/watch?v=${ep.youtubeId}`; }
    else { ytLink.style.display = 'none'; }
  }

  // Update share buttons with episode-specific data
  const shareText = `${ep.title} — Hot & Juicy Podcast`;
  const shareUrl = window.location.href;
  document.querySelectorAll('[data-share-text]').forEach(btn => {
    btn.setAttribute('data-share-text', shareText);
  });
  document.querySelectorAll('[data-share-url]').forEach(btn => {
    btn.setAttribute('data-share-url', shareUrl);
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": ep.title,
    "description": ep.description,
    "url": window.location.href,
    "datePublished": ep.publishedAt,
    "dateModified": ep.publishedAt,
    "episodeNumber": ep.number,
    "episodeType": ep.type || "full",
    "duration": ep.duration || "",
    "keywords": (ep.tags || []).join(", "),
    "inLanguage": "en",
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "Hot & Juicy Podcast",
      "url": "https://hotandjuicypodcast.com",
      "publisher": {
        "@type": "Organization",
        "name": "Hot & Juicy Podcast",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hotandjuicypodcast.com/images/Logo.jpg",
          "width": 400,
          "height": 400
        }
      }
    },
    "author": [
      {"@type":"Person","name":"Mapettco"},
      {"@type":"Person","name":"Kabua"},
      {"@type":"Person","name":"Keithalfred01"}
    ]
  };
  if (ep.youtubeId) {
    schema.associatedMedia = {
      "@type": "VideoObject",
      "embedUrl": `https://www.youtube.com/embed/${ep.youtubeId}`,
      "thumbnailUrl": `https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`
    };
  }
  if (ep.transcript) {
    schema.transcript = {
      "@type": "MediaObject",
      "encodingFormat": "text/html",
      "contentUrl": window.location.href + "#transcript"
    };
  }
  if (ep.showNotes) {
    schema["abstract"] = ep.showNotes;
  }
  const schemaEl = document.getElementById('episodeSchema');
  if (schemaEl) schemaEl.textContent = JSON.stringify(schema);

  // Hosts list
  const hostsEl = document.getElementById('ep-hosts-list');
  if (hostsEl && typeof hosts !== 'undefined') {
    const socIcons = {instagram:'📸',tiktok:'🎵',youtube:'▶',x:'𝕏'};
    hosts.forEach(h => {
      hostsEl.innerHTML += `
        <div style="display:flex;align-items:center;gap:var(--sp-4);padding:var(--sp-4);background:var(--c-bg-2);border:1px solid var(--c-border);border-radius:var(--r-md);">
          <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--c-amber),var(--c-coral));display:flex;align-items:center;justify-content:center;font-family:var(--f-display);font-weight:700;color:#fff;flex-shrink:0;">${h.name[0]}</div>
          <div style="flex:1;">
            <div style="font-family:var(--f-display);font-weight:700;font-size:var(--fs-sm);color:var(--c-cream);">${h.name}</div>
            <div style="font-size:var(--fs-xs);color:var(--c-muted);">${h.title}</div>
          </div>
          <div style="display:flex;gap:var(--sp-2);">
            ${Object.entries(h.socials).map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener" aria-label="${h.name} on ${k}" class="social-link" style="color:var(--c-muted);font-size:0.9rem;transition:color 0.15s;">${socIcons[k]||'🔗'}</a>`).join('')}
          </div>
        </div>`;
    });
  }

  // Related episodes
  const relatedEl = document.getElementById('related-episodes');
  if (relatedEl && typeof episodes !== 'undefined') {
    const related = episodes.filter(e => e.id !== ep.id).slice(0, 3);
    related.forEach(r => {
      const rThumb = getYouTubeThumb(r.youtubeId) || '';
      const thumbHtml = rThumb
        ? `<img src="${rThumb}" alt="${r.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'ep-card__thumb-placeholder\\'>🎙</div>'">`
        : `<div class="ep-card__thumb-placeholder">🎙</div>`;
      relatedEl.innerHTML += `
        <a href="${episodeUrl(r)}" class="card ep-card">
          <div class="ep-card__thumb">
            ${thumbHtml}
            <div class="ep-card__overlay"><div class="ep-card__play">▶</div></div>
          </div>
          <div class="ep-card__body">
            <div class="ep-card__meta"><span class="ep-card__tag">${(r.tags||[])[0]||''}</span><span>${r.duration||''}</span></div>
            <div class="ep-card__title">${r.title}</div>
            <p class="ep-card__desc">${r.description}</p>
          </div>
          <div class="ep-card__footer">
            <span class="ep-card__cta">Listen Now →</span>
          </div>
        </a>`;
    });
  }

  // Related blog posts
  const postsEl = document.getElementById('ep-related-posts');
  if (postsEl && typeof blogPosts !== 'undefined') {
    const related = blogPosts.filter(p => p.relatedEpisode === ep.id).slice(0, 2);
    if (related.length) {
      related.forEach(p => {
        postsEl.innerHTML += `
          <a href="${blogPostUrl(p)}" class="card blog-card">
            <div class="blog-card__body" style="padding:var(--sp-5);">
              <div class="blog-card__category">${p.category}</div>
              <div class="blog-card__title">${p.title}</div>
              <p class="blog-card__excerpt">${p.excerpt}</p>
            </div>
          </a>`;
      });
    } else {
      const parent = postsEl.closest('div');
      if (parent) parent.style.display = 'none';
    }
  }
})();

/* ── BLOG PAGE LOADER ────────────────────────────────────── */
(function initBlogPage() {
  const page = document.getElementById('blogPage');
  if (!page || typeof blogPosts === 'undefined') return;
  // post-template.html has its own inline script that handles everything
  if (window.location.pathname.includes('post-template')) return;

  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  const match = window.location.pathname.match(/\/blog\/(post-\d+)/);
  if (!id && match) id = match[1];
  const post = id ? blogPosts.find(p => p.id === id) : null;

  if (!post) {
    page.innerHTML = `
      <div style="text-align:center;padding:80px 24px;">
        <h2>Post not found</h2>
        <p style="margin:12px 0 28px;">This article may have moved or the link is incorrect.</p>
        <a href="/blog" class="btn btn--primary">Browse All Posts</a>
      </div>`;
    return;
  }

  document.title = `${post.title} — Hot & Juicy Blog`;
  setMeta('description', post.excerpt);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', window.location.href);

  const fields = {
    'post-title':    post.title,
    'post-category': post.category,
    'post-author':   post.author,
    'post-date':     formatDate(post.publishedAt),
    'post-body':     post.body || ''
  };
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el[id === 'post-body' ? 'innerHTML' : 'textContent'] = val;
  });

  const schemaEl = document.getElementById('articleSchema');
  if (schemaEl) {
    schemaEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedAt,
      "author": { "@type": "Person", "name": post.author },
      "publisher": { "@type": "Organization", "name": "Hot & Juicy Podcast" }
    });
  }
})();

/* ── META HELPER ─────────────────────────────────────────── */
function setMeta(name, content) {
  const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  if (el) el.setAttribute('content', content);
}