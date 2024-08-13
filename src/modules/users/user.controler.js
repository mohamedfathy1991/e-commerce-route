import { User } from "../../../database/model/user.model.js";
import { AppErr } from "../../midleware/catcherr.js";

export const updateUserAccount = async (req, res, next) => {
  let { id } = req.params;
  

  if (id != req.user.id)
    return next(new AppErr("not authorize to update user", 403));
  else {
   
    let user = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!user) return(next(new AppErr('not user found',400)))
    res.status(201).json(user);
  }
};
export const deleteAccount = async (req, res, next) => {
  let { id } = req.params;

  if (id != req.user.id)
    return next(new AppErr("not authorize to update user", 403));
  else {
    let user = await User.findByIdAndDelete(id);
    if(!user) return next(new AppErr('user not found',400))
    
    return res.status(403).json({ message: "success ",user });
  }
};
export const getAllUsers = async (req, res, next) => {
  let user = await User.find();

  res.status(200).json({ message: "uccess", user });
};
