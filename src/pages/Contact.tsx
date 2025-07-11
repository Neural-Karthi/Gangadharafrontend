import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Define a type for contact details
interface ContactDetail {
  Icon: React.ElementType;
  title: string;
  content: string;
  href: string;
}

const contactDetails: ContactDetail[] = [
  {
    Icon: Mail,
    title: 'Email Us',
    content: 'gangadharnagarjuna01@gmail.com',
    href: 'mailto:gangadharnagarjuna01@gmail.com',
  },
  {
    Icon: MapPin,
    title: 'Our Location',
    content: 'Mallikarjuna nagar, Uppal, Hyderabad, India',
    href: 'https://maps.app.goo.gl/PpB1TS4nGTiFz58p9',
  },
];

const Contact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="pt-20 bg-background text-foreground min-h-screen">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 text-center">Contact Us</h1>
          <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full mx-auto place-items-center">
              {contactDetails.map((detail) => (
                <a
                  key={detail.href}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={detail.title}
                  className="group flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full w-full"
                >
                  <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-colors duration-300">
                    <detail.Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{detail.title}</h3>
                  <p className="text-card-foreground/80 break-words w-full px-2">
                    {detail.content}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
