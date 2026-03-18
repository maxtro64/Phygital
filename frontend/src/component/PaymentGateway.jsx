import React, { useState } from 'react';
import { 
  Smartphone, 
  CreditCard, 
  Wallet, 
  Globe, 
  Zap, 
  Package,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react';

const PaymentGateway = ({ 
  amount, 
  orderData, 
  onPaymentComplete, 
  onPaymentCancel 
}) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: <Smartphone className="w-5 h-5" />, color: 'bg-[#32CD32]' },
    { id: 'card', name: 'Card', icon: <CreditCard className="w-5 h-5" />, color: 'bg-[#1E90FF]' },
    { id: 'wallet', name: 'Wallet', icon: <Wallet className="w-5 h-5" />, color: 'bg-[#FFD700]' },
    { id: 'paypal', name: 'PayPal', icon: <Globe className="w-5 h-5" />, color: 'bg-[#003087]' },
    { id: 'razorpay', name: 'Razorpay', icon: <Zap className="w-5 h-5" />, color: 'bg-[#FF6347]' },
    { id: 'cod', name: 'COD', icon: <Package className="w-5 h-5" />, color: 'bg-[#8B4513]' },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('Processing...');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = {
        success: true,
        transactionId: `TXN_${Date.now()}`,
        message: `Payment successful via ${selectedMethod.toUpperCase()}`,
        method: selectedMethod,
        amount: amount
      };
      
      setPaymentStatus(result);
      onPaymentComplete(result);
    } catch (error) {
      const result = {
        success: false,
        message: 'Payment failed. Please try again.'
      };
      setPaymentStatus(result);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentComplete = (result) => {
    setPaymentStatus(result);
    if (result.success) {
      setTimeout(() => {
        onPaymentComplete(result);
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {paymentStatus ? (
        <div className={`rounded-xl p-6 text-center ${
          paymentStatus.success 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
        }`}>
          <div className="flex flex-col items-center justify-center gap-4">
            {paymentStatus.success ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
            <h3 className={`text-xl font-bold ${
              paymentStatus.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {paymentStatus.success ? 'Payment Successful!' : 'Payment Failed'}
            </h3>
            <p className={`${paymentStatus.success ? 'text-green-600' : 'text-red-600'}`}>
              {paymentStatus.message}
            </p>
            {paymentStatus.transactionId && (
              <p className="text-sm text-gray-600">
                Transaction ID: {paymentStatus.transactionId}
              </p>
            )}
            <button
              onClick={() => setPaymentStatus(null)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Order Summary */}
          <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700] mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-[#8B4513]">Order Summary</h4>
                <p className="text-sm text-[#8B4513]/60">Order #{orderData?.orderId}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6347]">₹{amount.toFixed(2)}</div>
                <div className="text-xs text-[#8B4513]/60">Total Amount</div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">Choose Payment Method</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    selectedMethod === method.id
                      ? 'border-[#32CD32] bg-gradient-to-r from-white to-[#F0FFF0] shadow-sm'
                      : 'border-[#F0E68C] hover:border-[#32CD32] hover:bg-[#FFF8DC]'
                  }`}
                >
                  <div className={`${method.color} text-white p-3 rounded-lg mb-2`}>
                    {method.icon}
                  </div>
                  <span className="text-sm font-medium text-[#8B4513]">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="bg-gradient-to-br from-white to-[#FFFAF0] rounded-xl border border-[#F0E68C] p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${
                paymentMethods.find(m => m.id === selectedMethod)?.color
              } text-white p-2 rounded-lg`}>
                {paymentMethods.find(m => m.id === selectedMethod)?.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#8B4513]">
                  Pay with {paymentMethods.find(m => m.id === selectedMethod)?.name}
                </h3>
                <p className="text-sm text-[#8B4513]/60">
                  {selectedMethod === 'upi' && 'Scan QR code or enter UPI ID'}
                  {selectedMethod === 'card' && 'Enter card details securely'}
                  {selectedMethod === 'wallet' && 'Login to your wallet app'}
                  {selectedMethod === 'paypal' && 'International payments via PayPal'}
                  {selectedMethod === 'razorpay' && 'Secure Indian payment gateway'}
                  {selectedMethod === 'cod' && 'Pay when your order arrives'}
                </p>
              </div>
            </div>
            
            {/* Method-specific content */}
            {selectedMethod === 'upi' && (
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-[#F0E68C] inline-block mb-4">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#32CD32]/20 to-[#1E90FF]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2">📱</div>
                      <div className="text-sm text-[#8B4513]">UPI QR Code</div>
                      <div className="text-xs text-[#8B4513]/60 mt-1">Amount: ₹{amount.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#8B4513]/60">
                  Scan with Google Pay, PhonePe, or any UPI app
                </p>
              </div>
            )}
            
            {selectedMethod === 'razorpay' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-lg p-4 border border-[#FFD700]">
                  <p className="text-[#8B4513] text-center font-medium">
                    You'll be redirected to Razorpay's secure payment page
                  </p>
                </div>
                <p className="text-xs text-[#8B4513]/60 text-center">
                  Secure payment processing by Razorpay
                </p>
              </div>
            )}
            
            {selectedMethod === 'paypal' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-lg p-4 border border-[#FFD700]">
                  <p className="text-[#8B4513] text-center">
                    ₹{amount.toFixed(2)} ≈ ${(amount / 83).toFixed(2)} USD
                  </p>
                </div>
                <p className="text-xs text-[#8B4513]/60 text-center">
                  Secure international payments via PayPal
                </p>
              </div>
            )}
            
            {selectedMethod === 'cod' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-lg p-4 border border-[#FFD700]">
                  <p className="text-[#8B4513] text-center">
                    Pay ₹{amount.toFixed(2)} when your order arrives
                  </p>
                </div>
                <p className="text-sm text-[#8B4513]/60 text-center">
                  Additional ₹20 cash handling fee applies
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPaymentCancel}
              className="border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`py-3 rounded-lg font-bold transition-all ${
                isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#32CD32] to-[#1E90FF] text-white hover:shadow-lg'
              }`}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentGateway;