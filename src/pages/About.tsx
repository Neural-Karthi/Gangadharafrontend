import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import SEO from '@/components/SEO';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      <SEO 
        title="About Gangadhar Nagarjuna - Business Coach & Entrepreneurship Expert"
        description="Meet Gangadhar Nagarjuna, India's leading business coach. Learn about his journey, expertise in startup strategies, and how he's helped 400,000+ entrepreneurs succeed."
        keywords="Gangadhar Nagarjuna, business coach, entrepreneurship expert, startup mentor, business trainer, India business coach"
        type="website"
        url="https://gangadharnagarjuna.in/about"
      />
      <Header />
      <main className="pt-20 bg-background text-foreground">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          </div>
          
          <div ref={ref} className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedText
                tag="h1"
                text="About Gangadhar Nagarjuna"
                animationType="fade-in-up"
                delay={isVisible ? 100 : 0}
                className="text-4xl md:text-5xl font-extrabold text-gradient-theme mb-6"
              />
              <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
            </div>

            <div className={`space-y-8 text-lg text-foreground/90 observe-anim ${isVisible ? 'is-visible slide-in-up' : ''}`}>
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl border-l-4 border-primary">
                <p className="mb-6">
                  I'm Gangadhar Nagarjuna, a Startup Coach, Passive Income Coach, Entrepreneurship Mentor, and Digital Growth Expert, driven by a deep passion for helping aspiring entrepreneurs succeed in today's fast-paced digital world.
                </p>
                <p>
                  With a strong background in startup mentorship and digital business development, I specialize in guiding individuals through the process of launching and scaling their own ventures. My goal is to help you build a strong foundation for long-term success—whether you're just starting out or looking to grow an existing business.
                </p>
              </div>

              <div className="bg-gradient-to-l from-primary/10 to-transparent p-6 rounded-xl border-r-4 border-primary mt-12">
                <p>
                  I believe that anyone can turn their ideas into impactful brands and sustainable income streams with the right tools, mindset, and support.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <p>
                  Through my high-impact online webinars and hands-on training programs, I provide clear, step-by-step strategies to help you start your business with confidence. I integrate the latest AI-powered tools and digital growth techniques to simplify complex processes and make entrepreneurship accessible to everyone.
                </p>
                <p className="font-semibold text-primary/90">
                  My mission is to empower dreamers, creators, and innovators to take control of their financial future by creating scalable, automated income sources and building powerful digital brands.
                </p>
                <p className="text-xl font-medium mt-8 text-center">
                  Together, we'll transform your vision into a thriving, purpose-driven business.
                </p>
              </div>
            </div>

            <div className={`mt-16 text-center observe-anim ${isVisible ? 'is-visible slide-in-up animate-delay-200' : ''}`}>
              <div className="inline-block bg-primary/10 px-6 py-3 rounded-full">
                <span className="text-primary font-semibold text-lg">Let's Build Something Extraordinary</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
