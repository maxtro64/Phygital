// components/RazorpayQRPayment.jsx
import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Smartphone,
  Wallet,
  Shield,
  RefreshCcw,
  Scan,
  Smartphone as SmartphoneIcon,
  CreditCard,
  Zap,
  Smartphone as PhoneIcon,
  Banknote
} from 'lucide-react';

const RazorpayQRPayment = ({ 
  amount, 
  orderId, 
  onPaymentComplete, 
  onPaymentCancel 
}) => {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, loading, success, failed
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay SDK loaded');
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

  // Generate Razorpay order ID
  const generateRazorpayOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `order_${timestamp}_${random}`;
  };

  // Payment methods supported by Razorpay
  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: <SmartphoneIcon className="w-5 h-5" />, color: 'bg-[#32CD32]' },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" />, color: 'bg-[#1E90FF]' },
    { id: 'wallet', name: 'Wallet', icon: <Wallet className="w-5 h-5" />, color: 'bg-[#FFD700]' },
    { id: 'netbanking', name: 'Net Banking', icon: <Banknote className="w-5 h-5" />, color: 'bg-[#8B4513]' },
  ];

  const startRazorpayPayment = async () => {
    if (!isRazorpayLoaded) {
      alert('Payment gateway is loading. Please wait...');
      return;
    }

    setPaymentStatus('loading');
    
    // Generate order ID
    const razorpayOrderId = generateRazorpayOrderId();
    setRazorpayOrderId(razorpayOrderId);

    try {
      // Razorpay configuration
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'LocalShop',
        description: `Order #${orderId}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log('Payment successful:', response);
          
          // Create successful result
          const result = {
            success: true,
            transactionId: response.razorpay_payment_id,
            orderId: orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            amount: amount,
            message: 'Payment completed successfully!',
            method: 'Razorpay',
            timestamp: new Date().toISOString()
          };
          
          setPaymentStatus('success');
          
          // Call callback after showing success
          setTimeout(() => {
            onPaymentComplete(result);
          }, 2000);
        },
        prefill: {
          name: 'LocalShop Customer',
          email: 'customer@example.com',
          contact: '9876543210'
        },
        theme: {
          color: '#FF6347',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled by user');
            setPaymentStatus('failed');
            onPaymentComplete({
              success: false,
              message: 'Payment cancelled',
              orderId: orderId
            });
          }
        },
        notes: {
          order_id: orderId,
          customer_note: 'LocalShop Order'
        },
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          qr_code: true // Enable QR code payment
        },
        qr_code: {
          enabled: true,
          image: true
        }
      };

      // Create Razorpay instance
      const rzp = new window.Razorpay(options);
      
      // Open payment modal
      rzp.open();
      
    } catch (error) {
      console.error('Razorpay error:', error);
      setPaymentStatus('failed');
      onPaymentComplete({
        success: false,
        message: 'Payment failed. Please try again.',
        orderId: orderId
      });
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // For demo - Simulate payment if Razorpay is not configured
  const simulateDemoPayment = () => {
    setPaymentStatus('loading');
    
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
      
      setTimeout(() => {
        onPaymentComplete(result);
      }, 2000);
    }, 1500);
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setRazorpayOrderId('');
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
              <p className="text-white/80 text-sm">Secure payment gateway</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">{formatCurrency(amount)}</div>
            <div className="text-xs text-white/60">Order #{orderId}</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {paymentStatus === 'idle' && (
          <div className="space-y-6">
            {/* Payment Amount */}
            <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700] text-center">
              <div className="text-2xl font-bold text-[#FF6347] mb-1">{formatCurrency(amount)}</div>
              <div className="text-sm text-[#8B4513]/60">Total amount to pay</div>
            </div>

            {/* QR Code Display */}
            <div className="text-center">
              <div className="relative inline-block">
                {/* QR Code Container */}
                <div className="w-64 h-64 bg-gradient-to-br from-[#32CD32]/10 to-[#1E90FF]/10 rounded-xl p-4 border-4 border-white shadow-lg">
                  {/* QR Code Pattern */}
                  <div className="grid grid-cols-12 gap-1 h-full">
                    {Array.from({ length: 144 }).map((_, index) => (
                      <div
                        key={index}
                        className={`
                          rounded-sm transition-all duration-300 hover:scale-110
                          ${Math.random() > 0.5 ? 'bg-[#FF6347]' : 'bg-[#FFD700]'}
                          ${index < 12 || index % 12 === 0 || index % 12 === 11 || index > 131 ? 'bg-[#8B4513]' : ''}
                          ${(index >= 50 && index <= 53) || (index >= 86 && index <= 89) ? 'bg-[#32CD32]' : ''}
                        `}
                      />
                    ))}
                  </div>
                  
                  {/* Center Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF6347] to-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Scanning Animation */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#32CD32] to-transparent animate-pulse rounded-full" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#FF6347] to-transparent animate-pulse rounded-full" />
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-bold text-[#8B4513] mb-3">Supported Payment Methods</h3>
              <div className="grid grid-cols-4 gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex flex-col items-center p-3 bg-[#FFF8DC] rounded-lg border border-[#F0E68C] hover:border-[#FF6347] transition-colors"
                  >
                    <div className={`${method.color} text-white p-2 rounded-lg mb-2`}>
                      {method.icon}
                    </div>
                    <span className="text-xs font-medium text-[#8B4513]">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-[#F0FFF0] to-white rounded-xl p-4 border border-[#32CD32]">
              <h3 className="font-bold text-[#8B4513] mb-2 flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                How to Pay with QR Code
              </h3>
              <div className="space-y-2 text-sm text-[#8B4513]/70">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#32CD32] text-white rounded-full flex items-center justify-center text-xs mt-0.5">1</div>
                  <span>Open any UPI app (GPay, PhonePe, Paytm)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#32CD32] text-white rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
                  <span>Tap "Scan QR Code" in the app</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#32CD32] text-white rounded-full flex items-center justify-center text-xs mt-0.5">3</div>
                  <span>Point camera at the QR code above</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#32CD32] text-white rounded-full flex items-center justify-center text-xs mt-0.5">4</div>
                  <span>Confirm payment of {formatCurrency(amount)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={startRazorpayPayment}
                className="w-full bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Scan className="w-5 h-5" />
                {isRazorpayLoaded ? 'Proceed to Payment' : 'Loading Payment Gateway...'}
              </button>
              
              {/* Demo payment button for testing */}
              <button
                onClick={simulateDemoPayment}
                className="w-full border-2 border-[#32CD32] text-[#32CD32] py-2 rounded-lg font-bold hover:bg-[#F0FFF0] transition-all text-sm"
              >
                Try Demo Payment (No real money)
              </button>
              
              <button
                onClick={onPaymentCancel}
                className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-2 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all text-sm"
              >
                Cancel Payment
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-2 text-xs text-[#8B4513]/60 pt-4 border-t border-[#F0E68C]">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <p>
                Secure payment powered by Razorpay. Your payment details are encrypted and secure.
                {!import.meta.env.VITE_RAZORPAY_KEY_ID && ' Using demo mode.'}
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'loading' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#FF6347]/20 to-[#FFD700]/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FF6347] to-[#FFD700] rounded-full flex items-center justify-center animate-spin">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#8B4513]">Processing Payment</h3>
              <p className="text-[#8B4513]/60">Please wait while we prepare your payment...</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#FF6347] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-[#32CD32] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            <button
              onClick={resetPayment}
              className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Back to Payment
            </button>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#32CD32]/20 to-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <CheckCircle className="w-16 h-16 text-[#32CD32]" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-[#32CD32]">Payment Successful!</h3>
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700]">
                <p className="text-[#8B4513] font-medium">Order #{orderId}</p>
                <p className="text-lg font-bold text-[#FF6347]">{formatCurrency(amount)}</p>
                <p className="text-sm text-[#8B4513]/60">Payment ID: {razorpayOrderId}</p>
              </div>
              <p className="text-[#8B4513]/60">Your order has been confirmed and will arrive soon!</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-[#8B4513]">
                <Clock className="w-4 h-4" />
                <span>Estimated delivery: 15-30 minutes</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[#8B4513]">
                <Shield className="w-4 h-4" />
                <span>Payment verified and secured</span>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-100 to-rose-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-red-600">Payment Failed</h3>
              <p className="text-[#8B4513]/60">There was an issue processing your payment.</p>
              <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 border border-red-200">
                <p className="text-[#8B4513]">Please try again or use a different payment method.</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetPayment}
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

export default RazorpayQRPayment;