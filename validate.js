#!/usr/bin/env node

/**
 * Hot & Juicy Podcast — Deployment Validation Script
 * Gates deployments by checking HTML structure, SEO, accessibility, and performance
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname);
const PAGES = [
  'index.html',
  'episodes/index.html',
  'blog/index.html',
  'about.html',
  'contact.html',
  'community.html',
  'sponsors.html',
  'media-kit.html',
  'press-kit.html',
  'episodes/episode-template.html',
  'blog/post-template.html'
];

let errors = 0;
let warnings = 0;

function logError(msg) {
  errors++;
  console.error(`\x1b[31m✗ ERROR:\x1b[0m ${msg}`);
}

function logWarn(msg) {
  warnings++;
  console.warn(`\x1b[33m⚠ WARN:\x1b[0m ${msg}`);
}

function logOk(msg) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}

function readFile(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf8');
}

function validatePage(relPath, html) {
  const dom = new JSDOM(html, { url: 'https://hotandjuicypodcast.com' });
  const doc = dom.window.document;
  const head = doc.head || doc.querySelector('head');
  const body = doc.body || doc.querySelector('body');

  // 1. Basic HTML structure
  if (!doc.querySelector('html[lang]')) {
    logError(`${relPath}: Missing lang attribute on <html>`);
  } else {
    logOk(`${relPath}: lang attribute present`);
  }

  // 2. Title tag
  const title = doc.querySelector('title');
  if (!title || !title.textContent.trim()) {
    logError(`${relPath}: Missing or empty <title>`);
  } else {
    logOk(`${relPath}: title present (${title.textContent.trim().slice(0, 60)}...)`);
  }

  // 3. Meta description
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (!metaDesc || !metaDesc.getAttribute('content')?.trim()) {
    logError(`${relPath}: Missing or empty meta description`);
  } else {
    const desc = metaDesc.getAttribute('content').trim();
    if (desc.length < 120) logWarn(`${relPath}: Meta description short (${desc.length} chars, aim for 120-160)`);
    else if (desc.length > 160) logWarn(`${relPath}: Meta description long (${desc.length} chars, aim for 120-160)`);
    else logOk(`${relPath}: meta description good length (${desc.length} chars)`);
  }

  // 4. Canonical URL
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical || !canonical.getAttribute('href')) {
    logError(`${relPath}: Missing canonical URL`);
  } else {
    logOk(`${relPath}: canonical URL present`);
  }

  // 5. Open Graph tags
  const ogTitle = doc.querySelector('meta[property="og:title"]');
  const ogDesc = doc.querySelector('meta[property="og:description"]');
  const ogImage = doc.querySelector('meta[property="og:image"]');
  if (!ogTitle || !ogDesc || !ogImage) {
    logWarn(`${relPath}: Missing some Open Graph tags (title/desc/image)`);
  } else {
    logOk(`${relPath}: Open Graph tags present`);
  }

  // 6. JSON-LD structured data
  const jsonLd = doc.querySelector('script[type="application/ld+json"]');
  if (!jsonLd || !jsonLd.textContent.trim()) {
    logWarn(`${relPath}: No JSON-LD structured data found`);
  } else {
    try {
      const schema = JSON.parse(jsonLd.textContent);
      if (schema['@type']) {
        logOk(`${relPath}: JSON-LD present (type: ${schema['@type']})`);
      } else {
        logWarn(`${relPath}: JSON-LD missing @type`);
      }
    } catch (e) {
      logError(`${relPath}: Invalid JSON-LD: ${e.message}`);
    }
  }

  // 7. Images with alt text
  const images = doc.querySelectorAll('img');
  let missingAlt = 0;
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    if (alt === null || alt.trim() === '') {
      missingAlt++;
      logError(`${relPath}: Image missing alt text: ${img.getAttribute('src') || '(no src)'}`);
    }
  });
  if (missingAlt === 0 && images.length > 0) {
    logOk(`${relPath}: All ${images.length} images have alt text`);
  } else if (images.length === 0) {
    logOk(`${relPath}: No images found`);
  }

  // 8. ARIA labels on interactive elements
  const buttons = doc.querySelectorAll('button');
  buttons.forEach(btn => {
    const ariaLabel = btn.getAttribute('aria-label');
    const text = btn.textContent?.trim();
    if (!ariaLabel && !text) {
      logWarn(`${relPath}: Button without accessible name (no aria-label or text)`);
    }
  });

  // 9. Links with aria-labels where needed
  const socialLinks = doc.querySelectorAll('a[aria-label*="on"]');
  // These are fine, just checking they exist

  // 10. Heading hierarchy
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let h1Count = 0;
  let prevLevel = 0;
  headings.forEach(h => {
    const level = parseInt(h.tagName[1]);
    if (level === 1) h1Count++;
    if (prevLevel && level > prevLevel + 1) {
      logWarn(`${relPath}: Heading level skip (h${prevLevel} -> h${level})`);
    }
    prevLevel = level;
  });
  if (h1Count === 0) logWarn(`${relPath}: No h1 heading found`);
  else if (h1Count > 1) logWarn(`${relPath}: Multiple h1 headings (${h1Count})`);
  else logOk(`${relPath}: Single h1 heading`);

  // 11. Focus indicators (check CSS)
  const cssFiles = [];
  let hasFocusStyles = false;
  // Check inline styles or linked CSS for focus-visible
  const styleTags = doc.querySelectorAll('style');
  styleTags.forEach(style => {
    if (style.textContent.includes('focus-visible') || style.textContent.includes(':focus')) {
      hasFocusStyles = true;
    }
  });
  const linkedCss = doc.querySelectorAll('link[rel="stylesheet"]');
  linkedCss.forEach(link => {
    const href = link.getAttribute('href');
    if (href) cssFiles.push(href);
  });
  if (!hasFocusStyles && relPath === 'index.html') {
    logWarn(`${relPath}: No focus-visible styles found in inline <style> (check CSS files)`);
  }

  // 12. Lazy loading on images
  let lazyCount = 0;
  let eagerCount = 0;
  images.forEach(img => {
    const loading = img.getAttribute('loading');
    if (loading === 'lazy') lazyCount++;
    else if (loading === 'eager') eagerCount++;
  });
  if (images.length > 0) {
    logOk(`${relPath}: ${lazyCount} lazy-loaded, ${eagerCount} eager-loaded images`);
  }

  // 13. Form labels
  const inputs = doc.querySelectorAll('input[type="email"], input[type="text"], textarea');
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const hasLabel = id && doc.querySelector(`label[for="${id}"]`);
    if (!hasLabel && !ariaLabel) {
      logWarn(`${relPath}: Input without label or aria-label: ${id || '(no id)'}`);
    }
  });

  // 14. Navigation
  const nav = doc.querySelector('nav');
  if (!nav) logWarn(`${relPath}: No <nav> element found`);
  else {
    const navLabel = nav.getAttribute('aria-label');
    if (!navLabel)       logWarn(`${relPath}: Nav without aria-label`);
    else logOk(`${relPath}: Nav with aria-label`);
  }

  // 15. Main content landmark
  const main = doc.querySelector('main');
  if (!main) logWarn(`${relPath}: No <main> landmark found`);
  else logOk(`${relPath}: <main> landmark present`);

  // 16. Footer
  const footer = doc.querySelector('footer');
  if (!footer) logWarn(`${relPath}: No <footer> found`);
  else logOk(`${relPath}: <footer> present`);
}

// Main execution
console.log('\n\x1b[36m╔══════════════════════════════════════════════════════════╗\x1b[0m');
console.log('\x1b[36m║   Hot & Juicy Podcast — Deployment Validation           ║\x1b[0m');
console.log('\x1b[36m╚══════════════════════════════════════════════════════════╝\x1b[0m\n');

console.log('Validating pages...\n');

PAGES.forEach(page => {
  const html = readFile(page);
  if (!html) {
    logWarn(`Page not found: ${page}`);
    return;
  }
  validatePage(page, html);
});

// Check data.js
const dataJs = readFile('js/data.js');
if (dataJs) {
  if (dataJs.includes('const episodes') && dataJs.includes('const hosts')) {
    logOk('js/data.js: episodes and hosts data present');
  } else {
    logWarn('js/data.js: Missing expected data structures');
  }
}

// Check main.js
const mainJs = readFile('js/main.js');
if (mainJs) {
  if (mainJs.includes('initShareButtons') && mainJs.includes('initNav')) {
    logOk('js/main.js: Core functionality present');
  } else {
    logWarn('js/main.js: Some core functions may be missing');
  }
}

// Summary
console.log('\n═══════════════════════════════════════════════════════════');
if (errors > 0) {
  console.log(`\x1b[31m✗ Validation FAILED: ${errors} error(s), ${warnings} warning(s)\x1b[0m`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`\x1b[33m⚠ Validation passed with ${warnings} warning(s)\x1b[0m`);
  process.exit(0);
} else {
  console.log(`\x1b[32m✓ Validation PASSED: no issues found\x1b[0m`);
  process.exit(0);
}