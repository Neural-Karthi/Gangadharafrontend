
import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  animationType: 'fade-in-up' | 'typewriter';
  delay?: number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  typewriterSpeed?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  animationType,
  delay = 0,
  className = '',
  tag = 'p',
  typewriterSpeed = 70,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const Tag = tag;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      if (animationType === 'typewriter') {
        let i = 0;
        const interval = setInterval(() => {
          if (i < text.length) {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
          } else {
            clearInterval(interval);
          }
        }, typewriterSpeed);
        return () => clearInterval(interval);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, animationType, delay, typewriterSpeed]);

  if (animationType === 'typewriter') {
    return (
      <Tag className={`${className} ${isAnimating ? 'typewriter-text' : 'opacity-0'}`}>
        {displayedText}
      </Tag>
    );
  }

  // For fade-in-up and other CSS animation based types
  return (
    <Tag
      className={`${className} opacity-0 ${isAnimating ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
