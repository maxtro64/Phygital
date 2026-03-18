import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './component/Home'
import BackToTop from './component/BacktoTop'
import Footer from './component/Footer'
import Features from './component/Features'
import Problem from './component/Problem'
import Solution from './component/Solution'
import Customer from './component/Customer'
import Shopkeeper from './component/Shopkeeper'
import ShoppingCartPage from './component/ShoppingCart'
import ProductListingPage from './component/Product'
import Chatbot from './component/Chatbot'
import ShopBrowser from './component/ShopBrowser'
import ShopkeeperDashboard from './component/ShopkeeperDashboard'
import OrderTracking from './component/OrderTracking'
import UserProfile from './component/UserProfile'
import AdminPanel from './component/AdminPanel'
import NotFound from './component/NotFound'

import UnifiedAuth from './component/UnifiedAuth'
import ProtectedRoute from './component/ProtectedRoute'
import About from './component/About'
import Contact from './component/Contact'
import Legal from './component/Legal'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Navbar />
        
        <div className="page-content">
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={
              <>
                <Home />
                <Features />
                <Problem />
                <Solution />
              </>
            } />
            
            {/* Public/Guest Accessible Pages */}
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/shops" element={<ShopBrowser />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/solution" element={<Solution />} />
            
            {/* Information Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<About />} />
            <Route path="/community" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Contact />} />
            <Route path="/privacy" element={<Legal type="privacy" />} />
            <Route path="/terms" element={<Legal type="terms" />} />
            <Route path="/policies" element={<Legal type="policies" />} />
            <Route path="/accessibility" element={<Legal type="privacy" />} />
            
            {/* Unified Auth Pages */}
            <Route path="/login" element={<UnifiedAuth />} />
            <Route path="/signup" element={<UnifiedAuth initialSignup={true} />} />
            
            {/* Protected Routes - Full Login Required */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['user', 'shopkeeper', 'admin']}>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/order/tracking/:orderId" element={
              <ProtectedRoute allowedRoles={['user', 'shopkeeper']}>
                <OrderTracking />
              </ProtectedRoute>
            } />
            
            <Route path="/shopkeeper/dashboard" element={
              <ProtectedRoute allowedRoles={['shopkeeper']}>
                <ShopkeeperDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
            
            {/* Payment Callback Routes */}
            <Route path="/payment/success" element={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8DC] to-white">
                <div className="bg-white rounded-2xl p-8 border border-[#F0E68C] shadow-lg max-w-md text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#32CD32] to-[#1E90FF] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#8B4513] mb-2">Payment Successful!</h2>
                  <p className="text-[#8B4513]/70 mb-6">Your order has been confirmed and will arrive soon.</p>
                  <div className="space-y-3">
                    <a href="/" className="block bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                      Back to Home
                    </a>
                    <a href="/products" className="block border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all">
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </div>
            } />
            
            <Route path="/payment/failed" element={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8DC] to-white">
                <div className="bg-white rounded-2xl p-8 border border-[#FF6347] shadow-lg max-w-md text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✗</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#8B4513] mb-2">Payment Failed</h2>
                  <p className="text-[#8B4513]/70 mb-6">There was an issue processing your payment. Please try again.</p>
                  <div className="space-y-3">
                    <a href="/cart" className="block bg-gradient-to-r from-[#FF6347] to-[#FFD700] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                      Back to Cart
                    </a>
                    <a href="/" className="block border-2 border-[#F0E68C] text-[#8B4513] py-3 rounded-lg font-bold hover:bg-[#FFF8DC] transition-all">
                      Back to Home
                    </a>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
        
        <Footer />
        <BackToTop />
        <Chatbot />
      </div>
    </Router>
    </CartProvider>
  )
}

export default App