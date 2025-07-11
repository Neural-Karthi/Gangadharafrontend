
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react'; // Using allowed Star icon
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';

interface UnlockCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const UnlockCard: React.FC<UnlockCardProps> = ({ icon: Icon, title, description, delay, isVisible }) => {
  return (
    <Card
      className={`p-2 rounded-xl shadow-2xl transition-all duration-500 ease-out hover:shadow-[0_20px_50px_-10px_rgba(var(--primary),0.3)] hover:-translate-y-2 hover:border-primary border-2 border-transparent
        observe-anim slide-in-up bg-card text-card-foreground ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardHeader className="items-center text-center">
        <div className="bg-gradient-theme text-primary-foreground p-3 rounded-full inline-block mb-4 shadow-md">
          <Icon size={28} strokeWidth={2} />
        </div>
        <CardTitle className="text-xl font-bold text-primary mb-0">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-card-foreground/80 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

const WhatYouUnlockSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const unlockItems = [
    {
      icon: Star,
      title: "Optimize Time & Accelerate Wealth Creation",
      description: "Learn effective time management and wealth-building strategies that empower you to work smarter, maximize productivity, and achieve sustainable financial growth.",
    },
    {
      icon: Star,
      title: "Build Strong, Lasting Business Foundations",
      description: "Develop critical, high-impact business practices that establish a solid foundation for long-term stability, resilience, and scalable success.",
    },
    {
      icon: Star,
      title: "Increase Revenue & Enhance Cash Flow",
      description: "Implement proven, practical techniques to drive revenue growth, improve cash flow consistency, and strengthen your financial position.",
    },
    {
      icon: Star,
      title: "Proven Growth Framework",
      description: "Experience more profit, greater freedom, and scalable expansion — confidently backed by a structured, results-driven approach that delivers success when applied diligently.",
    },
  ];

  return (
    <section ref={ref} id="what-you-unlock" className="bg-background section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="What You’ll Gain in Just 2 Hours"
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4"
          />
          <AnimatedText
            tag="p"
            text="Transform your business strategy with actionable, results-oriented insights designed to drive measurable success."
            animationType="fade-in-up"
            delay={isVisible ? 400 : 0}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {unlockItems.map((item, index) => (
            <UnlockCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={index * 150 + (isVisible ? 200 : 0)}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouUnlockSection;
