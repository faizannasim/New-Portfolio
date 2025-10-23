import React, { useState } from 'react';

import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Moon,
  Sun,
} from 'lucide-react';
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
} from 'react-icons/fa';
import git from "/ask.png";
import car from "/f1.png";
import login from "/Login.png";
import bill from "/bill.png";
import cg from "/cg.png";
import todo from "/todo.png";
import Port from "/Port.png";
import { SiFramer } from 'react-icons/si';
import { AiOutlineLock, AiOutlineThunderbolt } from 'react-icons/ai';
import { motion } from 'framer-motion'; 
import { SiBootstrap } from 'react-icons/si';





import { SiJavascript, SiTailwindcss, SiPostman } from 'react-icons/si';
import { MdPhoneIphone } from 'react-icons/md';
import { AiOutlineApi } from 'react-icons/ai';
import { BsYoutube } from 'react-icons/bs';


export default function FznPort() {
  const [activeProject, setActiveProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-neutral-800' : 'border-neutral-200';

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const tools = [
  { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'JavaScript (ES6+)', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'React.js', Icon: FaReact, color: '#61DAFB' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
  { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
  { name: 'Responsive Design', Icon: MdPhoneIphone, color: '#10B981' },
  { name: 'Git & GitHub', Icon: FaGitAlt, color: '#F05032' },
  { name: 'RESTful APIs', Icon: AiOutlineApi, color: '#3E7CB1' },
  { name: 'Authentication', Icon: AiOutlineLock, color: '#F59E0B' }, // new entry
{ name: 'Framer Motion', Icon: SiFramer, color: '#FF2D20' },
  { name: 'GSAP', Icon: AiOutlineThunderbolt, color: '#88CE02' },
];
  const projects = [
    {
      title: 'Bill Mate : Invoice Maker (In Progress)',
      desc: 'A React and Tailwind based web App for creating and downloading invoices with a clean and responsive design.Currently working on integrating customizable invoice templates and user input validation',
      stack: ['React', 'Tailwind',],
      year: '2023',
      github: 'https://github.com/faizannasim/BillMate.git',
      live: '#',
      image: bill,
    },
    {
      title: 'Ask Ai',
      desc: 'Say goodbye to coding from scratch. Let Ask AI, your smart coding assistant, supercharge your projects from the get-go!',
      stack: ['React', 'Tailwind', 'Google API','Local Storage'],
      year: '2025',
      github: 'https://github.com/faizannasim/AskAI.git',
      live: 'https://ask-ai-sop1.vercel.app/',
      image: git,
    },
    {
      title: 'F1 Arena',
      desc: 'Inspired by Forumla 1,with a fullscreen video,driver quotes and responsive design.Includesa dummy API to add or update users via modal using POST and PUT requests ',
      stack: ['React', 'Tailwind', 'Dummy API', 'Local Storage'],
      year: '2024',
      github: 'https://github.com/faizannasim/F1Arena.git',
      live: 'https://formula-1-nlxb-p1m3n15uc-formula-1.vercel.app/',
      image: car,
    },
    {
      title: 'SecureSignIn',
      desc: 'Developed a secure React login with email-based access, protected routes, and logout using React Router and localStorage, featuring a responsive, validated UI with Tailwind CSS.',
      stack: ['React', 'React Router', 'Tailwind','Local Storage','fake Platzi API'],
      year: '2023',
      github: 'https://github.com/faizannasim/SecureSignIn.git',
      live: 'https://login-auth-wine.vercel.app/',
      image: login,
    },
    {
      title: ' Old Portfolio',
      desc: 'Personal portfolio showcasing projects and skills with modern animations',
      stack: ['React', 'Framer Motion', 'Tailwind'],
      year: '2024',
      github: 'https://github.com/faizannasim/Faizan-Web.git',
      live: 'https://faizanwebbb.netlify.app/',
      image: Port,
    },
    {
      title: 'Chandigarh University : Frontend Clone',
      desc: 'A frontend clone of Chandigarh University’s official website built using React and Tailwind CSS. The project replicates the site’s layout, navigation, and design elements with a focus on clean structure and visual accuracy.',
      stack: ['React', 'Tailwind', 'FIGMA'],
      year: '2023',
      github: 'https://github.com/faizannasim/chandigarh-university.git',
      live: 'https://chandigarh-university.vercel.app/',
      image: cg,
    },
    {
      title: 'Todo-list',
      desc: 'A simple task management app built with React where users can add tasks, mark them as done, or delete them once completed. The project focuses on clean UI, smooth interactions, and efficient state handling',
      stack: ['React', 'Tailwind',],
      year: '2024',
      github: 'https://github.com/faizannasim/Todo-list.git',
      live: 'https://todo-list-z158.vercel.app/',
      image: todo,
    },
  ];

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-500 relative`}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="mb-24">
          <div className="flex justify-between items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-start gap-6"
            >
              {/* Profile Image Placeholder */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-24 h-24 rounded-lg ${
                  isDark ? 'bg-neutral-900' : 'bg-neutral-100'
                } border-2 ${borderColor} flex items-center justify-center ${textColor} text-3xl font-bold cursor-default`}
              >
                FN
              </motion.div>

              <div>
                <h1 className={`text-4xl font-bold ${textColor} mb-1`}>
                  Faizan Nasim
                </h1>
               <motion.p className={mutedColor} style={{ display: 'flex', gap: '2px', overflow: 'hidden' }}>
  {"Frontend Developer".split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.p>


                {/* Social Links */}
               {/* Social Links */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="flex gap-4 mt-4"
>
  {[
    { Icon: Github, href: 'https://github.com/faizannasim', color: '#6e5494', isLucide: true },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/faizan-nasim-2262a930a/', color: '#0A66C2' },
    { Icon: Twitter, href: 'https://x.com/FaizanNasim8', color: '#1DA1F2' },
    { Icon: Mail, href: 'mailto:faizannasim59@gmail.com', color: '#D44638' },
    { Icon: BsYoutube, href: 'https://www.youtube.com/@CodeWithFaizan-x8w/videos', color: '#FF0000' },
  ].map(({ Icon, href, color, isLucide }, i) => (
    <a
      key={i}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform hover:scale-110"
    >
      {isLucide ? (
        <Icon className="w-5 h-5" stroke={color} />
      ) : (
        <Icon className="w-5 h-5" style={{ color }} />
      )}
    </a>
  ))}
</motion.div>


              </div>
            </motion.div>

            {/* Theme Toggle and Resume Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`w-10 h-10  flex items-center justify-center ${textColor} hover:opacity-70 transition-opacity`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Resume Button */}
              <a
                href="https://drive.google.com/file/d/1inYzzjd2OeeAWUvJPLHbxbV40ZHdFbnF/view?usp=sharing"  // replace with your actual resume path
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`
                  px-5 py-3
                  rounded-md
                  text-sm font-semibold
                  ${isDark ? 'bg-black text-white' : 'bg-black text-white'}
                  shadow-lg
                  cursor-pointer
                  hover:opacity-80
                  transition-opacity
                  select-none
                 
                  whitespace-nowrap
                `}
                aria-label="Download Resume"
              >
                Resume
              </a>
            </motion.div>
          </div>

          {/* Bio */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className={`${textColor} text-lg leading-relaxed`}>
              i'm a frontend developer passionate about crafting beautiful and functional web experiences.
            </p>
            <p className={`${mutedColor} leading-relaxed`}>
              a computer science enthusiast and <span className={textColor}>frontend specialist</span>. i spend most of my time building elegant interfaces or learning cutting-edge technologies. i also love creating smooth animations and pixel-perfect designs.
            </p>
          </motion.div>
         
        </header>

        {/* Tools & Technologies */}
        <section className="mb-24">
          <motion.h2 
            className={`text-sm font-semibold ${textColor} mb-6`}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Tools & Technologies
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tools.map(({ name, Icon, color }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, boxShadow: `0 4px 8px ${color}66` }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`px-4 py-2 ${
                  isDark ? 'bg-neutral-900' : 'bg-neutral-100'
                } border ${borderColor} ${textColor} text-sm flex items-center gap-2 rounded-lg cursor-default hover:bg-neutral-700 hover:text-neutral-200`}
              >
                <Icon size={20} color={color} />
                <span>{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="mb-24">
          <motion.h2 
            className={`text-sm font-semibold ${textColor} mb-8`}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Projects I've built.
          </motion.h2>

          <div className="space-y-6">
            {projects
              .slice(0, showAllProjects ? projects.length : 3)
              .map((project, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveProject(i)}
                  onMouseLeave={() => setActiveProject(null)}
                  initial={{ backgroundColor: isDark ? '#000' : '#fff' }}
                  animate={{
                    backgroundColor:
                      activeProject === i
                        ? isDark
                          ? '#27272a' // neutral-800
                          : '#f9fafb' // neutral-50
                        : isDark
                        ? '#000'
                        : '#fff',
                    boxShadow:
                      activeProject === i
                        ? isDark
                          ? '0 8px 15px rgba(255 255 255 / 0.1)'
                          : '0 8px 15px rgba(0 0 0 / 0.1)'
                        : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`border ${borderColor} p-6 rounded-lg cursor-pointer flex gap-6`}
                >
                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-36 h-24 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3
                        className={`text-xl font-semibold ${
                          textColor
                        } transition-colors duration-300`}
                      >
                        {project.title}
                      </h3>
                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          className={`${mutedColor} hover:${textColor} transition-colors`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={project.live}
                          className={`${mutedColor} hover:${textColor} transition-colors`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Live demo`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    <p className={`${mutedColor} text-sm mb-4 leading-relaxed`}>
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 ${
                            isDark ? 'bg-neutral-800' : 'bg-neutral-100'
                          } ${mutedColor} text-xs rounded`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Show More Button */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              whileHover={{ scale: 1.05, backgroundColor: isDark ? '#27272a' : '#e5e7eb' }}
              className={`px-6 py-2 border ${borderColor} ${textColor} text-sm rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors duration-300`}
            >
              {showAllProjects ? 'Show Less' : 'Show More Projects'}
            </motion.button>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className={`border-t ${borderColor} pt-16`}>
          <motion.h2 
            className={`text-sm font-semibold ${textColor} mb-6`}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Let's connect.
          </motion.h2>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className={`${textColor} text-2xl font-semibold`}>
              Interested in working together?
            </p>
            <p className={mutedColor}>
              Currently available for freelance projects and full-time
              opportunities.
            </p>

            <div className="pt-6">
              <a
                href="mailto:faizannasim59@gmail.com"
                className={`inline-block text-lg ${textColor} hover:${mutedColor} transition-colors`}
              >
                faizannasim59@gmail.com
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer
          className={`mt-24 pt-8 border-t ${borderColor} flex justify-between items-center`}
        >
          <p className={`${mutedColor} text-sm`}>
            Built and maintained by Faizan Nasim
          </p>
        </footer>
      </div>
    </div>
  );
}
