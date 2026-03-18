import mongoose from 'mongoose';

const shopkeeperSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shopName: {
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
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      // GeoJSON Point for 1km radius queries
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      }
    ],
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    verificationStatus: {
      type: String,
      required: true,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true,
  }
);

shopkeeperSchema.index({ location: "2dsphere" });

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);
export default Shopkeeper;
