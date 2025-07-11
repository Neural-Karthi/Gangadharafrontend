import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  courseName: string;
  price: number;
}

export const PaymentPopup: React.FC<PaymentPopupProps> = ({
  isOpen,
  onClose,
  onProceed,
  courseName,
  price
}) => {
 const formattedPrice = typeof price === 'number' ? price.toLocaleString('en-IN') : '0';
  const isPremium = price == 24999;
  const logoUrl = "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1750101257/o05dnsacist7jxljfilu.png";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-2xl p-0 overflow-hidden border-0">
        <VisuallyHidden>
          <DialogTitle>Payment Confirmation</DialogTitle>
          <DialogDescription>
            Confirm your payment for {courseName} at ₹{formattedPrice}
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Header Section with Logo */}
        <div className="bg-slate-700 text-white px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt="Gangadhar Nagarjuna Logo"
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <div className="text-sm opacity-90">Paying to</div>
              <div className="font-semibold">Gangadhar Nagarjuna</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 bg-gray-50">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Join the Online workshop
            </h2>
            <p className="text-sm text-gray-600">with Gangadhar Nagarjuna</p>
            <div className="flex justify-end mt-2">
              <div className="bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                Business Success
              </div>
            </div>
          </div>

          {/* Dynamic Benefits List */}
          <div className="space-y-3 mb-6">
            {isPremium ? (
              <>
                <PremiumBenefits />
                <div className="flex items-start space-x-3">
                  <CheckCircle />
                  <span className="text-sm text-gray-700">Personalized business strategy</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle />
                  <span className="text-sm text-gray-700">One-on-one mentorship sessions</span>
                </div>
              </>
            ) : (
              <>
                <StandardBenefits />
                <div className="flex items-start space-x-3">
                  <CheckCircle />
                  <span className="text-sm text-gray-700">Access to all workshop materials</span>
                </div>
              </>
            )}
          </div>

          {/* Course Name */}
          <div className="text-center mb-6">
            <h3 className="font-bold text-gray-900">{courseName}</h3>
            {isPremium && (
              <p className="text-sm text-green-600 mt-1">Premium Package</p>
            )}
          </div>

          {/* Price Display */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-green-600">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">₹{formattedPrice}</span>
          </div>

          {/* Proceed Button */}
          <Button 
            onClick={onProceed}
            className={`w-full ${isPremium ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-3 text-lg rounded-lg transition-colors`}
          >
            {isPremium ? 'Get Premium Access' : 'Start Learning'} - ₹{formattedPrice}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Reusable components for benefits
const CheckCircle = () => (
  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
    <Check className="w-3 h-3 text-white" />
  </div>
);

const StandardBenefits = () => (
  <>
    <div className="flex items-start space-x-3">
      <CheckCircle />
      <span className="text-sm text-gray-700">Unlock secrets to time & wealth in business</span>
    </div>
    <div className="flex items-start space-x-3">
      <CheckCircle />
      <span className="text-sm text-gray-700">Learn foundational activities to win in business</span>
    </div>
  </>
);

const PremiumBenefits = () => (
  <>
    <div className="flex items-start space-x-3">
      <CheckCircle />
      <span className="text-sm text-gray-700">All standard benefits plus:</span>
    </div>
    <div className="flex items-start space-x-3">
      <CheckCircle />
      <span className="text-sm text-gray-700">Advanced revenue & cashflow strategies</span>
    </div>
  </>
);
