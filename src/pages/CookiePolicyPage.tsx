import React from 'react';
import { Cookie, Settings, Eye, Shield, Mail, Phone } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cookie Policy
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Learn how we use cookies and similar technologies to improve your experience on our website.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* What Are Cookies */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Cookie className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">What Are Cookies?</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                  They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p>
                  Cookies allow us to recognize your device and store some information about your preferences or past actions.
                </p>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">How We Use Cookies</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We use cookies for several purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics Cookies:</strong> Provide insights into website usage and performance</li>
                </ul>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Session Cookies</h3>
                  <p>These are temporary cookies that expire when you close your browser. They help us maintain your session and provide a seamless browsing experience.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Persistent Cookies</h3>
                  <p>These cookies remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">First-Party Cookies</h3>
                  <p>Set directly by our website to enhance functionality and user experience.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Third-Party Cookies</h3>
                  <p>Set by external services we use, such as analytics providers or social media platforms.</p>
                </div>
              </div>
            </div>

            {/* Cookie Categories */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Cookie Categories</h2>
              <div className="space-y-6 text-gray-300">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Strictly Necessary Cookies</h3>
                  <p>These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling out forms.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Performance Cookies</h3>
                  <p>These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us improve our website's performance.</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Functionality Cookies</h3>
                  <p>These cookies allow the website to remember choices you make and provide enhanced, more personal features.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Targeting Cookies</h3>
                  <p>These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Managing Your Cookie Preferences</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>You have several options for managing cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings</li>
                  <li><strong>Opt-Out:</strong> You can opt out of certain cookies through industry opt-out mechanisms</li>
                  <li><strong>Delete Cookies:</strong> You can delete existing cookies from your browser</li>
                  <li><strong>Block Cookies:</strong> You can set your browser to block all cookies</li>
                </ul>
                <p className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and your user experience.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services</h2>
              <div className="space-y-4 text-gray-300">
                <p>We may use third-party services that set cookies on our website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
                  <li><strong>Customer Support Tools:</strong> For providing customer assistance</li>
                  <li><strong>Marketing Platforms:</strong> For targeted advertising and marketing campaigns</li>
                </ul>
                <p>
                  These third parties have their own privacy policies and cookie policies, which we encourage you to review.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>If you have any questions about our use of cookies, please contact us:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-blue-400">quantum_ai_outlook.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <p className="text-blue-400">+91 94955 16362</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Updates to This Policy</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
                <p>
                  We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicyPage;