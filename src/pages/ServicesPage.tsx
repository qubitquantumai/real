import React from 'react';
import { Bot, MessageSquare, Workflow, BarChart3, Shield, Cpu, Zap, Users, Clock, CheckCircle, Calendar, Target, TrendingUp, Settings, ArrowRight, Crown, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../components/ui/gradient-button';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: Workflow,
      title: 'Advanced Automation',
      description: 'Streamline your business processes with intelligent automation that reduces manual work by up to 80% and increases operational efficiency.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Workflow automation', 'Document processing', 'Data integration', 'Task scheduling', 'Custom scripts'],
      popular: false
    },
    {
      icon: Target,
      title: 'Lead Generation System',
      description: 'Advanced lead generation systems that identify, qualify, and nurture potential customers automatically, increasing conversion rates by 250%.',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Lead identification', 'Automated nurturing', 'CRM integration', 'Performance analytics', 'Conversion optimization'],
      popular: true
    },
    {
      icon: Bot,
      title: 'AI Agent Development',
      description: 'Intelligent AI agents that handle complex tasks, customer interactions, and business processes with human-like intelligence.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Natural language processing', 'Multi-platform integration', 'Learning capabilities', 'Custom training', 'Real-time responses'],
      popular: false
    },
    {
      icon: MessageSquare,
      title: 'Content Creation System',
      description: 'AI-powered content generation systems that create high-quality, engaging content automatically, saving hours of manual work.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Automated content generation', 'Brand voice consistency', 'Multi-format support', 'Quality assurance', 'Content optimization'],
      popular: false
    },
    {
      icon: Calendar,
      title: 'Appointment Booking',
      description: 'Intelligent appointment booking systems that manage schedules, reduce no-shows by 60%, and enhance customer experience.',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Automated scheduling', 'Calendar sync', 'Smart reminders', 'Payment integration', 'Analytics dashboard'],
      popular: false
    },
    {
      icon: Settings,
      title: 'Custom AI Solutions',
      description: 'Bespoke automation and AI solutions tailored specifically to your unique business requirements and workflows.',
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Requirement analysis', 'Custom development', 'System integration', 'Ongoing support', 'Performance optimization'],
      popular: false
    }
  ];

  const benefits = [
    { icon: Clock, title: '24/7 Availability', desc: 'AI solutions work around the clock' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Instant responses and processing' },
    { icon: Users, title: 'Scalable', desc: 'Grows with your business needs' },
    { icon: CheckCircle, title: 'Reliable', desc: '99.9% uptime guarantee' }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$100',
      period: '/month',
      description: 'Perfect for small businesses getting started with AI automation',
      features: [
        'Basic AI Chatbot',
        'Email Support',
        'Up to 1,000 conversations/month',
        'Basic Analytics',
        'Standard Integration',
        '1 Automation Workflow'
      ],
      icon: Zap,
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      price: '$250',
      period: '/month',
      description: 'Ideal for growing businesses with advanced automation needs',
      features: [
        'Advanced AI Solutions',
        'Priority Support',
        'Up to 10,000 conversations/month',
        'Advanced Analytics',
        'Custom Integrations',
        'Process Automation',
        'Lead Generation Tools',
        '5 Automation Workflows'
      ],
      icon: Star,
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for enterprise-level requirements',
      features: [
        'Fully Custom AI Solutions',
        'Dedicated Support Manager',
        'Unlimited Usage',
        'Custom Analytics Dashboard',
        'Enterprise Integrations',
        'Advanced Automation',
        'White-label Solutions',
        'Unlimited Workflows',
        'On-premise Deployment'
      ],
      icon: Crown,
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Services
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Transform your business with our comprehensive AI solutions. From advanced automation to custom AI agents, 
            we provide cutting-edge technology that drives growth and efficiency.
          </p>
          
          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title} 
                className="group text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:rotate-12">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from our range of AI-powered solutions designed to meet your specific business needs.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Service Image */}
                <div className="flex-1 relative">
                  {service.popular && (
                    <div className="absolute -top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="relative overflow-hidden rounded-2xl group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-blue-900/20 transition-all duration-500"></div>
                    
                    {/* Icon overlay with glow */}
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{service.description}</p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-6">
                    <GradientButton variant="secondary" asChild className="hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
                      <Link to="/contact" className="inline-flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Learn More</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-32 right-32 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-32 left-32 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Select the perfect plan for your business needs and start transforming your operations with AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`group relative bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/20 ${
                  plan.popular ? 'border-blue-500/50 ring-2 ring-blue-500/20 scale-105' : 'border-gray-700 hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                  </div>
                  
                  <div className="flex items-baseline">
                    <span className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                        <div className={`w-4 h-4 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <GradientButton 
                    variant={plan.popular ? "autoflow" : "secondary"} 
                    className="w-full mt-6 group-hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:shadow-blue-500/25"
                    asChild
                  >
                    <Link to="/book-consultation">
                      {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                    </Link>
                  </GradientButton>
                </div>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-full hover:bg-green-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Shield className="h-5 w-5" />
              <span className="font-medium">30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how our AI solutions can help you achieve your goals and drive unprecedented growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton variant="autoflow" asChild className="hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
              <Link to="/book-consultation" className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Schedule Consultation</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </GradientButton>
            <GradientButton variant="secondary" asChild className="hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300">
              <Link to="/portfolio" className="flex items-center space-x-2">
                <span>View Portfolio</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;