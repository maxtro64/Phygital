import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Fetch all products for a specific shopkeeper
// @route   GET /api/products/shop/:shopId
export const getShopProducts = async (req, res) => {
  try {
    const products = await Product.find({ shop_id: req.params.shopId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Shopkeeper)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { shop_id, name, description, category, price, stock, images } = req.body;

    const product = new Product({
      shop_id,
      name,
      description,
      category,
      price,
      stock,
      images
    });

    const createdProduct = await product.save();
    
    // Add product to shopkeeper's list
    await User.findOneAndUpdate({ _id: shop_id, role: 'shopkeeper' }, {
      $push: { products: createdProduct._id }
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products based on User Location (Within 1km)
// @route   GET /api/products/nearby
export const getNearbyProducts = async (req, res) => {
  try {
    const { lng, lat, radius = 1 } = req.query; // radius in km

    if (!lng || !lat) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }

    // Ensure shopkeepers have location indexes built and valid data
    const nearbyShops = await User.find({
      role: 'shopkeeper',
      "location.coordinates": { $exists: true, $ne: [0, 0] }, // Ensure they set location
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(radius) * 1000 // meters
        }
      }
    });

    const shopIds = nearbyShops.map(shop => shop._id);

    // Fetch products belonging to those shops
    const products = await Product.find({ 
      shop_id: { $in: shopIds },
      stock: { $gt: 0 } // Only show in-stock products for nearby browsing
    }).populate('shop_id', 'shopName location');

    res.json({
      success: true,
      center: { lat: parseFloat(lat), lng: parseFloat(lng) },
      shops_found: nearbyShops.length,
      products
    });
  } catch (error) {
    console.error('Geospatial query error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to find nearby products. Ensure MongoDB 2dsphere index is active.',
      error: error.message 
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.stock = req.body.stock || product.stock;
      product.category = req.body.category || product.category;
      product.description = req.body.description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
