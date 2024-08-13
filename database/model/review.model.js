import { model } from "mongoose";
import { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    comment: {
      type: String,
      
    },
    
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    rate:{
      type:Number,
      required:true
    },
    productid:{
      type: Schema.Types.ObjectId,
      ref: "Product",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
ReviewSchema.pre(/^find/,function(){
  this.populate('user', 'productid') 
})
export const Review= model('Review',ReviewSchema)

