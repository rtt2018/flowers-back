import { Schema, model } from 'mongoose';

const flowersShema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: {
      type: String,
      enum: ['bouquets', 'flowers'],
      required: true,
    },
    productionDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FlowersCollection = model('flowers', flowersShema);
