import { Schema, model } from "mongoose";

const brandschema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [2, "to shoort"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    logo: String,
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

brandschema.post('init',(docs)=>{
  docs.logo= "http://localhost:3000/uploads/brand/"+docs.logo
})
export const Brand= model('Brand',brandschema)

