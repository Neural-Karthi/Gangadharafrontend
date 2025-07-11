import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const navLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground/70 py-12 pb-24 w-full relative z-[5] clear-both">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <a href="#hero" className="text-2xl font-heading font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
            Gangadhar Nagarjuna's Business Academy
          </a>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground/70 hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mb-8 text-sm">
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} className="hover:text-primary transition-colors py-2">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="hover:text-primary transition-colors py-2">
                {link.label}
              </a>
            )
          )}
        </nav>

        <p className="text-sm text-primary font-medium mb-2">
          This website was crafted with excellence by Build Your Vision.
        </p>
        <p className="text-xs text-secondary-foreground/50">
          &copy; {new Date().getFullYear()} Gangadhar Nagarjuna's Business Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
