const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const episodesToCheck = ['ep-012','ep-013','ep-010','ep-015','ep-003'];

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function checkEpisode(id){
  const filePath = path.join(root, 'episodes', 'episode-template.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const url = 'file://' + path.join(root, 'episodes', 'episode-template.html') + `?id=${id}`;
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', url });

  // Inject paths for scripts used by the page
  const win = dom.window;
  const doc = win.document;

  // append script tags for data.js and main.js
  function appendScript(relPath){
    const s = doc.createElement('script');
    s.src = path.join('..', 'js', path.basename(relPath)).replace(/\\/g, '/');
    doc.body.appendChild(s);
  }

  appendScript('js/data.js');
  appendScript('js/main.js');

  // Wait briefly for scripts to execute
  await sleep(500);

  const relatedEl = doc.getElementById('ep-related-posts');
  const found = [];
  if (relatedEl) {
    const cards = relatedEl.querySelectorAll('.blog-card__title');
    if (cards.length) {
      cards.forEach(c => found.push(c.textContent.trim()));
    } else {
      // try fallback: titles in .blog-card__body .blog-card__title
      const alt = relatedEl.querySelectorAll('.blog-card__title');
      alt.forEach(c => found.push(c.textContent.trim()));
    }
  }

  // Also check sidebar or CTA link if present
  const ctaLink = doc.getElementById('cta-ep-link');
  const ctaHref = ctaLink ? ctaLink.href : null;

  return { id, relatedCount: found.length, relatedTitles: found, ctaHref };
}

(async ()=>{
  try{
    for(const id of episodesToCheck){
      const res = await checkEpisode(id);
      console.log(JSON.stringify(res));
    }
  } catch(err){
    console.error('ERROR', err && err.stack || err);
    process.exit(2);
  }
})();
