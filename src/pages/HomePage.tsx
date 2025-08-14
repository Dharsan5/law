import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  Users, 
  MessageSquare, 
  Scale, 
  Shield,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Your Gateway to <span className="text-blue-200">Legal India</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Democratizing access to legal information and services across India. 
                Search laws, track cases, find advocates, and get AI-powered legal assistance 
                - all in one comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Exploring Laws
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="secondary">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-blue-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>DPDP Act 2023 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>12+ Indian Languages</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>AI-Powered Legal Assistant</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>Integrated E-Filing System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Legal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal platform designed for modern India, 
              built with privacy, accessibility, and user experience in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'Legal Search',
                description: 'Search through comprehensive database of Indian laws, acts, and regulations with AI-powered insights.',
                link: '/search',
                color: 'blue'
              },
              {
                icon: FileText,
                title: 'Case Tracking',
                description: 'Track your cases in real-time with updates from integrated court management systems.',
                link: '/case-tracking',
                color: 'green'
              },
              {
                icon: Users,
                title: 'Find Advocates',
                description: 'Connect with verified advocates based on specialization, location, and ratings.',
                link: '/advocates',
                color: 'purple'
              },
              {
                icon: MessageSquare,
                title: 'Legal Assistant',
                description: 'Get instant answers to legal questions with our AI-powered assistant.',
                link: '/legal-assistant',
                color: 'orange'
              }
            ].map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 h-full">
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Law ePortal India?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Privacy & Security First',
                    description: 'DPDP Act 2023 compliant with end-to-end encryption and zero-trust security model.'
                  },
                  {
                    icon: Globe,
                    title: 'Multilingual Support',
                    description: 'Available in 12+ Indian languages with local context and cultural understanding.'
                  },
                  {
                    icon: Zap,
                    title: 'AI-Powered Intelligence',
                    description: 'Advanced RAG system provides accurate legal information with proper disclaimers.'
                  },
                  {
                    icon: Scale,
                    title: 'Government Integration',
                    description: 'Seamlessly integrated with eCourts, DigiLocker, and other government systems.'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Trusted by Legal Professionals
                </h3>
                <p className="text-gray-600">
                  Join thousands of advocates, citizens, and organizations
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1,500+</div>
                  <div className="text-gray-600">Verified Advocates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">50K+</div>
                  <div className="text-gray-600">Legal Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                  <div className="text-gray-600">Cases Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">99.9%</div>
                  <div className="text-gray-600">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from legal professionals and citizens across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Advocate Priya Sharma',
                role: 'Senior Advocate, Delhi High Court',
                content: 'Law ePortal has revolutionized my practice. The case tracking and client communication features have improved my efficiency significantly.',
                rating: 5
              },
              {
                name: 'Rajesh Kumar',
                role: 'Business Owner, Mumbai',
                content: 'Finding the right legal information was always challenging. This platform made it simple and accessible in Hindi.',
                rating: 5
              },
              {
                name: 'Dr. Anita Singh',
                role: 'Legal Aid NGO Director',
                content: 'The bulk case management features help us serve more people efficiently. The AI assistant is particularly helpful for quick queries.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Law ePortal India for their legal needs. 
            Start exploring our comprehensive legal platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/legal-assistant">
              <Button size="lg" variant="secondary">
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
