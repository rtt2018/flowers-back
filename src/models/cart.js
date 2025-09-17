import { model, Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    position: {
      type: [
        {
          flower: {
            type: Schema.Types.ObjectId,
            ref: 'flowers',
          },
          price: { type: Number, required: true },
          amount: { type: Number },
        },
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

export const CartCollection = model('carts', cartSchema);
