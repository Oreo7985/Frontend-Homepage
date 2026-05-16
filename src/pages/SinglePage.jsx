import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Instagram as IGIcon, Mail,
  MapPin, School, Code, Heart, ArrowUpRight,
} from 'lucide-react';
import GitHubProjects from '../components/projects/GithubProjects';
import { GITHUB_USERNAME, INSTAGRAM_API_URL, INSTAGRAM_USERNAME } from '../config/api';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const SectionLabel = ({ children }) => (
  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-600 mb-10">
    {children}
  </p>
);

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const links = [
    { Icon: Github,  href: 'https://github.com/Oreo7985',                        label: 'GitHub' },
    { Icon: Linkedin, href: 'https://linkedin.com/in/luhang-fang-52a4181a6',     label: 'LinkedIn' },
    { Icon: IGIcon,  href: 'https://www.instagram.com/oreo_in_germany',          label: 'Instagram' },
    { Icon: Mail,    href: 'mailto:luhang.fang@gmail.com',                       label: 'Email' },
  ];

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Photo — desktop only, right column */}
      <div className="absolute inset-y-0 right-0 w-[46%] hidden xl:block overflow-hidden">
        <img
          src="/selfie.jpg"
          alt="Luhang Fang"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'saturate(0.75)' }}
        />
        {/* Blend left edge into background */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 via-zinc-50/10 dark:via-zinc-950/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full xl:w-[54%] px-8 md:px-14 py-28 pt-32">
        {/* Mobile avatar */}
        <motion.div {...fadeUp} className="xl:hidden mb-10">
          <img
            src="/selfie.jpg"
            alt="Luhang Fang"
            className="w-16 h-16 rounded-full object-cover object-top border border-zinc-200 dark:border-zinc-800"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-7"
        >
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 mb-5">
              Full-stack Developer · Berlin
            </p>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-medium text-zinc-900 dark:text-zinc-100
                           leading-[1.08] tracking-tight">
              Luhang<br />Fang
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-xs"
          >
            Building modern web applications.<br />
            CS student at Humboldt University.
          </motion.p>

          {/* Social icons */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex items-center gap-5"
          >
            {links.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-zinc-400 dark:text-zinc-600
                           hover:text-zinc-900 dark:hover:text-zinc-100
                           transition-colors duration-200"
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 text-sm font-medium rounded-lg
                         bg-zinc-900 dark:bg-zinc-100
                         text-zinc-100 dark:text-zinc-900
                         hover:bg-zinc-700 dark:hover:bg-white
                         transition-colors duration-200"
            >
              View Projects
            </a>
            <a
              href="mailto:luhang.fang@gmail.com"
              className="px-5 py-2.5 text-sm rounded-lg
                         border border-zinc-300 dark:border-zinc-800
                         text-zinc-600 dark:text-zinc-400
                         hover:border-zinc-500 dark:hover:border-zinc-600
                         hover:text-zinc-900 dark:hover:text-zinc-100
                         transition-all duration-200"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const techStack = [
    'React', 'Node.js', 'TypeScript', 'Python',
    'PostgreSQL', 'Docker', 'AWS', 'Machine Learning', 'Git',
  ];

  const interests = [
    'Photography', 'Traveling', 'Badminton', 'Fitness',
    'Machine Learning', 'Music', 'Design', 'Web Dev',
  ];

  return (
    <section
      id="about"
      className="border-t border-zinc-200 dark:border-zinc-800/60"
    >
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-24">
        <motion.div {...fadeUp}>
          <SectionLabel>About</SectionLabel>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left column */}
          <motion.div {...fadeUp} className="flex flex-col gap-10">
            {/* Background */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
                <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Background</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Originally from Qiandaohu, Hangzhou, China.<br />
                Living and studying in Berlin, Germany since 2021.
              </p>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <School className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
                <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Education</span>
              </div>
              <div className="space-y-5 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                {[
                  { degree: 'M.Sc. Computer Science', school: 'Humboldt University Berlin', period: '2023 – present' },
                  { degree: 'B.Sc. Applied Computer Science', school: 'Hochschule Hannover', period: '2019 – 2023' },
                  { school: 'Zhejiang University of Science and Technology', period: '2017 – 2019' },
                ].map((e, i) => (
                  <div key={i}>
                    {e.degree && <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">{e.degree}</p>}
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{e.school}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600">{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="flex flex-col gap-10">
            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
                <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md
                               border border-zinc-200 dark:border-zinc-800
                               text-zinc-600 dark:text-zinc-400
                               bg-zinc-50 dark:bg-zinc-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map(item => (
                  <span
                    key={item}
                    className="text-xs text-zinc-500 dark:text-zinc-500"
                  >
                    {item}
                    <span className="ml-2 text-zinc-300 dark:text-zinc-800">·</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-zinc-200 dark:border-zinc-800/60"
    >
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <SectionLabel>Projects</SectionLabel>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600
                       hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 mb-10"
          >
            <Github className="w-3.5 h-3.5" />
            View all on GitHub
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          <GitHubProjects username={GITHUB_USERNAME} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Instagram ───────────────────────────────────────────────────────────────

function InstagramSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const observerTarget = useRef(null);

  const loadPosts = useCallback(async () => {
    if (loading || (!hasNextPage && posts.length > 0)) return;
    setLoading(true);
    try {
      const url = new URL(INSTAGRAM_API_URL);
      if (nextCursor) url.searchParams.append('cursor', nextCursor);
      url.searchParams.append('limit', '6');
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data.success) {
        setPosts(prev => {
          const merged = [...prev];
          data.data.forEach(p => { if (!merged.some(x => x.id === p.id)) merged.push(p); });
          return merged;
        });
        setNextCursor(data.pagination?.nextCursor || null);
        setHasNextPage(data.pagination?.hasNextPage ?? false);
      } else throw new Error(data.error || 'Failed');
    } catch (err) {
      setError(err.message);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasNextPage, nextCursor, posts.length]);

  useEffect(() => { loadPosts(); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !loading && hasNextPage) loadPosts(); },
      { rootMargin: '50%', threshold: 0.1 }
    );
    if (observerTarget.current) obs.observe(observerTarget.current);
    return () => obs.disconnect();
  }, [loadPosts, loading, hasNextPage]);

  return (
    <section
      id="instagram"
      className="border-t border-zinc-200 dark:border-zinc-800/60"
    >
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <SectionLabel>Instagram</SectionLabel>
          <a
            href={`https://www.instagram.com/${INSTAGRAM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600
                       hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 mb-10"
          >
            @{INSTAGRAM_USERNAME}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        {error ? (
          <p className="text-sm text-zinc-500">Could not load Instagram posts.</p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              animate="show"
            >
              {posts.map(post => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl
                             bg-zinc-100 dark:bg-zinc-900"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                >
                  <img
                    src={post.media_url}
                    alt={post.caption || ''}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300
                                  flex items-end p-3 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-1.5 text-white text-xs">
                      <Heart className="w-3.5 h-3.5" />
                      <span>View on Instagram</span>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Skeleton placeholders while loading first batch */}
              {loading && posts.length === 0 &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
                ))
              }
            </motion.div>

            <div ref={observerTarget} className="py-10 flex justify-center">
              {loading && posts.length > 0 && (
                <span className="text-xs text-zinc-400 dark:text-zinc-600 animate-pulse">Loading…</span>
              )}
              {!hasNextPage && posts.length > 0 && (
                <span className="text-xs text-zinc-400 dark:text-zinc-700">— End —</span>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-8 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-400 dark:text-zinc-700">
          Luhang Fang
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-700">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function SinglePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <InstagramSection />
      <Footer />
    </>
  );
}
