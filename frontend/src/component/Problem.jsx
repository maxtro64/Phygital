import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Store, 
  TrendingUp, 
  X, 
  DollarSign, 
  ShoppingCart, 
  Truck, 
  Smartphone,
  Frown,
  AlertCircle,
  BarChart,
  Shield,
  Clock,
  Package,
  ArrowRight
} from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      category: 'For Consumers',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-[#FF6347]',
      textColor: 'text-[#FF6347]',
      challenges: [
        {
          title: 'Price Inflation',
          description: '20-40% higher prices on quick-commerce apps',
          icon: <DollarSign className="w-5 h-5" />,
          stat: '40% more',
          severity: 'high'
        },
        {
          title: 'Limited Selection',
          description: 'No access to authentic local products and specialties',
          icon: <ShoppingCart className="w-5 h-5" />,
          stat: 'Limited',
          severity: 'medium'
        },
        {
          title: 'Impersonal Experience',
          description: 'No local connection or community relationships',
          icon: <Frown className="w-5 h-5" />,
          stat: 'No connection',
          severity: 'medium'
        }
      ],
      quote: '"I end up paying almost double for groceries that are available right in my neighborhood!"'
    },
    {
      category: 'For Local Shopkeepers',
      icon: <Store className="w-8 h-8" />,
      color: 'bg-[#FFD700]',
      textColor: 'text-[#FFD700]',
      challenges: [
        {
          title: 'Customer Loss',
          description: 'Losing customers to big delivery apps and dark stores',
          icon: <TrendingUp className="w-5 h-5" />,
          stat: '-30% customers',
          severity: 'high'
        },
        {
          title: 'Digital Gap',
          description: 'No affordable way to go online or get digital visibility',
          icon: <Smartphone className="w-5 h-5" />,
          stat: 'No online presence',
          severity: 'high'
        },
        {
          title: 'Delivery Barrier',
          description: 'No cost-effective delivery system for small shops',
          icon: <Truck className="w-5 h-5" />,
          stat: 'High costs',
          severity: 'high'
        }
      ],
      quote: '"We see our regular customers ordering from apps, but we have no way to reach them online."'
    },
    {
      category: 'Market-Wide Issues',
      icon: <BarChart className="w-8 h-8" />,
      color: 'bg-[#32CD32]',
      textColor: 'text-[#32CD32]',
      challenges: [
        {
          title: 'Wasteful Systems',
          description: 'Dark stores create inventory duplication and waste',
          icon: <Package className="w-5 h-5" />,
          stat: '30% waste',
          severity: 'high'
        },
        {
          title: 'Hidden Local Stock',
          description: 'Neighborhood shops have inventory but remain invisible',
          icon: <Shield className="w-5 h-5" />,
          stat: 'Unused capacity',
          severity: 'medium'
        },
        {
          title: 'High Commissions',
          description: '25-30% commissions make small businesses unsustainable',
          icon: <AlertCircle className="w-5 h-5" />,
          stat: '30% commission',
          severity: 'critical'
        }
      ],
      quote: '"The current system creates waste while ignoring existing neighborhood resources."'
    }
  ];

  const painPoints = [
    { 
      title: 'Price Gap', 
      description: 'Consumers pay 20-40% more than local prices',
      metric: '40% Higher',
      icon: '💸',
      color: 'from-[#FF6347] to-[#FFD700]',
      link: '/solution'
    },
    { 
      title: 'Shop Struggle', 
      description: 'Local shops lose 30% of customers to apps',
      metric: '30% Loss',
      icon: '📉',
      color: 'from-[#FFD700] to-[#32CD32]',
      link: '/shopkeepers'
    },
    { 
      title: 'Commission Burden', 
      description: 'Small shops pay 25-30% commissions',
      metric: '30% Cut',
      icon: '⚖️',
      color: 'from-[#32CD32] to-[#8B4513]',
      link: '/solution'
    },
    { 
      title: 'Delivery Delay', 
      description: 'Average wait time from dark stores',
      metric: '45+ mins',
      icon: '⏰',
      color: 'from-[#8B4513] to-[#FF6347]',
      link: '/features'
    }
  ];

  return (
    <section id="problem" className="relative py-24 bg-gradient-to-b from-[#FFF8DC] via-white to-[#FFF8DC] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6347]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-[#32CD32]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Problem Icons */}
        <div className="absolute top-20 left-20 animate-float">
          <X className="w-8 h-8 text-[#FF6347]/20" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float animation-delay-1000">
          <AlertCircle className="w-8 h-8 text-[#FFD700]/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
          <Clock className="w-8 h-8 text-[#32CD32]/20" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 px-4 py-2 rounded-full mb-6">
            <AlertCircle className="w-4 h-4 text-[#FF6347]" />
            <span className="text-sm font-semibold text-[#8B4513]">The Local Commerce Challenge</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#8B4513]">Why Local Shopping</span>{' '}
            <span className="bg-gradient-to-r from-[#FF6347] via-[#FFD700] to-[#32CD32] bg-clip-text text-transparent">
              Needs Fixing
            </span>
          </h2>
          
          <p className="text-xl text-[#8B4513]/80 max-w-3xl mx-auto">
            The current system fails everyone - consumers pay more, local shops struggle, and communities lose out.
          </p>
        </div>

        {/* Key Pain Points */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#8B4513] mb-8 text-center">The Breaking Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <Link
                key={index}
                to={point.link}
                className="group relative bg-white rounded-2xl p-6 border border-[#F0E68C] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{point.icon}</div>
                  <div className={`text-sm font-bold bg-gradient-to-r ${point.color} bg-clip-text text-transparent`}>
                    {point.metric}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#8B4513] mb-2">{point.title}</h4>
                <p className="text-[#8B4513]/60 text-sm">{point.description}</p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#FF6347] to-[#FFD700] group-hover:w-full transition-all duration-500"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Problem Areas */}
        <div className="space-y-12">
          {problems.map((problem, problemIndex) => (
            <div key={problemIndex} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className={`${problem.color} text-white p-3 rounded-xl shadow-lg`}>
                  {problem.icon}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${problem.textColor}`}>{problem.category}</h3>
                  <p className="text-[#8B4513]/60">The critical challenges</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Challenges List */}
                <div className="space-y-6">
                  {problem.challenges.map((challenge, challengeIndex) => (
                    <div 
                      key={challengeIndex}
                      className="group bg-white rounded-xl p-6 border border-[#F0E68C] hover:border-[#FF6347] transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`${problem.color}/10 p-2 rounded-lg`}>
                            {challenge.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-[#8B4513]">{challenge.title}</h4>
                            <div className={`text-xs font-semibold ${problem.textColor} ${problem.color}/10 px-2 py-1 rounded-full inline-block mt-1`}>
                              {challenge.stat}
                            </div>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          challenge.severity === 'critical' ? 'bg-[#FF6347] animate-pulse' :
                          challenge.severity === 'high' ? 'bg-[#FF6347]' :
                          'bg-[#FFD700]'
                        }`}></div>
                      </div>
                      <p className="text-[#8B4513]/60 text-sm">{challenge.description}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#F0E68C]/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${problem.color} rounded-full transition-all duration-1000`}
                            style={{ 
                              width: challenge.severity === 'critical' ? '100%' :
                                      challenge.severity === 'high' ? '80%' : '60%'
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#8B4513]/60 capitalize">{challenge.severity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote/Testimonial */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-white to-[#FFF8DC] rounded-2xl p-8 border border-[#F0E68C] shadow-lg h-full">
                    <div className="relative">
                      <div className="absolute -top-4 -left-4 text-4xl text-[#FF6347]/20">"</div>
                      <blockquote className="text-lg italic text-[#8B4513]/80 mb-6 pt-4">
                        {problem.quote}
                      </blockquote>
                      <div className="absolute -bottom-4 -right-4 text-4xl text-[#FFD700]/20">"</div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#F0E68C]">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${problem.color} rounded-full flex items-center justify-center text-white font-bold`}>
                          {problem.category.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-[#8B4513]">
                            {problem.category === 'For Consumers' ? 'Local Resident' :
                             problem.category === 'For Local Shopkeepers' ? 'Small Shop Owner' :
                             'Market Analyst'}
                          </div>
                          <div className="text-sm text-[#8B4513]/60">Real experience</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Big Picture */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-white to-[#FFF8DC] rounded-3xl p-8 border border-[#F0E68C] shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#8B4513] mb-4">The Broken System</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-[#FF6347] rounded-full mt-2"></div>
                    <p className="text-[#8B4513]/80">Big delivery apps add 20-40% markup while paying shops 70% of the actual value</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mt-2"></div>
                    <p className="text-[#8B4513]/80">Local shops have inventory but no digital presence, losing customers daily</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-[#32CD32] rounded-full mt-2"></div>
                    <p className="text-[#8B4513]/80">Dark stores duplicate inventory that already exists in neighborhoods</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-[#8B4513] rounded-full mt-2"></div>
                    <p className="text-[#8B4513]/80">Communities lose local jobs and economic resilience</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 border border-[#F0E68C]">
                  <h4 className="text-lg font-bold text-[#8B4513] mb-4 text-center">The Cost Breakdown</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-[#8B4513]">Consumer Pays (Big Apps)</span>
                        <span className="text-sm font-bold text-[#FF6347]">₹140</span>
                      </div>
                      <div className="h-3 bg-[#F0E68C] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF6347] to-[#FF6347]/70 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-[#8B4513]">Shop Gets (After Commission)</span>
                        <span className="text-sm font-bold text-[#FFD700]">₹98</span>
                      </div>
                      <div className="h-3 bg-[#F0E68C] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/70 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-[#8B4513]">Actual Local Price</span>
                        <span className="text-sm font-bold text-[#32CD32]">₹100</span>
                      </div>
                      <div className="h-3 bg-[#F0E68C] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#32CD32] to-[#32CD32]/70 rounded-full" style={{ width: '71.4%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#F0E68C] text-center">
                      <div className="text-sm text-[#8B4513]/60">Consumers lose ₹40, shops lose ₹2, apps take ₹42</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl p-12 border border-[#F0E68C] shadow-xl">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 px-6 py-3 rounded-full mb-6">
              <X className="w-5 h-5 text-[#FF6347]" />
              <span className="text-sm font-semibold text-[#8B4513]">This Doesn't Have To Continue</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-[#8B4513]">Ready for a Better Way?</h3>
            <p className="text-xl text-[#8B4513]/60 mb-8 max-w-2xl mx-auto">
              The solution exists. Join us in building a system that works for everyone - shoppers, shopkeepers, and communities.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF6347]">50K+</div>
                <div className="text-[#8B4513]">Shoppers Affected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">5K+</div>
                <div className="text-[#8B4513]">Shops Struggling</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#32CD32]">₹10M+</div>
                <div className="text-[#8B4513]">Lost to Big Apps</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/solution"
                className="group relative bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#FF6347]/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                Discover the Solution
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/features"
                className="border-2 border-[#32CD32] text-[#32CD32] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#32CD32]/10 transition-all hover:scale-105 flex items-center gap-2"
              >
                See How It Works
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-[#8B4513]/40">
              Join 50K+ shoppers and 5K+ shops already benefiting from our solution
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;