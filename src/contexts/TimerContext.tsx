
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const DURATION_IN_HOURS = 2;
const DURATION_IN_SECONDS = DURATION_IN_HOURS * 60 * 60;

interface TimerContextType {
  remainingSeconds: number;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  formatTime: (value: number) => string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    // Try to get saved timer state from localStorage
    const saved = localStorage.getItem('timerState');
    if (saved) {
      const { startTime, duration } = JSON.parse(saved);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      return remaining > 0 ? remaining : DURATION_IN_SECONDS;
    }
    
    // First time - save start time
    const startTime = Date.now();
    localStorage.setItem('timerState', JSON.stringify({
      startTime,
      duration: DURATION_IN_SECONDS
    }));
    return DURATION_IN_SECONDS;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }
        // Reset timer when it reaches 0
        const startTime = Date.now();
        localStorage.setItem('timerState', JSON.stringify({
          startTime,
          duration: DURATION_IN_SECONDS
        }));
        return DURATION_IN_SECONDS;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeLeft = {
    hours: Math.floor(remainingSeconds / 3600),
    minutes: Math.floor((remainingSeconds % 3600) / 60),
    seconds: Math.floor(remainingSeconds % 60),
  };

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <TimerContext.Provider value={{ remainingSeconds, timeLeft, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
