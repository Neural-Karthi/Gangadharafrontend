
import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';
import { Card, CardContent } from '@/components/ui/card';

const PromiseNoteSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} id="promise-note" className="bg-background text-foreground section-padding"> {/* Changed bg for consistency */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-4xl mx-auto observe-anim scale-in ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="A Personal Promise to You"
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl font-extrabold text-gradient-theme mb-8" /* Changed to gradient for consistency */
          />
          <Card className="bg-muted backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl border-border text-left"> {/* Changed to bg-muted for better contrast */}
            <CardContent className="p-0">
              <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed">
                "To the ambitious entrepreneur reading this,
                <br /><br />
                I know the path you're on. The late nights, the tough decisions, the dream of building something that lasts. I've been there. That's why I created this workshop—not just to share theories, but to give you the exact, actionable steps that took me from struggling to successful.
                <br /><br />
                My promise is simple: If you come with an open mind and a will to act, I will provide you with the framework to not just grow, but to transform your business. This isn't just another course; it's the start of your breakthrough."
              </p>
              <div className="mt-8">
                <p className="font-heading text-3xl text-primary tracking-wider italic">Gangadhar Nagarjuna</p> {/* Styled signature */}
                <p className="text-md text-foreground/70">CEO & Founder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PromiseNoteSection;
