import React from 'react';
import { Target, Users, Award, TrendingUp, Code, Zap, Brain, Shield, ArrowRight, CheckCircle, Clock, DollarSign, Star, BookOpen, Globe, Settings } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Users, value: '50+', label: 'Projects Completed' },
    { icon: Award, value: '30+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '300%', label: 'Average ROI Increase' },
    { icon: Target, value: '99.9%', label: 'Client Satisfaction' }
  ];

  const benefits = [
    { 
      icon: Clock, 
      title: 'Save 40+ Hours Weekly', 
      desc: 'Automate repetitive tasks and focus on what matters most - growing your business',
      highlight: '40+ Hours'
    },
    { 
      icon: DollarSign, 
      title: 'Reduce Costs by 60%', 
      desc: 'Cut operational expenses while increasing efficiency and productivity',
      highlight: '60% Savings'
    },
    { 
      icon: Zap, 
      title: '24/7 AI Operations', 
      desc: 'Never miss a customer inquiry or business opportunity again',
      highlight: '24/7 Available'
    },
    { 
      icon: TrendingUp, 
      title: 'Boost Revenue 3x', 
      desc: 'Generate more leads, close more deals, and scale faster than ever',
      highlight: '3x Growth'
    }
  ];

  const automationSolutions = [
    { icon: Brain, title: 'Smart AI Chatbots', desc: 'Handle customer queries instantly' },
    { icon: Code, title: 'Process Automation', desc: 'Streamline workflows automatically' },
    { icon: Zap, title: 'Lead Generation', desc: 'Capture and nurture prospects 24/7' },
    { icon: Shield, title: 'Virtual Assistants', desc: 'Manage tasks and appointments' },
    { icon: Settings, title: 'Custom Solutions', desc: 'Tailored automation for your needs' }
  ];

  const guarantees = [
    { icon: Shield, title: 'Money-Back Guarantee', desc: 'Full refund if automation doesn\'t work as promised' },
    { icon: Settings, title: 'Ongoing Support', desc: 'Continuous maintenance and error resolution' },
    { icon: Zap, title: 'Performance Guarantee', desc: 'We ensure your automation runs smoothly 24/7' }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About AutoFlow AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Discover the story behind AutoFlow AI and how we're revolutionizing business automation 
            with cutting-edge AI solutions that deliver real results.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Founded by <span className="text-blue-400">Devika Raj NR</span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  AutoFlow AI was born from a vision to make advanced automation and AI technology 
                  accessible to businesses of all sizes. With expertise in automation systems, 
                  Devika recognized that many businesses were struggling to implement effective automation 
                  solutions due to complexity and cost barriers.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  AutoFlow AI bridges this gap by providing custom, user-friendly automation and AI 
                  solutions that deliver immediate value while scaling with your business.
                </p>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Award className="h-6 w-6 text-blue-400 mr-3" />
                    Certified Make.com Expert
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    As a certified Make.com expert, Devika brings specialized knowledge in creating 
                    powerful automation workflows that transform business operations. Her expertise 
                    ensures the best solutions for every client's unique needs.
                  </p>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Our Mission</h4>
                  <p className="text-gray-300 leading-relaxed">
                    To democratize AI technology by making it accessible and beneficial for businesses 
                    of all sizes, helping them unlock human potential and drive meaningful outcomes.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Our Vision</h4>
                  <p className="text-gray-300 leading-relaxed">
                    To be the leading provider of intelligent automation solutions that empower 
                    businesses to achieve unprecedented efficiency and growth through AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Profile */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Devika Raj NR</h3>
                  <p className="text-blue-400 font-medium">Founder & Automation Expert</p>
                  <p className="text-gray-400 text-sm mt-2">India | Serving Clients Worldwide</p>
                </div>

                {/* Certification */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-white text-center mb-6">
                    Certification & Expertise
                  </h4>
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-400 text-sm">Certified Make.com Expert</h5>
                        <p className="text-xs text-gray-400">Advanced automation platform specialist</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-white text-center mb-6">
                    Our Guarantees
                  </h4>
                  {guarantees.map((guarantee, index) => (
                    <div key={guarantee.title} className="bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <guarantee.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-green-400 text-sm">{guarantee.title}</h5>
                          <p className="text-xs text-gray-400">{guarantee.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-600">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      100%
                    </div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-xs text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Stop Wasting Time on </span>
                  <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Repetitive Tasks
                  </span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-6">
                  What if you could automate 80% of your daily tasks and focus only on growing your business? 
                  Our AI-powered automation solutions make this reality for businesses just like yours.
                </p>
                
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    The Problem You're Facing Right Now:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Spending hours on manual data entry and repetitive tasks
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Missing leads because you can't respond 24/7
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      High operational costs eating into your profits
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      Unable to scale without hiring more staff
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Here's How We Solve It:
                  </span>
                </h3>
                
                {/* Automation Solutions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {automationSolutions.map((solution, index) => (
                    <div key={solution.title} className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <solution.icon className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-blue-400 text-sm">{solution.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400">{solution.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Guarantees Section */}
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-green-400 mr-2" />
                    Our Guarantees to You:
                  </h3>
                  <div className="space-y-3">
                    {guarantees.map((guarantee, index) => (
                      <div key={guarantee.title} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <guarantee.icon className="h-3 w-3 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-400 text-sm">{guarantee.title}</h4>
                          <p className="text-xs text-gray-400">{guarantee.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Ready to Transform Your Business?</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Join 30+ successful businesses that have already automated their operations and 
                    increased their revenue by an average of 300%.
                  </p>
                  <a
                    href="/book-consultation"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    ✓ 30-minute free consultation ✓ Custom solution roadmap ✓ ROI projection
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Benefits & Stats */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                {/* Benefits Grid */}
                <div className="space-y-6 mb-8">
                  <h3 className="text-xl font-bold text-white text-center mb-6">
                    What You'll Achieve:
                  </h3>
                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit.title}
                      className="group hover:scale-105 transition-transform duration-300 bg-gray-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-white text-sm">{benefit.title}</h4>
                            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold text-xs">
                
                              {benefit.highlight}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">{benefit.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center group hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex justify-center mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Urgency Section */}
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                  <h4 className="text-white font-semibold mb-2 text-sm">⚡ Limited Time Offer</h4>
                  <p className="text-gray-300 text-xs mb-3">
                    Get 50% off your first automation project when you book a consultation this month.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-gray-400">Free Setup</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-gray-400">30-Day Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how AutoFlow AI can transform your business with intelligent automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </a>
            <a
              href="/services"
              className="border border-gray-600 text-gray-300 hover:text-white hover:border-blue-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;