import { useEffect, useState } from "react";

interface SignalArrowProps {
  direction: 'up' | 'down';
  animated?: boolean;
}

export default function SignalArrow({ direction, animated = true }: SignalArrowProps) {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 1.2 : 1);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [animated]);

  const isUp = direction === 'up';
  const color = isUp ? '#00FF7F' : '#FF4500';
  const shadowColor = isUp ? 'rgba(0, 255, 127, 0.6)' : 'rgba(255, 69, 0, 0.6)';

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Main Arrow */}
        <div 
          className={`text-9xl font-bold transition-all duration-300 ${
            isUp ? 'text-green-400' : 'text-red-400'
          }`}
          style={{
            transform: `scale(${pulseIntensity})`,
            filter: `drop-shadow(0 0 20px ${shadowColor}) drop-shadow(0 0 40px ${shadowColor})`,
            textShadow: `0 0 30px ${color}, 0 0 60px ${color}`
          }}
        >
          {isUp ? '↗' : '↙'}
        </div>

        {/* Glowing Ring Around Arrow */}
        <div 
          className={`absolute inset-0 rounded-full border-4 ${
            isUp ? 'border-green-400' : 'border-red-400'
          } animate-ping opacity-30`}
          style={{
            width: '140px',
            height: '140px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Multiple Pulsing Rings */}
        <div 
          className={`absolute inset-0 rounded-full border-2 ${
            isUp ? 'border-green-400' : 'border-red-400'
          } animate-pulse opacity-50`}
          style={{
            width: '160px',
            height: '160px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div 
          className={`absolute inset-0 rounded-full border border ${
            isUp ? 'border-green-400' : 'border-red-400'
          } animate-ping opacity-20`}
          style={{
            width: '180px',
            height: '180px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '0.5s'
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isUp ? 'bg-green-400' : 'bg-red-400'
            } animate-ping opacity-60`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + (i % 2) * 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s'
            }}
          />
        ))}

        {/* Direction Indicator Text */}
        <div 
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg font-bold text-sm ${
            isUp 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          } animate-bounce`}
        >
          {isUp ? '↑ UPWARD' : '↓ DOWNWARD'}
        </div>
      </div>

      {/* Signal Strength Indicator */}
      <div className="mt-12 flex flex-col items-center">
        <div className="text-xs text-gray-400 mb-2">SIGNAL STRENGTH</div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-8 rounded ${
                i < 4 ? (isUp ? 'bg-green-400' : 'bg-red-400') : 'bg-gray-600'
              } animate-pulse`}
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${(i + 1) * 6 + 8}px`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}