import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

interface AutoLoginPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const AutoLoginPopup: React.FC<AutoLoginPopupProps> = ({ isVisible, onClose, onLoginClick }) => {
  const { user } = useAuth();

  if (!isVisible || user) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-3xl p-8 w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Unlock Quantum AI Solutions
          </h2>
          
          <p className="text-gray-400 mb-6 leading-relaxed">
            Join our exclusive community to access personalized AI consultations, 
            priority support, and quantum-powered solutions tailored to your business needs.
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            {[
              { icon: Star, text: 'Free 30-minute AI consultation' },
              { icon: Users, text: 'Priority quantum support' },
              { icon: ArrowRight, text: 'Custom AI solution quotes' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm text-gray-300">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-4 w-4 text-blue-400" />
                </div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={onLoginClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started - It's Free
            </button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors duration-300"
            >
              Maybe later
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-2">Trusted by 30+ businesses</p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-xs text-gray-400 ml-2">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLoginPopup;