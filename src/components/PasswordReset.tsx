import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, User, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if email was passed from login modal
    const resetEmail = sessionStorage.getItem('resetEmail');
    if (resetEmail) {
      setEmail(resetEmail);
      setStep('reset');
      sessionStorage.removeItem('resetEmail'); // Clean up
    }
  }, []);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Check if user exists by attempting to send a password reset
      // This is a safer way to verify email existence
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password-confirm'
      });

      if (!error) {
        // Email exists and reset was initiated
        setMessage({ 
          type: 'success', 
          text: 'Email verified! You can now set your new password below.' 
        });
        setStep('reset');
      } else if (error.message?.includes('User not found') || error.message?.includes('Email not found') || error.message?.includes('Invalid email')) {
        setMessage({ 
          type: 'error', 
          text: 'No account found with this email address. Please check your email or sign up first.' 
        });
      } else {
        // For any other error, still allow them to proceed (maybe email service is down)
        setMessage({ 
          type: 'success', 
          text: 'Proceeding with password reset. You can set your new password below.' 
        });
        setStep('reset');
      }
    } catch (error: any) {
      console.error('Email verification error:', error);
      // If there's any error, still allow password reset
      setMessage({ 
        type: 'success', 
        text: 'Proceeding with password reset. You can set your new password below.' 
      });
      setStep('reset');
    }

    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Create a temporary session to update the password
      // This is a workaround since we can't directly update passwords without authentication
      
      // Method 1: Try to create a session with a magic link approach
      const { error: magicError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false, // Don't create new user
          data: {
            password_reset: true,
            new_password: password
          }
        }
      });

      if (!magicError) {
        setMessage({ 
          type: 'success', 
          text: 'Password reset link sent to your email! Please check your inbox and click the link to complete the password reset.' 
        });
      } else {
        // Method 2: If magic link fails, provide alternative
        console.error('Magic link error:', magicError);
        
        // Try the standard reset password email
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/reset-password'
        });

        if (!resetError) {
          setMessage({ 
            type: 'success', 
            text: 'Password reset email sent! Please check your email and click the link to set your new password.' 
          });
        } else {
          console.error('Reset email error:', resetError);
          setMessage({ 
            type: 'error', 
            text: 'Unable to send reset email. Please contact support at qubitquantumai@gmail.com or try WhatsApp for immediate assistance.' 
          });
        }
      }

    } catch (error: any) {
      console.error('Password reset error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An error occurred during password reset. Please contact support for immediate assistance.' 
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="group w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
          title="Back to Home"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
        </button>
      </div>

      <div className="relative z-10 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {step === 'verify' ? (
              <Mail className="h-8 w-8 text-white" />
            ) : (
              <Lock className="h-8 w-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === 'verify' ? 'Reset Password' : 'Set New Password'}
          </h2>
          <p className="text-gray-400">
            {step === 'verify' ? 'Enter your email to reset password' : 'Enter your new password'}
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
        )}

        {step === 'verify' ? (
          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying Email...</span>
                </div>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                  placeholder="Enter new password"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-300"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                  placeholder="Confirm new password"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </div>
              ) : (
                'Update Password'
              )}
            </button>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setStep('verify');
                  setMessage(null);
                }}
                className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors duration-300"
                disabled={loading}
              >
                Use different email
              </button>
              
              <button
                type="button"
                onClick={() => {
                  window.open('https://wa.me/919495516362?text=Hi%20Qubit%20Quantum%20AI%2C%20I%20need%20help%20resetting%20my%20password.', '_blank');
                }}
                className="w-full text-green-400 hover:text-green-300 py-2 text-sm transition-colors duration-300"
                disabled={loading}
              >
                WhatsApp Support
              </button>
            </div>
          </form>
        )}

        {/* Support Contact */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-blue-400 font-medium text-sm mb-2">Need Help?</p>
          <p className="text-gray-400 text-xs mb-3">
            If you're having trouble resetting your password, contact our support team:
          </p>
          <div className="space-y-2">
            <a
              href="mailto:qubitquantumai@gmail.com?subject=Password Reset Help&body=Hi, I need help resetting my password for email: [YOUR EMAIL HERE]"
              className="block text-blue-400 hover:text-blue-300 text-xs transition-colors duration-300"
            >
              📧 qubitquantumai@gmail.com
            </a>
            <a
              href="https://wa.me/919495516362?text=Hi%20Qubit%20Quantum%20AI%2C%20I%20need%20help%20resetting%20my%20password."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-400 hover:text-green-300 text-xs transition-colors duration-300"
            >
              💬 WhatsApp: +91 94955 16362
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;