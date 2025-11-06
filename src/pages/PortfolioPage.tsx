import React from 'react';
import { ExternalLink, Github, Play, Award, Users, TrendingUp, Zap, Calendar, Clock, ArrowRight } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'AI-Powered Google Agent for Smart Business Automation',
      category: 'AI Agent Development',
      excerpt: 'How we built an intelligent Google Agent that automates complex business workflows using AI, reducing manual work by 80% and improving response times.',
      content: `
        <h3>The Challenge</h3>
        <p>A growing business needed to automate their customer inquiry process that was taking hours of manual work daily. They were struggling with:</p>
        <ul>
          <li>Manual data entry from multiple sources</li>
          <li>Slow response times to customer queries</li>
          <li>Inconsistent information across platforms</li>
          <li>High operational costs</li>
        </ul>

        <h3>The Solution</h3>
        <p>We developed a sophisticated AI-powered Google Agent that integrates multiple systems and automates the entire workflow:</p>
        <ul>
          <li><strong>Telegram Integration:</strong> Receives customer messages instantly</li>
          <li><strong>AI Processing:</strong> Uses advanced AI models to understand and categorize requests</li>
          <li><strong>Smart Routing:</strong> Automatically routes requests to appropriate departments</li>
          <li><strong>Automated Responses:</strong> Sends personalized responses based on AI analysis</li>
          <li><strong>Data Synchronization:</strong> Updates all connected systems in real-time</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li>Natural language processing for understanding customer intent</li>
          <li>Multi-platform integration (Telegram, Email, Web forms)</li>
          <li>Intelligent field editing and data validation</li>
          <li>Real-time notifications and updates</li>
          <li>Comprehensive analytics and reporting</li>
        </ul>

        <h3>Results Achieved</h3>
        <ul>
          <li><strong>80% reduction</strong> in manual processing time</li>
          <li><strong>95% accuracy</strong> in automated responses</li>
          <li><strong>24/7 availability</strong> for customer support</li>
          <li><strong>60% cost savings</strong> in operational expenses</li>
          <li><strong>300% improvement</strong> in response times</li>
        </ul>

        <h3>Technical Implementation</h3>
        <p>The system uses Make.com for workflow automation, integrating with OpenAI for intelligent processing, Telegram for communication, and various APIs for data synchronization. The entire process is monitored and optimized continuously.</p>
      `,
      image: '/google agent(1).png',
      readTime: '8 min read',
      publishDate: 'December 10, 2024',
      tags: ['AI Agent', 'Automation', 'Telegram', 'Make.com'],
      featured: true
    },
    {
      id: 2,
      title: 'Intelligent Prompt AI Agent for Content Generation',
      category: 'AI Content Automation',
      excerpt: 'Building a sophisticated AI agent that generates high-quality, contextual content automatically, saving businesses hours of content creation work.',
      content: `
        <h3>The Challenge</h3>
        <p>Content creators and businesses were spending countless hours on repetitive content generation tasks:</p>
        <ul>
          <li>Manual content creation taking 4-6 hours daily</li>
          <li>Inconsistent content quality and tone</li>
          <li>Difficulty scaling content production</li>
          <li>High costs for content creation teams</li>
        </ul>

        <h3>The Solution</h3>
        <p>We created an intelligent Prompt AI Agent that automates the entire content generation process:</p>
        <ul>
          <li><strong>Form Submission Trigger:</strong> Automatically starts when content requests are submitted</li>
          <li><strong>AI Processing:</strong> Uses multiple AI models for different content types</li>
          <li><strong>Quality Control:</strong> Implements deep reasoning and normal model validation</li>
          <li><strong>Memory System:</strong> Maintains context and brand consistency</li>
          <li><strong>Automated Delivery:</strong> Sends completed content to designated platforms</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li>Multi-model AI system (Ollama Chat Model, Deep Reasoning, Normal Model)</li>
          <li>Intelligent content categorization and routing</li>
          <li>Brand voice and tone consistency</li>
          <li>Automated quality assurance checks</li>
          <li>Seamless integration with content management systems</li>
        </ul>

        <h3>Results Achieved</h3>
        <ul>
          <li><strong>90% reduction</strong> in content creation time</li>
          <li><strong>Consistent quality</strong> across all generated content</li>
          <li><strong>5x increase</strong> in content production capacity</li>
          <li><strong>70% cost savings</strong> on content creation</li>
          <li><strong>24/7 content generation</strong> capability</li>
        </ul>

        <h3>Technical Architecture</h3>
        <p>The system leverages advanced AI models through Make.com automation, with intelligent routing based on content type and complexity. Memory systems ensure consistency while multiple validation layers maintain quality standards.</p>
      `,
      image: '/prompt ai agent.png',
      readTime: '6 min read',
      publishDate: 'December 8, 2024',
      tags: ['AI Content', 'Automation', 'Ollama', 'Content Generation'],
      featured: false
    },
    {
      id: 3,
      title: 'Automated Email Follow-up System for Lead Nurturing',
      category: 'Email Automation',
      excerpt: 'Discover how we built an intelligent email follow-up system that nurtures leads automatically, increasing conversion rates by 250% while saving hours of manual work.',
      content: `
        <h3>The Challenge</h3>
        <p>Sales teams were struggling with consistent lead follow-up and nurturing:</p>
        <ul>
          <li>Manual email follow-ups taking 3-4 hours daily</li>
          <li>Inconsistent follow-up timing and messaging</li>
          <li>Lost leads due to delayed responses</li>
          <li>Difficulty tracking lead engagement and progress</li>
        </ul>

        <h3>The Solution</h3>
        <p>We developed a comprehensive automated email follow-up system that handles the entire lead nurturing process:</p>
        <ul>
          <li><strong>Lead Capture:</strong> Automatically captures leads from multiple sources</li>
          <li><strong>Intelligent Segmentation:</strong> Categorizes leads based on behavior and interests</li>
          <li><strong>Personalized Sequences:</strong> Sends targeted email sequences based on lead profile</li>
          <li><strong>Engagement Tracking:</strong> Monitors opens, clicks, and responses</li>
          <li><strong>Smart Scheduling:</strong> Optimizes send times for maximum engagement</li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li>Multi-source lead integration (web forms, social media, referrals)</li>
          <li>AI-powered email personalization</li>
          <li>Behavioral trigger-based sequences</li>
          <li>A/B testing for email optimization</li>
          <li>Comprehensive analytics and reporting</li>
          <li>CRM integration and lead scoring</li>
        </ul>

        <h3>Results Achieved</h3>
        <ul>
          <li><strong>250% increase</strong> in lead conversion rates</li>
          <li><strong>85% reduction</strong> in manual follow-up time</li>
          <li><strong>40% improvement</strong> in email open rates</li>
          <li><strong>60% increase</strong> in lead engagement</li>
          <li><strong>300% ROI</strong> within the first quarter</li>
        </ul>

        <h3>Implementation Details</h3>
        <p>The system uses Make.com for workflow automation, integrating with email platforms, CRM systems, and analytics tools. Advanced segmentation and personalization ensure each lead receives relevant, timely communication that moves them through the sales funnel effectively.</p>
      `,
      image: '/email follow up (2) copy.png',
      readTime: '7 min read',
      publishDate: 'December 5, 2024',
      tags: ['Email Automation', 'Lead Nurturing', 'CRM Integration', 'Sales'],
      featured: false
    }
  ];

  const stats = [
    { icon: Award, value: '3', label: 'Case Studies' },
    { icon: Users, value: '15+', label: 'Clients Served' },
    { icon: TrendingUp, value: '250%', label: 'Avg. ROI Increase' },
    { icon: Zap, value: '80%', label: 'Time Saved' }
  ];

  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);

  const handleReadMore = (postId: number) => {
    setSelectedPost(postId);
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <div className="min-h-screen bg-black pt-16">
        {/* Article Header */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={handleBackToBlog}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to Case Studies</span>
            </button>
            
            <div className="text-center">
              <span className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Article Image */}
        <section className="py-12 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: '#d1d5db',
                lineHeight: '1.8'
              }}
            />
            
            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Automate Your Business?
              </h3>
              <p className="text-gray-400 mb-6">
                Let's discuss how we can create a similar automation solution for your business.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <span>Book Consultation</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Automation Case Studies
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            Explore some of our automation solutions we've built for businesses. These featured case studies showcase 
            the challenges, solutions, and remarkable results achieved through intelligent automation. Many more success stories available upon request.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group relative bg-gray-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 ${
                  post.featured ? 'border-blue-500/50 ring-2 ring-blue-500/20 lg:col-span-2' : 'border-gray-700'
                }`}
              >
                {post.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured Case Study
                    </span>
                  </div>
                )}

                {/* Post Image */}
                <div className={`relative overflow-hidden ${post.featured ? 'h-64' : 'h-48'}`}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => handleReadMore(post.id)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how we can build a custom automation solution that transforms your business operations. 
            Join our growing list of successful case studies with proven results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </a>
            <a
              href="/services"
              className="border border-gray-600 text-gray-300 hover:text-white hover:border-blue-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              View Services
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            📊 View more detailed case studies and client testimonials during your consultation
          </p>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;