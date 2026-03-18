import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Coffee,
  ChefHat,
  Leaf,
  Award,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Find Nearby Shops', path: '/products' },
    { name: 'Daily Deals', path: '/products?filter=deals' },
    { name: 'Local Categories', path: '/products' },
    { name: 'Seasonal Specials', path: '/products?filter=seasonal' },
    { name: 'Community Events', path: '/community' },
    { name: 'Shop Directory', path: '/shops' }
  ];

  const shopOwnerLinks = [
    { name: 'Go Online Free', path: '/shopkeeper-login' },
    { name: 'Seller Dashboard', path: '/shopkeeper-login' },
    { name: 'Digital Tools', path: '/features' },
    { name: 'Local Marketing', path: '/shopkeepers' },
    { name: 'Success Stories', path: '/mission' },
    { name: 'Growth Support', path: '/contact' }
  ];

  const bottomLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Shop Policies', path: '/policies' },
    { name: 'Accessibility', path: '/accessibility' },
    { name: 'Community', path: '/community' }
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, color: 'from-[#FF6347] to-[#FFD700]', label: 'Instagram', url: 'https://instagram.com' },
    { icon: <Facebook className="w-5 h-5" />, color: 'from-[#32CD32] to-[#FF6347]', label: 'Facebook', url: 'https://facebook.com' },
    { icon: <Twitter className="w-5 h-5" />, color: 'from-[#FFD700] to-[#32CD32]', label: 'Twitter', url: 'https://twitter.com' },
    { icon: <Youtube className="w-5 h-5" />, color: 'from-[#FF6347] to-[#32CD32]', label: 'YouTube', url: 'https://youtube.com' }
  ];

  const communityStats = [
    { value: '50K+', label: 'Local Shoppers', color: 'text-[#FF6347]', link: '/solution' },
    { value: '5K+', label: 'Neighborhood Shops', color: 'text-[#32CD32]', link: '/shopkeepers' },
    { value: '200+', label: 'Local Communities', color: 'text-[#FFD700]', link: '/mission' },
    { value: '30%', label: 'Average Savings', color: 'text-[#FF6347]', link: '/solution' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#FFF8DC] to-white pt-16 pb-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF6347]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#32CD32]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-2xl"></div>
        
        {/* Floating Local Icons */}
        <div className="absolute top-10 left-1/4 animate-float">
          <Coffee className="w-6 h-6 text-[#FF6347]/20" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float animation-delay-1000">
          <ChefHat className="w-6 h-6 text-[#FFD700]/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
          <Leaf className="w-6 h-6 text-[#32CD32]/20" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6347] to-[#FFD700] bg-clip-text text-transparent group-hover:from-[#32CD32] group-hover:to-[#1E90FF] transition-all">
                  PHYGITAL
                </h3>
                <p className="text-sm text-[#32CD32] font-medium">Your Neighborhood Marketplace</p>
              </div>
            </Link>
            
            <p className="text-[#8B4513]/80 leading-relaxed">
              Bringing your neighborhood shops online. Shop local, save more, and strengthen your community with every purchase.
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/signup" 
                className="bg-[#FF6347] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#ff5236] transition-colors shadow-lg hover:shadow-xl hover:shadow-[#FF6347]/30 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-2">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <span className="text-xs text-[#8B4513]/60">4.9 ★ Rated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#8B4513]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#FF6347] to-[#FFD700] rounded-full"></div>
              Shop Local
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#8B4513]/80 hover:text-[#FF6347] transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-[#32CD32] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Shop Owners */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#8B4513]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#32CD32] to-[#FFD700] rounded-full"></div>
              For Shop Owners
            </h4>
            <ul className="space-y-3">
              {shopOwnerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#8B4513]/80 hover:text-[#32CD32] transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-[#FF6347] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <Link
              to="/shopkeeper-login"
              className="mt-6 p-4 bg-white rounded-xl border border-[#F0E68C] hover:border-[#32CD32] transition-colors block"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FF6347]" />
                <span className="text-sm font-semibold text-[#8B4513]">Join 5K+ Local Shops</span>
              </div>
            </Link>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#8B4513]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#FF6347] to-[#32CD32] rounded-full"></div>
              Stay Connected
            </h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-[#8B4513]/80">
                <div className="bg-[#FF6347]/10 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-[#FF6347]" />
                </div>
                <div>
                  <div className="text-sm">Shop Support</div>
                  <div className="font-semibold text-[#8B4513]">1-800-PHYGITAL</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[#8B4513]/80">
                <div className="bg-[#32CD32]/10 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-[#32CD32]" />
                </div>
                <div>
                  <div className="text-sm">Email</div>
                  <div className="font-semibold text-[#8B4513]">hello@phygital.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[#8B4513]/80">
                <div className="bg-[#FFD700]/10 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                </div>
                <div>
                  <div className="text-sm">Serving</div>
                  <div className="font-semibold text-[#8B4513]">Neighborhoods Everywhere</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <div className="text-sm font-semibold text-[#8B4513] mb-3">Follow Our Community</div>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative bg-gradient-to-br ${social.color} p-3 rounded-xl hover:shadow-lg transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <div className="text-white">{social.icon}</div>
                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-8 border border-[#F0E68C] shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-bold mb-2 text-[#8B4513]">Join Our Local Deals Newsletter</h4>
                <p className="text-[#8B4513]/60">
                  Get weekly updates on neighborhood deals, new local shops, and community savings.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-full border border-[#F0E68C] focus:outline-none focus:border-[#32CD32] focus:ring-2 focus:ring-[#32CD32]/20 bg-white text-[#8B4513]"
                />
                <button className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-[#FF6347]/30 transition-all">
                  Get Local Deals
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F0E68C] pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-[#8B4513]/60 text-sm">
                &copy; {new Date().getFullYear()} Phygital. All rights reserved. 
                <span className="text-[#FF6347] mx-2">❤</span>
                Supporting local communities.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-[#8B4513]/60 hover:text-[#FF6347] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#32CD32] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#8B4513]/60">Local Verified</span>
              </div>
              <div className="h-4 w-px bg-[#F0E68C]"></div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#32CD32]" />
                <span className="text-sm text-[#8B4513]/60">Community First</span>
              </div>
              <div className="h-4 w-px bg-[#F0E68C]"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FF6347]" />
                <span className="text-sm text-[#8B4513]/60">Neighborhood Trust</span>
              </div>
            </div>
          </div>

          {/* App Download Badges */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-4">
              <button className="bg-[#FF6347] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-[#ff5236] transition-colors shadow-lg hover:shadow-xl">
                <div className="text-xl">🏪</div>
                <div className="text-left">
                  <div className="text-xs">Shop Local on</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              
              <button className="bg-[#32CD32] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-[#2db82d] transition-colors shadow-lg hover:shadow-xl">
                <div className="text-xl">📍</div>
                <div className="text-left">
                  <div className="text-xs">Find Nearby on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="mt-8 pt-6 border-t border-[#F0E68C]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {communityStats.map((stat) => (
                <Link
                  key={stat.label}
                  to={stat.link}
                  className="text-center group"
                >
                  <div className={`text-2xl font-bold ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#8B4513]/60 mt-1 group-hover:text-[#FF6347] transition-colors">
                    {stat.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;