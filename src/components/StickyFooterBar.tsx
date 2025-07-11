import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface StickyFooterBarProps {
  webinars: {
    Specialprice?: number;
    [key: string]: any;
  }[];
}

const StickyFooterBar: React.FC<StickyFooterBarProps> = ({ webinars }) => {
  const specialPrice = webinars[0]?.Specialprice ?? 299;
  const formattedPrice = specialPrice.toLocaleString('en-IN');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md text-foreground p-3 sm:p-4 shadow-2xl z-[100] border-t-2 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm sm:text-base font-semibold">
            Special Offer: <span className="line-through opacity-70 text-sm">₹999</span>
            <span className="text-xl sm:text-2xl font-bold text-primary ml-2">₹{formattedPrice}</span> Only!
          </p>
        </div>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold w-full sm:w-auto group text-base sm:text-lg animate-pulse-glow"
          onClick={() => document.getElementById('final-cta-button')?.click()}
        >
          Book Your Spot Now
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default StickyFooterBar;
