
import React from 'react';
import { useTimer } from '@/contexts/TimerContext';

// This interface accepts an optional `targetDate` prop to fix a build error
// originating from a read-only file. The prop is not used in this component's logic.
interface CountdownTimerProps {
  targetDate?: unknown;
}

const CountdownTimer: React.FC<CountdownTimerProps> = () => {
  const { timeLeft, formatTime } = useTimer();

  return (
    <div className="flex space-x-2 sm:space-x-3 items-center justify-center font-mono text-gold-primary">
      <div className="text-center">
        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{formatTime(timeLeft.hours)}</span>
        <span className="block text-xs sm:text-sm uppercase">Hrs</span>
      </div>
      <div className="text-gray-400 dark:text-gray-600 text-xl sm:text-2xl md:text-3xl pb-3 sm:pb-4">:</div>
      <div className="text-center">
        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{formatTime(timeLeft.minutes)}</span>
        <span className="block text-xs sm:text-sm uppercase">Mins</span>
      </div>
      <div className="text-gray-400 dark:text-gray-600 text-xl sm:text-2xl md:text-3xl pb-3 sm:pb-4">:</div>
      <div className="text-center">
        <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{formatTime(timeLeft.seconds)}</span>
        <span className="block text-xs sm:text-sm uppercase">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
