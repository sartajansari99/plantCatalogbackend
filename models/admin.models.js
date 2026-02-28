import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    plantName: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },

    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
