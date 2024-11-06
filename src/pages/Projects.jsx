import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Code, Cpu } from 'lucide-react';
import GitHubProjects from '../components/projects/GithubProjects';
import { GITHUB_USERNAME } from '../config/api';

export default function Projects({ className }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  // 示例特色项目数据
  const featuredProjects = [
    {
      title: "AI Chat Application",
      description: "A real-time chat application powered by AI for natural language processing and automated responses.",
      technologies: ["React", "Node.js", "OpenAI API"],
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      title: "Cloud Data Platform",
      description: "Enterprise-level data management platform with real-time analytics and visualization capabilities.",
      technologies: ["AWS", "Python", "React"],
      icon: <Code className="w-6 h-6" />,
    }
  ];

  return (
    <div className={`min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 页面标题 */}
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h1 className="text-black dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
              My{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Projects
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A collection of my recent work and open source contributions
            </p>
          </motion.div>

          {/* GitHub 项目部分 */}
          <motion.section 
            className="mb-12"
            {...fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6 justify-center xl:justify-start">
              <Github className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                GitHub Projects
              </h2>
            </div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              whileHover={hoverEffect}
            >
              <GitHubProjects username={GITHUB_USERNAME} />
            </motion.div>
          </motion.section>

          {/* 特色项目部分 */}
          <motion.section 
            className="mb-12"
            {...fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6 justify-center xl:justify-start">
              <Star className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  whileHover={hoverEffect}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-blue-500">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 贡献统计部分 */}
          <motion.section
            {...fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Code className="w-6 h-6" />, label: "Total Projects", value: "15+" },
              { icon: <GitFork className="w-6 h-6" />, label: "Contributions", value: "100+" },
              { icon: <Star className="w-6 h-6" />, label: "GitHub Stars", value: "50+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
                whileHover={hoverEffect}
              >
                <div className="flex justify-center text-blue-500 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}