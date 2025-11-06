import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'AutoFlow transformed our customer service with their AI chatbot. We saw a 300% increase in customer satisfaction and 50% reduction in support costs. The automation works flawlessly!',
      project: 'AI Chatbot Implementation'
    },
    {
      id: 2,
      name: 'Michael Chen',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The process automation solution saved us 40 hours per week and eliminated human errors. The ROI was incredible - we recovered our investment in just 2 months.',
      project: 'Process Automation'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The lead generation system increased our qualified leads by 250%. The AI perfectly identifies and nurtures potential customers. Outstanding work!',
      project: 'Lead Generation System'
    },
    {
      id: 4,
      name: 'David Thompson',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The appointment booking system streamlined our operations completely. Patients love the 24/7 availability and we reduced no-shows by 60%.',
      project: 'Appointment Booking System'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The virtual assistant handles customer inquiries flawlessly. Our response time improved from hours to seconds, and customer satisfaction is at an all-time high.',
      project: 'Virtual Assistant'
    },
    {
      id: 6,
      name: 'Robert Kim',
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The custom automation solution for our specific needs was phenomenal. We\'ve streamlined our entire workflow and the ongoing support is exceptional.',
      project: 'Custom Automation Solution'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">What Our </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about 
            our AI solutions and the results they've achieved.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <Quote className="h-8 w-8 text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Project Tag */}
              <div className="mb-4">
                <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.project}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">Verified Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '30+', label: 'Happy Clients' },
              { number: '4.9/5', label: 'Average Rating' },
              { number: '100%', label: 'Project Success' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;