export const dummyShops = [
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d0",
    name: "Fresh Mart Grocery",
    category: "Groceries",
    distance: "0.4 km",
    deliveryTime: "10-15 mins",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
    isOpen: true,
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d1",
    name: "Citizen Pharmacy",
    category: "Medicines",
    distance: "0.8 km",
    deliveryTime: "15-20 mins",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=400",
    isOpen: true,
    location: { lat: 28.6145, lng: 77.2105 }
  },
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d2",
    name: "Green Valley Fruits",
    category: "Fruits & Vegetables",
    distance: "1.2 km",
    deliveryTime: "20-30 mins",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=400",
    isOpen: true,
    location: { lat: 28.6120, lng: 77.2080 }
  },
  {
    id: "65f8a1b2c3d4e5f6a7b8c9d3",
    name: "Tech Hub Electronics",
    category: "Electronics",
    distance: "1.5 km",
    deliveryTime: "40-50 mins",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=400",
    isOpen: true,
    location: { lat: 28.6160, lng: 77.2120 }
  }
];

export const dummyProducts = [
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d0",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d0",
    shop: "Fresh Mart Grocery",
    name: "Organic Bananas",
    price: 60,
    originalPrice: 80,
    image: "https://images.unsplash.com/photo-1603833665858-e81b1c7e4460?auto=format&fit=crop&q=80&w=200",
    category: "Fruits",
    stock: 50,
    unit: "1 kg"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d1",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d0",
    shop: "Fresh Mart Grocery",
    name: "Fresh Whole Milk",
    price: 35,
    originalPrice: 40,
    image: "https://images.unsplash.com/photo-1563636619-e9107da5a76a?auto=format&fit=crop&q=80&w=200",
    category: "Dairy",
    stock: 100,
    unit: "500 ml"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d2",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d1",
    shop: "Citizen Pharmacy",
    name: "Paracetamol 500mg",
    price: 25,
    originalPrice: 30,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200",
    category: "Medicines",
    stock: 200,
    unit: "Strip of 10"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d3",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d2",
    shop: "Green Valley Fruits",
    name: "Red Seedless Grapes",
    price: 120,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?auto=format&fit=crop&q=80&w=200",
    category: "Fruits",
    stock: 30,
    unit: "500 g"
  },
  {
    id: "65f8a2b2c3d4e5f6a7b8c9d4",
    shopId: "65f8a1b2c3d4e5f6a7b8c9d3",
    shop: "Tech Hub Electronics",
    name: "Wireless Mouse",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=200",
    category: "Electronics",
    stock: 15,
    unit: "1 piece"
  }
];

export const categories = [
  { id: "65f8a3b2c3d4e5f6a7b8c9d0", name: "Groceries", icon: "🥦" },
  { id: "65f8a3b2c3d4e5f6a7b8c9d1", name: "Fruits & Veggies", icon: "🍎" },
  { id: "65f8a3b2c3d4e5f6a7b8c9d2", name: "Dairy & Bread", icon: "🥛" },
  { id: "65f8a3b2c3d4e5f6a7b8c9d3", name: "Meat & Fish", icon: "🍗" },
  { id: "65f8a3b2c3d4e5f6a7b8c9d4", name: "Snacks", icon: "🍪" },
  { id: "65f8a3b2c3d4e5f6a7b8c9d5", name: "Electronics", icon: "📱" },
  { id: "65f8a3b2c3d4e5f6a7b8c9d6", name: "Medicines", icon: "💊" }
];
