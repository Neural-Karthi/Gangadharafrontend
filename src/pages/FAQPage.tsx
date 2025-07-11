
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How will I get the link to attend the program?",
    answer: "You will receive an email with the program link and all necessary details 24 hours before the session begins. Please check your spam/junk folder if you don't see it.",
  },
  {
    question: "How will I get the bonus items?",
    answer: "Bonus items will be accessible through our exclusive member portal after you attend the workshop. Details on accessing the portal will be shared during the session.",
  },
  {
    question: "Why does this program cost only ₹99?",
    answer: "This is a special introductory price for our foundational workshop. We believe in making high-quality business education accessible, and this offer allows more entrepreneurs to benefit from Gangadhar's expertise.",
  },
  {
    question: "Is this workshop suitable for beginners?",
    answer: "Absolutely! This workshop is designed for both aspiring and early-stage entrepreneurs. We cover foundational concepts in a clear and actionable way.",
  },
  {
    question: "What if I miss the live session?",
    answer: "We encourage live participation for the best experience and interaction. However, a recording may be made available for a limited time to registered attendees. Please check your confirmation email for details.",
  },
];

const FAQPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" />
            Back
          </Button>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
              Frequently Asked Questions
            </h1>
          </div>
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
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
