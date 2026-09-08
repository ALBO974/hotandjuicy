# YouTube RSS Auto-Updater

Automatically fetch new YouTube video IDs for the Hot & Juicy Podcast website.

## How It Works

1. A Node.js script (`scripts/fetch-youtube-rss.js`) fetches the public RSS feed for
   the YouTube channel and any configured playlists.
2. It extracts `videoId`, `title`, and `publishedAt` for each video.
3. You copy-paste the IDs into `js/data.js`.

## One-Time Setup

1. Find your YouTube Channel ID:
   - Go to https://www.youtube.com/@hotandjuicypodcast
   - View page source and search for `channel_id` or `externalId`
   - Or use: https://www.youtube.com/feeds/videos.xml?channel_id=UC_YOUR_ID
     (if it returns XML, the ID in the URL is correct)

2. Open `scripts/fetch-youtube-rss.js` and update `CHANNEL_ID`.

3. (Optional) Find playlist IDs for "Full Episodes" and "Shorts & Clips":
   - Open a playlist on YouTube
   - The URL contains `list=PLAYLIST_ID`
   - Update the `PLAYLISTS` object in the script

## Running the Script

```bash
node scripts/fetch-youtube-rss.js
```

Output will show all videos found on the channel and in each playlist.

## Adding Videos to the Website

Once you have the `videoId` from the script output:

1. If it's a new episode, create a new entry in the `episodes` array in
   `js/data.js` using an existing entry as a template.

2. If it's an existing episode missing a YouTube ID (ep-001, ep-002, ep-003),
   paste the `videoId` into the existing entry's `youtubeId` field.

3. The `getYouTubeThumb()` helper in `data.js` automatically generates
   thumbnail URLs from the YouTube ID.

## Automation (Optional)

To run weekly on Monday at 6 AM via cron:

```bash
crontab -e
```

Add:

```
0 6 * * 1 cd /path/to/project && node scripts/fetch-youtube-rss.js >> logs/youtube-rss.log 2>&1
```

## Vercel Deployment Note

The `vercel.json` rewrites map clean URLs like `/episodes/ep-015` to
`/episodes/episode-template.html`. The `episodeUrl()` helper in `data.js`
generates these clean URLs. No additional config needed.
