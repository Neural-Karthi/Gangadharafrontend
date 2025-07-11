import React from 'react';

interface Webinar {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  isFeatured: boolean;
  // add more fields as needed
}

interface Props {
  webinars: Webinar[];
}

const WorkshopAnnouncementSection: React.FC<Props> = ({ webinars }) => {
  const logoUrl = "/lovable-uploads/dc0e5719-5379-4a0c-a9cc-7d2ab8874bad.png";
  const gangadharLogoUrl = "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1750154676/zd8qkexpsabjzo1mgm5o.png";

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

  const formatTo12Hour = (time24: string): string => {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <section id="announcement" className="bg-background pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center animate-fall-in">
          <div className="relative w-full max-w-4xl mt-12">
            <div className="flex justify-center mb-8">
              <img 
                src={logoUrl} 
                alt="Gangadhar Nagarjuna Academy logo" 
                className="h-16 md:h-20 object-contain dark:invert"
              />
            </div>

            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-sm md:max-w-md px-4">
              <div className="bg-primary text-primary-foreground font-extrabold py-4 px-6 rounded-xl shadow-lg z-10 text-center">
                <div className="flex justify-center mb-2">
                  <img 
                    src={gangadharLogoUrl} 
                    alt="Gangadhar Nagarjuna" 
                    className="h-12 object-contain"
                  />
                </div>
                {webinars[0] && (
                  <>
                    <p className="text-base md:text-lg leading-tight uppercase">
                      {getDurationLabel(webinars[0].startTime, webinars[0].endTime)}
                    </p>
                    <p className="text-base md:text-lg leading-tight uppercase">
                      On {formatDateWithSuffix(webinars[0].date)}
                    </p>
                    <p className="text-sm md:text-base font-semibold mt-1">
                      ({formatTo12Hour(webinars[0].startTime)} - {formatTo12Hour(webinars[0].endTime)} IST)
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-secondary rounded-2xl shadow-2xl pt-32 pb-12 px-6 text-center border border-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gradient-theme">
                Achieve Success Like the Top 1%
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto my-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Your Time Starts Here....
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopAnnouncementSection;
