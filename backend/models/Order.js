import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    total_amount: {
      type: Number,
      required: true,
      default: 0.0
    },
    payment_status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    payment_method: {
      type: String,
      required: true,
      enum: ['Online', 'Offline', 'COD'],
      default: 'Online'
    },
    delivery_address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    delivery_status: {
      type: String,
      required: true,
      enum: ['Pending', 'Placed', 'Accepted', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Placed'
    },
    delivery_boy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryBoy',
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
