import { Schema, model } from 'mongoose';

const flowersShema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FlowersCollection = model('flowers', flowersShema);
