import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const paymentMethods = [
    { 
      id: 'upi', 
      name: 'UPI', 
      icon: '📱',
      description: 'Pay via UPI apps',
      color: 'bg-[#32CD32]'
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: '💳',
      description: 'Secure card payment',
      color: 'bg-[#1E90FF]'
    },
    { 
      id: 'wallet', 
      name: 'Wallet', 
      icon: '💰',
      description: 'Paytm, Amazon Pay, etc.',
      color: 'bg-[#FFD700]'
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      icon: '🌐',
      description: 'International payments',
      color: 'bg-[#003087]'
    },
    { 
      id: 'razorpay', 
      name: 'Razorpay', 
      icon: '⚡',
      description: 'Indian payment gateway',
      color: 'bg-[#FF6347]'
    },
    { 
      id: 'cod', 
      name: 'Cash on Delivery', 
      icon: '📦',
      description: 'Pay when delivered',
      color: 'bg-[#8B4513]'
    }
  ];

  const processPayment = async (method, amount, orderData) => {
    setIsProcessing(true);
    setPaymentStatus('Processing payment...');
    setCurrentOrder(orderData);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would call actual payment APIs
      const result = {
        success: true,
        transactionId: `TXN_${Date.now()}`,
        message: `Payment successful via ${method.toUpperCase()}`,
        amount: amount,
        method: method
      };
      
      // Navigate to success page
      navigate('/payment/success', { 
        state: { 
          transactionId: result.transactionId,
          amount: amount,
          method: method 
        } 
      });
      
      return result;
    } catch (error) {
      setPaymentStatus(`Error: ${error.message}`);
      navigate('/payment/failed');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus('');
    setIsProcessing(false);
    setCurrentOrder(null);
  };

  return (
    <PaymentContext.Provider value={{
      selectedMethod,
      setSelectedMethod,
      paymentMethods,
      processPayment,
      paymentStatus,
      isProcessing,
      resetPayment,
      currentOrder
    }}>
      {children}
    </PaymentContext.Provider>
  );
};