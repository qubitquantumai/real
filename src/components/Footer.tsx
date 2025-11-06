import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook, Bot, Zap, Brain, Settings, Workflow, Target, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Company Info - AI Agency Focus */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                {/* Enhanced logo for footer */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl transform group-hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur-sm opacity-50"></div>
                  
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative">
                      <div className="w-7 h-7 relative">
                        {/* Central qubit core */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full"></div>
                        
                        {/* Quantum state indicators */}
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse"></div>
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse delay-600"></div>
                        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse delay-900"></div>
                        
                        {/* Quantum entanglement lines */}
                        <div className="absolute top-2 left-2 w-2.5 h-0.5 bg-gradient-to-r from-white to-transparent opacity-60"></div>
                        <div className="absolute top-2 right-2 w-2.5 h-0.5 bg-gradient-to-l from-white to-transparent opacity-60"></div>
                        <div className="absolute bottom-2 left-2 w-2.5 h-0.5 bg-gradient-to-r from-white to-transparent opacity-60"></div>
                        <div className="absolute bottom-2 right-2 w-2.5 h-0.5 bg-gradient-to-l from-white to-transparent opacity-60"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
              </div>
              
              {/* Brand name */}
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Qubit Quantum AI
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Leading quantum AI automation agency from Kerala, India, specializing in intelligent business solutions. 
              We transform operations through advanced AI agents, chatbots, and custom automation systems 
              that work 24/7 to grow your business globally.
            </p>
            
            {/* AI Services Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Bot, text: 'AI Chatbots' },
                { icon: Workflow, text: 'Process Automation' },
                { icon: Brain, text: 'AI Agents' },
                { icon: Target, text: 'Lead Generation' }
              ].map(({ icon: Icon, text }, index) => (
                <div key={text} className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Icon className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: 'https://x.com/Qubitquantumai', color: 'hover:text-blue-400' },
                { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61578175226895', color: 'hover:text-blue-600' },
                { icon: Instagram, href: 'https://www.instagram.com/qubitquantumai/', color: 'hover:text-pink-400' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/qubit-quantumai-0b444a373/', color: 'hover:text-blue-600' }
              ].map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-400 ${color} hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* AI Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">AI Solutions</h3>
            <ul className="space-y-3">
              {[
                { name: 'AI Chatbots', path: '/services' },
                { name: 'Virtual Assistants', path: '/services' },
                { name: 'Process Automation', path: '/services' },
                { name: 'Lead Generation', path: '/services' },
                { name: 'Custom AI Agents', path: '/services' },
                { name: 'Appointment Booking', path: '/services' }
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:qubitquantumai@gmail.com" className="hover:text-blue-400 transition-colors duration-300">qubitquantumai@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <div>
                    <a href="tel:+919495516362" className="hover:text-blue-400 transition-colors duration-300">+91 9495516362</a>
                    <p className="text-xs text-gray-500 mt-1">Mon-Sun 9AM-9PM IST</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-500/30 transition-colors duration-300">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <a 
                    href="https://wa.me/919495516362?text=Hey%20Qubit%20Quantum%20AI%2C%20I%20need%20help%20with%20AI%20automation%20solutions.%20Can%20you%20assist%20me%3F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors duration-300"
                  >
                    +91 94955 16362
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <span className="hover:text-blue-400 transition-colors duration-300">India</span>
                </div>
              </li>
            </ul>

            {/* AI Agency Badge */}
            <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-medium text-sm">Quantum AI Automation Agency</span>
              </div>
              <p className="text-gray-400 text-xs">
                Transforming businesses globally with intelligent quantum automation solutions from India since 2024
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">Qubit Quantum AI</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms of Service', path: '/terms-of-service' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;