import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Trash2, 
  Loader2, 
  X,
  ShoppingCart,
  Store,
  ChevronRight,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dummyProducts, categories as dummyCategories, dummyShops } from '../utils/dummyData';
import { useCart } from '../context/CartContext';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchParams] = useSearchParams();
  const shopIdFromUrl = searchParams.get('shopId');
  
  const [addedItem, setAddedItem] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const userRole = localStorage.getItem('userRole');
  const isShopkeeper = userRole === 'shopkeeper';
  const myShopId = localStorage.getItem('shopId');

  // Find shop details for header
  const currentShopId = isShopkeeper ? myShopId : shopIdFromUrl;
  const currentShop = dummyShops.find(s => s.id === currentShopId);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const targetShopId = isShopkeeper ? myShopId : shopIdFromUrl;
      
      let url;
      if (targetShopId) {
        url = `${API_BASE_URL}/products/shop/${targetShopId}`;
      } else {
        url = `${API_BASE_URL}/products/nearby?lat=28.6139&lng=77.2090&radius=10`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('API unreachable');
      
      const data = await res.json();
      const productList = targetShopId ? data : data.products;
      
      if (productList && productList.length > 0) {
        setProducts(productList.map(p => ({ ...p, id: p._id })));
      } else {
        // Fallback to dummy data filtered by shop if requested
        const filteredDummy = targetShopId 
           ? dummyProducts.filter(p => p.shopId === targetShopId)
           : dummyProducts;
        setProducts(filteredDummy);
      }
    } catch (error) {
      console.warn('Using dummy products due to:', error.message);
      const targetShopId = isShopkeeper ? myShopId : shopIdFromUrl;
      const filteredDummy = targetShopId 
         ? dummyProducts.filter(p => p.shopId === targetShopId)
         : dummyProducts;
      setProducts(filteredDummy);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isShopkeeper, myShopId, shopIdFromUrl]);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product.name);
    setTimeout(() => setAddedItem(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {addedItem && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
            <Zap className="text-yellow-400 fill-yellow-400" size={20} />
            <span className="font-bold">Added {addedItem} to basket!</span>
            <button onClick={() => navigate('/cart')} className="bg-orange-500 text-white px-4 py-1.5 rounded-xl text-sm font-black hover:bg-orange-600 ml-4">
              VIEW CART
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="max-w-xl">
            {(shopIdFromUrl || isShopkeeper) && (
              <button 
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-orange-500 transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Shops
              </button>
            )}
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter flex flex-wrap items-center gap-3">
              {isShopkeeper ? 'Inventory Management' : (currentShop ? `Shopping at ${currentShop.name}` : 'Superfast Delivery')}
              <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md mt-1">15 MINS</div>
            </h1>
            <p className="text-gray-500 mt-2 font-medium text-lg">
              {isShopkeeper ? 'Keep your shelves stocked and your profile updated.' : (currentShop ? `Fresh essentials delivered from ${currentShop.name} in minutes.` : 'Fresh groceries, dairy, and daily essentials from local shops.')}
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 outline-none font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Categories Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm sticky top-28 border border-gray-100">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-bold ${selectedCategory === 'all' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-3">🌟 All Items</span>
                  <ChevronRight size={16} />
                </button>
                {dummyCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-bold ${selectedCategory === cat.name ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-3">{cat.icon} {cat.name}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <div key={n} className="bg-white p-4 rounded-3xl animate-pulse aspect-[3/4]"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className={`group bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/50 flex flex-col relative ${product.stock === 0 ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                      <img 
                        src={product.image || 'https://via.placeholder.com/300?text=Product'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                          <div className="bg-white text-gray-900 text-xs font-black px-4 py-2 rounded-xl shadow-xl transform -rotate-12 tracking-widest uppercase">
                            SOLD OUT
                          </div>
                        </div>
                      )}
                      {(product.originalPrice > product.price && product.stock > 0) && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                          OFFER
                        </div>
                      )}
                      {(product.stock > 0 && product.stock < 10) && (
                        <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-lg">
                          ONLY {product.stock} LEFT
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="font-black text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight min-h-[2.5rem]">{product.name}</h3>
                      <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-tighter">{product.unit || '1 unit'}</p>
                      
                      <div className="mt-auto pt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                          {product.originalPrice > product.price && (
                            <span className="text-gray-400 line-through text-xs font-bold">₹{product.originalPrice}</span>
                          )}
                          <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                        </div>
                        
                        <button 
                          onClick={() => product.stock > 0 && handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border group/btn shadow-sm ${product.stock > 0 ? 'bg-gray-50 hover:bg-orange-500 text-orange-500 hover:text-white border-orange-100 hover:border-orange-500' : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'}`}
                        >
                          {product.stock > 0 ? (
                            <Plus size={24} className="group-hover/btn:rotate-90 transition-transform" />
                          ) : (
                            <X size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;