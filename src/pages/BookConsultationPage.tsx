import React, { useEffect, useState } from 'react';
import { Calendar, Clock, CheckCircle, Star, Zap, ArrowRight, ExternalLink, Users, Award, TrendingUp, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookConsultationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Start countdown after 2 seconds
    const timer = setTimeout(() => {
      setShowRedirect(true);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Auto redirect after countdown
            window.open('https://calendly.com/autoflowai525/30min', '_blank');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    { icon: Clock, title: '30-Minute Free Session', desc: 'Comprehensive consultation at no cost' },
    { icon: Zap, title: 'Instant Solutions', desc: 'Get actionable automation strategies' },
    { icon: CheckCircle, title: 'Custom Roadmap', desc: 'Personalized automation plan for your business' },
    { icon: Star, title: 'Expert Guidance', desc: 'Direct access to certified automation expert' }
  ];

  const stats = [
    { icon: Users, value: '30+', label: 'Businesses Automated' },
    { icon: TrendingUp, value: '300%', label: 'Average ROI Increase' },
    { icon: Award, value: '100%', label: 'Client Satisfaction' },
    { icon: Zap, value: '24/7', label: 'Support Available' }
  ];

  const handleBookNow = () => {
    window.open('https://calendly.com/autoflowai525/30min', '_blank');
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Go to home page
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Close/Back Button */}
      <div className="fixed top-6 left-6 z-50 flex space-x-3">
        <button
          onClick={handleGoBack}
          className="group w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
          title="Go Back"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
        </button>
        
        <button
          onClick={handleGoHome}
          className="group w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-300 transform hover:scale-105"
          title="Close"
        >
          <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Navigation Helper */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2">
          <p className="text-gray-400 text-sm">
            <span className="text-blue-400">←</span> Back | 
            <span className="text-red-400 ml-1">×</span> Close
          </p>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 right-32 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-64 left-64 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* 3D Calendar Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-12 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl transform -rotate-12 animate-pulse delay-500"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Calendar className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Book Your Free
            </span>
            <br />
            <span className="text-white">
              AI Consultation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get personalized automation strategies that can transform your business operations 
            and boost productivity by up to <span className="text-blue-400 font-bold">300%</span>
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transform transition-all duration-700 hover:scale-105 hover:border-blue-500/50 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1000ms' }}>
            
            {/* Main CTA Button */}
            <button
              onClick={handleBookNow}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 mb-8"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Calendar className="h-6 w-6" />
                <span>Book Your Free 30-Min Consultation</span>
                <ExternalLink className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 blur-sm group-hover:blur-md transition-all duration-300"></div>
            </button>

            {/* Auto-redirect Notice */}
            {showRedirect && (
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4 mb-6 animate-pulse">
                <p className="text-green-400 font-medium mb-2">
                  🚀 Redirecting to Calendly in {countdown} seconds...
                </p>
                <p className="text-gray-400 text-sm">
                  Or click the button above to book immediately
                </p>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>100% Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Instant Booking</span>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className={`mt-16 bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1200ms' }}>
            <h2 className="text-2xl font-bold text-white mb-6">What to Expect in Your Consultation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Business Analysis', desc: 'We\'ll analyze your current processes and identify automation opportunities' },
                { step: '02', title: 'Custom Strategy', desc: 'Get a personalized automation roadmap tailored to your specific needs' },
                { step: '03', title: 'Implementation Plan', desc: 'Receive a clear timeline and next steps to transform your business' }
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency Element */}
          <div className={`mt-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1400ms' }}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-400 px-6 py-3 rounded-full animate-pulse">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Limited slots available this month - Book now!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button
          onClick={handleBookNow}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 animate-bounce"
          title="Book Consultation"
        >
          <Calendar className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default BookConsultationPage;