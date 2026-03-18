import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Store, 
  ShoppingCart, 
  TrendingUp, 
  ShieldCheck,
  Search,
  Loader2,
  Info
} from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminPanel = () => {
  const [stats, setStats] = useState({ users: 0, shops: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/stats`);
        const json = await res.json();
        if (res.ok && json.success) {
          setStats(json.data);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const [pendingShops, setPendingShops] = useState([]);
  const [fetchingShops, setFetchingShops] = useState(false);

  useEffect(() => {
    const fetchPendingShops = async () => {
      setFetchingShops(true);
      try {
        const res = await fetch('http://localhost:3000/api/admin/pending-shops');
        const json = await res.json();
        if (res.ok && json.success) {
          setPendingShops(json.data);
        }
      } catch (error) {
        console.error('Error fetching pending shops:', error);
      } finally {
        setFetchingShops(false);
      }
    };
    fetchPendingShops();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/shop/${id}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setPendingShops(pendingShops.filter(s => s._id !== id));
        alert(`Shop ${status} successfully!`);
      }
    } catch (error) {
      console.error('Error verifying shop:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" />
            System Administration
          </h1>
          <p className="text-gray-500 mt-1">Global overview of the LocalShop platform</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Users', value: stats.totalUsers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Active Shops', value: stats.totalShops || 0, icon: Store, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Total Orders', value: stats.totalOrders || 0, icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Platform Revenue', value: `₹${stats.totalRevenue || 0}`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shop Approval Queue */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                Shop Approval Queue
                {pendingShops.length > 0 && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">{pendingShops.length} Pending</span>}
              </h2>
              <div className="space-y-4">
                {pendingShops.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <Store size={40} className="mx-auto mb-2 opacity-20" />
                    <p>No pending shop approvals at the moment.</p>
                  </div>
                ) : (
                  pendingShops.map(shop => (
                    <div key={shop._id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-50 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-bold text-gray-900">{shop.shopName}</p>
                        <p className="text-sm text-gray-500">{shop.name} • {shop.email}</p>
                        <p className="text-xs text-gray-400 mt-1">{shop.address}</p>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <button 
                          onClick={() => handleVerify(shop._id, 'Approved')}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleVerify(shop._id, 'Rejected')}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Order Management Section */}
            <OrderManagement />
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">System Health</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>API Performance</span>
                  <span className="text-green-600 font-bold">Excellent</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Database Load</span>
                  <span className="text-blue-600 font-bold">Normal</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[12%]"></div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-50">
                 <p className="text-xs text-gray-400 mb-4 font-medium uppercase">Automation Services</p>
                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Email Notifications Active
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Payment Gateway Integrated
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders(); // Refresh
        alert(`Order status updated to ${status}`);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-400">Loading Orders...</div>;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Order Status Management</h2>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-400">No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="p-4 border rounded-2xl flex items-center justify-between bg-gray-50/30">
              <div>
                <p className="font-bold text-gray-900">Order #{order._id.substring(18).toUpperCase()}</p>
                <p className="text-sm text-gray-500">
                  {order.delivery_status} • ₹{order.total_amount}
                </p>
              </div>
              <div className="flex gap-2">
                {['Preparing', 'Out for Delivery', 'Delivered'].map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order._id, status)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-orange-50 hover:border-orange-200 transition-colors"
                  >
                    Set {status}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
