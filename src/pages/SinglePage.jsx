import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Instagram as IGIcon, Mail,
  School, Code, Heart, ArrowUpRight,
} from 'lucide-react';
import {
  SiReact, SiNodedotjs, SiTypescript, SiPython,
  SiPostgresql, SiDocker, SiCloudflare, SiTensorflow, SiGit,
} from 'react-icons/si';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import GitHubProjects from '../components/projects/GithubProjects';
import { GITHUB_USERNAME, INSTAGRAM_API_URL, INSTAGRAM_USERNAME } from '../config/api';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const SectionLabel = ({ children }) => (
  <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 mb-10">
    {children}
  </p>
);

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const HOMETOWN = [119.04, 29.61]; // Qiandaohu [lng, lat]
const BERLIN   = [13.405, 52.52]; // Berlin

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ bgPhotos }) {
  const links = [
    { Icon: Github,   href: 'https://github.com/Oreo7985',                    label: 'GitHub' },
    { Icon: Linkedin, href: 'https://linkedin.com/in/luhang-fang-52a4181a6', label: 'LinkedIn' },
    { Icon: IGIcon,   href: 'https://www.instagram.com/oreo_in_germany',     label: 'Instagram' },
    { Icon: Mail,     href: 'mailto:luhang.fang@gmail.com',                  label: 'Email' },
  ];

  const cols = bgPhotos.length >= 6 ? 3 : bgPhotos.length >= 3 ? 2 : 1;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {bgPhotos.length > 0 ? (
        <motion.div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, filter: 'blur(3px)', transform: 'scale(1.05)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          {bgPhotos.map((photo, i) => (
            <div key={i} className="overflow-hidden">
              <img src={photo.media_url} alt="" className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.85) brightness(0.6)' }} />
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-violet-950/30 to-zinc-950" />
      )}
      <div className="absolute inset-0 bg-zinc-950/55" />

      <div className="relative z-10 w-full flex items-center justify-start px-6 md:px-16 py-24 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="w-full max-w-lg backdrop-blur-2xl bg-white/[0.07]
                     border border-white/[0.12] rounded-3xl p-8 md:p-12
                     shadow-[0_8px_64px_rgba(0,0,0,0.6)]"
        >
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-violet-300/70 mb-4">
                Full-stack Developer · Berlin
              </p>
              <h1 className="text-5xl md:text-6xl font-medium text-zinc-50 leading-[1.08] tracking-tight">
                Luhang<br />
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Fang
                </span>
              </h1>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Building modern web applications.<br />
              CS student at Humboldt University.
            </p>
            <div className="flex items-center gap-5">
              {links.map(({ Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer" aria-label={label}
                  className="text-zinc-500 hover:text-violet-400 transition-colors duration-200">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a href="#projects"
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-violet-600
                           hover:bg-violet-500 text-white transition-colors duration-200">
                View Projects
              </a>
              <a href="mailto:luhang.fang@gmail.com"
                className="px-5 py-2.5 text-sm rounded-lg border border-white/20 text-zinc-300
                           hover:border-violet-400/50 hover:text-violet-300 transition-all duration-200">
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About sub-components ────────────────────────────────────────────────────

function SchoolLogo({ domain, abbr, bg }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center
                       text-[11px] font-bold text-white flex-shrink-0`}>
        {abbr}
      </div>
    );
  }
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
      alt={abbr}
      className="w-10 h-10 rounded-xl bg-white object-contain p-1 flex-shrink-0"
      onError={() => setErrored(true)}
    />
  );
}

function LocationMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 135, center: [66, 46] }}
        width={800}
        height={280}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#27272a"
                stroke="#3f3f46"
                strokeWidth={0.5}
                style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
              />
            ))
          }
        </Geographies>

        {/* Hometown — Qiandaohu */}
        <Marker coordinates={HOMETOWN}>
          <circle r={6} fill="#f97316" stroke="#fff" strokeWidth={1.5} />
          <circle r={10} fill="#f97316" fillOpacity={0.2} />
          <text x={10} y={4} fontSize={10} fill="#fdba74" fontFamily="monospace" fontWeight="500">
            Qiandaohu
          </text>
        </Marker>

        {/* Berlin */}
        <Marker coordinates={BERLIN}>
          <circle r={6} fill="#8b5cf6" stroke="#fff" strokeWidth={1.5} />
          <circle r={10} fill="#8b5cf6" fillOpacity={0.2} />
          <text x={10} y={4} fontSize={10} fill="#c4b5fd" fontFamily="monospace" fontWeight="500">
            Berlin
          </text>
        </Marker>
      </ComposableMap>

      <div className="px-4 py-2.5 flex items-center gap-4 border-t border-zinc-800">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
          Hometown
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
          Now
        </span>
      </div>
    </div>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const education = [
    {
      degree: 'M.Sc. Computer Science',
      school: 'Humboldt University Berlin',
      period: '2023 – present',
      domain: 'hu-berlin.de',
      abbr: 'HU',
      bg: 'bg-red-900',
    },
    {
      degree: 'B.Sc. Applied Computer Science',
      school: 'Hochschule Hannover',
      period: '2019 – 2023',
      domain: 'hs-hannover.de',
      abbr: 'HsH',
      bg: 'bg-green-900',
    },
    {
      school: 'Zhejiang Univ. of Science & Tech.',
      period: '2017 – 2019',
      domain: 'zust.edu.cn',
      abbr: 'ZUST',
      bg: 'bg-blue-900',
    },
  ];

  const techStack = [
    { label: 'React',       Icon: SiReact,       color: '#61DAFB' },
    { label: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
    { label: 'TypeScript',  Icon: SiTypescript,  color: '#3178C6' },
    { label: 'Python',      Icon: SiPython,      color: '#3776AB' },
    { label: 'PostgreSQL',  Icon: SiPostgresql,  color: '#4169E1' },
    { label: 'Docker',      Icon: SiDocker,      color: '#2496ED' },
    { label: 'Cloudflare',  Icon: SiCloudflare,  color: '#F38020' },
    { label: 'TensorFlow',  Icon: SiTensorflow,  color: '#FF6F00' },
    { label: 'Git',         Icon: SiGit,         color: '#F05032' },
  ];

  const interests = [
    { emoji: '📷', text: 'Photography' },
    { emoji: '✈️', text: 'Traveling' },
    { emoji: '🏸', text: 'Badminton' },
    { emoji: '🏋️', text: 'Fitness' },
    { emoji: '🤖', text: 'Machine Learning' },
    { emoji: '🎵', text: 'Music' },
    { emoji: '🎨', text: 'Design' },
    { emoji: '💻', text: 'Web Dev' },
  ];

  return (
    <section id="about" className="border-t border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-24">
        <motion.div {...fadeUp}>
          <SectionLabel>About</SectionLabel>
        </motion.div>

        {/* Map */}
        <motion.div {...fadeUp} className="mb-14">
          <LocationMap />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Education */}
          <motion.div {...fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <School className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs uppercase tracking-widest text-zinc-500">Education</span>
            </div>
            <div className="space-y-5">
              {education.map((e, i) => (
                <div key={i} className="flex items-start gap-3">
                  <SchoolLogo domain={e.domain} abbr={e.abbr} bg={e.bg} />
                  <div>
                    {e.degree && <p className="text-sm text-zinc-200 font-medium leading-tight">{e.degree}</p>}
                    <p className="text-xs text-zinc-500 mt-0.5">{e.school}</p>
                    <p className="text-xs text-zinc-600">{e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Tech stack + Interests */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs uppercase tracking-widest text-zinc-500">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map(({ label, Icon, color }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg
                               border border-zinc-800 bg-zinc-900 text-zinc-300
                               hover:border-zinc-600 transition-colors duration-200"
                  >
                    <Icon style={{ color }} className="w-3.5 h-3.5 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Interests</p>
              <div className="grid grid-cols-2 gap-2">
                {interests.map(({ emoji, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="text-base leading-none">{emoji}</span>
                    <span>{text}</span>
                  </div>
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
    <section id="projects" className="border-t border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <SectionLabel>Projects</SectionLabel>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-500
                       hover:text-violet-400 transition-colors duration-200 mb-10"
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
    <section id="instagram" className="border-t border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <SectionLabel>Instagram</SectionLabel>
          <a
            href={`https://www.instagram.com/${INSTAGRAM_USERNAME}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-500
                       hover:text-violet-400 transition-colors duration-200 mb-10"
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
              initial="hidden" animate="show"
            >
              {posts.map(post => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank" rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                >
                  <img
                    src={post.media_url} alt={post.caption || ''}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
                                  transition-colors duration-300 flex items-end p-3
                                  opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-1.5 text-white text-xs">
                      <Heart className="w-3.5 h-3.5" />
                      <span>View on Instagram</span>
                    </div>
                  </div>
                </motion.a>
              ))}
              {loading && posts.length === 0 &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-zinc-900 animate-pulse" />
                ))
              }
            </motion.div>
            <div ref={observerTarget} className="py-10 flex justify-center">
              {loading && posts.length > 0 && <span className="text-xs text-zinc-600 animate-pulse">Loading…</span>}
              {!hasNextPage && posts.length > 0 && <span className="text-xs text-zinc-700">— End —</span>}
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
    <footer className="border-t border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-8 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-600">Luhang Fang</span>
        <span className="text-xs text-zinc-700">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function SinglePage() {
  const [bgPhotos, setBgPhotos] = useState([]);

  useEffect(() => {
    fetch(`${INSTAGRAM_API_URL}?limit=12`)
      .then(r => r.json())
      .then(data => { if (data.success && data.data.length > 0) setBgPhotos(data.data.slice(0, 9)); })
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero bgPhotos={bgPhotos} />
      <About />
      <Projects />
      <InstagramSection />
      <Footer />
    </>
  );
}
