const fs = require('fs');
const vm = require('vm');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const code = fs.readFileSync(dataPath, 'utf8');

function extractArray(name){
  const re = new RegExp(`const\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\];`,'m');
  const m = code.match(re);
  if(!m) return null;
  return '[' + m[1] + ']';
}

const episodesText = extractArray('episodes');
const blogText = extractArray('blogPosts');
if(!episodesText) { console.error('episodes array not found'); process.exit(2); }
if(!blogText) { console.error('blogPosts array not found'); process.exit(2); }

const sandbox = { console };
vm.createContext(sandbox);

try {
  vm.runInContext(`__episodes = ${episodesText}; __blog = ${blogText};`, sandbox, { filename: 'data-extract.js' });
} catch(err) {
  console.error('Eval error:', err && err.stack || err);
  process.exit(2);
}

const episodes = sandbox.__episodes || [];
const blogPosts = sandbox.__blog || [];

const idsToCheck = ['ep-012','ep-013','ep-010','ep-015','ep-003'];

idsToCheck.forEach(id=>{
  const ep = episodes.find(e=>e.id===id) || {id};
  const related = blogPosts.filter(p=>p.relatedEpisode === id);
  console.log(JSON.stringify({
    id: id,
    epTitle: ep.title || null,
    relatedCount: related.length,
    relatedTitles: related.map(p=>p.title)
  }));
});
