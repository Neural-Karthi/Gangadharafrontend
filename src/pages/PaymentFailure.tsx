
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentFailurePage = () => {
    const [searchParams] = useSearchParams();
    const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center">
      <div className="p-10 bg-card shadow-xl rounded-2xl">
        <XCircle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold mt-4 text-destructive-foreground">Payment Failed</h1>
        <p className="text-muted-foreground mt-2">
            Unfortunately, we couldn't process your payment.
        </p>
        {error && <p className="text-sm text-muted-foreground mt-1">Reason: {error}</p>}
        <p className="text-muted-foreground mt-4">
            Please try again or use a different payment method.
        </p>
        <Button asChild className="mt-6">
          <Link to="/booking">Try Again</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
