import React from 'react';
import { Target, Users, Award, TrendingUp, Code, Zap, Brain, Shield, ArrowRight, CheckCircle, Clock, DollarSign, Star, BookOpen, Globe, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientButton } from './ui/gradient-button';

const About: React.FC = () => {
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
      title: '24/7 Quantum AI Operations', 
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
    { icon: Brain, title: 'Smart Quantum AI Chatbots', desc: 'Handle customer queries instantly with quantum intelligence' },
    { icon: Code, title: 'Quantum Process Automation', desc: 'Streamline workflows automatically with quantum efficiency' },
    { icon: Zap, title: 'Quantum Lead Generation', desc: 'Capture and nurture prospects 24/7 with quantum precision' },
    { icon: Shield, title: 'Quantum Virtual Assistants', desc: 'Manage tasks and appointments with quantum intelligence' },
    { icon: Settings, title: 'Custom Quantum Solutions', desc: 'Tailored quantum automation for your unique needs' }
  ];

  const guarantees = [
    { icon: Shield, title: 'Money-Back Guarantee', desc: 'Full refund if quantum automation doesn\'t work as promised' },
    { icon: Settings, title: 'Ongoing Support', desc: 'Continuous maintenance and error resolution' },
    { icon: Zap, title: 'Performance Guarantee', desc: 'We ensure your quantum automation runs smoothly 24/7' }
  ];

  return (
    <section id="about" className="py-32 bg-black">
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Lead Capturing Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center">
          {/* Left side - Hook Content with reduced text sizes */}
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Stop Wasting Time on </span>
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Repetitive Tasks
                </span>
              </h2>
              <p className="text-lg lg:text-xl xl:text-2xl text-gray-400 leading-relaxed mb-8">
                What if you could automate 80% of your daily tasks and focus only on growing your business? 
                Our quantum-inspired AI solutions make this reality for businesses just like yours.
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-6 mb-8 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                  The Problem You're Facing Right Now:
                </h3>
                <ul className="space-y-3 text-gray-300 text-base lg:text-lg">
                  <li className="flex items-start hover:text-white transition-colors duration-300">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    Spending hours on manual data entry and repetitive tasks
                  </li>
                  <li className="flex items-start hover:text-white transition-colors duration-300">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    Missing leads because you can't respond 24/7
                  </li>
                  <li className="flex items-start hover:text-white transition-colors duration-300">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    High operational costs eating into your profits
                  </li>
                  <li className="flex items-start hover:text-white transition-colors duration-300">
                    <span className="text-red-400 mr-3 text-lg">•</span>
                    Unable to scale without hiring more staff
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Here's How Qubit Quantum AI Solves It:
                </span>
              </h3>
              
              {/* Automation Solutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {automationSolutions.map((solution, index) => (
                  <div key={solution.title} className="bg-gray-900/50 border border-gray-700 rounded-2xl p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group hover:scale-105">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                        <solution.icon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-blue-400 text-base group-hover:text-blue-300 transition-colors duration-300">{solution.title}</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{solution.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-4">Ready to Transform Your Business with Quantum AI?</h3>
                <p className="text-gray-300 mb-6 text-base lg:text-lg">
                  Join 30+ successful businesses that have already automated their operations with Qubit Quantum AI and 
                  increased their revenue by an average of 300%.
                </p>
                <GradientButton variant="autoflow" asChild className="w-full text-lg py-4 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
                  <Link
                    to="/book-consultation"
                    className="flex items-center justify-center space-x-3"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </GradientButton>
                <p className="text-sm text-gray-400 text-center mt-3">
                  ✓ 30-minute free consultation ✓ Custom quantum solution roadmap ✓ ROI projection
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Benefits & Stats */}
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 xl:p-10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              {/* Benefits Grid */}
              <div className="space-y-6 mb-10">
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center mb-6">
                  What You'll Achieve with Qubit Quantum AI:
                </h3>
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="group hover:scale-105 transition-transform duration-300 bg-gray-800/50 rounded-2xl p-5 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-white text-base lg:text-lg group-hover:text-blue-400 transition-colors duration-300">{benefit.title}</h4>
                          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold text-sm">
                            {benefit.highlight}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{benefit.desc}</p>
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
                    className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400 group-hover:text-blue-400 transition-colors duration-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Urgency Section */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                <h4 className="text-white font-semibold mb-3 text-base">⚡ Limited Time Offer</h4>
                <p className="text-gray-300 mb-4 text-sm lg:text-base">
                  Get 50% off your first quantum automation project when you book a consultation this month.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400">Free Setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400">30-Day Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;