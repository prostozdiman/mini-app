import { useState, useEffect } from "react";

interface TradingState {
  userCount: number;
  currentAnalyzing: string;
  countdown: string;
  dataPoints: number;
  accuracy: number;
  todaysSignals: string;
  lastUpdate: string;
}

export function useTradingState(): TradingState {
  const [userCount, setUserCount] = useState(1247);
  const [currentAnalyzing, setCurrentAnalyzing] = useState('EUR/USD (127 users)');
  const [countdown, setCountdown] = useState('3.2');
  const [dataPoints, setDataPoints] = useState(15847);
  const [accuracy] = useState(94.7);
  const [todaysSignals] = useState('847/982 signals');
  const [lastUpdate, setLastUpdate] = useState('Just now');

  // Update user count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => {
        const change = Math.floor(Math.random() * 10) - 4;
        const newCount = prev + change;
        return Math.max(1200, Math.min(1300, newCount));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update current analyzing pair
  useEffect(() => {
    const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'];
    
    const interval = setInterval(() => {
      const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
      const randomUsers = Math.floor(Math.random() * 200) + 50;
      setCurrentAnalyzing(`${randomPair} (${randomUsers} users)`);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Update countdown
  useEffect(() => {
    let countdownValue = 3.2;
    
    const interval = setInterval(() => {
      countdownValue -= 0.1;
      if (countdownValue <= 0) {
        countdownValue = 3.2;
      }
      setCountdown(countdownValue.toFixed(1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update data points during analysis
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const change = Math.floor(Math.random() * 1000) - 500;
        return Math.max(15000, Math.min(20000, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update last update timestamp
  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLastUpdate(timeString);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    userCount,
    currentAnalyzing,
    countdown,
    dataPoints,
    accuracy,
    todaysSignals,
    lastUpdate
  };
}