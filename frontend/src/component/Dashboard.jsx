import React, { useState } from 'react';
  Home
} from 'lucide-react';
import ProductPlaceholder from './ProductPlaceholder';

const ShopkeeperDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [notifications, setNotifications] = useState(3);

  // Stats data
  const stats = [
    {
      title: 'Today\'s Revenue',
      value: '₹8,450',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-[#32CD32]/10 to-[#90EE90]/10',
      textColor: 'text-[#32CD32]'
    },
    {
      title: 'Total Orders',
      value: '48',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFA07A]/10',
      textColor: 'text-[#FF6347]'
    },
    {
      title: 'New Customers',
      value: '12',
      change: '+15%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-[#1E90FF]/10 to-[#87CEEB]/10',
      textColor: 'text-[#1E90FF]'
    },
    {
      title: 'Avg. Delivery Time',
      value: '18 min',
      change: '-3 min',
      trend: 'down',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-[#FFD700]/10 to-[#FFF8DC]/10',
      textColor: 'text-[#FFD700]'
    }
  ];

  // Recent orders
  const recentOrders = [
    {
      id: 'ORD-7842',
      customer: 'Rajesh Kumar',
      items: 4,
      amount: '₹1,245',
      time: '10 min ago',
      status: 'preparing',
      statusColor: 'bg-[#FFD700]',
      statusText: 'text-[#8B4513]'
    },
    {
      id: 'ORD-7841',
      customer: 'Priya Sharma',
      items: 2,
      amount: '₹645',
      time: '15 min ago',
      status: 'ready',
      statusColor: 'bg-[#32CD32]',
      statusText: 'text-[#228B22]'
    },
    {
      id: 'ORD-7840',
      customer: 'Amit Patel',
      items: 6,
      amount: '₹2,890',
      time: '25 min ago',
      status: 'delivered',
      statusColor: 'bg-[#1E90FF]',
      statusText: 'text-[#1C86EE]'
    },
    {
      id: 'ORD-7839',
      customer: 'Neha Gupta',
      items: 3,
      amount: '₹890',
      time: '40 min ago',
      status: 'on the way',
      statusColor: 'bg-[#9370DB]',
      statusText: 'text-[#483D8B]'
    }
  ];

  // Popular products
  const popularProducts = [
    { name: 'Fresh Milk', sales: 42, revenue: '₹2,520', rating: 4.8 },
    { name: 'Eggs (Dozen)', sales: 38, revenue: '₹3,420', rating: 4.9 },
    { name: 'Wheat Bread', sales: 35, revenue: '₹1,225', rating: 4.7 },
    { name: 'Organic Tomatoes', sales: 28, revenue: '₹1,120', rating: 4.6 },
    { name: 'Potatoes (1kg)', sales: 25, revenue: '₹875', rating: 4.5 }
  ];

  // Recent reviews
  const recentReviews = [
    { customer: 'Customer 1', rating: 5, comment: 'Fresh products, fast delivery!', time: '2 hours ago' },
    { customer: 'Customer 2', rating: 4, comment: 'Good quality, will order again', time: '5 hours ago' },
    { customer: 'Customer 3', rating: 5, comment: 'Perfect packaging, thanks!', time: '1 day ago' }
  ];

  // Upcoming deliveries
  const upcomingDeliveries = [
    { order: 'ORD-7842', address: '123 Main St', time: '10:30 AM', runner: 'Ramesh' },
    { order: 'ORD-7843', address: '456 Park Ave', time: '11:15 AM', runner: 'Suresh' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFFAF0]">
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#654321]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Green Valley Dairy</h1>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Shop ID: GV001 • Downtown, Mumbai</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="relative text-white hover:text-white/80">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6347] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <button className="flex items-center gap-2 text-white hover:text-white/80">
                <Settings className="w-6 h-6" />
                <span className="hidden sm:inline">Settings</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Store className="w-5 h-5 text-[#8B4513]" />
                </div>
                <div className="hidden md:block text-white">
                  <div className="font-bold">Rajesh Mehta</div>
                  <div className="text-sm text-white/80">Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-[#F0E68C] shadow-sm p-6 mb-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Products</span>
                  <span className="ml-auto bg-[#FF6347]/10 text-[#8B4513] text-xs px-2 py-1 rounded-full">42</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Orders</span>
                  <span className="ml-auto bg-[#FF6347]/10 text-[#8B4513] text-xs px-2 py-1 rounded-full">48</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'delivery'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Delivery</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <BarChart className="w-5 h-5" />
                  <span>Analytics</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'reviews'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <Star className="w-5 h-5" />
                  <span>Reviews</span>
                  <span className="ml-auto text-[#8B4513] text-xs">4.8 ★</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'payments'
                      ? 'bg-gradient-to-r from-[#FF6347]/10 to-[#FFD700]/10 text-[#8B4513] font-bold border border-[#F0E68C]'
                      : 'text-[#8B4513] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Payments</span>
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-[#F0E68C]">
                <h3 className="font-bold text-[#8B4513] mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8B4513]/60">Today's Profit</span>
                    <span className="font-bold text-[#32CD32]">₹7,577</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8B4513]/60">Conversion Rate</span>
                    <span className="font-bold text-[#1E90FF]">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8B4513]/60">Repeat Customers</span>
                    <span className="font-bold text-[#FFD700]">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8B4513]/60">Rating</span>
                    <span className="font-bold text-[#FF6347]">4.8 ★</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-[#F0E68C]">
                <h3 className="font-bold text-[#8B4513] mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-lg text-sm font-bold hover:shadow-md transition-all">
                    <Plus className="w-4 h-4" />
                    Add New Product
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-white border border-[#FF6347] text-[#8B4513] rounded-lg text-sm font-bold hover:bg-[#FFF8DC] transition-all">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-white border border-[#FFD700] text-[#8B4513] rounded-lg text-sm font-bold hover:bg-[#FFF8DC] transition-all">
                    <MessageSquare className="w-4 h-4" />
                    Chat Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="bg-white rounded-xl border border-[#F0E68C] shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#8B4513]">Dashboard Overview</h2>
                  <p className="text-[#8B4513]/60">Welcome back! Here's what's happening with your shop today.</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-[#FFF8DC] rounded-lg p-1">
                    {['today', 'week', 'month'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          timeRange === range
                            ? 'bg-white text-[#8B4513] shadow-sm border border-[#F0E68C]'
                            : 'text-[#8B4513]/60 hover:text-[#8B4513]'
                        }`}
                      >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#FFF8DC] text-[#8B4513] rounded-lg hover:bg-[#F0E68C] transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Date Range</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg border border-[#F0E68C] shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <div className={stat.textColor}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${
                      stat.trend === 'up' ? 'text-[#32CD32]' : 'text-[#FF6347]'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#8B4513] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#8B4513]/60">{stat.title}</div>
                </div>
              ))}
            </div>

            {/* Charts & Recent Orders */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl border border-[#F0E68C] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#8B4513]">Revenue Trend</h3>
                  <TrendingUp className="w-5 h-5 text-[#32CD32]" />
                </div>
                <div className="h-64 flex items-end gap-2 mb-4">
                  {[40, 60, 80, 70, 90, 85, 95].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-[#FFD700] to-[#FFF8DC] rounded-t-lg"
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs text-[#8B4513]/60 mt-2">Day {index + 1}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-[#8B4513]/60">
                  Revenue up 25% compared to last week
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border border-[#F0E68C] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#8B4513]">Recent Orders</h3>
                  <button className="text-[#FF6347] text-sm font-bold hover:text-[#D2691E]">
                    View All <ChevronRight className="inline w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-[#FFF8DC] rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-3 h-3 rounded-full ${order.statusColor}`}></div>
                          <div className="font-bold text-[#8B4513]">{order.id}</div>
                        </div>
                        <div className="text-sm text-[#8B4513]">{order.customer}</div>
                        <div className="text-xs text-[#8B4513]/60">{order.items} items • {order.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#8B4513]">{order.amount}</div>
                        <div className={`text-xs font-medium ${order.statusText} capitalize`}>{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Products & Reviews */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Popular Products */}
              <div className="bg-white rounded-xl border border-[#F0E68C] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#8B4513]">Popular Products</h3>
                  <Package className="w-5 h-5 text-[#FF6347]" />
                </div>
                <div className="space-y-4">
                  {popularProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-[#FFF8DC] rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden">
                          <ProductPlaceholder name={product.name} category="Groceries" className="text-xl" />
                        </div>
                        <div>
                          <div className="font-bold text-[#8B4513]">{product.name}</div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-3 h-3 text-[#FFD700]" />
                            <span className="text-[#8B4513]/60">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#8B4513]">{product.revenue}</div>
                        <div className="text-xs text-[#8B4513]/60">{product.sales} sales</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-xl border border-[#F0E68C] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#8B4513]">Recent Reviews</h3>
                  <Star className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div className="space-y-4">
                  {recentReviews.map((review, index) => (
                    <div key={index} className="bg-gradient-to-r from-white to-[#FFF8DC]/30 rounded-lg p-4 border border-[#F0E68C]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-[#8B4513]">{review.customer}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-[#FFD700]' : 'text-[#F0E68C]'}`}
                              fill={i < review.rating ? '#FFD700' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#8B4513]/80 mb-2">{review.comment}</p>
                      <div className="text-xs text-[#8B4513]/40">{review.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Deliveries & Notifications */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Upcoming Deliveries */}
              <div className="bg-gradient-to-r from-white to-[#FFF8DC] rounded-xl border border-[#F0E68C] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#8B4513]">Upcoming Deliveries</h3>
                  <Truck className="w-5 h-5 text-[#FF6347]" />
                </div>
                <div className="space-y-4">
                  {upcomingDeliveries.map((delivery, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#F0E68C]">
                      <div>
                        <div className="font-bold text-[#8B4513] mb-1">{delivery.order}</div>
                        <div className="text-sm text-[#8B4513]/60">{delivery.address}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#8B4513]">{delivery.time}</div>
                        <div className="text-sm text-[#8B4513]/60">Runner: {delivery.runner}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notifications */}
              <div className="bg-gradient-to-r from-white to-[#FFF8DC] rounded-xl border border-[#F0E68C] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#8B4513]">Notifications</h3>
                  <Bell className="w-5 h-5 text-[#FF6347]" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#F0E68C]">
                    <AlertCircle className="w-5 h-5 text-[#FF6347] flex-shrink-0" />
                    <div>
                      <div className="font-bold text-[#8B4513]">Low Stock Alert</div>
                      <div className="text-sm text-[#8B4513]/60">Milk is running low (only 5 left)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#F0E68C]">
                    <CheckCircle className="w-5 h-5 text-[#32CD32] flex-shrink-0" />
                    <div>
                      <div className="font-bold text-[#8B4513]">Payment Received</div>
                      <div className="text-sm text-[#8B4513]/60">₹7,577 credited to your account</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#F0E68C]">
                    <Smartphone className="w-5 h-5 text-[#1E90FF] flex-shrink-0" />
                    <div>
                      <div className="font-bold text-[#8B4513]">App Update Available</div>
                      <div className="text-sm text-[#8B4513]/60">New features available for your shop</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;