import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    cart: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'flowers',
        },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
      required: true,
    },
    createdAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrderCollection = model('orders', orderSchema);
