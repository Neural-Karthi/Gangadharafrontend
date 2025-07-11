
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="pt-20 bg-background text-foreground">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-8 text-center">Terms and Conditions</h1>
            <div className="space-y-6 text-foreground/80">
              <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
              
              <p>Welcome to Gangadhar Nagarjuna's Business Academy. These Terms and Conditions ("Terms") govern your use of our website and services.</p>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">1. Acceptance of Terms</h2>
                <p>By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">2. Course Enrollment and Payment</h2>
                <p>When you enroll in our courses, you agree to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                  <li>Provide accurate and complete information during registration.</li>
                  <li>Pay the course fees as specified on our website.</li>
                  <li>Complete payment before accessing course materials.</li>
                  <li>Use course materials for personal learning purposes only.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">3. Intellectual Property</h2>
                <p>All course content, including videos, materials, and resources, are the intellectual property of Gangadhar Nagarjuna's Business Academy. You may not reproduce, distribute, or share course content without written permission.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">4. Refund Policy</h2>
                <p>Refunds may be considered on a case-by-case basis within 7 days of enrollment, provided no significant course content has been accessed.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">5. User Conduct</h2>
                <p>You agree not to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                  <li>Share login credentials with others.</li>
                  <li>Record or distribute course content.</li>
                  <li>Use our services for any illegal or unauthorized purpose.</li>
                  <li>Interfere with the security or proper functioning of our website.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">6. Limitation of Liability</h2>
                <p>Gangadhar Nagarjuna's Business Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">7. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">8. Contact Information</h2>
                <p>For questions about these Terms, please contact us through our website or email support.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
