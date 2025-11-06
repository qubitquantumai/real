import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAutoLoginPopup } from './hooks/useAutoLoginPopup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AutoLoginPopup from './components/AutoLoginPopup';
import PasswordReset from './components/PasswordReset';
import ChatBot from './components/ChatBot/ChatBot';
import ChatAnalytics from './components/ChatAnalytics/ChatAnalytics';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import BookConsultationPage from './pages/BookConsultationPage';
import QuantumResearchLabPage from './pages/QuantumResearchLabPage';
import QuantumCollaborationPage from './pages/QuantumCollaborationPage';
import BuildAgentPage from './pages/BuildAgentPage';

// Component to handle URL redirects for password reset
function URLHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're on the home page with auth tokens in the hash
    if (location.pathname === '/' && location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');
      const error = hashParams.get('error');
      
      console.log('URL Handler - Hash params:', {
        type,
        hasAccessToken: !!accessToken,
        error,
        fullHash: location.hash
      });
      
      // If this is a password recovery link, redirect to the reset page
      if (type === 'recovery' && accessToken) {
        console.log('Redirecting to password reset page with tokens');
        navigate('/reset-password' + location.hash, { replace: true });
      }
      // If there's an auth error, also redirect to reset page to handle it
      else if (error && (error === 'access_denied' || type === 'recovery')) {
        console.log('Redirecting to password reset page with error');
        navigate('/reset-password' + location.hash, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { showPopup, closePopup } = useAutoLoginPopup({
    delayMs: 40000, // Changed from 50000 to 40000 (40 seconds)
  });

  const handleLoginClick = () => {
    closePopup(); // Close auto popup if open
    setIsLoginModalOpen(true);
  };

  // Listen for custom event to open login modal
  useEffect(() => {
    const handleOpenLoginModal = () => {
      setIsLoginModalOpen(true);
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    return () => window.removeEventListener('openLoginModal', handleOpenLoginModal);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <URLHandler />
      <Routes>
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/book-consultation" element={<BookConsultationPage />} />
        <Route path="/build-agent" element={<BuildAgentPage />} />
        <Route path="/quantum-research-lab" element={<QuantumResearchLabPage />} />
        <Route path="/quantum-collaboration" element={<QuantumCollaborationPage />} />
        <Route path="/chat-analytics" element={<ChatAnalytics />} />
        <Route path="/*" element={
          <>
            <Navbar onLoginClick={handleLoginClick} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            </Routes>
            <Footer />
            
            {/* Auto Login Popup */}
            <AutoLoginPopup 
              isVisible={showPopup}
              onClose={closePopup}
              onLoginClick={handleLoginClick}
            />
            
            {/* Manual Login Modal */}
            <LoginModal 
              isOpen={isLoginModalOpen} 
              onClose={() => setIsLoginModalOpen(false)} 
            />

            {/* AI ChatBot */}
            <ChatBot />
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;