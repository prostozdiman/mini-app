import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  separator?: boolean;
}

export default function AnimatedCounter({ 
  value, 
  duration = 1000, 
  separator = true 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * value);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  const formatValue = (num: number) => {
    if (separator) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return <span>{formatValue(displayValue)}</span>;
}
