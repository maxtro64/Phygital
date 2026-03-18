import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Settings, 
  RefreshCw,
  Store,
  ShoppingBag,
  Package,
  Truck,
  DollarSign,
  Clock
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [botMode, setBotMode] = useState('assistant'); // 'assistant', 'shopper', 'shopkeeper'

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! I'm your LocalShop assistant. How can I help you today? You can ask me about local stores, products, delivery, or shopkeeper features.",
        sender: 'bot',
        timestamp: new Date(),
        icon: <Store className="w-4 h-4" />
      }]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sample responses based on keywords
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! Welcome to LocalShop. How can I assist you today?";
    }
    
    if (lowerMessage.includes('store') || lowerMessage.includes('shop')) {
      return "We have 50+ local stores available in your area! You can browse stores by category or search for specific products.";
    }
    
    if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
      return "We offer fresh groceries, dairy products, fruits & vegetables, spices, and local specialties. What are you looking for?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our prices are 20-40% lower than supermarkets because we connect you directly with local producers!";
    }
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('time')) {
      return "Delivery takes 15-30 minutes from nearby stores. We offer real-time tracking for all orders.";
    }
    
    if (lowerMessage.includes('order') || lowerMessage.includes('cart')) {
      return "You can view your cart and orders in the shopping cart section. Need help with an existing order?";
    }
    
    if (lowerMessage.includes('fresh') || lowerMessage.includes('quality')) {
      return "All products are quality-checked and come directly from local producers. We guarantee freshness!";
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "We accept UPI, credit/debit cards, wallets, and cash on delivery. All payments are secure.";
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "You can reach our 24/7 support team through the help section. For urgent issues, call: 1800-LOCAL-SHOP";
    }
    
    if (lowerMessage.includes('shopkeeper') || lowerMessage.includes('seller')) {
      return "Shopkeepers can sign up for free and get a digital storefront, inventory management, and order tracking.";
    }
    
    return "I'm here to help with LocalShop queries! You can ask me about stores, products, delivery, payments, or shopkeeper features. Need more specific help?";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      icon: <User className="w-4 h-4" />
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        icon: botMode === 'assistant' ? <Store className="w-4 h-4" /> : 
               botMode === 'shopper' ? <ShoppingBag className="w-4 h-4" /> : 
               <Package className="w-4 h-4" />
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Chat cleared! How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      icon: <Store className="w-4 h-4" />
    }]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "What stores are nearby?",
    "How fast is delivery?",
    "Are prices competitive?",
    "How to become a shopkeeper?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center gap-2 ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">Need Help?</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl border border-[#F0E68C] z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6347] to-[#FFD700] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">LocalShop Assistant</h3>
                <p className="text-white/80 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Clear chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bot Mode Selector */}
          <div className="bg-gradient-to-r from-[#FFF8DC] to-[#FFFAF0] p-3 border-b border-[#F0E68C]">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8B4513] font-medium">Assistant Mode:</span>
              <div className="flex gap-1">
                {['assistant', 'shopper', 'shopkeeper'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setBotMode(mode)}
                    className={`px-3 py-1 text-xs rounded-lg transition-all ${
                      botMode === mode
                        ? 'bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white'
                        : 'bg-white text-[#8B4513] border border-[#F0E68C] hover:bg-[#FFF8DC]'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-[#FFFAF0]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-br-none'
                        : 'bg-white border border-[#F0E68C] text-[#8B4513] rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1 rounded ${
                        message.sender === 'user' ? 'bg-white/20' : 'bg-[#FFF8DC]'
                      }`}>
                        {message.icon}
                      </div>
                      <span className="text-xs opacity-75">
                        {message.sender === 'user' ? 'You' : 'LocalShop Assistant'} • {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg rounded-bl-none p-3 bg-white border border-[#F0E68C]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1 rounded bg-[#FFF8DC]">
                        <Store className="w-4 h-4 text-[#8B4513]" />
                      </div>
                      <span className="text-xs text-[#8B4513]/75">LocalShop Assistant • typing...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#FF6347] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#32CD32] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-t border-[#F0E68C] bg-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#FFF8DC] to-[#FFFAF0] text-[#8B4513] border border-[#F0E68C] rounded-lg hover:shadow-md transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t border-[#F0E68C] p-4 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 bg-[#FFF8DC] border border-[#F0E68C] rounded-lg text-[#8B4513] placeholder-[#8B4513]/50 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-3 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#8B4513]/50 mt-2 text-center">
              Our assistant can help with stores, products, delivery, and payments
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;