import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    payment_method: {
      type: String,
      required: true,
      enum: ['Razorpay', 'Cash on Delivery', 'Stripe'],
      default: 'Razorpay'
    },
    transaction_id: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Success', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
