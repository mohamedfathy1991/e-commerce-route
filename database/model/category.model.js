import { Schema, model } from "mongoose";

const schemaCategoy = new Schema(
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


schemaCategoy.post('init',(docs)=>{
  docs.image= "http://localhost:3000/uploads/category/"+docs.image
})
export const Category= model('Category',schemaCategoy)

