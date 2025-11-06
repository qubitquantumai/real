import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Information We Collect */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or fill out our contact form</li>
                  <li>Request information about our services</li>
                  <li>Subscribe to our newsletter or communications</li>
                  <li>Participate in surveys or provide feedback</li>
                </ul>
                <p>This information may include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company information</li>
                  <li>Service preferences and requirements</li>
                  <li>Communication history and preferences</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you technical notices, updates, and administrative messages</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Personalize your experience with our services</li>
                  <li>Analyze usage patterns to improve our website and services</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Information Sharing and Disclosure</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or respond to lawful requests</li>
                  <li>To protect our rights, property, or safety, or that of others</li>
                  <li>With trusted service providers who assist us in operating our website and conducting our business</li>
                </ul>
                <p>All third-party service providers are required to maintain the confidentiality of your information.</p>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We implement appropriate technical and organizational measures to protect your personal information against:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Unauthorized access, alteration, disclosure, or destruction</li>
                  <li>Accidental loss or damage</li>
                  <li>Unlawful processing</li>
                </ul>
                <p>Our security measures include encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.</p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Your Rights</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Rectify inaccurate or incomplete personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict the processing of your personal information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided below.</p>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Cookies and Tracking Technologies</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We use cookies and similar tracking technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve our website functionality and user experience</li>
                  <li>Provide personalized content and advertisements</li>
                </ul>
                <p>You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
                <p>We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
                <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;