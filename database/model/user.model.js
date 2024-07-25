import { boolean } from "joi";
import { Schema, model } from "mongoose";

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
  confirm: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpaire: Date,
});
// Compile model from schema
export const User = model("User", userschema);
