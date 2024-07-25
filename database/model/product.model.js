import { Schema, model } from "mongoose";

const schemaCategoy = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "to shoort"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },

    discreption: {
      type: String,
      required: true,
      trim: true,
    },
    solid: Number,
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratAvr: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount:Number,
    createdBy:{
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },

  {
    timestamps: true,
    versionKey: false,
  }
);
export const Product = model("Product", schemaCategoy);
