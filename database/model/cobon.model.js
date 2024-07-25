import { Schema, model } from "mongoose";

const CobonSchema = new Schema(
  {
    type: {
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
export const Cobon= model('Cobon',CobonSchema)

