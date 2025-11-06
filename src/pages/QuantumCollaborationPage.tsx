import React, { useState } from 'react';
import { ArrowLeft, X, Atom, Brain, Microscope, Zap, Calendar, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, LogIn, Lock, Star, Target, Beaker, Cpu, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { GradientButton } from '../components/ui/gradient-button';

const QuantumCollaborationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    researchArea: '',
    experience: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const researchAreas = [
    'Quantum Computing',
    'Quantum Machine Learning',
    'Quantum Information Theory',
    'Quantum Sensing',
    'Quantum AI & Physics Integration',
    'Quantum Consciousness Studies',
    'Quantum Cryptography',
    'Quantum Optics',
    'Other Research Area'
  ];

  const experienceLevels = [
    'Undergraduate Student',
    'Graduate Student (Masters)',
    'PhD Student',
    'Postdoctoral Researcher',
    'Assistant Professor',
    'Associate Professor',
    'Full Professor',
    'Industry Researcher',
    'Independent Researcher',
    'Enthusiast/Self-taught'
  ];

  const handleBookConsultation = () => {
    window.open('https://calendly.com/autoflowai525/30min', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage({ 
        type: 'error', 
        text: 'Please log in to submit your research collaboration request.' 
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            company: formData.institution.trim() || null,
            message: `QUANTUM RESEARCH COLLABORATION REQUEST\n\nResearch Area: ${formData.researchArea}\nExperience Level: ${formData.experience}\nInstitution: ${formData.institution}\n\nMessage:\n${formData.message.trim()}`,
            service: 'Quantum Research Collaboration',
            user_id: user.id,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        setMessage({ 
          type: 'error', 
          text: 'Failed to send research collaboration request. Please try again or contact us directly.' 
        });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Thank you for your interest in quantum research collaboration! We\'ll review your application and get back to you within 24-48 hours to discuss potential opportunities.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          institution: '',
          researchArea: '',
          experience: '',
          message: ''
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
    if (message) setMessage(null);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
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
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Quantum Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Quantum Particles */}
        <div className="absolute top-32 right-32 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-64 left-64 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-64 right-64 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-1300"></div>
      </div>

      {/* Navigation */}
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quantum Research Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8 animate-pulse">
              <Atom className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Quantum Research Collaboration</span>
              <Microscope className="h-6 w-6 text-purple-400" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join Our Quantum
              </span>
              <br />
              <span className="text-white">Research Initiative</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're expanding our research on quantum physics and AI integration. 
              Join our team to study and research at the cutting edge of quantum science.
            </p>

            {/* Research Focus Areas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Atom, title: 'Quantum Computing', desc: 'Next-gen algorithms' },
                { icon: Brain, title: 'Quantum AI', desc: 'Intelligence fusion' },
                { icon: Microscope, title: 'Quantum Sensing', desc: 'Precision measurement' },
                { icon: Database, title: 'Information Theory', desc: 'Data foundations' }
              ].map((area, index) => (
                <div
                  key={area.title}
                  className="group text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:rotate-12">
                    <area.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{area.title}</h3>
                  <p className="text-sm text-gray-400">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration Form Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Research Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Research Collaboration Opportunities</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    We're looking for passionate researchers, students, and academics to join our quantum research initiatives. 
                    Whether you're exploring quantum consciousness, developing quantum algorithms, or investigating the intersection 
                    of quantum physics and artificial intelligence, we want to collaborate with you.
                  </p>
                </div>

                {/* What We Offer */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Star className="h-6 w-6 text-blue-400 mr-3" />
                    What We Offer
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Access to cutting-edge quantum research resources',
                      'Collaboration with leading quantum physicists and AI researchers',
                      'Opportunity to publish in top-tier scientific journals',
                      'Flexible remote and in-person collaboration options',
                      'Research funding and computational resources',
                      'Mentorship and career development support'
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  {[
                    { 
                      icon: Mail, 
                      title: 'Research Inquiries', 
                      info: 'quantum_ai_outlook.com', 
                      desc: 'Send research proposals and collaboration ideas'
                    },
                    { 
                      icon: Phone, 
                      title: 'Direct Contact', 
                      info: '+91 9495516362', 
                      desc: 'Available for research discussions Mon-Fri 9am-6pm IST'
                    },
                    { 
                      icon: Calendar, 
                      title: 'Schedule Research Discussion', 
                      info: 'Book a consultation', 
                      desc: 'Free 30-minute research collaboration discussion'
                    }
                  ].map((contact, index) => (
                    <div
                      key={contact.title}
                      className="flex items-start space-x-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                        <contact.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">{contact.title}</h3>
                        <p className="text-blue-400 font-medium mb-1">{contact.info}</p>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{contact.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Consultation CTA */}
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Calendar className="h-6 w-6 text-green-400 mr-3" />
                    Schedule Research Discussion
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Book a free 30-minute consultation to discuss your research interests and explore collaboration opportunities.
                  </p>
                  <GradientButton 
                    variant="autoflow" 
                    onClick={handleBookConsultation}
                    className="w-full hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Book Research Discussion</span>
                    </div>
                  </GradientButton>
                </div>
              </div>

              {/* Collaboration Form */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
                
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Research Collaboration Application</h3>
                    <p className="text-gray-400">
                      {user 
                        ? "Fill out the form below to apply for quantum research collaboration opportunities."
                        : "Please log in first to submit your research collaboration application."
                      }
                    </p>
                  </div>

                  {/* Login Required Notice */}
                  {!user && (
                    <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center space-x-3 hover:bg-blue-500/20 transition-colors duration-300">
                      <LogIn className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-blue-400 font-medium text-sm">Login Required</p>
                        <p className="text-gray-400 text-sm">
                          Create a free account to submit your research collaboration application and receive priority consideration.
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
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 hover:border-gray-500"
                          placeholder="Dr. Jane Smith"
                          required
                          disabled={loading || !user}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 hover:border-gray-500"
                          placeholder="jane.smith@university.edu"
                          required
                          disabled={loading || !user}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 hover:border-gray-500"
                          placeholder="+1 (555) 123-4567"
                          disabled={loading || !user}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Institution/Organization
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 hover:border-gray-500"
                          placeholder="MIT, Stanford, etc."
                          disabled={loading || !user}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Primary Research Area
                        </label>
                        <select
                          name="researchArea"
                          value={formData.researchArea}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 hover:border-gray-500"
                          disabled={loading || !user}
                        >
                          <option value="">Select research area</option>
                          {researchAreas.map((area) => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Experience Level
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 hover:border-gray-500"
                          disabled={loading || !user}
                        >
                          <option value="">Select experience level</option>
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Research Interests & Collaboration Goals *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 resize-none disabled:opacity-50 hover:border-gray-500"
                        placeholder="Describe your research interests, current projects, publications, and how you'd like to contribute to our quantum research initiatives. Include any specific areas of quantum physics or AI integration you're passionate about..."
                        required
                        disabled={loading || !user}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !user}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting Application...</span>
                        </>
                      ) : !user ? (
                        <>
                          <Lock className="h-5 w-5" />
                          <span>Login Required to Apply</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit Research Application</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Response Time */}
                  <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>
                      {user 
                        ? "Application review time: 24-48 hours for research collaborations"
                        : "Priority review for registered researchers"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuantumCollaborationPage;