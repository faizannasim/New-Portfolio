import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Linkedin, Mail, Twitter, ExternalLink, Moon, Sun, ArrowUpRight, ArrowDown, Check, Copy,
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX,
  Sparkles, Zap, Command, ArrowUp, ChevronLeft, ChevronRight, Film, Music2,
} from 'lucide-react';
import { BsYoutube } from 'react-icons/bs';
import {
  motion, AnimatePresence, useScroll, useSpring, useInView, animate, useTransform, useMotionValue,
} from 'framer-motion';

/* ───────────── THEME ───────────── */
const T = {
  dark: {
    bg: '#07060D', surface: '#11101C', surface2: '#1A1830',
    border: 'rgba(242,239,233,0.08)', borderStrong: 'rgba(242,239,233,0.2)',
    text: '#F5F2EC', dim: 'rgba(245,242,236,0.82)', faint: 'rgba(245,242,236,0.5)',
    accent: '#A78BFA', accentInk: '#0A0A0F', warm: '#FF8A65', mint: '#5EEBB0',
  },
  light: {
    bg: '#F5F3F9', surface: '#FFFFFF', surface2: '#EBE7F5',
    border: 'rgba(21,19,42,0.08)', borderStrong: 'rgba(21,19,42,0.2)',
    text: '#131128', dim: 'rgba(19,17,40,0.82)', faint: 'rgba(19,17,40,0.52)',
    accent: '#6B4CFF', accentInk: '#FFFFFF', warm: '#F0532F', mint: '#0EA36B',
  },
};

/* ───────────── CONTENT ───────────── */
const EMAIL = 'faizannasim59@gmail.com';
const ROLES = ['clean React interfaces.', 'API-driven dashboards.', 'AI-powered products.', 'fast, responsive apps.'];

const IMPACT = [
  { to: 30, label: 'Faster page loads', note: 'Average load time' },
  { to: 40, label: 'Fewer reported issues', note: 'After component cleanup' },
  { to: 35, label: 'Better device support', note: 'Cross-device compatibility' },
];
const RECOGNITION = [
  { title: 'Best Project Award 2024', desc: 'Real-time Emotion Detection System, Greater Noida Institute of Technology', year: '2024' },
  { title: 'Generative AI certificate', desc: 'Microsoft and LinkedIn: prompt engineering and applied GenAI', year: '2024' },
];

/* ─── Experience groups (future companies me bhi same structure use karo) ─── */
const EXPERIENCE = [
  {
    company: 'GEDU Services',
    logo: 'G',
    role: 'Associate Frontend Developer',
    date: 'Dec 2025 — Present',
    location: 'Noida, India',
    current: true,
    groups: [
      {
        title: 'Multi-Role Dashboards & Brand Management',
        color: 'accent',
        bullets: [
          <>Developed <b>10+ responsive pages</b> across multi-role dashboards (Student, Admin, Instructor) in React.js integrated with REST APIs, optimizing data-fetching logic to improve <b>page load speed by 30%</b>.</>,
          <>Designed a secure <b>Brand Management portal</b> enforcing strict Role-Based Access Control (RBAC) to restrict university onboarding to Super Admin users, strengthening platform security and data integrity.</>,
        ],
      },
      {
        title: 'Refund Tracking & Reporting Modules',
        color: 'warm',
        bullets: [
  <>Built a <b>Refund Tracking module</b> integrated with backend APIs to surface real-time status across a sequential approval workflow (starting from step 1 post-initiation), showing approver identity, remarks, and timestamps at every stage for full audit visibility.</>,
  <>Developed a <b>Reporting module</b> integrated with backend APIs to consolidate user details across all roles into a single view, complete with one-click Excel export for audits and offline analysis.</>,
]
      },
      {
        title: 'Platform-Wide Optimization & QA',
        color: 'mint',
        bullets: [
          <>Resolved critical UI and data-flow issues platform-wide, reducing <b>reported bugs by 40%</b> across 3 distinct user roles.</>,
        ],
      },
    ],
  },
  // 👇 Future companies: same structure add karo (groups optional)
];

const AI_TAGS = [
  { name: 'LangChain',          c: '#5EEBB0', w: 3 },
  { name: 'RAG',                c: '#A78BFA', w: 3 },
  { name: 'AI Agents',          c: '#FF8A65', w: 3 },
  { name: 'LLMs',               c: '#61D4F5', w: 3 },
  { name: 'LangGraph',          c: '#61D4F5', w: 2 },
  { name: 'OpenAI',             c: '#5EEBB0', w: 2 },
  { name: 'ChromaDB',           c: '#F472B6', w: 2 },
  { name: 'Pinecone',           c: '#F59E0B', w: 2 },
  { name: 'Prompt Engineering', c: '#FF8A65', w: 2 },
  { name: 'GenAI',              c: '#A78BFA', w: 2 },
  { name: 'Embeddings',         c: '#5EEBB0', w: 2 },
  { name: 'Vector DB',          c: '#F59E0B', w: 1 },
  { name: 'MCP',                c: '#61D4F5', w: 1 },
  { name: 'Tool Calling',       c: '#A78BFA', w: 1 },
  { name: 'Function Calling',   c: '#FF8A65', w: 1 },
  { name: 'Chunking',           c: '#F472B6', w: 1 },
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
  { title: 'Bitter Sweet Symphony',      artist: 'The Verve',          dur: 358, yt: '1lyu1KKwC74', c: ['#A78BFA', '#FF8A65'] },
  { title: "You're Beautiful",           artist: 'James Blunt',        dur: 209, yt: 'r00ikilDxW4', c: ['#F472B6', '#A78BFA'] },
  { title: '21 Guns',                    artist: 'Green Day',          dur: 321, yt: 'oofSnsGkops', c: ['#5EEBB0', '#61D4F5'] },
  { title: 'Boulevard of Broken Dreams', artist: 'Green Day',          dur: 262, yt: 'Soa3gO7tL-c', c: ['#5EEBB0', '#22D3EE'] },
  { title: 'Stressed Out',               artist: 'Twenty One Pilots',  dur: 202, yt: 'pXRviuL6vMY', c: ['#FF8A65', '#F472B6'] },
  { title: 'In The End',                 artist: 'Linkin Park',        dur: 216, yt: 'eVTXPUF4Oz4', c: ['#61D4F5', '#A78BFA'] },
  { title: 'Numb',                       artist: 'Linkin Park',        dur: 187, yt: 'kXYiU_JCYtU', c: ['#8B5CF6', '#61D4F5'] },
  { title: 'Faint',                      artist: 'Linkin Park',        dur: 162, yt: 'LYU-8IFcDPw', c: ['#EF4444', '#8B5CF6'] },
  { title: 'One More Light',             artist: 'Linkin Park',        dur: 255, yt: 'TfW-aS6YVH8', c: ['#A78BFA', '#F472B6'] },
  { title: "What I've Done",             artist: 'Linkin Park',        dur: 205, yt: '8sgycukafqQ', c: ['#22D3EE', '#5EEBB0'] },
  { title: 'Something In The Way',       artist: 'Nirvana',            dur: 232, yt: '4VxdufqB9zg', c: ['#94A3B8', '#5EEBB0'] },
  { title: 'The Reason',                 artist: 'Hoobastank',         dur: 233, yt: 'fV4DiAyExN0', c: ['#F59E0B', '#FF8A65'] },
  { title: 'Sammi Meri Waar',            artist: 'Coke Studio',        dur: 385, yt: 'KHLNSxe5Y8A', c: ['#F59E0B', '#F472B6'] },
  { title: 'Pasoori',                    artist: 'Coke Studio',        dur: 258, yt: '5Eqb_-j3FDA', c: ['#F59E0B', '#FB923C'] },
  { title: 'Afreen Afreen',              artist: 'Coke Studio',        dur: 404, yt: 'kvRl0v7Jr7E', c: ['#F472B6', '#A78BFA'] },
];

const IMG = (p) => `https://image.tmdb.org/t/p/w500${p}`;

const REEL = [
  { title: 'The Social Network',  year: '2010', type: 'Code',    cats: ['code'],           poster: IMG('/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg'), c: '#4ADE9F' },
  { title: 'The Matrix',          year: '1999', type: 'Hacking', cats: ['code','mind'],    poster: IMG('/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'), c: '#5EEBB0' },
  { title: 'Mr. Robot',           year: '2015', type: 'Series',  cats: ['code','series'],  poster: IMG('/oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg'), c: '#EF4444' },
  { title: 'Person of Interest',  year: '2011', type: 'Series',  cats: ['code','series','mind'], poster: IMG('/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg'), c: '#61D4F5' },
  { title: 'The Imitation Game',  year: '2014', type: 'Code',    cats: ['code'],           poster: IMG('/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg'), c: '#F59E0B' },
  { title: 'Ex Machina',          year: '2014', type: 'AI',      cats: ['code','mind'],    poster: IMG('/btbRB7BrD887j5NrvjxceRDmaot.jpg'), c: '#A78BFA' },
  { title: 'Her',                 year: '2013', type: 'AI',      cats: ['code','mind'],    poster: IMG('/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg'), c: '#F472B6' },
  { title: 'Ghost in the Shell',  year: '1995', type: 'Anime',   cats: ['anime','code'],   poster: IMG('/9gC88zYUBARRSThcG93MvW14sqx.jpg'), c: '#8B5CF6' },
  { title: 'Ready Player One',    year: '2018', type: 'Sci-Fi',  cats: ['code'],           poster: IMG('/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg'), c: '#22D3EE' },
  { title: 'Inception',           year: '2010', type: 'Mind',    cats: ['mind'],           poster: IMG('/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'), c: '#94A3B8' },
  { title: 'Interstellar',        year: '2014', type: 'Mind',    cats: ['mind'],           poster: IMG('/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'), c: '#5B7FFF' },
  { title: 'Memento',             year: '2000', type: 'Mind',    cats: ['mind'],           poster: IMG('/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg'), c: '#F59E0B' },
  { title: 'Shutter Island',      year: '2010', type: 'Mind',    cats: ['mind'],           poster: IMG('/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg'), c: '#64748B' },
  { title: 'The Prestige',        year: '2006', type: 'Mind',    cats: ['mind'],           poster: IMG('/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg'), c: '#A78BFA' },
  { title: 'Fight Club',          year: '1999', type: 'Mind',    cats: ['mind'],           poster: IMG('/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'), c: '#EF4444' },
  { title: 'Donnie Darko',        year: '2001', type: 'Mind',    cats: ['mind'],           poster: IMG('/fhQoQfejY1hUcwyuLgpBrYs6uFt.jpg'), c: '#6B7280' },
  { title: 'Arrival',             year: '2016', type: 'Mind',    cats: ['mind'],           poster: IMG('/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg'), c: '#475569' },
  { title: 'Tenet',               year: '2020', type: 'Mind',    cats: ['mind'],           poster: IMG('/k68nPLbIST6NP96JmTxmZijEvMk.jpg'), c: '#FB923C' },
  { title: 'Eternal Sunshine',    year: '2004', type: 'Mind',    cats: ['mind'],           poster: IMG('/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg'), c: '#F472B6' },
  { title: 'The Truman Show',     year: '1998', type: 'Mind',    cats: ['mind'],           poster: IMG('/vuza0WqY239yBXOadKlGwJsZJFE.jpg'), c: '#22D3EE' },
  { title: 'Oldboy',              year: '2003', type: 'Mind',    cats: ['mind'],           poster: IMG('/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg'), c: '#DC2626' },
  { title: 'Mulholland Drive',    year: '2001', type: 'Mind',    cats: ['mind'],           poster: IMG('/tVxGt7uffLVhIIcwuldXOMpFBPX.jpg'), c: '#8B5CF6' },
  { title: 'Blade Runner 2049',   year: '2017', type: 'Mind',    cats: ['mind'],           poster: IMG('/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg'), c: '#FB923C' },
  { title: 'Breaking Bad',        year: '2008', type: 'Series',  cats: ['series'],         poster: IMG('/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'), c: '#4ADE9F' },
  { title: 'Dark',                year: '2017', type: 'Series',  cats: ['series','mind'],  poster: IMG('/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg'), c: '#475569' },
  { title: 'Severance',           year: '2022', type: 'Series',  cats: ['series','mind'],  poster: IMG('/lFf6LLrQjYldcZItzOkGmMMigP7.jpg'), c: '#22D3EE' },
  { title: 'Iron Man',            year: '2008', type: 'Marvel',  cats: ['marvel'],         poster: IMG('/78lPtwv72eTNqFW9COBYI0dWDJa.jpg'), c: '#E62429' },
  { title: 'Avengers: Endgame',   year: '2019', type: 'Marvel',  cats: ['marvel'],         poster: IMG('/or06FN3Dka5tukK1e9sl16pB3iy.jpg'), c: '#A78BFA' },
  { title: 'Avengers: Infinity War', year: '2018', type: 'Marvel', cats: ['marvel'],       poster: IMG('/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'), c: '#A78BFA' },
  { title: 'Spider-Verse',        year: '2018', type: 'Marvel',  cats: ['marvel','anime'], poster: IMG('/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg'), c: '#F472B6' },
  { title: 'Guardians of the Galaxy', year: '2014', type: 'Marvel', cats: ['marvel'],      poster: IMG('/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'), c: '#F59E0B' },
  { title: 'Doctor Strange',      year: '2016', type: 'Marvel',  cats: ['marvel','mind'],  poster: IMG('/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg'), c: '#22D3EE' },
  { title: 'Black Panther',       year: '2018', type: 'Marvel',  cats: ['marvel'],         poster: IMG('/uxzz6RgbNccnXmH8gjkrGVdTKIG.jpg'), c: '#8B5CF6' },
  { title: 'Loki',                year: '2021', type: 'Series',  cats: ['marvel','series'], poster: IMG('/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg'), c: '#4ADE9F' },
  { title: 'The Dark Knight',     year: '2008', type: 'DC',      cats: ['dc'],             poster: IMG('/qJ2tW6WMUDux911r6m7haRef0WH.jpg'), c: '#E5B14A' },
  { title: 'Joker',               year: '2019', type: 'DC',      cats: ['dc','mind'],      poster: IMG('/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'), c: '#7DD3FC' },
  { title: 'The Batman',          year: '2022', type: 'DC',      cats: ['dc'],             poster: IMG('/74xTEgt7R36Fpooo50r9T25onhq.jpg'), c: '#94A3B8' },
  { title: 'Batman Begins',       year: '2005', type: 'DC',      cats: ['dc'],             poster: IMG('/8RW2runSEc34IwKN2D1aPcJd2UL.jpg'), c: '#475569' },
  { title: 'Watchmen',            year: '2009', type: 'DC',      cats: ['dc'],             poster: IMG('/uuDeL1cJQIN0RWpwJCLEeopjRlq.jpg'), c: '#F59E0B' },
  { title: 'Your Name',           year: '2016', type: 'Anime',   cats: ['anime'],          poster: IMG('/q719jXXEzOoYaps6babgKnONONX.jpg'), c: '#FF7A9C' },
  { title: 'Spirited Away',       year: '2001', type: 'Anime',   cats: ['anime'],          poster: IMG('/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'), c: '#5EEBB0' },
  { title: 'My Neighbor Totoro',  year: '1988', type: 'Anime',   cats: ['anime'],          poster: IMG('/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg'), c: '#5EEBB0' },
  { title: 'Princess Mononoke',   year: '1997', type: 'Anime',   cats: ['anime'],          poster: IMG('/cMYCDADoLKLbB83gWnJegaZimC.jpg'), c: '#4ADE9F' },
  { title: "Howl's Moving Castle",year: '2004', type: 'Anime',   cats: ['anime'],          poster: IMG('/TkTPELv4kC3u1lkloush8skOjE.jpg'), c: '#F59E0B' },
  { title: 'Attack on Titan',     year: '2013', type: 'Anime',   cats: ['anime','series'], poster: IMG('/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg'), c: '#FF8A65' },
  { title: 'Death Note',          year: '2006', type: 'Anime',   cats: ['anime','series','mind'], poster: IMG('/tCZFfYTIwrR7n94J6G14OYYya3U.jpg'), c: '#EF4444' },
  { title: 'Demon Slayer',        year: '2019', type: 'Anime',   cats: ['anime','series'], poster: IMG('/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg'), c: '#4ADE9F' },
  { title: 'The Shawshank Redemption', year: '1994', type: 'Drama', cats: ['film'],        poster: IMG('/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'), c: '#8FA0B5' },
  { title: 'The Godfather',       year: '1972', type: 'Crime',   cats: ['film'],           poster: IMG('/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'), c: '#F59E0B' },
  { title: 'Pulp Fiction',        year: '1994', type: 'Crime',   cats: ['film'],           poster: IMG('/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'), c: '#DC2626' },
  { title: 'Parasite',            year: '2019', type: 'Drama',   cats: ['film'],           poster: IMG('/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'), c: '#A78BFA' },
  { title: 'Whiplash',            year: '2014', type: 'Drama',   cats: ['film'],           poster: IMG('/7fn624j5lj3xTme2SgiLCeuedmO.jpg'), c: '#F59E0B' },
  { title: 'Oppenheimer',         year: '2023', type: 'Drama',   cats: ['film'],           poster: IMG('/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'), c: '#FB923C' },
  { title: 'Dune',                year: '2021', type: 'Sci-Fi',  cats: ['film'],           poster: IMG('/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'), c: '#F59E0B' },
  { title: 'Gladiator',           year: '2000', type: 'Epic',    cats: ['film'],           poster: IMG('/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'), c: '#F59E0B' },
  { title: 'Forrest Gump',        year: '1994', type: 'Drama',   cats: ['film'],           poster: IMG('/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'), c: '#22D3EE' },
  { title: 'Django Unchained',    year: '2012', type: 'Western', cats: ['film'],           poster: IMG('/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg'), c: '#DC2626' },
  { title: 'Goodfellas',          year: '1990', type: 'Crime',   cats: ['film'],           poster: IMG('/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg'), c: '#DC2626' },
  { title: 'Se7en',               year: '1995', type: 'Thriller',cats: ['film','mind'],    poster: IMG('/6yoghtyTpznpBik8EngEmJskVUO.jpg'), c: '#475569' },
  { title: 'Léon: The Professional', year: '1994', type: 'Action', cats: ['film'],         poster: IMG('/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg'), c: '#F59E0B' },
  { title: 'Avatar',              year: '2009', type: 'Sci-Fi',  cats: ['film'],           poster: IMG('/kyeqWdyUXW608qlYkRqosgbbJyK.jpg'), c: '#22D3EE' },
];

const NAV = [
  ['Experience', 'experience'],
  ['AI', 'ai'],
  ['Work', 'work'],
  ['Off-time', 'life'],
  ['Contact', 'contact'],
];
const EASE = [0.22, 1, 0.36, 1];
const fmt = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

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

  const [active, setActive] = useState('');
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
     @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;scroll-padding-top:100px}
    body{background:${t.bg};color:${t.text};font-family:'Hanken Grotesk',system-ui,sans-serif;transition:background .4s,color .4s;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.5}
    a{color:inherit;text-decoration:none}
    button{font:inherit;color:inherit}
    ::selection{background:${t.accent};color:${t.accentInk}}
    :focus-visible{outline:2px solid ${t.accent};outline-offset:3px;border-radius:6px}
    .serif{font-family:'Instrument Serif',Georgia,serif;font-weight:400;letter-spacing:-.02em}
    .mono{font-family:'JetBrains Mono',ui-monospace,monospace}
    .wrap{max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}
    .sec{padding:clamp(80px,10vw,150px) 0}
    .h2{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:clamp(48px,8.5vw,128px);line-height:.95;letter-spacing:-.03em}
    .h2 i{color:${t.accent}}
    .pill{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:99px;border:1px solid ${t.border};font-size:14px;font-weight:500;background:${t.surface};transition:border-color .25s, transform .25s}
    .pill:hover{border-color:${t.accent}66;transform:translateY(-1px)}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:99px;font-size:15px;font-weight:600;transition:transform .25s,background .25s,border-color .25s,box-shadow .3s;cursor:pointer;border:1px solid transparent}
    .btn:hover{transform:translateY(-3px)}
    .btn-main{background:${t.text};color:${t.bg}}
    .btn-main:hover{box-shadow:0 16px 34px -14px ${t.text}88}
    .btn-line{border-color:${t.borderStrong};background:transparent}
    .btn-line:hover{border-color:${t.accent};background:${t.surface}}

    .nav{position:fixed;top:16px;left:0;right:0;z-index:600;padding:0 clamp(14px,4vw,40px);pointer-events:none}
    .nav-in{max-width:1240px;margin:0 auto;height:62px;display:flex;align-items:center;justify-content:space-between;gap:12px;
      background:${t.bg}f0;
      backdrop-filter:blur(26px) saturate(1.8);
      -webkit-backdrop-filter:blur(26px) saturate(1.8);
      border:1px solid ${t.borderStrong};
      border-radius:99px;
      padding:6px 8px 6px 24px;
      pointer-events:auto;
      box-shadow:0 28px 56px -28px rgba(0,0,0,.85), 0 0 0 1px ${t.border}, inset 0 1px 0 ${t.borderStrong}}
    .nav-logo{font-size:22px;line-height:1;color:${t.text};white-space:nowrap}
    .nav-logo sup{font-size:11px;color:${t.accent};margin-left:3px}
    .nav-links{display:flex;gap:2px}
    .nav-links a{padding:8px 12px;border-radius:99px;font-size:13.5px;font-weight:500;color:${t.dim};transition:background .2s,color .2s}
    .nav-links a:hover{color:${t.text}}
    .nav-links a.on{background:${t.surface2};color:${t.text}}
    @media(max-width:1020px){.nav-links{display:none}}

    .nav-resume{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:99px;font-size:13px;font-weight:700;
      background:${t.surface};color:${t.text};border:1px solid ${t.borderStrong};text-decoration:none;
      transition:transform .25s cubic-bezier(.22,1,.36,1),background .25s,border-color .25s,box-shadow .3s}
    .nav-resume:hover{transform:translateY(-1px);background:${t.surface2};border-color:${t.accent}88;box-shadow:0 10px 22px -10px ${t.accent}66}

    .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(28px,5vw,64px);align-items:start}
    @media(max-width:860px){.split{grid-template-columns:1fr}.sticky-l{position:static!important}}
    .row{display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:26px 0;border-top:1px solid ${t.border}}
    .exp-card{transition:border-color .3s, box-shadow .3s}
    .exp-card:hover{border-color:${t.accent}55;box-shadow:0 20px 44px -30px rgba(0,0,0,.6)}
    .rec-card{transition:border-color .3s, transform .3s}
    .rec-card:hover{border-color:${t.warm}55;transform:translateY(-2px)}
    .pcard{display:grid;grid-template-columns:1.15fr 1fr;width:100%;height:min(76vh,620px);border-radius:32px;overflow:hidden;border:1px solid ${t.borderStrong};background:${t.surface};box-shadow:0 44px 90px -44px rgba(0,0,0,.85), 0 0 0 1px ${t.border}, inset 0 1px 0 ${t.borderStrong}}
    @media(max-width:860px){.pcard{grid-template-columns:1fr;grid-template-rows:38% 1fr;height:min(84vh,680px);border-radius:24px}}
    .pcard img{transition:transform .9s cubic-bezier(.22,1,.36,1)}
    .pcard:hover img{transform:scale(1.04)}
    .grad{background:linear-gradient(90deg,${t.accent},${t.warm},${t.accent});background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 7s linear infinite}
    .caret{display:inline-block;width:2.5px;height:1em;margin-left:3px;vertical-align:-.12em;background:${t.accent};animation:blink 1s steps(1) infinite;box-shadow:0 0 14px ${t.accent}}
    .typed{color:${t.accent};text-shadow:0 0 34px ${t.accent}aa, 0 0 72px ${t.accent}55;font-weight:500}
    .badge{animation:spin 16s linear infinite}
    .mail-link{background:linear-gradient(currentColor,currentColor) 0 100%/0% 4px no-repeat;transition:background-size .55s cubic-bezier(.22,1,.36,1),color .3s}
    .mail-link:hover{background-size:100% 4px;color:${t.accent}}
    .lift{transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .35s}
    .lift:hover{transform:translateY(-5px);border-color:${t.accent}66;box-shadow:0 30px 60px -24px rgba(0,0,0,.7)}

    .grain{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:.045;mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
    @media(prefers-reduced-motion:reduce){.grain{display:none}}

    .ai-cloud{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
    .ai-tag{display:inline-flex;align-items:center;gap:9px;border-radius:99px;font-weight:600;letter-spacing:-.01em;cursor:default;position:relative;border:1px solid var(--c);color:var(--c);background:transparent;transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .35s,color .25s,background .3s,border-color .3s}
    .ai-tag:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 16px 36px -14px var(--c),0 0 0 4px var(--c-glow)}
    .ai-tag .ai-dot{width:7px;height:7px;border-radius:50%;background:var(--c);flex-shrink:0;box-shadow:0 0 10px var(--c);transition:box-shadow .3s,transform .3s}
    .ai-tag:hover .ai-dot{box-shadow:0 0 16px var(--c),0 0 0 3px var(--c-glow);transform:scale(1.15)}
    .ai-tag.w3{font-size:15px;padding:11px 22px}
    .ai-tag.w2{font-size:13.5px;padding:9px 18px}
    .ai-tag.w1{font-size:12.5px;padding:7px 15px}

    .scroll-top{position:fixed;right:clamp(18px,3vw,32px);bottom:clamp(18px,3vw,32px);width:48px;height:48px;border-radius:50%;border:1px solid ${t.borderStrong};background:${t.surface};color:${t.text};display:grid;place-items:center;cursor:pointer;z-index:500;box-shadow:0 14px 34px -12px rgba(0,0,0,.6);transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .3s,background .3s}
    .scroll-top:hover{transform:translateY(-3px);border-color:${t.accent}}
    .scroll-top svg.ring{position:absolute;inset:0;transform:rotate(-90deg);pointer-events:none}

    .tab-switch{display:inline-flex;gap:4px;padding:5px;border-radius:99px;border:1px solid ${t.border};background:${t.surface};position:relative}
    .tab-switch button{position:relative;display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:99px;border:none;background:transparent;cursor:pointer;font-size:14px;font-weight:500;color:${t.dim};transition:color .25s;z-index:0}
    .tab-switch button:hover{color:${t.text}}
    .tab-switch button.on{color:${t.text}}
    .tab-switch button .tab-label{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px}

    /* ═══════ MUSIC PLAYER ═══════ */
    .mpp-wrap{position:relative;isolation:isolate}
    .mpp-glow{position:absolute;inset:-50px;border-radius:60px;z-index:-1;pointer-events:none;filter:blur(56px);opacity:.85;transition:background 1s ease}
    .mpp{position:relative;border-radius:28px;overflow:hidden;color:#F5F2EC;background:linear-gradient(180deg,#0E0C18 0%,#08070E 100%);border:1px solid rgba(255,255,255,.09);box-shadow:0 50px 100px -40px rgba(0,0,0,.95), inset 0 1px 0 rgba(255,255,255,.06)}
    .mpp::before{content:'';position:absolute;inset:0;background:
      radial-gradient(800px circle at 0% -30%, var(--c0-66), transparent 55%),
      radial-gradient(700px circle at 100% 130%, var(--c1-66), transparent 60%);
      transition:background 1.1s ease;pointer-events:none;z-index:0;opacity:.6}
    .mpp-inner{position:relative;z-index:1;padding:22px 24px 18px}

    .mpp-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:20px}
    .mpp-brand{display:flex;align-items:center;gap:10px;font-size:10.5px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,242,236,.6)}
    .mpp-brand-dot{width:6px;height:6px;border-radius:50%;background:var(--c0);box-shadow:0 0 12px var(--c0);animation:pulseDot 2s ease-in-out infinite}
    .mpp-hq{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:99px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);font-size:10.5px;font-weight:600;color:rgba(245,242,236,.75);font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:.05em}

    .mpp-body{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:24px;align-items:center}
    @media(max-width:760px){.mpp-body{grid-template-columns:1fr;gap:16px}}

    .mpp-video{
      position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;
      background:#000;
      box-shadow:0 24px 50px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.2);
    }
    .mpp-video > div, .mpp-video iframe{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important}
    .mpp-video-cover{position:absolute;inset:0;background:linear-gradient(140deg,var(--c0),var(--c1));z-index:2;display:grid;place-items:center;
      font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:72px;color:rgba(255,255,255,.96);
      transition:opacity .6s ease, transform .6s ease;pointer-events:none;text-shadow:0 6px 24px rgba(0,0,0,.4);letter-spacing:-.04em}
    .mpp-video-cover.hide{opacity:0;transform:scale(1.08);pointer-events:none}

    .mpp-info{min-width:0;display:flex;flex-direction:column;justify-content:center}
    .mpp-status{display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(245,242,236,.65);margin-bottom:10px}
    .mpp-status-dot{width:6px;height:6px;border-radius:50%;transition:background .3s, box-shadow .3s}
    .mpp-title{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:clamp(22px,2.6vw,32px);line-height:1.05;letter-spacing:-.02em;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
      background:linear-gradient(100deg,#fff 30%,var(--c0),#fff 60%,var(--c1),#fff 90%);background-size:280% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:titleFlow 9s linear infinite}
    .mpp-artist{font-size:13px;color:rgba(245,242,236,.68);font-weight:500;margin-bottom:14px;letter-spacing:.01em}

    .mpp-wave{position:relative;display:flex;align-items:center;gap:1.8px;height:30px;cursor:pointer;user-select:none}
    .mpp-wave-bar{flex:1;border-radius:1.5px;min-width:1.2px;transition:background .3s ease, transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s}
    .mpp-wave-cursor{position:absolute;top:-4px;bottom:-4px;width:1.8px;border-radius:99px;pointer-events:none;transform:translateX(-50%);background:rgba(255,255,255,.95);box-shadow:0 0 12px rgba(255,255,255,.7)}
    .mpp-wave-tip{position:absolute;bottom:calc(100% + 10px);transform:translateX(-50%);padding:5px 10px;border-radius:8px;background:rgba(0,0,0,.92);backdrop-filter:blur(10px);font-size:11px;font-family:'JetBrains Mono',ui-monospace,monospace;color:#fff;pointer-events:none;white-space:nowrap;box-shadow:0 10px 24px rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.14)}
    .mpp-times{display:flex;justify-content:space-between;font-size:11px;color:rgba(245,242,236,.6);font-family:'JetBrains Mono',ui-monospace,monospace;margin-top:6px;letter-spacing:.03em}

    .mpp-bar{display:flex;align-items:center;gap:12px;margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08)}
    @media(max-width:640px){.mpp-bar{flex-wrap:wrap;gap:10px}}
    .mpp-transport{display:flex;align-items:center;gap:8px}
    .mpp-icon{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(245,242,236,.78);display:grid;place-items:center;cursor:pointer;transition:all .22s cubic-bezier(.22,1,.36,1);flex-shrink:0}
    .mpp-icon:hover{background:rgba(255,255,255,.11);color:#fff;transform:translateY(-1px);border-color:rgba(255,255,255,.22)}
    .mpp-icon.on{color:var(--c0);border-color:var(--c0-66);background:var(--c0-18)}
    .mpp-icon.sm{width:34px;height:34px}
    .mpp-play{width:58px;height:58px;border-radius:50%;border:none;color:#08070E;display:grid;place-items:center;cursor:pointer;position:relative;background:linear-gradient(135deg,var(--c0),var(--c1));box-shadow:0 18px 40px -12px var(--c0-dd), inset 0 1px 0 rgba(255,255,255,.45);transition:transform .25s cubic-bezier(.22,1,.36,1), box-shadow .35s;flex-shrink:0}
    .mpp-play:hover{transform:scale(1.07);box-shadow:0 22px 50px -12px var(--c0-aa), inset 0 1px 0 rgba(255,255,255,.45)}
    .mpp-play:active{transform:scale(.96)}
    .mpp-vol{display:flex;align-items:center;gap:9px;margin-left:auto;min-width:150px}
    @media(max-width:640px){.mpp-vol{margin-left:0;flex:1;min-width:0;max-width:none}}
    .mpp-vol-btn{width:30px;height:30px;border:none;background:transparent;color:rgba(245,242,236,.7);display:grid;place-items:center;cursor:pointer;border-radius:50%;transition:color .2s, background .2s;flex-shrink:0}
    .mpp-vol-btn:hover{color:#fff;background:rgba(255,255,255,.08)}
    .mpp-vol-track{flex:1;height:4px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden;cursor:pointer;position:relative}
    .mpp-vol-fill{height:100%;background:linear-gradient(90deg,var(--c0),var(--c1));transition:width .2s;border-radius:99px;box-shadow:0 0 10px var(--c0-aa)}

    .mpp-playlist{display:flex;gap:8px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);overflow-x:auto;scrollbar-width:thin;align-items:center}
    .mpp-playlist::-webkit-scrollbar{height:3px}
    .mpp-playlist::-webkit-scrollbar-thumb{background:rgba(255,255,255,.18);border-radius:99px}
    .mpp-chip{display:inline-flex;align-items:center;gap:9px;padding:8px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);cursor:pointer;font-size:12.5px;color:rgba(245,242,236,.7);transition:background .25s, border-color .25s, color .25s, transform .25s;white-space:nowrap;flex-shrink:0}
    .mpp-chip:hover{background:rgba(255,255,255,.08);color:#fff;transform:translateY(-1px)}
    .mpp-chip.on{background:var(--c0-18);border-color:var(--c0-66);color:#fff}
    .mpp-chip-num{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;opacity:.6;flex-shrink:0}
    .mpp-chip.on .mpp-chip-num{color:var(--c0);opacity:1}
    .mpp-chip-dot{width:5px;height:5px;border-radius:50%;background:var(--c0);flex-shrink:0}
    .mpp-eq{display:inline-flex;align-items:flex-end;gap:2px;height:11px}
    .mpp-eq i{width:2.5px;background:var(--c0);border-radius:1px;animation:eq 1s ease-in-out infinite;box-shadow:0 0 6px var(--c0)}
    .mpp-eq i:nth-child(1){animation-delay:0s}
    .mpp-eq i:nth-child(2){animation-delay:.15s}
    .mpp-eq i:nth-child(3){animation-delay:.3s}

    .mpp-keys{margin-left:auto;display:flex;align-items:center;gap:6px;color:rgba(245,242,236,.45);font-size:10.5px;flex-shrink:0;padding-left:12px}
    .mpp-key{padding:3px 8px;background:rgba(255,255,255,.06);border-radius:5px;border:1px solid rgba(255,255,255,.1);font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px}

    .reel-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;align-items:center}
    .reel-filter{padding:8px 16px;border-radius:99px;border:1px solid ${t.border};background:transparent;font-size:13px;font-weight:500;color:${t.dim};cursor:pointer;transition:border-color .25s,background .25s,color .25s,transform .25s;display:inline-flex;align-items:center;gap:8px}
    .reel-filter:hover{border-color:${t.borderStrong};color:${t.text};transform:translateY(-1px)}
    .reel-filter.on{background:${t.surface2};border-color:${t.accent};color:${t.text}}
    .reel-filter-dot{width:6px;height:6px;border-radius:50%}

    .reel-scroll-wrap{position:relative}
    .reel-scroll{display:flex;gap:16px;overflow-x:auto;padding:6px 4px 22px;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:${t.borderStrong} transparent}
    .reel-scroll::-webkit-scrollbar{height:4px}
    .reel-scroll::-webkit-scrollbar-thumb{background:${t.borderStrong};border-radius:99px}
    .reel-scroll::-webkit-scrollbar-track{background:transparent}
    .reel-card{position:relative;flex-shrink:0;width:clamp(160px,17vw,200px);scroll-snap-align:start;cursor:pointer;transition:transform .5s cubic-bezier(.22,1,.36,1)}
    .reel-card:hover{transform:translateY(-6px)}
    .reel-poster{position:relative;width:100%;aspect-ratio:2/3;border-radius:18px;overflow:hidden;background:linear-gradient(140deg, var(--c-44), var(--c-33));border:1px solid ${t.border};box-shadow:0 14px 30px -14px rgba(0,0,0,.55);transition:box-shadow .5s, border-color .5s}
    .reel-card:hover .reel-poster{box-shadow:0 28px 60px -20px var(--c), 0 0 0 1px var(--c-66);border-color:transparent}
    .reel-poster img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.22,1,.36,1), filter .4s;filter:saturate(.96);z-index:1}
    .reel-card:hover .reel-poster img{transform:scale(1.06);filter:saturate(1.08)}
    .reel-poster-fade{position:absolute;inset:auto 0 0 0;height:50%;background:linear-gradient(180deg, transparent, rgba(0,0,0,.78));pointer-events:none;opacity:.9;z-index:2}
    .reel-poster-glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 100%, var(--c-33), transparent 65%);opacity:0;transition:opacity .5s;pointer-events:none;z-index:3}
    .reel-card:hover .reel-poster-glow{opacity:1}
    .reel-meta{position:absolute;top:10px;left:10px;padding:4px 9px;border-radius:99px;background:rgba(0,0,0,.65);backdrop-filter:blur(10px);font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.95);border:1px solid rgba(255,255,255,.16);display:inline-flex;align-items:center;gap:5px;z-index:4}
    .reel-meta-dot{width:4px;height:4px;border-radius:50%;background:var(--c);box-shadow:0 0 6px var(--c)}
    .reel-info{padding:12px 4px 0;text-align:center}
    .reel-name{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(15px,1.4vw,18px);line-height:1.15;letter-spacing:-.015em;color:${t.text};transition:color .3s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .reel-card:hover .reel-name{color:${t.accent}}
    .reel-subline{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${t.faint};margin-top:4px}
    .reel-nav{position:absolute;top:38%;transform:translateY(-50%);z-index:5;width:40px;height:40px;border-radius:50%;border:1px solid ${t.borderStrong};background:${t.surface};color:${t.text};display:grid;place-items:center;cursor:pointer;transition:background .25s, transform .25s, border-color .25s;box-shadow:0 8px 24px -8px rgba(0,0,0,.4)}
    .reel-nav:hover{background:${t.surface2};border-color:${t.accent};transform:translateY(-50%) scale(1.06)}
    .reel-nav.left{left:-8px}
    .reel-nav.right{right:-8px}
    @media(max-width:900px){.reel-nav{display:none}}

    @keyframes shine{to{background-position:200% center}}
    @keyframes blink{50%{opacity:0}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 ${t.mint}66}70%{box-shadow:0 0 0 7px transparent}}
    @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}
    @keyframes titleFlow{to{background-position:280% center}}
    @keyframes eq{0%,100%{height:30%}50%{height:100%}}
    @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="grain" aria-hidden />
      <a href="#experience" style={{ position: 'absolute', left: -999 }}>Skip to content</a>
      <Cursor />
      <ScrollTop t={t} />

      <header className="nav">
        <div className="nav-in">
          <a href="#top" className="serif nav-logo">Faizan Nasim<sup>©</sup></a>
          <nav aria-label="Primary" className="nav-links">
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{l}</a>
            ))}
          </nav>

          <a href="https://drive.google.com/file/d/1fjrdhe3k8yrxq8kD_gFdiGlL2OFNoz71/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-resume">
            Resume <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      <main style={{ paddingTop: 'clamp(96px,10vw,110px)' }}>
        <Hero t={t} />
        <BandMarquee t={t} items={['Frontend developer', 'AI engineer', 'React', 'Python']} dir={1} />

        
        <section id="experience" className="sec">
          <div className="wrap split">
            {/* LEFT: heading */}
            <div className="sticky-l" style={{ position: 'sticky', top: 110 }}>
              <Reveal><h2 className="h2">Where I <i>work</i> now</h2></Reveal>

              {/* <Reveal delay={0.08}>
                <p style={{
                  marginTop: 20,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: t.dim,
                  maxWidth: 380,
                }}>
                  Currently building multi-role dashboards for a global education platform — focusing on clean data flows, secure access, and interfaces that scale.
                </p>
              </Reveal> */}
{/* 
              <Reveal delay={0.12}>
                <div style={{
                  display: 'flex', gap: 10, flexWrap: 'wrap',
                  marginTop: 24,
                }}>
                  {IMPACT.map((m) => (
                    <div
                      key={m.label}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px',
                        borderRadius: 12,
                        background: t.surface,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      <span className="serif grad" style={{
                        fontSize: 24,
                        lineHeight: 1,
                        letterSpacing: '-.03em',
                        flexShrink: 0,
                      }}>
                        <Count to={m.to} suffix="%" />
                      </span>

                      <div>
                        <div style={{
                          fontSize: 12, fontWeight: 600,
                          color: t.text,
                          letterSpacing: '-.005em',
                          whiteSpace: 'nowrap',
                        }}>
                          {m.label}
                        </div>
                        <div style={{
                          fontSize: 10,
                          color: t.faint,
                          marginTop: 1,
                          whiteSpace: 'nowrap',
                        }}>
                          {m.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal> */}
            </div>

            {/* RIGHT: experience cards */}
            <div>
              {EXPERIENCE.map((exp, ei) => (
                <Reveal key={exp.company} delay={ei * 0.08}>
                  <div
                    className="exp-card"
                    style={{
                      position: 'relative',
                      padding: '16px 18px',
                      borderRadius: 14,
                      background: t.surface,
                      border: `1px solid ${t.border}`,
                      marginBottom: 14,
                    }}
                  >
                    {/* Row 1: Logo + Company + Current + Location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8,
                        background: `linear-gradient(135deg, ${t.accent}, ${t.warm})`,
                        display: 'grid', placeItems: 'center',
                        color: t.accentInk,
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: 16, lineHeight: 1,
                        flexShrink: 0,
                      }}>{exp.logo}</div>

                      <span style={{
                        fontSize: 14.5, fontWeight: 700,
                        letterSpacing: '-.01em',
                        whiteSpace: 'nowrap',
                      }}>
                        {exp.company}
                      </span>

                      {exp.current && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '2px 6px', borderRadius: 99,
                          background: `${t.mint}18`,
                          border: `1px solid ${t.mint}44`,
                          fontSize: 8, fontWeight: 700,
                          letterSpacing: '.06em', textTransform: 'uppercase',
                          color: t.mint,
                          whiteSpace: 'nowrap',
                        }}>
                          <span style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: t.mint,
                            animation: 'pulseDot 2s infinite',
                          }} />
                          Now
                        </span>
                      )}

                      <span className="mono" style={{
                        marginLeft: 'auto',
                        fontSize: 10.5, color: t.faint,
                        whiteSpace: 'nowrap',
                      }}>
                        {exp.location}
                      </span>
                    </div>

                    {/* Row 2: Role · Date */}
                    <div className="mono" style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      marginTop: 6, marginLeft: 40,
                      fontSize: 10.5,
                      flexWrap: 'wrap',
                    }}>
                      <span style={{ color: t.accent, fontWeight: 600 }}>{exp.role}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: t.faint }} />
                      <span style={{ color: t.faint }}>{exp.date}</span>
                    </div>

                    {/* Divider */}
                    {exp.groups && exp.groups.length > 0 && (
                      <div style={{ height: 1, background: t.border, margin: '12px 0 10px' }} />
                    )}

                    {/* Project groups */}
                    {exp.groups && exp.groups.map((g, gi) => {
                      const colorMap = {
                        accent: t.accent,
                        warm: t.warm,
                        mint: t.mint,
                      };
                      const gc = colorMap[g.color] || t.accent;
                      return (
                        <div key={gi} style={{ marginBottom: gi < exp.groups.length - 1 ? 12 : 0 }}>
                          {/* Group title */}
                          <div style={{
                            fontSize: 10.5, fontWeight: 700,
                            letterSpacing: '.07em', textTransform: 'uppercase',
                            color: gc,
                            marginBottom: 6,
                            display: 'flex', alignItems: 'center', gap: 6,
                          }}>
                            <span style={{
                              width: 4, height: 4, borderRadius: '50%',
                              background: gc,
                              boxShadow: `0 0 6px ${gc}`,
                              flexShrink: 0,
                            }} />
                            {g.title}
                          </div>

                          {/* Bullets */}
                          <ul style={{
                            listStyle: 'none',
                            padding: 0, margin: 0,
                            display: 'flex', flexDirection: 'column', gap: 5,
                          }}>
                            {g.bullets.map((b, bi) => (
                              <li key={bi} style={{
                                fontSize: 11.5,
                                lineHeight: 1.6,
                                color: t.dim,
                                paddingLeft: 12,
                                position: 'relative',
                              }}>
                                <span aria-hidden style={{
                                  position: 'absolute', left: 0, top: '0.6em',
                                  width: 4, height: 1.5, borderRadius: 1,
                                  background: t.faint,
                                }} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ RECOGNITION ═══════════════ */}
        <section id="recognition" style={{ paddingTop: 0, paddingBottom: 'clamp(60px,8vw,110px)' }}>
          <div className="wrap">
            <Reveal>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                marginBottom: 24,
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: t.warm,
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 20, height: 20, borderRadius: 6,
                    background: `${t.warm}1a`,
                    border: `1px solid ${t.warm}44`,
                    fontSize: 11, color: t.warm,
                  }}>★</span>
                  <span className="mono" style={{
                    fontSize: 12, letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 600,
                  }}>
                    Recognition
                  </span>
                </span>
                <span style={{ flex: 1, height: 1, background: t.border }} />
                <span className="mono" style={{ fontSize: 12, color: t.faint }}>
                  {RECOGNITION.length} awards
                </span>
              </div>
            </Reveal>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
              gap: 14,
            }}>
              {RECOGNITION.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.06}>
                  <div
                    className="rec-card"
                    style={{
                      padding: '20px 22px',
                      borderRadius: 14,
                      background: t.surface,
                      border: `1px solid ${t.border}`,
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                    }}
                  >
                    <div aria-hidden style={{
                      position: 'absolute', top: -40, right: -40,
                      width: 100, height: 100, borderRadius: '50%',
                      background: `radial-gradient(circle, ${t.warm}33, transparent 70%)`,
                      pointerEvents: 'none',
                    }} />

                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      marginBottom: 12,
                      position: 'relative',
                    }}>
                      <span className="mono" style={{
                        fontSize: 10.5, fontWeight: 700,
                        letterSpacing: '.12em',
                        padding: '3px 9px',
                        borderRadius: 99,
                        background: `${t.warm}1a`,
                        border: `1px solid ${t.warm}44`,
                        color: t.warm,
                      }}>
                        {r.year}
                      </span>
                    </div>

                    <div style={{
                      fontSize: 15.5, fontWeight: 600,
                      letterSpacing: '-.01em',
                      lineHeight: 1.3,
                      position: 'relative',
                      color: t.text,
                    }}>
                      {r.title}
                    </div>

                    <div style={{
                      fontSize: 13, color: t.dim,
                      marginTop: 8, lineHeight: 1.55,
                      position: 'relative',
                    }}>
                      {r.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ AI ═══════════════ */}
        <section id="ai" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(24px,3vw,36px)' }}>
                <h2 className="h2">Building with <i>AI</i></h2>
                <span className="mono" style={{ fontSize: 13, color: t.faint }}>model · retrieval · agents</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p style={{ fontSize: 'clamp(18px,2vw,22px)', color: t.dim, maxWidth: 660, lineHeight: 1.65, marginBottom: 'clamp(36px,4.5vw,60px)' }}>
                Frontend taught me how people use software. AI engineering is what happens behind the screen: orchestrating retrieval architectures, building multi-step agents, and connecting precise tool calls. I build across both worlds.
              </p>
            </Reveal>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: t.accent }}>
                  <Sparkles size={14} />
                  <span className="mono" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>Toolkit</span>
                </span>
                <span style={{ flex: 1, height: 1, background: t.border }} />
                <span className="mono" style={{ fontSize: 12, color: t.faint }}>{AI_TAGS.length} tools</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="ai-cloud">
                {AI_TAGS.map((tag, i) => (
                  <motion.span
                    key={tag.name}
                    className={`ai-tag w${tag.w}`}
                    style={{ '--c': tag.c, '--c-glow': `${tag.c}33` }}
                    initial={{ opacity: 0, y: 14, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: i * 0.03, ease: EASE }}
                  >
                    <span className="ai-dot" />
                    {tag.name}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ WORK ═══════════════ */}
        <section id="work" style={{ paddingTop: 'clamp(40px,6vw,80px)' }}>
          <div className="wrap" style={{ marginBottom: 'clamp(30px,5vw,60px)' }}>
            <Reveal><h2 className="h2">Proof of <i>work</i></h2></Reveal>
          </div>
          <WorkStack t={t} />
        </section>

        <OffTime t={t} />
        <Contact t={t} />
      </main>
    </>
  );
}

/* ───────────── SCROLL + MOTION BLOCKS ───────────── */
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function Count({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
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
  return <span className="typed">{words[i].slice(0, n)}<span className="caret" /></span>;
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38 });
  const sy = useSpring(y, { stiffness: 450, damping: 38 });
  const [big, setBig] = useState(false);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    setFine(true);
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target.closest && e.target.closest('a,button,[role=slider]'))); };
    window.addEventListener('mousemove', mv);
    return () => window.removeEventListener('mousemove', mv);
  }, []);
  if (!fine) return null;
  return (
    <motion.div aria-hidden style={{ position: 'fixed', left: 0, top: 0, x: sx, y: sy, zIndex: 2000, pointerEvents: 'none', mixBlendMode: 'difference' }}>
      <div style={{ width: big ? 56 : 14, height: big ? 56 : 14, borderRadius: '50%', background: '#fff', transform: 'translate(-50%,-50%)', transition: 'width .25s, height .25s' }} />
    </motion.div>
  );
}

function ScrollTop({ t }) {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setShow(v > 0.08));
    return () => unsub();
  }, [scrollYProgress]);
  return (
    <motion.button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="scroll-top"
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.7, pointerEvents: show ? 'auto' : 'none' }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <svg className="ring" viewBox="0 0 48 48" width="48" height="48" aria-hidden>
        <motion.circle cx="24" cy="24" r="21" fill="none" stroke={t.accent} strokeWidth="2" strokeLinecap="round" style={{ pathLength: p }} />
      </svg>
      <ArrowUp size={16} />
    </motion.button>
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

function BandMarquee({ t, items, dir = 1, compact = false, outline = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], dir > 0 ? ['0%', '-33%'] : ['-33%', '0%']);
  const run = [...items, ...items, ...items];
  return (
    <div ref={ref} aria-hidden style={{ overflow: 'hidden', padding: compact ? '6px 0' : 'clamp(18px,2.6vw,36px) 0', borderTop: compact ? 'none' : `1px solid ${t.border}`, borderBottom: compact ? 'none' : `1px solid ${t.border}` }}>
      <motion.div className="serif" style={{ x, display: 'flex', alignItems: 'center', width: 'max-content', fontSize: compact ? 'clamp(64px,10vw,150px)' : 'clamp(56px,9vw,130px)', lineHeight: 1.05, whiteSpace: 'nowrap', willChange: 'transform' }}>
        {run.map((it, i) => (
          <React.Fragment key={i}>
            <span style={{ fontStyle: i % 2 ? 'italic' : 'normal', color: outline ? 'transparent' : t.text, WebkitTextStroke: outline ? `1.5px ${t.text}` : '0', paddingRight: '.3em' }}>{it}</span>
            <span style={{ color: i % 2 ? t.warm : t.accent, fontSize: '.5em', paddingRight: '.35em' }}>✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function Hero({ t }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const xL = useTransform(p, [0, 1], ['0%', '-28%']);
  const xR = useTransform(p, [0, 1], ['0%', '28%']);
  const orb1 = useTransform(p, [0, 1], [0, -260]);
  const orb2 = useTransform(p, [0, 1], [0, 140]);
  const rot = useTransform(p, [0, 1], [0, 200]);

  return (
    <header id="top" ref={ref} style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(40px,6vw,80px) 0 clamp(50px,6vw,90px)' }}>
      <motion.div aria-hidden style={{ y: orb1, position: 'absolute', top: '4%', right: '-6%', width: 'clamp(240px,34vw,480px)', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${t.accent}, ${t.accent}00 70%)`, opacity: 0.5, filter: 'blur(24px)' }} />
      <motion.div aria-hidden style={{ y: orb2, position: 'absolute', bottom: '6%', left: '-8%', width: 'clamp(200px,28vw,380px)', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle at 60% 40%, ${t.warm}, ${t.warm}00 70%)`, opacity: 0.38, filter: 'blur(24px)' }} />

      <div className="wrap" style={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', border: `1px solid ${t.borderStrong}`, borderRadius: 99, fontSize: 13, fontWeight: 500, color: t.dim, marginBottom: 'clamp(20px,3vw,36px)', background: t.surface }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.mint, animation: 'pulse 2s infinite' }} />
          <span style={{ color: t.text, fontWeight: 600 }}>Available for work</span>
          <span style={{ width: 1, height: 12, background: t.borderStrong }} />
          <span>Frontend Developer & AI Engineer</span>
        </motion.div>

        <h1 className="serif" style={{ fontSize: 'clamp(88px,20vw,300px)', lineHeight: 0.84, letterSpacing: '-.045em', marginBottom: 'clamp(30px,4vw,56px)' }}>
          {['Faizan', 'Nasim'].map((w, i) => (
            <motion.div key={w} style={{ x: i ? xR : xL, textAlign: i ? 'right' : 'left' }}>
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '.06em' }}>
                <motion.span className={i ? 'grad' : ''} style={{ display: 'inline-block', fontStyle: i ? 'italic' : 'normal' }}
                  initial={{ y: '112%' }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 1.05, ease: EASE }}>{w}</motion.span>
              </span>
            </motion.div>
          ))}
        </h1>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 30, flexWrap: 'wrap' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} style={{ maxWidth: 560 }}>
              <p style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 600, letterSpacing: '-.025em', lineHeight: 1.25, minHeight: '2.5em', color: t.text }}>
                Frontend developer building <span className="serif" style={{ fontStyle: 'italic' }}><Typer words={ROLES} /></span>
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: t.dim, marginTop: 6 }}>
                I build responsive, API-driven web apps with React and Tailwind. Now I'm learning AI engineering, so the interfaces I build can sit on top of models, retrieval, and agents I understand end to end.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 26 }}>
                <a href="#work" className="btn btn-main">See my work <ArrowDown size={16} /></a>
                {[
                  { Icon: Github, href: 'https://github.com/faizannasim', label: 'GitHub' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/faizan-nasim-2262a930a/', label: 'LinkedIn' },
                  { Icon: Twitter, href: 'https://x.com/FaizanNasim8', label: 'Twitter' },
                  { Icon: BsYoutube, href: 'https://www.youtube.com/@CodeWithFaizan-x8w/videos', label: 'YouTube' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ padding: '13px 18px', fontSize: 14 }}><Icon size={15} />{label}</a>
                ))}
              </div>
            </motion.div>

            <motion.div style={{ rotate: rot, position: 'relative', width: 150, height: 150, flexShrink: 0 }} aria-hidden>
              <svg className="badge" viewBox="0 0 150 150" width="150" height="150">
                <defs><path id="circ" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" /></defs>
                <text fill={t.text} fontSize="13.5" fontWeight="600" letterSpacing="3.2" fontFamily="Hanken Grotesk, sans-serif">
                  <textPath href="#circ">FRONTEND DEVELOPER • AI ENGINEER •</textPath>
                </text>
              </svg>
              <div style={{ position: 'absolute', inset: 44, borderRadius: '50%', background: t.accent, color: t.accentInk, display: 'grid', placeItems: 'center' }}><ArrowDown size={22} /></div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

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
          <div style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${p.c}55, ${t.surface2})` }}>
            <img src={p.img} alt={`${p.title} screenshot`} loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          </div>
          <div style={{ padding: 'clamp(20px,3vw,44px)', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(10px,2vh,24px)' }}>
              <span className="mono" style={{ fontSize: 13, color: t.faint }}>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}  ·  {p.year}</span>
              {p.kpi && (
                <span style={{ textAlign: 'right' }}>
                  <span className="serif" style={{ fontSize: 'clamp(30px,3.4vw,46px)', lineHeight: 1, color: p.c }}>{p.kpi}</span>
                  <span style={{ display: 'block', fontSize: 12, color: t.faint }}>{p.kpiLabel}</span>
                </span>
              )}
            </div>
            <h3 className="serif" style={{ fontSize: 'clamp(46px,6vw,88px)', lineHeight: 0.92 }}>{p.title}</h3>
            <div style={{ fontSize: 16, color: p.c, fontWeight: 600, margin: '8px 0 14px' }}>{p.sub}</div>
            <p style={{ fontSize: 'clamp(15px,1.3vw,17px)', color: t.dim, lineHeight: 1.65 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '16px 0' }}>
              {p.stack.map((s) => <span key={s} className="pill" style={{ fontSize: 12.5, padding: '5px 12px', color: t.dim }}>{s}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 8 }}>
              {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-main" style={{ padding: '12px 22px', fontSize: 14 }}><ExternalLink size={14} />Live site</a>}
              <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ padding: '12px 20px', fontSize: 14 }}><Github size={14} />Code</a>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════
   OFF-TIME
   ═════════════════════════════════════════════════ */
function OffTime({ t }) {
  const [tab, setTab] = useState('music');
  return (
    <section id="life" className="sec" style={{ paddingTop: 'clamp(20px,3vw,40px)', paddingBottom: 0 }}>
      <div className="wrap">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(20px,2.5vw,28px)' }}>
            <h2 className="h2">Away from the <i>keyboard</i></h2>
            <span className="mono" style={{ fontSize: 13, color: t.faint }}>music · film · code</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p style={{ fontSize: 'clamp(18px,2vw,22px)', color: t.dim, maxWidth: 660, lineHeight: 1.65, marginBottom: 'clamp(28px,3.5vw,44px)' }}>
            What goes on when the code editor closes. Lo-fi for deep debugging, cinematic stories for pacing and detail, and a lot of hacking films for the vibe.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tab-switch" role="tablist" aria-label="Off-time content">
            <button role="tab" aria-selected={tab === 'music'} className={tab === 'music' ? 'on' : ''} onClick={() => setTab('music')}>
              {tab === 'music' && (
                <motion.span layoutId="ot-tab" transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{ position: 'absolute', inset: 0, borderRadius: 99, background: t.surface2, zIndex: 0 }} />
              )}
              <span className="tab-label"><Music2 size={14} /> Music</span>
            </button>
            <button role="tab" aria-selected={tab === 'reel'} className={tab === 'reel' ? 'on' : ''} onClick={() => setTab('reel')}>
              {tab === 'reel' && (
                <motion.span layoutId="ot-tab" transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{ position: 'absolute', inset: 0, borderRadius: 99, background: t.surface2, zIndex: 0 }} />
              )}
              <span className="tab-label"><Film size={14} /> Reel Life</span>
            </button>
          </div>
        </Reveal>

        <div style={{ marginTop: 26, position: 'relative' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
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
        <a href="https://www.youtube.com/@CodeWithFaizan-x8w/videos" target="_blank" rel="noopener noreferrer" className="lift"
          style={{ borderRadius: 24, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180, background: `linear-gradient(135deg, ${t.warm}, ${t.accent})`, color: '#fff', boxShadow: '0 24px 48px -20px rgba(0,0,0,.45)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', top: -50, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}><BsYoutube size={28} /><ArrowUpRight size={22} /></div>
          <div style={{ position: 'relative', marginTop: 30 }}>
            <div className="serif" style={{ fontSize: 34, lineHeight: 1, marginBottom: 4 }}>CodeWithFaizan</div>
            <div style={{ fontSize: 14.5, opacity: 0.95, fontWeight: 500 }}>Watch my coding tutorials on YouTube</div>
          </div>
        </a>

        <div className="lift" style={{ borderRadius: 24, padding: 26, border: `1px solid ${t.borderStrong}`, background: t.surface, boxShadow: '0 18px 40px -20px rgba(0,0,0,.4)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, color: t.accent, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Vibe Check</div>
          <p style={{ fontSize: 15, color: t.dim, lineHeight: 1.6, marginBottom: 16 }}>Headphones locked in for deep debugging, complex architecture designs, and late-night building.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['The Verve', 'Linkin Park', 'Green Day', 'Coke Studio', 'Nirvana'].map((g) =>
              <span key={g} className="pill" style={{ background: t.surface2, fontSize: 12.5, padding: '5px 12px' }}>{g}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── REEL PANEL ───────────── */
const REEL_CATS = [
  { id: 'all',    label: 'All',            dot: '#A78BFA' },
  { id: 'code',   label: 'Cyberpunk', dot: '#5EEBB0' },
  { id: 'mind',   label: 'Mind-bending',   dot: '#A78BFA' },
  { id: 'series', label: 'Series',         dot: '#F59E0B' },
  { id: 'marvel', label: 'Marvel',         dot: '#E62429' },
  { id: 'dc',     label: 'DC',             dot: '#7DD3FC' },
  { id: 'anime',  label: 'Anime',          dot: '#FF7A9C' },
  { id: 'film',   label: 'Classics',       dot: '#61D4F5' },
];

function ReelPanel({ t }) {
  const scrollRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const nudge = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  const items = filter === 'all' ? REEL : REEL.filter((r) => r.cats.includes(filter));

  return (
    <div>
      <div className="reel-filters" role="tablist" aria-label="Filter reel">
        {REEL_CATS.map((c) => {
          const on = filter === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={on}
              className={`reel-filter${on ? ' on' : ''}`}
              onClick={() => {
                setFilter(c.id);
                scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
              }}
            >
              <span className="reel-filter-dot" style={{ background: c.dot, boxShadow: on ? `0 0 8px ${c.dot}` : 'none' }} />
              {c.label}
            </button>
          );
        })}
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 12, color: t.faint, display: 'inline-flex', alignItems: 'center' }}>
          {items.length} titles
        </span>
      </div>

      <div className="reel-scroll-wrap">
        <button className="reel-nav left" onClick={() => nudge(-1)} aria-label="Scroll left"><ChevronLeft size={18} /></button>
        <button className="reel-nav right" onClick={() => nudge(1)} aria-label="Scroll right"><ChevronRight size={18} /></button>
        <div className="reel-scroll" ref={scrollRef}>
          {items.map((r, i) => (
            <motion.div
              key={`${r.title}-${filter}`}
              className="reel-card"
              style={{ '--c': r.c, '--c-33': `${r.c}33`, '--c-44': `${r.c}44`, '--c-66': `${r.c}66` }}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.035, 0.4), ease: EASE }}
            >
              <div className="reel-poster">
                <img
                  src={r.poster}
                  alt={`${r.title} poster`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="reel-poster-fade" />
                <div className="reel-poster-glow" />
                <div className="reel-meta">
                  <span className="reel-meta-dot" />
                  {r.type}
                </div>
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

/* ═════════════════════════════════════════════════
   MUSIC PLAYER
   ═════════════════════════════════════════════════ */
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
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      setApiReady(true);
    };
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
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        iv_load_policy: 3,
        origin: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
      events: {
        onReady: () => {
          setReady(true);
          try { ytRef.current.setVolume(Math.round(vol * 100)); } catch {}
        },
        onStateChange: (e) => {
          const YT = window.YT;
          if (!YT) return;
          if (e.data === YT.PlayerState.PLAYING) {
            setPlaying(true);
            setVideoStarted(true);
          } else if (e.data === YT.PlayerState.PAUSED) {
            setPlaying(false);
          } else if (e.data === YT.PlayerState.ENDED) {
            if (repeatRef.current) {
              ytRef.current.seekTo(0);
              ytRef.current.playVideo();
            } else {
              let ni;
              if (shuffleRef.current) ni = Math.floor(Math.random() * TRACKS.length);
              else ni = (idxRef.current + 1) % TRACKS.length;
              setIdx(ni);
              setElapsed(0);
              setVideoStarted(false);
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
    try {
      if (playing) p.playVideo();
      else p.pauseVideo();
    } catch {}
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

  const go = (d) => {
    const ni = shuffle ? Math.floor(Math.random() * TRACKS.length) : (idx + d + TRACKS.length) % TRACKS.length;
    setIdx(ni);
    setElapsed(0);
    setVideoStarted(false);
    if (ready && ytRef.current && ytRef.current.loadVideoById) {
      ytRef.current.loadVideoById(TRACKS[ni].yt);
    }
  };

  const pick = (i) => {
    if (i === idx) { setPlaying((p) => !p); return; }
    setIdx(i);
    setElapsed(0);
    setVideoStarted(false);
    if (ready && ytRef.current && ytRef.current.loadVideoById) {
      ytRef.current.loadVideoById(TRACKS[i].yt);
    }
    setPlaying(true);
  };

  const seekTo = (pct) => {
    const p = ytRef.current;
    if (!p || !p.seekTo) return;
    const dur = (p.getDuration && p.getDuration()) || duration;
    try {
      p.seekTo(pct * dur, true);
      setElapsed(pct * dur);
    } catch {}
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.4), { threshold: [0, 0.4, 0.7] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      if (e.code === 'Space') { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.code === 'ArrowRight') { e.preventDefault(); seekTo(Math.min(0.999, (elapsed + 5) / (duration || track.dur))); }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); seekTo(Math.max(0, (elapsed - 5) / (duration || track.dur))); }
      else if (e.code === 'ArrowUp') { e.preventDefault(); setVol((v) => Math.min(1, v + 0.05)); setMuted(false); }
      else if (e.code === 'ArrowDown') { e.preventDefault(); setVol((v) => Math.max(0, v - 0.05)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, elapsed, duration, track.dur]);

  const pct = Math.min(100, ((duration ? elapsed / duration : 0)) * 100);
  const headIdx = Math.floor((pct / 100) * wave.length);

  return (
    <div className="mpp-wrap" ref={rootRef}>
      <div aria-hidden className="mpp-glow" style={{
        background: `radial-gradient(45% 70% at 12% 0%, ${c0}77, transparent 70%), radial-gradient(50% 70% at 100% 100%, ${c1}77, transparent 70%)`,
      }} />

      <div className="mpp" style={{
        '--c0': c0, '--c1': c1,
        '--c0-55': `${c0}55`, '--c1-55': `${c1}55`, '--c1-66': `${c1}66`,
        '--c0-aa': `${c0}aa`, '--c0-dd': `${c0}dd`, '--c0-66': `${c0}66`,
        '--c0-33': `${c0}33`, '--c0-44': `${c0}44`, '--c0-18': `${c0}18`,
      }}>
        <div className="mpp-inner">
          <div className="mpp-head">
            <div className="mpp-brand">
              <span className="mpp-brand-dot" />
              <span>Now Playing</span>
              <span style={{ width: 1, height: 9, background: 'rgba(255,255,255,.18)' }} />
              <span style={{ color: 'rgba(245,242,236,.4)' }}>YouTube</span>
            </div>
            <span className="mpp-hq"><Zap size={10} /> {ready ? (videoStarted ? 'HQ · 320' : 'Ready') : 'Loading…'}</span>
          </div>

          <div className="mpp-body">
            <div className="mpp-video">
              <div ref={ytContainerRef} />
              <div className={`mpp-video-cover${videoStarted || playing ? ' hide' : ''}`} aria-hidden>
                {track.title.charAt(0)}
              </div>
            </div>

            <div className="mpp-info">
              <div className="mpp-status">
                <span className="mpp-status-dot" style={{
                  background: playing ? t.mint : 'rgba(245,242,236,.45)',
                  boxShadow: playing ? `0 0 12px ${t.mint}` : 'none',
                }} />
                {playing ? 'Playing' : 'Paused'} · {String(idx + 1).padStart(2, '0')}/{String(TRACKS.length).padStart(2, '0')}
              </div>
              <div className="mpp-title">{track.title}</div>
              <div className="mpp-artist">{track.artist}</div>

              <div
                role="slider" tabIndex={0}
                aria-label="Seek" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={elapsed}
                className="mpp-wave"
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  seekTo(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setHoverPct(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
                }}
                onMouseLeave={() => setHoverPct(null)}
              >
                {wave.map((h, i) => {
                  const isPast = i < headIdx;
                  const isHead = i === headIdx;
                  return (
                    <span key={i} className="mpp-wave-bar" style={{
                      height: `${h * 100}%`,
                      background: isPast || isHead ? `linear-gradient(180deg, ${c1}, ${c0})` : 'rgba(255,255,255,0.12)',
                      transform: isHead ? 'scaleY(1.4)' : 'none',
                      boxShadow: isHead ? `0 0 8px ${c0}` : 'none',
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
              <button className={`mpp-icon sm${shuffle ? ' on' : ''}`} onClick={() => setShuffle((s) => !s)} aria-label="Shuffle">
                <Shuffle size={14} />
              </button>
              <button className="mpp-icon" onClick={() => go(-1)} aria-label="Previous track">
                <SkipBack size={16} />
              </button>
              <button className="mpp-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
                {playing ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
              </button>
              <button className="mpp-icon" onClick={() => go(1)} aria-label="Next track">
                <SkipForward size={16} />
              </button>
              <button className={`mpp-icon sm${repeat ? ' on' : ''}`} onClick={() => setRepeat((r) => !r)} aria-label="Repeat">
                <Repeat size={14} />
              </button>
            </div>

            <div className="mpp-vol">
              <button className="mpp-vol-btn" onClick={() => setMuted((m) => !m)} aria-label="Mute">
                {muted || vol === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <div
                role="slider" tabIndex={0}
                aria-label="Volume" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((muted ? 0 : vol) * 100)}
                className="mpp-vol-track"
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setVol(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
                  setMuted(false);
                }}
              >
                <div className="mpp-vol-fill" style={{ width: `${(muted ? 0 : vol) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="mpp-playlist">
            {TRACKS.map((tr, i) => {
              const on = i === idx;
              const [tc0] = tr.c;
              return (
                <button key={tr.title} onClick={() => pick(i)} className={`mpp-chip${on ? ' on' : ''}`}>
                  {on && playing ? (
                    <span className="mpp-eq" aria-hidden><i /><i /><i /></span>
                  ) : on ? (
                    <span className="mpp-chip-dot" style={{ background: tc0, boxShadow: `0 0 8px ${tc0}` }} />
                  ) : (
                    <span className="mpp-chip-num">{String(i + 1).padStart(2, '0')}</span>
                  )}
                  <span style={{ fontWeight: on ? 600 : 500 }}>{tr.title}</span>
                  <span className="mpp-chip-num" style={{ opacity: 0.45 }}>{fmt(tr.dur)}</span>
                </button>
              );
            })}
            <div className="mpp-keys">
              <Command size={11} />
              <span className="mpp-key">Space</span>
              <span className="mpp-key">←→</span>
              <span className="mpp-key">↑↓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── CONTACT ───────────── */
function Contact({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['-18%', '0%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['18%', '0%']);
  const [copied, setCopied] = useState(false);
  const time = useLocalTime();
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { window.location.href = `mailto:${EMAIL}`; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const timeStr = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(70px,9vw,130px) 0 0', overflow: 'hidden' }}>
      <div className="serif" style={{ fontSize: 'clamp(70px,16vw,240px)', lineHeight: 0.86, letterSpacing: '-.045em', padding: '0 clamp(20px,4vw,48px)' }}>
        <motion.div style={{ x: x1 }}>Let's build</motion.div>
        <motion.div style={{ x: x2, textAlign: 'right', fontStyle: 'italic', color: t.accent }}>something good</motion.div>
      </div>

      <div className="wrap" style={{ marginTop: 'clamp(40px,6vw,80px)' }}>
        <Reveal>
          <p style={{ fontSize: 18, color: t.dim, lineHeight: 1.7, marginBottom: 20, maxWidth: 520 }}>
            Open to frontend roles, AI projects, and collaborations. Small idea or big vision, send me a message.
          </p>
          <a href={`mailto:${EMAIL}`} className="serif mail-link" style={{ display: 'inline-block', fontSize: 'clamp(28px,6.4vw,92px)', wordBreak: 'break-all', paddingBottom: 6, lineHeight: 1.05 }}>{EMAIL}</a>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '30px 0 50px' }}>
            <a href={`mailto:${EMAIL}`} className="btn btn-main"><Mail size={16} />Send an email</a>
            <button onClick={copy} className="btn btn-line" aria-live="polite" style={{ color: copied ? t.mint : t.text, borderColor: copied ? t.mint : t.borderStrong }}>
              {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Email copied' : 'Copy email'}
            </button>
            <a href="https://www.linkedin.com/in/faizan-nasim-2262a930a/" target="_blank" rel="noopener noreferrer" className="btn btn-line"><Linkedin size={16} />LinkedIn</a>
          </div>
        </Reveal>
        <div style={{ borderTop: `1px solid ${t.border}`, padding: '22px 0 36px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: t.faint }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span>© {new Date().getFullYear()} Faizan Nasim.</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.faint }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.mint, animation: 'pulse 2s infinite' }} />
              Delhi, India
              <span className="mono" style={{ color: t.dim }}>{timeStr} IST</span>
            </span>
          </div>
          <a href="#top" style={{ color: t.dim }}>Back to top</a>
        </div>
      </div>
    </section>
  );
}
