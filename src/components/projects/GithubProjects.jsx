import { useState, useEffect } from 'react';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import { getGitHubReposUrl } from '../../config/api';

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
};

export default function GitHubProjects({ username }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getGitHubReposUrl(username))
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(data => setProjects(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900 animate-pulse border border-zinc-200 dark:border-zinc-800" />
      ))}
    </div>
  );

  if (error) return (
    <p className="text-sm text-zinc-500">Could not load repositories — {error}</p>
  );

  if (!projects.length) return (
    <p className="text-sm text-zinc-500">No repositories found.</p>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(repo => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between p-5 rounded-xl
                     border border-zinc-200 dark:border-zinc-800
                     bg-white dark:bg-zinc-900
                     hover:border-zinc-400 dark:hover:border-zinc-600
                     transition-all duration-200"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate pr-2">
                {repo.name}
              </h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 line-clamp-2 leading-relaxed">
              {repo.description || 'No description'}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4">
            {repo.language && (
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: LANG_COLORS[repo.language] || '#888' }}
                />
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
