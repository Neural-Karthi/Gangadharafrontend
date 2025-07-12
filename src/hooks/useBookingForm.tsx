import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import apiClient from '@/integrations/mongodb/client';
import type { BookingFormValues } from '@/lib/validators/bookingFormValidator';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useBookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = async (values: BookingFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading('Initializing payment...');

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Could not load payment gateway. Please try again.');
      }

      const courseId = searchParams.get('course') || 'live-workshops';
      const selectedCourse = {
        price: values?.price,
        name: values?.price === 24999 ? 'Online Course' : 'Live Workshop',
      };

      const orderPayload = {
        ...values,
        course: courseId,
        priceamount: values?.price,
      };

      const response = await apiClient.post('/api/orders/create', orderPayload);
      const orderData = response.data.data;

      if (!orderData) {
        throw new Error('Failed to create order');
      }

      const { orderId, registrationId, razorpayKeyId, amount, courseName } = orderData;

      const expectedAmount = selectedCourse.price * 100;
      if (amount !== expectedAmount) {
        throw new Error(
          `Payment amount mismatch. Expected ₹${selectedCourse.price}, but got ₹${amount / 100}`
        );
      }

      toast.loading('Redirecting to payment...', { id: toastId });

      const options = {
        key: razorpayKeyId,
        amount: amount.toString(),
        currency: 'INR',
        name: 'Gangadhar Nagarjuna Academy',
        description: courseName,
        order_id: orderId,
        handler: async (response: any) => {
          toast.loading('Verifying payment...', { id: toastId });

          const verifyResponse = await apiClient.post('/payments/verify', {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            registration_id: registrationId,
            course_id: courseId,
            priceamount: values?.price,
          });

          const verificationData = verifyResponse.data.data;

          if (!verificationData?.verified) {
            navigate(`/payment-failure?registrationId=${registrationId}`);
          } else {
            const userEmail = values.email;
            localStorage.setItem(`registration_email_${registrationId}`, userEmail);
            navigate(
              `/payment-success?registrationId=${registrationId}&email=${encodeURIComponent(
                userEmail
              )}`
            );
          }

          toast.dismiss(toastId);
        },
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone_number,
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            toast.dismiss(toastId);
            toast.info('Payment was cancelled.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response: any) {
        navigate(
          `/payment-failure?registrationId=${registrationId}&error=${response.error.description}`
        );
        toast.dismiss(toastId);
      });
    } catch (error: any) {
      const errorMessage = error.message?.includes('Failed to fetch')
        ? 'A network error occurred. Please check your connection and try again.'
        : error.message || 'An unexpected error occurred. Please try again.';

      toast.error(errorMessage, { id: toastId });
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
