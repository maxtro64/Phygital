// components/payment/PayPalPayment.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = {
  process: async (amount, orderData) => {
    // PayPal processing is handled by their SDK
    return { success: true, transactionId: `PAYPAL_${Date.now()}` };
  },

  PaymentUI: ({ amount, onComplete, onCancel }) => {
    const paypalOptions = {
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
      currency: "USD",
      intent: "capture",
    };

    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: (amount / 83).toFixed(2), // INR to USD
              currency_code: "USD",
            },
            description: `LocalShop Order`,
          },
        ],
      });
    };

    const onApprove = (data, actions) => {
      return actions.order.capture().then((details) => {
        onComplete({
          success: true,
          transactionId: data.orderID,
          message: `Payment completed by ${details.payer.name.given_name}!`
        });
      });
    };

    const onError = (error) => {
      console.error('PayPal error:', error);
      alert('Payment failed. Please try another method.');
    };

    return (
      <div className="bg-white rounded-xl border border-[#F0E68C] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#003087] text-white p-2 rounded-lg">
            <span className="text-lg">🌐</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#8B4513]">Pay with PayPal</h3>
            <p className="text-sm text-[#8B4513]/60">International payments</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-[#8B4513]">
              ₹{amount.toFixed(2)} ≈ ${(amount / 83).toFixed(2)} USD
            </p>
          </div>
          
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              style={{ 
                layout: "vertical",
                color: "gold",
                shape: "pill",
                label: "paypal"
              }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </PayPalScriptProvider>
          
          <p className="text-xs text-[#8B4513]/60 text-center">
            Secure international payments via PayPal
          </p>
        </div>
      </div>
    );
  }
};

export default PayPalPayment;