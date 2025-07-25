import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, Shield, Radio, Lock, Zap, TrendingUp, Star, Target, Brain } from "lucide-react";
import FlagPair from "../components/flag-pair";
import AnimatedCounter from "../components/animated-counter";
import SignalStrength from "../components/signal-strength";
import SignalArrow from "../components/signal-arrow";
import { useTradingState } from "../hooks/use-trading-state";

type Screen = 'pairs' | 'timeframe' | 'analysis' | 'signal';

const CURRENCY_PAIRS = [
  // Popular pairs (shown first)
  { 
    pair: 'EUR/USD', 
    name: 'Euro / US Dollar', 
    flags: ['EU', 'US'], 
    change: '+0.24%', 
    positive: true,
    tags: ['HOT', 'OTC'],
    popular: true
  },
  { 
    pair: 'GBP/USD', 
    name: 'British Pound / US Dollar', 
    flags: ['GB', 'US'], 
    change: '-0.18%', 
    positive: false,
    tags: ['HOT', 'OTC'],
    popular: true
  },
  { 
    pair: 'USD/JPY', 
    name: 'US Dollar / Japanese Yen', 
    flags: ['US', 'JP'], 
    change: '+0.12%', 
    positive: true,
    tags: ['OTC'],
    popular: true
  },
  { 
    pair: 'AUD/USD', 
    name: 'Australian Dollar / US Dollar', 
    flags: ['AU', 'US'], 
    change: '-0.08%', 
    positive: false,
    tags: ['OTC'],
    popular: true
  },
  // Additional pairs (shown when expanded)
  { 
    pair: 'AED/CNY', 
    name: 'UAE Dirham / Chinese Yuan', 
    flags: ['AE', 'CN'], 
    change: '+0.05%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'AUD/NZD', 
    name: 'Australian Dollar / New Zealand Dollar', 
    flags: ['AU', 'NZ'], 
    change: '-0.15%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'CAD/CHF', 
    name: 'Canadian Dollar / Swiss Franc', 
    flags: ['CA', 'CH'], 
    change: '+0.18%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'CAD/JPY', 
    name: 'Canadian Dollar / Japanese Yen', 
    flags: ['CA', 'JP'], 
    change: '-0.09%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'CHF/JPY', 
    name: 'Swiss Franc / Japanese Yen', 
    flags: ['CH', 'JP'], 
    change: '+0.22%', 
    positive: true,
    tags: ['HOT', 'OTC']
  },
  { 
    pair: 'EUR/JPY', 
    name: 'Euro / Japanese Yen', 
    flags: ['EU', 'JP'], 
    change: '+0.31%', 
    positive: true,
    tags: ['HOT', 'OTC']
  },
  { 
    pair: 'EUR/RUB', 
    name: 'Euro / Russian Ruble', 
    flags: ['EU', 'RU'], 
    change: '-0.42%', 
    positive: false,
    tags: ['HOT', 'OTC']
  },
  { 
    pair: 'GBP/AUD', 
    name: 'British Pound / Australian Dollar', 
    flags: ['GB', 'AU'], 
    change: '+0.11%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'KES/USD', 
    name: 'Kenyan Shilling / US Dollar', 
    flags: ['KE', 'US'], 
    change: '-0.03%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'UAH/USD', 
    name: 'Ukrainian Hryvnia / US Dollar', 
    flags: ['UA', 'US'], 
    change: '+0.07%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'USD/BDT', 
    name: 'US Dollar / Bangladeshi Taka', 
    flags: ['US', 'BD'], 
    change: '-0.02%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'USD/CHF', 
    name: 'US Dollar / Swiss Franc', 
    flags: ['US', 'CH'], 
    change: '+0.16%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'USD/EGP', 
    name: 'US Dollar / Egyptian Pound', 
    flags: ['US', 'EG'], 
    change: '-0.08%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'USD/INR', 
    name: 'US Dollar / Indian Rupee', 
    flags: ['US', 'IN'], 
    change: '+0.04%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'USD/PHP', 
    name: 'US Dollar / Philippine Peso', 
    flags: ['US', 'PH'], 
    change: '-0.12%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'YER/USD', 
    name: 'Yemeni Rial / US Dollar', 
    flags: ['YE', 'US'], 
    change: '+0.01%', 
    positive: true,
    tags: ['OTC']
  },
  { 
    pair: 'ZAR/USD', 
    name: 'South African Rand / US Dollar', 
    flags: ['ZA', 'US'], 
    change: '-0.19%', 
    positive: false,
    tags: ['OTC']
  },
  { 
    pair: 'USD/MXN', 
    name: 'US Dollar / Mexican Peso', 
    flags: ['US', 'MX'], 
    change: '+0.13%', 
    positive: true,
    tags: ['OTC']
  }
];

const TIMEFRAMES = [
  { value: '5s', label: '5 SECONDS', description: 'Ultra-fast quantum signals', icon: Zap, color: 'cyan' },
  { value: '10s', label: '10 SECONDS', description: 'Quick market analysis', icon: TrendingUp, color: 'green' },
  { value: '15s', label: '15 SECONDS', description: 'Balanced precision signals', icon: Star, color: 'yellow' },
  { value: '30s', label: '30 SECONDS', description: 'Extended analysis window', icon: Target, color: 'red' }
];

const ANALYSIS_MESSAGES = [
  'Connecting to quantum servers...',
  'Analyzing 15,000+ data points...',
  'Scanning market volatility patterns...',
  'Neural network processing...',
  'Evaluating trend momentum...',
  'Calculating probability matrices...',
  'Signal generation complete'
];

export default function TradingSignals() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('pairs');
  const [selectedPair, setSelectedPair] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showAllPairs, setShowAllPairs] = useState(false);
  const [nextSignalTimer, setNextSignalTimer] = useState(0);
  const [signalData, setSignalData] = useState<{
    direction: 'up' | 'down';
    confidence: number;
    strength: number;
    timestamp: number;
  } | null>(null);

  const {
    userCount,
    currentAnalyzing,
    countdown,
    dataPoints,
    accuracy,
    todaysSignals,
    lastUpdate
  } = useTradingState();

  // Analysis simulation
  useEffect(() => {
    if (currentScreen === 'analysis') {
      let progress = 0;
      let messageIndex = 0;
      
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 10;
        setAnalysisProgress(Math.min(progress, 100));
        
        if (messageIndex < ANALYSIS_MESSAGES.length) {
          setCurrentMessage(messageIndex);
          messageIndex++;
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            generateSignal();
            setCurrentScreen('signal');
          }, 800);
        }
      }, 600);

      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const generateSignal = () => {
    const isUp = Math.random() > 0.4; // 60% chance for UP signal
    const confidence = 85 + Math.floor(Math.random() * 12);
    const strength = 3 + Math.floor(Math.random() * 2); // 3-4 out of 5
    
    setSignalData({
      direction: isUp ? 'up' : 'down',
      confidence,
      strength,
      timestamp: Date.now()
    });

    // Start timer for next signal based on selected timeframe
    const timeframeSeconds = parseInt(selectedTimeframe.replace('s', ''));
    setNextSignalTimer(timeframeSeconds);
    
    const timer = setInterval(() => {
      setNextSignalTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startAnalysis = () => {
    setAnalysisProgress(0);
    setCurrentMessage(0);
    setCurrentScreen('analysis');
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Bot className="text-cyan-400 w-6 h-6 animate-pulse" />
            <h1 className="text-lg font-bold glow-text">AI GPT TRADE BOT</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">LIVE AI</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-400" />
              <AnimatedCounter value={userCount} />
            </div>
          </div>
        </div>
        
        {/* Sub-header with trust indicators */}
        <div className="px-4 py-2 bg-black/10 border-t border-cyan-500/10">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" />
                <span>Neural Network: ACTIVE</span>
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                <span>Market Data: STREAMING</span>
              </div>
            </div>
            <div className="text-yellow-400 font-medium">
              94.7% Accuracy Rate
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-20">
        {/* Screen 1: Pair Selection */}
        {currentScreen === 'pairs' && (
          <div className="container mx-auto px-4 py-6 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 glow-text">POPULAR TRADING PAIRS</h2>
              <p className="text-gray-400 text-sm">Choose your trading pair for real-time AI analysis and precision signals</p>
              
              {/* Trust Indicators */}
              <div className="flex justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1 text-green-400">
                  <Shield className="w-3 h-3" />
                  <span>VERIFIED AI</span>
                </div>
                <div className="flex items-center space-x-1 text-cyan-400">
                  <Radio className="w-3 h-3" />
                  <span>REAL-TIME DATA</span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Lock className="w-3 h-3" />
                  <span>ENCRYPTED</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {/* Popular pairs always shown */}
              {CURRENCY_PAIRS.filter(pair => pair.popular).map((currency) => (
                <Card
                  key={currency.pair}
                  className={`trading-card p-4 cursor-pointer transition-all ${
                    selectedPair === currency.pair ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedPair(currency.pair)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FlagPair flags={currency.flags} />
                      <div>
                        <h3 className="font-bold text-lg">{currency.pair}</h3>
                        <p className="text-gray-400 text-sm">{currency.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {currency.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              tag === 'HOT'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-cyan-500/20 text-cyan-400'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className={`text-sm mt-1 ${
                        currency.positive ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {currency.change}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Additional pairs with slide-up animation */}
              <div className={`transition-all duration-500 overflow-hidden ${
                showAllPairs ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4 animate-slide-up">
                  {CURRENCY_PAIRS.filter(pair => !pair.popular).map((currency, index) => (
                    <Card
                      key={currency.pair}
                      className={`trading-card p-4 cursor-pointer transition-all ${
                        selectedPair === currency.pair ? 'selected' : ''
                      }`}
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        transform: showAllPairs ? 'translateY(0)' : 'translateY(20px)'
                      }}
                      onClick={() => setSelectedPair(currency.pair)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FlagPair flags={currency.flags} />
                          <div>
                            <h3 className="font-bold text-lg">{currency.pair}</h3>
                            <p className="text-gray-400 text-sm">{currency.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {currency.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  tag === 'HOT'
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-cyan-500/20 text-cyan-400'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className={`text-sm mt-1 ${
                            currency.positive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {currency.change}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Show More / Show Less Button */}
              <Card 
                className="trading-card p-4 cursor-pointer text-center border-dashed hover:border-solid"
                onClick={() => setShowAllPairs(!showAllPairs)}
              >
                <div className="flex items-center justify-center space-x-2 text-cyan-400 hover:text-cyan-300">
                  <span className="font-medium">
                    {showAllPairs ? 'Show Less' : `Show More (+${CURRENCY_PAIRS.filter(p => !p.popular).length} pairs)`}
                  </span>
                  <div className={`transition-transform duration-300 ${showAllPairs ? 'rotate-180' : ''}`}>
                    ⬇️
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 mb-4">
                Currently analyzing: <span className="text-cyan-400">{currentAnalyzing}</span>
              </p>
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 h-auto"
                disabled={!selectedPair}
                onClick={() => setCurrentScreen('timeframe')}
              >
                SELECT TIME FRAME
              </Button>
            </div>
          </div>
        )}

        {/* Screen 2: Timeframe Selection */}
        {currentScreen === 'timeframe' && (
          <div className="container mx-auto px-4 py-6 animate-slide-up">
            <div className="text-center mb-8 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0 text-cyan-400 hover:text-cyan-300"
                onClick={() => setCurrentScreen('pairs')}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h2 className="text-2xl font-bold mb-2 glow-text">SELECT TIME FRAME</h2>
              <p className="text-gray-400 text-sm">Choose analysis period for optimal signal precision</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {TIMEFRAMES.map((timeframe) => {
                const Icon = timeframe.icon;
                return (
                  <Card
                    key={timeframe.value}
                    className={`trading-card p-6 cursor-pointer text-center transition-all ${
                      selectedTimeframe === timeframe.value ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedTimeframe(timeframe.value)}
                  >
                    <div className="mb-4">
                      <Icon className={`w-8 h-8 mx-auto text-${timeframe.color}-400`} />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{timeframe.label}</h3>
                    <p className="text-gray-400 text-sm mb-4">{timeframe.description}</p>
                    <div className={`bg-${timeframe.color}-500/20 text-${timeframe.color}-400 px-3 py-1 rounded text-xs font-medium inline-block`}>
                      {timeframe.value}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-6 h-auto"
                disabled={!selectedTimeframe}
                onClick={startAnalysis}
              >
                GENERATE AI SIGNAL
              </Button>
            </div>
          </div>
        )}

        {/* Screen 3: Analysis Process */}
        {currentScreen === 'analysis' && (
          <div className="container mx-auto px-4 py-6 text-center animate-slide-up">
            <div className="mb-8 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0 text-cyan-400 hover:text-cyan-300"
                onClick={() => setCurrentScreen('timeframe')}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h2 className="text-xl font-bold mb-2">
                Analyzing: <span className="text-cyan-400">{selectedPair}</span>
              </h2>
              <p className="text-gray-400">
                Timeframe: <span className="text-white">{selectedTimeframe}</span>
              </p>
            </div>

            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-spin border-t-transparent" />
                <div className="absolute inset-2 border-4 border-green-500 rounded-full animate-spin-reverse border-b-transparent" />
                <div className="absolute inset-4 border-4 border-red-500 rounded-full animate-ping border-l-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Card className="bg-black/20 p-4">
                  <div className="progress-bar mb-2" style={{ width: `${analysisProgress}%` }} />
                  <p className="text-cyan-400 font-medium typing-cursor">
                    {ANALYSIS_MESSAGES[currentMessage]}
                  </p>
                </Card>
                
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <Card className="bg-green-500/10 border border-green-500/20 p-3">
                    <div className="text-green-400 font-bold">DATA POINTS</div>
                    <div className="text-white text-lg font-bold">
                      <AnimatedCounter value={dataPoints} />
                    </div>
                  </Card>
                  <Card className="bg-cyan-500/10 border border-cyan-500/20 p-3">
                    <div className="text-cyan-400 font-bold">ACCURACY</div>
                    <div className="text-white text-lg font-bold">{accuracy}%</div>
                  </Card>
                  <Card className="bg-yellow-500/10 border border-yellow-500/20 p-3">
                    <div className="text-yellow-400 font-bold">CONFIDENCE</div>
                    <div className="text-white text-lg font-bold">
                      {signalData?.confidence || 87}%
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screen 4: Signal Output */}
        {currentScreen === 'signal' && signalData && (
          <div className="container mx-auto px-4 py-6 text-center animate-slide-up">
            <div className="mb-6 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0 text-cyan-400 hover:text-cyan-300"
                onClick={() => setCurrentScreen('timeframe')}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h2 className="text-xl font-bold mb-2">
                Signal for: <span className="text-cyan-400">{selectedPair}</span>
              </h2>
              <p className="text-gray-400">
                Timeframe: <span className="text-white">{selectedTimeframe}</span>
              </p>
            </div>

            <div className="mb-8">
              <div className="mb-6">
                {/* Beautiful Signal Arrow */}
                <div className="flex justify-center mb-6">
                  <SignalArrow direction={signalData.direction} animated={true} />
                </div>
                
                <h3 className={`text-3xl font-bold mb-2 ${
                  signalData.direction === 'up' 
                    ? 'text-green-400 glow-green' 
                    : 'text-red-400 glow-red'
                }`}>
                  {signalData.direction === 'up' ? 'BUY (LONG)' : 'SELL (SHORT)'}
                </h3>
                <p className="text-gray-300">
                  {signalData.direction === 'up' 
                    ? 'AI Forecast: Strong upward momentum confirmed'
                    : 'AI Forecast: Downward movement expected'
                  }
                </p>
              </div>

              <Card className="bg-black/30 p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Signal Strength</div>
                    <SignalStrength strength={signalData.strength} />
                  </div>
                  <div>
                    <div className="text-gray-400">Confidence</div>
                    <div className={`font-bold text-xl ${
                      signalData.direction === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {signalData.confidence}%
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-4 mb-6">
                <div className="text-sm text-green-400 mb-2">Today's Performance</div>
                <div className="text-white font-bold">{todaysSignals} (86.2% accuracy)</div>
              </Card>
            </div>

            <div className="space-y-4">
              <Button
                className={`w-full font-bold py-4 px-6 h-auto transition-all ${
                  nextSignalTimer > 0 
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white'
                }`}
                disabled={nextSignalTimer > 0}
                onClick={startAnalysis}
              >
                {nextSignalTimer > 0 ? `NEXT SIGNAL IN ${nextSignalTimer}s` : 'GET NEW SIGNAL'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3"
                onClick={() => setCurrentScreen('pairs')}
              >
                Change Trading Pair
              </Button>
              
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4 text-xs mb-2">
                  <div className="bg-black/20 p-2 rounded">
                    <div className="text-gray-400">Selected Timeframe</div>
                    <div className="text-cyan-400 font-bold">{selectedTimeframe}</div>
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <div className="text-gray-400">Signal Age</div>
                    <div className="text-green-400 font-bold">
                      {signalData ? `${Math.floor((Date.now() - signalData.timestamp) / 1000)}s` : '0s'}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Last update: <span className="text-white">{lastUpdate}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-cyan-500/20 p-3 text-center">
        <div className="flex justify-between items-center text-xs mb-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-green-400">
              <Shield className="w-3 h-3" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-400">
              <Lock className="w-3 h-3" />
              <span>Encrypted</span>
            </div>
          </div>
          <div className="text-yellow-400 font-medium">
            Version 2.4.7
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Powered by AI GPT TRADE BOT • Advanced Neural Network Technology
        </p>
      </footer>
    </div>
  );
}
