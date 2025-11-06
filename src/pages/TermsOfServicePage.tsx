import React from 'react';
import { Shield, FileText, Scale, AlertTriangle, Mail, Phone } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Please read these terms carefully before using our services. By using Quantum AI, you agree to these terms.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Acceptance of Terms */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                  By accessing and using Quantum AI's website and services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </div>

            {/* Services Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Services Description</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>Quantum AI provides:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI automation solutions and consulting services</li>
                  <li>Custom AI chatbot development</li>
                  <li>Process automation implementation</li>
                  <li>Virtual assistant solutions</li>
                  <li>Lead generation systems</li>
                  <li>Appointment booking automation</li>
                </ul>
                <p>
                  All services are provided "as is" and we reserve the right to modify or discontinue any service at any time.
                </p>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>As a user of our services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information when requested</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not use our services to transmit harmful or malicious content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>Payment terms for our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All fees are quoted in USD unless otherwise specified</li>
                  <li>Payment is due upon completion of services unless otherwise agreed</li>
                  <li>Late payments may incur additional charges</li>
                  <li>Refunds are subject to our refund policy</li>
                  <li>We reserve the right to suspend services for non-payment</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive property of Quantum AI and its licensors.
                </p>
                <p>
                  Custom solutions developed for clients remain the property of the client upon full payment, unless otherwise specified in a separate agreement.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  In no event shall Quantum AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p>
                  Our total liability for any claims arising from these terms or your use of our services shall not exceed the amount paid by you for the specific service in question.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Termination</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will cease immediately.
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
                <p>If you have any questions about these Terms of Service, please contact us:</p>
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

            {/* Changes to Terms */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Changes to Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                </p>
                <p>
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;