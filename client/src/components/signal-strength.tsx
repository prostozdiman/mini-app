interface SignalStrengthProps {
  strength: number; // 1-5
  maxStrength?: number;
}

export default function SignalStrength({ 
  strength, 
  maxStrength = 5 
}: SignalStrengthProps) {
  return (
    <div className="flex items-center space-x-1 mt-1">
      <div className="flex space-x-1">
        {Array.from({ length: maxStrength }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded ${
              index < strength 
                ? 'bg-green-400' 
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <span className="text-green-400 font-bold ml-2">
        {strength}/{maxStrength}
      </span>
    </div>
  );
}