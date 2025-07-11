import React, { useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PaymentPopup } from '@/components/PaymentPopup';
import { usePaymentPopup } from '@/hooks/usePaymentPopup';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPopupOpen, selectedCourse, openPopup, closePopup, proceedToBooking } = usePaymentPopup();

  // Updated logo URL - using the direct Cloudinary link you provided
  const logoUrl = "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1750101257/o05dnsacist7jxljfilu.png";

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const commonLinkClasses = "font-medium hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";
  const mobileLinkClasses = "block w-full text-center py-2 font-medium hover:text-primary transition-colors duration-300";

  const handleJoinNowClick = () => {
    openPopup('live-workshops');
  };

   const [webinars, setWebinars] = useState([]);

const fetchWebinars = async () => {
  try {
    const res = await fetch('http://82.29.162.228/api/webinar');
    const data = await res.json();

    if (data.success) {
      const featuredWebinars = data.data.filter(item => item.isFeatured);
      setWebinars(featuredWebinars);
    } else {
      console.error('Webinar fetch failed:', data.error);
    }
  } catch (error) {
    console.error('Error fetching webinars:', error);
  }
};

useEffect(() => {
  fetchWebinars();
}, []);

  
    const date = new Date(webinars[0]?.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 shadow-lg backdrop-blur-sm border-b border-border text-foreground"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                {/* Updated logo implementation */}
                <img 
                  src={logoUrl} 
                  alt="Gangadhar Nagarjuna Academy logo" 
                  className="h-14 object-contain" 
                  // Removed dark:invert to prevent color changes
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link key={link.label} to={link.href} className={commonLinkClasses}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className={commonLinkClasses}>
                    {link.label}
                  </a>
                )
              )}
              <Button
                size="lg"
                className="font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                onClick={handleJoinNowClick}
              >
                Join Now
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:text-primary focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm pb-6 border-b border-border">
            <nav className="flex flex-col items-center space-y-4 pt-4">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={mobileLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={mobileLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <Button
                size="lg"
                className="font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 w-3/4"
                onClick={() => {
                  handleJoinNowClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Join Now
              </Button>
            </nav>
          </div>
        )}
      </header>

        <PaymentPopup
                      isOpen={isPopupOpen}
                      onClose={closePopup}
                      onProceed={proceedToBooking}
                      courseName={ dayName+" Live Workshops"}
                      price={webinars[0]?.Specialprice}
                  />
    </>
  );
};

export default Header;