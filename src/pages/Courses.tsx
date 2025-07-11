import React,{useState,useEffect} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import CountdownTimer from '@/components/CountdownTimer';
import { PaymentPopup } from '@/components/PaymentPopup';
import { usePaymentPopup } from '@/hooks/usePaymentPopup';
import SEO from '@/components/SEO';

const CoursesPage = () => {
    const navigate = useNavigate();
    const { isPopupOpen, openPopup, closePopup, proceedToBooking } = usePaymentPopup();
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

  const date = new Date(webinars[0]?.date);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
const [selected,setselected] = useState("")

    return (
        <>
            <SEO 
                title="Business Courses & Training Programs - Gangadhar Nagarjuna Academy"
                description="Choose from our premium business courses: Startup Mastery, Digital Growth, Live Workshops. Learn from 400,000+ successful entrepreneurs. Special offers available."
                keywords="business courses, startup training, digital business course, entrepreneurship program, online business training, business coaching, startup workshop"
                type="course"
                url="https://gangadharnagarjuna01@gmail.com/courses"
            />
            
            <Header />
            <main className="bg-background text-foreground pt-20">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="mb-8">
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Our Programs</h1>
                        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                            Choose the path that's right for you. We offer a range of options to fit your goals and budget.
                        </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto bg-card p-6 sm:p-8 rounded-2xl shadow-xl border">
                        <div className="space-y-8">
                            {/* Program 1: Sunday Live Workshops */}
                             <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0 mt-1 hidden sm:block" />
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-primary flex items-center">
                                        <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 sm:hidden" />
                                        {dayName} Live Workshops – Weekly Business & Digital Training
                                    </h3>
                                    <p className="text-muted-foreground mt-2">Join our exclusive, action-packed live workshops every {dayName && dayName}.</p>
                                    <ul className="mt-4 space-y-2 text-muted-foreground">
                                        <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span><strong>Startup Entrepreneurship Workshop</strong> – Learn how to start and build a successful business from scratch.</span></li>
                                        <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span><strong>Digital AI Income Workshop</strong> – Discover step-by-step methods to earn up to ₹2 Lakhs per month using AI-powered digital strategies.</span></li>
                                    </ul>
                                    <p className="mt-4 font-semibold text-primary">What You'll Get:</p>
                                    <ul className="mt-2 space-y-2 text-muted-foreground">
                                        <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Live Q&A with industry experts</span></li>
                                        <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Real-world strategies you can apply immediately</span></li>
                                        <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" /><span>Interactive, hands-on learning experience</span></li>
                                    </ul>
                                    <p className="mt-4 italic text-sm text-foreground/80">Perfect for: Aspiring entrepreneurs and digital business seekers.</p>
                                </div>
                                <div className="text-left sm:text-right flex-shrink-0 w-full sm:w-auto">
                                    <p className="text-2xl font-bold text-primary">₹{webinars[0]?.Specialprice}</p>
                                    <Button className="mt-2 w-full sm:w-auto" onClick={() => {openPopup('live-workshops');setselected('live-workshops')}}>Enroll Now</Button>
                                </div>
                            </div>
                            
                            <Separator />

                            {/* Program 2: Super Premium Live Courses */}
                            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                <CheckCircle2 className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1 hidden sm:block" />
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-primary flex items-center">
                                        <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3 sm:hidden" />
                                        Super Premium Live Courses – Intensive Daily Training
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Take your learning to the next level with Daily Premium Live Classes (Monday to Friday) and Sunday Workshops</p>
                                    
                                    <div className="mt-6 space-y-4">
                                        <Card className="bg-background/50">
                                            <CardContent className="p-4">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
                                                    <p className="font-semibold text-lg flex-grow">Startup Business Mastery Course</p>
                                                    <div className="text-left sm:text-right w-full sm:w-auto">
                                                        <p className="text-xl font-bold text-muted-foreground line-through">₹24,999</p>
                                                    </div>
                                                </div>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                  <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /><span>Complete startup roadmap from idea to execution</span></li>
                                                  <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /><span>Brand building, marketing, and customer acquisition strategies</span></li>
                                                  <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /><span>Real-time mentorship, daily support, and expert feedback</span></li>
                                                  
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-background/50">
                                             <CardContent className="p-4">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
                                                    <p className="font-semibold text-lg flex-grow">Digital Business Growth Course</p>
                                                    <div className="text-left sm:text-right w-full sm:w-auto">
                                                        <p className="text-xl font-bold text-muted-foreground line-through">₹4,999</p>
                                                    </div>
                                                </div>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                  <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /><span>Practical use of AI tools for online business growth</span></li>
                                                  <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /><span>Step-by-step strategies to build and sell digital products</span></li>
                                                  <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /><span>Techniques to earn up to ₹2 Lakhs per month</span></li>
                                                  
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    
                                    {/* Combined CTA for both courses */}
                                    <div className="mt-8 text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                                        <p className="text-3xl font-bold text-primary mb-4">₹24,999</p>
                                        <p className="text-sm text-muted-foreground mb-4">Combined access to both premium courses</p>
                                        <Button 
                                            size="lg" 
                                            className="w-full sm:w-auto px-8" 
                                             onClick={() => {openPopup('premium-combo');setselected('premium-combo')}}
                                        >
                                            Enroll Now
                                        </Button>
                                    </div>
                                    
                                    <p className="mt-4 italic text-sm text-foreground/80">Perfect for: Serious learners looking for expert-led, result-driven, premium training.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Why Choose Us?</h2>
                    </div>
                    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex items-start space-x-3"><CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-lg text-foreground/90">Real, working strategies – no fluff</p></div>
                        <div className="flex items-start space-x-3"><CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-lg text-foreground/90">Live mentorship and direct interaction with instructors</p></div>
                        <div className="flex items-start space-x-3"><CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-lg text-foreground/90">Actionable learning with a focus on practical results</p></div>
                        <div className="flex items-start space-x-3"><CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-lg text-foreground/90">Accessible pricing with lifetime video access</p></div>
                    </div>
                </section>

                <section className="bg-primary/5 py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
                            Start Your Journey Today!
                        </h2>
                        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
                            Whether you're just beginning or ready to scale, we have the right program to help you grow.
                        </p>
                        <div className="flex justify-center mb-8">
                           <CountdownTimer />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <Button
                                size="lg"
                                onClick={() => {openPopup('live-workshops');setselected('live-workshops')}}
                                className="w-full sm:w-auto animate-pulse"
                            >
                                Register Now
                            </Button>
                            <p className="text-accent font-bold mt-2">Only a few seats left!</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <PaymentPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                onProceed={proceedToBooking}
                courseName={ selected == "live-workshops"  ? ( dayName+" Live Workshops"):("Super Premium Live Courses")}
                price={selected == "live-workshops"  ? (webinars[0]?.Specialprice):(24999)}
            />
        </>
    )
}

export default CoursesPage;
