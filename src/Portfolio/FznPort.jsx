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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
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
    { name: 'Authentication', Icon: AiOutlineLock, color: '#F59E0B' },
    { name: 'Framer Motion', Icon: SiFramer, color: '#FF2D20' },
    { name: 'GSAP', Icon: AiOutlineThunderbolt, color: '#88CE02' },
  ];
  
  const projects = [
    {
      title: 'Bill Mate : Invoice Maker',
      status: 'In Progress',
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
      stack: ['React', 'Tailwind', 'Google API', 'Local Storage'],
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
      stack: ['React', 'React Router', 'Tailwind', 'Local Storage', 'fake Platzi API'],
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
      desc: 'A frontend clone of Chandigarh Universitys official website built using React and Tailwind CSS. The project replicates the sites layout, navigation, and design elements with a focus on clean structure and visual accuracy.',
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
                className={`w-24 h-24 rounded-lg ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'

                  } border-2 ${borderColor} flex items-center justify-center ${textColor} text-3xl font-bold cursor-default`} style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                FN
              </motion.div>

              <div>
                <h1 className={`text-4xl font-bold ${textColor} mb-1`} style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Faizan Nasim
                </h1>
                <motion.p className={mutedColor} style={{ display: 'flex', gap: '2px', overflow: 'hidden' }}
                >
                  {"Frontend Developer".split("").map((char, index) => (
                    <motion.span
                      className="" style={{ fontFamily: "Space Grotesk, sans-serif" }}
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
                href="https://drive.google.com/file/d/1inYzzjd2OeeAWUvJPLHbxbV40ZHdFbnF/view?usp=sharing"
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
                `} style={{ fontFamily: "Space Grotesk, sans-serif" }}
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
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.p 
              className={`${textColor} text-lg leading-relaxed`} 
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              i'm a frontend developer passionate about crafting beautiful and functional web experiences.
            </motion.p>
            <motion.p 
              className={`${mutedColor} leading-relaxed`} 
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              a computer science enthusiast and <span className={textColor}>frontend specialist</span>. i spend most of my time building elegant interfaces or learning cutting-edge technologies. i also love creating smooth animations and pixel-perfect designs.
            </motion.p>
          </motion.div>

        </header>

        {/* Tools & Technologies */}
        <section className="mb-24">
          <motion.h2
            className={`text-sm font-semibold ${textColor} mb-6`}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}

            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Tools & Technologies
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-3"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {tools.map(({ name, Icon, color }, i) => (
              <motion.div
                key={i}
                variants={fadeInScale}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: `0 4px 12px ${color}88`,
                  y: -5,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`px-4 py-2 ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'
                  } border ${borderColor} ${textColor} text-sm flex items-center gap-2 rounded-lg cursor-default hover:bg-neutral-700 hover:text-neutral-200  `} style={{ fontFamily: "Space Grotesk, sans-serif" }}

              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={20} color={color} />
                </motion.div>
                <span>{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="mb-24">
          <motion.h2
            className={`text-sm font-semibold ${textColor} mb-8`}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Projects I've built.
          </motion.h2>

          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects
              .slice(0, showAllProjects ? projects.length : 3)
              .map((project, i) => (
                <motion.div
                  key={i}
                  variants={slideInLeft}
                  onMouseEnter={() => setActiveProject(i)}
                  onMouseLeave={() => setActiveProject(null)}
                  initial={{ backgroundColor: isDark ? '#000' : '#fff' }}
                  animate={{
                    backgroundColor:
                      activeProject === i
                        ? isDark
                          ? '#18181b'
                          : '#f4f4f5'
                        : isDark
                          ? '#0a0a0a'
                          : '#fff',
                    boxShadow:
                      activeProject === i
                        ? isDark
                          ? '0 0 20px rgba(255,255,255,0.08)'
                          : '0 0 20px rgba(0,0,0,0.08)'
                        : 'none',
                    scale: activeProject === i ? 1.03 : 1,
                  }}
                  whileHover={{
                    scale: 1.07,
                    background: isDark
                      ? 'linear-gradient(135deg, #000000, #3a3a3a)'
                      : 'linear-gradient(135deg, #f5f5f5, #bfbfbf)',
                    boxShadow: isDark
                      ? '0 8px 25px rgba(255,255,255,0.12)'
                      : '0 8px 25px rgba(0,0,0,0.12)',
                  }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeOut',
                  }}
                  className={`border ${borderColor} p-6 rounded-2xl cursor-pointer flex gap-6 transition-all`}
                >


                  {/* Project Image */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-36 h-24 object-cover rounded-md flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />



                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-xl font-semibold ${textColor} transition-colors duration-300`} style={{ fontFamily: "Space Grotesk, sans-serif" }}


                          >
                            {project.title}
                          </h3>
                          {project.status && (
                            <span
                              className={`text-[11px] px-2 py-[1px] rounded-md font-medium border
    ${isDark
                                  ? 'border-green-400 text-green-300 bg-green-400/10'
                                  : 'border-green-300 text-green-700 bg-green-100'}
  `}
                            >
                              {project.status}
                            </span>

                          )}
                        </div>


                      </div>


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

                    <p className={`${mutedColor} text-sm mb-4 leading-relaxed`} style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'
                            } ${mutedColor} text-xs rounded`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Show More Button */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: isDark ? '#27272a' : '#e5e7eb',
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 border ${borderColor} ${textColor} text-sm rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors duration-300`} style={{ fontFamily: "Space Grotesk, sans-serif" }}

            >
              {showAllProjects ? 'Show Less' : 'Show More Projects'}
            </motion.button>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className={`border-t ${borderColor} pt-20 pb-16`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-5"
          >
            <motion.h2
              className={`text-sm font-semibold tracking-widest uppercase ${textColor}`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Let's Connect
            </motion.h2>

            <motion.p
              className={`${textColor} text-3xl sm:text-4xl font-semibold`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Interested in working together?
            </motion.p>

            <motion.p
              className={`${mutedColor} text-base sm:text-lg leading-relaxed`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              I'm open to exciting projects, collaborations, and opportunities where I can
              contribute and grow. Whether it's a small idea or a big vision - feel free
              to reach out.
            </motion.p>

            <motion.a
              href="mailto:faizannasim59@gmail.com"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                color: "#60a5fa",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
              className={`inline-block mt-6 text-lg font-medium ${textColor} underline-offset-4 hover:underline`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              faizannasim59@gmail.com
            </motion.a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer
          className={`pt-10 pb-6 border-t ${borderColor} text-center`}
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <p className={`${mutedColor} text-sm`}>
            © {new Date().getFullYear()} - Built and maintained by  {" "}
            <span className="text-white font-semibold hover:text-gray-300 transition-colors">
              Faizan Nasim
            </span>
          </p>
        </footer>

      </div>
    </div>
  );
}