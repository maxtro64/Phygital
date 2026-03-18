import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Zap, 
  Users, 
  Store, 
  ArrowRight,
  Smartphone,
  Truck,
  ShoppingCart,
  Heart,
  DollarSign
} from 'lucide-react';

const Solution = () => {
  const features = [
    {
      title: 'Direct Local Connection',
      description: 'Connect directly with neighborhood shops without middlemen',
      icon: <Users className="w-6 h-6" />,
      color: 'from-[#FF6347] to-[#FFD700]',
      benefits: ['No commissions', 'Real-time inventory', 'Personal relationships'],
      link: '/features'
    },
    {
      title: 'Fair Pricing',
      description: 'Shop at local prices with minimal platform fees',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-[#FFD700] to-[#32CD32]',
      benefits: ['Save 20-40%', 'Transparent pricing', 'No hidden fees'],
      link: '/features'
    },
    {
      title: 'Hyper-Local Delivery',
      description: 'Neighborhood-based delivery network using local resources',
      icon: <Truck className="w-6 h-6" />,
      color: 'from-[#32CD32] to-[#1E90FF]',
      benefits: ['Under 30 mins', 'Local jobs', 'Reduced emissions'],
      link: '/features'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Shop Lists Products',
      description: 'Local shops upload their real inventory with prices',
      icon: <Store className="w-8 h-8" />,
      color: 'bg-[#FF6347]',
      link: '/shopkeepers'
    },
    {
      step: 2,
      title: 'Customer Discovers',
      description: 'Browse nearby shops and their actual stock',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'bg-[#FFD700]',
      link: '/products'
    },
    {
      step: 3,
      title: 'Direct Order',
      description: 'Place orders directly with shops at local prices',
      icon: <ShoppingCart className="w-8 h-8" />,
      color: 'bg-[#32CD32]',
      link: '/products'
    },
    {
      step: 4,
      title: 'Local Delivery',
      description: 'Neighbor delivers using our efficient routing',
      icon: <Truck className="w-8 h-8" />,
      color: 'bg-[#1E90FF]',
      link: '/features'
    }
  ];

  const benefits = {
    consumers: [
      { title: 'Save 20-40%', description: 'On everyday purchases', icon: '💰', link: '/products' },
      { title: 'Fresh & Local', description: 'Authentic neighborhood products', icon: '🏪', link: '/products' },
      { title: '<30 Min Delivery', description: 'From shops within 1 km', icon: '⚡', link: '/features' },
      { title: 'Build Relationships', description: 'With local shopkeepers', icon: '🤝', link: '/mission' }
    ],
    shopkeepers: [
      { title: 'Keep 95% Revenue', description: 'Only 5% platform fee', icon: '💳', link: '/shopkeepers' },
      { title: 'Digital Presence', description: 'Zero-cost online store', icon: '📱', link: '/shopkeepers' },
      { title: 'Grow Customer Base', description: 'Reach nearby residents', icon: '📈', link: '/shopkeepers' },
      { title: 'Simple Tech', description: 'Easy-to-use mobile app', icon: '🛠️', link: '/shopkeepers' }
    ],
    community: [
      { title: 'Local Jobs', description: 'Delivery opportunities', icon: '👷', link: '/mission' },
      { title: 'Reduced Waste', description: 'No inventory duplication', icon: '🌱', link: '/mission' },
      { title: 'Stronger Economy', description: 'Keep money local', icon: '🏘️', link: '/mission' },
      { title: 'Carbon Savings', description: 'Shorter delivery routes', icon: '🌳', link: '/mission' }
    ]
  };

  return (
    <section id="solution" className="relative py-24 bg-gradient-to-b from-white via-[#F5FFFA] to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#32CD32]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E90FF]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-[#FFD700]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#32CD32]/10 to-[#1E90FF]/10 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-[#32CD32]" />
            <span className="text-sm font-semibold text-[#2F4F4F]">The Better Way</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#2F4F4F]">A</span>{' '}
            <span className="bg-gradient-to-r from-[#FF6347] via-[#32CD32] to-[#1E90FF] bg-clip-text text-transparent">
              Win-Win-Win
            </span>{' '}
            <span className="text-[#2F4F4F]">Solution</span>
          </h2>
          
          <p className="text-xl text-[#2F4F4F]/80 max-w-3xl mx-auto mb-8">
            Connecting neighborhoods directly - saving money, supporting local businesses, and strengthening communities.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/shopkeepers" className="bg-white rounded-full px-6 py-3 border border-[#32CD32] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <span className="text-2xl font-bold text-[#32CD32]">95%</span>
              <span className="text-[#2F4F4F] ml-2">Revenue kept by shops</span>
            </Link>
            <Link to="/products" className="bg-white rounded-full px-6 py-3 border border-[#FFD700] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <span className="text-2xl font-bold text-[#FFD700]">30%</span>
              <span className="text-[#2F4F4F] ml-2">Savings for consumers</span>
            </Link>
            <Link to="/features" className="bg-white rounded-full px-6 py-3 border border-[#1E90FF] shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <span className="text-2xl font-bold text-[#1E90FF]">15min</span>
              <span className="text-[#2F4F4F] ml-2">Average delivery time</span>
            </Link>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-[#2F4F4F] mb-12 text-center">How We Fix The System</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative bg-white rounded-2xl p-8 border border-[#E8F4EA] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
              >
                <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                </div>
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                
                <h4 className="text-xl font-bold text-[#2F4F4F] mb-3">{feature.title}</h4>
                <p className="text-[#2F4F4F]/60 mb-6">{feature.description}</p>
                
                <div className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#32CD32]" />
                      <span className="text-sm text-[#2F4F4F]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-[#2F4F4F] mb-12 text-center">Simple 4-Step Process</h3>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6347] via-[#FFD700] to-[#32CD32] transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <Link
                    to={step.link}
                    className="bg-white rounded-2xl p-8 border border-[#E8F4EA] shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all block"
                  >
                    <div className="relative">
                      <div className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-white border-2 border-[#32CD32] text-[#32CD32] w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-[#2F4F4F] mb-3">{step.title}</h4>
                    <p className="text-[#2F4F4F]/60 text-sm">{step.description}</p>
                  </Link>
                  
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-[#2F4F4F]/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Breakdown */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-[#2F4F4F] mb-12 text-center">Everyone Wins</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Consumers */}
            <div className="bg-gradient-to-b from-white to-[#FFF8DC] rounded-2xl p-8 border border-[#F0E68C] shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6347] to-[#FFD700] rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2F4F4F]">For Consumers</h4>
                  <p className="text-[#2F4F4F]/60 text-sm">Better prices & service</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {benefits.consumers.map((benefit, index) => (
                  <Link
                    key={index}
                    to={benefit.link}
                    className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white transition-colors block"
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <div className="font-bold text-[#2F4F4F]">{benefit.title}</div>
                      <div className="text-sm text-[#2F4F4F]/60">{benefit.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-2 text-[#FF6347] hover:text-[#FF4500] font-semibold"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Shopkeepers */}
            <div className="bg-gradient-to-b from-white to-[#F0FFF0] rounded-2xl p-8 border border-[#90EE90] shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#32CD32] to-[#1E90FF] rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2F4F4F]">For Shopkeepers</h4>
                  <p className="text-[#2F4F4F]/60 text-sm">Grow your business</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {benefits.shopkeepers.map((benefit, index) => (
                  <Link
                    key={index}
                    to={benefit.link}
                    className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white transition-colors block"
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <div className="font-bold text-[#2F4F4F]">{benefit.title}</div>
                      <div className="text-sm text-[#2F4F4F]/60">{benefit.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/shopkeeper-login"
                className="mt-6 inline-flex items-center gap-2 text-[#32CD32] hover:text-[#228B22] font-semibold"
              >
                <span>Register Your Shop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Community */}
            <div className="bg-gradient-to-b from-white to-[#F0F8FF] rounded-2xl p-8 border border-[#87CEEB] shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E90FF] to-[#9370DB] rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2F4F4F]">For Community</h4>
                  <p className="text-[#2F4F4F]/60 text-sm">Stronger neighborhood</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {benefits.community.map((benefit, index) => (
                  <Link
                    key={index}
                    to={benefit.link}
                    className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white transition-colors block"
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <div className="font-bold text-[#2F4F4F]">{benefit.title}</div>
                      <div className="text-sm text-[#2F4F4F]/60">{benefit.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/mission"
                className="mt-6 inline-flex items-center gap-2 text-[#1E90FF] hover:text-[#4169E1] font-semibold"
              >
                <span>Learn About Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#32CD32]/5 via-white to-[#1E90FF]/5 rounded-3xl p-12 border border-[#32CD32]/20 shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-[#2F4F4F]">Ready to Transform Your Neighborhood?</h3>
            <p className="text-xl text-[#2F4F4F]/60 mb-8 max-w-2xl mx-auto">
              Join thousands of shoppers and shopkeepers already experiencing the benefits of direct local commerce.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#32CD32]">50K+</div>
                <div className="text-[#2F4F4F]">Happy Shoppers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">5K+</div>
                <div className="text-[#2F4F4F]">Local Shops</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1E90FF]">₹10M+</div>
                <div className="text-[#2F4F4F]">Saved by Consumers</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-[#32CD32] to-[#1E90FF] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#32CD32]/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                Start Shopping Locally
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/shopkeeper-login"
                className="border-2 border-[#FFD700] text-[#2F4F4F] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#FFD700]/10 transition-all hover:scale-105"
              >
                Register Your Shop
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-[#2F4F4F]/40">
              No credit card required • Free to join • Start in minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;