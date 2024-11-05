import React, { useState, useEffect } from 'react';
import { getGitHubReposUrl } from '../../config/api';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
          加载失败
        </h3>
        <div className="mt-2 text-sm text-red-700 dark:text-red-300">
          <p>{message}</p>
        </div>
      </div>
    </div>
  </div>
);

const GitHubProjects = ({ username }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(getGitHubReposUrl(username));
        if (!response.ok) {
          throw new Error(`GitHub API 请求失败: ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching GitHub projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!projects.length) return <p className="text-center py-10 text-gray-600 dark:text-gray-400">暂无项目</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map(project => (
        <div 
          key={project.id} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                     hover:shadow-lg dark:shadow-gray-900/30 transition-shadow duration-300"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium truncate text-gray-900 dark:text-white">
                {project.name}
              </h3>
              <a 
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 
                         transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {project.description || '暂无描述'}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {project.stargazers_count}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {project.forks_count}
                </span>
              </div>
              {project.language && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {project.language}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GitHubProjects;