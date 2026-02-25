import { useState } from 'react'

// 生成随机星星
const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3
  }))
}

// 生成流星
const generateShootingStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 50,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 15
  }))
}

function GalaxyBackground({ starCount = 150, showShootingStars = true }) {
  const [stars] = useState(() => generateStars(starCount))
  const [shootingStars] = useState(() => generateShootingStars(showShootingStars ? 3 : 0))

  return (
    <>
      {/* 银河背景 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 深空渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>
        
        {/* 银河星云效果 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,80,200,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(200,100,180,0.1)_0%,_transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(80,100,220,0.12)_0%,_transparent_45%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_60%,_rgba(147,51,234,0.08)_0%,_transparent_50%)]"></div>
        
        {/* 星星 */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: star.size > 2 ? '0 0 6px 2px rgba(255,255,255,0.3)' : 'none'
            }}
          />
        ))}
        
        {/* 流星 */}
        {shootingStars.map((star) => (
          <div
            key={`shooting-${star.id}`}
            className="absolute animate-shooting-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              animationIterationCount: 'infinite'
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8),-20px_0_15px_3px_rgba(255,255,255,0.4),-40px_0_20px_2px_rgba(255,255,255,0.2),-60px_0_25px_1px_rgba(255,255,255,0.1)]"></div>
          </div>
        ))}
        
        {/* 银河带 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-0 right-0 h-64 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent transform -rotate-12 blur-3xl"></div>
        </div>
      </div>

      {/* CSS 动画 */}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes shooting-star {
          0% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(300px) translateY(300px);
          }
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        .animate-shooting-star {
          animation: shooting-star linear infinite;
        }
      `}</style>
    </>
  )
}

export default GalaxyBackground
