import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, ArrowLeft, Home as HomeIcon, Phone, Zap } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { Link, useParams } from 'react-router-dom';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(25); // minutes

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        // 1. If we have a specific orderId in URL, fetch it
        if (orderId && orderId !== 'tracking') {
          const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (res.ok) {
            const data = await res.json();
            setOrder(data);
            return;
          }
        }

        // 2. Fallback to latest order from history if no ID
        if (userId) {
          const res = await fetch(`${API_BASE_URL}/orders/user`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.length > 0) {
              setOrder(data[0]); // Sorted by -createdAt
              return;
            }
          }
        }

        // 3. Last resort fallback to localStorage for privacy/offline
        const lastOrderId = localStorage.getItem('lastOrderId');
        if (lastOrderId) {
          setOrder({
            _id: lastOrderId,
            total_amount: Number(localStorage.getItem('lastOrderAmount')) || 0,
            delivery_status: 'Placed',
            delivery_address: localStorage.getItem('lastOrderAddress') || 'Not specified',
            createdAt: new Date().toISOString()
          });
          return;
        }

        // Demo data if everything fails
        setOrder({
          _id: 'DEMO1024',
          total_amount: 450,
          delivery_status: 'Placed',
          delivery_address: '123 Main Street, Downtown, Mumbai',
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  // Real-time status polling
  useEffect(() => {
    if (!orderId || orderId === 'tracking') return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          
          const statusMap = { 
            'Pending': 0, 
            'Placed': 0,
            'Accepted': 1, 
            'Packed': 1, 
            'Out for Delivery': 2, 
            'Delivered': 3 
          };
          setCurrentStep(statusMap[data.delivery_status] ?? 0);
          
          if (data.delivery_status === 'Delivered') {
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(pollInterval);
  }, [orderId]);

  // ETA and step sync
  useEffect(() => {
    if (!order) return;

    const statusMap = { 
      'Pending': 0, 
      'Placed': 0,
      'Accepted': 1, 
      'Packed': 1, 
      'Out for Delivery': 2, 
      'Delivered': 3 
    };
    setCurrentStep(statusMap[order.delivery_status] ?? 0);
  }, [order]);

  // ETA countdown
  useEffect(() => {
    if (currentStep >= 3) {
      setEta(0);
      return;
    }
    const etaMap = [25, 18, 8, 0];
    setEta(etaMap[currentStep]);

    const countdown = setInterval(() => {
      setEta(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000); // every minute

    return () => clearInterval(countdown);
  }, [currentStep]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const steps = [
    {
      title: 'Order Placed',
      desc: 'Your order has been confirmed by the shop',
      icon: CheckCircle,
      activeColor: 'bg-green-500',
      activeText: 'text-green-600'
    },
    {
      title: 'Preparing',
      desc: 'The shop is packing your items',
      icon: Package,
      activeColor: 'bg-orange-500',
      activeText: 'text-orange-600'
    },
    {
      title: 'Out for Delivery',
      desc: 'Your delivery partner is on the way',
      icon: Truck,
      activeColor: 'bg-blue-500',
      activeText: 'text-blue-600'
    },
    {
      title: 'Delivered',
      desc: 'Your order has been delivered. Enjoy!',
      icon: HomeIcon,
      activeColor: 'bg-emerald-500',
      activeText: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-orange-500 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Order Header Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-orange-400 mb-2">LIVE TRACKING</div>
                <h1 className="text-3xl font-black tracking-tighter">Order #{typeof order._id === 'string' ? order._id.substring(0, 8).toUpperCase() : order._id}</h1>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 font-bold">Total</div>
                <div className="text-2xl font-black text-orange-400">₹{order.total_amount}</div>
              </div>
            </div>

            {/* ETA Banner */}
            {currentStep < 3 ? (
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300 font-bold uppercase tracking-widest">Estimated Arrival</div>
                    <div className="text-xl font-black">{eta} min{eta !== 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live
                </div>
              </div>
            ) : (
              <div className="mt-6 bg-emerald-500/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle size={24} className="text-emerald-400" />
                <span className="font-black text-emerald-300">Delivered Successfully!</span>
              </div>
            )}
          </div>

          {/* Steps Tracker */}
          <div className="p-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100" />
              <div
                className="absolute left-6 top-8 w-0.5 bg-orange-500 transition-all duration-1000 ease-out"
                style={{ height: `${Math.min(100, (currentStep / 3) * 100)}%` }}
              />

              <div className="space-y-10 relative">
                {steps.map((step, index) => {
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;
                  const StepIcon = step.icon;

                  return (
                    <div key={index} className={`flex items-start transition-all duration-500 ${!isActive ? 'opacity-40' : ''}`}>
                      <div className={`w-12 h-12 ${isActive ? step.activeColor : 'bg-gray-200'} text-white rounded-full flex items-center justify-center shrink-0 z-10 ring-4 ring-white shadow-lg transition-all duration-500 ${isCurrent ? 'scale-110 ring-orange-100' : ''}`}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div className="ml-6 pt-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className={`text-lg font-black ${isActive ? step.activeText : 'text-gray-400'}`}>{step.title}</h3>
                          {isCurrent && currentStep < 3 && (
                            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-black animate-pulse">
                              <Zap size={12} className="fill-orange-500" />
                              In Progress
                            </div>
                          )}
                          {isActive && !isCurrent && (
                            <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-black">
                              ✓ Done
                            </div>
                          )}
                        </div>
                        <p className={`mt-1 text-sm ${isActive ? 'text-gray-500' : 'text-gray-300'}`}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                <MapPin size={20} />
              </div>
              <h3 className="font-black text-gray-900">Delivery Address</h3>
            </div>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              {order.delivery_address || 'Address not specified'}
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                <Phone size={20} />
              </div>
              <h3 className="font-black text-gray-900">Need Help?</h3>
            </div>
            <p className="text-gray-500 font-medium text-sm mb-3">Having trouble with your order?</p>
            <Link to="/contact" className="text-orange-500 font-black text-sm hover:underline">Contact Support →</Link>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 py-4 bg-gray-900 text-white font-black text-center rounded-2xl hover:bg-orange-600 transition-all shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            className="flex-1 py-4 bg-white text-gray-900 font-black text-center rounded-2xl border border-gray-200 hover:border-orange-300 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
