import { model, Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "carts",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

usersSchema.index({ favouriteRecipes: 1 });

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model("users", usersSchema);
