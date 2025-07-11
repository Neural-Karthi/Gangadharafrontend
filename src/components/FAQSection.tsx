import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import AnimatedText from './AnimatedText';
import CountdownTimer from './CountdownTimer';

interface FAQSectionProps {
  webinars: {
    Specialprice?: number;
    [key: string]: any;
  }[];
}

const faqItems = [
  {
    question: "How will I get the link to attend the program?",
    answer:
      "You will receive an email with the program link and all necessary details 24 hours before the session begins. Please check your spam/junk folder if you don't see it.",
  },
  {
    question: "How will I get the bonus items?",
    answer:
      "Bonus items will be accessible through our exclusive member portal after you attend the workshop. Details on accessing the portal will be shared during the session.",
  },
  {
    question: "Why does this program cost only ₹99?",
    answer:
      "This is a special introductory price for our foundational workshop. We believe in making high-quality business education accessible, and this offer allows more entrepreneurs to benefit from Gangadhar's expertise.",
  },
  {
    question: "Is this workshop suitable for beginners?",
    answer:
      "Absolutely! This workshop is designed for both aspiring and early-stage entrepreneurs. We cover foundational concepts in a clear and actionable way.",
  },
  {
    question: "What if I miss the live session?",
    answer:
      "We encourage live participation for the best experience and interaction. However, a recording may be made available for a limited time to registered attendees. Please check your confirmation email for details.",
  },
];

const FAQSection: React.FC<FAQSectionProps> = ({ webinars }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const workshopEndDate = new Date('2025-07-16T00:00:00');
  const specialPrice = webinars[0]?.Specialprice ?? 299;
  const formattedPrice = specialPrice.toLocaleString('en-IN');

  return (
    <section ref={ref} id="faq" className="bg-background section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            tag="h2"
            text="Frequently Asked Questions"
            animationType="fade-in-up"
            delay={isVisible ? 200 : 0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4"
          />
        </div>

        <div className={`max-w-3xl mx-auto observe-anim slide-in-up ${isVisible ? 'is-visible animate-delay-200' : ''}`}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index} className="border-b border-border/50">
                <AccordionTrigger className="py-4 text-left text-lg font-semibold text-foreground hover:text-primary transition-colors focus:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 text-base text-foreground/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className={`text-center mt-12 md:mt-16 observe-anim slide-in-up ${isVisible ? 'is-visible animate-delay-400' : ''}`}>
          <div className="mb-8">
            <p className="text-sm uppercase tracking-wider text-foreground/70 mb-2">Registration Closes In:</p>
            <CountdownTimer targetDate={workshopEndDate} />
          </div>
          <Button
            size="xl"
            className="font-bold group transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => document.getElementById('final-cta-button')?.click()}
          >
            Register Now for ₹{formattedPrice}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
