import { Schema, Types, model } from "mongoose";

const cartschema = new Schema(
  {

    userid:{ type:Types.ObjectId,ref:'User'},
    items:[{
      quntitiy:{type:Number,default:1},
      productid:{type:Types.ObjectId,ref:'Product'},
      price:Number
    }],
    totalprice:Number,
    discount:Number,
    totalPriceAfterDiscouint:Number,

    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const Cart = model('Cart', cartschema)

