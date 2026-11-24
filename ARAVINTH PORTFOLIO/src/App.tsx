import {
  useState, useEffect, useRef, FormEvent, CSSProperties, useCallback, MouseEvent as ReactMouseEvent,
} from 'react';
import {
  Download, Mail, MapPin, Github, Linkedin, ExternalLink, ChevronUp,
  Moon, Sun, Menu, X, Code, Server, Database, Cloud, GraduationCap,
  Award, Briefcase, Send, Phone, Calendar, User, Trophy, Building2,
} from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────── */

const typingTexts = ['Angular', 'React.js', 'Node.js', 'SQL Server', 'Azure'];

const skills = {
  frontend: [
    { name: 'Angular', level: 90, icon: Code },
    { name: 'React.js', level: 85, icon: Code },
    { name: 'TypeScript', level: 88, icon: Code },
    { name: 'JavaScript', level: 90, icon: Code },
    { name: 'HTML5 / CSS3', level: 95, icon: Code },
    { name: 'Bootstrap / SCSS', level: 85, icon: Code },
  ],
  backend: [
    { name: 'Node.js', level: 88, icon: Server },
    { name: 'Express.js', level: 88, icon: Server },
    { name: 'REST APIs', level: 90, icon: Server },
    { name: 'JWT Auth', level: 85, icon: Server },
  ],
  database: [
    { name: 'SQL Server', level: 90, icon: Database },
    { name: 'MySQL', level: 82, icon: Database },
    { name: 'MongoDB', level: 75, icon: Database },
  ],
  cloud: [
    { name: 'Azure Cloud', level: 80, icon: Cloud },
    { name: 'Azure DevOps', level: 80, icon: Cloud },
    { name: 'Git / GitHub', level: 92, icon: Cloud },
    { name: 'CI/CD Pipelines', level: 75, icon: Cloud },
  ],
};

const projects = [
  {
    id: 1,
    title: 'Sustainability Compliance Platform',
    description: 'Enterprise SaaS platform for sustainability certification, mass balance accounting, supply chain traceability, and regulatory compliance. Built Movement Management, Batch Management, Allocation, and Production Tracking modules.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Angular', 'Node.js', 'SQL Server', 'Azure'],
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'Role-Based Access Management System',
    description: 'Comprehensive RBAC system enabling administrators to dynamically configure user access, roles, and menu-level authorization with granular access control.',
    image: 'https://images.pexels.com/photos/60504/security-protection-access-cyber-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Angular', 'Node.js', 'SQL Server', 'JWT'],
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'PDF Data Extraction Tool',
    description: 'Intelligent PDF processing solution using PDF.js, pdf-parse, Multer, and NLP-based extraction techniques to convert sustainability compliance documents into structured JSON data.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Node.js', 'Express.js', 'SQL Server', 'NLP'],
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'RESTful API & Database Layer',
    description: 'Designed and optimized complex SQL Server databases with Stored Procedures, Views, Functions, Triggers, CTEs, and Dynamic SQL. Improved query performance through indexing strategies.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Node.js', 'SQL Server', 'Express.js', 'Azure'],
    github: '#',
    demo: '#',
  },
];

const experiences = [
  {
    title: 'Junior Full Stack Developer',
    company: 'BIOMOC Solutions',
    location: 'Coimbatore (On-site)',
    duration: 'Dec 2023 – Present',
    project: 'Sustainability Compliance Platform',
    technologies: 'Angular, Node.js, SQL Server, Azure',
    highlights: [
      'Developed Movement Management, Batch Management, Allocation, Mass Balance, Sustainability Reporting, and Production Tracking modules',
      'Designed and maintained RESTful APIs and SQL Server stored procedures for enterprise sustainability platforms',
      'Implemented Role-Based Access Control (RBAC) and permission management systems with menu-level authorization',
      'Integrated PDF processing solutions using PDF.js, pdf-parse, Multer, and NLP-based extraction for structured JSON output',
      'Worked with Reactive Forms, Dynamic Form Generation, Custom Validators, Route Guards, and Lazy Loading',
      'Implemented JWT-based authentication and Joi schema API validation layers',
      'Improved SQL query performance through indexing strategies, execution plan analysis, and stored procedure optimization',
      'Participated in Azure Cloud deployment, application configuration, database management, and production support',
      'Worked in Agile/Scrum with Git, Azure DevOps, pull requests, code reviews, and CI/CD pipelines',
    ],
  },
];

const education = [
  {
    title: 'Bachelor of Science in Mathematics',
    institution: "Jairam's College of Arts and Science, Karur",
    year: '2019',
    detail: 'CGPA: 6.78',
    icon: GraduationCap,
  },
  {
    title: 'Full Stack Development',
    institution: 'KGISL MicroCollege, Coimbatore',
    year: '2023',
    detail: 'Certification',
    icon: Award,
  },
  {
    title: 'HSC',
    institution: 'P.A Vidya Bhavan Hr. Sec. School, Karur',
    year: '2016',
    detail: 'Higher Secondary',
    icon: GraduationCap,
  },
  {
    title: 'SSLC',
    institution: 'P.A Vidya Bhavan Hr. Sec. School, Karur',
    year: '2014',
    detail: 'Secondary School',
    icon: GraduationCap,
  },
];

const achievements = [
  {
    title: 'Roles & Permissions Module',
    description: 'Developed and enhanced the Roles & Permissions module, enabling administrators to configure user access dynamically across the enterprise platform.',
    icon: Trophy,
  },
  {
    title: 'SQL Performance Optimization',
    description: 'Optimized complex SQL queries and stored procedures, significantly reducing report generation and data retrieval times for enterprise clients.',
    icon: Trophy,
  },
  {
    title: 'PDF Data Extraction',
    description: 'Implemented PDF-to-structured-data extraction solutions for sustainability compliance documentation using advanced NLP-based techniques.',
    icon: Trophy,
  },
  {
    title: 'Cross-functional Collaboration',
    description: 'Collaborated with QA, Product Owners, and Business Analysts to deliver enterprise software solutions in an Agile/Scrum environment.',
    icon: Trophy,
  },
];

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

/* ─── Hooks ─────────────────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/* ─── Scroll Progress Bar ────────────────────────────────────────── */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}

/* ─── Cursor Glow ────────────────────────────────────────────────── */

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={ref} className="cursor-glow hidden lg:block" />;
}

/* ─── Particle Field ─────────────────────────────────────────────── */

function ParticleField() {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 18 + 12,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  ).current;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle bg-primary-400/30 dark:bg-primary-500/20"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Counter ───────────────────────────────────────────── */

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0.5);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const duration = 1400;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ─── Animated Section (direction variants) ──────────────────────── */

type RevealDir = 'up' | 'left' | 'right' | 'zoom';

function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDir;
}) {
  const { ref, isInView } = useInView();

  const base = 'transition-all ease-out duration-700';
  const hidden: Record<RevealDir, string> = {
    up:    'opacity-0 translate-y-10',
    left:  'opacity-0 -translate-x-14',
    right: 'opacity-0 translate-x-14',
    zoom:  'opacity-0 scale-90',
  };
  const visible = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <div
      ref={ref}
      className={`${base} ${className} ${isInView ? visible : hidden[direction]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Section Title with clip-path reveal ────────────────────────── */

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="text-center mb-16">
      <h2
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-4"
        style={{
          clipPath: isInView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className="text-dark-500 dark:text-dark-400 text-lg max-w-2xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 rounded-full"
        style={{
          width: isInView ? '96px' : '0px',
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s',
        }}
      />
    </div>
  );
}

/* ─── Glass Card ─────────────────────────────────────────────────── */

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glow-border backdrop-blur-md bg-white/70 dark:bg-dark-800/70 rounded-2xl border border-white/20 dark:border-dark-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Tilt Card (project cards) ──────────────────────────────────── */

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card glow-border backdrop-blur-md bg-white/70 dark:bg-dark-800/70 rounded-2xl border border-white/20 dark:border-dark-700/50 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Typing Effect ──────────────────────────────────────────────── */

function TypingEffect() {
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentText.substring(0, text.length + 1));
        if (text === currentText) { setIsDeleting(true); setDelta(2000); }
        else setDelta(150);
      } else {
        setText(currentText.substring(0, text.length - 1));
        if (text === '') { setIsDeleting(false); setTextIndex((textIndex + 1) % typingTexts.length); setDelta(500); }
        else setDelta(75);
      }
    }, delta);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, textIndex, delta]);

  return (
    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent font-bold">
      {text}<span className="animate-pulse text-primary-500">|</span>
    </span>
  );
}

/* ─── Skill Bar (with shimmer) ───────────────────────────────────── */

function SkillBar({ name, level, icon: Icon }: { name: string; level: number; icon: React.ComponentType<{ className?: string }> }) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary-500" />
          <span className="font-medium text-dark-700 dark:text-dark-200 text-sm">{name}</span>
        </div>
        <span
          className="text-primary-500 font-semibold text-sm transition-all duration-700"
          style={{ opacity: isInView ? 1 : 0 }}
        >
          {level}%
        </span>
      </div>
      <div className="h-2.5 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: isInView ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
            transition: 'width 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* shimmer sweep */}
          {isInView && (
            <span
              className="absolute inset-0 -skew-x-12"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
                animation: 'shimmer 2.2s linear infinite',
                animationDelay: '1s',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card ───────────────────────────────────────────────── */

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <AnimatedSection direction="zoom">
      <TiltCard className="overflow-hidden h-full group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
          {/* hover action overlay */}
          <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-5">
            <a
              href={project.github}
              className="p-3 bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 scale-0 group-hover:scale-100 hover:scale-110"
              style={{ transitionDelay: '0.05s' }}
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a
              href={project.demo}
              className="p-3 bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 scale-0 group-hover:scale-100 hover:scale-110"
              style={{ transitionDelay: '0.1s' }}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-dark-800 dark:text-dark-100 mb-2">
            {project.title}
          </h3>
          <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="tag-pill bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </AnimatedSection>
  );
}

/* ─── Experience Detail Card ─────────────────────────────────────── */

function ExperienceDetailCard({ exp }: { exp: typeof experiences[0] }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <GlassCard className="p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary-500 flex-shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-dark-800 dark:text-white">{exp.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4 text-primary-500" />
                <span className="text-primary-500 font-semibold">{exp.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-dark-500 dark:text-dark-400 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{exp.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{exp.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="px-4 py-2 bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-full text-sm font-medium border border-accent-500/20 animate-pulse-slow">
              Current Role
            </span>
          </div>
        </div>
        <div className="mb-6 p-4 rounded-xl bg-primary-500/5 border border-primary-500/20">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Project: {exp.project}</p>
          <p className="text-xs text-dark-500 dark:text-dark-400">Technologies: {exp.technologies}</p>
        </div>
        <ul className="space-y-3">
          {exp.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-dark-600 dark:text-dark-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, transform 0.5s ease ${0.3 + i * 0.07}s`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mt-2 flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}

/* ─── Floating Element ───────────────────────────────────────────── */

function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const style: CSSProperties = { animation: `float 3s ease-in-out infinite`, animationDelay: `${delay}s` };
  return <div style={style}>{children}</div>;
}

/* ─── App ────────────────────────────────────────────────────────── */

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const validateForm = () => {
    const errors = { name: '', email: '', message: '' };
    let ok = true;
    if (!formData.name.trim()) { errors.name = 'Name is required'; ok = false; }
    if (!formData.email.trim()) { errors.email = 'Email is required'; ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { errors.email = 'Invalid email'; ok = false; }
    if (!formData.message.trim()) { errors.message = 'Message is required'; ok = false; }
    setFormErrors(errors);
    return ok;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    }
  };

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.technologies.includes(activeFilter));

  const filterOptions = ['All', ...new Set(projects.flatMap(p => p.technologies))];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950' : 'bg-gradient-to-br from-dark-50 via-white to-primary-50'}`}>
      <ScrollProgress />
      <CursorGlow />
      <ParticleField />

      {/* Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full ${darkMode ? 'bg-primary-500/10' : 'bg-primary-400/20'} blur-3xl animate-float`} />
        <div className={`absolute top-1/2 -left-40 w-96 h-96 rounded-full ${darkMode ? 'bg-accent-500/10' : 'bg-accent-400/20'} blur-3xl animate-float animation-delay-2000`} />
        <div className={`absolute bottom-40 right-1/4 w-64 h-64 rounded-full ${darkMode ? 'bg-primary-500/5' : 'bg-primary-300/10'} blur-3xl animate-float-slow animation-delay-4000`} />
      </div>

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'backdrop-blur-md bg-white/70 dark:bg-dark-900/70 shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent transition-transform hover:scale-105">
              Aravinth R
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="nav-link text-dark-600 dark:text-dark-300 transition-transform font-medium"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-dark-100 dark:bg-dark-700 transition-all hover:scale-110 hover:rotate-12"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-dark-600" />}
              </button>
            </div>
            <div className="flex md:hidden items-center gap-4">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-dark-100 dark:bg-dark-700 hover:scale-110 transition-transform">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-dark-600" />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/90 dark:bg-dark-900/90 animate-slide-up">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-dark-600 dark:text-dark-300 rounded-lg transition-all hover:translate-x-2"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-primary-500 dark:text-primary-400 font-medium mb-2 animate-fade-in">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-dark-800 dark:text-white mb-2 animate-fade-in animation-delay-200">
                Aravinth R
              </h1>
              <div className="text-xl md:text-2xl text-dark-600 dark:text-dark-300 mb-6 animate-fade-in animation-delay-400">
                <span>Full Stack Developer | </span>
                <TypingEffect />
              </div>
              <p className="text-dark-500 dark:text-dark-400 text-lg mb-8 max-w-xl animate-fade-in animation-delay-600">
                2.6+ years designing, developing, and maintaining enterprise web applications.
                Specializing in Angular, Node.js, SQL Server, and Azure Cloud.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in animation-delay-800">
                <a
                  href="/R_Aravinth.pdf"
                  download="Aravinth_R_Resume.pdf"
                  className="group btn-magnetic flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </a>
                <button
                  onClick={() => scrollToSection('Contact')}
                  className="group btn-magnetic flex items-center gap-2 px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-full font-medium hover:scale-105 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Contact Me
                </button>
              </div>
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start animate-fade-in animation-delay-1000">
                {[
                  { href: 'https://github.com/aravinth', icon: Github },
                  { href: 'https://linkedin.com/in/Aravinth-r-a38176253', icon: Linkedin },
                  { href: 'mailto:aravinth.dev99@gmail.com', icon: Mail },
                ].map(({ href, icon: Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-dark-100 dark:bg-dark-700 hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div className="relative flex justify-center animate-fade-in animation-delay-600">
              <div className="relative">
                <div
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full p-1 animate-gradient"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb, #3b82f6)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient 8s linear infinite',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-dark-800 p-2 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Aravinth R"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                {/* Orbit ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary-400/30 dark:border-primary-500/20"
                  style={{ animation: 'spin 20s linear infinite', margin: '-12px' }}
                />
                <FloatingElement delay={0}>
                  <div className="absolute -top-4 -right-4 p-4 rounded-2xl bg-white dark:bg-dark-800 shadow-xl hover:scale-110 transition-transform">
                    <Code className="w-8 h-8 text-primary-500" />
                  </div>
                </FloatingElement>
                <FloatingElement delay={1}>
                  <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl bg-white dark:bg-dark-800 shadow-xl hover:scale-110 transition-transform">
                    <Server className="w-8 h-8 text-accent-500" />
                  </div>
                </FloatingElement>
                <FloatingElement delay={2}>
                  <div className="absolute top-1/4 -left-8 p-4 rounded-2xl bg-white dark:bg-dark-800 shadow-xl hover:scale-110 transition-transform">
                    <Database className="w-8 h-8 text-primary-400" />
                  </div>
                </FloatingElement>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Years Experience', target: 2, suffix: '.6+' },
              { label: 'Projects Delivered', target: 10, suffix: '+' },
              { label: 'Technologies', target: 20, suffix: '+' },
              { label: 'Enterprise Modules', target: 6, suffix: '+' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100} direction="zoom">
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-1">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-dark-500 dark:text-dark-400 text-sm">{stat.label}</div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Get to know me better">About Me</SectionTitle>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-dark-800 dark:text-white mb-4">Professional Summary</h3>
                <div className="space-y-4">
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    I'm a <span className="text-primary-500 font-semibold">Full Stack Developer with 2.6+ years</span> of experience
                    designing, developing, and maintaining enterprise web applications using{' '}
                    <span className="text-primary-500 font-semibold">Angular, TypeScript, Node.js, Express.js, SQL Server, and Azure Cloud</span>.
                  </p>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    Experienced in building scalable SaaS platforms, RESTful APIs, Role-Based Access Control (RBAC),
                    PDF data extraction systems, database optimization, and regulatory compliance solutions.
                  </p>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    Strong expertise in frontend architecture, backend development, performance tuning, and Agile delivery.
                    Currently at <span className="text-accent-500 font-semibold">BIOMOC Solutions, Coimbatore</span>.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-dark-200 dark:border-dark-700">
                  <h4 className="font-semibold text-dark-700 dark:text-dark-200 mb-3">Core Competencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Documentation', 'Debugging', 'Team Collaboration', 'Remote Communication', 'Agile Scrum'].map((c, i) => (
                      <span
                        key={c}
                        className="tag-pill bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: User, label: 'Name', value: 'Aravinth R' },
                { icon: Calendar, label: 'Experience', value: '2.6+ Years' },
                { icon: Building2, label: 'Company', value: 'BIOMOC Solutions' },
                { icon: MapPin, label: 'Location', value: 'Coimbatore, India' },
                { icon: Mail, label: 'Email', value: 'aravinth.dev99@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 8220911488' },
              ].map((item, i) => (
                <AnimatedSection key={item.label} delay={i * 80} direction="right">
                  <GlassCard className="p-5">
                    <item.icon className="w-7 h-7 text-primary-500 mb-2" />
                    <p className="text-dark-400 dark:text-dark-500 text-xs mb-0.5">{item.label}</p>
                    <p className="text-dark-800 dark:text-white font-semibold text-sm break-all">{item.value}</p>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Technologies I work with">Skills</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Frontend', skills: skills.frontend, icon: Code },
              { title: 'Backend', skills: skills.backend, icon: Server },
              { title: 'Database', skills: skills.database, icon: Database },
              { title: 'Cloud & DevOps', skills: skills.cloud, icon: Cloud },
            ].map((cat, i) => (
              <AnimatedSection key={cat.title} delay={i * 120} direction={(['up', 'left', 'right', 'up'] as RevealDir[])[i]}>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary-500 hover:scale-110 transition-transform">
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-dark-800 dark:text-white">{cat.title}</h3>
                  </div>
                  {cat.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12" direction="zoom">
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-dark-800 dark:text-white mb-6 text-center">Additional Technologies & Competencies</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'JWT Authentication', 'Joi Validations', 'RBAC', 'PDF.js', 'pdf-parse',
                  'Multer', 'NLP Extraction', 'Reactive Forms', 'Route Guards', 'Lazy Loading',
                  'Stored Procedures', 'CTEs', 'Dynamic SQL', 'Indexed Views', 'Material UI',
                  'SCSS', 'Bootstrap', 'Azure DevOps', 'CI/CD Pipelines', 'Agile Scrum',
                  'Claude AI', 'ChatGPT',
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="tag-pill bg-primary-500/10 text-dark-700 dark:text-dark-200 border-primary-500/20"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="My professional journey">Experience</SectionTitle>
          {experiences.map((exp, i) => (
            <ExperienceDetailCard key={i} exp={exp} />
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Some of my key work">Projects</SectionTitle>
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/50 dark:bg-dark-700/50 text-dark-600 dark:text-dark-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Notable accomplishments">Key Achievements</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((item, i) => (
              <AnimatedSection key={i} delay={i * 100} direction={i % 2 === 0 ? 'left' : 'right'}>
                <GlassCard className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 flex-shrink-0 hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-800 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="My education and certifications">Education & Certifications</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {education.map((item, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="zoom">
                <GlassCard className="p-6 text-center h-full group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-dark-800 dark:text-dark-100 mb-1">{item.title}</h3>
                  <p className="text-dark-500 dark:text-dark-400 text-sm mb-2">{item.institution}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-full">
                    {item.detail} · {item.year}
                  </span>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Get in touch with me">Contact</SectionTitle>
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <GlassCard className="p-8 h-full">
                <h3 className="text-2xl font-bold text-dark-800 dark:text-white mb-4">Let's Connect</h3>
                <p className="text-dark-600 dark:text-dark-300 mb-8">
                  Open to new opportunities, collaborations, and interesting projects. Feel free to reach out!
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'aravinth.dev99@gmail.com', href: 'mailto:aravinth.dev99@gmail.com' },
                    { icon: Phone, label: 'Phone', value: '+91 8220911488', href: 'tel:+918220911488' },
                    { icon: MapPin, label: 'Location', value: 'Coimbatore, Tamil Nadu, India', href: '#' },
                    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/Aravinth-r-a38176253', href: 'https://linkedin.com/in/Aravinth-r-a38176253' },
                    { icon: Github, label: 'GitHub', value: 'github.com/aravinth', href: '#' },
                  ].map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                      style={{
                        transition: `transform 0.3s ease ${i * 60}ms, opacity 0.3s ease ${i * 60}ms`,
                      }}
                    >
                      <div className="p-3 rounded-xl bg-primary-500/10 transition-all duration-300 group-hover:scale-110">
                        <item.icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-dark-400 dark:text-dark-500 text-xs">{item.label}</p>
                        <p className="text-dark-700 dark:text-dark-200 font-medium text-sm">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-dark-200 dark:border-dark-700">
                  <a
                    href="/R_Aravinth.pdf"
                    download="Aravinth_R_Resume.pdf"
                    className="btn-magnetic flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all hover:scale-[1.02]"
                  >
                    <Download className="w-5 h-5" />
                    Download Full Resume (PDF)
                  </a>
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={200} direction="right">
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-dark-800 dark:text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { key: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-dark-600 dark:text-dark-300 mb-2 font-medium text-sm">{label}</label>
                      <input
                        type={type}
                        value={formData[key as 'name' | 'email']}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-700/50 border ${formErrors[key as 'name' | 'email'] ? 'border-red-500' : 'border-dark-200 dark:border-dark-600 focus:border-primary-500'} focus:outline-none text-dark-800 dark:text-white transition-all focus:ring-2 focus:ring-primary-500/20`}
                        placeholder={placeholder}
                      />
                      {formErrors[key as 'name' | 'email'] && (
                        <p className="text-red-500 text-sm mt-1">{formErrors[key as 'name' | 'email']}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-dark-600 dark:text-dark-300 mb-2 font-medium text-sm">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-700/50 border ${formErrors.message ? 'border-red-500' : 'border-dark-200 dark:border-dark-600 focus:border-primary-500'} focus:outline-none text-dark-800 dark:text-white transition-all resize-none focus:ring-2 focus:ring-primary-500/20`}
                      placeholder="Your message here..."
                    />
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="btn-magnetic w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-[1.02] group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-dark-200 dark:border-dark-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <a href="#" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent hover:scale-105 inline-block transition-transform">
                Aravinth R
              </a>
              <p className="text-dark-500 dark:text-dark-400 mt-1 text-sm">Junior Full Stack Developer · BIOMOC Solutions</p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { href: 'https://github.com/aravinth', icon: Github },
                { href: 'https://linkedin.com/in/Aravinth-r-a38176253', icon: Linkedin },
                { href: 'mailto:aravinth.dev99@gmail.com', icon: Mail },
              ].map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-dark-100 dark:bg-dark-700 hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-dark-500 dark:text-dark-400 text-sm">&copy; {new Date().getFullYear()} Aravinth R. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      {scrollY > 400 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-all z-50 animate-bounce-in"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
