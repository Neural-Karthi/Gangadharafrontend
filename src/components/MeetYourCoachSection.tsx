import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';
import { Linkedin, Facebook } from 'lucide-react'; 

const MeetYourCoachSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const coachImage = '/lovable-uploads/d9f7fe37-ebfc-471b-a2b9-8268a2ffd8b4.png';
  
  const glimpseImages = [
    { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Live Session 1" },
    { src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Live Session 2" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Live Session 3" },
    { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Live Session 4" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Live Session 5" },
  ];

  return (
    <section ref={ref} id="meet-your-coach" className="bg-background section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Heading - Always at the top */}
        <div className={`text-center mb-12 md:mb-16 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="Meet Your Coach"
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4" 
          />
        </div>

        {/* Mobile Layout - Image below heading */}
        <div className="md:hidden">
          <div className={`observe-anim slide-in-left ${isVisible ? 'is-visible animate-delay-200' : ''} mb-8`}>
            <div className="relative mx-auto w-full max-w-xs">
              <img 
                src={coachImage} 
                alt="Gangadhar Nagarjuna"
                className="w-full drop-shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>
          
          {/* Coach Details */}
          <div className={`text-center observe-anim slide-in-right ${isVisible ? 'is-visible animate-delay-400' : ''}`}>
            <h3 className="text-3xl font-bold text-gradient-theme mb-6">Gangadhar Nagarjuna</h3>
            <p className="text-lg text-foreground/80 mb-6">
              Hi, I'm Gangadhar Nagarjuna, a Startup Coach, Passive Income Coach, Entrepreneurship Mentor, and Digital Growth Expert. I'm passionate about helping aspiring entrepreneurs build their brand and successfully launch their startups in today's fast-evolving digital world.
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              Through my powerful online webinars and practical step-by-step training, I guide individuals like you to start your own business and build consistent, scalable income streams using modern AI tools to help dreamers, creators, and entrepreneurs turn ideas into income and build their own sustainable brands.
            </p>

            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary transition-colors"><Linkedin size={28} /></a>
              <a href="#" aria-label="Facebook" className="text-foreground/70 hover:text-primary transition-colors"><Facebook size={28} /></a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Image on left, content on right */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Coach Image on the left */}
          <div className={`observe-anim slide-in-left ${isVisible ? 'is-visible animate-delay-200' : ''}`}>
            <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
              <img 
                src={coachImage} 
                alt="Gangadhar Nagarjuna"
                className="w-full drop-shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>
          
          {/* Coach Details on the right */}
          <div className={`text-center md:text-left observe-anim slide-in-right ${isVisible ? 'is-visible animate-delay-400' : ''}`}>
            <h3 className="text-3xl font-bold text-gradient-theme mb-6">Gangadhar Nagarjuna</h3>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto md:mx-0">
              Hi, I'm Gangadhar Nagarjuna, a Startup Coach, Passive Income Coach, Entrepreneurship Mentor, and Digital Growth Expert. I'm passionate about helping aspiring entrepreneurs build their brand and successfully launch their startups in today's fast-evolving digital world.
            </p>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0">
              Through my powerful online webinars and practical step-by-step training, I guide individuals like you to start your own business and build consistent, scalable income streams using modern AI tools to help dreamers, creators, and entrepreneurs turn ideas into income and build their own sustainable brands.
            </p>

            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary transition-colors"><Linkedin size={28} /></a>
              <a href="#" aria-label="Facebook" className="text-foreground/70 hover:text-primary transition-colors"><Facebook size={28} /></a>
            </div>
          </div>
        </div>
        
        {/* Glimpses from Live Sessions - Common for both mobile and desktop */}
        <div className={`mt-12 md:mt-16 text-center observe-anim slide-in-up ${isVisible ? 'is-visible animate-delay-600' : ''}`}>
          <h4 className="text-xl font-semibold text-primary mb-6">Glimpses from Live Sessions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {glimpseImages.map((image, index) => (
              <img 
                key={index}
                src={image.src} 
                alt={image.alt} 
                className="rounded-lg shadow-md w-full h-full object-cover aspect-video" 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetYourCoachSection;