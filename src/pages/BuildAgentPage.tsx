import React, { useState } from 'react';
import { ArrowLeft, X, Bot, MessageSquare, Workflow, Calendar, Target, Settings, CheckCircle, ArrowRight, Zap, Brain, Users, Mail, Phone, FileText, Send, LogIn, Lock, AlertCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { GradientButton } from '../components/ui/gradient-button';

interface FormData {
  category: string;
  agentType: string;
  agentName: string;
  niche: string;
  customNiche: string;
  name: string;
  email: string;
  whatsapp: string;
  description: string;
}

const BuildAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    agentType: '',
    agentName: '',
    niche: '',
    customNiche: '',
    name: '',
    email: '',
    whatsapp: '',
    description: ''
  });

  const categories = [
    {
      id: 'automation',
      icon: Workflow,
      title: 'Automation',
      description: 'Streamline processes and automate repetitive tasks',
      features: ['Process Automation', 'Workflow Management', 'Task Scheduling', 'Data Processing']
    },
    {
      id: 'agent',
      icon: Bot,
      title: 'AI Agent',
      description: 'Intelligent agents that interact and make decisions',
      features: ['Conversational AI', 'Decision Making', 'Learning Capabilities', 'Multi-platform Integration']
    }
  ];

  const automationTypes = [
    {
      id: 'workflow-automation',
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Automate business processes and workflows',
      features: ['Process Mapping', 'Task Automation', 'Data Flow Management']
    },
    {
      id: 'data-processing',
      icon: FileText,
      title: 'Data Processing',
      description: 'Automated data collection, processing, and analysis',
      features: ['Data Collection', 'Processing Pipelines', 'Report Generation']
    },
    {
      id: 'email-automation',
      icon: Mail,
      title: 'Email Automation',
      description: 'Automated email campaigns and responses',
      features: ['Email Sequences', 'Auto-responses', 'Campaign Management']
    }
  ];

  const agentTypes = [
    {
      id: 'chatbot',
      icon: MessageSquare,
      title: 'AI Chatbot',
      description: 'Intelligent conversational agent for customer support',
      features: ['24/7 Support', 'Natural Language', 'Multi-platform']
    },
    {
      id: 'lead-generator',
      icon: Target,
      title: 'Lead Generation Agent',
      description: 'Capture, qualify, and nurture leads automatically',
      features: ['Lead Qualification', 'Automated Follow-up', 'CRM Integration']
    },
    {
      id: 'appointment-booking',
      icon: Calendar,
      title: 'Appointment Booking',
      description: 'Intelligent scheduling and appointment management',
      features: ['Smart Scheduling', 'Calendar Sync', 'Automated Reminders']
    },
    {
      id: 'virtual-assistant',
      icon: Bot,
      title: 'Virtual Assistant',
      description: 'AI-powered assistant for various business tasks',
      features: ['Task Management', 'Email Handling', 'Data Analysis']
    },
    {
      id: 'custom',
      icon: Settings,
      title: 'Custom Solution',
      description: 'Tailored solution for your specific needs',
      features: ['Custom Development', 'Unique Requirements', 'Specialized Features']
    }
  ];

  const steps = [
    {
      title: 'Welcome',
      subtitle: 'Let\'s build your perfect AI solution'
    },
    {
      title: 'Choose Category',
      subtitle: 'What type of solution do you need?'
    },
    {
      title: 'Select Type',
      subtitle: 'Choose your specific solution type'
    },
    {
      title: 'Name Your Solution',
      subtitle: 'Give your solution a memorable name'
    },
    {
      title: 'Select Niche',
      subtitle: 'What industry or area will this serve?'
    },
    {
      title: 'Personal Information',
      subtitle: 'Tell us about yourself'
    },
    {
      title: 'Contact Information',
      subtitle: 'How can we reach you?'
    },
    {
      title: 'Solution Details',
      subtitle: 'Describe your requirements'
    },
    {
      title: 'Complete',
      subtitle: 'Ready to bring your solution to life!'
    }
  ];

  const niches = [
    'E-commerce', 'Healthcare', 'Real Estate', 'Education', 'Finance', 
    'Marketing', 'SaaS', 'Consulting', 'Restaurant', 'Fitness', 
    'Legal', 'Travel', 'Technology', 'Manufacturing', 'Other'
  ];

  // Check if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navigation */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={() => navigate('/')}
            className="group w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-300 transform hover:scale-105"
            title="Go Home"
          >
            <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Please log in to access the Build Agent feature. This helps us provide you with personalized service and save your preferences.
          </p>
          <GradientButton variant="autoflow" onClick={() => window.dispatchEvent(new CustomEvent('openLoginModal'))} className="w-full">
            <div className="flex items-center justify-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Login to Continue</span>
            </div>
          </GradientButton>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category, agentType: '' }); // Reset agent type when category changes
    handleNext();
  };

  const handleTypeSelect = (agentType: string) => {
    setFormData({ ...formData, agentType });
    handleNext();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNicheSelect = (niche: string) => {
    setFormData({ ...formData, niche, customNiche: '' });
    if (niche !== 'Other') {
      setTimeout(handleNext, 300);
    }
  };

  const handleSubmitRequest = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const requestData = {
        user_id: user.id,
        category: formData.category,
        agent_type: formData.agentType,
        agent_name: formData.agentName,
        niche: formData.niche === 'Other' ? formData.customNiche : formData.niche,
        custom_niche: formData.niche === 'Other' ? formData.customNiche : null,
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        description: formData.description
      };

      const { error } = await supabase
        .from('agent_requests')
        .insert([requestData]);

      if (error) {
        console.error('Supabase error:', error);
        setMessage({ 
          type: 'error', 
          text: 'Failed to submit your request. Please try again.' 
        });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Your request has been submitted successfully!' 
        });
        handleNext();
      }
    } catch (error: any) {
      console.error('Error submitting request:', error);
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
    }

    setLoading(false);
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/autoflowai525/30min', '_blank');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 3: return formData.agentName.trim() !== '';
      case 4: return formData.niche !== '' && (formData.niche !== 'Other' || formData.customNiche.trim() !== '');
      case 5: return formData.name.trim() !== '';
      case 6: return formData.email.trim() !== '' && formData.whatsapp.trim() !== '';
      case 7: return formData.description.trim() !== '';
      default: return true;
    }
  };

  // Pre-fill user data if available
  React.useEffect(() => {
    if (user && !formData.email && !formData.name) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.name || user.user_metadata?.display_name || '',
        email: user.email || ''
      }));
    }
  }, [user, formData.email, formData.name]);

  const getCurrentTypes = () => {
    return formData.category === 'automation' ? automationTypes : agentTypes;
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50 flex space-x-3">
        <button
          onClick={currentStep > 0 ? handleBack : handleGoBack}
          className="group w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
          title={currentStep > 0 ? "Previous Step" : "Go Back"}
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

      {/* Progress Bar */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl px-6 py-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Step {currentStep + 1} of {steps.length}</span>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto w-full">
          
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-12 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl transform -rotate-12 animate-pulse delay-500"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Bot className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Build Your AI Solution
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Welcome! Let's create a powerful AI solution tailored to your business needs. 
                This will only take a few minutes and help us understand exactly what you're looking for.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: Zap, title: 'Quick Setup', desc: 'Just 5 minutes to complete' },
                  { icon: Brain, title: 'Smart Matching', desc: 'AI-powered recommendations' },
                  { icon: Users, title: 'Expert Support', desc: 'Dedicated team assistance' }
                ].map((feature, index) => (
                  <div key={feature.title} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <GradientButton variant="autoflow" onClick={handleNext} className="px-8 py-4 text-lg mt-8">
                <div className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </GradientButton>
            </div>
          )}

          {/* Step 1: Choose Category */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-3 text-center text-xl group-hover:text-blue-400 transition-colors duration-300">{category.title}</h3>
                    <p className="text-gray-400 text-center mb-4">{category.description}</p>
                    <ul className="space-y-2">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Type */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentTypes().map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <type.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-center group-hover:text-blue-400 transition-colors duration-300">{type.title}</h3>
                    <p className="text-gray-400 text-sm text-center mb-4">{type.description}</p>
                    <ul className="space-y-1">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-500">
                          <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Name Your Solution */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <label className="block text-lg font-medium text-gray-300 mb-4">
                  {formData.category === 'automation' ? 'Automation Name' : 'Agent Name'}
                </label>
                <input
                  type="text"
                  value={formData.agentName}
                  onChange={(e) => handleInputChange('agentName', e.target.value)}
                  placeholder={formData.category === 'automation' ? 
                    "e.g., Email Automation Pro, Data Processor, Workflow Manager..." : 
                    "e.g., SalesBot Pro, CustomerCare AI, LeadMagnet..."
                  }
                  className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-lg"
                />
                <p className="text-gray-500 text-sm mt-2">Choose a name that reflects your solution's purpose</p>
              </div>

              {canProceed() && (
                <div className="text-center">
                  <GradientButton variant="autoflow" onClick={handleNext} className="px-8 py-4 text-lg">
                    <div className="flex items-center space-x-2">
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </GradientButton>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Select Niche */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {niches.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => handleNicheSelect(niche)}
                    className={`p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                      formData.niche === niche
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-blue-500/50 hover:bg-gray-700/50'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>

              {/* Custom Niche Input */}
              {formData.niche === 'Other' && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                    <label className="block text-lg font-medium text-gray-300 mb-4">
                      Please specify your niche:
                    </label>
                    <input
                      type="text"
                      value={formData.customNiche}
                      onChange={(e) => handleInputChange('customNiche', e.target.value)}
                      placeholder="e.g., Pet Care, Agriculture, Non-profit..."
                      className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-lg"
                    />
                  </div>

                  {canProceed() && (
                    <div className="text-center mt-6">
                      <GradientButton variant="autoflow" onClick={handleNext} className="px-8 py-4 text-lg">
                        <div className="flex items-center space-x-2">
                          <span>Continue</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </GradientButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Personal Information */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <label className="block text-lg font-medium text-gray-300 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-lg"
                />
                <p className="text-gray-500 text-sm mt-2">This helps us personalize your experience</p>
              </div>

              {canProceed() && (
                <div className="text-center">
                  <GradientButton variant="autoflow" onClick={handleNext} className="px-8 py-4 text-lg">
                    <div className="flex items-center space-x-2">
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </GradientButton>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Contact Information */}
          {currentStep === 6 && (
            <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-3 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-3 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-400" />
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-lg"
                  />
                </div>
              </div>

              {canProceed() && (
                <div className="text-center">
                  <GradientButton variant="autoflow" onClick={handleNext} className="px-8 py-4 text-lg">
                    <div className="flex items-center space-x-2">
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </GradientButton>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Solution Details */}
          {currentStep === 7 && (
            <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-xl flex items-center space-x-3 ${
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

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <label className="block text-lg font-medium text-gray-300 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-400" />
                  Describe Your Requirements
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your specific requirements, goals, and how you envision this solution helping your business..."
                  rows={6}
                  className="w-full px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-lg resize-none"
                />
                <p className="text-gray-500 text-sm mt-2">The more details you provide, the better we can customize your solution</p>
              </div>

              {canProceed() && (
                <div className="text-center">
                  <GradientButton 
                    variant="autoflow" 
                    onClick={handleSubmitRequest} 
                    className="px-8 py-4 text-lg"
                    disabled={loading}
                  >
                    <div className="flex items-center space-x-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </div>
                  </GradientButton>
                </div>
              )}
            </div>
          )}

          {/* Step 8: Complete */}
          {currentStep === 8 && (
            <div className="space-y-8 animate-fade-in text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl transform rotate-12 animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <CheckCircle className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Request Submitted Successfully!
                </span>
              </h2>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">Your Solution Summary:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white font-medium capitalize">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white font-medium">{getCurrentTypes().find(t => t.id === formData.agentType)?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Solution Name:</span>
                    <span className="text-white font-medium">{formData.agentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Niche:</span>
                    <span className="text-white font-medium">{formData.niche === 'Other' ? formData.customNiche : formData.niche}</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Excellent! We'll review your request and get back to you soon with a personalized solution. 
                For further details and to discuss your requirements, book a free consultation call.
              </p>

              <div className="space-y-4">
                <GradientButton variant="autoflow" onClick={handleBookCall} className="px-8 py-4 text-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Book Free Consultation</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </GradientButton>
                
                <p className="text-sm text-gray-500">
                  ✓ Free 30-minute consultation ✓ Custom solution roadmap ✓ Pricing discussion
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildAgentPage;