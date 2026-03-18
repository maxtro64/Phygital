import React, { useState, useEffect, useRef } from 'react';
import { User, MapPin, CreditCard, Bell, Loader2, Save, Camera, LogOut, ChevronRight, Phone, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePic: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  const [orders, setOrders] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token) {
        navigate('/login');
        return;
      }

      // Always populate from localStorage first so the page is never blank
      setUserData({
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
        address: localStorage.getItem('userAddress') || '',
        profilePic: localStorage.getItem('userPic') || ''
      });

      try {
        const profileRes = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const profileData = await profileRes.json();
        
        if (profileRes.ok) {
          const profile = {
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            profilePic: profileData.profilePic || ''
          };
          setUserData(profile);
          // Sync localStorage with fresh backend data
          localStorage.setItem('userName', profile.name);
          localStorage.setItem('userEmail', profile.email);
          localStorage.setItem('userPhone', profile.phone);
          localStorage.setItem('userAddress', profile.address);
        }

        // Fetch Orders
        try {
          const ordersRes = await fetch(`${API_BASE_URL}/orders/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (ordersRes.ok) {
            const ordersData = await ordersRes.json();
            setOrders(ordersData);
          }
        } catch (e) { console.log("Orders fetch failed", e); }

      } catch (error) {
        console.error('Backend unreachable, using local data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUserData({ ...userData, profilePic: reader.result }); // Temp: Store base64 for demo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Get userId for the URL

    try {
      const res = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      
      if (res.ok) {
        alert('Profile updated successfully!');
        setPreviewImage(null);
      } else {
        const data = await res.json();
        alert('Update failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-orange-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 z-0 opacity-50" />
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-orange-100 overflow-hidden border-4 border-white shadow-xl">
                      {previewImage || userData.profilePic ? (
                        <img src={previewImage || userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-orange-500">
                          {userData.name?.[0]}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="absolute -bottom-2 -right-2 p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-orange-600 transition-colors"
                    >
                      <Camera size={20} />
                    </button>
                    <input 
                      type="file" 
                      hidden 
                      ref={fileInputRef} 
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                 </div>
                 
                 <h2 className="mt-6 text-2xl font-black text-gray-900 tracking-tight">{userData.name}</h2>
                 <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">{activeTab}</p>
               </div>

               <div className="mt-10 space-y-2">
                {[
                  { label: 'My Profile', icon: User, tab: 'Profile' },
                  { label: 'Order History', icon: ShoppingBag, tab: 'Orders' },
                  { label: 'Saved Addresses', icon: MapPin, tab: 'Addresses' },
                  { label: 'Support & Help', icon: MessageCircle, tab: 'Support' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-black transition-all ${
                      activeTab === item.tab 
                        ? 'bg-gray-900 text-white shadow-xl scale-[1.02]' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} />
                      {item.label}
                    </div>
                    <ChevronRight size={16} className={activeTab === item.tab ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black text-red-500 hover:bg-red-50 transition-all mt-4"
                >
                  <LogOut size={20} />
                  Logout Account
                </button>
               </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 h-full">
              <AnimatePresence mode="wait">
                {activeTab === 'Profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-center">
                       <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Profile Settings</h3>
                       <div className="px-4 py-1.5 bg-green-100 text-green-600 rounded-full text-xs font-black uppercase tracking-widest">Active Member</div>
                    </div>

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                          <input 
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                          <input 
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                          <input 
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 transition-all"
                          />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Delivery Address</label>
                          <textarea 
                            name="address"
                            value={userData.address}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                          />
                       </div>

                       <div className="md:col-span-2 pt-6">
                         <button 
                           disabled={saving}
                           className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-200 hover:shadow-orange-300 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                         >
                           {saving ? <Loader2 className="animate-spin" /> : <Save />}
                           {saving ? 'UPDATING PROFILE...' : 'SAVE CHANGES'}
                         </button>
                       </div>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'Orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Your Orders</h3>
                    
                    {orders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                        <ShoppingBag size={48} className="text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest">No orders found yet</p>
                        <button onClick={() => navigate('/shops')} className="mt-6 text-orange-500 font-black hover:scale-105 transition-transform">START SHOPPING NOW &rarr;</button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map(order => (
                          <div key={order._id} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center justify-between hover:border-orange-200 transition-all group">
                             <div className="flex items-center gap-4">
                               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 font-black shadow-sm">
                                 #{order._id.slice(-4).toUpperCase()}
                               </div>
                               <div>
                                 <h4 className="font-black text-gray-900">{order.shop_id?.shopName || 'Local Store'}</h4>
                                 <p className="text-xs text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                               </div>
                             </div>
                             <div className="text-right">
                               <div className="text-lg font-black text-gray-900">₹{order.total_amount}</div>
                               <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{order.delivery_status}</div>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
