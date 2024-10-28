export default function Home({ className }) {
  return (
    <div className={`h-full dark:bg-black ${className}`}>
      <div className="flex items-center justify-center h-full px-4">
        <div className="max-w-4xl space-y-8">
          {/* 主标题 */}
          <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white">
            Hi, I'm Luhang Fang
          </h1>
          
          {/* 副标题 */}
          <p className="text-xl text-center text-gray-600 dark:text-gray-300">
            A full-stack developer building modern web applications
          </p>
          
          {/* 按钮组 */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Projects
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}