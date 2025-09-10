import { model, Schema } from 'mongoose';

const shopsSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ShopsCollection = model('shops', shopsSchema);
