import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import GitHubProjects from '../components/projects/GithubProjects';
import { GITHUB_USERNAME } from '../config/api';

export default function Projects({ className }) {
  return (
    <div className={`min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-black dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
              My{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Projects
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Open source work and personal experiments
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                GitHub
              </h2>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline ml-auto"
              >
                View all →
              </a>
            </div>
            <GitHubProjects username={GITHUB_USERNAME} />
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
