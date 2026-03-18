const baseURL = 'http://localhost:3000/api';

async function req(path, method = 'GET', body = null, token = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (token) options.headers['Authorization'] = `Bearer ${token}`;
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(`${baseURL}${path}`, options);
    const data = await res.json().catch(() => null);
    
    console.log(`[${method}] ${path} -> Status: ${res.status}`);
    if (!res.ok) console.log(`   Error:`, data);
    return { status: res.status, data };
  } catch (err) {
    console.log(`[${method}] ${path} -> FAILED: ${err.message}`);
    return { status: 500, data: null };
  }
}

async function runTests() {
  console.log("--- STARTING API VERIFICATION ---\n");
  
  // 1. Auth & Users
  console.log("1. Testing Auth & Users...");
  
  // User Register
  const userReg = await req('/auth/register-user', 'POST', {
    name: 'Test User',
    email: `user_${Date.now()}@test.com`,
    password: 'password123',
    phone: '1234567890',
    address: 'Test Address'
  });
  let userToken = userReg.data?.token;
  let userId = userReg.data?._id;

  // Shopkeeper Register
  const shopReg = await req('/auth/register-shopkeeper', 'POST', {
    shopName: 'Test Shop',
    email: `shop_${Date.now()}@test.com`,
    password: 'password123',
    phone: '0987654321',
    address: 'Shop Address'
  });
  let shopToken = shopReg.data?.token;
  let shopId = shopReg.data?._id;

  // 2. Products
  console.log("\n2. Testing Products...");
  let productId = null;
  if (shopToken) {
    // Add Product (Shopkeeper)
    const addProd = await req('/products', 'POST', {
      name: 'Test Product',
      category: 'Test Category',
      price: 100,
      stock: 10
    }, shopToken);
    productId = addProd.data?._id;

    // Get Shop Products (Shopkeeper)
    await req('/products/shop', 'GET', null, shopToken);
    
    // Update Product
    if (productId) {
       await req(`/products/${productId}`, 'PUT', { price: 150 }, shopToken);
    }
  }

  // Get Nearby Products (User)
  if (userToken) {
     await req('/products/nearby?lat=19.0760&lng=72.8777', 'GET', null, userToken);
  }

  // 3. Orders
  console.log("\n3. Testing Orders...");
  let orderId = null;
  if (userId && shopId && productId) {
    // Create Order
    const createOrder = await req('/orders', 'POST', {
       user_id: userId,
       shop_id: shopId,
       products: [{ product_id: productId, quantity: 2, price: 150 }],
       total_amount: 300,
       payment_status: 'Completed'
    });
    orderId = createOrder.data?._id;
  }

  if (orderId) {
    // User get order
    await req(`/orders/myorders/${userId}`, 'GET');
    
    // Shop get order
    await req(`/orders/shoporders/${shopId}`, 'GET');

    // Update Order Status
    await req(`/orders/${orderId}/status`, 'PUT', { status: 'Accepted' });
  }

  // 4. Delivery
  console.log("\n4. Testing Delivery...");
  // Register DBoy
  const dboy = await req('/delivery/drivers', 'POST', {
    name: 'Test Driver',
    contact: '5555555555'
  });
  let dboyId = dboy.data?._id;

  if (dboyId && orderId) {
     // Assign driver
     await req(`/orders/${orderId}/assign`, 'PUT', { delivery_boy_id: dboyId });
     
     // Update delivery status
     await req(`/delivery/status/${orderId}`, 'PUT', { status: 'Picked Up' });
  }

  // 5. Admin
  console.log("\n5. Testing Admin...");
  await req('/admin/stats', 'GET');


  console.log("\n--- FINISHED API VERIFICATION ---");
}

runTests();
