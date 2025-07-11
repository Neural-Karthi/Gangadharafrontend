import React from 'react';
import { Users, Calendar, Clock, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentPopup } from '@/components/PaymentPopup';
import { usePaymentPopup } from '@/hooks/usePaymentPopup';
import CountdownTimer from '@/components/CountdownTimer';

interface Webinar {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  Specialprice: number;
  isFeatured: boolean;
  // Add other fields if needed
}

interface HeroSectionProps {
  webinars: Webinar[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ webinars }) => {
  const coachImage = '/lovable-uploads/d9f7fe37-ebfc-471b-a2b9-8268a2ffd8b4.png';
  const { isPopupOpen, selectedCourse, openPopup, closePopup, proceedToBooking } = usePaymentPopup();

  const handleProceed = () => {
    proceedToBooking();
  };

  const formatTo12Hour = (time24: string): string => {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const formatDateWithSuffix = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();

    const getOrdinalSuffix = (n: number): string => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${dayWithSuffix} ${month} ${year}`;
  };

  const webinar = webinars[0]; // Get the first featured webinar
 const getDurationLabel = (start: string, end: string): string => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMinutes = durationMs / (1000 * 60);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours && minutes) return `${hours} Hour ${minutes} Min Online Workshop`;
    if (hours) return `${hours} Hour Online Workshop`;
    return `${minutes} Min Online Workshop`;
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-foreground section-padding overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Inspiring background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Coach Image */}
          <div className="text-center md:text-left opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="relative mx-auto md:mx-0 w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
              <img
                src={coachImage}
                alt="Gangadhar Nagarjuna"
                className="w-full drop-shadow-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-theme">
              I will be your coach for  
              <span> {webinars[0] && (
                getDurationLabel(webinars[0].startTime, webinars[0].endTime)
              )}</span>
              hours
            </h1>

            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground/90">
              - Gangadhar Nagarjuna
            </h2>

            <div className="mt-8 space-y-4 text-lg text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Users className="w-6 h-6 text-primary" />
                <span>Trained over <strong>400,000+</strong> Students</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                <span>Starts: <strong>{webinar?.date && formatDateWithSuffix(webinar.date)}</strong></span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <span>
                  Time: <strong>
                    {webinar?.startTime && webinar?.endTime &&
                      `(${formatTo12Hour(webinar.startTime)} - ${formatTo12Hour(webinar.endTime)} IST)`
                    }
                  </strong>
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Languages className="w-6 h-6 text-primary" />
                <span>Language: <strong>Basic English</strong></span>
              </div>
            </div>

            <div className="mt-8 bg-card/50 border border-border/50 rounded-lg p-4 max-w-sm mx-auto md:mx-0">
              <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Register In Next:
              </p>
              <div className="mt-2">
                <CountdownTimer />
              </div>
            </div>

            <div className="mt-8 space-y-3 flex flex-col items-center md:items-start">
              <Button
                size="lg"
                className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 px-8 py-6 text-lg"
                onClick={() => openPopup('live-workshops')}
              >
                Register Now for ₹{webinar?.Specialprice}
              </Button>

              <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full border border-blue-200">
                <div className="relative">
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-ping absolute"></div>
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Only few seats left at this price!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onProceed={handleProceed}
        courseName={selectedCourse?.name || '2-Hour Coaching Session with Gangadhar Nagarjuna'}
        price={webinar?.Specialprice || 299}
      />
    </section>
  );
};

export default HeroSection;
