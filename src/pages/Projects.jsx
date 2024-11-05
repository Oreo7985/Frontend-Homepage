// src/pages/Projects.jsx
import GitHubProjects from '../components/projects/GithubProjects';
import { GITHUB_USERNAME } from '../config/api';

export default function Projects({ className }) {
  return (
    <div className={`min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* 页面标题 */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My Projects
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            A collection of my recent work and open source contributions
          </p>
        </div>

        {/* GitHub 项目部分 */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center xl:text-left">
            GitHub Projects
          </h2>
          <GitHubProjects username={GITHUB_USERNAME} />
        </section>

        {/* 可以添加其他项目部分 */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center xl:text-left">
            Featured Projects
          </h2>
          {/* 添加其他项目展示组件 */}
        </section>
      </div>
    </div>
  );
}