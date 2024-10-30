export default function CSSExercise({className}) {
    return (
      <div className={`h-full bg-white dark:bg-black ${className}`}>
        <div className="min-h-screen flex items-center justify-center ">
            <div className="relative h-40">
                  {/* 红色弧 */}
                <div className="
                    absolute
                    w-80 h-40
                    rounded-t-full
                    bg-red-500
                "></div>

                {/* Orange弧 */}
                <div className="
                    absolute
                    w-72 h-36
                    rounded-t-full
                    bg-orange-500
                    top-4 left-4
                "></div>
    
                {/* Yellow弧 */}
                <div className="
                    absolute
                    w-64 h-32
                    rounded-t-full
                    bg-yellow-500
                    top-8 left-8
                    ">
                </div>

                {/* Green弧 */}
                <div className="
                    absolute
                    w-56 h-28
                    rounded-t-full
                    bg-green-500
                    top-12 left-12">
                </div>

                {/* Blue弧 */}
                <div className="
                    absolute
                    w-48 h-24
                    rounded-t-full
                    bg-blue-500
                    top-16 left-16">
                </div>

                {/* Indigo弧 */}
                <div className="
                    absolute
                    w-40 h-20
                    rounded-t-full
                    bg-indigo-500
                    top-20 left-20">
                </div>

                {/* Purple弧 */}
                <div className="
                    absolute
                    w-32 h-16
                    rounded-t-full
                    bg-purple-500
                    top-24 left-24">
                </div>

                {/* white弧 */}
                <div className="
                    absolute
                    w-24 h-12
                    rounded-t-full
                    bg-black
                    top-28 left-28">
                </div>
                </div>

        </div>

      </div>
    )
  }