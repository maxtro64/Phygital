import mongoose from 'mongoose';

const deliveryBoySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Busy', 'Offline'],
      default: 'Available'
    },
    assigned_orders: [
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

const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryBoySchema);
export default DeliveryBoy;
