/**
 * Vercel serverless function: /api/youtube-rss
 *
 * Fetches the Hot & Juicy channel RSS feed server-side (avoids CORS)
 * and returns the newest uploads as JSON for the site's auto-sync:
 *   [{ id, title, published, description, url }]
 *
 * Cached at the edge for 5 minutes, so a newly uploaded video appears
 * on the site within ~5 minutes of going live on YouTube — no redeploy.
 */
const CHANNEL_ID = 'UCG0t7yZH2JnXVxRX1cJPSRA';

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(s) {
  return decodeEntities(String(s)).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export default async function handler(req, res) {
  try {
    const rss = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HotJuicySite/1.0)' } }
    );
    if (!rss.ok) {
      res.status(502).json({ error: 'Upstream feed error', status: rss.status });
      return;
    }
    const xml = await rss.text();

    // parse entries: each <entry> holds videoId, published, title, description
    const entries = xml.split('<entry>').slice(1);
    const videos = entries.map((e) => {
      const id = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] || '';
      const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
      const updated = (e.match(/<updated>([^<]+)<\/updated>/) || [])[1] || '';
      const title = decodeEntities((e.match(/<title>([^<]+)<\/title>/) || [])[1] || '');
      const desc = (e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
      return {
        id,
        title,
        published,
        description: stripHtml(desc).slice(0, 500),
        url: `https://www.youtube.com/watch?v=${id}`,
      };
    });

    // prefer the real publish date (updated is bumped on edits)
    videos.forEach((v) => { v.published = v.published || v.updated; });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ videos });
  } catch (err) {
    res.status(500).json({ error: String(err && err.message || err) });
  }
}
