
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-8 text-center">Privacy Policy</h1>
            <div className="space-y-6 text-foreground/80">
              <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
              
              <p>Gangadhar Nagarjuna's Business Academy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">1. Information We Collect</h2>
                <p>We may collect personal information from you such as your name, email address, phone number, and payment information when you register for our courses, subscribe to our newsletter, or contact us.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                  <li>Provide, operate, and maintain our website and services.</li>
                  <li>Process your transactions and manage your orders.</li>
                  <li>Send you promotional information, such as newsletters.</li>
                  <li>Respond to your comments, questions, and provide customer service.</li>
                </ul>
              </div>

              <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">3. Sharing Your Information</h2>
                  <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">4. Security of Your Information</h2>
                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">5. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">6. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us through our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
