export default function Projects({ className }) {
  return (
    <div className={`flex items-center justify-center min-h-screen dark:bg-black ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 xl:flex-row xl:items-center">

          {/* 文字部分 */}
          <div className="text-center xl:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white">
              More is coming soon...
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}