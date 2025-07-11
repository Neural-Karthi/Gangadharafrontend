import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import CourseHighlightsSection from '@/components/CourseHighlightsSection';
import WhatYouUnlockSection from '@/components/WhatYouUnlockSection';
import BusinessBreakthroughsSection from '@/components/BusinessBreakthroughsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MeetYourCoachSection from '@/components/MeetYourCoachSection';
import PromiseNoteSection from '@/components/PromiseNoteSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import WorkshopAnnouncementSection from '@/components/WorkshopAnnouncementSection';
import StickyFooterBar from '@/components/StickyFooterBar';
import Footer from '@/components/Footer';

const Index = () => {
  const [webinars, setWebinars] = useState([]);

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
        const featuredWebinars = data.data.filter(item => item.isFeatured === true);
        setWebinars(featuredWebinars);
      }
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);


  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <WorkshopAnnouncementSection webinars={webinars} />
      <HeroSection webinars={webinars} />
      <SocialProofSection webinars={webinars} />
      <CourseHighlightsSection webinars={webinars} />
      <WhatYouUnlockSection webinars={webinars} />
      <BusinessBreakthroughsSection webinars={webinars} />
      <TestimonialsSection webinars={webinars} />
      <MeetYourCoachSection webinars={webinars} />
      <PromiseNoteSection webinars={webinars} />
      <FinalCTASection webinars={webinars} />
      <FAQSection webinars={webinars} />
      <Footer />
      <StickyFooterBar webinars={webinars}/>
    </div>
  );
};

export default Index;
