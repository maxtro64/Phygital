import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: '', // Cloudinary URL
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple nulls
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'shopkeeper', 'admin'],
      default: 'user'
    },
    // Shopkeeper specific fields
    shopName: {
      type: String,
      required: function() { return this.role === 'shopkeeper'; }
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    location: {
      // GeoJSON Point for 1km radius queries
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0] // [longitude, latitude]
      }
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      }
    ],
    // Shopkeeper specific products/orders
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }
    ],
    shopOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      }
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);
export default User;
