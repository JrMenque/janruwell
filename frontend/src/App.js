import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Moon, Sun, X, Copy, Check, Menu } from "lucide-react";
import axios from "axios";
import Lenis from "lenis";
import "@/App.css";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const projects = [
  { id: "01", cat: "Web apps", chips: ["Web App", "Catering"], title: "Emerald Catering Management System", text: "A multi-branch catering platform with ordering, POS workflows, role-based dashboards, delivery operations, and customer-facing features.", tags: ["PHP", "MySQL", "JavaScript", "PWA", "Electron"], image: "/legacy/projects/emerald-catering.png", link: "https://zambocaters.freedev.app" },
  { id: "02", cat: "Systems", chips: ["Management", "EdTech"], title: "Senior High School Immersion System", text: "A web-based application designed to manage and streamline work immersion programs for senior high school students.", tags: ["Web App", "Management", "AI Chatbot"], image: "/legacy/projects/immersion-system.png", link: "https://github.com/JrMenque" },
  { id: "03", cat: "Web apps", chips: ["Identification", "Web"], title: "ZPPSU ID System", text: "A secure and efficient identification management system for the Zamboanga Peninsula Polytechnic State University community.", tags: ["PHP", "MySQL", "Web"], image: "/legacy/projects/zppsu-id.png", link: "https://github.com/JrMenque" },
  { id: "04", cat: "Mobile", chips: ["Education", "Mobile"], title: "ZC-Digital Marketing Learning System", text: "An interactive platform for SEO, social media, PPC, email marketing, analytics, real-world case studies, and practical exercises.", tags: ["Web", "Mobile App", "Education"], image: "/legacy/projects/digital-marketing.png", link: "https://github.com/JrMenque" },
  { id: "05", cat: "Systems", chips: ["Healthcare", "System"], title: "Health Care Profiling System", text: "A web-based application for managing patient records, medical history, and health assessments.", tags: ["PHP", "MySQL", "Healthcare"], image: "/legacy/projects/health-profiling.jpg", link: "https://github.com/JrMenque" },
  { id: "06", cat: "Web apps", chips: ["Admissions", "Web"], title: "ZPPSU Admission System", text: "A student admission platform designed to streamline applications, reviews, and university intake workflows.", tags: ["PHP", "MySQL", "Admissions"], image: "/legacy/projects/admission-system.png", link: "https://github.com/JrMenque" },
];
const experience = [
  { role: "Full-Stack Developer", org: "Self-employed", period: "OCT 2021 — PRESENT", text: "Building practical web and mobile applications — from client systems to personal products.", mark: "JR" },
  { role: "Developer · IT Support Intern", org: "ZPPSU", period: "FEB 2024 — JUL 2024", text: "Development, troubleshooting, systems, and infrastructure support for the university.", mark: "ZP" },
  { role: "BS Information Technology", org: "Zamboanga Peninsula Polytechnic State University", period: "2020 — 2024", text: "Graduated with a degree in IT, focused on web and software development.", mark: "IT" },
  { role: "Open-source Contributor", org: "DevIncept · LetsGrowMore · Hacktoberfest", period: "2021 — 2022", text: "Contributed to open-source programs and community coding events.", mark: "OS" },
];
const stackGroups = [
  { name: "Frontend", tools: ["JavaScript", "ReactJS", "Redux", "TailwindCSS", "Bootstrap", "HTML", "CSS"] },
  { name: "Backend & Data", tools: ["PHP", "Node.js", "ExpressJS", "Python", "MySQL", "MongoDB", "Firebase", "AWS"] },
  { name: "Mobile", tools: ["Android", "React Native", "PWA"] },
  { name: "Tools & Platforms", tools: ["GitHub", "Git", "WordPress", "Electron"] },
];
const marquee = ["ReactJS", "ExpressJS", "NodeJS", "Redux", "Firebase", "Android", "TailwindCSS", "Bootstrap", "PHP", "Python", "MongoDB", "MySQL", "AWS", "GitHub", "WordPress"];

function Logo({ compact = false }) { return <a href="#top" className="logo" data-testid="logo-link" aria-label="Jan Ruwell Menque home"><span className="logo-mark">J</span>{!compact && <span>JAN RUWELL<span className="logo-dot">.</span></span>}</a>; }

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");
  const [submitState, setSubmitState] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  useEffect(() => { document.documentElement.classList.toggle("light", !dark); }, [dark]);
  useEffect(() => { const lenis = new Lenis({ duration: 1.15, smoothWheel: true }); let frame; const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf); return () => { cancelAnimationFrame(frame); lenis.destroy(); }; }, []);
  useEffect(() => { const onKey = (e) => e.key === "Escape" && setActive(null); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);

  const sendMessage = async (e) => {
    e.preventDefault(); setSubmitState("sending");
    try { await axios.post(`${API}/contact`, form); setSubmitState("success"); setForm({ name: "", email: "", message: "" }); } catch { setSubmitState("error"); }
  };
  const copyEmail = async () => {
    const fallbackCopy = () => { const helper = document.createElement("textarea"); helper.value = "menquejanruwell22@gmail.com"; document.body.appendChild(helper); helper.select(); const ok = document.execCommand("copy"); helper.remove(); return ok; };
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText("menquejanruwell22@gmail.com");
      else if (!fallbackCopy()) throw new Error("Clipboard unavailable");
      setCopied(true); setTimeout(() => setCopied(false), 1800);
    } catch { try { if (fallbackCopy()) { setCopied(true); setTimeout(() => setCopied(false), 1800); } else setCopied(false); } catch { setCopied(false); } }
  };

  const cats = ["All", "Web apps", "Systems", "Mobile"];
  const shown = filter === "All" ? projects : projects.filter(p => p.cat === filter);
  const count = c => c === "All" ? projects.length : projects.filter(p => p.cat === c).length;

  return <div className="site" data-testid="portfolio-page" id="top">
    <nav className="nav" data-testid="site-navigation"><Logo /><div className={`nav-links ${menu ? "is-open" : ""}`}><a href="#work" data-testid="nav-work-link">Projects</a><a href="#experience" data-testid="nav-experience-link">Experience</a><a href="#about" data-testid="nav-about-link">About</a><a href="#stack" data-testid="nav-stack-link">Stack</a><a href="#contact" data-testid="nav-contact-link">Contact</a></div><div className="nav-actions"><button className="icon-btn" onClick={() => setDark(!dark)} data-testid="theme-toggle" aria-label="Toggle color theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button><a className="nav-cta" href="#contact" data-testid="nav-start-project-link">Let's Talk <ArrowUpRight size={14} /></a><button className="menu-btn" onClick={() => setMenu(!menu)} data-testid="mobile-menu-button"><Menu size={19} /></button></div></nav>

    <main>
      <section className="hero" ref={heroRef} data-testid="hero-section"><div className="hero-grid" /><div className="hero-main"><div className="hero-copy"><motion.p className="eyebrow reveal" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>Full-stack developer · Web & mobile <span className="status-dot" /> Open for new work</motion.p><motion.h1 className="hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7 }}>I'm <em>Jan Ruwell Menque.</em></motion.h1><motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>A full-stack developer from Zamboanga City, Philippines. I turn ideas into thoughtful, functional digital experiences that solve real problems — from database design to deployment.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}><a className="button button-accent" href="#work" data-testid="hero-view-work-button">Explore selected work <ArrowUpRight size={15} /></a><a className="text-link" href="mailto:menquejanruwell22@gmail.com" data-testid="hero-contact-link">Let's talk <span>↗</span></a></motion.div></div><motion.div className="hero-photo" style={{ y: orbY }} initial={{ scale: .85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .3, duration: .9, ease: [.22, 1, .36, 1] }} data-testid="hero-photo"><img src="/legacy/profile/hero.jpg" alt="Jan Ruwell Menque" /></motion.div></div><div className="hero-meta"><span>ZAMBOANGA CITY · UTC+8</span><span>© 2025 JAN RUWELL</span></div></section>

      <div className="marquee" data-testid="skills-marquee"><div className="marquee-track">{[...marquee, ...marquee].map((item, i) => <span key={`${item}-${i}`}>{item} <b>✳</b></span>)}</div></div>

      <section className="section work-section" id="work" data-testid="work-section"><div className="section-head"><div><p className="kicker">PROJECTS</p><h2>Selected projects,<br /><em>client and in-house.</em></h2></div><p className="section-note">Every card is a build I scoped, shipped, and kept alive — web platforms, school systems, and mobile apps that solve real problems.</p></div><div className="filter-row" data-testid="project-filters">{cats.map(c => <button key={c} className={`filter-pill ${filter === c ? "is-active" : ""}`} onClick={() => setFilter(c)} data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}>{c} <b>{count(c)}</b></button>)}</div><div className="project-grid">{shown.map((project) => <motion.article className="project-card" key={project.id} layout whileHover={{ y: -6 }} transition={{ duration: .25 }} onClick={() => setActive(project)} data-testid={`project-card-${project.id}`}><div className="project-image"><img src={project.image} alt={`${project.title} project`} /><span className="card-arrow"><ArrowUpRight size={18} /></span></div><div className="project-info"><div className="chips">{project.chips.map(c => <span key={c} className="chip">{c}</span>)}</div><h3>{project.title}</h3><p>{project.text}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></motion.article>)}</div></section>

      <section className="section experience-section" id="experience" data-testid="experience-section"><div className="section-head"><div><p className="kicker">WORK EXPERIENCE</p><h2>Where I've worked,<br /><em>and what I shipped.</em></h2></div><p className="section-note">A timeline of the places, programs, and practice that shaped how I build.</p></div><div className="experience-list">{experience.map((job, i) => <motion.div className="experience-item" key={job.org} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}><span className="timeline-dot" /><div className="experience-card"><span className="job-mark">{job.mark}</span><div><h3>{job.role}</h3><p className="job-org">{job.org}</p><p className="job-period">{job.period}</p><p className="job-text">{job.text}</p></div></div></motion.div>)}</div></section>

      <section className="section about-section" id="about" data-testid="about-section"><div className="section-head"><div><p className="kicker">ABOUT ME</p><h2>The whole story,<br /><em>told properly.</em></h2></div></div><div className="about-grid"><div className="about-copy"><p className="about-lead">How I became a developer.</p><p>I'm Jan Ruwell Menque, an IT graduate and full-stack developer based in Zamboanga City, Philippines. I enjoy learning new technologies, solving problems, and creating useful applications — from web platforms to mobile-friendly experiences.</p><a href="mailto:menquejanruwell22@gmail.com" className="button button-accent" data-testid="about-contact-link">Work together <ArrowUpRight size={15} /></a></div><div className="journey-list"><div className="journey-item"><span>2020</span><p>Started my IT journey at ZPPSU.</p></div><div className="journey-item"><span>2021</span><p>Went self-employed as a full-stack developer.</p></div><div className="journey-item"><span>2022</span><p>Contributed to open-source programs and Hacktoberfest.</p></div><div className="journey-item"><span>2024</span><p>Graduated in IT and shipped my first university systems.</p></div><div className="journey-item"><span>2025</span><p>Building real products for real people.</p></div></div></div></section>

      <section className="section stack-section" id="stack" data-testid="stack-section"><div className="section-head"><div><p className="kicker">TECH STACK</p><h2>The stack,<br /><em>front end to deployment.</em></h2></div><p className="section-note">The technologies and tools I've worked with across development, deployment, and support.</p></div><div className="stack-groups">{stackGroups.map(g => <div className="stack-group" key={g.name}><div className="stack-group-head"><h3>{g.name}</h3><span>{g.tools.length} tools</span></div><div className="tool-pills">{g.tools.map(t => <span className="tool-pill" key={t}>{t}</span>)}</div></div>)}</div></section>

      <section className="contact-section" id="contact" data-testid="contact-section"><div className="contact-inner"><div className="contact-heading"><p className="kicker">OPEN FOR NEW WORK</p><h2>Let's talk about<br /><em>your project.</em></h2><p>Email is the fastest way to reach me — I usually reply within 24 hours. For opportunities, collaborations, or just to say hello, my inbox is open.</p><div className="contact-links"><button onClick={copyEmail} data-testid="copy-email-button"><Mail size={16} /> {copied ? "Copied to clipboard" : "menquejanruwell22@gmail.com"} {copied ? <Check size={15} /> : <Copy size={14} />}</button><a href="https://github.com/JrMenque" target="_blank" rel="noreferrer" data-testid="github-link"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/jan-ruwell-menque-9923a8256" target="_blank" rel="noreferrer" data-testid="linkedin-link"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a><a href="https://www.facebook.com/janruwell.menque.35" target="_blank" rel="noreferrer" data-testid="facebook-link">Facebook <ArrowUpRight size={14} /></a></div></div><form className="contact-form" onSubmit={sendMessage} data-testid="contact-form"><label>Your name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" data-testid="contact-name-input" /></label><label>Email address<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" data-testid="contact-email-input" /></label><label>What are we making?<textarea required minLength="10" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="A little about the project..." data-testid="contact-message-input" /></label><button className="button button-accent contact-submit" type="submit" disabled={submitState === "sending"} data-testid="contact-submit-button">{submitState === "success" ? "Message sent — thank you" : submitState === "error" ? "Couldn't send — try again" : submitState === "sending" ? "Sending…" : "Send the note"} <ArrowUpRight size={15} /></button></form></div></section>
    </main>
    <footer><Logo compact /><span>Designed & built with intention.</span><a href="#top" data-testid="back-to-top-link">Back to top ↑</a></footer>
    <AnimatePresence>{active && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} data-testid="project-modal"><motion.div className="modal" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setActive(null)} data-testid="close-project-modal"><X /></button><img src={active.image} alt={active.title} /><div className="chips">{active.chips.map(c => <span key={c} className="chip">{c}</span>)}</div><h2>{active.title}</h2><p>{active.text}</p><div className="tags">{active.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="button button-accent modal-link" href={active.link} target="_blank" rel="noreferrer" data-testid="project-live-link">View project / repository <ArrowUpRight size={15} /></a></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
export default App;
