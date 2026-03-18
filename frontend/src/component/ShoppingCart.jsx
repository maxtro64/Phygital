import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCart,
  Heart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Clock, 
  Shield, 
  ArrowLeft, 
  Tag,
  Store,
  Package,
  ChevronRight,
  Truck,
  Sparkles,
  AlertCircle,
  CheckCircle,
  QrCode,
  Zap,
  CreditCard,
  Wallet,
  Smartphone,
  Loader2,
  ExternalLink,
  Phone as PhoneIcon,
  Copy,
  AlertCircle as AlertCircleIcon,
  Download,
  Banknote,
  Lock
} from 'lucide-react';

// API Configuration moved to config.js

// Razorpay Payment Component
const RazorpayPayment = ({ 
  amount, 
  orderId, 
  onPaymentComplete, 
  onPaymentCancel 
}) => {
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');

  // Load Razorpay SDK
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setIsRazorpayLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
        setIsRazorpayLoaded(false);
      };
      document.body.appendChild(script);
    } else {
      setIsRazorpayLoaded(true);
    }
  }, []);

  // Create Razorpay Order and QR via Backend
  const createRazorpayOrder = async () => {
    try {
      setPaymentLoading(true);
      
      // 1. Create Base Order
      const res = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, orderId })
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      setRazorpayOrderId(data.order.id);
      
      // 2. Create Real QR Code via Razorpay API (on backend)
      const qrRes = await fetch(`${API_BASE_URL}/create-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: localStorage.getItem('userName') || 'Customer',
          amount, 
          orderId 
        })
      });
      
      const qrData = await qrRes.json();
      if (qrData.success && qrData.qrCode.image_url) {
        setQrImageUrl(qrData.qrCode.image_url);
      } else {
        // Fallback to manual UPI QR if API fails
        const upiData = `upi://pay?pa=localshop@razor&pn=LocalShop&am=${amount}&tn=Order_${orderId}&cu=INR`;
        setQrImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(upiData)}&bgcolor=FFF8DC&color=8B4513`);
      }
      
      setPaymentLoading(false);
      
    } catch (error) {
      console.error('Error creating order/QR:', error);
      setPaymentLoading(false);
      alert('Failed to initialize payment. Try again.');
    }
  };

  // Start Razorpay Payment using Backend Order ID
  const startRazorpayPayment = async () => {
    if (!isRazorpayLoaded) {
      alert('Payment gateway is loading...');
      return;
    }

    try {
      setPaymentStatus('processing');
      
      // 1. Create Order on Backend
      const orderRes = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, orderId })
      });
      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.message);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key',
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'LocalShop',
        description: `Payment for Order #${orderId}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          setPaymentStatus('processing');
          // 2. Verify Payment on Backend
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              setPaymentStatus('success');
              onPaymentComplete({
                success: true,
                method: 'Razorpay',
                transactionId: response.razorpay_payment_id
              });
            } else {
              throw new Error('Verification failed');
            }
          } catch (err) {
            setPaymentStatus('failed');
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || 'Customer',
          email: 'customer@example.com',
          contact: '9876543210'
        },
        theme: { color: '#FF6347' },
        modal: {
          ondismiss: () => setPaymentStatus('idle')
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
    }
  };

  // Demo payment for testing (without actual transaction)
  const simulateDemoPayment = () => {
    setPaymentStatus('processing');
    
    setTimeout(() => {
      const result = {
        success: true,
        transactionId: `DEMO_${Date.now()}`,
        orderId: orderId,
        razorpayOrderId: `demo_order_${Date.now()}`,
        razorpayPaymentId: `demo_payment_${Date.now()}`,
        amount: amount,
        message: 'Demo payment completed successfully!',
        method: 'UPI QR',
        timestamp: new Date().toISOString(),
        isDemo: true
      };
      
      setPaymentStatus('success');
      setTimeout(() => onPaymentComplete(result), 2000);
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#F0E68C] overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Pay with Razorpay</h2>
              <p className="text-white/80 text-sm">Order #{orderId}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">{formatCurrency(amount)}</div>
            <div className="text-xs text-white/60">Total Amount</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {paymentStatus === 'idle' && (
          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="text-center">
              {paymentLoading ? (
                <div className="w-64 h-64 mx-auto flex flex-col items-center justify-center bg-gradient-to-br from-[#FFD700]/10 to-[#FF6347]/10 rounded-xl border-4 border-white">
                  <Loader2 className="w-12 h-12 text-[#FF6347] animate-spin mb-4" />
                  <p className="text-[#8B4513] font-medium">Generating QR Code...</p>
                </div>
              ) : qrImageUrl ? (
                <div className="relative">
                  <img 
                    src={qrImageUrl} 
                    alt="Scan to Pay QR Code" 
                    className="w-64 h-64 mx-auto rounded-xl border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=upi://pay?pa=demo@razorpay&pn=LocalShop&am=${amount}&tn=Order_${orderId}&cu=INR`;
                    }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#32CD32] to-transparent animate-pulse rounded-full" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6347] to-transparent animate-pulse rounded-full" />
                  
                  {/* QR Instructions */}
                  <div className="mt-4 bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700]">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-sm text-[#8B4513]/60 mb-1">Scan to Pay</div>
                        <div className="font-bold text-[#8B4513]">UPI QR Code</div>
                      </div>
                      <button
                        onClick={() => window.open(qrImageUrl, '_blank')}
                        className="flex items-center gap-2 px-3 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-[#4169E1] transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Save QR
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative inline-block mb-4">
                  <div className="w-64 h-64 bg-gradient-to-br from-[#FF6347]/10 to-[#FFD700]/10 rounded-xl p-4 border-4 border-white shadow-lg flex flex-col items-center justify-center">
                    <QrCode className="w-24 h-24 text-[#8B4513]/30 mb-4" />
                    <p className="text-[#8B4513] font-medium">QR Code will be generated</p>
                    <p className="text-sm text-[#8B4513]/60">Click "Generate QR Code" below</p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Details */}
            <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#F0E68C]">
              <h3 className="font-bold text-[#8B4513] mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Order Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8B4513]/70">Order ID:</span>
                  <span className="font-mono text-[#8B4513] font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]/70">Amount:</span>
                  <span className="font-bold text-[#FF6347]">{formatCurrency(amount)}</span>
                </div>
                {razorpayOrderId && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#8B4513]/70">Razorpay ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#8B4513]">{razorpayOrderId.substring(0, 12)}...</span>
                      <button
                        onClick={() => copyToClipboard(razorpayOrderId)}
                        className="text-[#32CD32] hover:text-[#228B22]"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={createRazorpayOrder}
                disabled={paymentLoading}
                className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {paymentLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <QrCode className="w-5 h-5" />
                )}
                {paymentLoading ? 'Generating...' : 'Generate QR Code'}
              </button>
              
              <button
                onClick={startRazorpayPayment}
                disabled={!isRazorpayLoaded}
                className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                <CreditCard className="w-5 h-5" />
                {isRazorpayLoaded ? 'Checkout' : 'Loading...'}
              </button>
            </div>

            {/* Alternative Options */}
            <div className="space-y-3">
              <button
                onClick={simulateDemoPayment}
                className="w-full border-2 border-[#32CD32] text-[#32CD32] py-3 rounded-lg font-bold hover:bg-[#F0FFF0] transition-all text-sm flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Try Demo Payment (No Real Money)
              </button>
              
              <button
                onClick={onPaymentCancel}
                className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-2 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all text-sm"
              >
                Cancel Payment
              </button>
            </div>

            {/* Security Info */}
            <div className="bg-gradient-to-r from-[#F0FFF0] to-white rounded-xl p-4 border border-[#32CD32]">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#32CD32] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#8B4513] mb-1">Secure Payment</h4>
                  <p className="text-sm text-[#8B4513]/60">
                    Powered by Razorpay • PCI-DSS Compliant • 256-bit SSL Encryption
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#32CD32] rounded-full"></div>
                      <span className="text-xs text-[#8B4513]/60">Test Mode</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#1E90FF] rounded-full"></div>
                      <span className="text-xs text-[#8B4513]/60">No Real Money</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#FFD700]/20 to-[#FF6347]/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-r from-[#FFD700] to-[#FF6347] rounded-full flex items-center justify-center animate-spin">
                  <Loader2 className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#8B4513]">Processing Payment</h3>
              <p className="text-[#8B4513]/70">
                Please complete the payment in the opened window...
              </p>
              
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700]">
                <div className="flex justify-between mb-2">
                  <span className="text-[#8B4513]">Amount</span>
                  <span className="font-bold text-[#FF6347]">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Order ID</span>
                  <span className="font-mono">{orderId}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#FF6347] rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-[#32CD32] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>

              <p className="text-sm text-[#8B4513]/60">
                Do not close this window until payment is complete
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#32CD32]/20 to-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <CheckCircle className="w-16 h-16 text-[#32CD32]" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#32CD32]">Payment Successful!</h3>
              
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700] space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Order ID</span>
                  <span className="font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Amount Paid</span>
                  <span className="text-lg font-bold text-[#FF6347]">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Transaction ID</span>
                  <span className="font-mono text-sm">TXN_{Date.now().toString().substr(8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Status</span>
                  <span className="font-medium text-[#32CD32]">Confirmed</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-[#8B4513]">
                  <Clock className="w-4 h-4" />
                  <span>Estimated delivery: 15-30 minutes</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-[#8B4513]">
                  <Shield className="w-4 h-4" />
                  <span>Payment verified and secured</span>
                </div>
              </div>

              <p className="text-sm text-[#8B4513]/60">
                Your order has been confirmed! Thank you for shopping local.
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-100 to-rose-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <AlertCircleIcon className="w-16 h-16 text-red-500" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-600">Payment Failed</h3>
              <p className="text-[#8B4513]/70">
                The payment could not be completed. Please try again.
              </p>
              
              <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 border border-red-200">
                <p className="text-[#8B4513] font-medium mb-2">
                  Possible reasons:
                </p>
                <ul className="text-sm text-[#8B4513]/60 text-left space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span>Payment cancelled by user</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span>Network connectivity issues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span>Insufficient balance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span>Transaction timeout</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setPaymentStatus('idle')}
                className="w-full bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Try Payment Again
              </button>
              <button
                onClick={onPaymentCancel}
                className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-2 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main ShoppingCartPage Component remains exactly the same as you provided
const ShoppingCartPage = () => {
  const { cartItems, setCartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem('deliveryAddress');
    return saved ? JSON.parse(saved) : {
      type: 'Home',
      street: '',
      area: '',
      city: '',
      pincode: '',
      instructions: ''
    };
  });
  const [editingAddress, setEditingAddress] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [tipAmount, setTipAmount] = useState(10);
  const [savings, setSavings] = useState(0);
  const [showPromoApplied, setShowPromoApplied] = useState(false);
  const [showQRPayment, setShowQRPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId] = useState(`ORD${Date.now().toString().substr(8, 6)}`);
  const [paymentMethod, setPaymentMethod] = useState('Online'); // 'Online' or 'COD'

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
    const totalSavings = cartItems.reduce((sum, item) => sum + (((item.originalPrice || item.price || 0) - (item.price || 0)) * item.quantity), 0);
    const deliveryFee = subtotal > 200 ? 0 : 20;
    const platformFee = subtotal * 0.05;
    const total = subtotal + deliveryFee + platformFee + tipAmount;
    
    return { subtotal, totalSavings, deliveryFee, platformFee, total };
  };

  const { subtotal, totalSavings, deliveryFee, platformFee, total } = calculateTotals();



  // Remove item from cart — use context
  const removeItem = (id) => {
    removeFromCart(id);
  };

  // Apply promo code
  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'local10') {
      setSavings(50);
      setShowPromoApplied(true);
      setTimeout(() => setShowPromoApplied(false), 3000);
    }
  };

  // Tips options
  const tipOptions = [0, 10, 20, 50, 100];

  const handlePaymentComplete = async (result) => {
    // 1. Pre-validation: Ensure all items have valid MongoDB ObjectIds
    const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
    const invalidItems = cartItems.filter(item => !isValidId(item.id || item._id));
    
    if (invalidItems.length > 0) {
      alert(`Oops! Your cart contains legacy items that are no longer supported (${invalidItems.map(i => i.name).join(', ')}). Please clear your cart and add them again.`);
      return;
    }

    setShowQRPayment(false);
    
    if (result.success) {
      try {
        const userId = localStorage.getItem('userId');
        const shopId = cartItems.length > 0 ? (cartItems[0].shopId || cartItems[0].shop_id) : null;
        
        if (!userId || !shopId) {
          alert('Missing user or shop information. Please login again.');
          // Optionally redirect to login or home page
          // navigate('/login');
          return;
        }

        const res = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
             user_id: userId,
             shop_id: shopId,
             products: cartItems.map(item => ({ 
  product: item.id || item._id, 
  name: item.name,
  quantity: item.quantity, 
  price: item.price 
})),
             total_amount: total,
             payment_status: result.method === 'COD' ? 'Pending' : 'Completed',
             payment_method: result.method,
             delivery_status: 'Placed',
             delivery_address: `${address.street}, ${address.area}, ${address.city} - ${address.pincode}`,
             phone: localStorage.getItem('userPhone') || '9876543210'
          })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Save order info for tracking page
          const finalOrderId = data.orderId || data._id;
          localStorage.setItem('lastOrderId', finalOrderId);
          localStorage.setItem('lastOrderAmount', String(total));
          localStorage.setItem('lastOrderAddress', `${address.street}, ${address.area}, ${address.city} - ${address.pincode}`);
          
          setPaymentSuccess(true);
          clearCart();
          
          // Auto-redirect to specific tracking page after 3 seconds
          setTimeout(() => navigate(`/order/tracking/${finalOrderId}`), 3000);
        } else {
          alert(`Order failed: ${data.message || 'Server error'}`);
        }
      } catch (err) {
        console.error(err);
        alert('Could not submit order to server.');
      }
    } else {
      alert(`Payment failed: ${result.message}`);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6347] via-[#FFD700] to-[#32CD32] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-white hover:text-white/80">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Your Shopping Cart</h1>
                  <p className="text-white/80 text-sm">Supporting local shops in your neighborhood</p>
                </div>
              </div>
            </div>
            <div className="text-white text-right">
              <div className="text-sm">Shopping from</div>
              <div className="font-bold">{cartItems.length} local shops</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Success Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 border border-[#F0E68C] shadow-lg max-w-md text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#32CD32] to-[#1E90FF] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#8B4513] mb-2">Order Confirmed!</h2>
            <p className="text-[#8B4513]/70 mb-4">
              Your order #{orderId} has been placed successfully and will arrive in 15-30 minutes.
            </p>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700] mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-[#8B4513]">Total Paid</span>
                <span className="font-bold text-[#FF6347]">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B4513]">Order ID</span>
                <span className="font-mono">{orderId}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link to="/" className="block bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                Back to Home
              </Link>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Payment Modal */}
      {showQRPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-[#F0E68C] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#8B4513]">Complete Payment</h2>
              <button
                onClick={() => setShowQRPayment(false)}
                className="text-[#8B4513] hover:text-[#FF6347]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <RazorpayPayment
                amount={total}
                orderId={orderId}
                onPaymentComplete={handlePaymentComplete}
                onPaymentCancel={() => setShowQRPayment(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              {/* Cart Summary */}
              <div className="bg-white rounded-2xl p-6 border border-[#F0E68C] shadow-lg mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-[#FF6347]" />
                    <h2 className="text-xl font-bold text-[#8B4513]">Your Items ({cartItems.length})</h2>
                  </div>
                  <div className="text-sm text-[#32CD32] font-bold">
                    Saving {formatCurrency(totalSavings + savings)} total
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-gradient-to-r from-white to-[#FFF8DC]/30 rounded-xl p-4 border border-[#F0E68C]">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-[#FF6347]/10 to-[#FFD700]/10 rounded-lg overflow-hidden flex items-center justify-center">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="text-3xl w-full h-full items-center justify-center" style={{ display: item.image ? 'none' : 'flex' }}>
                              {item.category === 'Dairy' && '🥛'}
                              {item.category === 'Poultry' && '🥚'}
                              {item.category === 'Bakery' && '🍞'}
                              {item.category === 'Vegetables' && '🍅'}
                              {item.category === 'Fruits' && '🍌'}
                              {item.category === 'Medicines' && '💊'}
                              {item.category === 'Electronics' && '📱'}
                              {!['Dairy','Poultry','Bakery','Vegetables','Fruits','Medicines','Electronics'].includes(item.category) && '📦'}
                            </div>
                          </div>
                          {!item.inStock && (
                            <div className="absolute -top-2 -right-2 bg-[#FF6347] text-white text-xs px-2 py-1 rounded-full">
                              Out of stock
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-[#8B4513] text-lg">{item.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Store className="w-4 h-4 text-[#FFD700]" />
                                <span className="text-[#8B4513]/60 text-sm">{item.shop}</span>
                                <span className="text-xs bg-[#32CD32]/10 text-[#32CD32] px-2 py-0.5 rounded">
                                  {item.shopId}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="w-4 h-4 text-[#1E90FF]" />
                                <span className="text-sm text-[#1E90FF] font-medium">
                                  Delivery in {item.deliveryTime}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-[#32CD32]">{formatCurrency(item.price)}</span>
                                <span className="text-sm text-[#8B4513]/60 line-through">{formatCurrency(item.originalPrice)}</span>
                              </div>
                              <div className="text-xs text-[#FF6347] font-bold mt-1">
                                Save {formatCurrency(item.originalPrice - item.price)}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-3 bg-[#F0E68C]/30 rounded-full px-4 py-2">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-[#8B4513] hover:text-[#FF6347]"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-[#8B4513]">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-[#8B4513] hover:text-[#32CD32]"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-[#8B4513]">
                                Total: <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#FF6347] hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-6 border border-[#F0E68C] shadow-lg mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#FF6347]" />
                    <h2 className="text-xl font-bold text-[#8B4513]">Delivery Address</h2>
                  </div>
                  <button
                    onClick={() => setEditingAddress(!editingAddress)}
                    className="text-[#32CD32] font-bold hover:text-[#228B22] transition-colors text-sm"
                  >
                    {editingAddress ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {editingAddress ? (
                  <div className="space-y-4">
                    {/* Use Current Location */}
                    <button
                      onClick={() => {
                        if ('geolocation' in navigator) {
                          navigator.geolocation.getCurrentPosition(
                            async (position) => {
                              const { latitude, longitude } = position.coords;
                              localStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lng: longitude }));
                              setAddress(prev => ({
                                ...prev,
                                street: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
                                area: 'Near your location',
                                city: 'Auto-detected',
                              }));
                              alert('Location detected! Please fill in the remaining details.');
                            },
                            () => alert('Location permission denied. Please enter address manually.')
                          );
                        }
                      }}
                      className="w-full py-3 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      <MapPin size={18} />
                      Use Current Location
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        placeholder="Street / Building"
                        value={address.street}
                        onChange={e => setAddress(prev => ({ ...prev, street: e.target.value }))}
                        className="px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:ring-2 focus:ring-[#FF6347] text-sm text-[#8B4513] font-medium"
                      />
                      <input
                        placeholder="Area / Locality"
                        value={address.area}
                        onChange={e => setAddress(prev => ({ ...prev, area: e.target.value }))}
                        className="px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:ring-2 focus:ring-[#FF6347] text-sm text-[#8B4513] font-medium"
                      />
                      <input
                        placeholder="City"
                        value={address.city}
                        onChange={e => setAddress(prev => ({ ...prev, city: e.target.value }))}
                        className="px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:ring-2 focus:ring-[#FF6347] text-sm text-[#8B4513] font-medium"
                      />
                      <input
                        placeholder="Pincode"
                        value={address.pincode}
                        onChange={e => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                        className="px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:ring-2 focus:ring-[#FF6347] text-sm text-[#8B4513] font-medium"
                      />
                    </div>
                    <input
                      placeholder="Delivery instructions (e.g., Ring bell twice)"
                      value={address.instructions}
                      onChange={e => setAddress(prev => ({ ...prev, instructions: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl focus:ring-2 focus:ring-[#FF6347] text-sm text-[#8B4513] font-medium"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          localStorage.setItem('deliveryAddress', JSON.stringify(address));
                          setEditingAddress(false);
                        }}
                        className="flex-1 py-3 bg-[#32CD32] text-white font-bold rounded-xl hover:bg-[#228B22] transition-all"
                      >
                        Save Address
                      </button>
                      <select
                        value={address.type}
                        onChange={e => setAddress(prev => ({ ...prev, type: e.target.value }))}
                        className="px-4 py-3 bg-[#FFF8DC]/30 border border-[#F0E68C] rounded-xl text-sm text-[#8B4513] font-bold"
                      >
                        <option value="Home">🏠 Home</option>
                        <option value="Office">🏢 Office</option>
                        <option value="Other">📍 Other</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700]">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-[#FF6347] to-[#FFD700] text-white p-3 rounded-lg">
                        {address.type === 'Home' ? '🏠' : address.type === 'Office' ? '🏢' : '📍'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-[#8B4513]">{address.type}</span>
                          <span className="text-xs bg-[#32CD32]/10 text-[#32CD32] px-2 py-0.5 rounded">
                            Default
                          </span>
                        </div>
                        {address.street ? (
                          <>
                            <p className="text-[#8B4513]">{address.street}</p>
                            <p className="text-[#8B4513]">{address.area}, {address.city} - {address.pincode}</p>
                          </>
                        ) : (
                          <p className="text-[#8B4513]/50 italic">No address set — click Edit to add one</p>
                        )}
                        {address.instructions && (
                          <div className="mt-3 pt-3 border-t border-[#F0E68C]">
                            <p className="text-sm text-[#8B4513]/60">
                              <span className="font-medium">Instructions:</span> {address.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-[#32CD32] mb-2">
                          <Truck className="w-4 h-4" />
                          <span className="text-sm font-medium">Delivery in 15-30 mins</span>
                        </div>
                        <div className="text-xs text-[#8B4513]/40">
                          From shops within 1km
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-2xl p-6 border border-[#F0E68C] shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-6 h-6 text-[#32CD32]" />
                  <h2 className="text-xl font-bold text-[#8B4513]">Promo Code & Offers</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Promo Input */}
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="w-full px-4 py-3 bg-[#FFF8DC]/30 border border-[#FFD700] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32CD32]"
                      />
                      {showPromoApplied && (
                        <div className="absolute -top-8 right-0 bg-[#32CD32] text-white px-3 py-1 rounded-lg text-sm animate-pulse">
                          🎉 Promo applied! Saved ₹50
                        </div>
                      )}
                    </div>
                    <button
                      onClick={applyPromo}
                      className="bg-gradient-to-r from-[#FFD700] to-[#FF6347] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Active Offers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-[#FFF8DC] to-white border border-[#FFD700] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gradient-to-br from-[#FF6347] to-[#FFD700] text-white p-2 rounded-lg">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-[#8B4513]">LOCAL10</div>
                          <div className="text-xs text-[#8B4513]/60">Get ₹50 off</div>
                        </div>
                      </div>
                      <div className="text-xs text-[#8B4513]/40">On orders above ₹200</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#F0FFF0] to-white border border-[#90EE90] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gradient-to-br from-[#32CD32] to-[#1E90FF] text-white p-2 rounded-lg">
                          <Store className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-[#8B4513]">FIRSTORDER</div>
                          <div className="text-xs text-[#8B4513]/60">₹100 off first order</div>
                        </div>
                      </div>
                      <div className="text-xs text-[#8B4513]/40">For new customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl p-6 border border-[#F0E68C] shadow-lg mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-[#1E90FF]" />
                    <h2 className="text-xl font-bold text-[#8B4513]">Order Summary</h2>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#8B4513]">Subtotal</span>
                      <span className="font-bold text-[#8B4513]">{formatCurrency(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#8B4513]">Delivery Fee</span>
                      <div className="flex items-center gap-2">
                        {deliveryFee === 0 ? (
                          <>
                            <span className="text-sm text-[#32CD32] line-through">{formatCurrency(20)}</span>
                            <span className="font-bold text-[#32CD32]">FREE</span>
                          </>
                        ) : (
                          <span className="font-bold text-[#8B4513]">{formatCurrency(deliveryFee)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#8B4513]">Platform Fee (5%)</span>
                      <span className="font-bold text-[#8B4513]">{formatCurrency(platformFee)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[#8B4513]">Promo Discount</span>
                        <span className="font-bold text-[#32CD32]">- {formatCurrency(savings)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-[#8B4513]">Tip to Local Runner</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={tipAmount}
                          onChange={(e) => setTipAmount(Number(e.target.value))}
                          className="bg-[#FFF8DC]/30 border border-[#FFD700] rounded-lg px-2 py-1 text-[#8B4513]"
                        >
                          {tipOptions.map(amount => (
                            <option key={amount} value={amount}>
                              {formatCurrency(amount)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Total Savings */}
                    <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F0FFF0] rounded-xl p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#8B4513]">Total Savings</span>
                        <span className="font-bold text-[#32CD32] text-lg">{formatCurrency(totalSavings + savings)}</span>
                      </div>
                      <div className="text-xs text-[#8B4513]/60">
                        You saved {(((totalSavings + savings) / (subtotal + totalSavings + savings)) * 100).toFixed(1)}% shopping local
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-[#F0E68C] pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-[#8B4513] text-lg">Total Amount</div>
                        <div className="text-sm text-[#8B4513]/60">Including all fees</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#FF6347]">{formatCurrency(total)}</div>
                        <div className="text-xs text-[#8B4513]/40">
                          vs {formatCurrency(subtotal + totalSavings + savings + 30 + (subtotal * 0.3))} on big apps
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h3 className="font-bold text-[#8B4513] mb-1">Payment Method</h3>
                    
                    <button
                      onClick={() => setPaymentMethod('Online')}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${paymentMethod === 'Online' ? 'border-[#32CD32] bg-[#F0FFF0] ring-2 ring-[#32CD32]/20' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white p-3 rounded-lg">
                        <QrCode className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#8B4513]">Online Payment</div>
                        <div className="text-sm text-[#8B4513]/60">UPI, Cards, Netbanking & Wallet</div>
                      </div>
                      <div className="ml-auto">
                        <CheckCircle className={`w-5 h-5 ${paymentMethod === 'Online' ? 'text-[#32CD32]' : 'text-gray-200'}`} />
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('COD')}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="bg-blue-500 text-white p-3 rounded-lg">
                        <Banknote className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#8B4513]">Cash on Delivery</div>
                        <div className="text-sm text-[#8B4513]/60">Pay when your order arrives</div>
                      </div>
                      <div className="ml-auto">
                        <CheckCircle className={`w-5 h-5 ${paymentMethod === 'COD' ? 'text-blue-500' : 'text-gray-200'}`} />
                      </div>
                    </button>
                  </div>

                  {/* Security & Benefits */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#32CD32]" />
                      <span className="text-sm text-[#8B4513]">Secure PCI-DSS compliant payment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-sm text-[#8B4513]">Supporting {cartItems.length} local shops</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#1E90FF]" />
                      <span className="text-sm text-[#8B4513]">Delivery in 15-30 minutes</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        if (paymentMethod === 'Online') {
                          setShowQRPayment(true);
                        } else {
                          // Trigger COD directly
                          handlePaymentComplete({ success: true, method: 'COD' });
                        }
                      }}
                      className={`w-full py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-white ${paymentMethod === 'Online' ? 'bg-gradient-to-r from-[#FF6347] to-[#FFD700] hover:shadow-[#FF6347]/30' : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700'}`}
                    >
                      {paymentMethod === 'Online' ? (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Pay {formatCurrency(total)}
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Place COD Order ({formatCurrency(total)})
                        </>
                      )}
                    </button>
                    
                    <Link
                      to="/products"
                      className="w-full border-2 border-[#FFD700] text-[#8B4513] py-3 rounded-xl font-bold hover:bg-[#FFF8DC] transition-all flex items-center justify-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Footer Note */}
                  <div className="mt-6 pt-6 border-t border-[#F0E68C] text-center">
                    <p className="text-xs text-[#8B4513]/60">
                      By placing your order, you agree to our <Link to="/terms" className="text-[#32CD32] hover:underline">Terms</Link> & <Link to="/privacy" className="text-[#32CD32] hover:underline">Privacy Policy</Link>
                    </p>
                  </div>
                </div>

                {/* Support Local Note */}
                <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F0FFF0] rounded-2xl p-6 border border-[#90EE90]">
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-[#32CD32] to-[#1E90FF] text-white p-3 rounded-lg">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#8B4513] mb-2">You're Supporting Local!</h3>
                      <p className="text-sm text-[#8B4513]/60">
                        Your purchase keeps {formatCurrency(total * 0.95)} in the local economy and creates neighborhood jobs.
                      </p>
                      <Link
                        to="/mission"
                        className="inline-flex items-center gap-1 text-[#32CD32] hover:text-[#228B22] text-sm font-medium mt-2"
                      >
                        Learn more about our impact
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-[#F0E68C] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#8B4513] mb-4">Your cart is empty</h2>
            <p className="text-lg text-[#8B4513]/70 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items from our local shops yet
            </p>
            <div className="space-y-4 max-w-sm mx-auto">
              <Link
                to="/products"
                className="block bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
              >
                <Store className="inline mr-2 w-5 h-5" />
                Explore Local Shops
              </Link>
              <Link
                to="/"
                className="block border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Cart Tips */}
        {cartItems.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-white to-[#FFF8DC] rounded-xl p-4 border border-[#F0E68C]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-[#1E90FF]" />
                <h4 className="font-bold text-[#8B4513]">Fast Delivery</h4>
              </div>
              <p className="text-sm text-[#8B4513]/60">Items arrive in 15-30 mins from shops within 1km</p>
            </div>
            
            <div className="bg-gradient-to-r from-white to-[#F0FFF0] rounded-xl p-4 border border-[#90EE90]">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-[#32CD32]" />
                <h4 className="font-bold text-[#8B4513]">Quality Guarantee</h4>
              </div>
              <Link to="/features" className="text-sm text-[#8B4513]/60 hover:text-[#32CD32]">
                Fresh products with shop guarantee or refund
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-white to-[#FFE4E1] rounded-xl p-4 border border-[#FFB6C1]">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-[#FF6347]" />
                <h4 className="font-bold text-[#8B4513]">Need Help?</h4>
              </div>
              <Link to="/contact" className="text-sm text-[#8B4513]/60 hover:text-[#FF6347]">
                Call 1800-PHYGITAL or chat with support
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;