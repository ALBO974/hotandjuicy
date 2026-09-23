/* ============================================================
   HOT & JUICY PODCAST — data.js
   All content data: episodes, blog posts, hosts
   Edit this file to add new episodes and blog posts.
   ============================================================ */

/* ── EMAILJS CONFIG ──────────────────────────────────────── */
const EMAILJS_CONFIG = {
  publicKey:      "aiT9MpsGSQ0LWWZKt",
  serviceId:      "service_7wciv15",
  contactTemplate:"template_qzaq0na",
  nlTemplate:     "template_f901isl",
  sponsorTemplate:"template_qzaq0na"
};

/* ── EPISODES ────────────────────────────────────────────── */
/* To add a new episode: copy one object, paste at the TOP of the array, update all fields */
const episodes = [
   {
     id:          "ep-015",
     number:      15,
     type:        "full",
     title:       "SEND ME ANONYMOUS MESSAGES",
     slug:        "send-me-anonymous-messages",
     youtubeId:   "PMP3Tqt0lUk",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We open up the anonymous message box and read the most honest, brutal, and hilarious messages from our audience. Nothing is off limits.",
    showNotes:   "In this episode we let the people speak — anonymous messages, confessions, hot takes, and questions you've always wanted to ask but never had the guts to say out loud.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Anonymous messages", "Audience confessions", "Hot takes", "Q&A"],
    tags:        ["anonymous", "Q&A", "audience"],
    duration:    "58 min",
    publishedAt: "2025-06-17",
    featured:    true,
    trending:    false
  },
   {
     id:          "ep-014",
     number:      14,
     type:        "full",
     title:       "AFRICAN BLIND DATE SHOW",
     slug:        "african-blind-date-show",
     youtubeId:   "J2lohJkx8vs",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We play matchmaker in the very first Hot & Juicy blind date special. Awkward moments, genuine connections, and lots of laughs.",
    showNotes:   "The African Blind Date Show edition 01 — we set up singles, watch the sparks fly (or not), and break down all the dating dynamics you never knew you needed to see.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Blind dating", "African dating culture", "Matchmaking"],
    tags:        ["dating", "blind date", "special"],
    duration:    "62 min",
    publishedAt: "2025-06-16",
    featured:    false,
    trending:    true
  },
   {
     id:          "ep-013",
     number:      13,
     type:        "full",
     title:       "KENYANS IN QATAR EXPOSED — Black Tax, Fear & Going Home Talks",
     slug:        "kenyans-in-qatar-exposed-black-tax-fear-and-going-home-talks",
     youtubeId:   "K-_bfFAOwJk",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We expose the real talk about Kenyans living in Qatar — black tax, the fear of going back home, and the uncomfortable truths nobody says out loud.",
    showNotes:   "A deep dive into the Kenyan diaspora experience in Qatar. From black tax obligations to the fear of returning home, we lay it all bare.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Kenyans in Qatar", "Black tax", "Diaspora struggles", "Going home"],
    tags:        ["diaspora", "qatar", "kenya", "black tax"],
    duration:    "71 min",
    publishedAt: "2025-06-15",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-012",
     number:      12,
     type:        "full",
     title:       "SHARP BOYS EXPOSED — The Dirty Game Behind The Hustle",
     slug:        "sharp-boys-exposed-the-dirty-game-behind-the-hustle",
     youtubeId:   "17uCk6-19Bw",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We expose the sharp boys — the dirty game behind the hustle that everyone in the diaspora knows about but rarely talks about openly.",
    showNotes:   "An eye-opening episode where we break down the sharp boy lifestyle, the risks, the rewards, and the reality behind the flashy social media posts.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Sharp boys", "Diaspora hustle", "Get rich quick", "Exposed"],
    tags:        ["sharp boys", "hustle", "diaspora"],
    duration:    "65 min",
    publishedAt: "2025-06-14",
    featured:    false,
    trending:    true
  },
   {
     id:          "ep-011",
     number:      11,
     type:        "full",
     title:       "ANDREW KIBE: WHY KENYAN MEN HAVE ABANDONED CLUBS IN 2025 ft HAO",
     slug:        "andrew-kibe-why-kenyan-men-have-abandoned-clubs-in-2025-ft-hao",
     youtubeId:   "L7rfxA9LV5U",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "Andrew Kibe joins us to break down why Kenyan men are abandoning clubs in 2025. A deep dive into changing nightlife culture, relationships, and the new social landscape.",
    showNotes:   "In this collaboration with HAO Podcast, Andrew Kibe shares his unfiltered take on why Kenyan men are staying away from clubs. We discuss the economics, the culture shift, and what this means for nightlife in Kenya.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Andrew Kibe", "Kenyan nightlife 2025", "Why men leave clubs", "HAO Podcast collaboration"],
    tags:        ["andrew kibe", "nightlife", "kenya", "hao podcast"],
    duration:    "74 min",
    publishedAt: "2025-06-13",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-010",
     number:      10,
     type:        "full",
     title:       "From Gulf Money to Mjengo Hustle",
     slug:        "from-gulf-money-to-mjengo-hustle",
     youtubeId:   "bhcHPfPjOK0",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "The journey from making Gulf money to the mjengo hustle — we talk about the shift, the reality check, and what it really means to build something back home.",
    showNotes:   "We discuss the transition from working in the Gulf to pursuing the mjengo hustle in Kenya. The money, the mindset, and the move that changes everything.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Gulf money", "Mjengo hustle", "Diaspora reality", "Building back home"],
    tags:        ["gulf", "mjengo", "hustle", "diaspora"],
    duration:    "55 min",
    publishedAt: "2025-06-12",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-009",
     number:      9,
     type:        "full",
     title:       "WHO IS MOST LIKELY ft HAO PODCAST",
     slug:        "who-is-most-likely-ft-hao-podcast",
     youtubeId:   "JU8yJMmTNGs",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We team up with the HAO Podcast for a hilarious game of Who Is Most Likely. Expect chaos, unexpected confessions, and plenty of laughs.",
    showNotes:   "A crossover episode with HAO Podcast where we play Who Is Most Likely — revealing the wildest things about each other and our co-hosts.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["HAO Podcast collaboration", "Who is most likely game", "Podcast crossover"],
    tags:        ["collaboration", "game", "hao podcast"],
    duration:    "68 min",
    publishedAt: "2025-06-11",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-008",
     number:      8,
     type:        "full",
     title:       "Andrew Kibe On Njugush And Wakafinywa Breakup",
     slug:        "andrew-kibe-on-njugush-and-wakafinywa-breakup",
     youtubeId:   "TDExkYh3drQ",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "Andrew Kibe joins us to break down the Njugush and Wakafinywa breakup — the drama, the reactions, and what it says about Kenyan content creation.",
    showNotes:   "We sit down with Andrew Kibe to discuss the Njugush and Wakafinywa breakup saga. Kibe gives his unfiltered take on the situation and the Kenyan YouTube scene.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Andrew Kibe", "Njugush and Wakafinywa", "Kenyan content creators", "Breakup drama"],
    tags:        ["andrew kibe", "njugush", "wakafinywa", "drama"],
    duration:    "72 min",
    publishedAt: "2025-06-10",
    featured:    false,
    trending:    true
  },
   {
     id:          "ep-007",
     number:      7,
     type:        "full",
     title:       "Are We Living in The Matrix? Simulation Theory Explained",
     slug:        "are-we-living-in-the-matrix-simulation-theory-explained",
     youtubeId:   "l6Y2hEkz1_8",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We dive deep into simulation theory — are we living in a simulation? We debate the evidence, the philosophers, and the mind-bending possibilities.",
    showNotes:   "A philosophical deep dive into simulation theory. We discuss Elon Musk's takes, Nick Bostrom's argument, and whether any of this is even real.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Simulation theory", "Are we in the Matrix", "Nick Bostrom", "Philosophy"],
    tags:        ["simulation", "matrix", "philosophy", "theory"],
    duration:    "67 min",
    publishedAt: "2025-06-09",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-006",
     number:      6,
     type:        "full",
     title:       "Andrew Kibe Breaks Silence on BBC Interview Controversy",
     slug:        "andrew-kibe-breaks-silence-on-bbc-interview-controversy",
     youtubeId:   "AAAjCCc77yc",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "Andrew Kibe finally breaks his silence on the BBC interview controversy that had the internet talking. We get the full story, no filters.",
    showNotes:   "In this explosive episode, Andrew Kibe addresses the BBC interview controversy head-on. We discuss the backlash, the media narrative, and what really happened.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Andrew Kibe", "BBC interview controversy", "Media backlash"],
    tags:        ["andrew kibe", "bbc", "controversy"],
    duration:    "63 min",
    publishedAt: "2025-06-08",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-005",
     number:      5,
     type:        "full",
     title:       "He Was a Security Guard Until Sheikh Al Mayassa Discovered Him",
     slug:        "he-was-a-security-guard-until-sheikh-al-mayassa-discovered-him",
     youtubeId:   "o0nvshL0_7c",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "An incredible story of a Kenyan who went from working as a security guard to being discovered by Sheikh Al Mayassa in Qatar. A true rags-to-riches tale.",
    showNotes:   "We sit down with a Kenyan whose life changed overnight when Sheikh Al Mayassa discovered him working as a security guard. His journey from obscurity to the spotlight is nothing short of inspiring.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Sheikh Al Mayassa", "Security guard to artist", "Qatar success story", "Kenyan diaspora"],
    tags:        ["qatar", "sheikh al mayassa", "success story", "inspiration"],
    duration:    "59 min",
    publishedAt: "2025-06-07",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-004",
     number:      4,
     type:        "full",
     title:       "From Security Guard to Qatar's Highest-Paid Kenyan Artist",
     slug:        "from-security-guard-to-qatars-highest-paid-kenyan-artist",
     youtubeId:   "gijC-jIyc2c",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "The inspiring story of a Kenyan who went from security guard to becoming Qatar's highest-paid Kenyan artist. A journey of resilience, talent, and determination.",
    showNotes:   "We interview the Kenyan artist who defied the odds to become Qatar's highest-paid Kenyan creative. From humble beginnings to international recognition, this is a story you need to hear.",
    transcript:  "", // TODO: Add full episode transcript for SEO
    topics:      ["Kenyan artist in Qatar", "Security guard to success", "Diaspora inspiration", "Highest-paid Kenyan artist"],
    tags:        ["qatar", "artist", "success", "inspiration", "kenyan diaspora"],
    duration:    "54 min",
    publishedAt: "2025-06-06",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-003",
     number:      3,
     type:        "full",
     title:       "Food Controversies",
     slug:        "food-controversies",
     youtubeId:   "",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "We settle the biggest food debates — ugali vs chapati, nyama choma protocols, and the dishes that divide families. Nothing is off the table.",
    showNotes:   "A deep dive into the food controversies that split Kenyans apart. From the great ugali debate to the politics of chapati at weddings.",
    transcript:  "",
    topics:      ["Kenyan food debates", "Ugali controversy", "Chapati politics", "Nyama choma culture"],
    tags:        ["food", "culture", "debate"],
    duration:    "48 min",
    publishedAt: "2025-06-01",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-002",
     number:      2,
     type:        "full",
     title:       "Dating in the Modern Age",
     slug:        "dating-modern-age",
     youtubeId:   "",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "Dating apps, situationships, red flags, and real talk about navigating relationships as young Africans in 2025. Nothing is off limits.",
    showNotes:   "We dig into the realities of modern dating — from situationships to dating app burnout, love languages, and what we actually want in a partner.",
    transcript:  "",
    topics:      ["Dating apps in 2025", "Situationships explained", "Red flags vs green flags", "Love languages"],
    tags:        ["dating", "relationships", "modern life"],
    duration:    "64 min",
    publishedAt: "2025-06-01",
    featured:    false,
    trending:    false
  },
   {
     id:          "ep-001",
     number:      1,
     type:        "full",
     title:       "Who Are We? The Introduction",
     slug:        "who-are-we-introduction",
     youtubeId:   "",
     spotifyUrl:  "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",
     appleUrl:    "https://podcasts.apple.com/us/podcast/hot-and-juicy-podcast/id1768033282",
    description: "Meet Mapettco, Kabua, and Keithalfred01. We introduce ourselves, talk about why we started this podcast, and give you a taste of the conversations to come.",
    showNotes:   "The very first episode of Hot & Juicy. We sit down, get comfortable, and tell you everything you need to know about who we are and what this podcast is about.",
    transcript:  "",
    topics:      ["Who is Mapettco", "Who is Kabua", "Who is Keithalfred01", "Why Hot & Juicy Podcast was started"],
    tags:        ["introduction", "hosts"],
    duration:    "42 min",
    publishedAt: "2025-05-15",
    featured:    false,
    trending:    false
  }
];

/* ── HOSTS ───────────────────────────────────────────────── */
const hosts = [
  {
    id:       "mapettco",
    name:     "Mapettco",
    title:    "Co-Host & Producer",
    bio:      "Content creator, culture commentator, and the one who always has the hottest take. Mapettco brings energy, humor, and zero filter to every conversation.",
    image:    "host-mapettco.jpg",
    socials: {
      instagram: "https://www.instagram.com/mapettco",
      tiktok:    "https://www.tiktok.com/@mapettco",
      youtube:   "https://www.youtube.com/@mapettcokenya"
    }
  },
  {
    id:       "kabua",
    name:     "Kabua",
    title:    "Co-Host",
    bio:      "The voice of reason (sometimes). Kabua keeps the conversation grounded while still managing to say the most outrageous things with a straight face.",
    image:    "host-kabua.jpg",
    socials: {
      instagram: "https://www.instagram.com/_kabuah",
      tiktok:    "https://www.tiktok.com/@_kabua_14",
      x:         "https://x.com/kabsteve"
    }
  },
  {
    id:       "keithalfred01",
    name:     "Keithalfred01",
    title:    "Co-Host",
    bio:      "Part philosopher, part chaos agent. Keith asks the questions nobody else wants to ask and somehow makes it all make sense by the end.",
    image:    "host-keith.jpg",
    socials: {
      instagram: "https://www.instagram.com/keithalfred01",
      tiktok:    "https://www.tiktok.com/@keithalfred01",
      x:         "https://x.com/_keith3"
    }
  }
];

/* ── BLOG POSTS ──────────────────────────────────────────── */
/* To add a new post: copy one object, paste at the TOP, update all fields */
const blogPosts = [
  {
    id:          "post-001",
    title:       "What It Really Means to Be Kenyan in Doha",
    slug:        "kenyan-in-doha",
    category:    "Diaspora Life",
    author:      "Hot & Juicy Team",
    excerpt:     "Living between two worlds — the warmth of Nairobi and the ambition of Qatar. Here's what nobody tells you about the expat experience.",
    image:       "blog-what-it-means-kenyan-doha.jpg",
    publishedAt: "2025-06-10",
    body:        `<p>There is a specific kind of quiet that hits you at 2 a.m. in Doha. The city is humming — air conditioners, distant traffic, the glow of skyscrapers through floor-to-ceiling windows — but something is missing. It is the sound of Nairobi at night. The distant murmur of a matatu. The neighbour's <em>ngoma</em> playing through a tinny speaker. The smell of rain on dust.</p><p>Being Kenyan in Doha is not the expat life they show you on Instagram. It is a life of two worlds — and you carry both with you everywhere you go.</p>

    <h2>The Gulf Dream and What It Costs</h2>
    <p>Let's be honest: most of us came here for the money. Qatar pays better than Kenya, the shilling stretches further, and the tax-free income lets you send something meaningful home every month. But financial gain comes with an invisible price tag. The 45-degree heat that pins you indoors for months. The Friday afternoons spent scrolling through WhatsApp statuses of friends back home having <em>chapati</em> at a family gathering you could not attend. The guilt of missing another cousin's wedding, another baby shower, another burial.</p>
    <p>The Kenyan diaspora in Qatar is massive — estimates put it at over 30,000 — yet it remains largely invisible in the mainstream Gulf expat narrative. We are the security guards, the hospitality workers, the nurses, the engineers, and increasingly the entrepreneurs. We are not the Western executives in The Pearl. We are the backbone of a city that runs on imported labour, and we make it work with a uniquely Kenyan resilience.</p>

    <blockquote><p>"The hardest part isn't the work. It is coming home to an empty apartment and realising you haven't spoken Kikuyu or Swahili out loud in three days."</p></blockquote>

    <h2>Building a Community from Scratch</h2>
    <p>When you arrive in Doha as a Kenyan, the first thing you notice is how scattered everyone seems. There is no single neighbourhood where Kenyans cluster. You find us in Al Mansoura, in Najma, in Umm Ghuwailina, in the industrial area. But the community exists — you just have to know where to look.</p>
    <p>WhatsApp groups become your lifeline. There is the one for Kenyan networking, the one for <em>nyama choma</em> meetups, the one for church events, the one for football watch parties. There is a whole ecosystem running on group chats and word of mouth. Hot &amp; Juicy was born out of these conversations — the ones that happen after work, during late-night drives to the petrol station, over shared plates of <em>ugali</em> in someone's flat.</p>

    <h3>The Code-Switching We Never Talk About</h3>
    <p>Living in Doha means shifting between languages and identities multiple times a day. At work, you speak English (or Arabic, if you have learned). With the <em>mama mboga</em> in Old Al Wakra, you switch to Swahili. On the phone with your mother, you are speaking your mother tongue. And with your Kenyan friends, you speak a hybrid of everything — Sheng, English, Swahili, and inside jokes that would make no sense to anyone outside the circle.</p>
    <p>This constant code-switching is exhausting. But it is also beautiful. It means we are adaptable. It means we carry Kenya with us in a way that no passport stamp can erase.</p>

    <h2>The Future of the Kenyan Diaspora in Qatar</h2>
    <p>Things are changing. More Kenyans are opening businesses — restaurants, salons, logistics companies. The second generation is growing up speaking Arabic with a Kenyan accent. The community is becoming less transient, more rooted. We are not just here to make money and leave. We are building lives.</p>
    <p>But the question remains: <strong>where is home?</strong> Is it the apartment in Doha you have furnished with <em>kikoi</em> throws and a pressure cooker for <em>githeri</em>? Or is it the dusty compound in Nakuru where your grandmother still lives? For most of us, the answer is both. And learning to hold both truths at the same time is the real diaspora education.</p>`,
    relatedEpisode: "ep-015",
    featured:    true
  },
  {
    id:          "post-002",
    title:       "The Ugali Diaries: What Kenyan Food Says About Who We Are",
    slug:        "ugali-diaries-kenyan-food",
    category:    "Kenyan Culture",
    author:      "Hot & Juicy Team",
    excerpt:     "From the great ugali debate to the politics of chapati at weddings — Kenyan food is more than fuel. It is identity, memory, and a battlefield.",
    image:       "blog-ugali-diaries-kenyan-food.jpg",
    publishedAt: "2025-06-05",
    body:        `<p>Every Kenyan has an opinion about food. Strong opinions. The kind of opinions that end friendships. We once watched a group chat disintegrate over the question of whether <em>ugali</em> is better with <em>sukuma wiki</em> or <em>nyama choma</em>. People took sides. Lines were drawn. Someone threatened to unfriend everyone.</p><p>This is what it means to be a food-obsessed nation. Kenyan food is not just fuel — it is memory, identity, belonging, and sometimes controversy. Let us dig in.</p>

    <h2>Ugali: The Great Equaliser</h2>
    <p>Ugali is the backbone of Kenyan cuisine. Ask any Kenyan what their last meal on earth would be, and most will say ugali and <em>omena</em> or ugali and <em>kuku</em>. It is the food of childhood, of boarding school mornings, of family dinners after a long day. But ugali is also political. How thick should it be? Should it be made from maize flour only, or is millet acceptable? Is it a finger food, or can you use a fork without being judged?</p>
    <p>The correct answer — and we say this with love — is that ugali is a finger food. Period. The warmth, the texture, the way it moulds perfectly in your palm before dipping into the stew — that is not just tradition, it is engineering. Our ancestors knew what they were doing.</p>

    <blockquote><p>"You can take a Kenyan out of Kenya, but you cannot take away their opinion on how ugali should be cooked."</p></blockquote>

    <h2>Chapati: The Currency of Joy</h2>
    <p>Chapati at a Kenyan wedding is not optional. It is a cultural requirement. If you attend a wedding and there is no chapati, something has gone terribly wrong. Chapati signals abundance, celebration, and the cook's reputation. A good chapati is flaky, golden, and slightly crispy at the edges. A bad chapati is dense, oily, and a disappointment to everyone.</p>
    <p>In the diaspora, chapati becomes something more. It is nostalgia. It is the taste of Sunday afternoons. It is the dish you learn to cook because your mother is 4,000 kilometres away and you refuse to let the tradition die. Every perfectly rolled chapati is a small act of cultural preservation.</p>

    <h3>Nyama Choma and the Brotherhood of Fire</h3>
    <p>No discussion of Kenyan food is complete without <em>nyama choma</em>. Roasted meat is not just a meal — it is a ritual. The process of selecting the right cut, seasoning it simply (salt, maybe a hint of rosemary if you are feeling fancy), and watching it roast over charcoal is meditative. In Doha, Kenyans have perfected the art of the backyard grill. Friday evenings, the smell of roasting meat drifts through neighbourhood compounds, and suddenly everyone is a friend.</p>
    <p>Food brings us together in a way that little else can. It crosses class, tribe, and geography. A Kenyan in Doha and a Kenyan in Nairobi might have completely different lives, but put a plate of <em>githeri</em> in front of them and they are the same person.</p>

    <h2>What We Lose When We Eat Abroad</h2>
    <p>There is a quiet grief in eating Kenyan food outside Kenya. The ingredients are not the same. The <em>sukuma wiki</em> from the Doha supermarket is imported and tastes like it spent a week in transit. The mangoes lack the sun-soaked sweetness of the ones from the Coast. Even the water changes the taste of the <em>chai</em>.</p>
    <p>But we adapt. We find substitutes. We call our mothers for recipes. We perfect the art of making <em>mandazi</em> in a foreign kitchen. Because food is home — and home is something we carry with us, even when we are far from it.</p>`,
    featured:    false
  },
  {
    id:          "post-003",
    title:       "Long-Distance Love in the Diaspora: Hard Truths Nobody Talks About",
    slug:        "long-distance-love-diaspora",
    category:    "Relationships",
    author:      "Hot & Juicy Team",
    excerpt:     "Loving someone from 4,000 kilometres away is romantic until it is not. Time zones, trust, and the loneliness nobody prepares you for.",
    image:       "blog-long-distance-love-diaspora-j.jpg",
    publishedAt: "2025-06-18",
    body:       `<p>She is in Nairobi. He is in Doha. They talk every night at 10 p.m. — 10 p.m. his time, which is midnight hers because Qatar is an hour ahead. She is already sleepy. He is still wired from work. The conversation is stilted. They argue about something small. They hang up frustrated. Tomorrow, they will try again.</p><p>This is the reality of long-distance relationships in the diaspora. And nobody talks about how hard it actually is.</p>

    <h2>The Myth of the Romantic Struggle</h2>
    <p>Social media romanticises long-distance love. Couples post screenshots of cute good morning texts, countdown apps ticking down to the next visit, airport reunion videos set to slow music. What they do not show is the Thursday night argument that spirals because one of you had a bad day and the other could not read the mood through a screen.</p>
    <p>Long-distance relationships amplify every pre-existing issue. Communication problems become chasms. Jealousy becomes paranoia. The lack of physical presence means every hugless argument feels incomplete — there is no hand to hold, no shoulder to cry on, no silent reconciliation over a cup of tea. You have to talk it out, and talking it out over WhatsApp voice notes is not the same.</p>

    <blockquote><p>"Distance does not make the heart grow fonder. It makes the heart grow tired of explaining itself."</p></blockquote>

    <h2>The Practical Challenges Nobody Warns You About</h2>
    <p>Beyond the emotional toll, there are practical struggles. Time zone math becomes a daily mental load. Public holidays rarely align. A visit costs at least a month's rent in flights alone. If your partner is in Kenya and you are in Qatar, you are looking at $400–$700 round trip — and that is if you book early. Visas add another layer. Not every Kenyan can easily visit Qatar, and not every resident can easily visit Kenya.</p>

    <h3>Technology Is Both Saviour and Saboteur</h3>
    <p>Thank God for WhatsApp, FaceTime, and Telegram. But also: technology creates a false sense of presence. You can text all day and still feel lonely. You can video call for two hours and realise you did not actually say anything meaningful. The pressure to always be available is exhausting. If you take three hours to reply, assumptions are made. If you do not send a goodnight text, something is wrong. The constant digital connection can become a leash rather than a lifeline.</p>

    <h2>Making It Work: What We Have Learned</h2>
    <p>After talking to dozens of Kenyans in the diaspora — including our own crew — here is what actually helps:</p>
    <ul>
      <li><strong>Schedule intentional check-ins, not just daily calls.</strong> A 10-minute "how are we doing" conversation about the relationship itself prevents resentment from building.</li>
      <li><strong>Invest in a visit plan immediately.</strong> Even if it is six months away, having a concrete date to look forward to changes the energy. Hope needs a calendar.</li>
      <li><strong>Create shared rituals.</strong> Watch the same movie on Netflix Party. Cook the same meal while on FaceTime. Read the same book. Shared experiences bridge the distance.</li>
      <li><strong>Talk about the endgame early.</strong> Who is moving where? When? What does the future actually look like? Ambiguity is the silent killer of long-distance love.</li>
    </ul>

    <p>Long-distance is not impossible. Many couples survive it and come out stronger. But it requires a level of intentionality and emotional maturity that most people underestimate. If you are in one, give yourself grace. It is hard because it matters.</p>`,
    relatedEpisode: "ep-014",
    featured:    false
  },
  {
    id:          "post-004",
    title:       "Building Wealth Abroad: How Kenyans in the Gulf Are Winning",
    slug:        "building-wealth-abroad-kenyans-gulf",
    category:    "Business",
    author:      "Hot & Juicy Team",
    excerpt:     "From side hustles to full-blown businesses — the untold story of Kenyan entrepreneurship in Qatar, Saudi, and the UAE.",
    image:       "blog-business-building-wealth-abroad-02.jpg",
    publishedAt: "2025-06-16",
    body:       `<p>When Kevin landed in Doha in 2019, he had a job as a sales associate and a dream that did not fit in a suitcase. Three years later, he owns a logistics company that ships goods between Qatar and Kenya. He is not an exception — he is part of a quiet wave of Kenyan entrepreneurs building serious wealth in the Gulf.</p><p>The narrative about Kenyans in the Gulf is often one of struggle. But there is another story being written: one of ambition, hustle, and strategic wealth-building. Here is how it is happening.</p>

    <h2>The Side Hustle Culture</h2>
    <p>Most Kenyan entrepreneurs in the Gulf did not start with a business plan. They started with a side hustle. A colleague asked if they knew someone who could braid hair. A friend needed help shipping documents to Nairobi. A neighbour wanted <em>omena</em> imported from Kenya. One favour at a time, they built a client base.</p>
    <p>The beauty of the Gulf market is the concentration of disposable income. Kenyans here have money — and they spend it on things that remind them of home. Kenyan food products, hair care, fashion, event planning. The demand exists. The question is who shows up to meet it.</p>

    <blockquote><p>"The Kenyan community in Doha is a ready-made market. You do not need to find customers. You need to solve problems they already have."</p></blockquote>

    <h2>Industries Where Kenyans Are Thriving</h2>

    <h3>Food and Hospitality</h3>
    <p>Kenyan restaurants in Doha have become cultural hubs. Places like Nairobi Kitchen and Masaani serve not just food but community. The owners started small — catering from home, supplying <em>chapati</em> to events — and grew into brick-and-mortar establishments. The margins are good, the loyalty is high, and the demand for authentic Kenyan cuisine is only growing.</p>

    <h3>Logistics and Shipping</h3>
    <p>The <em>kibanda</em> business — shipping goods between the Gulf and Kenya — has exploded. Kenyans send everything from electronics to furniture to cars. Several community members have turned this into six-figure businesses, handling container shipments and door-to-door delivery. The trust factor is key: people prefer to ship with someone from the community.</p>

    <h3>Beauty and Wellness</h3>
    <p>Kenyan hairstylists and beauty entrepreneurs are in high demand. Braiding, weaves, skincare — the diaspora spends heavily on looking good. Several Kenyan-owned salons in Doha have built loyal followings and expanded into product sales (oils, creams, supplements).</p>

    <h2>The Financial Strategy That Works</h2>
    <p>The smartest Kenyan entrepreneurs in the Gulf follow a simple formula:</p>
    <ol>
      <li><strong>Earn in a strong currency (QAR, SAR, AED).</strong> The exchange rate advantage alone is a wealth-building tool.</li>
      <li><strong>Reinvest in the Gulf market first.</strong> Build your business where the money is before expanding to Kenya.</li>
      <li><strong>Send profits strategically.</strong> Invest in Kenyan real estate, SACCOs, and government bonds while maintaining a Gulf revenue stream.</li>
      <li><strong>Build a network, not just a business.</strong> The most successful Kenyans in the Gulf are the ones who show up for the community. Your reputation is your marketing.</li>
    </ol>

    <p>The Kenyan entrepreneurship story in the Gulf is still being written. But one thing is clear: we are not just here to work. We are here to build.</p>`,
    relatedEpisode: "ep-012",
    featured:    false
  },
  {
    id:          "post-005",
    title:       "Doha Unfiltered: A Kenyan's Guide to Surviving and Thriving in Qatar",
    slug:        "doha-unfiltered-kenyan-guide",
    category:    "Doha Life",
    author:      "Hot & Juicy Team",
    excerpt:     "From finding the best nyama choma spots to navigating labour laws — everything you wish someone told you before you moved to Doha.",
    image:       "blog-doha-unfiltered-kenyans-guide-02.jpg",
    publishedAt: "2025-06-12",
    body:       `<p>Nobody gives you a manual when you move to Doha. You land at Hamad International Airport, the air-conditioning hits you like a wall, and suddenly you are supposed to figure out where to live, how to get a SIM card, and which supermarket sells <em>kunde</em> — all while jet-lagged and mildly panicking.</p><p>We have been there. After years in Doha between us, here is the unfiltered guide to making this city work for you.</p>

    <h2>The First 30 Days: Survival Mode</h2>
    <p>Your first month is about the basics. Get your <strong>QID</strong> (Qatar ID) sorted immediately — you cannot do anything without it. Open a bank account — QNB and Doha Bank are the most Kenyan-friendly. Get a <strong>Hayyak</strong> SIM from Ooredoo or Vodafone; the prepaid plans are affordable and you can top up at any petrol station.</p>
    <p>Housing: Al Mansoura and Najma are popular with Kenyans for a reason — central location, relatively affordable rent, and walking distance to shops and restaurants. If you want something quieter, try Umm Ghuwailina. Expect to pay between QAR 2,500 and 4,000 for a studio or one-bedroom in these areas.</p>

    <blockquote><p>"Your first month in Doha will feel disorienting. Your third month will feel like home. Give yourself time to adjust — the city grows on you quietly."</p></blockquote>

    <h2>Where to Find Kenyan Food</h2>
    <p>This is sacred information. For <em>ugali</em> flour, <em>mchele</em> (Kenyan rice), and <em>sukuma wiki</em> seeds, head to Lulu Hypermarket in Al Mansoura or the smaller Kenyan shops scattered around Old Al Wakra. For fresh <em>kunde</em> (cowpeas), the Friday morning market at Souq Waqif is your spot — go early, haggle, and bring cash.</p>
    <p>For <em>nyama choma</em> specifically, the Kenyan butchers in Al Wakra sell goat meat that tastes like home. Season it simply, grill it slowly, and invite people over. That is how community is built.</p>

    <h3>Transport: Getting Around Without a Car</h3>
    <p>The Doha Metro has changed the game. The Gold Line connects you to most areas where Kenyans live and work. Karwa buses are reliable but require a travel card. Uber and Careem are expensive if used daily — use the Metro for daily commutes and ride-hailing for evenings. Many Kenyans eventually buy a car; a used Toyota Yaris or Corolla is the gold standard for affordability and reliability.</p>

    <h2>Work and Money: What They Do Not Tell You</h2>
    <p>Your contract will say "accommodation allowance" — do not assume your employer will handle it. Read the fine print. Many companies provide housing in shared labour accommodations, not private flats. If you want to live alone, budget for it.</p>
    <p>Transferring money home: Use WorldRemit or Sama Express for the best rates. Avoid bank wire transfers — the fees eat into your remittance. Also, join a Kenyan SACCO if you can. Saving with people who understand your goals makes a difference.</p>

    <h2>The Social Scene</h2>
    <p>Doha can feel lonely if you do not put yourself out there. Join the "Kenyans in Qatar" WhatsApp and Facebook groups. Attend the monthly <em>nyama choma</em> meetups (they are real, and they are legendary). Go to community events — if there is a Kenyan wedding or fundraiser, show up. The diaspora network is powerful, but only if you activate it.</p>
    <p>And yes, the heat is real. From June to September, outdoor activities are limited to early mornings and evenings. But the city has excellent malls (Doha Festival City, Villaggio), indoor entertainment (the Qatar National Library is world-class), and weekend desert trips that make the summer bearable. You will adapt.</p>`,
    relatedEpisode: "ep-013",
    featured:    false
  },
  {
    id:          "post-006",
    title:       "From Listener to Family: How Hot & Juicy Built a Community in Doha",
    slug:        "listener-to-family-hj-community",
    category:    "Community Stories",
    author:      "Hot & Juicy Team",
    excerpt:     "It started as three friends recording in a living room. Then the messages started coming — and we realised the podcast was never just about us.",
    image:       "blog-from-listener-to-family-02.jpg",
    publishedAt: "2025-06-14",
    body:       `<p>In early 2025, three Kenyans in Doha sat around a microphone and started talking. No agenda. No audience. Just honest conversation about what it means to be young, Kenyan, and figuring life out in the Gulf. We called it Hot &amp; Juicy because the topics were hot and the conversations were juicy — and also because we wanted a name nobody would forget.</p><p>What happened next surprised all of us.</p>

    <h2>The First DMs That Changed Everything</h2>
    <p>A week after our first episode dropped, Mapettco received a message on Instagram. A listener in Doha wrote: <em>"I have been in Qatar for three years and this is the first time I have heard people talk about my life out loud. Thank you."</em> We read it in the group chat and went quiet. That was the moment we understood: this was not just a podcast. It was a mirror for a community that had not seen itself reflected anywhere.</p>
    <p>The messages kept coming. Kenyans in Qatar started sharing their stories — the loneliness, the hustle, the dreams, the families they left behind. A nurse in Al Wakra wrote about missing her daughter's first steps. A security guard shared how he listens to episodes during his night shift. A university student told us the podcast made her feel less alone.</p>

    <blockquote><p>"We thought we were making content. The community showed us we were building a home."</p></blockquote>

    <h2>The First Meetup</h2>
    <p>When we announced our first meetup, we were nervous. What if nobody shows up? What if it is awkward? We booked a small venue in Al Sadd and hoped for twenty people. Over sixty came. Kenyans from all over Doha — different jobs, different ages, different stories — showed up, shared food, laughed, debated, and became friends before the night was over.</p>
    <p>That meetup taught us something important: the diaspora is hungry for connection. We spend our days in environments where we are a minority, where we code-switch, where we hold parts of ourselves back. A Hot &amp; Juicy meetup is a place where nobody has to explain themselves. Everyone already knows what <em>mbuzi</em> is. Everyone has a story about the first time they landed in Doha. Everyone is looking for the same thing — a piece of home.</p>

    <h3>What the Community Has Become</h3>
    <p>Today, the Hot &amp; Juicy community extends beyond Doha. We have listeners in Nairobi, London, Dubai, and Toronto. The WhatsApp group has its own inside jokes. We have had listeners connect and become friends, business partners, even roommates. People send us voice notes responding to episodes. We have featured community stories on the show. The podcast is no longer just ours — it belongs to everyone who shows up.</p>

    <h2>What We Learned About Community Building</h2>
    <p>If you are thinking of starting something — a podcast, a group, a business — here is what the journey taught us:</p>
    <ul>
      <li><strong>Start before you are ready.</strong> We did not have fancy equipment or a marketing plan. We had a microphone and something to say.</li>
      <li><strong>Consistency builds trust.</strong> Showing up every week, even when episodes were imperfect, taught the audience they could rely on us.</li>
      <li><strong>Listen to your community.</strong> Every episode topic suggestion, every DM, every comment — we read all of them. Your audience will tell you what they need.</li>
      <li><strong>Community is not a metric.</strong> It is not about follower counts or download numbers. It is about the one person who tells you your episode got them through a hard week. That is the real win.</li>
    </ul>

    <p>Hot &amp; Juicy started with three friends in a room. It grew because the community showed up — and kept showing up. If you are reading this and you have an idea, start. You never know who is waiting to hear what you have to say.</p>`,
    relatedEpisode: "ep-010",
    featured:    false
  }
];

/* ── PLATFORM LINKS ──────────────────────────────────────── */
const platforms = [
  { name: "Spotify",        url: "https://open.spotify.com/show/7MQ2UnU6wVB2YBmXF5FgGV?si=esMUp_g5QKGkZ8k3c_UscA",         icon: "🎧" },
  { name: "YouTube",        url: "https://www.youtube.com/@hotandjuicypodcast", icon: "▶" },
  { name: "TikTok",         url: "https://www.tiktok.com/@hotandjuicypodcast", icon: "🎵" },
  { name: "Instagram",      url: "https://www.instagram.com/hotandjuicypodcast", icon: "📸" }
];

/* ── STATS ───────────────────────────────────────────────── */
const stats = [
  { value: "15",  label: "Episodes Published" },
  { value: "6",   label: "Blog Articles"       },
  { value: "20+", label: "Topics Discussed"    },
  { value: "3",   label: "Platforms"           }
];

/* ── YOUTUBE THUMBNAIL HELPER ────────────────────────────── */
function getYouTubeThumb(youtubeId, quality = 'maxresdefault') {
  if (!youtubeId) return '';
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

/* ── EPISODE URL HELPER ──────────────────────────────────── */
function episodeUrl(ep) {
  var path = window.location.pathname;
  if (path.includes('/episodes/')) {
    return `episode-template.html?id=${ep.id}`;
  }
  return `episodes/episode-template.html?id=${ep.id}`;
}

function blogPostUrl(post) {
  var path = window.location.pathname;
  if (path.includes('/blog/')) {
    return `post-template.html?id=${post.id}`;
  }
  return `blog/post-template.html?id=${post.id}`;
}
