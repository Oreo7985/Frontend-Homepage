import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Code, Brain, MapPin, School, Bookmark, Dumbbell, Luggage, Feather, Music, Palette } from 'lucide-react';

export default function About({ className }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  const techStack = [
    "React", "Node.js", "TypeScript", "Python",
    "PostgreSQL", "Docker", "AWS", "Machine Learning",
    "REST API", "Git",
  ];

  return (
    <div className={`min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <motion.div
          className="flex flex-col gap-8 sm:gap-10 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            whileHover={hoverEffect}
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Background</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Originally from Qiandaohu, Hangzhou, China<br />
              Currently studying and working in Berlin, Germany
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            whileHover={hoverEffect}
          >
            <div className="flex items-center gap-3 mb-4">
              <School className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Education</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  degree: "Master of Science in Computer Science",
                  school: "Humboldt University of Berlin, Germany",
                  period: "2023 – present"
                },
                {
                  degree: "Bachelor of Science in Applied Computer Science",
                  school: "Hochschule Hannover, Germany",
                  period: "2019 – 2023"
                },
                {
                  school: "Zhejiang University of Science and Technology, China",
                  period: "2017 – 2019"
                }
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-4 border-blue-500 pl-4"
                >
                  {edu.degree && (
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{edu.degree}</h3>
                  )}
                  <p className="text-gray-600 dark:text-gray-300">{edu.school}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            whileHover={hoverEffect}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30
                             text-blue-600 dark:text-blue-300
                             rounded-full text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            whileHover={hoverEffect}
          >
            <div className="flex items-center gap-3 mb-4">
              <Bookmark className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Interests</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Code className="w-5 h-5" />, text: "Web Development" },
                { icon: <Brain className="w-5 h-5" />, text: "Machine Learning" },
                { icon: <Camera className="w-5 h-5" />, text: "Photography" },
                { icon: <Luggage className="w-5 h-5" />, text: "Traveling" },
                { icon: <Dumbbell className="w-5 h-5" />, text: "Fitness" },
                { icon: <Feather className="w-5 h-5" />, text: "Badminton" },
                { icon: <Music className="w-5 h-5" />, text: "Music" },
                { icon: <Palette className="w-5 h-5" />, text: "Design" },
              ].map((interest, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {interest.icon}
                  <span>{interest.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
