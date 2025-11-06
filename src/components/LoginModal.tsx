import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [resetCooldown, setResetCooldown] = useState(0);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const { signIn, signUp, resetPassword, signInWithGoogle } = useAuth();

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await signInWithGoogle();

      if (error) {
        console.error('Google sign in error:', error);
        if (error.message?.includes('OAuth')) {
          setMessage({ 
            type: 'error', 
            text: 'Google sign-in is not properly configured. Please contact support or try email login.' 
          });
        } else {
          setMessage({ 
            type: 'error', 
            text: 'Failed to sign in with Google. Please try again or use email login.' 
          });
        }
      }
      // Note: If successful, the user will be redirected to Google's OAuth page
      // and then back to our app, so we don't need to handle success here
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred with Google sign-in. Please try email login.' 
      });
    }

    setLoading(false);
  };

  // Cooldown timer for password reset
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resetCooldown > 0) {
      interval = setInterval(() => {
        setResetCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resetCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'reset') {
        // Check if user exists first
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        // Check if email exists in the system
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: 'test_password_check_user_exists_12345'
        });
        
        // If we get "Invalid login credentials", the user exists but password is wrong (which is expected)
        // If we get "User not found" or similar, the user doesn't exist
        if (error && !error.message?.includes('Invalid login credentials')) {
          if (error.message?.includes('User not found') || error.message?.includes('Email not found')) {
            setMessage({ 
              type: 'error', 
              text: 'No account found with this email address. Please check your email or sign up first.' 
            });
          } else {
            setMessage({ 
              type: 'error', 
              text: 'Please enter a valid email address.' 
            });
          }
        } else {
          // User exists, send password reset email
          console.log('User exists, sending password reset email...');
          
          const { error: resetError } = await resetPassword(formData.email);
          
          if (resetError) {
            console.error('Password reset error:', resetError);
            setMessage({ 
              type: 'error', 
              text: `Failed to send reset email: ${resetError.message}. Please try again or contact support.` 
            });
          } else {
            console.log('Password reset email sent successfully');
            setMessage({ 
              type: 'success', 
              text: 'Password reset email sent! Please check your email (including spam folder) for the reset link. The email should arrive within 2-3 minutes.' 
            });
            
            // Start countdown
            setResetCooldown(60);
          }
        }
      } else if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match' });
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          // Provide more user-friendly error messages for signup
          if (error.message?.includes('User already registered')) {
            setMessage({ 
              type: 'error', 
              text: 'An account with this email already exists. Please sign in instead.' 
            });
          } else if (error.message?.includes('Password should be at least')) {
            setMessage({ 
              type: 'error', 
              text: 'Password must be at least 6 characters long.' 
            });
          } else if (error.message?.includes('Unable to validate email address')) {
            setMessage({ 
              type: 'error', 
              text: 'Please enter a valid email address.' 
            });
          } else {
            setMessage({ 
              type: 'error', 
              text: `Sign up failed: ${error.message}. Please contact support if this continues.` 
            });
          }
        } else {
          setMessage({ 
            type: 'success', 
            text: 'Account created successfully! Please check your email (including spam folder) to verify your account.' 
          });
          setTimeout(() => {
            onClose();
            resetForm();
          }, 2000);
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          // Provide more user-friendly error messages
          if (error.message?.includes('Invalid login credentials')) {
            setMessage({ 
              type: 'error', 
              text: 'Invalid email or password. Please try again.' 
            });
          } else if (error.message?.includes('Email not confirmed')) {
            setMessage({ 
              type: 'error', 
              text: 'Please check your email and confirm your account before signing in.' 
            });
          } else if (error.message?.includes('Too many requests')) {
            setMessage({ 
              type: 'error', 
              text: 'Too many login attempts. Please wait a few minutes before trying again.' 
            });
          } else {
            setMessage({ 
              type: 'error', 
              text: `Sign in failed: ${error.message}. Please contact support if this continues.` 
            });
          }
        } else {
          setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
          setTimeout(() => {
            onClose();
            resetForm();
          }, 1500);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear message when user starts typing
    if (message) setMessage(null);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setMessage(null);
    setMode('login');
    setResetCooldown(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-3xl w-full max-w-md mx-auto my-8 transform transition-all duration-300 scale-100 shadow-2xl">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl"></div>
        
        {/* Scrollable content container */}
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6 sm:p-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 w-8 h-8 rounded-full hover:bg-gray-700/50 flex items-center justify-center z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Back button for reset mode */}
            {mode === 'reset' && (
              <button
                onClick={() => setMode('login')}
                className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors duration-300 w-8 h-8 rounded-full hover:bg-gray-700/50 flex items-center justify-center z-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Enhanced Header */}
            <div className="text-center mb-6 relative z-10 pt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-sm opacity-50"></div>
                <div className="relative">
                  {mode === 'reset' ? (
                    <Mail className="h-8 w-8 text-white" />
                  ) : (
                    <LogIn className="h-8 w-8 text-white" />
                  )}
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'signup' && 'Join Quantum AI'}
                {mode === 'reset' && 'Reset Password'}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {mode === 'login' && 'Sign in to your Quantum AI account'}
                {mode === 'signup' && 'Start your quantum AI journey today'}
                {mode === 'reset' && 'Enter your email to reset your password'}
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 relative z-10 text-sm ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <p className="leading-relaxed">{message.text}</p>
              </div>
            )}

            {/* Cooldown indicator */}
            {resetCooldown > 0 && mode === 'reset' && (
              <div className="mb-6 p-4 rounded-xl flex items-center space-x-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 relative z-10">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Please wait {resetCooldown} seconds before requesting another reset.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base"
                    placeholder="john@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {mode !== 'reset' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base"
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors duration-300"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base"
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-black/50" 
                      disabled={loading}
                    />
                    <span className="ml-2 text-gray-400">Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setMode('reset')}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Alternative Contact for Password Reset */}
              {mode === 'reset' && (
                <div className="mt-6 pt-6 border-t border-gray-700/50 relative z-10">
                  <p className="text-center text-sm text-gray-400 mb-4">Not receiving the email? Contact support:</p>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/919495516362?text=Hi%20Qubit%20Quantum%20AI%2C%20I%20need%20help%20resetting%20my%20password.%20My%20email%20is%3A%20[YOUR%20EMAIL%20HERE]"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 border border-green-500 rounded-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base text-white"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span>WhatsApp Support</span>
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (mode === 'reset' && resetCooldown > 0)}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>
                      {mode === 'login' && 'Signing In...'}
                      {mode === 'signup' && 'Creating Account...'}
                      {mode === 'reset' && 'Sending Email...'}
                    </span>
                  </div>
                ) : resetCooldown > 0 && mode === 'reset' ? (
                  `Wait ${resetCooldown}s`
                ) : (
                  <>
                    {mode === 'login' && 'Sign In to Quantum AI'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'reset' && 'Send Reset Email'}
                  </>
                )}
              </button>
            </form>

            {/* Toggle between login/signup */}
            {mode !== 'reset' && (
              <div className="text-center mt-4 sm:mt-6 relative z-10">
                <p className="text-gray-400 text-sm">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                    disabled={loading}
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            )}

            {/* Social login */}
            {mode !== 'reset' && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700/50 relative z-10">
                <p className="text-center text-sm text-gray-400 mb-4">Or continue with</p>
                <div className="space-y-3">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    disabled={loading}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;