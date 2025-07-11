import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PaymentPopup } from '@/components/PaymentPopup';
import { usePaymentPopup } from '@/hooks/usePaymentPopup';

// Define the expected shape of a webinar
interface Webinar {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  Specialprice: number;
  isFeatured: boolean;
  mrp:string
}

interface FinalCTASectionProps {
  webinars: Webinar[];
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ webinars }) => {
  const { isPopupOpen, selectedCourse, openPopup, closePopup, proceedToBooking } = usePaymentPopup();
  const webinar = webinars[0];

  return (
    <>
      <section id="final-cta" className="bg-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who have already transformed their businesses with our proven strategies.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 max-w-2xl mx-auto border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-300 flex-shrink-0" />
                  <span className="text-sm md:text-base">Expert-led workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-300 flex-shrink-0" />
                  <span className="text-sm md:text-base">Proven strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-300 flex-shrink-0" />
                  <span className="text-sm md:text-base">Real-world case studies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-300 flex-shrink-0" />
                  <span className="text-sm md:text-base">Actionable templates</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-2xl md:text-3xl font-bold">
                    Special Offer: <span className="line-through opacity-70">₹{webinar?.mrp}</span>{' '}
                    <span className="text-blue-300">₹{webinar?.Specialprice || 299}</span>
                  </p>
                  <p className="text-sm opacity-80">Limited time offer - Don't miss out!</p>
                </div>
              </div>

              <Button
                id="final-cta-button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg md:text-xl px-8 py-4 group shadow-2xl"
                onClick={() => openPopup('live-workshops')}
              >
                Book My Spot Now
                <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <p className="text-sm opacity-80 mt-4">
                ⏰ <strong>Hurry!</strong> Only a few seats remaining for this batch
              </p>
            </div>
          </div>
        </div>
      </section>

      <PaymentPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onProceed={proceedToBooking}
        courseName={selectedCourse?.name || webinar?.title || 'Business Foundation Course'}
        price={webinar?.Specialprice}
      />
    </>
  );
};

export default FinalCTASection;
