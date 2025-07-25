import { useEffect, useState } from "react";

interface ChartArrowProps {
  direction: 'up' | 'down';
  animated?: boolean;
}

export default function ChartArrow({ direction, animated = true }: ChartArrowProps) {
  const [pathOffset, setPathOffset] = useState(0);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setPathOffset(prev => (prev + 2) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animated]);

  const isUp = direction === 'up';
  const color = isUp ? '#00FF7F' : '#FF4500';
  const glowColor = isUp ? 'rgba(0, 255, 127, 0.4)' : 'rgba(255, 69, 0, 0.4)';

  // Generate chart path with more realistic market movement
  const generateChartPath = () => {
    const points = [];
    const width = 120;
    const height = 80;
    const segments = 12;
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      let y;
      
      if (isUp) {
        // Upward trending chart with volatility
        const baseY = height - (i / segments) * height * 0.7;
        const volatility = Math.sin(i * 0.8) * 8 + Math.cos(i * 1.2) * 5;
        y = Math.max(10, Math.min(height - 10, baseY + volatility));
      } else {
        // Downward trending chart with volatility
        const baseY = 20 + (i / segments) * height * 0.7;
        const volatility = Math.sin(i * 0.8) * 8 + Math.cos(i * 1.2) * 5;
        y = Math.max(10, Math.min(height - 10, baseY + volatility));
      }
      
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    
    return points.join(' ');
  };

  // Arrow tip path
  const arrowPath = isUp 
    ? "M 105 15 L 120 25 L 115 30 L 105 25 L 115 30 L 120 35 L 105 45"
    : "M 105 65 L 120 55 L 115 50 L 105 55 L 115 50 L 120 45 L 105 35";

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="140" height="100" className="overflow-visible">
          <defs>
            {/* Gradient definition */}
            <linearGradient id={`gradient-${direction}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id={`glow-${direction}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Animated dash pattern */}
            <pattern id={`dash-${direction}`} patternUnits="userSpaceOnUse" width="10" height="10">
              <rect width="10" height="10" fill="none"/>
              <circle cx="5" cy="5" r="1" fill={color} opacity="0.6"/>
            </pattern>
          </defs>
          
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="120" height="80" fill="url(#grid)" opacity="0.3"/>
          
          {/* Main chart line */}
          <path
            d={generateChartPath()}
            fill="none"
            stroke={`url(#gradient-${direction})`}
            strokeWidth="3"
            filter={`url(#glow-${direction})`}
            className="transition-all duration-300"
            style={{
              strokeDasharray: animated ? "5,3" : "none",
              strokeDashoffset: animated ? -pathOffset : 0,
            }}
          />
          
          {/* Chart fill area */}
          <path
            d={`${generateChartPath()} L 120 80 L 0 80 Z`}
            fill={`url(#gradient-${direction})`}
            opacity="0.1"
          />
          
          {/* Arrow tip */}
          <path
            d={arrowPath}
            fill={color}
            stroke={color}
            strokeWidth="2"
            filter={`url(#glow-${direction})`}
            className="animate-pulse"
          />
          
          {/* Pulsing dots at key points */}
          {[30, 60, 90].map((x, index) => (
            <circle
              key={index}
              cx={x}
              cy={isUp ? 40 - index * 8 : 40 + index * 8}
              r="2"
              fill={color}
              className="animate-ping"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </svg>
        
        {/* Floating percentage indicator */}
        <div 
          className={`absolute -top-2 -right-2 px-2 py-1 rounded text-xs font-bold ${
            isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          } border ${
            isUp ? 'border-green-500/30' : 'border-red-500/30'
          } animate-bounce`}
        >
          {isUp ? '+' : '-'}{Math.floor(Math.random() * 5 + 2)}.{Math.floor(Math.random() * 9)}%
        </div>
      </div>
      
      {/* Chart label */}
      <div className="mt-2 text-xs text-gray-400 text-center">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isUp ? 'bg-green-400' : 'bg-red-400'
          } animate-pulse`} />
          <span>Live Chart Analysis</span>
        </div>
      </div>
    </div>
  );
}