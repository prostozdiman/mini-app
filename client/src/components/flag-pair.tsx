import { useMemo } from "react";

interface FlagPairProps {
  flags: string[];
}

const getFlagEmoji = (countryCode: string): string => {
  const flagMap: Record<string, string> = {
    'EU': '🇪🇺',
    'US': '🇺🇸',
    'GB': '🇬🇧',
    'JP': '🇯🇵',
    'AU': '🇦🇺',
    'CH': '🇨🇭'
  };
  
  return flagMap[countryCode] || '🏳️';
};

const getFlagColors = (countryCode: string) => {
  const colorMap: Record<string, { primary: string; secondary: string; accent?: string }> = {
    'EU': { primary: 'bg-blue-600', secondary: 'bg-yellow-400', accent: 'text-yellow-400' },
    'US': { primary: 'bg-red-600', secondary: 'bg-white' },
    'GB': { primary: 'bg-blue-800', secondary: 'bg-red-600', accent: 'bg-white' },
    'JP': { primary: 'bg-white', secondary: 'bg-red-600' },
    'AU': { primary: 'bg-blue-800', secondary: 'bg-white', accent: 'text-white' },
    'CH': { primary: 'bg-red-600', secondary: 'bg-white' },
    'CA': { primary: 'bg-red-600', secondary: 'bg-white' },
    'NZ': { primary: 'bg-blue-800', secondary: 'bg-white' },
    'AE': { primary: 'bg-red-600', secondary: 'bg-green-600' },
    'CN': { primary: 'bg-red-600', secondary: 'bg-yellow-400' },
    'RU': { primary: 'bg-blue-600', secondary: 'bg-red-600' },
    'KE': { primary: 'bg-black', secondary: 'bg-red-600' },
    'UA': { primary: 'bg-blue-600', secondary: 'bg-yellow-400' },
    'BD': { primary: 'bg-green-600', secondary: 'bg-red-600' },
    'EG': { primary: 'bg-red-600', secondary: 'bg-white' },
    'IN': { primary: 'bg-orange-600', secondary: 'bg-white' },
    'PH': { primary: 'bg-blue-600', secondary: 'bg-red-600' },
    'YE': { primary: 'bg-red-600', secondary: 'bg-white' },
    'ZA': { primary: 'bg-green-600', secondary: 'bg-yellow-400' },
    'MX': { primary: 'bg-green-600', secondary: 'bg-red-600' },
    'BH': { primary: 'bg-red-600', secondary: 'bg-white' },
    'HU': { primary: 'bg-red-600', secondary: 'bg-white' },
    'JO': { primary: 'bg-black', secondary: 'bg-red-600' },
    'LB': { primary: 'bg-red-600', secondary: 'bg-white' },
    'OM': { primary: 'bg-red-600', secondary: 'bg-white' },
    'QA': { primary: 'bg-purple-600', secondary: 'bg-white' },
    'SA': { primary: 'bg-green-600', secondary: 'bg-white' },
    'TN': { primary: 'bg-red-600', secondary: 'bg-white' },
    'AR': { primary: 'bg-blue-500', secondary: 'bg-white' },
    'BR': { primary: 'bg-green-600', secondary: 'bg-yellow-400' },
    'CL': { primary: 'bg-blue-600', secondary: 'bg-red-600' },
    'CO': { primary: 'bg-yellow-400', secondary: 'bg-blue-600' },
    'DZ': { primary: 'bg-green-600', secondary: 'bg-white' },
    'ID': { primary: 'bg-red-600', secondary: 'bg-white' },
    'MY': { primary: 'bg-red-600', secondary: 'bg-blue-600' },
    'PK': { primary: 'bg-green-600', secondary: 'bg-white' },
    'SG': { primary: 'bg-red-600', secondary: 'bg-white' },
    'TH': { primary: 'bg-red-600', secondary: 'bg-white' },
    'VN': { primary: 'bg-red-600', secondary: 'bg-yellow-400' }
  };
  
  return colorMap[countryCode] || { primary: 'bg-gray-600', secondary: 'bg-gray-400' };
};

export default function FlagPair({ flags }: FlagPairProps) {
  const flagElements = useMemo(() => {
    return flags.map((countryCode, index) => {
      const colors = getFlagColors(countryCode);
      
      return (
        <div
          key={countryCode}
          className={`w-8 h-6 rounded border relative overflow-hidden ${
            index === 1 ? '-ml-2' : ''
          }`}
          style={{ zIndex: flags.length - index }}
        >
          {/* EU Flag */}
          {countryCode === 'EU' && (
            <div className={`w-full h-full ${colors.primary} flex items-center justify-center`}>
              <div className={`text-xs ${colors.accent}`}>★</div>
            </div>
          )}
          
          {/* US Flag */}
          {countryCode === 'US' && (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, #B22234 20%, white 20%, white 40%, #B22234 40%, #B22234 60%, white 60%, white 80%, #B22234 80%)'
              }}
            >
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-800"></div>
            </div>
          )}
          
          {/* GB Flag */}
          {countryCode === 'GB' && (
            <div className={`w-full h-full ${colors.primary} relative`}>
              {/* Cross of St. George */}
              <div className="absolute inset-0 bg-white" style={{
                clipPath: 'polygon(45% 0%, 55% 0%, 55% 45%, 100% 45%, 100% 55%, 55% 55%, 55% 100%, 45% 100%, 45% 55%, 0% 55%, 0% 45%, 45% 45%)'
              }} />
              {/* Red cross */}
              <div className="absolute inset-0 bg-red-600" style={{
                clipPath: 'polygon(48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%, 0% 52%, 0% 48%, 48% 48%)'
              }} />
            </div>
          )}
          
          {/* JP Flag */}
          {countryCode === 'JP' && (
            <div className={`w-full h-full ${colors.primary} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-4 h-4 ${colors.secondary} rounded-full`}></div>
              </div>
            </div>
          )}
          
          {/* AU Flag */}
          {countryCode === 'AU' && (
            <div className={`w-full h-full ${colors.primary} relative`}>
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-900 border border-white"></div>
              <div className={`absolute bottom-1 right-1 text-xs ${colors.accent}`}>★</div>
            </div>
          )}
          
          {/* Default fallback - simple colored rectangle for other countries */}
          {!['EU', 'US', 'GB', 'JP', 'AU'].includes(countryCode) && (
            <div className={`w-full h-full ${colors.primary} relative`}>
              <div className={`absolute bottom-0 left-0 right-0 h-1/2 ${colors.secondary}`}></div>
            </div>
          )}
        </div>
      );
    });
  }, [flags]);

  return (
    <div className="flag-overlap">
      {flagElements}
    </div>
  );
}