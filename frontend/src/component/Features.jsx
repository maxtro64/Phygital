import React, { useState } from 'react';
import { 
  Search, Store, QrCode, Navigation, CreditCard, 
  ShoppingCart, BarChart, Gift, MessageCircle, 
  Shield, Timer, Users, Package, TrendingUp, 
  Smartphone, Award, Truck, Leaf, Sparkles
} from 'lucide-react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Search,
      title: 'Smart Store Discovery',
      description: 'Find shops by distance, price, and customer ratings with our AI-powered search',
      color: 'text-[#FF6347]',
      bgColor: 'bg-[#FF6347]/10',
      stats: '99% accuracy',
      emoji: '🔍'
    },
    {
      icon: Store,
      title: 'Digital Storefronts',
      description: 'Every shop gets a beautiful online presence with products, timings, and photos',
      color: 'text-[#FFD700]',
      bgColor: 'bg-[#FFD700]/10',
      stats: '5K+ shops onboarded',
      emoji: '🏪'
    },
    {
      icon: QrCode,
      title: 'QR Authentication',
      description: 'Verify product authenticity and freshness with unique QR codes',
      color: 'text-[#32CD32]',
      bgColor: 'bg-[#32CD32]/10',
      stats: '100% authentic',
      emoji: '📱'
    },
    {
      icon: Navigation,
      title: 'Real-Time Tracking',
      description: 'Track your order live from store to doorstep with minute-by-minute updates',
      color: 'text-[#8B4513]',
      bgColor: 'bg-[#8B4513]/10',
      stats: 'Live updates',
      emoji: '📍'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options including UPI, wallet, cards, and cash on delivery',
      color: 'text-[#F0E68C]',
      bgColor: 'bg-[#F0E68C]/10',
      stats: '100% secure',
      emoji: '💳'
    },
    {
      icon: ShoppingCart,
      title: 'Local Marketplace',
      description: 'Discover authentic homemade products, spices, and local specialties',
      color: 'text-[#FF6347]',
      bgColor: 'bg-[#FF6347]/10',
      stats: '500+ products',
      emoji: '🛒'
    },
    {
      icon: BarChart,
      title: 'Shop Dashboard',
      description: 'Manage orders, inventory, and analytics with our powerful dashboard',
      color: 'text-[#FFD700]',
      bgColor: 'bg-[#FFD700]/10',
      stats: 'Real-time insights',
      emoji: '📊'
    },
    {
      icon: Gift,
      title: 'Loyalty Rewards',
      description: 'Earn points and cashback with every purchase and referral',
      color: 'text-[#32CD32]',
      bgColor: 'bg-[#32CD32]/10',
      stats: '50K+ rewards',
      emoji: '🎁'
    },
    {
      icon: MessageCircle,
      title: '24×7 Support',
      description: 'AI-powered chatbot assistance with instant support and guidance',
      color: 'text-[#8B4513]',
      bgColor: 'bg-[#8B4513]/10',
      stats: 'Instant help',
      emoji: '💬'
    }
  ];

  const specialFeatures = [
    {
      icon: Timer,
      title: '30-Minute Delivery',
      description: 'Fresh groceries delivered to your door in under 30 minutes',
      bgColor: 'bg-gradient-to-r from-[#FF6347] to-[#FFD700]',
      textColor: 'text-white',
      stat: '98% on-time'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Every product quality-checked and guaranteed fresh',
      bgColor: 'bg-gradient-to-r from-[#32CD32] to-[#2E8B57]',
      textColor: 'text-white',
      stat: '100% satisfaction'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Sustainable packaging and local sourcing to reduce carbon footprint',
      bgColor: 'bg-gradient-to-r from-[#8B4513] to-[#DAA520]',
      textColor: 'text-white',
      stat: 'Carbon neutral'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Supporting local economies and creating neighborhood jobs',
      bgColor: 'bg-gradient-to-r from-[#FF6347] to-[#8B4513]',
      textColor: 'text-white',
      stat: '5K+ jobs created'
    }
  ];

  const FeatureDetail = ({ feature }) => {
    const Icon = feature.icon;
    return (
      <div className="bg-gradient-to-br from-white to-[#FFFAF0] rounded-2xl p-6 shadow-xl border border-[#F0E68C]/30">
        <div className="flex items-center gap-4 mb-6">
          <div className={`relative ${feature.bgColor} p-4 rounded-xl`}>
            <Icon className={`w-8 h-8 ${feature.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8B4513]">{feature.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`text-sm font-semibold ${feature.color}`}>{feature.stats}</div>
              <div className="text-2xl">{feature.emoji}</div>
            </div>
          </div>
        </div>
        
        <p className="text-[#8B4513]/80 text-base mb-6 leading-relaxed">{feature.description}</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-sm text-[#8B4513]/60 mb-1">
              <span>Speed</span>
              <span>95%</span>
            </div>
            <div className="w-full bg-[#F0E68C]/20 rounded-full h-2">
              <div className={`h-2 rounded-full ${feature.bgColor.replace('/10', '/60')} w-[95%]`}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-[#8B4513]/60 mb-1">
              <span>User Rating</span>
              <span>4.8/5</span>
            </div>
            <div className="w-full bg-[#F0E68C]/20 rounded-full h-2">
              <div className={`h-2 rounded-full ${feature.bgColor.replace('/10', '/60')} w-[96%]`}></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-[#F0E68C]/30">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${feature.bgColor.replace('/10', '')} rounded-full animate-pulse`}></div>
            <span className="text-sm text-[#8B4513]/60">Active nationwide</span>
          </div>
          <button className="bg-gradient-to-r from-[#32CD32] to-[#2E8B57] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
            Try Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white via-[#FFF8DC] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#FF6347]" />
            <span className="text-sm font-semibold text-[#8B4513]">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#8B4513]">
            Everything You Need for <span className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] bg-clip-text text-transparent">Smart Shopping</span>
          </h2>
          
          <p className="text-lg text-[#8B4513]/70 max-w-3xl mx-auto">
            Discover our comprehensive suite of features designed to revolutionize your local shopping experience
          </p>
        </div>

        {/* Special Features */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`relative overflow-hidden rounded-xl p-6 text-white ${feature.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-lg font-bold">{feature.title}</div>
                    </div>
                    <p className="text-white/90 text-sm mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">
                        {feature.stat}
                      </span>
                      <TrendingUp className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Features Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`group cursor-pointer relative overflow-hidden rounded-xl p-5 border transition-all duration-300 hover:shadow-lg ${
                      activeFeature === index 
                        ? 'bg-white border-[#FF6347] shadow-md' 
                        : 'bg-white border-[#F0E68C] hover:border-[#FF6347]/50'
                    }`}
                  >
                    {/* Active indicator */}
                    {activeFeature === index && (
                      <div className={`absolute top-3 right-3 w-2 h-2 ${feature.bgColor.replace('/10', '')} rounded-full animate-pulse`}></div>
                    )}
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`relative ${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      
                      {/* Title and Emoji */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-[#8B4513] group-hover:text-[#654321] transition-colors">
                          {feature.title}
                        </h3>
                        <div className="text-xl opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          {feature.emoji}
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-[#8B4513]/60 text-sm mb-4 line-clamp-2">
                        {feature.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${feature.color}`}>
                          {feature.stats}
                        </span>
                        <div className={`h-1 rounded-full ${feature.bgColor.replace('/10', '')} ${
                          activeFeature === index ? 'w-8' : 'w-4 group-hover:w-8 transition-all duration-300'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats Bar */}
            <div className="mt-12 bg-gradient-to-r from-[#FFF8DC] to-[#FFFAF0] rounded-xl p-6 border border-[#F0E68C]/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B4513]">99%</div>
                  <div className="text-sm text-[#8B4513]/70">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B4513]">30min</div>
                  <div className="text-sm text-[#8B4513]/70">Delivery Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B4513]">24/7</div>
                  <div className="text-sm text-[#8B4513]/70">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B4513]">5M+</div>
                  <div className="text-sm text-[#8B4513]/70">Orders</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Details Panel */}
          <div className="lg:col-span-1 space-y-6">
            <FeatureDetail feature={features[activeFeature]} />
            
            {/* Download App Card */}
            <div className="bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-xl p-6 text-white">
              <h4 className="text-lg font-bold mb-2">Try Our App</h4>
              <p className="text-white/80 text-sm mb-4">Experience all features in our mobile app</p>
              <div className="space-y-3">
                <button className="w-full bg-white text-[#8B4513] px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  <div className="text-xl">📱</div>
                  Download for iOS
                </button>
                <button className="w-full bg-white/10 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform hover:bg-white/20">
                  <div className="text-xl">🤖</div>
                  Download for Android
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#FFF8DC] to-[#FFFAF0] rounded-xl p-8 border border-[#F0E68C]/30 shadow-lg">
            <Award className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
            <h3 className="text-2xl font-bold mb-3 text-[#8B4513]">Ready to Transform Your Shopping?</h3>
            <p className="text-[#8B4513]/70 mb-6 max-w-2xl mx-auto">
              Join our community of satisfied customers and local businesses
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105">
                Get Started Free
              </button>
              <button className="border-2 border-[#32CD32] text-[#32CD32] px-6 py-3 rounded-lg font-bold hover:bg-[#32CD32]/10 transition-all hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Features;