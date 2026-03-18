// components/payment/UpiPayment.jsx
import React, { useState } from 'react';
import { QrCode, Smartphone, RotateCcw } from 'lucide-react';

const UpiPayment = {
  process: async (amount, orderData) => {
    // This would integrate with actual UPI SDK
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `UPI_${Date.now()}`,
          message: 'UPI payment processed successfully'
        });
      }, 2000);
    });
  },

  PaymentUI: ({ amount, onComplete, onCancel }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showQR, setShowQR] = useState(true);
    const [upiId] = useState(`localshop.${Date.now()}@okaxis`);

    const handlePayment = async () => {
      setIsProcessing(true);
      try {
        const result = await UpiPayment.process(amount, { upiId });
        if (result.success) {
          onComplete(result);
        }
      } finally {
        setIsProcessing(false);
      }
    };

    return (
      <div className="bg-white rounded-xl border border-[#F0E68C] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Smartphone className="w-6 h-6 text-[#32CD32]" />
          <div>
            <h3 className="text-xl font-bold text-[#8B4513]">Pay with UPI</h3>
            <p className="text-sm text-[#8B4513]/60">Amount: ₹{amount.toFixed(2)}</p>
          </div>
        </div>

        {showQR ? (
          <div className="text-center mb-6">
            <div className="bg-gradient-to-br from-[#32CD32]/10 to-[#1E90FF]/10 rounded-lg p-4 inline-block mb-4">
              <div className="w-48 h-48 bg-white rounded-lg p-2 border-2 border-dashed border-[#32CD32] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <div className="text-[#8B4513] font-medium">UPI QR Code</div>
                  <div className="text-xs text-[#8B4513]/60 mt-2">Scan with any UPI app</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-[#FFF8DC] rounded-lg p-3">
                <p className="text-sm text-[#8B4513]">UPI ID: <span className="font-bold">{upiId}</span></p>
              </div>
              <p className="text-sm text-[#8B4513]/60">
                Or enter UPI ID manually in your app
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-[#8B4513] text-center mb-4">
              Redirecting to your UPI app...
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center justify-center gap-2 p-3 border border-[#F0E68C] rounded-lg text-[#8B4513] hover:bg-[#FFF8DC] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {showQR ? 'Show UPI ID' : 'Show QR Code'}
          </button>
          
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`p-3 rounded-lg font-bold transition-all ${
              isProcessing
                ? 'bg-gray-300 text-gray-500'
                : 'bg-gradient-to-r from-[#32CD32] to-[#1E90FF] text-white hover:shadow-lg'
            }`}
          >
            {isProcessing ? 'Processing...' : 'I have paid'}
          </button>
        </div>
      </div>
    );
  }
};

export default UpiPayment;