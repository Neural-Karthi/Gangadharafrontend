
import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const testimonials = [
    { id: 1, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop&q=80", alt: "Feedback Screenshot 1" },
    { id: 2, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop&q=80", alt: "Feedback Screenshot 2" },
    { id: 3, src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=225&fit=crop&q=80", alt: "Feedback Screenshot 3" },
  ];

  return (
    <section ref={ref} id="testimonials" className="bg-background section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="Don't Just Take Our Word For It..."
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4"
          />
          <AnimatedText
            tag="p"
            text="See what our students are saying about their transformation."
            animationType="fade-in-up"
            delay={isVisible ? 400 : 0}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className={`observe-anim slide-in-up ${isVisible ? 'is-visible' : ''} overflow-hidden rounded-lg shadow-xl hover:shadow-primary/30 transition-shadow duration-300`} style={{transitionDelay: `${index * 200 + (isVisible ? 400 : 0)}ms`}}>
              <CardContent className="p-0">
                <img src={testimonial.src} alt={testimonial.alt} className="w-full h-auto object-cover aspect-video" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
