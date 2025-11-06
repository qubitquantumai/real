import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, MessageSquare, Lock, LogIn, Calendar, ArrowRight, Zap, Target, Atom, Brain, Microscope, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { GradientButton } from '../components/ui/gradient-button';
import { useLocation } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isQuantumResearch = location.pathname.includes('quantum') || location.search.includes('quantum');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const services = [
    'Advanced Automation',
    'AI Chatbots',
    'Web Tools',
    'Virtual Assistant',
    'Lead Generator System',
    'Appointment Booking',
    'Custom AI Solutions',
    'Quantum Research Collaboration',
    'Other'
  ];

  const quantumResearchAreas = [
    'Quantum Computing',
    'Quantum Machine Learning', 
    'Quantum Information Theory',
    'Quantum Sensing',
    'Quantum AI & Physics Integration',
    'Quantum Consciousness Studies',
    'Other Research Area'
  ];

  const handleBookConsultation = () => {
    window.open('https://calendly.com/autoflowai525/30min', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      setMessage({ 
        type: 'error', 
        text: 'Please log in to submit the contact form. This helps us provide you with personalized service.' 
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields (Name, Email, Phone, and Message)');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            company: formData.company.trim() || null,
            message: formData.message.trim(),
            service: formData.service || null,
            user_id: user.id, // Add user ID to track submissions
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        setMessage({ 
          type: 'error', 
          text: 'Failed to send message. Please try again or contact us directly.' 
        });
      } else {
        setMessage({ 
          type: 'success', 
          text: isQuantumResearch 
            ? 'Thank you for your interest in quantum research! We\'ll get back to you within 24 hours to discuss collaboration opportunities.'
            : 'Thank you for your message! We\'ll get back to you within 24 hours with a personalized response.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: ''
        });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.' 
      });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear message when user starts typing
    if (message) setMessage(null);
  };

  // Pre-fill form with user data if available
  React.useEffect(() => {
    if (user && !formData.name && !formData.email) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.name || user.user_metadata?.display_name || '',
        email: user.email || ''
      }));
    }
  }, [user, formData.name, formData.email]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16 relative overflow-hidden">
      {/* Quantum background */}
      <div className="absolute inset-0 cyberpunk-grid opacity-20"></div>
      
      {/* Quantum particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="quantum-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isQuantumResearch && (
            <div className="inline-flex items-center space-x-2 quantum-glass rounded-full px-6 py-3 backdrop-blur-sm mb-8">
              <Atom className="h-5 w-5 text-[#00F5FF] quantum-pulse" />
              <span className="text-[#00F5FF] font-medium quantum-font">Quantum Research Collaboration</span>
            </div>
          )}
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 quantum-font">
            <span className="quantum-text">
              {isQuantumResearch ? 'Join Our Research' : 'Get In Touch'}
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            {isQuantumResearch 
              ? 'Ready to advance the frontiers of quantum science? Join our research team and contribute to groundbreaking discoveries in quantum computing, AI, and physics.'
              : 'Ready to transform your business with Quantum AI? Let\'s discuss how Qubit Quantum AI team from Kerala, India can help you achieve your automation and AI goals globally.'
            }
          </p>
          
          {/* Book Consultation CTA */}
          <div className="mb-8">
            <GradientButton 
              variant="autoflow" 
              onClick={handleBookConsultation}
              className="px-8 py-4 text-lg quantum-btn quantum-font"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6" />
                <span>{isQuantumResearch ? 'Schedule Research Discussion' : 'Book Free Consultation'}</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </GradientButton>
            <p className="text-sm text-gray-400 mt-3 quantum-font">
              {isQuantumResearch 
                ? '✓ 30-minute research discussion ✓ Collaboration opportunities ✓ No commitment required'
                : '✓ 30-minute free session ✓ Custom solution roadmap ✓ No commitment required'
              }
            </p>
          </div>
          
          {/* Login Status Indicator */}
          {user ? (
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full quantum-glow">
              <CheckCircle className="h-5 w-5" />
              <span className="quantum-font">Welcome back, {user.user_metadata?.name || user.email?.split('@')[0]}!</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 quantum-glass text-[#00F5FF] px-4 py-2 rounded-full">
              <Lock className="h-5 w-5" />
              <span className="quantum-font">Please log in to submit the contact form</span>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 quantum-font">
                  {isQuantumResearch ? 'Research Collaboration' : 'Let\'s Start a Conversation'}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {isQuantumResearch 
                    ? 'We\'re looking forward to expanding our research on quantum physics and AI. If you\'re passionate about advancing the frontiers of science and want to join our team to study and research in these cutting-edge fields, we\'d love to hear from you.'
                    : 'Hi, we\'re Qubit Quantum AI, experts in automation and web tools based in Kerala, India. We specialize in creating quantum-powered AI solutions that streamline business processes and drive growth globally. Whether you need chatbots, virtual assistants, or custom automation tools, we\'re here to help.'
                  }
                </p>
              </div>

              {isQuantumResearch && (
                <div className="quantum-glass rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center quantum-font">
                    <Brain className="h-6 w-6 text-[#00F5FF] mr-3" />
                    Research Areas We're Exploring
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: Atom, text: 'Quantum Computing' },
                      { icon: Brain, text: 'Quantum AI Integration' },
                      { icon: Microscope, text: 'Quantum Sensing' },
                      { icon: Target, text: 'Quantum Information' }
                    ].map((area, index) => (
                      <div key={area.text} className="flex items-center space-x-2 text-gray-300 quantum-wave" style={{ animationDelay: `${index * 0.1}s` }}>
                        <area.icon className="h-4 w-4 text-[#00F5FF]" />
                        <span className="text-sm quantum-font">{area.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {[
                  { 
                    icon: Mail, 
                    title: 'Email Us', 
                    info: 'qubitquantumai@gmail.com', 
                    desc: isQuantumResearch 
                      ? 'Send research proposals and collaboration ideas - We typically respond within 2 hours'
                      : 'Send us an email anytime - We typically respond within 2 hours'
                  },
                  { 
                    icon: Phone, 
                    title: 'Call Us', 
                    info: '+91 94955 16362', 
                    desc: 'Available Mon-Sun from 9am to 9pm IST' 
                  },
                  { 
                    icon: MessageCircle, 
                    title: 'WhatsApp Live Chat', 
                    info: '+91 94955 16362', 
                    desc: 'Instant support via WhatsApp - Click to start chat',
                    isWhatsApp: true
                  },
                  { 
                    icon: MapPin, 
                    title: 'Location', 
                    info: 'India', 
                    desc: isQuantumResearch 
                      ? 'Available for remote research collaboration worldwide'
                      : 'Available for remote consultations worldwide'
                  }
                ].map((contact, index) => (
                  <div
                    key={contact.title}
                    className={`flex items-start space-x-4 p-6 quantum-card rounded-2xl transition-all duration-300 group hover:shadow-lg quantum-wave ${
                      contact.isWhatsApp 
                        ? 'hover:border-green-500/50 hover:shadow-green-500/20 cursor-pointer' 
                        : 'hover:border-[#FF00F5]/50 hover:shadow-[#00F5FF]/20'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={contact.isWhatsApp ? () => window.open('https://wa.me/919495516362?text=Hey%20Qubit%20Quantum%20AI%2C%20I%20need%20help%20with%20AI%20automation%20solutions.%20Can%20you%20assist%20me%3F', '_blank') : undefined}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 quantum-glow ${
                      contact.isWhatsApp 
                        ? 'bg-gradient-to-br from-green-500 to-green-600' 
                        : 'bg-gradient-to-br from-[#00F5FF] to-[#FF00F5]'
                    }`}>
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-white mb-1 transition-colors duration-300 quantum-font ${
                        contact.isWhatsApp ? 'group-hover:text-green-400' : 'group-hover:text-[#00F5FF]'
                      }`}>{contact.title}</h3>
                      <p className={`font-medium mb-1 quantum-font ${
                        contact.isWhatsApp ? 'text-green-400' : 'text-[#00F5FF]'
                      }`}>{contact.info}</p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{contact.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {!isQuantumResearch && (
                <>
                  {/* Development Timeline Information */}
                  <div className="quantum-glass rounded-2xl p-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center quantum-font">
                      <Zap className="h-6 w-6 text-green-400 mr-3" />
                      How Long Does Quantum AI Development Take?
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        Development time depends on your specific problem and requirements. We deliver quantum solutions as fast as possible while ensuring quality:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="quantum-glass rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-[#00F5FF]" />
                            <span className="font-semibold text-[#00F5FF] text-sm quantum-font">Simple Solutions</span>
                          </div>
                          <p className="text-gray-400 text-sm">Basic chatbots, simple automation: Within few days</p>
                        </div>
                        <div className="quantum-glass rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-[#FF00F5]" />
                            <span className="font-semibold text-[#FF00F5] text-sm quantum-font">Complex Systems</span>
                          </div>
                          <p className="text-gray-400 text-sm">Advanced quantum AI agents, custom integrations: Within few days</p>
                        </div>
                      </div>
                      <div className="quantum-glass rounded-lg p-4">
                        <p className="text-[#00F5FF] font-medium text-sm mb-2 quantum-font">⚡ Our Promise:</p>
                        <p className="text-gray-300 text-sm">
                          We have the expertise to deliver both simple and complex quantum solutions within few days without compromising quality. 
                          During our consultation, we'll provide you with an accurate timeline based on your specific needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Consultation CTA */}
                  <div className="quantum-glass rounded-2xl p-6 hover:shadow-lg hover:shadow-[#00F5FF]/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center quantum-font">
                      <Calendar className="h-6 w-6 text-[#00F5FF] mr-3" />
                      Prefer to Talk Directly?
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Book a free 30-minute consultation to discuss your quantum automation needs and get personalized recommendations.
                    </p>
                    <GradientButton 
                      variant="autoflow" 
                      onClick={handleBookConsultation}
                      className="w-full quantum-btn quantum-font"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Free Consultation</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </GradientButton>
                  </div>

                  {/* Expertise Areas */}
                  <div className="quantum-card rounded-2xl p-6 hover:shadow-lg hover:shadow-[#00F5FF]/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-4 quantum-font">Our Expertise</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Quantum AI Chatbots',
                        'Virtual Assistants', 
                        'Process Automation',
                        'Web Tools',
                        'API Integration',
                        'Custom Solutions'
                      ].map((skill, index) => (
                        <div key={skill} className="flex items-center space-x-2 hover:text-[#00F5FF] transition-colors duration-300 quantum-wave" style={{ animationDelay: `${index * 0.1}s` }}>
                          <CheckCircle className="h-4 w-4 text-[#00F5FF]" />
                          <span className="text-gray-300 text-sm quantum-font">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/10 to-[#FF00F5]/10 rounded-3xl blur-3xl"></div>
              
              <div className="relative quantum-card rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#00F5FF]/10 transition-all duration-500">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 quantum-font">
                    {isQuantumResearch ? 'Research Collaboration Form' : 'Send Us a Message'}
                  </h3>
                  <p className="text-gray-400">
                    {user 
                      ? (isQuantumResearch 
                          ? "Fill out the form below to discuss research collaboration opportunities!"
                          : "Fill out the form below and we'll get back to you soon!"
                        )
                      : "Please log in first to send a personalized message and receive priority support."
                    }
                  </p>
                </div>

                {/* Login Required Notice */}
                {!user && (
                  <div className="mb-6 p-4 quantum-glass rounded-xl flex items-center space-x-3 hover:bg-[#00F5FF]/10 transition-colors duration-300">
                    <LogIn className="h-5 w-5 text-[#00F5FF] flex-shrink-0" />
                    <div>
                      <p className="text-[#00F5FF] font-medium text-sm quantum-font">Login Required</p>
                      <p className="text-gray-400 text-sm">
                        {isQuantumResearch 
                          ? 'Create a free account to submit research collaboration requests and receive priority consideration.'
                          : 'Create a free account to submit the contact form and receive personalized AI consultation.'
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* Message */}
                {message && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    message.type === 'success' 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 quantum-font">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-[#00F5FF]/30 rounded-xl text-white placeholder-gray-500 focus:border-[#FF00F5] focus:ring-1 focus:ring-[#FF00F5] transition-colors duration-300 disabled:opacity-50 hover:border-gray-500 quantum-font"
                        placeholder="John Doe"
                        required
                        disabled={loading || !user}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 quantum-font">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-[#00F5FF]/30 rounded-xl text-white placeholder-gray-500 focus:border-[#FF00F5] focus:ring-1 focus:ring-[#FF00F5] transition-colors duration-300 disabled:opacity-50 hover:border-gray-500 quantum-font"
                        placeholder="john@example.com"
                        required
                        disabled={loading || !user}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 quantum-font">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-[#00F5FF]/30 rounded-xl text-white placeholder-gray-500 focus:border-[#FF00F5] focus:ring-1 focus:ring-[#FF00F5] transition-colors duration-300 disabled:opacity-50 hover:border-gray-500 quantum-font"
                        placeholder="+91 9876543210"
                        required
                        disabled={loading || !user}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 quantum-font">
                        {isQuantumResearch ? 'Institution/Organization' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-[#00F5FF]/30 rounded-xl text-white placeholder-gray-500 focus:border-[#FF00F5] focus:ring-1 focus:ring-[#FF00F5] transition-colors duration-300 disabled:opacity-50 hover:border-gray-500 quantum-font"
                        placeholder={isQuantumResearch ? "Your University/Research Institute" : "Your Company"}
                        disabled={loading || !user}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 quantum-font">
                      {isQuantumResearch ? 'Research Area of Interest' : 'Service Interested In'}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-[#00F5FF]/30 rounded-xl text-white focus:border-[#FF00F5] focus:ring-1 focus:ring-[#FF00F5] transition-colors duration-300 disabled:opacity-50 hover:border-gray-500 quantum-font"
                      disabled={loading || !user}
                    >
                      <option value="">{isQuantumResearch ? 'Select a research area' : 'Select a service'}</option>
                      {(isQuantumResearch ? quantumResearchAreas : services).map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 quantum-font">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-[#00F5FF]/30 rounded-xl text-white placeholder-gray-500 focus:border-[#FF00F5] focus:ring-1 focus:ring-[#FF00F5] transition-colors duration-300 resize-none disabled:opacity-50 hover:border-gray-500 quantum-font"
                      placeholder={isQuantumResearch 
                        ? "Tell us about your research interests, background, and how you'd like to contribute to our quantum research initiatives..."
                        : "Tell us about your project, goals, and how we can help you..."
                      }
                      required
                      disabled={loading || !user}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !user}
                    className="w-full bg-gradient-to-r from-[#00F5FF] to-[#FF00F5] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#FF00F5] hover:to-[#00F5FF] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-[#00F5FF]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none quantum-font"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : !user ? (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Login Required to Send Message</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>{isQuantumResearch ? 'Submit Research Inquiry' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Response Time */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="quantum-font">
                    {user 
                      ? (isQuantumResearch 
                          ? "Typical response time: 4-8 hours for research inquiries"
                          : "Typical response time: 2-4 hours for logged-in users"
                        )
                      : "Priority response for registered users"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-[#0A0A0A] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 quantum-font">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">
              {isQuantumResearch 
                ? 'Common questions about quantum research collaboration'
                : 'Common questions about our quantum AI automation services'
              }
            </p>
          </div>

          <div className="space-y-6">
            {(isQuantumResearch ? [
              {
                question: "What qualifications do I need to join the quantum research team?",
                answer: "We welcome researchers from diverse backgrounds including physics, computer science, mathematics, and engineering. While a strong foundation in quantum mechanics or related fields is beneficial, we also value enthusiasm, creativity, and willingness to learn. Both academic researchers and industry professionals are encouraged to apply."
              },
              {
                question: "What kind of research projects are currently active?",
                answer: "Our current research spans quantum computing algorithms, quantum machine learning, quantum information theory, quantum sensing applications, and the intersection of quantum physics with artificial intelligence. We're particularly interested in practical applications that could revolutionize technology and our understanding of intelligence."
              },
              {
                question: "Is this collaboration remote or do I need to be physically present?",
                answer: "We support both remote and in-person collaboration. Many of our research activities can be conducted remotely through virtual meetings, shared computational resources, and collaborative platforms. However, some experimental work may require physical presence at partner institutions."
              },
              {
                question: "How long are typical research collaborations?",
                answer: "Research collaborations vary in duration depending on the project scope and your availability. We offer short-term projects (3-6 months), medium-term collaborations (6-18 months), and long-term research partnerships (1+ years). We're flexible and can accommodate various commitment levels."
              }
            ] : [
              {
                question: "Why do I need to log in to submit the contact form?",
                answer: "Creating a free account allows us to provide you with personalized service, priority support, and custom quantum AI solution recommendations. It also helps us prevent spam and ensure we can follow up with you effectively about your specific needs."
              },
              {
                question: "How long does it take to develop a quantum AI solution?",
                answer: "Development time depends on your specific problem and requirements. Simple chatbots can be ready in 1-2 weeks, while complex quantum automation systems may take 3-6 weeks. We work efficiently to deliver your solution as fast as possible without compromising quality. During our consultation, we'll provide you with an accurate timeline based on your needs."
              },
              {
                question: "What types of quantum AI solutions do you specialize in?",
                answer: "We specialize in quantum AI chatbots, virtual assistants, process automation, and custom web tools. Our expertise includes natural language processing, workflow automation, API integrations, and creating intelligent systems that streamline business operations using quantum-inspired algorithms."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Yes! We offer comprehensive support packages including regular updates, performance monitoring, and feature enhancements. Most clients choose ongoing support to ensure their quantum AI solutions continue to evolve with their business needs."
              }
            ]).map((faq, index) => (
              <div key={index} className="quantum-card rounded-2xl p-6 hover:shadow-lg hover:shadow-[#00F5FF]/10 transition-all duration-300 quantum-wave" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-lg font-semibold text-white mb-3 quantum-font">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;