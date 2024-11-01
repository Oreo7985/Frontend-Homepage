export default function Home({ className }) {
  return (
    <div className={`min-h-screen dark:bg-black ${className}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl">
          <div className="flex items-center gap-12">
            {/* 头像 */}
            <div className="w-64 h-64 flex-shrink-0">
              <img 
                src="/selfie.jpg"
                alt="Luhang Fang"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* 文字部分 */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Hi, I'm Luhang Fang
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                A full-stack developer building modern web applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}