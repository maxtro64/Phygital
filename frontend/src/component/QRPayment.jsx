// components/QRPayment.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react'; // Install this: npm install qrcode.react
import { 
  QrCode, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Smartphone,
  Shield,
  RefreshCcw,
  Scan,
  Copy,
  Smartphone as PhoneIcon,
  ExternalLink,
  Download
} from 'lucide-react';

const QRPayment = ({ 
  amount, 
  orderId, 
  onPaymentComplete, 
  onPaymentCancel 
}) => {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, scanning, processing, success, failed
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [transactionId, setTransactionId] = useState('');
  const [upiId] = useState('localshop.demo@okaxis'); // Demo UPI ID
  const [isCopied, setIsCopied] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Generate UPI payment URL
  const generateUPIUrl = () => {
    // Format: upi://pay?pa=UPI_ID&pn=MERCHANT_NAME&am=AMOUNT&tn=NOTE&cu=CURRENCY
    const upiUrl = `upi://pay?pa=${upiId}&pn=LocalShop&am=${amount}&tn=Order ${orderId}&cu=INR`;
    return upiUrl;
  };

  // Initialize transaction
  useEffect(() => {
    const txId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setTransactionId(txId);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (paymentStatus === 'scanning' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && paymentStatus === 'scanning') {
      setPaymentStatus('failed');
    }
  }, [countdown, paymentStatus]);

  // Start payment
  const startPayment = () => {
    setPaymentStatus('scanning');
    setCountdown(300);
  };

  // Simulate payment success (when user says they scanned)
  const handlePaymentSuccess = () => {
    setScanned(true);
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const result = {
        success: true,
        transactionId: transactionId,
        orderId: orderId,
        amount: amount,
        message: 'Payment completed successfully!',
        method: 'UPI QR',
        timestamp: new Date().toISOString(),
        upiId: upiId
      };
      
      setPaymentStatus('success');
      
      // Call callback after showing success
      setTimeout(() => {
        onPaymentComplete(result);
      }, 2000);
    }, 2000);
  };

  // Copy UPI ID to clipboard
  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Open UPI app directly
  const openUPIApp = () => {
    const upiUrl = generateUPIUrl();
    window.location.href = upiUrl;
  };

  // Reset payment
  const resetPayment = () => {
    setPaymentStatus('idle');
    setCountdown(300);
    setScanned(false);
  };

  const upiUrl = generateUPIUrl();

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
              <h2 className="text-xl font-bold text-white">Scan QR to Pay</h2>
              <p className="text-white/80 text-sm">Order #{orderId}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">₹{amount.toFixed(2)}</div>
            <div className="text-xs text-white/60">Total Amount</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {paymentStatus === 'idle' && (
          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="text-center">
              <div className="relative inline-block mb-4">
                {/* QR Code Container */}
                <div className="bg-white p-6 rounded-xl border-4 border-[#FFD700] shadow-lg inline-block">
                  {/* Real QR Code */}
                  <QRCode
                    value={upiUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                    fgColor="#8B4513"
                    bgColor="#FFF8DC"
                    imageSettings={{
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6347'%3E%3Cpath d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'/%3E%3C/svg%3E",
                      height: 64,
                      width: 64,
                      excavate: true,
                    }}
                  />
                </div>
                
                {/* Animated scanning lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#32CD32] to-transparent animate-pulse rounded-full" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6347] to-transparent animate-pulse rounded-full" />
              </div>

              {/* UPI ID */}
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#F0E68C] mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-sm text-[#8B4513]/60 mb-1">UPI ID</div>
                    <div className="font-bold text-[#8B4513] text-lg">{upiId}</div>
                  </div>
                  <button
                    onClick={copyUPIId}
                    className="flex items-center gap-2 px-4 py-2 bg-[#32CD32] text-white rounded-lg hover:bg-[#228B22] transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-gradient-to-r from-[#F0FFF0] to-white rounded-xl p-4 border border-[#32CD32]">
              <h3 className="font-bold text-[#8B4513] mb-3 flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                How to Pay
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-[#8B4513]">Open UPI App</div>
                    <div className="text-sm text-[#8B4513]/60">Google Pay, PhonePe, Paytm, BHIM, etc.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-[#8B4513]">Scan QR Code</div>
                    <div className="text-sm text-[#8B4513]/60">Tap "Scan QR" and point camera at code above</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-[#8B4513]">Confirm Payment</div>
                    <div className="text-sm text-[#8B4513]/60">Verify amount ₹{amount.toFixed(2)} and tap pay</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-medium text-[#8B4513]">Enter UPI PIN</div>
                    <div className="text-sm text-[#8B4513]/60">Complete payment with your UPI PIN</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={openUPIApp}
                className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-[#1E90FF] to-[#4169E1] text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Open UPI App
              </button>
              <button
                onClick={startPayment}
                className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <Scan className="w-4 h-4" />
                I Have Scanned
              </button>
            </div>

            {/* Timer Display */}
            <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF6347]" />
                  <div>
                    <div className="font-bold text-[#8B4513]">{formatTime(countdown)}</div>
                    <div className="text-xs text-[#8B4513]/60">QR code expires in</div>
                  </div>
                </div>
                <button
                  onClick={() => window.open(`https://upayi.ml/?vpa=${upiId}&amount=${amount}&name=LocalShop`, '_blank')}
                  className="text-sm text-[#32CD32] hover:text-[#228B22] font-medium"
                >
                  Test Payment ↗
                </button>
              </div>
            </div>

            {/* Cancel Button */}
            <button
              onClick={onPaymentCancel}
              className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all"
            >
              Cancel Payment
            </button>

            {/* Security Note */}
            <div className="flex items-start gap-2 text-xs text-[#8B4513]/60 pt-4 border-t border-[#F0E68C]">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <p>This is a demo QR code. For real payments, use your UPI app to scan. Transaction ID: {transactionId}</p>
            </div>
          </div>
        )}

        {paymentStatus === 'scanning' && (
          <div className="text-center space-y-6 py-8">
            {/* Scanning Animation */}
            <div className="relative">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#32CD32]/20 to-[#1E90FF]/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-32 h-32 bg-gradient-to-r from-[#32CD32] to-[#1E90FF] rounded-full flex items-center justify-center animate-pulse">
                  <Scan className="w-16 h-16 text-white animate-bounce" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#8B4513]">Waiting for Payment</h3>
              <p className="text-[#8B4513]/70">
                We're waiting for your payment confirmation...
              </p>
              
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700]">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#FF6347]" />
                  <div className="text-lg font-bold text-[#8B4513]">{formatTime(countdown)}</div>
                </div>
                <div className="text-sm text-[#8B4513]/60">Time remaining to complete payment</div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#FF6347] rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-[#32CD32] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>

              <p className="text-sm text-[#8B4513]/60">
                Transaction ID: <span className="font-mono">{transactionId}</span>
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePaymentSuccess}
                className="w-full bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                ✓ I Have Paid Successfully
              </button>
              <button
                onClick={resetPayment}
                className="w-full border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Rescan QR Code
              </button>
            </div>
          </div>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#FFD700]/20 to-[#FF6347]/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-r from-[#FFD700] to-[#FF6347] rounded-full flex items-center justify-center animate-spin">
                  <Clock className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#8B4513]">Verifying Payment</h3>
              <p className="text-[#8B4513]/70">
                Please wait while we verify your payment...
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B4513]/60">Amount</span>
                  <span className="font-bold text-[#8B4513]">₹{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B4513]/60">Order ID</span>
                  <span className="font-mono">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B4513]/60">UPI ID</span>
                  <span className="font-mono">{upiId}</span>
                </div>
              </div>
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
              
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white rounded-xl p-4 border border-[#FFD700] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Order ID</span>
                  <span className="font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Amount Paid</span>
                  <span className="text-lg font-bold text-[#FF6347]">₹{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Transaction ID</span>
                  <span className="font-mono text-sm">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B4513]">Payment Method</span>
                  <span className="font-medium">UPI QR</span>
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
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-600">Payment Failed</h3>
              <p className="text-[#8B4513]/70">
                The payment could not be completed. Please try again.
              </p>
              
              <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 border border-red-200">
                <p className="text-[#8B4513]">
                  Possible reasons:
                </p>
                <ul className="text-sm text-[#8B4513]/60 text-left mt-2 space-y-1">
                  <li>• QR code expired (5 minute limit)</li>
                  <li>• Insufficient balance in your account</li>
                  <li>• UPI transaction limit exceeded</li>
                  <li>• Network issues with payment gateway</li>
                </ul>
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

export default QRPayment;