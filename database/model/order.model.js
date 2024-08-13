import { Schema, Types, model } from "mongoose";

const Orderschema = new Schema(
  {

    userid:{ type:Types.ObjectId,ref:'User'},
    items:[{
      quntitiy:Number,
      productid:{type:Types.ObjectId,ref:'Product'},
      price:Number
    }],
   
    totalOrderPrice:Number,
    address:{
      phone:String,
      street:String,
      city:String
    },


    paymentMethod:{type:String,
      enum:["cash","visa"],
      default:"cash"
    },
    ispaid:{
      type:Boolean,
      default:false,


    },
    paidAt:Date,
    isdeleved:{
      type:Boolean,
      default:false
    },
    deleveredAt:Date
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const Order = model('Order', Orderschema)

