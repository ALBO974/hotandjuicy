const fs = require('fs');
const vm = require('vm');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const code = fs.readFileSync(dataPath, 'utf8');

const sandbox = {};
vm.createContext(sandbox);

try {
  vm.runInContext(code, sandbox, { filename: 'data.js' });
} catch (err) {
  console.error('Error evaluating data.js:', err.message);
  process.exit(2);
}

const episodes = sandbox.episodes || [];
const blogPosts = sandbox.blogPosts || [];

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
