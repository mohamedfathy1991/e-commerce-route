import mongoose, { Schema } from "mongoose";
import { User } from "../../../database/model/user.model.js";
import { AppErr, errhandle } from "../../midleware/catcherr.js";

export const updateaddress = errhandle(async (req, res, next) => {
  const address = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { address: req.body },
    },
    { new: true }
  );
      if (!address) return next(new AppErr("no address found ", 400));

        res.json({ message: "success", address: address.address });
});

export const removeaddress = errhandle(async (req, res, next) => {
  const address = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { address: { _id: req.params.id } },
    },
    { new: true }
  );
  if (!address) return next(new AppErr("no address found ", 400));

  res.json({ message: "success", user: address });
});

export const getAddressUser=errhandle(async (req, res, next) => {
  const address = await User.findById( req.user.id)
      if (!address) return next(new AppErr("no address found ", 400));

        res.json({ message: "success", address: address.address });
});

