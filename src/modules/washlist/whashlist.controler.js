import mongoose, { Schema } from "mongoose";
import { User } from "../../../database/model/user.model.js";
import { AppErr, errhandle } from "../../midleware/catcherr.js";



export const updateWashlist = errhandle(async (req, res, next) => {
  
    const Washlists = await User.findByIdAndUpdate(req.user.id,{
      $addToSet: { washlist: req.body }
    }
    ,{new:true});
    if (!Washlists) return next(new AppErr("no Washlists found ", 400));
  
    res.json({ message: "success", Washlists });
  

  


  });
export const revoveWashlist = errhandle(async (req, res, next) => {

 let {id}=req.body
    const Washlists = await User.findByIdAndUpdate(req.user.id,{
      $pull: { washlist: id }
    },{new:true});
    if (!Washlists) return next(new AppErr("no Washlists found ", 400));
  
    res.json({ message: "success", Washlists:Washlists.washlist });
  });
  

