import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface CourseInfo {
  name: string;
  price: number;
  courseId: string;
}

const courseDetails: { [key: string]: CourseInfo } = {
  'workshop-registration': { name: 'Online Workshop Registration', price: 299, courseId: 'workshop-registration' },
  'live-workshops': { name: 'Sunday Live Workshops', price: 299, courseId: 'live-workshops' },
  'startup-mastery': { name: 'Startup Business Mastery Course', price: 24999, courseId: 'startup-mastery' },
  'digital-growth': { name: 'Digital Business Growth Course', price: 4999, courseId: 'digital-growth' },
  'premium-combo': { name: 'Premium Combo Course', price: 24999, courseId: 'premium-combo' },
};

export const usePaymentPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);
  const navigate = useNavigate();


  const openPopup = (courseId?: string) => {


    let course = courseDetails[courseId || 'workshop-registration'];
    if (!course) {
      course = { name: 'Business Foundation Course', price: 299, courseId: 'workshop-registration' };
    }
    setSelectedCourse(course);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCourse(null);
  };

  const proceedToBooking = () => {
    if (selectedCourse) {
      navigate(`/booking?course=${selectedCourse.courseId}`);
    }
    closePopup();
  };

  return {
    isPopupOpen,
    selectedCourse,
    openPopup,
    closePopup,
    proceedToBooking,
  };
};
