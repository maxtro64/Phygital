import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, Clock, ArrowRight, LayoutDashboard, List, Plus, AlertTriangle } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const ShopkeeperDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Overview');
  const [stats, setStats] = useState({ sales: '₹0', active: 0, customers: 0, lowStock: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const shopId = localStorage.getItem('shopId');
    if (!shopId) {
      navigate('/shopkeeper-login');
      return;
    }
    
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const productRes = await fetch(`${API_BASE_URL}/products/shop/${shopId}`);
        const productData = await productRes.json();
        if (productRes.ok) setProducts(productData);

        const orderRes = await fetch(`${API_BASE_URL}/orders/shoporders/${shopId}`);
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setOrders(orderData);
          setStats({
            sales: `₹${orderData.reduce((acc, order) => acc + order.total_amount, 0)}`,
            active: orderData.filter(o => o.delivery_status === 'Pending').length,
            customers: new Set(orderData.map(o => o.user_id?._id)).size,
            lowStock: productData.filter(p => p.stock < 10).length
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setOrders(orders.map(o => o._id === orderId ? { ...o, delivery_status: status } : o));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleStockUpdate = async (productId, newStock) => {
     try {
       const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ stock: newStock })
       });
       if (res.ok) {
         setProducts(products.map(p => p._id === productId ? { ...p, stock: newStock } : p));
       }
     } catch (err) {
       console.error('Failed to update stock', err);
     }
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Dashboard</h1>
           <p className="text-gray-600">Overview of your store's performance today.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
           {['Overview', 'Orders', 'Inventory'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                 activeTab === tab ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Sales', value: stats.sales, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Active Orders', value: stats.active, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
          { title: 'Products Low Stock', value: stats.lowStock, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
          { title: 'Total Customers', value: stats.customers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           {activeTab === 'Overview' || activeTab === 'Orders' ? (
             <>
               <h2 className="text-xl font-bold text-gray-900 mb-4">{activeTab === 'Overview' ? 'Recent Orders' : 'All Orders'}</h2>
               <div className="space-y-4">
                 {orders.length === 0 ? (
                   <p className="text-gray-500">No orders found.</p>
                 ) : (
                   orders.map(order => (
                     <div key={order._id} className="flex justify-between items-center p-4 border border-gray-50 rounded-xl bg-gray-50">
                       <div>
                         <p className="font-semibold text-gray-900">Order #{order._id.substring(0,6).toUpperCase()}</p>
                         <p className="text-sm text-gray-500">{order.products?.length} items • ₹{order.total_amount}</p>
                         <div className="flex items-center gap-2 mt-1">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                             order.delivery_status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                             order.delivery_status === 'Accepted' ? 'bg-blue-100 text-blue-600' :
                             'bg-green-100 text-green-600'
                           }`}>
                             {order.delivery_status}
                           </span>
                           <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                         </div>
                       </div>
                       {order.delivery_status === 'Pending' && (
                         <div className="flex space-x-2">
                           <button onClick={() => handleStatusUpdate(order._id, 'Accepted')} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">Accept</button>
                           <button onClick={() => handleStatusUpdate(order._id, 'Cancelled')} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">Reject</button>
                         </div>
                       )}
                     </div>
                   ))
                 )}
               </div>
             </>
           ) : (
             <>
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-900">Inventory Management</h2>
                 <button 
                   onClick={() => navigate('/products')}
                   className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-orange-600"
                 >
                   <Plus size={16} /> Add Product
                 </button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-50">
                       <th className="pb-3">Product</th>
                       <th className="pb-3">Status</th>
                       <th className="pb-3 text-right">Stock</th>
                       <th className="pb-3 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {products.map((product) => (
                       <tr key={product._id} className="group hover:bg-gray-50/50 transition-colors">
                         <td className="py-4 font-medium text-gray-900">{product.name}</td>
                         <td className="py-4">
                           {product.stock < 10 ? (
                             <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                               <AlertTriangle size={12} /> Low Stock
                             </span>
                           ) : (
                             <span className="text-green-500 text-xs font-bold">In Stock</span>
                           )}
                         </td>
                         <td className="py-4 text-right font-bold text-gray-700">{product.stock}</td>
                         <td className="py-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button 
                                 onClick={() => handleStockUpdate(product._id, product.stock + 10)}
                                 className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                                 title="Restock +10"
                               >
                                 <Plus size={14} />
                               </button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </>
           )}
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
           <div className="space-y-3 flex-1">
             <button 
                onClick={() => navigate('/products')}
                className="w-full text-left px-4 py-3 bg-orange-50 text-orange-600 rounded-xl font-medium hover:bg-orange-100 transition-colors flex items-center justify-between group"
             >
               <span>+ Manage Products</span>
               <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
             </button>
             <button 
                onClick={() => navigate('/profile')}
                className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors flex items-center justify-between group"
             >
               <span>View My Profile</span>
               <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
             </button>
           </div>
           
           {/* Summary Mini Card */}
           <div className="mt-6 p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
              <p className="text-xs text-gray-400 font-medium uppercase mb-1">Store Status</p>
              <div className="flex items-center justify-between">
                 <h4 className="font-bold text-lg">Active & Selling</h4>
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
