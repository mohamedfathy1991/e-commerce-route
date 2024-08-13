import { Schema, model } from "mongoose";

const CobonSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      
    },
    expire:Date,
    dicount:Number
    ,
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Copon= model('Cobon',CobonSchema)

