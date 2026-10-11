import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Linkedin, Twitter, ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Moon, Sun, Play, Pause,
  SkipBack, SkipForward, Copy, Check, Home, Briefcase, Cpu, FolderOpen, Music2, Send, Plus,
} from 'lucide-react';
import { BsYoutube } from 'react-icons/bs';
import {
  motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useVelocity,
  useAnimationFrame, useInView, animate,
} from 'framer-motion';

/* ═══════════════ DESIGN: editorial dark / paper, lime accent ═══════════════ */
const T = {
  dark: {
    bg: '#0A0A0B', card: '#111114', card2: '#18181C', line: 'rgba(255,255,255,0.09)', lineStrong: 'rgba(255,255,255,0.22)',
    text: '#F4F3EE', dim: 'rgba(244,243,238,0.74)', faint: 'rgba(244,243,238,0.46)',
    acc: '#C8FF3D', accInk: '#10130A', accText: '#C8FF3D', violet: '#8B7CFF', pink: '#FF6FA3', glow: 'rgba(200,255,61,0.13)',
  },
  light: {
    bg: '#F2F0E8', card: '#FBFAF5', card2: '#E9E6DA', line: 'rgba(14,14,16,0.1)', lineStrong: 'rgba(14,14,16,0.26)',
    text: '#0E0E10', dim: 'rgba(14,14,16,0.76)', faint: 'rgba(14,14,16,0.5)',
    acc: '#C8FF3D', accInk: '#10130A', accText: '#3A6200', violet: '#5B49E0', pink: '#D43D78', glow: 'rgba(90,140,0,0.14)',
  },
};
const EASE = [0.22, 1, 0.36, 1];
const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };
const fmt = (s) => { if (!isFinite(s) || s < 0) s = 0; return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`; };

/* ═══════════════ CONTENT ═══════════════ */
const EMAIL = 'faizannasim59@gmail.com';
const ROLES = ['clean React interfaces.', 'API-driven dashboards.', 'AI-powered products.', 'fast, responsive apps.'];
const RECOGNITION = [
  { title: 'Best Project Award 2024', desc: 'Real-time Emotion Detection System, Greater Noida Institute of Technology', year: '2024' },
  { title: 'Generative AI certificate', desc: 'Microsoft and LinkedIn: prompt engineering and applied GenAI', year: '2024' },
];
const SPECS = [
  { to: 10, suffix: '+', label: 'responsive pages', note: 'Student, Admin and Instructor dashboards' },
  { to: 30, suffix: '%', label: 'faster page loads', note: 'Optimized data-fetching logic' },
  { to: 40, suffix: '%', label: 'fewer reported bugs', note: 'Across 3 distinct user roles' },
  { to: 3, suffix: '', label: 'user roles shipped', note: 'Secured with role-based access' },
];
const EXPERIENCE = {
  company: 'GEDU Services', role: 'Associate Frontend Developer', date: 'Dec 2025 — Present', location: 'Noida, India',
  groups: [
    { title: 'Multi-Role Dashboards & Brand Management', color: 'acc', bullets: [
      <>Developed <b>10+ responsive pages</b> across multi-role dashboards (Student, Admin, Instructor) in React.js integrated with REST APIs, optimizing data-fetching logic to improve <b>page load speed by 30%</b>.</>,
      <>Designed a secure <b>Brand Management portal</b> enforcing strict Role-Based Access Control (RBAC) to restrict university onboarding to Super Admin users, strengthening platform security and data integrity.</>,
    ] },
    { title: 'Refund Tracking & Reporting Modules', color: 'violet', bullets: [
      <>Built a <b>Refund Tracking module</b> integrated with backend APIs to surface real-time status across a sequential approval workflow (starting from step 1 post-initiation), showing approver identity, remarks, and timestamps at every stage for full audit visibility.</>,
      <>Developed a <b>Reporting module</b> integrated with backend APIs to consolidate user details across all roles into a single view, complete with one-click Excel export for audits and offline analysis.</>,
    ] },
    { title: 'Platform-Wide Optimization & QA', color: 'pink', bullets: [
      <>Resolved critical UI and data-flow issues platform-wide, reducing <b>reported bugs by 40%</b> across 3 distinct user roles.</>,
    ] },
  ],
};

const LAYERS = [
  { id: 'all', label: 'All', desc: 'Everything I work with across the AI stack.' },
  { id: 'models', label: 'Models', desc: 'Choosing, prompting and calling language models.' },
  { id: 'retrieval', label: 'Retrieval', desc: 'Embedding, chunking and searching so models answer from real data.' },
  { id: 'agents', label: 'Agents', desc: 'Multi-step workflows where a model plans, decides and acts.' },
  { id: 'tooling', label: 'Tooling', desc: 'Connecting models to functions, APIs and outside tools.' },
];
const AI_TAGS = [
  { name: 'LangChain', l: 'agents', c: '#5EEBB0', w: 3 }, { name: 'RAG', l: 'retrieval', c: '#A78BFA', w: 3 },
  { name: 'AI Agents', l: 'agents', c: '#FF8A65', w: 3 }, { name: 'LLMs', l: 'models', c: '#61D4F5', w: 3 },
  { name: 'LangGraph', l: 'agents', c: '#61D4F5', w: 2 }, { name: 'OpenAI', l: 'models', c: '#5EEBB0', w: 2 },
  { name: 'ChromaDB', l: 'retrieval', c: '#F472B6', w: 2 }, { name: 'Pinecone', l: 'retrieval', c: '#F59E0B', w: 2 },
  { name: 'Prompt Engineering', l: 'models', c: '#FF8A65', w: 2 }, { name: 'GenAI', l: 'models', c: '#A78BFA', w: 2 },
  { name: 'Embeddings', l: 'retrieval', c: '#5EEBB0', w: 2 }, { name: 'Vector DB', l: 'retrieval', c: '#F59E0B', w: 1 },
  { name: 'MCP', l: 'tooling', c: '#61D4F5', w: 1 }, { name: 'Tool Calling', l: 'tooling', c: '#A78BFA', w: 1 },
  { name: 'Function Calling', l: 'tooling', c: '#FF8A65', w: 1 }, { name: 'Chunking', l: 'retrieval', c: '#F472B6', w: 1 },
];

const PROJECTS = [
  { title: 'BillMate', sub: 'Invoice maker', year: '2024', desc: 'Responsive invoice platform with PDF export, QR code, and hands-free voice via the Web Speech API.',
    stack: ['React', 'Tailwind', 'Web Speech API'], gh: 'https://github.com/faizannasim/BillMate.git', live: 'https://bill-mate-iota.vercel.app/',
    kpi: '100', kpiLabel: 'Lighthouse', img: '/bill.png', c: '#8A6BFF' },
  { title: 'Ask AI', sub: 'AI chat app', year: '2024', desc: 'Real-time AI chat with persistent history and the Google Gemini API. 89 Accessibility score on Lighthouse.',
    stack: ['React', 'Tailwind', 'Gemini API'], gh: 'https://github.com/faizannasim', live: null, kpi: '89', kpiLabel: 'Accessibility', img: '/ask.png', c: '#F472B6' },
  { title: 'F1 Arena', sub: 'F1 dashboard', year: '2024', desc: 'Multi-section dashboard consuming live REST APIs, handling 1,000+ data points with modal-based user management.',
    stack: ['React', 'Tailwind', 'REST APIs'], gh: 'https://github.com/faizannasim/F1Arena.git', live: 'https://formula-1-2e81.vercel.app/',
    kpi: '1K+', kpiLabel: 'Data points', img: '/f1.png', c: '#FF7A59' },
  { title: 'Portfolio', sub: 'Personal site', year: '2024', desc: 'Fully responsive portfolio with animated UI and a mobile-first layout.',
    stack: ['React', 'Tailwind', 'Framer Motion'], gh: 'https://github.com/faizannasim/Faizan-Web.git', live: 'https://faizanwebbb.netlify.app/',
    kpi: '94', kpiLabel: 'Accessibility', img: '/Port.png', c: '#38BDF8' },
  { title: 'SecureSignIn', sub: 'Auth system', year: '2023', desc: 'Secure React login with email-based access, protected routes, and logout via React Router.',
    stack: ['React', 'React Router', 'Tailwind'], gh: 'https://github.com/faizannasim/SecureSignIn.git', live: 'https://login-auth-wine.vercel.app/',
    kpi: null, img: '/Login.png', c: '#4ADE9F' },
  { title: 'CU Clone', sub: 'Frontend replica', year: '2023', desc: 'Pixel-accurate frontend clone of Chandigarh University replicating layout, navigation, and design.',
    stack: ['React', 'Tailwind', 'Figma'], gh: 'https://github.com/faizannasim/chandigarh-university.git', live: 'https://chandigarh-university.vercel.app/',
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
  { id: 'all', label: 'All' }, { id: 'code', label: 'Cyberpunk' }, { id: 'mind', label: 'Mind-bending' }, { id: 'series', label: 'Series' },
  { id: 'marvel', label: 'Marvel' }, { id: 'dc', label: 'DC' }, { id: 'anime', label: 'Anime' }, { id: 'film', label: 'Classics' },
];

const DOCK = [['Home', 'top', Home], ['Experience', 'experience', Briefcase], ['AI', 'ai', Cpu], ['Projects', 'work', FolderOpen], ['Life', 'life', Music2], ['Contact', 'contact', Send]];
const TIPS = {
  top: "Hey, I'm Blip. Scroll, I'll tag along.",
  experience: 'Shipped 10+ pages. Bugs down 40%.',
  ai: 'Tap a layer. The chips rearrange.',
  work: 'Keep scrolling. The gallery slides sideways.',
  life: 'Press play. The record slides out.',
  contact: 'Say hi. He replies fast.',
};
const QUIPS = ['Boop!', 'Try dark and light mode.', 'I can see your cursor.', 'Hire him. Seriously.'];

/* ═══════════════ PAGE ═══════════════ */
export default function Portfolio() {
  const [dark, setDark] = useState(() => {
    try { const s = localStorage.getItem('theme'); if (s) return s === 'dark'; return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch { return true; }
  });
  useEffect(() => { try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {} }, [dark]);
  const t = T[dark ? 'dark' : 'light'];
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState('top');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ids = DOCK.map((d) => d[1]);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:${t.bg};color:${t.text};font-family:'Bricolage Grotesque',system-ui,sans-serif;line-height:1.5;overflow-x:hidden;-webkit-font-smoothing:antialiased;transition:background .5s,color .5s}
    a{color:inherit;text-decoration:none} button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
    ::selection{background:${t.acc};color:${t.accInk}}
    :focus-visible{outline:2px solid ${t.accText};outline-offset:3px;border-radius:10px}
    .serif{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
    .mono{font-family:'JetBrains Mono',monospace}
    .wrap{max-width:1280px;margin:0 auto;padding:0 clamp(18px,4vw,56px)}
    .sec{padding:clamp(80px,10vw,150px) 0}
    .h2{font-weight:700;font-size:clamp(42px,7.4vw,112px);line-height:.92;letter-spacing:-.05em}
    .eyebrow{display:inline-flex;align-items:center;gap:10px;font:500 12px 'JetBrains Mono',monospace;letter-spacing:.09em;text-transform:uppercase;color:${t.faint};margin-bottom:22px}
    .eyebrow::before{content:'';width:24px;height:1px;background:currentColor}
    .card{border-radius:26px;border:1px solid ${t.line};background:${t.card}}
    .spot{position:relative;overflow:hidden}
    .spot::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .35s;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),${t.glow},transparent 62%)}
    .spot:hover::before{opacity:1}
    .btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:999px;font-weight:600;font-size:15px;border:1px solid transparent;transition:transform .3s cubic-bezier(.22,1,.36,1),background .3s,border-color .3s}
    .btn:hover{transform:translateY(-3px)}
    .btn.pri{background:${t.acc};color:${t.accInk}}
    .btn.ghost{border-color:${t.lineStrong}} .btn.ghost:hover{border-color:${t.text}}
    .chip{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;border:1px solid ${t.line};font:500 12px 'JetBrains Mono',monospace;color:${t.dim};background:${t.card2}}
    .grain{position:fixed;inset:0;z-index:5;pointer-events:none;opacity:${dark ? 0.07 : 0.1};background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
    .top{position:fixed;top:0;left:0;right:0;z-index:700;display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,40px);pointer-events:none}
    .top>*{pointer-events:auto}
    .logo{font-weight:800;font-size:22px;letter-spacing:-.06em}
    .dock{position:fixed;left:50%;bottom:18px;z-index:800;display:flex;gap:4px;padding:6px;border-radius:999px;border:1px solid ${t.lineStrong};background:${dark ? 'rgba(16,16,19,.72)' : 'rgba(251,250,245,.78)'};backdrop-filter:blur(18px) saturate(1.5);-webkit-backdrop-filter:blur(18px) saturate(1.5);box-shadow:0 20px 60px -20px rgba(0,0,0,.6)}
    .dk{position:relative;display:flex;align-items:center;gap:8px;height:44px;padding:0 13px;border-radius:999px;font:600 13px 'Bricolage Grotesque';color:${t.dim};white-space:nowrap}
    .dk>span{position:relative;z-index:1;display:flex;align-items:center;gap:8px}
    .dkpill{position:absolute;inset:0;border-radius:999px;background:${t.acc}}
    .dk.on{color:${t.accInk}}
    .hero{position:relative;min-height:100svh;display:flex;align-items:center;padding:120px 0 90px;overflow:hidden}
    .hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(640px circle at var(--hx,60%) var(--hy,30%),${t.glow},transparent 65%)}
    .hero::after{content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(${t.line} 1px,transparent 1px),linear-gradient(90deg,${t.line} 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 20%,transparent 72%);mask-image:radial-gradient(ellipse at 50% 40%,#000 20%,transparent 72%)}
    .hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.8fr);gap:clamp(24px,4vw,64px);align-items:center}
    @media(max-width:980px){.hero-grid{grid-template-columns:1fr}}
    .name{font-weight:800;font-size:clamp(70px,13vw,210px);line-height:.84;letter-spacing:-.065em}
    .ch{display:inline-block;will-change:transform}
    .mq{overflow:hidden;white-space:nowrap;padding:clamp(18px,3vw,34px) 0;border-block:1px solid ${t.line}}
    .mq-t{display:inline-flex;will-change:transform}
    .mq-w{font-weight:800;font-size:clamp(44px,8vw,120px);letter-spacing:-.05em;line-height:1;padding-right:.45em}
    .mq-w.o{color:transparent;-webkit-text-stroke:1.5px ${t.text}}
    .mq-w i{font-style:normal;color:${t.accText};padding-left:.45em}
    .bento{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
    @media(max-width:900px){.bento{grid-template-columns:repeat(2,minmax(0,1fr))}}
    .split{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5vw,72px);align-items:start}
    @media(max-width:880px){.split{grid-template-columns:1fr}.stk{position:static!important}}
    .acc-h{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:16px 0;border-top:1px solid ${t.line};font-weight:600;font-size:16px}
    .pj{display:grid;grid-template-columns:1.15fr 1fr;gap:0;height:min(64vh,560px);overflow:hidden}
    @media(max-width:880px){.pj{grid-template-columns:1fr;grid-template-rows:38% 1fr;height:min(76vh,640px)}}
    .pl{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(20px,3vw,44px);align-items:center;padding:clamp(18px,3vw,36px)}
    @media(max-width:860px){.pl{grid-template-columns:1fr}}
    .pl-media{position:relative;padding:7% 0}
    .pl-video{position:relative;z-index:2;width:70%;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#000;box-shadow:0 30px 60px -20px rgba(0,0,0,.8),0 0 0 1px ${t.lineStrong}}
    .pl-video>div,.pl-video iframe{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important}
    .vinyl{position:absolute;z-index:1;width:52%;aspect-ratio:1;border-radius:50%;top:50%;box-shadow:0 20px 50px -16px rgba(0,0,0,.8)}
    .vd{width:100%;height:100%;border-radius:50%;animation:spin 3.4s linear infinite;animation-play-state:paused;
      background:radial-gradient(circle,transparent 0 24%,rgba(255,255,255,.05) 24.5% 25%,transparent 25.5%),conic-gradient(from 20deg,#111,#2a2a30 12%,#111 25%,#26262b 40%,#111 55%,#2a2a30 70%,#111 85%,#26262b),repeating-radial-gradient(circle,#0d0d10 0 2px,#17171b 2px 4px)}
    .playing .vd{animation-play-state:running}
    .vd::after{content:'';position:absolute;inset:34%;border-radius:50%;background:linear-gradient(135deg,var(--c0),var(--c1));box-shadow:0 0 0 5px #0b0b0d}
    @keyframes spin{to{transform:rotate(360deg)}}
    .trk{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 12px;border-radius:12px;font-size:14px;position:relative}
    .trk>*{position:relative;z-index:1}
    .reel{display:flex;gap:16px;overflow-x:auto;padding:8px 4px 22px;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:${t.lineStrong} transparent}
    .rc{flex-shrink:0;width:clamp(150px,18vw,210px);scroll-snap-align:start}
    .rp{position:relative;aspect-ratio:2/3;border-radius:16px;overflow:hidden;border:1px solid ${t.line};background:var(--c33)}
    .rp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .cf{width:100%;background:transparent;color:${t.text};border:0;border-bottom:1px solid ${t.lineStrong};padding:14px 0;margin-bottom:18px;font:500 16px 'Bricolage Grotesque';outline:none;resize:vertical;transition:border-color .3s}
    .cf:focus{border-color:${t.accText}}
    .cf::placeholder{color:${t.faint}}
    .cur{position:fixed;left:0;top:0;z-index:2000;pointer-events:none}
    @media(pointer:coarse){.cur{display:none}}
    .blip{position:fixed;right:clamp(12px,3vw,28px);bottom:84px;z-index:750;display:flex;flex-direction:column;align-items:flex-end;pointer-events:none}
    .blip>*{pointer-events:auto}
    .bub{max-width:200px;margin:0 6px 8px 0;padding:9px 12px;border-radius:14px;font:500 11.5px/1.45 'JetBrains Mono',monospace;background:${t.card2};border:1px solid ${t.lineStrong};box-shadow:0 14px 30px -16px rgba(0,0,0,.7)}
    .blip svg{width:clamp(56px,6vw,74px);height:auto;overflow:visible;animation:bob 3s ease-in-out infinite}
    @keyframes bob{50%{transform:translateY(-5px)}}
    @keyframes pulse{50%{opacity:.45;transform:scale(.7)}}
    @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="grain" aria-hidden />
      <Preloader t={t} onDone={() => setReady(true)} />
      <Cursor t={t} />
      <motion.div aria-hidden style={{ scaleX: scrollYProgress, transformOrigin: '0 50%', position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: t.acc, zIndex: 900 }} />

      <header className="top">
        <motion.a href="#top" className="logo" initial={{ y: -30, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, ease: EASE }}>
          FN<span style={{ color: t.accText }}>.</span>
        </motion.a>
        <motion.a href="https://drive.google.com/file/d/1fjrdhe3k8yrxq8kD_gFdiGlL2OFNoz71/view?usp=sharing" target="_blank" rel="noopener noreferrer"
          className="btn ghost" style={{ padding: '10px 18px', fontSize: 13, background: dark ? 'rgba(10,10,11,.5)' : 'rgba(242,240,232,.6)', backdropFilter: 'blur(10px)' }}
          initial={{ y: -30, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}>
          Resume <ArrowUpRight size={14} />
        </motion.a>
      </header>

      <motion.nav className="dock" aria-label="Primary" style={{ x: '-50%' }}
        initial={{ y: 120, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.3 }}>
        {DOCK.map(([label, id, Icon]) => (
          <a key={id} href={`#${id}`} className={`dk${active === id ? ' on' : ''}`} aria-label={label}>
            {active === id && <motion.i layoutId="dkpill" className="dkpill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>
              <Icon size={17} />
              <AnimatePresence initial={false}>
                {active === id && (
                  <motion.em key="l" style={{ fontStyle: 'normal', overflow: 'hidden', whiteSpace: 'nowrap' }}
                    initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>{label}</motion.em>
                )}
              </AnimatePresence>
            </span>
          </a>
        ))}
        <button className="dk" aria-label="Toggle theme" onClick={() => setDark((d) => !d)}>
          <span>{dark ? <Sun size={17} /> : <Moon size={17} />}</span>
        </button>
      </motion.nav>

      <Blip t={t} active={active} ready={ready} />

      <main>
        <Hero t={t} ready={ready} />
        <VelocityMarquee t={t} />
        <Stats t={t} />
        <Experience t={t} />
        <AISection t={t} />
        <Projects t={t} />
        <OffTime t={t} />
        <Contact t={t} />
      </main>
    </>
  );
}

/* ═══════════════ MOTION PRIMITIVES ═══════════════ */
function Reveal({ children, delay = 0, y = 36 }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/* Words rise out of a mask, staggered, on scroll into view */
function Split({ as = 'span', children, className, style, delay = 0 }) {
  const M = motion[as];
  const text = String(children);
  const words = text.split(' ');
  return (
    <M className={className} style={style} aria-label={text} initial="hide" whileInView="show" viewport={{ once: true, margin: '-60px' }}
      variants={{ hide: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '.12em', marginBottom: '-.12em' }}>
          <motion.span style={{ display: 'inline-block' }} variants={{ hide: { y: '118%', rotate: 5 }, show: { y: 0, rotate: 0, transition: { duration: 0.85, ease: EASE } } }}>{w}</motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </M>
  );
}

function Spot({ children, className = '', style, ...rest }) {
  const mv = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return <div className={`spot ${className}`} style={style} onMouseMove={mv} {...rest}>{children}</div>;
}

function Magnetic({ children, strength = 0.35, style }) {
  const ref = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 14, mass: 0.3 });
  const y = useSpring(my, { stiffness: 220, damping: 14, mass: 0.3 });
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block', ...style }}
      onPointerMove={(e) => { const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - (r.left + r.width / 2)) * strength); my.set((e.clientY - (r.top + r.height / 2)) * strength); }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}>
      {children}
    </motion.div>
  );
}

function Typer({ words, color }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i]; let id;
    if (!del && n === w.length) id = setTimeout(() => setDel(true), 1600);
    else if (del && n === 0) { setDel(false); setI((i + 1) % words.length); }
    else id = setTimeout(() => setN(n + (del ? -1 : 1)), del ? 30 : 65);
    return () => clearTimeout(id);
  }, [n, del, i, words]);
  return <span className="serif" style={{ color, fontSize: '1.08em' }}>{words[i].slice(0, n)}<span style={{ display: 'inline-block', width: 3, height: '.85em', background: color, marginLeft: 3, verticalAlign: '-.05em', animation: 'pulse 1s steps(1) infinite' }} /></span>;
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

/* Preloader: lime curtain, counter, then wipes up */
function Preloader({ t, onDone }) {
  const [show, setShow] = useState(() => {
    try { if (sessionStorage.getItem('pl')) return false; return !window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return true; }
  });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!show) { onDone(); return; }
    document.body.style.overflow = 'hidden';
    const c = animate(0, 100, {
      duration: 1.9, ease: 'easeInOut', onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(() => { setShow(false); try { sessionStorage.setItem('pl', '1'); } catch {} }, 250),
    });
    return () => { c.stop(); document.body.style.overflow = ''; };
  }, [show]);
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div role="status" aria-label="Loading" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: EASE }}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: t.acc, color: t.accInk, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(18px,4vw,44px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 13px JetBrains Mono, monospace' }}>
            <span>Faizan Nasim</span><span>Portfolio '26</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(100px,26vw,380px)', lineHeight: 0.8, letterSpacing: '-.07em' }}>{String(n).padStart(2, '0')}</div>
          </div>
          <div style={{ height: 4, background: 'rgba(16,19,10,.15)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${n}%`, background: t.accInk }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Custom cursor: dot, grows on interactive, shows label on [data-cursor] */
function Cursor({ t }) {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });
  const [fine, setFine] = useState(false);
  const [st, setSt] = useState({ big: false, label: '' });
  useEffect(() => {
    let ok = false; try { ok = window.matchMedia('(pointer: fine)').matches; } catch {}
    if (!ok) return;
    setFine(true);
    const mv = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      const tg = e.target && e.target.closest ? e.target : null;
      const lab = tg && tg.closest('[data-cursor]');
      const big = !!(tg && tg.closest('a,button,[role="slider"],input,textarea'));
      setSt((p) => { const label = lab ? lab.getAttribute('data-cursor') : ''; return p.big === big && p.label === label ? p : { big, label }; });
    };
    window.addEventListener('pointermove', mv, { passive: true });
    return () => window.removeEventListener('pointermove', mv);
  }, []);
  if (!fine) return null;
  const lab = !!st.label;
  return (
    <motion.div className="cur" aria-hidden style={{ x: sx, y: sy }}>
      <motion.div style={{ transform: 'translate(-50%,-50%)', display: 'grid', placeItems: 'center', borderRadius: '50%', font: '700 12px JetBrains Mono, monospace', overflow: 'hidden', mixBlendMode: lab ? 'normal' : 'difference' }}
        animate={{ width: lab ? 92 : st.big ? 46 : 14, height: lab ? 92 : st.big ? 46 : 14, background: lab ? t.acc : '#ffffff', opacity: st.big && !lab ? 0.9 : 1, color: t.accInk }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}>
        {lab ? st.label : ''}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════ HERO ═══════════════ */
function KName({ text, delay = 0, color, serif }) {
  return (
    <span style={{ display: 'block', color }} className={serif ? 'serif' : ''}>
      {text.split('').map((c, i) => (
        <motion.span key={i} className="ch" initial={{ y: 80, opacity: 0, filter: 'blur(14px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.06, duration: 0.8, ease: EASE }} whileHover={{ y: -14, rotate: -5, transition: { type: 'spring', stiffness: 400, damping: 12 } }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

function Hero({ t, ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yName = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 16 });
  return (
    <section id="top" ref={ref} className="hero"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--hx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--hy', `${e.clientY - r.top}px`); }}>
      <div className="wrap hero-grid">
        <motion.div style={{ y: yName, opacity: fade }}>
          <motion.div className="chip" initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7, ease: EASE }} style={{ marginBottom: 26 }}>
            <i style={{ width: 8, height: 8, borderRadius: '50%', background: t.acc, boxShadow: `0 0 12px ${t.acc}`, animation: 'pulse 2s infinite' }} />
            Available for work · Frontend & AI
          </motion.div>
          <h1 aria-label="Faizan Nasim" className="name">
            {ready && <><KName text="Faizan" delay={0.25} color={t.text} /><KName text="Nasim" delay={0.6} color={t.accText} serif /></>}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
            style={{ fontSize: 'clamp(20px,2.3vw,30px)', fontWeight: 600, letterSpacing: '-.03em', marginTop: 'clamp(22px,3vw,38px)', minHeight: '2.5em', maxWidth: 600 }}>
            Frontend developer building <Typer words={ROLES} color={t.accText} />
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.25, duration: 0.8, ease: EASE }}
            style={{ color: t.dim, fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>
            I build responsive, API-driven web apps with React and Tailwind. Now I'm learning AI engineering, so the interfaces I build can sit on top of models, retrieval, and agents I understand end to end.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32, alignItems: 'center' }}>
            <Magnetic><a href="#work" className="btn pri" data-cursor="Go">See my work <ArrowDown size={16} /></a></Magnetic>
            {[[Github, 'https://github.com/faizannasim', 'GitHub'], [Linkedin, 'https://www.linkedin.com/in/faizan-nasim-2262a930a/', 'LinkedIn'], [Twitter, 'https://x.com/FaizanNasim8', 'Twitter'], [BsYoutube, 'https://www.youtube.com/@CodeWithFaizan-x8w/videos', 'YouTube']].map(([I, h, l]) => (
              <Magnetic key={l} strength={0.5}><a href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className="btn ghost" style={{ padding: 14 }}><I size={18} /></a></Magnetic>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D tilt card + rotating badge */}
        <motion.div style={{ perspective: 1000, position: 'relative' }} initial={{ opacity: 0, y: 40 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9, duration: 1, ease: EASE }}
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}>
          <motion.div className="card spot" style={{ rotateX: rx, rotateY: ry, padding: 'clamp(22px,3vw,34px)', background: t.card2 }}>
            <div className="mono" style={{ fontSize: 11, color: t.faint, marginBottom: 18, display: 'flex', justifyContent: 'space-between' }}><span>now.json</span><span>live</span></div>
            {[['building', 'AI agents with LangGraph', t.acc], ['working at', 'GEDU Services, Noida', t.violet], ['shipped', '10+ pages · 3 roles', t.pink], ['learning', 'RAG & tool calling', t.acc]].map(([k, v, c], i) => (
              <motion.div key={k} initial={{ opacity: 0, x: 20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.3 + i * 0.12, duration: 0.6, ease: EASE }}
                style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '14px 0', borderTop: `1px solid ${t.line}` }}>
                <i style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0, transform: 'translateY(-1px)' }} />
                <span className="mono" style={{ fontSize: 11.5, color: t.faint, minWidth: 82 }}>{k}</span>
                <span style={{ fontWeight: 600, letterSpacing: '-.01em' }}>{v}</span>
              </motion.div>
            ))}
          </motion.div>
          <a href="#experience" aria-label="Scroll to experience" data-cursor="Scroll" style={{ position: 'absolute', right: -14, bottom: -34, width: 112, height: 112, display: 'grid', placeItems: 'center', zIndex: 3 }}>
            <svg viewBox="0 0 120 120" width="112" height="112" style={{ animation: 'spin 16s linear infinite', position: 'absolute', inset: 0 }}>
              <defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
              <text fontSize="11.5" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="3.2" fill={t.text}><textPath href="#circ">SCROLL DOWN · SCROLL DOWN · SCROLL DOWN ·</textPath></text>
            </svg>
            <span style={{ width: 46, height: 46, borderRadius: '50%', background: t.acc, color: t.accInk, display: 'grid', placeItems: 'center' }}><ArrowDown size={20} /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* Marquee whose speed and direction react to scroll velocity */
function MarqueeRow({ words, base, outline, t }) {
  const bx = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const sv = useSpring(vel, { damping: 50, stiffness: 400 });
  const f = useTransform(sv, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(bx, (v) => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, d) => {
    let mv = dir.current * base * (d / 1000);
    if (f.get() < 0) dir.current = -1; else if (f.get() > 0) dir.current = 1;
    mv += dir.current * mv * f.get();
    bx.set(bx.get() + mv);
  });
  const set = (k) => words.map((w, i) => <span key={`${k}${i}`} className={`mq-w${(i + (outline ? 1 : 0)) % 2 ? ' o' : ''}`}>{w}<i>✦</i></span>);
  return <div className="mq" aria-hidden><motion.div className="mq-t" style={{ x }}>{set('a')}{set('b')}</motion.div></div>;
}
function VelocityMarquee({ t }) {
  return (
    <div style={{ marginTop: -1 }}>
      <MarqueeRow t={t} words={['React', 'Tailwind', 'REST APIs', 'RBAC', 'Framer Motion']} base={-4} />
      <MarqueeRow t={t} words={['LangChain', 'RAG', 'AI Agents', 'Tool Calling', 'Embeddings']} base={3.5} outline />
    </div>
  );
}

/* ═══════════════ STATS (BENTO) ═══════════════ */
function Stats({ t }) {
  const cols = [t.acc, t.violet, t.pink, t.acc];
  return (
    <section className="sec" aria-label="Impact" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <Reveal><div className="eyebrow">Impact at a glance</div></Reveal>
        <div className="bento">
          {SPECS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ height: '100%' }}>
                <Spot className="card" style={{ padding: 'clamp(20px,2.4vw,30px)', height: '100%', minHeight: 210, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 'clamp(54px,6.4vw,100px)', fontWeight: 800, letterSpacing: '-.06em', lineHeight: 0.9, color: cols[i] === t.acc ? t.accText : cols[i] }}><Count to={s.to} suffix={s.suffix} /></div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>{s.label}</div>
                    <div className="mono" style={{ fontSize: 11.5, color: t.faint, marginTop: 4, lineHeight: 1.5 }}>{s.note}</div>
                  </div>
                </Spot>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 16, marginTop: 16 }}>
          {RECOGNITION.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <Spot className="card" style={{ padding: '24px 26px', height: '100%' }}>
                <span className="chip" style={{ color: t.accText }}>★ {r.year}</span>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.03em', marginTop: 14, lineHeight: 1.2 }}>{r.title}</div>
                <div style={{ color: t.dim, fontSize: 14.5, marginTop: 8, lineHeight: 1.6 }}>{r.desc}</div>
              </Spot>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ EXPERIENCE ═══════════════ */
function Experience({ t }) {
  const [open, setOpen] = useState(0);
  const e = EXPERIENCE;
  const col = (k) => (k === 'acc' ? t.accText : t[k]);
  return (
    <section id="experience" className="sec">
      <div className="wrap split">
        <div className="stk" style={{ position: 'sticky', top: 110 }}>
          <Reveal><div className="eyebrow">01 · Experience</div></Reveal>
          <Split as="h2" className="h2">Where I work now</Split>
        </div>
        <Reveal>
          <Spot className="card" style={{ padding: 'clamp(22px,3vw,38px)' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: 46, height: 46, borderRadius: 14, background: t.acc, color: t.accInk, display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 20 }}>G</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-.03em' }}>{e.company}</div>
                <div className="mono" style={{ fontSize: 12, color: t.faint }}>{e.location}</div>
              </div>
              <span className="chip" style={{ marginLeft: 'auto', color: t.accText }}><i style={{ width: 6, height: 6, borderRadius: '50%', background: t.acc, animation: 'pulse 2s infinite' }} />current</span>
            </div>
            <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <span className="serif" style={{ fontSize: 26, color: t.accText }}>{e.role}</span>
              <span className="mono" style={{ fontSize: 12, color: t.faint }}>{e.date}</span>
            </div>
            <div style={{ marginTop: 22 }}>
              {e.groups.map((g, i) => (
                <div key={g.title}>
                  <button className="acc-h" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} data-cursor="Toggle">
                    <i style={{ width: 10, height: 10, borderRadius: '50%', background: col(g.color), flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{g.title}</span>
                    <motion.span animate={{ rotate: open === i ? 135 : 0 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'grid' }}><Plus size={18} /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
                        style={{ listStyle: 'none', overflow: 'hidden' }}>
                        {g.bullets.map((b, bi) => (
                          <motion.li key={bi} initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08 + bi * 0.08, duration: 0.5, ease: EASE }}
                            style={{ color: t.dim, fontSize: 15, lineHeight: 1.7, paddingLeft: 22, paddingBottom: 14, position: 'relative' }}>
                            <span aria-hidden style={{ position: 'absolute', left: 0, top: '.8em', width: 10, height: 2, background: col(g.color) }} />{b}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Spot>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ AI ═══════════════ */
function AISection({ t }) {
  const [layer, setLayer] = useState('all');
  const cur = LAYERS.find((l) => l.id === layer);
  const list = AI_TAGS.filter((x) => layer === 'all' || x.l === layer);
  return (
    <section id="ai" className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal><div className="eyebrow">02 · AI engineering</div></Reveal>
        <Split as="h2" className="h2" style={{ marginBottom: 26 }}>Building with AI</Split>
        <Reveal>
          <p style={{ fontSize: 'clamp(17px,1.9vw,21px)', color: t.dim, maxWidth: 680, lineHeight: 1.65, marginBottom: 36 }}>
            Frontend taught me how people use software. AI engineering is what happens behind the screen: orchestrating retrieval architectures, building multi-step agents, and connecting precise tool calls. I build across both worlds.
          </p>
        </Reveal>
        <Spot className="card" style={{ padding: 'clamp(20px,3vw,40px)' }}>
          <div role="tablist" aria-label="AI skill layers" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {LAYERS.map((l) => (
              <button key={l.id} role="tab" aria-selected={layer === l.id} onClick={() => setLayer(l.id)} data-cursor="Filter"
                style={{ position: 'relative', padding: '10px 18px', borderRadius: 999, fontWeight: 600, fontSize: 14, color: layer === l.id ? t.accInk : t.dim, border: `1px solid ${t.line}` }}>
                {layer === l.id && <motion.i layoutId="aipill" style={{ position: 'absolute', inset: -1, borderRadius: 999, background: t.acc }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span style={{ position: 'relative' }}>{l.label}</span>
              </button>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 12.5, color: t.faint, margin: '18px 0 26px', minHeight: 20 }}>{cur.desc}</div>
          <motion.div layout style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <AnimatePresence mode="popLayout">
              {list.map((tag) => (
                <motion.span key={tag.name} layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ y: -6, rotate: -2 }} transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 999, border: `1px solid ${tag.c}55`, background: `${tag.c}14`, fontWeight: 700, letterSpacing: '-.02em',
                    padding: tag.w === 3 ? '16px 28px' : tag.w === 2 ? '12px 22px' : '9px 18px', fontSize: tag.w === 3 ? 22 : tag.w === 2 ? 17 : 14 }}>
                  <i style={{ width: 8, height: 8, borderRadius: '50%', background: tag.c, boxShadow: `0 0 10px ${tag.c}` }} />{tag.name}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="mono" style={{ fontSize: 11.5, color: t.faint, marginTop: 26 }}>{list.length} of {AI_TAGS.length} skills</div>
        </Spot>
      </div>
    </section>
  );
}

/* ═══════════════ PROJECTS: pinned horizontal gallery ═══════════════ */
function ProjectCard({ p, i, n, prog, t, cardW }) {
  const mid = i / (n - 1);
  const scale = useTransform(prog, [mid - 0.3, mid, mid + 0.3], [0.88, 1, 0.88]);
  const op = useTransform(prog, [mid - 0.35, mid, mid + 0.35], [0.45, 1, 0.45]);
  return (
    <motion.article className="card pj" style={{ width: `${cardW}vw`, flexShrink: 0, scale, opacity: op, background: t.card2, borderRadius: 30 }}>
      <a href={p.live || p.gh} target="_blank" rel="noopener noreferrer" data-cursor="Open" aria-label={`Open ${p.title}`}
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: `linear-gradient(135deg, ${p.c}66, ${t.card})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'rgba(8,9,12,.85)', flexShrink: 0 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
          <span className="mono" style={{ marginLeft: 10, flex: 1, minWidth: 0, padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,.08)', color: 'rgba(244,243,238,.65)', fontSize: 10.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {p.live ? p.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'github.com/faizannasim'}
          </span>
        </div>
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <motion.img src={p.img} alt={`${p.title} screenshot`} loading="lazy" whileHover={{ scale: 1.06 }} transition={{ duration: 0.9, ease: EASE }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>
      </a>
      <div style={{ padding: 'clamp(18px,2.4vw,34px)', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 800, fontSize: 'clamp(40px,5vw,72px)', letterSpacing: '-.06em', lineHeight: 0.9, color: 'transparent', WebkitTextStroke: `1.5px ${p.c}` }}>{String(i + 1).padStart(2, '0')}</span>
          {p.kpi && <span style={{ textAlign: 'right' }}><span style={{ display: 'block', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: p.c }}>{p.kpi}</span><span className="mono" style={{ fontSize: 10.5, color: t.faint }}>{p.kpiLabel}</span></span>}
        </div>
        <h3 style={{ fontSize: 'clamp(34px,4.4vw,64px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 0.95, marginTop: 'clamp(10px,2vh,22px)' }}>{p.title}</h3>
        <div className="mono" style={{ fontSize: 12.5, color: p.c, fontWeight: 600, margin: '8px 0 12px' }}>{p.sub}, {p.year}</div>
        <p style={{ color: t.dim, fontSize: 15, lineHeight: 1.65 }}>{p.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '14px 0' }}>{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 6 }}>
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn pri" style={{ padding: '11px 20px', fontSize: 14 }}>Live site <ArrowUpRight size={15} /></a>}
          <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{ padding: '11px 20px', fontSize: 14 }}><Github size={15} /> Code</a>
        </div>
      </div>
    </motion.article>
  );
}

function Projects({ t }) {
  const ref = useRef(null);
  const n = PROJECTS.length;
  const [mob, setMob] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 880px)');
    const f = () => setMob(mq.matches); f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  const cardW = mob ? 86 : 72, gap = 4;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const prog = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.4 });
  const x = useTransform(prog, [0, 1], ['0vw', `${-(n - 1) * (cardW + gap)}vw`]);
  useEffect(() => scrollYProgress.on('change', (v) => setIdx(Math.min(n - 1, Math.round(v * (n - 1))))), [scrollYProgress, n]);
  return (
    <section id="work" ref={ref} style={{ height: `${n * 80 + 40}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(14px,3vh,32px)', paddingTop: 56 }}>
        <div className="wrap" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>03 · Selected work</div>
            <Split as="h2" className="h2" style={{ fontSize: 'clamp(38px,6vw,88px)' }}>Proof of work</Split>
          </div>
          <div className="mono" style={{ fontSize: 14, color: t.faint, whiteSpace: 'nowrap' }}>
            <span style={{ color: t.accText, fontSize: 28, fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
          </div>
        </div>
        <motion.div style={{ x, display: 'flex', gap: `${gap}vw`, paddingLeft: `${(100 - cardW) / 2}vw`, width: 'max-content' }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} n={n} prog={prog} t={t} cardW={cardW} />)}
        </motion.div>
        <div className="wrap" style={{ width: '100%' }}>
          <div style={{ height: 3, background: t.line, borderRadius: 3, overflow: 'hidden' }}>
            <motion.div style={{ height: '100%', background: t.acc, transformOrigin: '0 50%', scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ OFF-TIME: vinyl player + reel ═══════════════ */
function OffTime({ t }) {
  const [tab, setTab] = useState('music');
  return (
    <section id="life" className="sec" style={{ paddingTop: 'clamp(40px,6vw,80px)' }}>
      <div className="wrap">
        <Reveal><div className="eyebrow">04 · Off-time</div></Reveal>
        <Split as="h2" className="h2" style={{ marginBottom: 24 }}>Away from the keyboard</Split>
        <Reveal>
          <p style={{ fontSize: 'clamp(17px,1.9vw,21px)', color: t.dim, maxWidth: 660, lineHeight: 1.65, marginBottom: 32 }}>
            What goes on when the code editor closes. Lo-fi for deep debugging, cinematic stories for pacing and detail, and a lot of hacking films for the vibe.
          </p>
        </Reveal>
        <div role="tablist" style={{ display: 'inline-flex', padding: 5, borderRadius: 999, border: `1px solid ${t.line}`, background: t.card, marginBottom: 26 }}>
          {[['music', 'Music'], ['reel', 'Reel life']].map(([id, l]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} data-cursor="Switch"
              style={{ position: 'relative', padding: '11px 24px', borderRadius: 999, fontWeight: 600, fontSize: 14, color: tab === id ? t.accInk : t.dim }}>
              {tab === id && <motion.i layoutId="offpill" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: t.acc }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span style={{ position: 'relative' }}>{l}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }} transition={{ duration: 0.45, ease: EASE }}>
            {tab === 'music' ? <Player t={t} /> : <Reel t={t} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Player({ t }) {
  const [idx, setIdx] = useState(0), [playing, setPlaying] = useState(false), [el, setEl] = useState(0);
  const [dur, setDur] = useState(TRACKS[0].dur), [ready, setReady] = useState(false), [api, setApi] = useState(false);
  const yt = useRef(null), box = useRef(null), idxR = useRef(0);
  const tr = TRACKS[idx];
  const [c0, c1] = tr.c;
  useEffect(() => { idxR.current = idx; }, [idx]);
  useEffect(() => {
    if (window.YT && window.YT.Player) { setApi(true); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); setApi(true); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
    }
  }, []);
  useEffect(() => {
    if (!api || yt.current || !box.current) return;
    yt.current = new window.YT.Player(box.current, {
      videoId: TRACKS[0].yt,
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1, rel: 0, iv_load_policy: 3, origin: window.location.origin },
      events: {
        onReady: () => setReady(true),
        onStateChange: (e) => {
          const Y = window.YT; if (!Y) return;
          if (e.data === Y.PlayerState.PLAYING) setPlaying(true);
          else if (e.data === Y.PlayerState.PAUSED) setPlaying(false);
          else if (e.data === Y.PlayerState.ENDED) { const ni = (idxR.current + 1) % TRACKS.length; setIdx(ni); setEl(0); yt.current.loadVideoById(TRACKS[ni].yt); }
        },
      },
    });
  }, [api]);
  useEffect(() => { if (!ready) return; try { playing ? yt.current.playVideo() : yt.current.pauseVideo(); } catch {} }, [playing, ready]);
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => { try { setEl(yt.current.getCurrentTime() || 0); const d = yt.current.getDuration(); if (d > 0) setDur(d); } catch {} }, 500);
    return () => clearInterval(id);
  }, [ready]);
  const load = (i) => { setIdx(i); setEl(0); if (ready) { try { yt.current.loadVideoById(TRACKS[i].yt); } catch {} } };
  const pick = (i) => { if (i === idx) { setPlaying((p) => !p); return; } load(i); setPlaying(true); };
  const seek = (e) => { const r = e.currentTarget.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); try { yt.current.seekTo(p * (yt.current.getDuration() || dur), true); setEl(p * dur); } catch {} };
  const pct = Math.min(100, (dur ? el / dur : 0) * 100);
  const rb = { width: 52, height: 52, borderRadius: '50%', border: `1px solid ${t.lineStrong}`, display: 'grid', placeItems: 'center' };
  return (
    <Spot className={`card pl${playing ? ' playing' : ''}`} style={{ '--c0': c0, '--c1': c1 }}>
      <div className="pl-media">
        <div aria-hidden style={{ position: 'absolute', inset: '-10%', background: `radial-gradient(50% 60% at 30% 40%, ${c0}55, transparent 70%), radial-gradient(50% 60% at 80% 70%, ${c1}44, transparent 70%)`, filter: 'blur(30px)', transition: 'background 1s' }} />
        <motion.div className="vinyl" style={{ y: '-50%' }} initial={false} animate={{ right: playing ? '0%' : '30%' }} transition={{ type: 'spring', stiffness: 70, damping: 16 }}>
          <div className="vd" />
        </motion.div>
        <div className="pl-video"><div ref={box} /></div>
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="mono" style={{ fontSize: 11.5, color: t.faint, marginBottom: 12 }}>{playing ? '▶ now playing' : '❚❚ paused'} · {String(idx + 1).padStart(2, '0')}/{String(TRACKS.length).padStart(2, '0')}</div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: EASE }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(26px,3.2vw,44px)', letterSpacing: '-.045em', lineHeight: 1 }}>{tr.title}</div>
            <div style={{ color: t.dim, marginTop: 6 }}>{tr.artist}</div>
          </motion.div>
        </AnimatePresence>
        <div role="slider" tabIndex={0} aria-label="Seek" aria-valuemin={0} aria-valuemax={dur} aria-valuenow={el} onClick={seek} data-cursor="Seek"
          style={{ height: 22, display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 20 }}>
          <div style={{ flex: 1, height: 5, borderRadius: 5, background: t.line, overflow: 'hidden' }}><div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${c0},${c1})` }} /></div>
        </div>
        <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.faint }}><span>{fmt(el)}</span><span>−{fmt(Math.max(0, dur - el))}</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
          <button style={rb} aria-label="Previous" onClick={() => { load((idx - 1 + TRACKS.length) % TRACKS.length); }}><SkipBack size={18} /></button>
          <motion.button whileTap={{ scale: 0.9 }} style={{ ...rb, width: 68, height: 68, background: t.acc, color: t.accInk, border: 0 }} aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause size={26} /> : <Play size={26} />}
          </motion.button>
          <button style={rb} aria-label="Next" onClick={() => { load((idx + 1) % TRACKS.length); }}><SkipForward size={18} /></button>
        </div>
        <div style={{ maxHeight: 190, overflowY: 'auto', scrollbarWidth: 'thin', margin: '0 -6px', padding: '0 6px' }}>
          {TRACKS.map((x, i) => (
            <button key={x.title} className="trk" onClick={() => pick(i)} style={{ color: i === idx ? t.text : t.dim }}>
              {i === idx && <motion.i layoutId="trkbg" style={{ position: 'absolute', inset: 0, borderRadius: 12, background: t.card2 }} transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="mono" style={{ fontSize: 11, color: i === idx ? t.accText : t.faint, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>{x.title} <span style={{ color: t.faint, fontWeight: 400 }}>· {x.artist}</span></span>
              <span className="mono" style={{ fontSize: 11, color: t.faint }}>{fmt(x.dur)}</span>
            </button>
          ))}
        </div>
      </div>
    </Spot>
  );
}

function Reel({ t }) {
  const ref = useRef(null);
  const [f, setF] = useState('all');
  const items = f === 'all' ? REEL : REEL.filter((r) => r.cats.includes(f));
  const nudge = (d) => ref.current?.scrollBy({ left: d * 360, behavior: 'smooth' });
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
        {REEL_CATS.map((c) => (
          <button key={c.id} onClick={() => { setF(c.id); ref.current?.scrollTo({ left: 0, behavior: 'smooth' }); }} data-cursor="Filter"
            style={{ position: 'relative', padding: '9px 16px', borderRadius: 999, fontWeight: 600, fontSize: 13, border: `1px solid ${t.line}`, color: f === c.id ? t.accInk : t.dim }}>
            {f === c.id && <motion.i layoutId="reelpill" style={{ position: 'absolute', inset: -1, borderRadius: 999, background: t.acc }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span style={{ position: 'relative' }}>{c.label}</span>
          </button>
        ))}
        <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <span className="mono" style={{ fontSize: 12, color: t.faint, marginRight: 6 }}>{items.length} titles</span>
          <button className="btn ghost" aria-label="Scroll left" style={{ padding: 11 }} onClick={() => nudge(-1)}><ArrowLeft size={16} /></button>
          <button className="btn ghost" aria-label="Scroll right" style={{ padding: 11 }} onClick={() => nudge(1)}><ArrowRight size={16} /></button>
        </span>
      </div>
      <div className="reel" ref={ref}>
        {items.map((r, i) => (
          <motion.div key={`${r.title}-${f}`} className="rc" initial={{ opacity: 0, y: 30, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.55, delay: Math.min(i * 0.035, 0.4), ease: EASE }} whileHover={{ y: -12, rotate: -1.5 }}>
            <div className="rp" style={{ '--c33': `${r.c}33` }}>
              <img src={r.poster} alt={`${r.title} poster`} loading="lazy" referrerPolicy="no-referrer" />
              <span className="mono" style={{ position: 'absolute', top: 9, left: 9, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,0,0,.72)', color: '#fff', fontSize: 9.5, fontWeight: 600 }}>{r.type}</span>
            </div>
            <div style={{ padding: '12px 4px 0' }}>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
              <div className="mono" style={{ fontSize: 10.5, color: t.faint, marginTop: 2 }}>{r.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ CONTACT ═══════════════ */
function Contact({ t }) {
  const [copied, setCopied] = useState(false), [name, setName] = useState(''), [note, setNote] = useState(''), [time, setTime] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`Hello from ${name || 'your portfolio'}`)}&body=${encodeURIComponent(note)}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { window.location.href = `mailto:${EMAIL}`; return; }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" className="sec" style={{ paddingBottom: 30 }}>
      <div className="wrap">
        <Reveal><div className="eyebrow">05 · Contact</div></Reveal>
        <h2 className="h2" style={{ fontSize: 'clamp(54px,12vw,190px)', letterSpacing: '-.06em', lineHeight: 0.88 }} aria-label="Let's build something good">
          <Split as="span">Let's build</Split><br /><span className="serif" style={{ color: t.accText }}><Split as="span" delay={0.2}>something good</Split></span>
        </h2>
        <div className="split" style={{ marginTop: 'clamp(36px,5vw,70px)', alignItems: 'start' }}>
          <Reveal>
            <p style={{ fontSize: 19, color: t.dim, lineHeight: 1.7, maxWidth: 480 }}>Open to frontend roles, AI projects, and collaborations. Small idea or big vision, send me a message.</p>
            <a href={`mailto:${EMAIL}`} data-cursor="Mail" className="serif" style={{ display: 'inline-block', marginTop: 26, fontSize: 'clamp(24px,3.4vw,46px)', wordBreak: 'break-all', backgroundImage: `linear-gradient(${t.accText},${t.accText})`, backgroundSize: '0% 3px', backgroundPosition: '0 100%', backgroundRepeat: 'no-repeat', transition: 'background-size .6s cubic-bezier(.22,1,.36,1)', paddingBottom: 6 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundSize = '100% 3px')} onMouseLeave={(e) => (e.currentTarget.style.backgroundSize = '0% 3px')}>{EMAIL}</a>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
              <button className="btn ghost" onClick={copy} aria-live="polite">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy email'}</button>
              <a className="btn ghost" href="https://www.linkedin.com/in/faizan-nasim-2262a930a/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Spot className="card" style={{ padding: 'clamp(22px,3vw,38px)' }}>
              <label className="mono" htmlFor="cf-n" style={{ fontSize: 11, color: t.faint }}>your name</label>
              <input id="cf-n" className="cf" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tim Cook" autoComplete="name" />
              <label className="mono" htmlFor="cf-m" style={{ fontSize: 11, color: t.faint }}>message</label>
              <textarea id="cf-m" className="cf" rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell me about the role or project…" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span className="mono" style={{ fontSize: 11, color: t.faint }}>{note.length} chars · opens your email app</span>
                <Magnetic strength={0.5}><a href={mailto} className="btn pri" data-cursor="Send">Send <Send size={16} /></a></Magnetic>
              </div>
            </Spot>
          </Reveal>
        </div>
        <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginTop: 'clamp(60px,8vw,110px)', paddingTop: 22, borderTop: `1px solid ${t.line}`, fontSize: 12, color: t.dim, paddingBottom: 90 }}>
          <span>Delhi, India · {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
          <span>© {new Date().getFullYear()} Faizan Nasim</span>
          <a href="#top" data-cursor="Top">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MASCOT: Blip ═══════════════ */
function Blip({ t, active, ready }) {
  const ref = useRef(null), tm = useRef(0), qi = useRef(0);
  const [line, setLine] = useState(''), [happy, setHappy] = useState(false), [blink, setBlink] = useState(false);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 140, damping: 14 }), py = useSpring(my, { stiffness: 140, damping: 14 });
  const say = (s, ms = 4200) => { setLine(s); clearTimeout(tm.current); tm.current = setTimeout(() => setLine(''), ms); };
  useEffect(() => {
    const mv = (e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
      mx.set((dx / d) * 4 * k); my.set((dy / d) * 3 * k);
    };
    window.addEventListener('pointermove', mv, { passive: true });
    const b = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 130); }, 3300);
    return () => { window.removeEventListener('pointermove', mv); clearInterval(b); };
  }, []);
  useEffect(() => { if (ready && active && TIPS[active]) say(TIPS[active]); }, [active, ready]);
  const boop = () => { setHappy(true); setTimeout(() => setHappy(false), 900); say(QUIPS[qi.current++ % QUIPS.length]); };
  const ink = '#10130A';
  return (
    <motion.div className="blip" initial={{ opacity: 0, y: 40 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, type: 'spring', stiffness: 140, damping: 16 }}>
      <AnimatePresence>
        {line && <motion.div key={line} className="bub" role="status" aria-live="polite" initial={{ opacity: 0, y: 8, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}>{line}</motion.div>}
      </AnimatePresence>
      <motion.button ref={ref} onClick={boop} aria-label="Blip the mascot. Press for a tip." whileTap={{ scaleY: 0.85, scaleX: 1.08 }} style={{ transformOrigin: '50% 100%', display: 'block' }}>
        <svg viewBox="0 0 100 112" aria-hidden>
          <ellipse cx="50" cy="106" rx="30" ry="4" fill="rgba(0,0,0,.35)" />
          <line x1="50" y1="22" x2="50" y2="10" stroke={t.text} strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="8" r="6" fill={t.violet} style={{ animation: 'pulse 1.6s ease-in-out infinite', transformOrigin: '50px 8px' }} />
          <rect x="10" y="22" width="80" height="78" rx="38" fill={t.acc} />
          <rect x="10" y="22" width="80" height="78" rx="38" fill="url(#bg)" />
          <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".4" /><stop offset=".6" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".16" /></linearGradient></defs>
          <circle cx="29" cy="68" r="6" fill={t.pink} opacity=".45" /><circle cx="71" cy="68" r="6" fill={t.pink} opacity=".45" />
          {blink || happy ? (
            <><path d="M30 56 q8 -9 16 0" stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none" /><path d="M54 56 q8 -9 16 0" stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none" /></>
          ) : (
            <>
              <circle cx="38" cy="55" r="9.5" fill="#fff" /><circle cx="62" cy="55" r="9.5" fill="#fff" />
              <motion.g style={{ x: px, y: py }}><circle cx="38" cy="55" r="5" fill={ink} /><circle cx="62" cy="55" r="5" fill={ink} /><circle cx="39.8" cy="53" r="1.6" fill="#fff" /><circle cx="63.8" cy="53" r="1.6" fill="#fff" /></motion.g>
            </>
          )}
          {happy ? <path d="M40 72 q10 14 20 0z" fill={ink} /> : <path d="M42 74 q8 6 16 0" stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none" />}
        </svg>
      </motion.button>
    </motion.div>
  );
}
