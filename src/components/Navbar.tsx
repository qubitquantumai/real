import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User, LogOut, Atom } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { GradientButton } from './ui/gradient-button';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user?.user_metadata?.display_name) {
      return user.user_metadata.display_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Quantum-inspired logo for Qubit Quantum AI */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl transform group-hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                
                {/* Qubit symbol */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="w-6 h-6 relative">
                      {/* Central qubit core */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                      
                      {/* Quantum state indicators */}
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/80 rounded-full animate-pulse delay-200"></div>
                      <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full animate-pulse delay-400"></div>
                      <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-white/80 rounded-full animate-pulse delay-600"></div>
                      
                      {/* Quantum entanglement lines */}
                      <div className="absolute top-1.5 left-1.5 w-3 h-0.5 bg-gradient-to-r from-white to-transparent opacity-60 rotate-45"></div>
                      <div className="absolute top-1.5 right-1.5 w-3 h-0.5 bg-gradient-to-l from-white to-transparent opacity-60 -rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Outer quantum field */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
            </div>
            
            {/* Brand name */}
            <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
              Qubit Quantum AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative transition-all duration-300 group ${
                  isActivePath(item.path) 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                  isActivePath(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-blue-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
              </Link>
            ))}
            
            {/* Quantum Research Lab Button */}
            <GradientButton variant="secondary" asChild className="hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <Link to="/quantum-research-lab" className="flex items-center space-x-2">
                <Atom className="h-4 w-4" />
                <span>Quantum Research Lab</span>
              </Link>
            </GradientButton>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-24 truncate">{getUserDisplayName()}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl">
                    <div className="p-4 border-b border-gray-700">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-white font-medium truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <GradientButton variant="autoflow" onClick={onLoginClick} className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </GradientButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-black/90 backdrop-blur-md rounded-b-xl border-t border-gray-800/50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActivePath(item.path) 
                      ? 'text-blue-400 bg-blue-500/10' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Quantum Research Lab Button */}
              <Link
                to="/quantum-research-lab"
                className="block px-3 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Atom className="h-4 w-4" />
                  <span>Quantum Research Lab</span>
                </div>
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-gray-700">
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="text-white font-medium truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <GradientButton
                  variant="autoflow"
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 mt-4"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </GradientButton>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;