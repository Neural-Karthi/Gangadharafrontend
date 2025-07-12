import { useState ,useEffect} from 'react';
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
            console.log("Attempting to load Razorpay script...");
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Could not load payment gateway. Please try again.');
            }
            console.log("Razorpay script loaded successfully.");

            const courseId = searchParams.get('course') || 'live-workshops';
            const selectedCourse = { price: values?.price, name: values?.price == 24999 ? "Online Course":"Live WorkShop "};
            
            // Send the correct course parameter to the backend
            const orderPayload = { 
                ...values, 
                course: courseId,
                priceamount:values?.price
            };
            
            const response = await apiClient.post('/orders/create', orderPayload);
            const orderData = response.data.data;
            
            console.log("Create order API response:", orderData);
            
            if (!orderData) {
                throw new Error('Failed to create order');
            }
            
            const { orderId, registrationId, razorpayKeyId, amount, courseName } = orderData;
            console.log("Order created successfully:", { orderId, registrationId, amount, courseName });
            
            

            // Verify that the amount matches the expected course price
            const expectedAmount = selectedCourse.price * 100; // Razorpay expects amount in paisa
            if (amount !== expectedAmount) {
                console.error("Amount mismatch:", { expected: expectedAmount, received: amount });
                throw new Error(`Payment amount mismatch. Expected ₹${selectedCourse.price}, but got ₹${amount / 100}`);
            }
            
            toast.loading('Redirecting to payment...', { id: toastId });

            // Check if we're in demo mode (invalid Razorpay key)
            if (razorpayKeyId === 'rzp_test_demo' || razorpayKeyId.includes('demo')) {
                // Demo mode - skip Razorpay and show success
                toast.success('Demo Mode: Payment would be processed here', { id: toastId });
                setTimeout(() => {
                    // Store email in localStorage and pass it in URL for the success page
                    const userEmail = values.email;
                    localStorage.setItem(`registration_email_${registrationId}`, userEmail);
                    navigate(`/payment-success?registrationId=${registrationId}&email=${encodeURIComponent(userEmail)}`);
                }, 2000);
                return;
            }

            const options = {
                key: razorpayKeyId,
                amount: amount.toString(),
                currency: 'INR',
                name: 'Gangadhar Nagarjuna Academy',
                description: courseName,
                order_id: orderId,
                handler: async (response: any) => {
                    toast.loading('Verifying payment...', { id: toastId });
                    console.log("Razorpay payment successful, invoking verify-payment API...");
                    
                    const verifyResponse = await apiClient.post('/payments/verify', {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        registration_id: registrationId,
                        course_id: courseId,
                        priceamount:values?.price
                    });
                    
                    const verificationData = verifyResponse.data.data;

                    if (!verificationData?.verified) {
                        console.error("Payment verification failed:", verificationData);
                        navigate(`/payment-failure?registrationId=${registrationId}`);
                    } else {
                        console.log("Payment verified successfully.");
        
                        const userEmail = values.email;
                        localStorage.setItem(`registration_email_${registrationId}`, userEmail);
                        navigate(`/payment-success?registrationId=${registrationId}&email=${encodeURIComponent(userEmail)}`);
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
                    }
                }
            };
            
            console.log("Opening Razorpay with options:", options);
            const rzp = new window.Razorpay(options);
            rzp.open();
            
            rzp.on('payment.failed', function (response: any) {
                console.error("Razorpay payment failed event:", response);
                navigate(`/payment-failure?registrationId=${registrationId}&error=${response.error.description}`);
                toast.dismiss(toastId);
            });

        } catch (error: any) {
            console.error('Critical error in onSubmit:', error);
            
            // Check if it's a Razorpay API error
            if (error.message?.includes('400') || error.message?.includes('Bad Request')) {
                toast.error('Payment gateway error. Using demo mode...', { id: toastId });
                // Fallback to demo mode
                setTimeout(() => {
                    const userEmail = values.email;
                    const demoRegistrationId = `demo_${Date.now()}`;
                    localStorage.setItem(`registration_email_${demoRegistrationId}`, userEmail);
                    navigate(`/payment-success?registrationId=${demoRegistrationId}&email=${encodeURIComponent(userEmail)}`);
                }, 2000);
            } else {
                const errorMessage = error.message?.includes('Failed to fetch')
                    ? 'A network error occurred. Please check your connection and try again.'
                    : (error.message || 'An unexpected error occurred. Please try again.');
                
                toast.error(errorMessage, { id: toastId });
            }
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        onSubmit,
    };
};
