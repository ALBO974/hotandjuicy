/**
 * fetch-youtube-rss.js
 * ====================
 * Fetches YouTube RSS feed for Hot & Juicy Podcast,
 * extracts video IDs/titles/dates, and generates
 * JSON to paste into js/data.js
 *
 * Usage:
 *   node scripts/fetch-youtube-rss.js
 *
 * Output:
 *   Prints JSON snippets grouped by channel + playlist
 *   that can be copied into the episodes array in data.js
 *
 * Schedule (cron): 0 6 * * 1 (every Monday at 6 AM)
 */

// Config — update these for your channel/playlists
const CHANNEL_ID = 'UC_YOUR_CHANNEL_ID';
const PLAYLISTS = {
  'Full Episodes': 'YOUR_PLAYLIST_ID',
  'Shorts & Clips': 'YOUR_SHORTS_PLAYLIST_ID',
};

async function fetchRSS(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const xml = await res.text();
  return xml;
}

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const entry = match[1];
    const videoId = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (entry.match(/<title>([^<]+)<\/title>/) || [])[1];
    const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1];
    if (videoId && title) {
      items.push({ videoId, title, published: published || '' });
    }
  }
  return items;
}

function generateEpisodeSnippet(videoId, title, published) {
  const dateStr = published ? published.split('T')[0] : 'YYYY-MM-DD';
  return `  {
    id: 'ep-NNN',
    youtubeId: '${videoId}',
    title: '${title.replace(/'/g, "\\'")}',
    description: 'Description here…',
    publishedAt: '${dateStr}',
    duration: '30 min',
    tags: ['tag1', 'tag2'],
    topics: ['Topic 1', 'Topic 2'],
    number: N,
    featured: false,
    trending: false,
    showNotes: '',
    transcript: '',
    spotifyUrl: 'https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA',
    appleUrl: 'https://www.youtube.com/@hotandjuicypodcast',
  },`;
}

async function main() {
  console.log('=== YouTube RSS Auto-Updater ===\n');

  // Fetch channel uploads
  const channelUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  try {
    const xml = await fetchRSS(channelUrl);
    const videos = parseRSS(xml);
    console.log(`Channel uploads found: ${videos.length}`);
    console.log('\n--- Channel Uploads ---');
    videos.forEach(v => {
      console.log(`  ${v.videoId}  |  ${v.published?.split('T')[0]}  |  ${v.title.slice(0, 60)}`);
    });
  } catch (err) {
    console.error('Failed to fetch channel feed:', err.message);
  }

  // Fetch each playlist
  for (const [name, playlistId] of Object.entries(PLAYLISTS)) {
    const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    try {
      const xml = await fetchRSS(url);
      const videos = parseRSS(xml);
      console.log(`\n--- Playlist: ${name} (${videos.length} videos) ---`);
      videos.forEach(v => {
        console.log(`  ${v.videoId}  |  ${v.published?.split('T')[0]}  |  ${v.title.slice(0, 60)}`);
      });
    } catch (err) {
      console.error(`Failed to fetch playlist "${name}":`, err.message);
    }
  }

  console.log('\n=== Done ===');
  console.log('Copy video IDs and paste into js/data.js episode entries.\n');
  console.log('Tip: Use the following snippet structure for new episodes:\n');
  console.log(generateEpisodeSnippet('VIDEO_ID', 'Episode Title', new Date().toISOString().split('T')[0]));
}

main().catch(console.error);
