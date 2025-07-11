import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TimerProvider } from "@/contexts/TimerContext";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Booking from "./pages/Booking";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import FAQPage from "./pages/FAQPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminRegistrationsPage from "./pages/admin/AdminRegistrationsPage";
import AdminRevenuePage from "./pages/admin/AdminRevenuePage";
import AdminMeetingLinksPage from "./pages/admin/AdminMeetingLinksPage";
import AdminDocumentsPage from "./pages/admin/AdminDocumentsPage";
import AdminLayout from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import AdminAdd_dates from "./pages/admin/AdminAdd_dates";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <TimerProvider>
              <Toaster />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-failure" element={<PaymentFailure />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin/reset-password/:token" element={<AdminResetPasswordPage />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminDashboardPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/registrations"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminRegistrationsPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/revenue"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminRevenuePage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/meeting-links"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminMeetingLinksPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/documents"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminDocumentsPage />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                   <Route
                    path="/admin/AdminAdd_dates"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminAdd_dates />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TimerProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
