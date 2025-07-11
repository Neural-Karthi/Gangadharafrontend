import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { BookingForm } from '@/components/booking/BookingForm';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course') || '';

  const [webinars, setWebinars] = useState<any[]>([]);
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null);

  const fetchWebinars = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('http://82.29.162.228/api/webinar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        const featuredWebinars = data.data.filter((item: any) => item.isFeatured === true);
        setWebinars(featuredWebinars);
        if (featuredWebinars.length > 0) {
          setSelectedWebinar(featuredWebinars[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const price = selectedWebinar?.Specialprice || 299;
  const name = selectedWebinar ? `Workshop on ${selectedWebinar.date}` : 'Sunday Live Workshop';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-md w-full space-y-8 p-10 bg-card shadow-xl rounded-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/')}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Secure Your Spot
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            You are enrolling in: <strong className="text-primary">{name}</strong>
          </p>
        </div>

        {/* ✅ Pass price and optionally webinar */}
        <BookingForm price={ courseId == "premium-combo" ? 24999 :price} webinar={selectedWebinar} />

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default BookingPage;
