import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Twitter, ExternalLink, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt } from 'react-icons/fa';
import { SiFramer, SiJavascript, SiTailwindcss, SiPostman, SiBootstrap, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { AiOutlineLock, AiOutlineThunderbolt, AiOutlineApi } from 'react-icons/ai';
import { MdPhoneIphone } from 'react-icons/md';
import { BsYoutube } from 'react-icons/bs';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const T = {
  dark: {
    bg: '#050505',
    surface: '#0c0c0c',
    surfaceHover: '#111',
    border: 'rgba(255,255,255,0.07)',
    borderStrong: 'rgba(255,255,255,0.13)',
    text: '#f2f2f2',
    dim: 'rgba(242,242,242,0.45)',
    muted: '#404040',
    mutedText: '#666',
    accent: '#cbf135',
    accentDim: 'rgba(203,241,53,0.1)',
    accentBorder: 'rgba(203,241,53,0.25)',
    tag: '#131313',
    tagText: '#4a4a4a',
    invert: '#000',
  },
  light: {
    bg: '#f7f5f0',
    surface: '#ffffff',
    surfaceHover: '#f0ede6',
    border: 'rgba(0,0,0,0.07)',
    borderStrong: 'rgba(0,0,0,0.15)',
    text: '#0a0a0a',
    dim: 'rgba(10,10,10,0.5)',
    muted: '#ddd',
    mutedText: '#999',
    accent: '#1d6130',
    accentDim: 'rgba(29,97,48,0.07)',
    accentBorder: 'rgba(29,97,48,0.2)',
    tag: '#eceae4',
    tagText: '#888',
    invert: '#fff',
  },
};

const TOOLS = [
  { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React.js', Icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#888' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
  { name: 'Framer Motion', Icon: SiFramer, color: '#ea4c89' },
  { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
  { name: 'Responsive Design', Icon: MdPhoneIphone, color: '#10B981' },
  { name: 'Git & GitHub', Icon: FaGitAlt, color: '#F05032' },
  { name: 'RESTful APIs', Icon: AiOutlineApi, color: '#3E7CB1' },
  { name: 'Authentication', Icon: AiOutlineLock, color: '#F59E0B' },
  { name: 'GSAP', Icon: AiOutlineThunderbolt, color: '#88CE02' },
];

const PROJECTS = [
  {
    n: '01', title: 'BillMate', sub: 'Invoice Maker', year: '2024',
    desc: 'Responsive invoice platform with PDF export, QR code, and hands-free voice via Web Speech API. 100/100 Best Practices on Lighthouse.',
    stack: ['React', 'Tailwind', 'Web Speech API', 'Clarity'],
    gh: 'https://github.com/faizannasim/BillMate.git',
    live: 'https://bill-mate-iota.vercel.app/',
    kpi: '100', kpiLabel: 'Lighthouse', featured: true,
  },
  {
    n: '02', title: 'Ask AI', sub: 'Chat App', year: '2024',
    desc: 'Real-time AI chat with persistent history and Google Gemini API. 89 Accessibility score on Lighthouse.',
    stack: ['React', 'Tailwind', 'Gemini API'],
    gh: 'https://github.com/faizannasim',
    live: '#',
    kpi: '89', kpiLabel: 'Accessibility',
  },
  {
    n: '03', title: 'F1 Arena', sub: 'F1 Dashboard', year: '2024',
    desc: 'Multi-section dashboard consuming live REST APIs, handling 1,000+ data points with modal-based user management.',
    stack: ['React', 'Tailwind', 'REST APIs', 'localStorage'],
    gh: 'https://github.com/faizannasim/F1Arena.git',
    live: 'https://formula-1-2e81.vercel.app/',
    kpi: '1K+', kpiLabel: 'Data Points',
  },
  {
    n: '04', title: 'Portfolio', sub: 'Personal Site', year: '2024',
    desc: 'Fully responsive portfolio with animated UI, mobile-first design. Deployed on Vercel.',
    stack: ['React', 'Tailwind', 'Framer Motion'],
    gh: 'https://github.com/faizannasim/Faizan-Web.git',
    live: 'https://faizanwebbb.netlify.app/',
    kpi: '94', kpiLabel: 'Accessibility',
  },
  {
    n: '05', title: 'SecureSignIn', sub: 'Auth System', year: '2023',
    desc: 'Secure React login with email-based access, protected routes, and logout via React Router.',
    stack: ['React', 'React Router', 'Tailwind'],
    gh: 'https://github.com/faizannasim/SecureSignIn.git',
    live: 'https://login-auth-wine.vercel.app/',
    kpi: null,
  },
  {
    n: '06', title: 'CU Clone', sub: 'Frontend Replica', year: '2023',
    desc: 'Pixel-accurate frontend clone of Chandigarh University replicating layout, navigation, and design.',
    stack: ['React', 'Tailwind', 'Figma'],
    gh: 'https://github.com/faizannasim/chandigarh-university.git',
    live: 'https://chandigarh-university.vercel.app/',
    kpi: null,
  },
];

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [hovPrj, setHovPrj] = useState(null);
  const t = T[dark ? 'dark' : 'light'];

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const cx = useSpring(mx, { stiffness: 700, damping: 28 });
  const cy = useSpring(my, { stiffness: 700, damping: 28 });
  const tx = useSpring(mx, { stiffness: 100, damping: 18 });
  const ty = useSpring(my, { stiffness: 100, damping: 18 });

  useEffect(() => {
    const h = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const gl = `
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@300;400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{
      background:${t.bg};color:${t.text};
      font-family:'Cabinet Grotesk',sans-serif;
      transition:background .45s,color .45s;
      cursor:none;overflow-x:hidden;
    }
    a{color:inherit;text-decoration:none}
    ::selection{background:${t.accent};color:#000}
    ::-webkit-scrollbar{width:2px}
    ::-webkit-scrollbar-track{background:${t.bg}}
    ::-webkit-scrollbar-thumb{background:${t.muted};border-radius:9px}
    .clash{font-family:'Clash Display',sans-serif}
    .mono{font-family:'JetBrains Mono',monospace;font-weight:300}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes livePulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}70%{box-shadow:0 0 0 6px rgba(34,197,94,0)}}
  `;

  return (
    <>
      <style>{gl}</style>

      {/* Cursor */}
      <motion.div style={{
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9999,
        x:cx,y:cy,translateX:'-50%',translateY:'-50%',
        width:9,height:9,borderRadius:'50%',background:t.accent,
        mixBlendMode:dark?'screen':'multiply',
      }}/>
      <motion.div style={{
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9998,
        x:tx,y:ty,translateX:'-50%',translateY:'-50%',
        width:38,height:38,borderRadius:'50%',
        border:`1px solid ${t.accent}`,opacity:.35,
      }}/>

      {/* bg glow */}
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
        <div style={{
          position:'absolute',top:'-20%',right:'5%',width:750,height:750,borderRadius:'50%',
          background:dark
            ?'radial-gradient(circle,rgba(203,241,53,.045) 0%,transparent 65%)'
            :'radial-gradient(circle,rgba(29,97,48,.04) 0%,transparent 65%)',
        }}/>
      </div>

      {/* NAV */}
      <motion.header
        initial={{opacity:0,y:-14}}
        animate={{opacity:1,y:0}}
        transition={{duration:.6,ease:[.22,1,.36,1]}}
        style={{
          position:'fixed',top:0,left:0,right:0,zIndex:500,
          display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'0 clamp(20px,4vw,56px)',height:64,
          background:dark?'rgba(5,5,5,.85)':'rgba(247,245,240,.88)',
          backdropFilter:'blur(22px)',
          borderBottom:`1px solid ${t.border}`,
        }}
      >
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <motion.div whileHover={{scale:1.1,rotate:6}} style={{
            width:36,height:36,background:t.accent,borderRadius:8,
            display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:"'Clash Display',sans-serif",fontSize:14,
            fontWeight:700,color:'#000',cursor:'none',letterSpacing:'.5px',
          }}>FN</motion.div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:t.text,lineHeight:1.15}}>Faizan Nasim</div>
            <div className="mono" style={{fontSize:10,color:t.mutedText,letterSpacing:'.08em'}}>Frontend Developer</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{
              width:7,height:7,borderRadius:'50%',background:'#22c55e',display:'inline-block',
              animation:'livePulse 2s infinite',
            }}/>
            <span className="mono" style={{fontSize:11,color:'#22c55e',letterSpacing:'.06em'}}>Available</span>
          </div>
          <button onClick={()=>setDark(!dark)} style={{
            width:34,height:34,border:`1px solid ${t.border}`,borderRadius:7,
            background:'transparent',color:t.text,display:'flex',
            alignItems:'center',justifyContent:'center',cursor:'none',
          }}>
            {dark?<Sun size={13}/>:<Moon size={13}/>}
          </button>
          <motion.a
            href="https://drive.google.com/file/d/1gsVt9bU0ZKdohJvVU77FoHP7BRCS724O/view?usp=sharing"
            target="_blank" rel="noopener noreferrer"
            whileHover={{scale:1.04}} whileTap={{scale:.97}}
            style={{
              padding:'7px 16px',borderRadius:7,background:t.accent,
              color:'#000',fontSize:12,fontWeight:800,cursor:'none',letterSpacing:'.02em',
            }}
          >Resume ↗</motion.a>
        </div>
      </motion.header>

      {/* ───────── HERO ───────── */}
      <motion.section
        ref={heroRef}
        style={{
          y:heroParallax,opacity:heroFade,
          paddingTop:'clamp(120px,14vw,180px)',
          paddingBottom:'clamp(80px,10vw,140px)',
          paddingLeft:'clamp(20px,4vw,56px)',
          paddingRight:'clamp(20px,4vw,56px)',
          maxWidth:1100,margin:'0 auto',
          position:'relative',zIndex:1,
        }}
      >
        {/* pill badge */}
        <motion.div
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{delay:.1,duration:.55}}
          style={{marginBottom:32}}
        >
          <span className="mono" style={{
            display:'inline-flex',alignItems:'center',gap:7,
            fontSize:11,letterSpacing:'.13em',textTransform:'uppercase',
            color:t.mutedText,padding:'5px 14px',
            border:`1px solid ${t.border}`,borderRadius:99,
          }}>
            <span style={{width:5,height:5,borderRadius:'50%',background:t.accent}}/>
            Delhi, India · UTC +5:30
          </span>
        </motion.div>

        {/* Big name — slide up per word */}
        <div style={{marginBottom:36}}>
          {[
            {word:'Faizan', color:t.text, delay:.15},
            {word:'Nasim', color:t.accent, delay:.22},
          ].map(({word,color,delay})=>(
            <div key={word} style={{overflow:'hidden'}}>
              <motion.div
                initial={{y:'108%'}} animate={{y:0}}
                transition={{delay,duration:.75,ease:[.22,1,.36,1]}}
                className="clash"
                style={{
                  fontSize:'clamp(72px,13vw,148px)',
                  lineHeight:.92,letterSpacing:'-.03em',
                  color,display:'block',
                }}
              >{word}</motion.div>
            </div>
          ))}
        </div>

        {/* descriptor */}
        <motion.div
          initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
          transition={{delay:.38,duration:.6}}
          style={{display:'flex',alignItems:'flex-start',gap:18,marginBottom:40,maxWidth:600}}
        >
          <div style={{width:3,height:52,background:t.accent,borderRadius:2,flexShrink:0,marginTop:4}}/>
          <p style={{fontSize:'clamp(15px,1.6vw,18px)',color:t.dim,lineHeight:1.75,fontWeight:500}}>
            Frontend developer building responsive, API-driven web applications.
            Specialising in <span style={{color:t.text,fontWeight:700}}>React</span>,{' '}
            <span style={{color:t.text,fontWeight:700}}>Tailwind CSS</span>, and seamless user experiences.
          </p>
        </motion.div>

        {/* social row */}
        <motion.div
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{delay:.5,duration:.55}}
          style={{display:'flex',gap:8,flexWrap:'wrap'}}
        >
          {[
            {Icon:Github,href:'https://github.com/faizannasim',label:'GitHub'},
            {Icon:Linkedin,href:'https://www.linkedin.com/in/faizan-nasim-2262a930a/',label:'LinkedIn'},
            {Icon:Twitter,href:'https://x.com/FaizanNasim8',label:'Twitter'},
            {Icon:BsYoutube,href:'https://www.youtube.com/@CodeWithFaizan-x8w/videos',label:'YouTube'},
            {Icon:Mail,href:'mailto:faizannasim59@gmail.com',label:'Email'},
          ].map(({Icon,href,label})=>(
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{scale:1.05,borderColor:t.accentBorder,color:t.text}}
              style={{
                display:'flex',alignItems:'center',gap:6,padding:'7px 13px',
                border:`1px solid ${t.border}`,borderRadius:7,
                fontSize:12,fontWeight:600,color:t.mutedText,cursor:'none',
                transition:'all .2s',
              }}
            >
              <Icon size={13}/>{label}
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      {/* ───────── MARQUEE TICKER ───────── */}
      <div style={{
        borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,
        overflow:'hidden',padding:'14px 0',position:'relative',zIndex:1,
      }}>
        <motion.div
          animate={{x:['0%','-50%']}}
          transition={{duration:22,ease:'linear',repeat:Infinity}}
          style={{display:'flex',gap:0,whiteSpace:'nowrap'}}
        >
          {[...Array(2)].map((_,ri)=>(
            <span key={ri} style={{display:'inline-flex',gap:0}}>
              {['React','TypeScript','Next.js','Tailwind CSS','Framer Motion','REST APIs','Responsive Design','GSAP','Git & GitHub','Authentication'].map((s,i)=>(
                <span key={i} style={{display:'inline-flex',alignItems:'center',gap:28,padding:'0 28px'}}>
                  <span className="mono" style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:t.mutedText}}>{s}</span>
                  <span style={{width:4,height:4,borderRadius:'50%',background:t.accent,display:'inline-block'}}/>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ───────── MAIN CONTENT ───────── */}
      <main style={{maxWidth:1100,margin:'0 auto',padding:'0 clamp(20px,4vw,56px)',position:'relative',zIndex:1,paddingTop:72}}>

        {/* EXPERIENCE */}
        <Section t={t} label="Experience" num="01">
          <motion.div
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.65}}
            style={{
              borderRadius:18,overflow:'hidden',
              border:`1px solid ${t.border}`,background:t.surface,
            }}
          >
            <div style={{height:3,background:`linear-gradient(90deg,${t.accent},${t.accent}44)`}}/>
            <div style={{padding:'clamp(24px,3vw,40px)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:14,marginBottom:18}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:5}}>
                    <h3 className="clash" style={{fontSize:'clamp(26px,3.5vw,38px)',color:t.text,letterSpacing:'-.02em',lineHeight:1}}>
                      GEDU Services
                    </h3>
                    <span className="mono" style={{
                      fontSize:10,padding:'2px 8px',borderRadius:99,
                      background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.25)',
                      color:'#22c55e',letterSpacing:'.05em',
                    }}>● Present</span>
                  </div>
                  <p style={{fontSize:14,color:t.accent,fontWeight:700,letterSpacing:'.02em'}}>Associate Frontend Developer</p>
                </div>
                <span className="mono" style={{fontSize:12,color:t.mutedText}}>Dec 2025 — Present</span>
              </div>
              <p style={{fontSize:15,color:t.dim,lineHeight:1.8,marginBottom:28,maxWidth:640}}>
                Building responsive multi-role dashboards (Student, Admin, Instructor) with REST API integrations,
                reducing average page load time by <strong style={{color:t.text,fontWeight:800}}>30%</strong>.
                Cut reported issues by <strong style={{color:t.text,fontWeight:800}}>40%</strong> and improved
                cross-device compatibility by <strong style={{color:t.text,fontWeight:800}}>35%</strong> via
                optimised component rendering.
              </p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {[['30%','Faster loads'],['40%','Fewer bugs'],['35%','Better compat']].map(([v,l])=>(
                  <div key={l} style={{
                    padding:'12px 20px',borderRadius:10,
                    background:t.accentDim,border:`1px solid ${t.accentBorder}`,
                    textAlign:'center',minWidth:90,
                  }}>
                    <div className="clash" style={{fontSize:28,color:t.accent,lineHeight:1,letterSpacing:'-.01em'}}>{v}</div>
                    <div className="mono" style={{fontSize:10,color:t.mutedText,marginTop:4}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>

        {/* PROJECTS */}
        <Section t={t} label="Projects" num="02">
          <div>
            {PROJECTS.slice(0,showAll?PROJECTS.length:4).map((p,i)=>(
              <ProjectRow
                key={p.title} p={p} i={i} t={t}
                hovered={hovPrj===i}
                onEnter={()=>setHovPrj(i)}
                onLeave={()=>setHovPrj(null)}
              />
            ))}
          </div>
          <div style={{marginTop:20}}>
            <motion.button
              onClick={()=>setShowAll(!showAll)}
              whileHover={{scale:1.02,borderColor:t.borderStrong}}
              whileTap={{scale:.97}}
              style={{
                display:'inline-flex',alignItems:'center',gap:8,
                padding:'9px 18px',border:`1px solid ${t.border}`,borderRadius:8,
                background:'transparent',color:t.mutedText,fontSize:12,
                cursor:'none',fontFamily:"'Cabinet Grotesk',sans-serif",fontWeight:600,
                transition:'all .2s',
              }}
            >
              {showAll?'↑ Show less':`Show all ${PROJECTS.length} projects →`}
            </motion.button>
          </div>
        </Section>

        {/* STACK */}
        <Section t={t} label="Stack" num="03">
          <motion.div
            initial="h" whileInView="v" viewport={{once:true}}
            variants={{v:{transition:{staggerChildren:.04}},h:{}}}
            style={{display:'flex',flexWrap:'wrap',gap:8}}
          >
            {TOOLS.map(({name,Icon,color})=>(
              <motion.div
                key={name}
                variants={{h:{opacity:0,scale:.82,y:8},v:{opacity:1,scale:1,y:0}}}
                whileHover={{scale:1.07,y:-2}}
                style={{
                  display:'flex',alignItems:'center',gap:7,
                  padding:'8px 14px',borderRadius:8,
                  border:`1px solid ${t.border}`,background:t.surface,
                  fontSize:13,fontWeight:600,color:t.mutedText,
                  cursor:'none',transition:'all .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.color=t.text;e.currentTarget.style.borderColor=color+'44';}}
                onMouseLeave={e=>{e.currentTarget.style.color=t.mutedText;e.currentTarget.style.borderColor=t.border;}}
              >
                <Icon size={15} color={color}/>{name}
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* RECOGNITION */}
        <Section t={t} label="Recognition" num="04">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:14}}>
            {[
              {icon:'🏆',title:'Best Project Award 2024',desc:'Real-time Emotion Detection System',org:'Greater Noida Institute of Technology',year:'2024'},
              {icon:'🎓',title:'Microsoft & LinkedIn: Generative AI',desc:'AI fundamentals, prompt engineering, applied Generative AI',org:'Microsoft + LinkedIn',year:'2024'},
            ].map(({icon,title,desc,org,year},i)=>(
              <motion.div
                key={title}
                initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.1,duration:.6}}
                whileHover={{y:-4,borderColor:t.accentBorder}}
                style={{
                  padding:'26px 28px',border:`1px solid ${t.border}`,
                  borderRadius:14,background:t.surface,cursor:'none',
                  transition:'all .25s',
                }}
              >
                <div style={{fontSize:26,marginBottom:14}}>{icon}</div>
                <p style={{fontSize:15,fontWeight:800,color:t.text,marginBottom:6}}>{title}</p>
                <p style={{fontSize:13,color:t.dim,marginBottom:14,lineHeight:1.55}}>{desc}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span className="mono" style={{fontSize:10,color:t.mutedText}}>{org}</span>
                  <span className="mono" style={{fontSize:11,color:t.accent,fontWeight:700}}>{year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <section style={{borderTop:`1px solid ${t.border}`,paddingTop:100,paddingBottom:100}}>
          <motion.div
            initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.7}}
          >
            <span className="mono" style={{
              fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',
              color:t.accent,display:'block',marginBottom:24,
            }}>— Let's connect</span>

            <div style={{marginBottom:32}}>
              {["Let's","build","together."].map((w,i)=>(
                <motion.div
                  key={w}
                  initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
                  viewport={{once:true}}
                  transition={{delay:i*.08,duration:.6,ease:[.22,1,.36,1]}}
                  className="clash"
                  style={{
                    fontSize:'clamp(48px,8vw,100px)',lineHeight:.92,
                    letterSpacing:'-.025em',display:'block',
                    color:i===2?t.accent:t.text,
                  }}
                >{w}</motion.div>
              ))}
            </div>

            <p style={{fontSize:16,color:t.dim,lineHeight:1.7,marginBottom:40,maxWidth:480,fontWeight:500}}>
              Open to projects, collaborations, and opportunities.
              Small idea or big vision — let's talk.
            </p>

            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:80}}>
              <motion.a
                href="mailto:faizannasim59@gmail.com"
                whileHover={{scale:1.03,x:4}} whileTap={{scale:.97}}
                style={{
                  display:'inline-flex',alignItems:'center',gap:9,
                  padding:'14px 26px',borderRadius:10,
                  background:t.accent,color:'#000',
                  fontWeight:800,fontSize:14,cursor:'none',letterSpacing:'.01em',
                }}
              >
                <Mail size={15}/>faizannasim59@gmail.com<ArrowUpRight size={14}/>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/faizan-nasim-2262a930a/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{scale:1.03,borderColor:t.borderStrong}}
                style={{
                  display:'inline-flex',alignItems:'center',gap:8,
                  padding:'14px 22px',borderRadius:10,
                  border:`1px solid ${t.border}`,color:t.mutedText,
                  fontSize:14,fontWeight:700,cursor:'none',transition:'all .2s',
                }}
              >
                <Linkedin size={15}/>LinkedIn
              </motion.a>
            </div>

            {/* Bottom info grid */}
            <div style={{
              display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',
              gap:1,background:t.border,border:`1px solid ${t.border}`,borderRadius:16,overflow:'hidden',
            }}>
              {[
                {label:'Response time',value:'Within 24 hrs',icon:'⚡'},
                {label:'Availability',value:'Open to work',icon:'✅'},
                {label:'Preferred role',value:'Frontend Dev',icon:'💻'},
                {label:'Location',value:'Delhi, India',icon:'📍'},
              ].map(({label,value,icon})=>(
                <div key={label} style={{
                  padding:'28px 26px',background:t.surface,
                }}>
                  <div style={{fontSize:20,marginBottom:10}}>{icon}</div>
                  <div className="mono" style={{fontSize:10,color:t.mutedText,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:6}}>{label}</div>
                  <div style={{fontSize:16,fontWeight:800,color:t.text}}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <footer style={{
          paddingBottom:48,borderTop:`1px solid ${t.border}`,paddingTop:24,
          display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,
        }}>
          <p className="mono" style={{fontSize:11,color:t.mutedText}}>© {new Date().getFullYear()} Faizan Nasim</p>
          <p className="mono" style={{fontSize:11,color:t.mutedText}}>React · Framer Motion · Cabinet Grotesk</p>
        </footer>
      </main>
    </>
  );
}

function Section({t,label,num,children}){
  return(
    <section style={{marginBottom:100}}>
      <motion.div
        initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}}
        viewport={{once:true}} transition={{duration:.5}}
        style={{display:'flex',alignItems:'center',gap:14,marginBottom:36}}
      >
        <span className="mono" style={{fontSize:10,color:t.mutedText}}>{num}</span>
        <span className="mono" style={{
          fontSize:10,letterSpacing:'.15em',textTransform:'uppercase',
          color:t.accent,
        }}>{label}</span>
        <div style={{flex:1,height:'1px',background:t.border}}/>
      </motion.div>
      {children}
    </section>
  );
}

function ProjectRow({p,i,t,hovered,onEnter,onLeave}){
  return(
    <motion.div
      initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{delay:i*.05,duration:.55,ease:[.22,1,.36,1]}}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        display:'grid',gridTemplateColumns:'56px 1fr auto',gap:22,
        padding:'22px 0',borderBottom:`1px solid ${t.border}`,
        paddingLeft:hovered?14:0,
        borderLeft:`2px solid ${hovered?t.accent:'transparent'}`,
        transition:'padding-left .2s,border-color .2s',
        alignItems:'start',
      }}
    >
      <span className="clash" style={{
        fontSize:36,color:hovered?t.accent:t.muted,
        lineHeight:1,transition:'color .2s',paddingTop:3,
      }}>{p.n}</span>

      <div>
        <div style={{display:'flex',alignItems:'baseline',gap:9,marginBottom:8,flexWrap:'wrap'}}>
          <h3 style={{fontSize:18,fontWeight:800,color:t.text,letterSpacing:'-.01em'}}>{p.title}</h3>
          <span style={{fontSize:13,color:t.mutedText,fontWeight:500}}>{p.sub}</span>
          {p.featured&&(
            <span className="mono" style={{
              fontSize:9,padding:'2px 7px',borderRadius:99,
              background:t.accentDim,border:`1px solid ${t.accentBorder}`,
              color:t.accent,letterSpacing:'.06em',textTransform:'uppercase',
            }}>Featured</span>
          )}
        </div>
        <AnimatePresence>
          {hovered&&(
            <motion.p
              initial={{opacity:0,height:0,marginBottom:0}}
              animate={{opacity:1,height:'auto',marginBottom:10}}
              exit={{opacity:0,height:0,marginBottom:0}}
              transition={{duration:.2}}
              style={{fontSize:13,color:t.dim,lineHeight:1.7,overflow:'hidden'}}
            >{p.desc}</motion.p>
          )}
        </AnimatePresence>
        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
          {p.stack.map(s=>(
            <span key={s} className="mono" style={{
              fontSize:10,padding:'3px 8px',borderRadius:5,
              background:t.tag,color:t.tagText,
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:10}}>
        <span className="mono" style={{fontSize:10,color:t.mutedText}}>{p.year}</span>
        {p.kpi&&(
          <div style={{textAlign:'right'}}>
            <div className="clash" style={{fontSize:26,color:t.accent,lineHeight:1,letterSpacing:'-.01em'}}>{p.kpi}</div>
            <div className="mono" style={{fontSize:9,color:t.mutedText,marginTop:2}}>{p.kpiLabel}</div>
          </div>
        )}
        <div style={{display:'flex',gap:9}}>
          <motion.a href={p.gh} target="_blank" rel="noopener noreferrer"
            whileHover={{scale:1.15,color:t.text}}
            style={{color:t.mutedText,cursor:'none',transition:'color .2s'}}>
            <Github size={14}/>
          </motion.a>
          <motion.a href={p.live} target="_blank" rel="noopener noreferrer"
            whileHover={{scale:1.15,color:t.accent}}
            style={{color:t.mutedText,cursor:'none',transition:'color .2s'}}>
            <ExternalLink size={14}/>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}