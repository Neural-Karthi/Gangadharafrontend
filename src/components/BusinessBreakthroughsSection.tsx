
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';
import { Star } from 'lucide-react'; // Using allowed Star icon

const BusinessBreakthroughsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  const breakthroughs = [
    { title: "Refined Systems", description: "Streamline operations for maximum efficiency." },
    { title: "Right Start Strategies", description: "Lay a solid foundation for sustainable growth." },
    { title: "Increased Productivity", description: "Unlock new levels of output and effectiveness." },
    { title: "Scalable Growth Models", description: "Build frameworks that support rapid expansion." },
  ];

  return (
    <section ref={ref} id="breakthroughs" className="bg-background section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="Business Breakthroughs Awaiting You"
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4"
          />
           <AnimatedText
            tag="p"
            text="Experience transformative changes in your business."
            animationType="fade-in-up"
            delay={isVisible ? 400 : 0}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
          />
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 observe-anim slide-in-up ${isVisible ? 'is-visible animate-delay-200' : ''}`}>
          {breakthroughs.map((item, index) => (
            <Card key={index} className={`bg-card text-card-foreground p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-primary/30 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`} style={{transitionDelay: `${index * 100 + 200}ms`}}>
              <Star className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-card-foreground/70 text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessBreakthroughsSection;
