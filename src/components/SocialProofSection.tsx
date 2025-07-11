
import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';
import { Star } from 'lucide-react';

const SocialProofSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} id="social-proof" className="bg-background section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="Trusted by Thousands, Recognized by Leaders"
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-6"
          />
          <AnimatedText
            tag="p"
            text="Join a community of over 400,000+ successful students and entrepreneurs."
            animationType="fade-in-up"
            delay={isVisible ? 400 : 0}
            className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto"
          />
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16 text-center observe-anim slide-in-up ${isVisible ? 'is-visible animate-delay-200' : ''}`}>
          <div className="p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/20 transition-shadow">
            <Star className="mx-auto h-10 w-10 text-accent fill-accent mb-3" />
            <p className="text-3xl font-bold text-accent">4.96/5</p>
            <p className="text-card-foreground/70">Average Rating</p>
          </div>
          <div className="p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/20 transition-shadow">
            <h3 className="text-4xl font-bold text-primary">400,000+</h3>
            <p className="text-card-foreground/70">Students Trained</p>
          </div>
          <div className="p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/20 transition-shadow">
            <h3 className="text-4xl font-bold text-primary">70,000+</h3>
            <p className="text-card-foreground/70">Positive Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
