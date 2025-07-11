import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get('registrationId');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!registrationId) {
      setError("No registration ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchRegistrationEmail = async () => {
      try {
        // Try to get email from localStorage first (set by verify-payment)
        const storedEmail = localStorage.getItem(`registration_email_${registrationId}`);
        
        if (storedEmail) {
          setUserEmail(storedEmail);
          toast.success('Payment confirmed! Your registration is successful.');
          setLoading(false);
          return;
        }

        // If not in localStorage, try to get from URL params
        const emailFromParams = searchParams.get('email');
        if (emailFromParams) {
          setUserEmail(emailFromParams);
          localStorage.setItem(`registration_email_${registrationId}`, emailFromParams);
          toast.success('Payment confirmed! Your registration is successful.');
          setLoading(false);
          return;
        }

        // If we can't get the email, show a generic success message
        console.log('Email not available, showing generic success message');
        setUserEmail('your registered email'); // Generic placeholder
        toast.success('Payment confirmed! Your registration is successful.');
        
      } catch (e: any) {
        console.error('Error in payment success page:', e);
        setError("Payment was successful, but we couldn't retrieve your registration details. Please check your email for confirmation.");
        toast.error("Payment successful but registration details unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationEmail();
  }, [registrationId, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center">
      <div className="p-10 bg-card shadow-xl rounded-2xl max-w-lg w-full">
        {loading && (
          <>
            <Loader2 className="mx-auto h-16 w-16 text-primary animate-spin" />
            <h1 className="text-3xl font-bold mt-4">Finalizing Your Registration</h1>
            <p className="text-muted-foreground mt-2">Just a moment...</p>
          </>
        )}
        {error && (
            <>
                <XCircle className="mx-auto h-16 w-16 text-destructive" />
                <h1 className="text-3xl font-bold mt-4 text-destructive-foreground">Confirmation Error</h1>
                <p className="text-muted-foreground mt-2">{error}</p>
                <p className="text-muted-foreground mt-1">If the amount was debited, please contact support with your registration details.</p>
                <Button asChild className="mt-6">
                    <Link to="/">Go to Homepage</Link>
                </Button>
            </>
        )}
         {!loading && !error && userEmail && (
            <>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
                <p className="text-muted-foreground mt-2">
                    A confirmation email with the workshop details and meeting link has been sent to <br/><span className="font-bold text-foreground">{userEmail}</span>.
                </p>
                <p className="text-muted-foreground mt-1">Please check your inbox (and spam folder).
                </p>
                <Button asChild className="mt-6">
                    <Link to="/">Go to Homepage</Link>
                </Button>
            </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
