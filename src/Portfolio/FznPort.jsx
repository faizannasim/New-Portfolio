import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Linkedin, Mail, Twitter, ExternalLink, Moon, Sun, ArrowUpRight, ArrowDown, ArrowUp, Check, Copy,
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX,
  ChevronLeft, ChevronRight, Film, Music2, CornerDownLeft,
} from 'lucide-react';
import { BsYoutube } from 'react-icons/bs';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from 'framer-motion';

/* ───────────── THEME: desk mat + aluminium case ───────────── */
const T = {
  dark: {
    bg: '#14151A', surface: '#1D1F26', surface2: '#272A33',
    border: 'rgba(236,230,214,0.08)', borderStrong: 'rgba(236,230,214,0.18)',
    text: '#ECE6D6', dim: 'rgba(236,230,214,0.78)', faint: 'rgba(236,230,214,0.48)',
    accent: '#FF6B4A', accentInk: '#fff', warm: '#EBBE4F', mint: '#8DBB9C', blue: '#6F97D1',
  },
  light: {
    bg: '#DEDACE', surface: '#F2EFE6', surface2: '#E4E0D3',
    border: 'rgba(35,35,42,0.1)', borderStrong: 'rgba(35,35,42,0.22)',
    text: '#23232A', dim: 'rgba(35,35,42,0.8)', faint: 'rgba(35,35,42,0.52)',
    accent: '#E2482A', accentInk: '#fff', warm: '#B98A12', mint: '#3F7B57', blue: '#3F6BB0',
  },
};

/* ───────────── CONTENT ───────────── */
const EMAIL = 'faizannasim59@gmail.com';
const ROLES = ['clean React interfaces.', 'API-driven dashboards.', 'AI-powered products.', 'fast, responsive apps.'];

const RECOGNITION = [
  { title: 'Best Project Award 2024', desc: 'Real-time Emotion Detection System, Greater Noida Institute of Technology', year: '2024' },
  { title: 'Generative AI certificate', desc: 'Microsoft and LinkedIn: prompt engineering and applied GenAI', year: '2024' },
];

const EXPERIENCE = [
  {
    company: 'GEDU Services', logo: 'G', role: 'Associate Frontend Developer',
    date: 'Dec 2025 — Present', location: 'Noida, India', current: true,
    // tech: ['React.js', 'REST APIs', 'RBAC', 'Excel export', 'Multi-role dashboards'],
    groups: [
      {
        title: 'Multi-Role Dashboards & Brand Management', color: 'accent',
        bullets: [
          <>Developed <b>10+ responsive pages</b> across multi-role dashboards (Student, Admin, Instructor) in React.js integrated with REST APIs, optimizing data-fetching logic to improve <b>page load speed by 30%</b>.</>,
          <>Designed a secure <b>Brand Management portal</b> enforcing strict Role-Based Access Control (RBAC) to restrict university onboarding to Super Admin users, strengthening platform security and data integrity.</>,
        ],
      },
      {
        title: 'Refund Tracking & Reporting Modules', color: 'warm',
        bullets: [
          <>Built a <b>Refund Tracking module</b> integrated with backend APIs to surface real-time status across a sequential approval workflow (starting from step 1 post-initiation), showing approver identity, remarks, and timestamps at every stage for full audit visibility.</>,
          <>Developed a <b>Reporting module</b> integrated with backend APIs to consolidate user details across all roles into a single view, complete with one-click Excel export for audits and offline analysis.</>,
        ],
      },
      {
        title: 'Platform-Wide Optimization & QA', color: 'mint',
        bullets: [
          <>Resolved critical UI and data-flow issues platform-wide, reducing <b>reported bugs by 40%</b> across 3 distinct user roles.</>,
        ],
      },
    ],
  },
];

// const SPECS = [
//   { to: 10, suffix: '+', label: 'responsive pages', note: 'Student, Admin and Instructor dashboards' },
//   { to: 30, suffix: '%', label: 'faster page loads', note: 'Optimized data-fetching logic' },
//   { to: 40, suffix: '%', label: 'fewer reported bugs', note: 'Across 3 distinct user roles' },
//   { to: 3, suffix: '', label: 'user roles shipped', note: 'Secured with role-based access' },
// ];

const AI_LAYER = {
  LangChain: 'agents', RAG: 'retrieval', 'AI Agents': 'agents', LLMs: 'models', LangGraph: 'agents', OpenAI: 'models',
  ChromaDB: 'retrieval', Pinecone: 'retrieval', 'Prompt Engineering': 'models', GenAI: 'models', Embeddings: 'retrieval',
  'Vector DB': 'retrieval', MCP: 'tooling', 'Tool Calling': 'tooling', 'Function Calling': 'tooling', Chunking: 'retrieval',
};
const LAYERS = [
  { id: 'all', label: 'All keys', desc: 'Everything I work with across the AI stack.' },
  { id: 'models', label: 'Models', desc: 'Choosing, prompting and calling language models.' },
  { id: 'retrieval', label: 'Retrieval', desc: 'Embedding, chunking and searching so models answer from real data.' },
  { id: 'agents', label: 'Agents', desc: 'Multi-step workflows where a model plans, decides and acts.' },
  { id: 'tooling', label: 'Tooling', desc: 'Connecting models to functions, APIs and outside tools.' },
];

const AI_TAGS = [
  { name: 'LangChain', c: '#5EEBB0', w: 3 }, { name: 'RAG', c: '#A78BFA', w: 3 },
  { name: 'AI Agents', c: '#FF8A65', w: 3 }, { name: 'LLMs', c: '#61D4F5', w: 3 },
  { name: 'LangGraph', c: '#61D4F5', w: 2 }, { name: 'OpenAI', c: '#5EEBB0', w: 2 },
  { name: 'ChromaDB', c: '#F472B6', w: 2 }, { name: 'Pinecone', c: '#F59E0B', w: 2 },
  { name: 'Prompt Engineering', c: '#FF8A65', w: 2 }, { name: 'GenAI', c: '#A78BFA', w: 2 },
  { name: 'Embeddings', c: '#5EEBB0', w: 2 }, { name: 'Vector DB', c: '#F59E0B', w: 1 },
  { name: 'MCP', c: '#61D4F5', w: 1 }, { name: 'Tool Calling', c: '#A78BFA', w: 1 },
  { name: 'Function Calling', c: '#FF8A65', w: 1 }, { name: 'Chunking', c: '#F472B6', w: 1 },
];

const PROJECTS = [
  { title: 'BillMate', sub: 'Invoice maker', year: '2024',
    desc: 'Responsive invoice platform with PDF export, QR code, and hands-free voice via the Web Speech API.',
    stack: ['React', 'Tailwind', 'Web Speech API'],
    gh: 'https://github.com/faizannasim/BillMate.git', live: 'https://bill-mate-iota.vercel.app/',
    kpi: '100', kpiLabel: 'Lighthouse', img: '/bill.png', c: '#8A6BFF' },
  { title: 'Ask AI', sub: 'AI chat app', year: '2024',
    desc: 'Real-time AI chat with persistent history and the Google Gemini API. 89 Accessibility score on Lighthouse.',
    stack: ['React', 'Tailwind', 'Gemini API'],
    gh: 'https://github.com/faizannasim', live: null, kpi: '89', kpiLabel: 'Accessibility', img: '/ask.png', c: '#F472B6' },
  { title: 'F1 Arena', sub: 'F1 dashboard', year: '2024',
    desc: 'Multi-section dashboard consuming live REST APIs, handling 1,000+ data points with modal-based user management.',
    stack: ['React', 'Tailwind', 'REST APIs'],
    gh: 'https://github.com/faizannasim/F1Arena.git', live: 'https://formula-1-2e81.vercel.app/',
    kpi: '1K+', kpiLabel: 'Data points', img: '/f1.png', c: '#FF7A59' },
  { title: 'Portfolio', sub: 'Personal site', year: '2024',
    desc: 'Fully responsive portfolio with animated UI and a mobile-first layout.',
    stack: ['React', 'Tailwind', 'Framer Motion'],
    gh: 'https://github.com/faizannasim/Faizan-Web.git', live: 'https://faizanwebbb.netlify.app/',
    kpi: '94', kpiLabel: 'Accessibility', img: '/Port.png', c: '#38BDF8' },
  { title: 'SecureSignIn', sub: 'Auth system', year: '2023',
    desc: 'Secure React login with email-based access, protected routes, and logout via React Router.',
    stack: ['React', 'React Router', 'Tailwind'],
    gh: 'https://github.com/faizannasim/SecureSignIn.git', live: 'https://login-auth-wine.vercel.app/',
    kpi: null, img: '/Login.png', c: '#4ADE9F' },
  { title: 'CU Clone', sub: 'Frontend replica', year: '2023',
    desc: 'Pixel-accurate frontend clone of Chandigarh University replicating layout, navigation, and design.',
    stack: ['React', 'Tailwind', 'Figma'],
    gh: 'https://github.com/faizannasim/chandigarh-university.git', live: 'https://chandigarh-university.vercel.app/',
    kpi: null, img: '/cg.png', c: '#F59E0B' },
];

const TRACKS = [
  { title: 'Bitter Sweet Symphony', artist: 'The Verve', dur: 358, yt: '1lyu1KKwC74', c: ['#A78BFA', '#FF8A65'] },
  { title: "You're Beautiful", artist: 'James Blunt', dur: 209, yt: 'r00ikilDxW4', c: ['#F472B6', '#A78BFA'] },
  { title: '21 Guns', artist: 'Green Day', dur: 321, yt: 'oofSnsGkops', c: ['#5EEBB0', '#61D4F5'] },
  { title: 'Boulevard of Broken Dreams', artist: 'Green Day', dur: 262, yt: 'Soa3gO7tL-c', c: ['#5EEBB0', '#22D3EE'] },
  { title: 'Stressed Out', artist: 'Twenty One Pilots', dur: 202, yt: 'pXRviuL6vMY', c: ['#FF8A65', '#F472B6'] },
  { title: 'In The End', artist: 'Linkin Park', dur: 216, yt: 'eVTXPUF4Oz4', c: ['#61D4F5', '#A78BFA'] },
  { title: 'Numb', artist: 'Linkin Park', dur: 187, yt: 'kXYiU_JCYtU', c: ['#8B5CF6', '#61D4F5'] },
  { title: 'Faint', artist: 'Linkin Park', dur: 162, yt: 'LYU-8IFcDPw', c: ['#EF4444', '#8B5CF6'] },
  { title: 'One More Light', artist: 'Linkin Park', dur: 255, yt: 'TfW-aS6YVH8', c: ['#A78BFA', '#F472B6'] },
  { title: "What I've Done", artist: 'Linkin Park', dur: 205, yt: '8sgycukafqQ', c: ['#22D3EE', '#5EEBB0'] },
  { title: 'Something In The Way', artist: 'Nirvana', dur: 232, yt: '4VxdufqB9zg', c: ['#94A3B8', '#5EEBB0'] },
  { title: 'The Reason', artist: 'Hoobastank', dur: 233, yt: 'fV4DiAyExN0', c: ['#F59E0B', '#FF8A65'] },
  { title: 'Sammi Meri Waar', artist: 'Coke Studio', dur: 385, yt: 'KHLNSxe5Y8A', c: ['#F59E0B', '#F472B6'] },
  { title: 'Pasoori', artist: 'Coke Studio', dur: 258, yt: '5Eqb_-j3FDA', c: ['#F59E0B', '#FB923C'] },
  { title: 'Afreen Afreen', artist: 'Coke Studio', dur: 404, yt: 'kvRl0v7Jr7E', c: ['#F472B6', '#A78BFA'] },
];

const IMG = (p) => `https://image.tmdb.org/t/p/w500${p}`;
const R = (title, year, type, cats, p, c) => ({ title, year, type, cats, poster: IMG(p), c });
const REEL = [
  R('The Social Network', '2010', 'Code', ['code'], '/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg', '#4ADE9F'),
  R('The Matrix', '1999', 'Hacking', ['code', 'mind'], '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', '#5EEBB0'),
  R('Mr. Robot', '2015', 'Series', ['code', 'series'], '/oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg', '#EF4444'),
  R('Person of Interest', '2011', 'Series', ['code', 'series', 'mind'], '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', '#61D4F5'),
  R('The Imitation Game', '2014', 'Code', ['code'], '/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg', '#F59E0B'),
  R('Ex Machina', '2014', 'AI', ['code', 'mind'], '/btbRB7BrD887j5NrvjxceRDmaot.jpg', '#A78BFA'),
  R('Her', '2013', 'AI', ['code', 'mind'], '/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg', '#F472B6'),
  R('Ghost in the Shell', '1995', 'Anime', ['anime', 'code'], '/9gC88zYUBARRSThcG93MvW14sqx.jpg', '#8B5CF6'),
  R('Ready Player One', '2018', 'Sci-Fi', ['code'], '/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg', '#22D3EE'),
  R('Inception', '2010', 'Mind', ['mind'], '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', '#94A3B8'),
  R('Interstellar', '2014', 'Mind', ['mind'], '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', '#5B7FFF'),
  R('Memento', '2000', 'Mind', ['mind'], '/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg', '#F59E0B'),
  R('Shutter Island', '2010', 'Mind', ['mind'], '/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg', '#64748B'),
  R('The Prestige', '2006', 'Mind', ['mind'], '/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg', '#A78BFA'),
  R('Fight Club', '1999', 'Mind', ['mind'], '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', '#EF4444'),
  R('Donnie Darko', '2001', 'Mind', ['mind'], '/fhQoQfejY1hUcwyuLgpBrYs6uFt.jpg', '#6B7280'),
  R('Arrival', '2016', 'Mind', ['mind'], '/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg', '#475569'),
  R('Tenet', '2020', 'Mind', ['mind'], '/k68nPLbIST6NP96JmTxmZijEvMk.jpg', '#FB923C'),
  R('Eternal Sunshine', '2004', 'Mind', ['mind'], '/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg', '#F472B6'),
  R('The Truman Show', '1998', 'Mind', ['mind'], '/vuza0WqY239yBXOadKlGwJsZJFE.jpg', '#22D3EE'),
  R('Oldboy', '2003', 'Mind', ['mind'], '/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg', '#DC2626'),
  R('Mulholland Drive', '2001', 'Mind', ['mind'], '/tVxGt7uffLVhIIcwuldXOMpFBPX.jpg', '#8B5CF6'),
  R('Blade Runner 2049', '2017', 'Mind', ['mind'], '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', '#FB923C'),
  R('Breaking Bad', '2008', 'Series', ['series'], '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', '#4ADE9F'),
  R('Dark', '2017', 'Series', ['series', 'mind'], '/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg', '#475569'),
  R('Severance', '2022', 'Series', ['series', 'mind'], '/lFf6LLrQjYldcZItzOkGmMMigP7.jpg', '#22D3EE'),
  R('Iron Man', '2008', 'Marvel', ['marvel'], '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', '#E62429'),
  R('Avengers: Endgame', '2019', 'Marvel', ['marvel'], '/or06FN3Dka5tukK1e9sl16pB3iy.jpg', '#A78BFA'),
  R('Avengers: Infinity War', '2018', 'Marvel', ['marvel'], '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', '#A78BFA'),
  R('Spider-Verse', '2018', 'Marvel', ['marvel', 'anime'], '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg', '#F472B6'),
  R('Guardians of the Galaxy', '2014', 'Marvel', ['marvel'], '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg', '#F59E0B'),
  R('Doctor Strange', '2016', 'Marvel', ['marvel', 'mind'], '/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg', '#22D3EE'),
  R('Black Panther', '2018', 'Marvel', ['marvel'], '/uxzz6RgbNccnXmH8gjkrGVdTKIG.jpg', '#8B5CF6'),
  R('Loki', '2021', 'Series', ['marvel', 'series'], '/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg', '#4ADE9F'),
  R('The Dark Knight', '2008', 'DC', ['dc'], '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', '#E5B14A'),
  R('Joker', '2019', 'DC', ['dc', 'mind'], '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', '#7DD3FC'),
  R('The Batman', '2022', 'DC', ['dc'], '/74xTEgt7R36Fpooo50r9T25onhq.jpg', '#94A3B8'),
  R('Batman Begins', '2005', 'DC', ['dc'], '/8RW2runSEc34IwKN2D1aPcJd2UL.jpg', '#475569'),
  R('Watchmen', '2009', 'DC', ['dc'], '/uuDeL1cJQIN0RWpwJCLEeopjRlq.jpg', '#F59E0B'),
  R('Your Name', '2016', 'Anime', ['anime'], '/q719jXXEzOoYaps6babgKnONONX.jpg', '#FF7A9C'),
  R('Spirited Away', '2001', 'Anime', ['anime'], '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', '#5EEBB0'),
  R('My Neighbor Totoro', '1988', 'Anime', ['anime'], '/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg', '#5EEBB0'),
  R('Princess Mononoke', '1997', 'Anime', ['anime'], '/cMYCDADoLKLbB83gWnJegaZimC.jpg', '#4ADE9F'),
  R("Howl's Moving Castle", '2004', 'Anime', ['anime'], '/TkTPELv4kC3u1lkloush8skOjE.jpg', '#F59E0B'),
  R('Attack on Titan', '2013', 'Anime', ['anime', 'series'], '/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg', '#FF8A65'),
  R('Death Note', '2006', 'Anime', ['anime', 'series', 'mind'], '/tCZFfYTIwrR7n94J6G14OYYya3U.jpg', '#EF4444'),
  R('Demon Slayer', '2019', 'Anime', ['anime', 'series'], '/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg', '#4ADE9F'),
  R('The Shawshank Redemption', '1994', 'Drama', ['film'], '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg', '#8FA0B5'),
  R('The Godfather', '1972', 'Crime', ['film'], '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', '#F59E0B'),
  R('Pulp Fiction', '1994', 'Crime', ['film'], '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', '#DC2626'),
  R('Parasite', '2019', 'Drama', ['film'], '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', '#A78BFA'),
  R('Whiplash', '2014', 'Drama', ['film'], '/7fn624j5lj3xTme2SgiLCeuedmO.jpg', '#F59E0B'),
  R('Oppenheimer', '2023', 'Drama', ['film'], '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', '#FB923C'),
  R('Dune', '2021', 'Sci-Fi', ['film'], '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', '#F59E0B'),
  R('Gladiator', '2000', 'Epic', ['film'], '/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', '#F59E0B'),
  R('Forrest Gump', '1994', 'Drama', ['film'], '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', '#22D3EE'),
  R('Django Unchained', '2012', 'Western', ['film'], '/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg', '#DC2626'),
  R('Goodfellas', '1990', 'Crime', ['film'], '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg', '#DC2626'),
  R('Se7en', '1995', 'Thriller', ['film', 'mind'], '/6yoghtyTpznpBik8EngEmJskVUO.jpg', '#475569'),
  R('Léon: The Professional', '1994', 'Action', ['film'], '/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg', '#F59E0B'),
  R('Avatar', '2009', 'Sci-Fi', ['film'], '/kyeqWdyUXW608qlYkRqosgbbJyK.jpg', '#22D3EE'),
];

const REEL_CATS = [
  { id: 'all', label: 'All', dot: '#A78BFA' }, { id: 'code', label: 'Cyberpunk', dot: '#5EEBB0' },
  { id: 'mind', label: 'Mind-bending', dot: '#A78BFA' }, { id: 'series', label: 'Series', dot: '#F59E0B' },
  { id: 'marvel', label: 'Marvel', dot: '#E62429' }, { id: 'dc', label: 'DC', dot: '#7DD3FC' },
  { id: 'anime', label: 'Anime', dot: '#FF7A9C' }, { id: 'film', label: 'Classics', dot: '#61D4F5' },
];

/* Number keys 1–5 jump to these sections */
const NAV = [
  ['Experience', 'experience'], ['AI', 'ai'], ['Work', 'work'], ['Off-time', 'life'], ['Contact', 'contact'],
];
const EASE = [0.22, 1, 0.36, 1];
const fmt = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

/* ───────────── KEY SOUND: 0 off, 1 clicky, 2 thock, 3 soft ───────────── */
const SND = { mode: 0, ctx: null };
const SND_NAMES = ['off', 'clicky', 'thock', 'soft'];
function clack() {
  if (!SND.mode) return;
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    SND.ctx = SND.ctx || new C();
    const c = SND.ctx;
    if (c.state === 'suspended') c.resume();
    const m = SND.mode, now = c.currentTime;
    const len = Math.floor(c.sampleRate * (m === 2 ? 0.09 : 0.05));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter();
    if (m === 1) { f.type = 'bandpass'; f.frequency.value = 2200 + Math.random() * 700; f.Q.value = 0.9; }
    else if (m === 2) { f.type = 'lowpass'; f.frequency.value = 650 + Math.random() * 150; }
    else { f.type = 'lowpass'; f.frequency.value = 1400; }
    const g = c.createGain(); g.gain.value = m === 1 ? 0.5 : m === 2 ? 0.9 : 0.25;
    src.connect(f); f.connect(g); g.connect(c.destination); src.start(now);
    if (m === 2) {
      const o = c.createOscillator(), og = c.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(190, now); o.frequency.exponentialRampToValueAtTime(70, now + 0.08);
      og.gain.setValueAtTime(0.35, now); og.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      o.connect(og); og.connect(c.destination); o.start(now); o.stop(now + 0.11);
    }
    if (m === 1) {
      const o = c.createOscillator(), og = c.createGain();
      o.type = 'square'; o.frequency.value = 3400;
      og.gain.setValueAtTime(0.06, now); og.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      o.connect(og); og.connect(c.destination); o.start(now); o.stop(now + 0.015);
    }
  } catch {}
}

/* ───────────── KEYCAP ───────────── */
function Key({ color = 'cream', size = '', down = false, href, target, onClick, className = '', label, children, ...rest }) {
  const cls = `key k-${color}${size ? ' ' + size : ''}${down ? ' down' : ''}${className ? ' ' + className : ''}`;
  const inner = <span className="kcap">{children}</span>;
  if (href) {
    return (
      <a href={href} target={target} rel={target ? 'noopener noreferrer' : undefined}
        className={cls} onPointerDown={clack} aria-label={label} {...rest}>{inner}</a>
    );
  }
  return (
    <button type="button" className={cls} onPointerDown={clack} onClick={onClick} aria-label={label} {...rest}>{inner}</button>
  );
}

/* ───────────── PAGE ───────────── */
export default function Portfolio() {
  const [dark, setDark] = useState(() => {
    try {
      const s = localStorage.getItem('theme');
      if (s) return s === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch { return true; }
  });
  useEffect(() => { try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {} }, [dark]);
  const t = T[dark ? 'dark' : 'light'];

  const [snd, setSnd] = useState(0);
  useEffect(() => { SND.mode = snd; }, [snd]);
  const [rgb, setRgb] = useState(true);
  const [keys, setKeys] = useState(0);
  const [help, setHelp] = useState(false);
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    if (!recent.length) return;
    const id = setTimeout(() => setRecent([]), 1600);
    return () => clearTimeout(id);
  }, [recent]);

  const [buf, setBuf] = useState('');
  const [msg, setMsg] = useState('type help, then press Enter');
  const [pressed, setPressed] = useState(() => new Set());
  const [active, setActive] = useState('');
  const bufRef = useRef('');
  const runRef = useRef(() => {});
  bufRef.current = buf;

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  runRef.current = (raw) => {
    const cmd = raw.trim().toLowerCase();
    setBuf('');
    if (!cmd) return;
    const go = {
      experience: 'experience', exp: 'experience', ai: 'ai', work: 'work', projects: 'work',
      music: 'life', film: 'life', life: 'life', contact: 'contact', hire: 'contact', mail: 'contact', top: 'top',
    };
    if (go[cmd]) { setMsg(`opening ${cmd}`); jump(go[cmd]); }
    else if (cmd === 'dark' || cmd === 'light') { setDark(cmd === 'dark'); setMsg(`${cmd} theme on`); }
    else if (cmd === 'theme') { setDark((d) => !d); setMsg('theme switched'); }
    else if (cmd === 'sound') { const n = (snd + 1) % 4; setSnd(n); setMsg(`switch sound: ${SND_NAMES[n]}`); }
    else if (cmd === 'rgb') { setRgb(!rgb); setMsg(rgb ? 'underglow: static' : 'underglow: cycling'); }
    else if (cmd === 'help') setMsg('try: experience, ai, work, music, contact, theme, sound, rgb');
    else setMsg(`command not found: ${cmd}. type help`);
  };

  /* Physical keyboard: 1–5 jump to sections, letters type into the terminal in the hero */
  useEffect(() => {
    const mark = (k, on) => setPressed((p) => { const n = new Set(p); on ? n.add(k) : n.delete(k); return n; });
    const seen = (label) => setRecent((r) => [...r.slice(-3), { id: `${performance.now()}${label}`, label }]);
    const onDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tg = e.target;
      const tag = (tg && tg.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (tg && tg.isContentEditable)) return;
      const k = e.key;
      if (k === '?') { setHelp((h) => !h); return; }
      if (/^[1-5]$/.test(k)) { mark(k, true); clack(); seen(k); setKeys((n) => n + 1); jump(NAV[+k - 1][1]); }
      else if (/^[a-z]$/i.test(k)) { mark(k.toLowerCase(), true); clack(); seen(k.toUpperCase()); setKeys((n) => n + 1); setBuf((b) => (b + k.toLowerCase()).slice(-16)); }
      else if (k === 'Backspace') { clack(); seen('⌫'); setKeys((n) => n + 1); setBuf((b) => b.slice(0, -1)); }
      else if (k === 'Enter' && tag !== 'A' && tag !== 'BUTTON') { clack(); seen('↵'); runRef.current(bufRef.current); }
      else if (k === 'Escape') { seen('esc'); setBuf(''); setHelp(false); }
    };
    const onUp = (e) => mark(e.key.toLowerCase(), false);
    const clear = () => setPressed(new Set());
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', clear);
    };
  }, []);

  useEffect(() => {
    const els = NAV.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;scroll-padding-top:96px}
    body{background-color:${t.bg};
      background-image:radial-gradient(${t.border} 1.2px, transparent 1.2px);background-size:24px 24px;
      color:${t.text};font-family:'Bricolage Grotesque',system-ui,sans-serif;transition:background-color .4s,color .4s;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.5}
    a{color:inherit;text-decoration:none}
    button{font:inherit;color:inherit}
    ::selection{background:${t.accent};color:${t.accentInk}}
    :focus-visible{outline:2px solid ${t.accent};outline-offset:3px;border-radius:8px}
    .mono{font-family:'JetBrains Mono',ui-monospace,monospace}
    .wrap{max-width:1240px;margin:0 auto;padding:0 clamp(18px,4vw,48px)}
    .sec{padding:clamp(70px,9vw,130px) 0}
    .h2{font-weight:800;font-size:clamp(40px,7vw,96px);line-height:.95;letter-spacing:-.045em}

    /* ═════ KEYCAP ═════ */
    .key{--kc:#E8E1D1;--ks:#B3AA94;--kt:#26262B;--lift:5px;
      position:relative;display:inline-flex;align-items:center;justify-content:center;
      min-width:44px;height:46px;padding:0 16px;margin-bottom:var(--lift);border:0;border-radius:11px;cursor:pointer;
      font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12.5px;font-weight:600;letter-spacing:.01em;
      color:var(--kt);background:var(--kc);white-space:nowrap;user-select:none;-webkit-tap-highlight-color:transparent;
      box-shadow:0 var(--lift) 0 var(--ks),0 calc(var(--lift) + 7px) 16px -5px rgba(0,0,0,.55);
      transition:transform .07s ease,box-shadow .07s ease,filter .2s}
    .key::before{content:'';position:absolute;inset:3px 4px 5px;border-radius:8px;pointer-events:none;
      background:radial-gradient(120% 90% at 50% 0%,rgba(255,255,255,.34),rgba(255,255,255,0) 62%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.1));
      box-shadow:inset 0 1px 0 rgba(255,255,255,.5),inset 0 -3px 5px rgba(0,0,0,.16),inset 1px 0 0 rgba(255,255,255,.12),inset -1px 0 0 rgba(0,0,0,.08)}
    .key::after{content:'';position:absolute;left:12%;right:12%;top:2px;height:1px;border-radius:1px;background:rgba(255,255,255,.55);filter:blur(.5px);pointer-events:none}
    .kcap{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px}
    .key:hover{filter:brightness(1.07)}
    .key:active,.key.down{transform:translateY(calc(var(--lift) - 1px));
      box-shadow:0 1px 0 var(--ks),0 3px 6px -2px rgba(0,0,0,.5)}
    .key.static{cursor:default;pointer-events:none}
    .key.sm{height:38px;min-width:38px;padding:0 13px;border-radius:9px;--lift:4px;font-size:11.5px}
    .key.sm::before{inset:2px 3px 4px;border-radius:7px}
    .key.huge{height:clamp(120px,17vw,180px);padding:0 clamp(30px,5vw,70px);border-radius:28px;--lift:16px;
      font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(24px,3.8vw,48px);font-weight:700;letter-spacing:-.03em}
    .key.huge::before{inset:9px 12px 16px;border-radius:20px}
    .key.huge .kcap{gap:16px}
    .k-coral{--kc:#F2603F;--ks:#AE3920;--kt:#fff}
    .k-sage{--kc:#8DBB9C;--ks:#58866A;--kt:#10261A}
    .k-blue{--kc:#6F97D1;--ks:#41639A;--kt:#0C1A2E}
    .k-yellow{--kc:#EBBE4F;--ks:#AE8924;--kt:#2A2108}
    .k-graph{--kc:#353841;--ks:#181A1F;--kt:#ECE6D6}
    .kn{opacity:.55;font-size:10px}
    .led{width:6px;height:6px;border-radius:50%;background:var(--led,#555);box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .led.on{background:var(--led);box-shadow:0 0 8px var(--led)}

    /* ═════ CASE (keyboard body) ═════ */
    .case{position:relative;border-radius:26px;border:1px solid ${t.borderStrong};
      background:linear-gradient(180deg,${t.surface2},${t.surface});
      box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 40px 80px -44px rgba(0,0,0,.85)}
    .case::before,.case::after{content:'';position:absolute;top:12px;width:7px;height:7px;border-radius:50%;
      background:radial-gradient(circle at 35% 30%,${t.faint},${t.border});box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
    .case::before{left:14px}.case::after{right:14px}

    /* ═════ NAV ═════ */
    .nav{position:fixed;top:14px;left:0;right:0;z-index:600;padding:0 clamp(12px,3vw,32px);pointer-events:none}
    .nav-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;
      padding:10px 14px 4px;border-radius:20px;pointer-events:auto;
      background:${t.bg}ee;backdrop-filter:blur(18px) saturate(1.6);-webkit-backdrop-filter:blur(18px) saturate(1.6);
      border:1px solid ${t.borderStrong};box-shadow:0 24px 50px -28px rgba(0,0,0,.8)}
    .nav-in{position:relative}
    .nav-group{display:flex;align-items:center;gap:6px}
    @media(max-width:1020px){.nav-sec .kl{display:none}.nav-sec .key{padding:0 12px}}
    @media(max-width:760px){.nav-name{display:none}.nav-in{padding:8px 8px 2px;gap:4px}.nav-group{gap:4px}.nav-sec .key{min-width:34px;padding:0 8px}.nav-resume .kl{display:none}}
    .nav-fn{display:none}
    @media(max-width:760px){.nav-fn{display:inline}}
    @media(max-width:520px){.nav-sound{display:none}}

    .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(28px,5vw,64px);align-items:start}
    @media(max-width:860px){.split{grid-template-columns:1fr}.sticky-l{position:static!important}}

    /* ═════ HERO ═════ */
    .hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(28px,4vw,56px);align-items:center}
    @media(max-width:960px){.hero-grid{grid-template-columns:1fr}}
    .term{background:#0B0C0F;border-radius:14px;border:1px solid rgba(255,255,255,.08);padding:14px 16px;color:#D9D4C5;
      font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.7;min-height:112px;box-shadow:inset 0 2px 12px rgba(0,0,0,.6)}
    .term .dim{color:rgba(217,212,197,.5)}
    .term .caret{display:inline-block;width:7px;height:14px;background:${t.accent};vertical-align:-2px;margin-left:2px;animation:blink 1s steps(1) infinite}
    .vrow{display:flex;justify-content:center;gap:5px;margin-top:7px}
    .vk{flex:1 1 0;min-width:0;max-width:46px;padding:0;height:clamp(32px,8.4vw,44px);font-size:clamp(10px,2.6vw,13px);--lift:4px}
    .vk.wide{max-width:none;flex:3 1 0}
    .vk.num{flex:1.35 1 0;max-width:62px}
    .vk.num .kcap{flex-direction:column;gap:0;line-height:1.05}
    .vk-n{font-size:clamp(11px,2.8vw,14px);font-weight:700}
    .vk-s{font-size:clamp(7px,1.9vw,8.5px);opacity:.75;font-weight:500}
    .rgb-glow{position:absolute;inset:-26px -18px -34px;border-radius:44px;z-index:0;filter:blur(38px);opacity:.34;pointer-events:none;
      background:conic-gradient(from 0deg,#FF6B4A,#EBBE4F,#8DBB9C,#6F97D1,#A78BFA,#F472B6,#FF6B4A);transition:opacity .25s}
    .rgb-glow:not(.cycle){background:${t.accent}}
    .rgb-glow.cycle{animation:hue 8s linear infinite}
    .rgb-glow.hot{opacity:.72}
    .typed{color:${t.accent};font-weight:700}
    .caret-t{display:inline-block;width:3px;height:.9em;margin-left:3px;vertical-align:-.1em;background:${t.accent};animation:blink 1s steps(1) infinite}

    /* ═════ CARDS ═════ */
    .plate{border-radius:18px;border:1px solid ${t.border};background:${t.surface};transition:border-color .3s}
    .plate:hover{border-color:${t.borderStrong}}
    .grp{display:inline-flex;align-items:center;gap:8px;padding:5px 11px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;
      background:var(--gc);color:var(--gk);box-shadow:0 3px 0 var(--gs)}
    .pcard{display:grid;grid-template-columns:1.15fr 1fr;width:100%;height:min(76vh,620px);border-radius:30px;overflow:hidden;
      border:1px solid ${t.borderStrong};background:linear-gradient(180deg,${t.surface2},${t.surface});padding:14px;gap:14px;
      box-shadow:0 44px 90px -44px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.08)}
    @media(max-width:860px){.pcard{grid-template-columns:1fr;grid-template-rows:36% 1fr;height:min(84vh,680px);border-radius:24px;padding:10px;gap:10px}}
    .pcard img{transition:transform .9s cubic-bezier(.22,1,.36,1)}
    .pcard:hover img{transform:scale(1.04)}
    .pill{display:inline-flex;align-items:center;padding:5px 12px;border-radius:7px;border:1px solid ${t.border};font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:500;background:${t.surface2};color:${t.dim}}

    .grp-btn{border:0;cursor:pointer;margin-bottom:3px;text-align:left;transition:transform .07s,box-shadow .07s}
    .grp-btn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--gs)}
    .ai-key{transition:opacity .35s,filter .35s,transform .07s,box-shadow .07s}
    .ai-key.off{opacity:.3;filter:saturate(.25);box-shadow:0 var(--lift) 0 var(--ks)}
    .keyviz{position:fixed;left:clamp(14px,3vw,28px);bottom:clamp(14px,3vw,28px);display:flex;gap:8px;z-index:500;pointer-events:none}
    @media(max-width:640px){.keyviz{display:none}}
    .contact-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:center}
    @media(max-width:860px){.contact-grid{grid-template-columns:1fr}}
    .cf-l{display:block;font-size:11px;color:${t.faint};margin-bottom:6px}
    .cf{width:100%;background:#0B0C0F;color:#D9D4C5;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 14px;margin-bottom:16px;
      font-family:'JetBrains Mono',monospace;font-size:13.5px;resize:vertical;box-shadow:inset 0 2px 10px rgba(0,0,0,.6)}
    .cf::placeholder{color:rgba(217,212,197,.35)}
    .cf:focus{outline:2px solid ${t.accent};outline-offset:2px}
    .help-back{position:fixed;inset:0;z-index:900;background:rgba(5,6,9,.7);backdrop-filter:blur(6px);display:grid;place-items:center;padding:20px}
    .reel-card.picked .reel-poster{box-shadow:0 0 0 3px var(--c),0 30px 60px -20px var(--c)}
    .reel-card.picked{transform:translateY(-10px)}
    .ai-board{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:flex-end;padding:26px 22px 18px}
    .ai-key{--kc:#33363F;--ks:#16181D;--kt:var(--c);font-family:'Bricolage Grotesque',sans-serif;font-weight:700;letter-spacing:-.01em}
    .ai-key{box-shadow:0 var(--lift) 0 var(--ks),0 calc(var(--lift) + 4px) 22px -6px var(--c)}
    .ai-key:hover .kcap{text-shadow:0 0 12px var(--c)}
    .ai-key:active,.ai-key.down{box-shadow:0 1px 0 var(--ks),0 2px 16px -4px var(--c)}
    .ai-key .ai-dot{width:6px;height:6px;border-radius:50%;background:var(--c);box-shadow:0 0 8px var(--c)}
    .ai-key.w3{height:58px;padding:0 26px;font-size:16px}
    .ai-key.w2{height:50px;padding:0 20px;font-size:14px}
    .ai-key.w1{height:44px;padding:0 16px;font-size:13px}

    .mail-link{background:linear-gradient(currentColor,currentColor) 0 100%/0% 3px no-repeat;transition:background-size .5s cubic-bezier(.22,1,.36,1),color .3s}
    .mail-link:hover{background-size:100% 3px;color:${t.accent}}
    .status{display:flex;gap:18px;flex-wrap:wrap;align-items:center;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:${t.dim}}
    .status span{display:inline-flex;align-items:center;gap:8px}

    .scroll-top{position:fixed;right:clamp(16px,3vw,30px);bottom:clamp(14px,3vw,28px);z-index:500}

    /* ═════ MUSIC ═════ */
    .mpp-wrap{position:relative;isolation:isolate}
    .mpp-glow{position:absolute;inset:-40px;border-radius:60px;z-index:-1;pointer-events:none;filter:blur(56px);opacity:.55;transition:background 1s ease}
    .mpp{position:relative;border-radius:26px;overflow:hidden;color:#ECE6D6;background:linear-gradient(180deg,#1A1C23,#101116);border:1px solid rgba(255,255,255,.1);box-shadow:0 50px 100px -44px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.07)}
    .mpp-inner{position:relative;z-index:1;padding:22px 24px 18px}
    .mpp-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(236,230,214,.6)}
    .mpp-body{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:24px;align-items:center}
    @media(max-width:760px){.mpp-body{grid-template-columns:1fr;gap:16px}}
    .mpp-video{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000;box-shadow:0 24px 50px -20px rgba(0,0,0,.85),0 0 0 6px #0A0B0E,0 0 0 7px rgba(255,255,255,.1)}
    .mpp-video > div,.mpp-video iframe{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important}
    .mpp-video-cover{position:absolute;inset:0;background:linear-gradient(140deg,var(--c0),var(--c1));z-index:2;display:grid;place-items:center;font-weight:800;font-size:72px;color:rgba(255,255,255,.96);transition:opacity .6s,transform .6s;pointer-events:none;letter-spacing:-.04em}
    .mpp-video-cover.hide{opacity:0;transform:scale(1.08)}
    .mpp-info{min-width:0}
    .mpp-title{font-weight:800;font-size:clamp(22px,2.6vw,32px);line-height:1.05;letter-spacing:-.03em;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .mpp-artist{font-size:13.5px;color:rgba(236,230,214,.68);margin-bottom:14px}
    .mpp-wave{position:relative;display:flex;align-items:center;gap:1.8px;height:30px;cursor:pointer;user-select:none}
    .mpp-wave-bar{flex:1;border-radius:1.5px;min-width:1.2px}
    .mpp-wave-cursor{position:absolute;top:-4px;bottom:-4px;width:1.8px;border-radius:99px;pointer-events:none;transform:translateX(-50%);background:rgba(255,255,255,.95)}
    .mpp-wave-tip{position:absolute;bottom:calc(100% + 10px);transform:translateX(-50%);padding:4px 9px;border-radius:7px;background:rgba(0,0,0,.92);font-size:11px;font-family:'JetBrains Mono',monospace;color:#fff;pointer-events:none;white-space:nowrap}
    .mpp-times{display:flex;justify-content:space-between;font-size:11px;color:rgba(236,230,214,.6);font-family:'JetBrains Mono',monospace;margin-top:6px}
    .mpp-bar{display:flex;align-items:center;gap:14px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);flex-wrap:wrap}
    .mpp-transport{display:flex;align-items:center;gap:8px}
    .mpp-vol{display:flex;align-items:center;gap:8px;margin-left:auto;min-width:150px}
    @media(max-width:640px){.mpp-vol{margin-left:0;flex:1;min-width:0}}
    .mpp-vol-track{flex:1;height:6px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden;cursor:pointer}
    .mpp-vol-fill{height:100%;background:linear-gradient(90deg,var(--c0),var(--c1));transition:width .2s}
    .mpp-playlist{display:flex;gap:8px;margin-top:16px;padding:6px 2px 10px;border-top:1px solid rgba(255,255,255,.08);overflow-x:auto;scrollbar-width:thin;align-items:center}
    .mpp-playlist::-webkit-scrollbar{height:3px}
    .mpp-playlist::-webkit-scrollbar-thumb{background:rgba(255,255,255,.18);border-radius:99px}
    .mpp-playlist .key{flex-shrink:0;margin-top:12px}
    .mpp-eq{display:inline-flex;align-items:flex-end;gap:2px;height:11px}
    .mpp-eq i{width:2.5px;background:currentColor;border-radius:1px;animation:eq 1s ease-in-out infinite}
    .mpp-eq i:nth-child(2){animation-delay:.15s}.mpp-eq i:nth-child(3){animation-delay:.3s}
    .mpp-keys{margin-left:auto;display:flex;align-items:center;gap:6px;color:rgba(236,230,214,.45);font-size:10.5px;flex-shrink:0;padding-left:12px;font-family:'JetBrains Mono',monospace}

    /* ═════ REEL ═════ */
    .reel-filters{display:flex;gap:8px 10px;flex-wrap:wrap;margin-bottom:22px;align-items:center}
    .reel-dot{width:7px;height:7px;border-radius:50%}
    .reel-scroll-wrap{position:relative}
    .reel-scroll{display:flex;gap:16px;overflow-x:auto;padding:6px 4px 22px;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:${t.borderStrong} transparent}
    .reel-scroll::-webkit-scrollbar{height:4px}
    .reel-scroll::-webkit-scrollbar-thumb{background:${t.borderStrong};border-radius:99px}
    .reel-card{position:relative;flex-shrink:0;width:clamp(150px,17vw,200px);scroll-snap-align:start;transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .reel-card:hover{transform:translateY(-6px)}
    .reel-poster{position:relative;width:100%;aspect-ratio:2/3;border-radius:14px;overflow:hidden;background:linear-gradient(140deg,var(--c-44),var(--c-33));border:1px solid ${t.border};box-shadow:0 14px 30px -14px rgba(0,0,0,.55);transition:box-shadow .4s}
    .reel-card:hover .reel-poster{box-shadow:0 28px 60px -22px var(--c),0 0 0 1px var(--c-66)}
    .reel-poster img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:1}
    .reel-poster-fade{position:absolute;inset:auto 0 0 0;height:45%;background:linear-gradient(180deg,transparent,rgba(0,0,0,.75));pointer-events:none;z-index:2}
    .reel-meta{position:absolute;top:9px;left:9px;padding:3px 8px;border-radius:6px;background:rgba(0,0,0,.7);font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:600;color:#fff;border:1px solid rgba(255,255,255,.16);display:inline-flex;align-items:center;gap:5px;z-index:4}
    .reel-meta i{width:4px;height:4px;border-radius:50%;background:var(--c)}
    .reel-info{padding:12px 4px 0}
    .reel-name{font-weight:700;font-size:clamp(14px,1.3vw,16px);line-height:1.2;letter-spacing:-.015em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .reel-subline{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:${t.faint};margin-top:3px}
    .reel-nav{position:absolute;top:34%;z-index:5}
    .reel-nav.left{left:-10px}.reel-nav.right{right:-10px}
    @media(max-width:900px){.reel-nav{display:none}}

    @keyframes blink{50%{opacity:0}}
    @keyframes hue{from{filter:blur(38px) hue-rotate(0deg)}to{filter:blur(38px) hue-rotate(360deg)}}
    @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}
    @keyframes eq{0%,100%{height:30%}50%{height:100%}}
    @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
  `;

  const gcMap = {
    accent: { gc: t.accent, gk: '#fff', gs: dark ? '#9C3016' : '#A8341A' },
    warm: { gc: '#EBBE4F', gk: '#2A2108', gs: '#AE8924' },
    mint: { gc: '#8DBB9C', gk: '#10261A', gs: '#58866A' },
  };

  return (
    <>
      <style>{css}</style>
      <a href="#experience" style={{ position: 'absolute', left: -999 }}>Skip to content</a>
      <ScrollTop />
      <KeyViz recent={recent} />
      <HelpModal open={help} onClose={() => setHelp(false)} />

      {/* ═════ NAV: a row of keys ═════ */}
      <header className="nav">
        <div className="nav-in">
          <div className="nav-group">
            <Key color="coral" href="#top" label="Home">
              <span className="nav-name">Faizan Nasim</span>
              <span className="nav-fn">FN</span>
            </Key>
          </div>

          <nav aria-label="Primary" className="nav-group nav-sec">
            {NAV.map(([l, id], i) => (
              <Key key={id} color="graph" size="sm" href={`#${id}`}
                down={active === id || pressed.has(String(i + 1))}>
                <span className="kn">{i + 1}</span><span className="kl">{l}</span>
              </Key>
            ))}
          </nav>

          <div className="nav-group">
            <Key color="graph" size="sm" label={`Key sound: ${SND_NAMES[snd]}`} className="nav-sound" onClick={() => setSnd((n) => (n + 1) % 4)} down={snd > 0}>
              {snd ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="kl">{SND_NAMES[snd]}</span>
              <span className={`led${snd ? ' on' : ''}`} style={{ '--led': t.mint }} />
            </Key>
            <Key color="graph" size="sm" label="Keyboard shortcuts" className="nav-sound" onClick={() => setHelp(true)}>?</Key>
            <Key color="graph" size="sm" label="Toggle theme" onClick={() => setDark((d) => !d)}>
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </Key>
            <Key color="cream" size="sm" className="nav-resume" target="_blank"
              href="https://drive.google.com/file/d/1fjrdhe3k8yrxq8kD_gFdiGlL2OFNoz71/view?usp=sharing">
              <span className="kl">Resume</span> <ArrowUpRight size={13} />
            </Key>
          </div>
          <NavProgress />
        </div>
      </header>

      <main style={{ paddingTop: 'clamp(100px,10vw,120px)' }}>
        <Hero t={t} buf={buf} msg={msg} pressed={pressed} keys={keys} rgb={rgb}
          onType={(ch) => { setKeys((n) => n + 1); setBuf((b) => (b + ch).slice(-16)); }}
          onBack={() => { setKeys((n) => n + 1); setBuf((b) => b.slice(0, -1)); }}
          onClear={() => setBuf('')}
          onJump={(id) => { setKeys((n) => n + 1); setMsg(`opening ${id}`); jump(id); }}
          onEnter={() => runRef.current(bufRef.current)} />

        {/* <Specs t={t} /> */}

        {/* ═════ EXPERIENCE ═════ */}
        <section id="experience" className="sec">
          <div className="wrap split">
            <div className="sticky-l" style={{ position: 'sticky', top: 120 }}>
              <Reveal>
                <Key color="graph" size="sm" className="static"><span className="kn">press</span>1</Key>
                <h2 className="h2" style={{ marginTop: 18 }}>Where I work now</h2>
              </Reveal>
            </div>

            <div>
              {EXPERIENCE.map((exp, ei) => (
                <Reveal key={exp.company} delay={ei * 0.08}>
                  <div className="case" style={{ padding: '30px 24px 24px', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <span className="key k-coral sm static" style={{ minWidth: 38 }}>
                        <span className="kcap" style={{ fontFamily: 'Bricolage Grotesque', fontSize: 16, fontWeight: 800 }}>{exp.logo}</span>
                      </span>
                      <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-.02em' }}>{exp.company}</span>
                      {exp.current && (
                        <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: t.mint, fontWeight: 600 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.mint, animation: 'pulseDot 2s infinite' }} />
                          current
                        </span>
                      )}
                      <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: t.faint }}>{exp.location}</span>
                    </div>

                    <div className="mono" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10, fontSize: 12 }}>
                      <span style={{ color: t.accent, fontWeight: 600 }}>{exp.role}</span>
                      <span style={{ color: t.faint }}>{exp.date}</span>
                    </div>
                    {/* <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                      {exp.tech.map((x) => <span key={x} className="pill">{x}</span>)}
                    </div> */}

                    <div style={{ height: 1, background: t.border, margin: '20px 0 18px' }} />

                    <ExpGroups groups={exp.groups} gcMap={gcMap} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═════ RECOGNITION ═════ */}
        <section id="recognition" style={{ paddingBottom: 'clamp(60px,8vw,110px)' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 16 }}>
            {RECOGNITION.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="plate" style={{ padding: '22px 24px', height: '100%' }}>
                  <Key color="yellow" size="sm" className="static">★ {r.year}</Key>
                  <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.02em', marginTop: 14, lineHeight: 1.25 }}>{r.title}</div>
                  <div style={{ fontSize: 14, color: t.dim, marginTop: 8, lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═════ AI ═════ */}
        <section id="ai" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
              <Key color="graph" size="sm" className="static"><span className="kn">press</span>2</Key>
              <h2 className="h2" style={{ margin: '18px 0 24px' }}>Building with AI</h2>
              <p style={{ fontSize: 'clamp(17px,1.9vw,21px)', color: t.dim, maxWidth: 660, lineHeight: 1.65, marginBottom: 'clamp(28px,4vw,48px)' }}>
                Frontend taught me how people use software. AI engineering is what happens behind the screen: orchestrating retrieval architectures, building multi-step agents, and connecting precise tool calls. I build across both worlds.
              </p>
            </Reveal>
            <Reveal delay={0.05}><AIBoard /></Reveal>
          </div>
        </section>

        {/* ═════ WORK ═════ */}
        <section id="work" style={{ paddingTop: 'clamp(40px,6vw,80px)' }}>
          <div className="wrap" style={{ marginBottom: 'clamp(30px,5vw,60px)' }}>
            <Reveal>
              <Key color="graph" size="sm" className="static"><span className="kn">press</span>3</Key>
              <h2 className="h2" style={{ marginTop: 18 }}>Proof of work</h2>
            </Reveal>
          </div>
          <WorkStack t={t} />
        </section>

        <OffTime t={t} />
        <Contact t={t} />
      </main>
    </>
  );
}

/* ───────────── MOTION BLOCKS ───────────── */
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function Typer({ words }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    let id;
    if (!del && n === w.length) id = setTimeout(() => setDel(true), 1600);
    else if (del && n === 0) { setDel(false); setI((i + 1) % words.length); }
    else id = setTimeout(() => setN(n + (del ? -1 : 1)), del ? 35 : 70);
    return () => clearTimeout(id);
  }, [n, del, i, words]);
  return <span className="typed">{words[i].slice(0, n)}<span className="caret-t" /></span>;
}

function Count({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* Shows the last few keys you pressed, like a screencast overlay */
function KeyViz({ recent }) {
  return (
    <div className="keyviz" aria-hidden>
      <AnimatePresence>
        {recent.map((r) => (
          <motion.span key={r.id} initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
            <span className="key k-cream sm static"><span className="kcap">{r.label}</span></span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

const SHORTCUTS = [
  [['1', '–', '5'], 'Jump to a section'],
  [['A', '–', 'Z'], 'Type into the hero terminal'],
  [['↵'], 'Run the command you typed'],
  [['⌫'], 'Delete a character'],
  [['esc'], 'Clear input or close this sheet'],
  [['Space'], 'Play or pause the music player'],
  [['←', '→'], 'Seek 5 seconds in the player'],
  [['↑', '↓'], 'Change the player volume'],
  [['?'], 'Show or hide this sheet'],
];

function HelpModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="help-back" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.div className="case" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}
            style={{ width: 'min(520px,100%)', padding: '36px 24px 24px', maxHeight: '88vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.04em' }}>Shortcuts</h2>
              <Key color="graph" size="sm" onClick={onClose} label="Close shortcuts">esc</Key>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SHORTCUTS.map(([ks, d]) => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ display: 'inline-flex', gap: 6, minWidth: 120, alignItems: 'center' }}>
                    {ks.map((k, i) => k === '–'
                      ? <span key={i} className="mono" style={{ opacity: 0.5 }}>to</span>
                      : <span key={i} className="key k-cream sm static" style={{ height: 30, minWidth: 30, padding: '0 9px' }}><span className="kcap">{k}</span></span>)}
                  </span>
                  <span style={{ fontSize: 14.5, opacity: 0.85 }}>{d}</span>
                </div>
              ))}
            </div>
            <div className="mono" style={{ marginTop: 22, fontSize: 12, opacity: 0.6, lineHeight: 1.7 }}>
              Terminal commands: experience, ai, work, music, contact, theme, sound, rgb, help
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Specs({ t }) {
  const colors = [t.accent, t.warm, t.mint, t.blue];
  return (
    <section aria-label="Impact at a glance" style={{ paddingBottom: 'clamp(30px,5vw,60px)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
        {SPECS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="case" style={{ padding: '30px 20px 20px' }}>
              <div style={{ fontSize: 'clamp(44px,5vw,68px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: colors[i] }}>
                <Count to={s.to} suffix={s.suffix} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 10 }}>{s.label}</div>
              <div className="mono" style={{ fontSize: 11.5, color: t.faint, marginTop: 4, lineHeight: 1.5 }}>{s.note}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExpGroups({ groups, gcMap }) {
  const [open, setOpen] = useState(() => groups.map(() => true));
  const all = open.every(Boolean);
  const toggle = (i) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <Key color="graph" size="sm" onClick={() => setOpen(groups.map(() => !all))}>{all ? 'Collapse all' : 'Expand all'}</Key>
      </div>
      {groups.map((g, gi) => {
        const cm = gcMap[g.color] || gcMap.accent;
        return (
          <div key={gi} style={{ marginBottom: gi < groups.length - 1 ? 18 : 0 }}>
            <button type="button" className="grp grp-btn" aria-expanded={open[gi]} onClick={() => { clack(); toggle(gi); }}
              style={{ '--gc': cm.gc, '--gk': cm.gk, '--gs': cm.gs }}>
              {g.title}
              <ChevronRight size={13} style={{ transform: open[gi] ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }} />
            </button>
            <AnimatePresence initial={false}>
              {open[gi] && (
                <motion.ul key="list" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ listStyle: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 14 }}>
                  {g.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.85, paddingLeft: 16, position: 'relative' }}>
                      <span aria-hidden style={{ position: 'absolute', left: 0, top: '.72em', width: 7, height: 2, borderRadius: 1, background: cm.gc }} />
                      {b}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* AI keys grouped into layers, like a QMK keymap */
function AIBoard() {
  const [layer, setLayer] = useState('all');
  const cur = LAYERS.find((l) => l.id === layer);
  const lit = AI_TAGS.filter((x) => layer === 'all' || AI_LAYER[x.name] === layer).length;
  return (
    <div className="case">
      <div style={{ padding: '34px 22px 0' }}>
        <div role="tablist" aria-label="AI skill layers" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {LAYERS.map((l) => (
            <Key key={l.id} color={layer === l.id ? 'blue' : 'graph'} size="sm" role="tab" aria-selected={layer === l.id}
              down={layer === l.id} onClick={() => setLayer(l.id)}>{l.label}</Key>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 12, opacity: 0.7, marginTop: 14, minHeight: 20 }}>{cur.desc}</div>
      </div>
      <div className="ai-board">
        {AI_TAGS.map((tag) => {
          const on = layer === 'all' || AI_LAYER[tag.name] === layer;
          return (
            <Key key={tag.name} className={`ai-key w${tag.w}${on ? '' : ' off'}`} style={{ '--c': tag.c }}>
              <span className="ai-dot" />{tag.name}
            </Key>
          );
        })}
      </div>
      <div className="mono" style={{ padding: '0 22px 18px', fontSize: 11.5, opacity: 0.55 }}>{lit} of {AI_TAGS.length} keys lit</div>
    </div>
  );
}

function ScrollTop() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollYProgress.on('change', (v) => setShow(v > 0.08)), [scrollYProgress]);
  return (
    <motion.div className="scroll-top" initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14, pointerEvents: show ? 'auto' : 'none' }}
      transition={{ duration: 0.3, ease: EASE }}>
      <Key color="coral" label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={16} />
      </Key>
    </motion.div>
  );
}

function useLocalTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ───────────── HERO ───────────── */
const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function Hero(props) {
  const { t } = props;
  const name = ['Faizan', 'Nasim'];
  let n = 0;
  return (
    <section id="top" style={{ padding: 'clamp(20px,4vw,56px) 0 clamp(50px,6vw,90px)' }}>
      <div className="wrap hero-grid">
        <div>
          <div className="status" style={{ marginBottom: 'clamp(18px,2.5vw,30px)' }}>
            <span><i className="led on" style={{ '--led': t.mint }} />Available for work</span>
            <span>Frontend Developer & AI Engineer</span>
          </div>

          <h1 aria-label="Faizan Nasim" style={{ fontWeight: 800, fontSize: 'clamp(68px,11.5vw,176px)', lineHeight: 0.86, letterSpacing: '-.055em', marginBottom: 'clamp(24px,3vw,40px)' }}>
            {name.map((w, wi) => (
              <span key={w} aria-hidden style={{ display: 'block', color: wi ? t.accent : t.text }}>
                {w.split('').map((ch) => {
                  const d = 0.15 + n++ * 0.075;
                  return (
                    <motion.span key={n} style={{ display: 'inline-block' }}
                      initial={{ y: -22, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: d, duration: 0.22, ease: 'easeOut' }}>{ch}</motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p style={{ fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 600, letterSpacing: '-.025em', lineHeight: 1.3, minHeight: '2.6em', maxWidth: 560 }}>
            Frontend developer building <Typer words={ROLES} />
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: t.dim, marginTop: 4, maxWidth: 540 }}>
            I build responsive, API-driven web apps with React and Tailwind. Now I'm learning AI engineering, so the interfaces I build can sit on top of models, retrieval, and agents I understand end to end.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28, alignItems: 'center' }}>
            <Key color="coral" href="#work">See my work <ArrowDown size={15} /></Key>
            {[
              { Icon: Github, href: 'https://github.com/faizannasim', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/faizan-nasim-2262a930a/', label: 'LinkedIn' },
              { Icon: Twitter, href: 'https://x.com/FaizanNasim8', label: 'Twitter' },
              { Icon: BsYoutube, href: 'https://www.youtube.com/@CodeWithFaizan-x8w/videos', label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <Key key={label} color="graph" size="sm" href={href} target="_blank"><Icon size={14} />{label}</Key>
            ))}
          </div>
        </div>

        <HeroBoard {...props} />
      </div>
    </section>
  );
}

const SUB = ['exp', 'ai', 'work', 'life', 'mail'];

function HeroBoard({ t, buf, msg, pressed, keys, rgb, onType, onBack, onClear, onJump, onEnter }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 16 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  const hot = pressed.size > 0;
  return (
    <motion.div style={{ position: 'relative', perspective: 1100 }}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }}>
      <div aria-hidden className={`rgb-glow${rgb ? ' cycle' : ''}${hot ? ' hot' : ''}`} />
      <motion.div className="case" onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, zIndex: 1, padding: '30px 18px 18px' }}>
        <div className="term" aria-live="polite">
          <div className="dim">faizan@desk ~ press 1–5 to jump, or type a command</div>
          <div><span style={{ color: t.mint }}>$</span> {buf}<span className="caret" /></div>
          <div className="dim" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>{msg}</span><span style={{ flexShrink: 0 }}>{keys} keystrokes</span>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="vrow">
            <Key color="graph" className="vk" onClick={onClear} label="Clear input">esc</Key>
            {NAV.map(([l, id], i) => (
              <Key key={id} color="blue" className="vk num" down={pressed.has(String(i + 1))} onClick={() => onJump(id)} label={`Jump to ${l}`}>
                <span className="vk-n">{i + 1}</span><span className="vk-s">{SUB[i]}</span>
              </Key>
            ))}
          </div>
          {ROWS.map((row, ri) => (
            <div key={row} className="vrow" style={{ paddingLeft: ri === 1 ? '2.5%' : 0, paddingRight: ri === 1 ? '2.5%' : 0 }}>
              {row.split('').map((ch) => (
                <Key key={ch} color="cream" className="vk" down={pressed.has(ch)} onClick={() => onType(ch)} label={`Key ${ch}`}>
                  {ch.toUpperCase()}
                </Key>
              ))}
              {ri === 2 && <Key color="graph" className="vk" onClick={onBack} label="Backspace">⌫</Key>}
            </div>
          ))}
          <div className="vrow" style={{ padding: '0 8%' }}>
            <Key color="coral" className="vk wide" onClick={onEnter} label="Run command">
              <CornerDownLeft size={14} /> enter
            </Key>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NavProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div aria-hidden style={{
      scaleX: scrollYProgress, transformOrigin: '0 50%', position: 'absolute', left: 14, right: 14, bottom: -1, height: 2, borderRadius: 2,
      background: 'linear-gradient(90deg,#FF6B4A,#EBBE4F,#8DBB9C,#6F97D1,#A78BFA)',
    }} />
  );
}

/* ───────────── WORK STACK ───────────── */
function WorkStack({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref}>
      {PROJECTS.map((p, i) => <StackCard key={p.title} p={p} i={i} n={PROJECTS.length} progress={scrollYProgress} t={t} />)}
    </div>
  );
}

function StackCard({ p, i, n, progress, t }) {
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i) * 0.03]);
  return (
    <div style={{ height: '100vh', position: 'sticky', top: 0, display: 'flex', alignItems: 'center', padding: '90px 0 0' }}>
      <div className="wrap" style={{ width: '100%' }}>
        <motion.article className="pcard" style={{ scale, y: i * 14, transformOrigin: 'top center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 18, background: `linear-gradient(135deg, ${p.c}55, ${t.surface2})`, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', background: 'rgba(8,9,12,.82)', flexShrink: 0 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.85 }} />)}
              <span className="mono" style={{ marginLeft: 10, flex: 1, minWidth: 0, padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,.07)', color: 'rgba(236,230,214,.65)', fontSize: 10.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.live ? p.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'github.com/faizannasim'}
              </span>
            </div>
            <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
              <img src={p.img} alt={`${p.title} screenshot`} loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </div>
          </div>
          <div style={{ padding: 'clamp(12px,2vw,28px)', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(10px,2vh,22px)' }}>
              <Key color="graph" size="sm" className="static">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</Key>
              {p.kpi && (
                <span style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1, color: p.c }}>{p.kpi}</span>
                  <span className="mono" style={{ display: 'block', fontSize: 11, color: t.faint }}>{p.kpiLabel}</span>
                </span>
              )}
            </div>
            <h3 style={{ fontSize: 'clamp(42px,5.6vw,80px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-.05em' }}>{p.title}</h3>
            <div className="mono" style={{ fontSize: 13, color: p.c, fontWeight: 600, margin: '10px 0 14px' }}>{p.sub}, {p.year}</div>
            <p style={{ fontSize: 'clamp(14.5px,1.25vw,16.5px)', color: t.dim, lineHeight: 1.65 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '16px 0' }}>
              {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 8, flexWrap: 'wrap' }}>
              {p.live && <Key color="coral" href={p.live} target="_blank"><ExternalLink size={14} />Live site</Key>}
              <Key color="cream" href={p.gh} target="_blank"><Github size={14} />Code</Key>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

/* ───────────── OFF-TIME ───────────── */
function OffTime({ t }) {
  const [tab, setTab] = useState('music');
  return (
    <section id="life" className="sec" style={{ paddingTop: 'clamp(20px,3vw,40px)', paddingBottom: 0 }}>
      <div className="wrap">
        <Reveal>
          <Key color="graph" size="sm" className="static"><span className="kn">press</span>4</Key>
          <h2 className="h2" style={{ margin: '18px 0 20px' }}>Away from the keyboard</h2>
          <p style={{ fontSize: 'clamp(17px,1.9vw,21px)', color: t.dim, maxWidth: 660, lineHeight: 1.65, marginBottom: 'clamp(24px,3.5vw,40px)' }}>
            What goes on when the code editor closes. Lo-fi for deep debugging, cinematic stories for pacing and detail, and a lot of hacking films for the vibe.
          </p>
        </Reveal>

        <div role="tablist" aria-label="Off-time content" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[['music', 'Music', Music2], ['reel', 'Reel Life', Film]].map(([id, label, Icon]) => (
            <Key key={id} color={tab === id ? 'coral' : 'graph'} down={tab === id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
              <Icon size={15} />{label}
            </Key>
          ))}
        </div>

        <div style={{ marginTop: 28, position: 'relative' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>
              {tab === 'music' ? <MusicPanel t={t} /> : <ReelPanel t={t} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function MusicPanel({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <MusicPlayer t={t} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 20 }}>
        <a href="https://www.youtube.com/@CodeWithFaizan-x8w/videos" target="_blank" rel="noopener noreferrer" className="case"
          style={{ padding: '34px 26px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 190 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Key color="coral" size="sm" className="static"><BsYoutube size={16} /></Key>
            <ArrowUpRight size={22} />
          </div>
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 6 }}>CodeWithFaizan</div>
            <div style={{ fontSize: 14.5, color: t.dim }}>Watch my coding tutorials on YouTube</div>
          </div>
        </a>

        <div className="case" style={{ padding: '34px 26px 26px' }}>
          <div className="mono" style={{ fontSize: 12, color: t.accent, fontWeight: 700, marginBottom: 10 }}>Headphones on</div>
          <p style={{ fontSize: 15, color: t.dim, lineHeight: 1.6, marginBottom: 18 }}>Locked in for deep debugging, complex architecture designs, and late-night building.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['The Verve', 'Linkin Park', 'Green Day', 'Coke Studio', 'Nirvana'].map((g) => <span key={g} className="pill">{g}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── REEL ───────────── */
function ReelPanel({ t }) {
  const scrollRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [picked, setPicked] = useState('');
  const nudge = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  const items = filter === 'all' ? REEL : REEL.filter((r) => r.cats.includes(filter));
  const surprise = () => {
    if (!items.length) return;
    const i = Math.floor(Math.random() * items.length);
    setPicked(items[i].title);
    const el = scrollRef.current && scrollRef.current.children[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setTimeout(() => setPicked(''), 2600);
  };

  return (
    <div>
      <div className="reel-filters" role="tablist" aria-label="Filter reel">
        {REEL_CATS.map((c) => {
          const on = filter === c.id;
          return (
            <Key key={c.id} color="graph" size="sm" role="tab" aria-selected={on} down={on}
              onClick={() => { setFilter(c.id); scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' }); }}>
              <span className="reel-dot" style={{ background: c.dot, boxShadow: on ? `0 0 8px ${c.dot}` : 'none' }} />{c.label}
            </Key>
          );
        })}
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <Key color="yellow" size="sm" onClick={surprise}><Shuffle size={13} />Surprise me</Key>
          <span className="mono" style={{ fontSize: 12, color: t.faint }}>{items.length} titles</span>
        </span>
      </div>

      <div className="reel-scroll-wrap">
        <Key color="cream" size="sm" className="reel-nav left" onClick={() => nudge(-1)} label="Scroll left"><ChevronLeft size={16} /></Key>
        <Key color="cream" size="sm" className="reel-nav right" onClick={() => nudge(1)} label="Scroll right"><ChevronRight size={16} /></Key>
        <div className="reel-scroll" ref={scrollRef}>
          {items.map((r, i) => (
            <motion.div key={`${r.title}-${filter}`} className={`reel-card${picked === r.title ? ' picked' : ''}`}
              style={{ '--c': r.c, '--c-33': `${r.c}33`, '--c-44': `${r.c}44`, '--c-66': `${r.c}66` }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.35), ease: EASE }}>
              <div className="reel-poster">
                <img src={r.poster} alt={`${r.title} poster`} loading="lazy" referrerPolicy="no-referrer" />
                <div className="reel-poster-fade" />
                <div className="reel-meta"><i />{r.type}</div>
              </div>
              <div className="reel-info">
                <div className="reel-name">{r.title}</div>
                <div className="reel-subline">{r.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── MUSIC PLAYER ───────────── */
function MusicPlayer({ t }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].dur);
  const [vol, setVol] = useState(0.72);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [hoverPct, setHoverPct] = useState(null);
  const [ready, setReady] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const ytRef = useRef(null);
  const ytContainerRef = useRef(null);
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const idxRef = useRef(idx);
  const repeatRef = useRef(repeat);
  const shuffleRef = useRef(shuffle);

  const track = TRACKS[idx];
  const [c0, c1] = track.c;

  const wave = useMemo(() => Array.from({ length: 72 }, (_, i) => {
    const a = Math.abs(Math.sin(i * 0.71) * Math.cos(i * 0.29));
    const b = Math.abs(Math.sin(i * 0.13 + 1.3));
    return 0.2 + ((a + b) / 2) * 0.8;
  }), []);

  useEffect(() => { idxRef.current = idx; }, [idx]);
  useEffect(() => { repeatRef.current = repeat; }, [repeat]);
  useEffect(() => { shuffleRef.current = shuffle; }, [shuffle]);

  useEffect(() => {
    if (window.YT && window.YT.Player) { setApiReady(true); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); setApiReady(true); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    if (!apiReady || ytRef.current || !ytContainerRef.current) return;
    ytRef.current = new window.YT.Player(ytContainerRef.current, {
      videoId: TRACKS[0].yt,
      playerVars: {
        autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1, rel: 0, iv_load_policy: 3,
        origin: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
      events: {
        onReady: () => { setReady(true); try { ytRef.current.setVolume(Math.round(vol * 100)); } catch {} },
        onStateChange: (e) => {
          const YT = window.YT;
          if (!YT) return;
          if (e.data === YT.PlayerState.PLAYING) { setPlaying(true); setVideoStarted(true); }
          else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
          else if (e.data === YT.PlayerState.ENDED) {
            if (repeatRef.current) { ytRef.current.seekTo(0); ytRef.current.playVideo(); }
            else {
              const ni = shuffleRef.current ? Math.floor(Math.random() * TRACKS.length) : (idxRef.current + 1) % TRACKS.length;
              setIdx(ni); setElapsed(0); setVideoStarted(false);
              ytRef.current.loadVideoById(TRACKS[ni].yt);
            }
          }
        },
      },
    });
  }, [apiReady]);

  useEffect(() => {
    if (!ready) return;
    const p = ytRef.current;
    if (!p || !p.playVideo) return;
    try { if (playing) p.playVideo(); else p.pauseVideo(); } catch {}
  }, [playing, ready]);

  useEffect(() => {
    if (!ready) return;
    const p = ytRef.current;
    if (!p || !p.setVolume) return;
    try {
      p.setVolume(Math.round((muted ? 0 : vol) * 100));
      if (muted) p.mute(); else p.unMute();
    } catch {}
  }, [vol, muted, ready]);

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => {
      const p = ytRef.current;
      if (!p || !p.getCurrentTime) return;
      try {
        setElapsed(p.getCurrentTime() || 0);
        const d = p.getDuration();
        if (d && isFinite(d) && d > 0) setDuration(d);
      } catch {}
    }, 500);
    return () => clearInterval(id);
  }, [ready]);

  const load = (ni) => {
    setIdx(ni); setElapsed(0); setVideoStarted(false);
    if (ready && ytRef.current && ytRef.current.loadVideoById) ytRef.current.loadVideoById(TRACKS[ni].yt);
  };
  const go = (d) => load(shuffle ? Math.floor(Math.random() * TRACKS.length) : (idx + d + TRACKS.length) % TRACKS.length);
  const pick = (i) => {
    if (i === idx) { setPlaying((p) => !p); return; }
    load(i); setPlaying(true);
  };

  const seekTo = (pct) => {
    const p = ytRef.current;
    if (!p || !p.seekTo) return;
    const dur = (p.getDuration && p.getDuration()) || duration;
    try { p.seekTo(pct * dur, true); setElapsed(pct * dur); } catch {}
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.4), { threshold: [0, 0.4, 0.7] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Space, arrows control the player while it is on screen */
  useEffect(() => {
    if (!inView) return;
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
      if (e.code === 'Space') { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.code === 'ArrowRight') { e.preventDefault(); seekTo(Math.min(0.999, (elapsed + 5) / (duration || track.dur))); }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); seekTo(Math.max(0, (elapsed - 5) / (duration || track.dur))); }
      else if (e.code === 'ArrowUp') { e.preventDefault(); setVol((v) => Math.min(1, v + 0.05)); setMuted(false); }
      else if (e.code === 'ArrowDown') { e.preventDefault(); setVol((v) => Math.max(0, v - 0.05)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, elapsed, duration, track.dur]);

  const pct = Math.min(100, (duration ? elapsed / duration : 0) * 100);
  const headIdx = Math.floor((pct / 100) * wave.length);

  return (
    <div className="mpp-wrap" ref={rootRef}>
      <div aria-hidden className="mpp-glow" style={{
        background: `radial-gradient(45% 70% at 12% 0%, ${c0}77, transparent 70%), radial-gradient(50% 70% at 100% 100%, ${c1}77, transparent 70%)`,
      }} />
      <div className="mpp case" style={{ '--c0': c0, '--c1': c1 }}>
        <div className="mpp-inner" style={{ paddingTop: 34 }}>
          <div className="mpp-head">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <i className={`led${playing ? ' on' : ''}`} style={{ '--led': t.mint }} />
              {playing ? 'playing' : 'paused'}, {String(idx + 1).padStart(2, '0')}/{String(TRACKS.length).padStart(2, '0')}
            </span>
            <span>{ready ? 'YouTube ready' : 'loading player…'}</span>
          </div>

          <div className="mpp-body">
            <div className="mpp-video">
              <div ref={ytContainerRef} />
              <div className={`mpp-video-cover${videoStarted || playing ? ' hide' : ''}`} aria-hidden>{track.title.charAt(0)}</div>
            </div>

            <div className="mpp-info">
              <div className="mpp-title">{track.title}</div>
              <div className="mpp-artist">{track.artist}</div>

              <div role="slider" tabIndex={0} aria-label="Seek" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={elapsed}
                className="mpp-wave"
                onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seekTo(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))); }}
                onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setHoverPct(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))); }}
                onMouseLeave={() => setHoverPct(null)}>
                {wave.map((h, i) => {
                  const past = i <= headIdx;
                  return (
                    <span key={i} className="mpp-wave-bar" style={{
                      height: `${h * 100}%`,
                      background: past ? `linear-gradient(180deg, ${c1}, ${c0})` : 'rgba(255,255,255,0.13)',
                    }} />
                  );
                })}
                {hoverPct !== null && (
                  <>
                    <div aria-hidden className="mpp-wave-cursor" style={{ left: `${hoverPct}%` }} />
                    <div className="mpp-wave-tip" style={{ left: `${hoverPct}%` }}>{fmt((hoverPct / 100) * (duration || track.dur))}</div>
                  </>
                )}
              </div>
              <div className="mpp-times">
                <span>{fmt(elapsed)}</span>
                <span>−{fmt(Math.max(0, (duration || track.dur) - elapsed))}</span>
              </div>
            </div>
          </div>

          <div className="mpp-bar">
            <div className="mpp-transport">
              <Key color="graph" size="sm" down={shuffle} onClick={() => setShuffle((s) => !s)} label="Shuffle"><Shuffle size={14} /></Key>
              <Key color="graph" onClick={() => go(-1)} label="Previous track"><SkipBack size={16} /></Key>
              <Key color="coral" onClick={() => setPlaying((p) => !p)} label={playing ? 'Pause' : 'Play'} style={{ minWidth: 72 }}>
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </Key>
              <Key color="graph" onClick={() => go(1)} label="Next track"><SkipForward size={16} /></Key>
              <Key color="graph" size="sm" down={repeat} onClick={() => setRepeat((r) => !r)} label="Repeat"><Repeat size={14} /></Key>
            </div>

            <div className="mpp-vol">
              <Key color="graph" size="sm" onClick={() => setMuted((m) => !m)} label="Mute">
                {muted || vol === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </Key>
              <div role="slider" tabIndex={0} aria-label="Volume" aria-valuemin={0} aria-valuemax={100}
                aria-valuenow={Math.round((muted ? 0 : vol) * 100)} className="mpp-vol-track"
                onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setVol(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))); setMuted(false); }}>
                <div className="mpp-vol-fill" style={{ width: `${(muted ? 0 : vol) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="mpp-playlist">
            {TRACKS.map((tr, i) => {
              const on = i === idx;
              return (
                <Key key={tr.title} color={on ? 'coral' : 'graph'} size="sm" down={on} onClick={() => pick(i)}>
                  {on && playing ? <span className="mpp-eq" aria-hidden><i /><i /><i /></span> : <span className="kn">{String(i + 1).padStart(2, '0')}</span>}
                  <span>{tr.title}</span>
                  <span className="kn">{fmt(tr.dur)}</span>
                </Key>
              );
            })}
            <div className="mpp-keys">
              <span className="key k-graph sm static" style={{ minWidth: 0, height: 26, padding: '0 8px', fontSize: 10 }}><span className="kcap">Space</span></span>
              <span className="key k-graph sm static" style={{ minWidth: 0, height: 26, padding: '0 8px', fontSize: 10 }}><span className="kcap">← →</span></span>
              <span className="key k-graph sm static" style={{ minWidth: 0, height: 26, padding: '0 8px', fontSize: 10 }}><span className="kcap">↑ ↓</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── CONTACT: one giant Enter key ───────────── */
function Contact({ t }) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`Hello from ${name || 'your portfolio'}`)}&body=${encodeURIComponent(note)}`;
  const time = useLocalTime();
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { window.location.href = `mailto:${EMAIL}`; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const timeStr = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <section id="contact" style={{ padding: 'clamp(70px,9vw,130px) 0 0' }}>
      <div className="wrap">
        <Reveal>
          <Key color="graph" size="sm" className="static"><span className="kn">press</span>5</Key>
          <h2 className="h2" style={{ fontSize: 'clamp(52px,11vw,170px)', letterSpacing: '-.055em', margin: '18px 0 0' }}>
            Let's build<br /><span style={{ color: t.accent }}>something good</span>
          </h2>
          <p style={{ fontSize: 18, color: t.dim, lineHeight: 1.7, margin: '24px 0 36px', maxWidth: 520 }}>
            Open to frontend roles, AI projects, and collaborations. Small idea or big vision, send me a message.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="contact-grid">
            <div className="case" style={{ padding: '34px 22px 22px' }}>
              <label className="mono cf-l" htmlFor="cf-name">your name</label>
              <input id="cf-name" className="cf" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tim Cook" autoComplete="name" />
              <label className="mono cf-l" htmlFor="cf-note">message</label>
              <textarea id="cf-note" className="cf" rows={5} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell me about the role or project…" />
              <div className="mono" style={{ fontSize: 11, color: t.faint }}>{note.length} characters. Sending opens your email app.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20,  }}>
              <Key color="coral" className="small" href={mailto} style={{ alignSelf: 'flex-start ' }}>
                Send <CornerDownLeft size={30} />
              </Key>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Key color={copied ? 'sage' : 'cream'} onClick={copy} aria-live="polite">
                  {copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Email copied' : 'Copy email'}
                </Key>
                <Key color="graph" href="https://www.linkedin.com/in/faizan-nasim-2262a930a/" target="_blank"><Linkedin size={15} />LinkedIn</Key>
              </div>
              <a href={`mailto:${EMAIL}`} className="mono mail-link" style={{ fontSize: 'clamp(13px,1.6vw,17px)', wordBreak: 'break-all', paddingBottom: 4, color: t.dim }}>{EMAIL}</a>
            </div>
          </div>
        </Reveal>

        <div className="case" style={{ marginTop: 'clamp(50px,7vw,90px)', marginBottom: 28, padding: '26px 22px 18px', borderRadius: 20 }}>
          <div className="status" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center' }}>
              <span><i className="led on" style={{ '--led': t.mint }} />Delhi, India {timeStr} IST</span>
              <span><i className="led on" style={{ '--led': t.warm }} />© {new Date().getFullYear()} Faizan Nasim</span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <Key color="graph" size="sm" className="static" style={{ height: 26, minWidth: 26, padding: '0 8px' }}>?</Key>shortcuts
              </span>
              <a href="#top" style={{ color: t.dim }}>Back to top</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
