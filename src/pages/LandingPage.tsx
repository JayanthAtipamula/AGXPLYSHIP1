import * as React from 'react';
import { Building, Phone, Mail, Globe, Star, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import logo
import logo from '../assets/plyshiplogo.png';

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar - Glassmorphism effect */}
      <nav className="fixed w-full backdrop-blur-md bg-white/80 z-50 border-b border-gray-200/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={logo}
                  alt="Plyship Logo" 
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Solutions</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Resources</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Company</Link>
              <Link to="/owner-login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Sign In</Link>
              <Link 
                to="/admin/login" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with glassmorphism */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden border-b border-gray-200/20 backdrop-blur-md bg-white/80`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">Solutions</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">Features</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">Resources</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">Company</Link>
            <Link to="/owner-login" className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">Sign In</Link>
            <Link to="/admin/login" className="block px-3 py-2 rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with modern design */}
      <div className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800">
          {/* Abstract shapes */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwaDE0NDB2NjQwSDB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
        </div>
        
        <div className="relative">
          <div className="container mx-auto px-4 py-24 sm:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
                  <span className="text-sm font-medium">India's #1 Interior Lead Platform</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Transform Your Interior Business with Quality Leads
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Whether you're targeting residential or commercial projects, Plyship delivers premium leads that convert.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 flex items-center group">
                    Join Today
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-200">
                    Learn More
                  </button>
                </div>
                
                {/* Trust badges */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm text-blue-100 mb-4">Trusted by 500+ Interior Professionals</p>
                  <div className="flex flex-wrap gap-6 items-center">
                    <img src="https://via.placeholder.com/120x40" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                    <img src="https://via.placeholder.com/120x40" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                    <img src="https://via.placeholder.com/120x40" alt="Client Logo" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative hidden md:block w-full max-w-2xl">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-blue-400/20 blur-2xl rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80" 
                  alt="Modern Interior Design"
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Glassmorphism */}
      <div className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Plyship?</h2>
            <p className="text-xl text-gray-600">Get access to high-quality leads and grow your interior business with our comprehensive platform.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Leads",
                description: "Access verified, high-intent clients ready to convert",
                icon: Star
              },
              {
                title: "Smart Distribution",
                description: "Automated lead distribution system for maximum efficiency",
                icon: Package
              },
              {
                title: "Real-time Analytics",
                description: "Track and analyze your lead performance in real-time",
                icon: CheckCircle
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-md bg-white/80 p-8 rounded-2xl border border-gray-200/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-600">
            <p>
              At Plyship, we specialize in connecting interior professionals with high-intent clients. Our platform generates traffic through a mix of user ads and organic searches, ensuring a steady flow of quality leads. With Plyship, you get access to verified, conversion-ready leads that help you close deals faster.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                location: "Mumbai",
                text: "Plyship's leads are super nice! I converted 5 projects within a month. Highly recommended for interior professionals."
              },
              {
                name: "Priya Mehta",
                location: "Delhi",
                text: "The quality of interior leads is excellent. I signed up for the 6-month package and it's been worth every penny."
              },
              {
                name: "Ankit Patel",
                location: "Bangalore",
                text: "Got my first client within a week of joining Plyship. The leads are genuine and high-converting."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-gray-500 text-sm">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section with Glassmorphism and Glowing Effects */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwaDE0NDB2NjQwSDB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-medium">Flexible Plans</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Select the perfect plan for your business needs with our transparent pricing options
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "1 Month Plan",
                price: "₹5,000",
                popular: false,
                features: ["Basic lead distribution", "Email support", "Basic analytics"]
              },
              {
                name: "6 Months Plan",
                price: "₹25,000",
                tag: "Best Value",
                features: ["Priority lead distribution", "24/7 phone support", "Advanced analytics", "Dedicated account manager"]
              },
              {
                name: "1 Year Plan",
                price: "₹50,000",
                tag: "Most Popular",
                features: ["Premium lead distribution", "24/7 priority support", "Full analytics suite", "Strategic consulting"]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`relative group backdrop-blur-md ${
                  plan.tag ? 'bg-gradient-to-b from-white to-blue-50/50' : 'bg-white/80'
                } rounded-2xl overflow-hidden border border-gray-200/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10`}
              >
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 blur-xl" />
                </div>

                {plan.tag && (
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 text-sm font-semibold">
                    {plan.tag}
                  </div>
                )}

                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/package</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center group ${
                    plan.tag 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25' 
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                  }`}>
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Plyship?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              "Super-quality interior leads that convert",
              "Traffic from ads and organic searches",
              "Affordable packages tailored for your business growth",
              "Trusted by interior professionals across India"
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section with Modern Design */}
      <div className="py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.1),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.05),_transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">
              Ready to take your interior business to the next level? Get in touch with us today!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a 
              href="tel:+91XXXXXXXXXX" 
              className="group relative backdrop-blur-md bg-white/80 p-8 rounded-2xl border border-gray-200/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 blur-xl" />
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Call Us</h3>
                <p className="text-gray-600">Available 24/7 for your queries</p>
              </div>
            </a>

            <a 
              href="mailto:contact@plyship.com" 
              className="group relative backdrop-blur-md bg-white/80 p-8 rounded-2xl border border-gray-200/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 blur-xl" />
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Email Us</h3>
                <p className="text-gray-600">Get response within 24 hours</p>
              </div>
            </a>

            <a 
              href="https://www.plyship.com" 
              className="group relative backdrop-blur-md bg-white/80 p-8 rounded-2xl border border-gray-200/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 blur-xl" />
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Visit Website</h3>
                <p className="text-gray-600">Explore more about our services</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Build Your Success Story</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our success stories and learn how Plyship has helped interior professionals like you achieve their business goals. Let's build your success story together!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <img src={logo} alt="Plyship Logo" className="h-10 mb-6" />
              <p className="text-gray-400 mb-6">
                India's #1 Interior Lead Platform connecting professionals with high-intent clients.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lead Generation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lead Distribution</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics Dashboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Growth</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-gray-400 mt-1" />
                  <span className="text-gray-400">123 Business Avenue, Mumbai, Maharashtra 400001</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">+91 (123) 456-7890</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">contact@plyship.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 Plyship. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 