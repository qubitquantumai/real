import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, ArrowRight, Sparkles, AlertCircle, LogIn, Mail, Phone } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../../contexts/AuthContext';
import { chatStorage } from '../../lib/chatStorage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to Qubit Quantum AI! 👋 How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [collectingEmail, setCollectingEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && !conversationStarted) {
      initializeConversation();
    }
  }, [isOpen, conversationStarted]);

  // Show login prompt after a few messages for anonymous users
  useEffect(() => {
    if (!user && messages.length >= 6 && !showLoginPrompt && !collectingEmail) {
      setShowLoginPrompt(true);
    }
  }, [messages.length, user, showLoginPrompt, collectingEmail]);

  const initializeConversation = async () => {
    try {
      await chatStorage.startNewConversation();
      setConversationStarted(true);
      
      // Save the initial bot message
      await chatStorage.saveMessage(
        "Hello! Welcome to Qubit Quantum AI! 👋 How can I help you today?",
        false,
        user?.id
      );
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

  // Initialize Gemini AI
  const initializeGemini = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setApiError('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
      return null;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (error) {
      console.error('Error initializing Gemini:', error);
      setApiError('Failed to initialize Gemini AI. Please check your API key.');
      return null;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const model = initializeGemini();
    
    if (!model) {
      throw new Error('Gemini AI not properly configured');
    }

    const conversationalPrompt = `
You are a friendly, conversational AI assistant for Qubit Quantum AI. Your goal is to have natural conversations and guide users toward booking a consultation.

COMPANY INFO:
- Qubit Quantum AI provides custom AI & automation solutions
- Founded by Devika Raj NR from Kerala, India
- We help businesses automate workflows, reduce manual work by 80%, increase conversion rates by 250%
- Services: AI Chatbots, Process Automation, Lead Generation, Virtual Assistants, Custom AI Solutions
- Quick delivery: Standard (1 week), Express (1-2 days)
- 100% money-back guarantee, 6 months free maintenance
- Consultation link: https://calendly.com/autoflowai525/30min
- WhatsApp: +91 94955 16362
- Email: qubitquantumai@gmail.com

CONVERSATION STYLE:
- Be friendly, casual, and helpful
- Keep responses short (1-3 sentences max)
- Use natural language, not corporate speak
- Ask follow-up questions to understand their needs
- Guide toward booking consultation for detailed discussions
- Use emojis occasionally to be friendly

RESPONSE PATTERNS:

For greetings (hi, hello, hey):
"Hello! Welcome to Qubit Quantum AI! 👋 How can I help you today?"

For pricing questions:
"Great question! Our pricing is customized based on your specific needs and project complexity. I'd love to discuss your requirements and provide a tailored quote. Would you like to schedule a quick 30-minute consultation? It's completely free!"

For service questions:
"We offer several AI solutions! What type of business challenge are you looking to solve? Are you interested in automating workflows, generating leads, or something else?"

For contact questions:
"You can reach us in a few ways! The quickest is to book a free consultation call, message us on WhatsApp at +91 94955 16362, or email us at qubitquantumai@gmail.com. What works best for you?"

For how it works:
"We start with understanding your specific needs, then build custom AI solutions tailored to your business. Most projects are completed within a week! Want to discuss your specific situation?"

For delivery time:
"We're pretty fast! Standard delivery is within 1 week, but we also offer express delivery in 1-2 days if you're in a hurry. What's your timeline looking like?"

Always end with a gentle call-to-action or question to keep the conversation going.

User message: "${userMessage}"

Respond naturally and conversationally as the Qubit Quantum AI assistant. Keep it brief and friendly!
`;

    try {
      const result = await model.generateContent(conversationalPrompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('Empty response from Gemini API');
      }
      
      return text;
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      
      // Handle specific error types with conversational fallbacks
      if (error?.message?.includes('API_KEY_INVALID')) {
        return "I'm having some technical difficulties right now. 😅 But no worries! You can book a consultation directly here: https://calendly.com/autoflowai525/30min or message us on WhatsApp: +91 94955 16362";
      } else if (error?.message?.includes('QUOTA_EXCEEDED')) {
        return "I'm getting a lot of questions today! 😊 While I sort this out, feel free to book a consultation directly: https://calendly.com/autoflowai525/30min or WhatsApp us: +91 94955 16362";
      } else if (error?.message?.includes('RATE_LIMIT_EXCEEDED')) {
        return "Give me just a moment to catch up! In the meantime, you can book a consultation here: https://calendly.com/autoflowai525/30min or WhatsApp: +91 94955 16362";
      } else {
        return "I apologize for the technical hiccup! 🤖 Let's connect directly - book a consultation here: https://calendly.com/autoflowai525/30min or WhatsApp: +91 94955 16362";
      }
    }
  };

  const handleEmailCollection = async () => {
    if (!userEmail.trim() || !userEmail.includes('@')) {
      const errorMsg: Message = {
        id: Date.now().toString(),
        text: "Please enter a valid email address so I can provide you with personalized assistance! 📧",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    // Save email to conversation
    await chatStorage.saveMessage(`User provided email: ${userEmail}`, true, user?.id);
    
    const thankYouMsg: Message = {
      id: Date.now().toString(),
      text: `Thank you! I've saved your email (${userEmail}). Now I can provide you with personalized follow-up and assistance. How can I help you with your automation needs? 🚀`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, thankYouMsg]);
    await chatStorage.saveMessage(thankYouMsg.text, false, user?.id);
    
    setCollectingEmail(false);
    setUserEmail('');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Handle email collection
    if (collectingEmail) {
      setUserEmail(inputMessage);
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      await handleEmailCollection();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setApiError(null);

    // Save user message to database
    try {
      await chatStorage.saveMessage(currentMessage, true, user?.id);
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    try {
      const aiResponse = await generateAIResponse(currentMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save AI response to database
      try {
        await chatStorage.saveMessage(aiResponse, false, user?.id);
      } catch (error) {
        console.error('Error saving AI message:', error);
      }
    } catch (error: any) {
      console.error('Error in handleSendMessage:', error);
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having a small technical issue! 😅 But I'm here to help - you can book a consultation directly: https://calendly.com/autoflowai525/30min or WhatsApp us: +91 94955 16362",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);

      // Save error message to database
      try {
        await chatStorage.saveMessage(errorMsg.text, false, user?.id);
      } catch (saveError) {
        console.error('Error saving error message:', saveError);
      }
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLoginPrompt = () => {
    setShowLoginPrompt(false);
    // You can trigger login modal here
    window.dispatchEvent(new CustomEvent('openLoginModal'));
  };

  const handleEmailPrompt = () => {
    setShowLoginPrompt(false);
    setCollectingEmail(true);
    
    const emailPromptMsg: Message = {
      id: Date.now().toString(),
      text: "I'd love to provide you with personalized assistance! Could you please share your email address? This will help me follow up with relevant information and updates. 📧",
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, emailPromptMsg]);
    chatStorage.saveMessage(emailPromptMsg.text, false, user?.id);
  };

  const quickActions = [
    "What do you offer?",
    "How much does it cost?",
    "How can I contact you?",
    "Book consultation"
  ];

  const handleQuickAction = async (action: string) => {
    if (action === "Book consultation") {
      window.open('https://calendly.com/autoflowai525/30min', '_blank');
      
      // Save the action to database
      try {
        await chatStorage.saveMessage(`User clicked: ${action}`, true, user?.id);
        await chatStorage.saveMessage("User was redirected to booking page", false, user?.id);
      } catch (error) {
        console.error('Error saving quick action:', error);
      }
      return;
    }
    setInputMessage(action);
  };

  const handleWhatsAppChat = () => {
    const message = "Hey Qubit Quantum AI, I need help with AI automation solutions. Can you assist me?";
    const whatsappUrl = `https://wa.me/919495516362?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* AI Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          {isOpen ? (
            <X className="h-8 w-8 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Bot className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
          )}
          
          {/* Notification dot */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          )}
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-150"></div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 right-6 w-96 h-[600px] bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Qubit Quantum AI Assistant</h3>
                  <p className="text-blue-100 text-sm">
                    {user ? `Hello, ${user.user_metadata?.name || user.email?.split('@')[0]}!` : 
                     apiError ? 'Ready to help!' : 'Online • Ready to chat'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gray-700'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    {(message.text.includes('calendly.com') || message.text.includes('WhatsApp')) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.text.includes('calendly.com') && (
                          <button
                            onClick={() => window.open('https://calendly.com/autoflowai525/30min', '_blank')}
                            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs transition-colors duration-300"
                          >
                            <Calendar className="h-3 w-3" />
                            <span>Book Now</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                        {message.text.includes('WhatsApp') && (
                          <button
                            onClick={handleWhatsAppChat}
                            className="inline-flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 px-3 py-1 rounded-lg text-xs transition-colors duration-300"
                          >
                            <MessageCircle className="h-3 w-3" />
                            <span>WhatsApp</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Login/Email Prompt */}
            {showLoginPrompt && !user && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mx-2">
                <div className="text-center">
                  <h4 className="text-white font-semibold mb-2">Get Personalized Assistance</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    To provide you with the best service and follow up on your inquiry, would you like to:
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={handleLoginPrompt}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login/Sign Up</span>
                    </button>
                    <button
                      onClick={handleEmailPrompt}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Just Share Email</span>
                    </button>
                    <button
                      onClick={handleWhatsAppChat}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Chat</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="bg-gray-800 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && !showLoginPrompt && (
            <div className="p-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs mb-3">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 text-left"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={collectingEmail ? userEmail : inputMessage}
                  onChange={(e) => collectingEmail ? setUserEmail(e.target.value) : setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={collectingEmail ? "Enter your email address..." : "Type your message..."}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 resize-none"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={collectingEmail ? handleEmailCollection : handleSendMessage}
                disabled={(!inputMessage.trim() && !userEmail.trim()) || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Powered by */}
            <div className="flex items-center justify-center mt-2 space-x-1">
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-gray-500">Powered by Qubit Quantum AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;