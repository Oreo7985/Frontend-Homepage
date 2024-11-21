import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

export default function Home({ className }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/Oreo7985", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/luhang-fang-52a4181a6/", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "contact@luhang.dev", label: "Email" },
    { icon: <Globe className="w-5 h-5" />, href: "https://luhang.dev", label: "Website" }
  ];

  return (
    // 修改外层容器以确保完全居中
    <div className={`flex items-center justify-center min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center xl:flex-row xl:justify-center xl:items-center gap-8 sm:gap-10 md:gap-12"
        >
          {/* 头像部分 */}
          <motion.div 
            className="relative flex-shrink-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 xl:w-64 xl:h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full animate-pulse"></div>
              <motion.div 
                className="relative w-full h-full rounded-full p-2 bg-white dark:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/selfie.jpg"
                  alt="Luhang Fang"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </div>
            
            {/* 装饰元素 */}
            <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"></div>
          </motion.div>

          {/* 文字部分 - 修改对齐方式 */}
          <motion.div 
            className="flex flex-col items-center xl:items-start gap-6 flex-shrink"
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center xl:text-left w-full">
            <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4 whitespace-nowrap"
                variants={fadeInUp}
              >
                {/* TODO: 'g'  */}
                <span className="inline-block dark:text-white text-black">Hi, I'm</span>{' '}
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Luhang Fang
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300"
                variants={fadeInUp}
              >
                A full-stack developer building modern web applications
              </motion.p>
            </div>

            {/* 社交链接 */}
            <motion.div 
              className="flex gap-4 justify-center xl:justify-start w-full"
              variants={fadeInUp}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-3
                    bg-white dark:bg-gray-800 
                    rounded-xl 
                    shadow-lg
                    text-gray-600 dark:text-gray-300
                    hover:text-blue-500 dark:hover:text-blue-400
                    transition-all
                    duration-300
                  "
                  whileHover={{ y: -5, scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA 按钮 */}
            <motion.div 
              className="flex gap-4 justify-center xl:justify-start w-full"
              variants={fadeInUp}
            >
              <motion.button
                className="
                  px-6 
                  py-3 
                  bg-gradient-to-r 
                  from-blue-500 
                  to-teal-400 
                  text-white 
                  rounded-xl 
                  font-medium
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              <motion.button
                className="
                  px-6 
                  py-3 
                  border-2 
                  border-gray-300 
                  dark:border-gray-700
                  text-gray-600 
                  dark:text-gray-300
                  rounded-xl 
                  font-medium
                  hover:border-blue-500
                  hover:text-blue-500
                  dark:hover:border-blue-400
                  dark:hover:text-blue-400
                  transition-all
                  duration-300
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}