export default function Home({ className }) {
  return (
    <div className={`flex items-center justify-center min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 xl:flex-row xl:items-center">
          {/* 头像 */}
          <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 xl:w-64 xl:h-64 flex-shrink-0">
            <img 
              src="/selfie.jpg"
              alt="Luhang Fang"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* 文字部分 */}
          <div className="text-center xl:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white">
              Hi, I'm Luhang Fang
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              A full-stack developer building modern web applications
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}