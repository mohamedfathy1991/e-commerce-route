import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  

  email: { type: String, required: true, unique: true },
  password: String,
  
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  isBlocked: {
    type: Boolean,

    default: false,
  },
  passwordChangedAt:Date  
  ,
  washlist:[{
    type: Schema.Types.ObjectId,
  
    ref:"Product"}
  ]
  ,
  address:[{
    city:String,
    street:String,
    phone:String
  }],
  confirm: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpaire: Date,
});
// Compile model from schema
userschema.pre('save',function(){
  console.log((this.password));
  this.password=bcrypt.hashSync(this.password,8)

})

export const User = model("User", userschema);
