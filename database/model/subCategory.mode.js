import { Schema ,model} from "mongoose";

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "to shoort"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    image: String,
    category:{
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
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
export const   SubCategory= model('SubCategory',subcategorySchema)

