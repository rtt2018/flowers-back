import { model, Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    position: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: 'flowers',
          },
          amount: { type: Number },
        },
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

export const CartCollection = model('carts', cartSchema);
