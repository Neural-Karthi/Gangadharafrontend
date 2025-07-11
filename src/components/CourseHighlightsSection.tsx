
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Using Card for theming
import { Zap, TrendingUp, Brain, Award } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ icon: Icon, title, description, delay, isVisible, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={`p-2 rounded-xl shadow-2xl transition-all duration-500 ease-out hover:shadow-[0_20px_50px_-10px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-2 hover:border-primary border-2 border-transparent
        observe-anim slide-in-up bg-card text-card-foreground ${isVisible ? 'is-visible' : ''} cursor-pointer`}
      style={{transitionDelay: `${delay}ms`}}
    >
      <CardHeader className="items-center text-center">
        <div className="bg-gradient-theme text-primary-foreground p-4 rounded-full inline-block mb-6 shadow-lg">
          <Icon size={36} strokeWidth={2} />
        </div>
        <CardTitle className="text-2xl font-bold text-primary mb-0">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-card-foreground/80 leading-relaxed mb-6">{description}</p>
      </CardContent>
    </Card>
  );
};

const CourseHighlightsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const navigate = useNavigate();

  const courses = [
    {
      icon: Zap,
      title: "Use ChatGPT to Create Real Income Streams",
      description: "Discover how to turn AI prompts into blogs, ads, videos, and paid projects.",
    },
    {
      icon: TrendingUp,
      title: "Offer AI Services Without Technical Skills",
      description: "Learn how to deliver high-value results using simple AI tools that clients love",
    },
    {
      icon: Brain,
      title: "Build a Personal Brand Using AI Content",
      description: "Grow your visibility on Instagram, YouTube, and other platforms using AI-generated content strategies.",
    },
    {
      icon: Award,
      title: "Get Lifetime Skills for the Future of Work",
      description: "Stay ahead of the curve by mastering tools that are transforming every industry.",
    },
  ];

  return (
    <section ref={ref} id="courses" className="bg-background text-foreground section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 md:mb-20 observe-anim slide-in-up ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gradient-theme">
            Unlock Your Potential
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Our cutting-edge courses are designed to give you the skills, strategies, and support to thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={course.title}
              icon={course.icon}
              title={course.title}
              description={course.description}
              delay={index * 200 + (isVisible ? 200 : 0)}
              isVisible={isVisible}
              onClick={() => navigate('/courses')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHighlightsSection;
