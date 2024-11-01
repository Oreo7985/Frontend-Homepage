export default function Home({ className }) {
  return (
    <div className={`h-full dark:bg-black ${className}`}>
      <div className="flex items-center justify-center h-full px-4">
        <div className="max-w-4xl space-y-12">
          <div className="flex flex-col items-center md:flex-row md:gap-8 md:justify-center">
            {/* 头像气泡容器 */}
            <div className="relative w-64 h-64">
              <svg 
                viewBox="0 0 400 400"
                className="absolute w-full h-full"
              >
                <defs>
                  <clipPath id="blob">
                    <path
                      fill="#60A5FA"
                      d="M40.7,-49.1C54.9,-43.6,69.8,-34.1,75.7,-20.4C81.5,-6.7,78.3,11.1,70.8,26.1C63.2,41.1,51.3,53.2,37.3,58.9C23.2,64.6,7,63.9,-8.9,61.1C-24.8,58.3,-40.3,53.3,-51.8,43C-63.2,32.7,-70.5,17.1,-71.8,0.8C-73,-15.6,-68.2,-31.9,-57.6,-38.1C-47,-44.3,-30.6,-40.4,-17.4,-46.4C-4.3,-52.4,5.7,-68.3,17.8,-70.6C29.9,-72.8,44.1,-61.5,40.7,-49.1Z" 
                      transform="translate(200 200) scale(3.5)"
                    >
                      <animate
                        attributeName="d"
                        dur="10s"
                        repeatCount="indefinite"
                        values="
                          M40.7,-49.1C54.9,-43.6,69.8,-34.1,75.7,-20.4C81.5,-6.7,78.3,11.1,70.8,26.1C63.2,41.1,51.3,53.2,37.3,58.9C23.2,64.6,7,63.9,-8.9,61.1C-24.8,58.3,-40.3,53.3,-51.8,43C-63.2,32.7,-70.5,17.1,-71.8,0.8C-73,-15.6,-68.2,-31.9,-57.6,-38.1C-47,-44.3,-30.6,-40.4,-17.4,-46.4C-4.3,-52.4,5.7,-68.3,17.8,-70.6C29.9,-72.8,44.1,-61.5,40.7,-49.1Z;
                          
                          M47.8,-57.2C62.3,-46.9,75,-32.1,79.7,-14.5C84.4,3.1,81.1,23.5,70.8,38.6C60.5,53.8,43.2,63.7,24.9,67.7C6.6,71.7,-12.7,69.8,-30.9,63.2C-49.2,56.6,-66.3,45.3,-74.3,28.9C-82.2,12.4,-80.9,-9.2,-72.5,-26.4C-64.2,-43.6,-48.8,-56.4,-32.8,-65.8C-16.7,-75.2,0,-81.2,13.5,-76.5C27,-71.8,37.3,-56.4,47.8,-57.2Z;
                          
                          M43.3,-57.1C57.9,-46.3,72.8,-35.6,78.1,-21.1C83.3,-6.6,78.9,11.7,70.8,27.2C62.7,42.7,50.9,55.5,36.4,63.1C21.8,70.7,4.5,73.1,-11.9,70.2C-28.3,67.4,-43.8,59.2,-54.8,46.8C-65.7,34.3,-72,17.7,-73.7,-0.1C-75.3,-17.8,-72.2,-36.9,-61.6,-48.2C-50.9,-59.5,-32.7,-63,-16.3,-64.3C0.1,-65.5,14.7,-64.5,28.7,-75.3C42.8,-86.2,56.2,-108.9,43.3,-57.1Z;
                          
                          M40.7,-49.1C54.9,-43.6,69.8,-34.1,75.7,-20.4C81.5,-6.7,78.3,11.1,70.8,26.1C63.2,41.1,51.3,53.2,37.3,58.9C23.2,64.6,7,63.9,-8.9,61.1C-24.8,58.3,-40.3,53.3,-51.8,43C-63.2,32.7,-70.5,17.1,-71.8,0.8C-73,-15.6,-68.2,-31.9,-57.6,-38.1C-47,-44.3,-30.6,-40.4,-17.4,-46.4C-4.3,-52.4,5.7,-68.3,17.8,-70.6C29.9,-72.8,44.1,-61.5,40.7,-49.1Z"
                      />
                    </path>
                  </clipPath>
                </defs>
                
                {/* 头像 */}
                <foreignObject 
                  width="400" 
                  height="400" 
                  clipPath="url(#blob)"
                >
                  <div className="w-full h-full">
                    <img 
                      src="/selfie.jpg"
                      alt="Luhang Fang"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* 文字部分 */}
            <div className="mt-6 md:mt-0">
              <h1 className="text-5xl font-bold text-center md:text-left text-gray-900 dark:text-white">
                Hi, I'm Luhang Fang
              </h1>
              <p className="mt-4 text-xl text-center md:text-left text-gray-600 dark:text-gray-300">
                A full-stack developer building modern web applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}