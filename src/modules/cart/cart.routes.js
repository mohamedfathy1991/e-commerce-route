import { Router } from "express";
import {
  addCart,
  ApplyCobon,
  deletecartitem,
  formatcart,
  getUserCart,
  updatecart,
} from "./cart.controler.js";
import { protectuser } from "../../midleware/protectuser.js";

const cartRoute = Router();

cartRoute.post(
  "/",
  protectuser,

  addCart
);
cartRoute.get('/',protectuser,getUserCart);
cartRoute.delete('/',protectuser,formatcart);
cartRoute.post('/apply-copon',protectuser,ApplyCobon);
cartRoute
  .route("/:id")
  .put(protectuser, updatecart)
  .delete(protectuser, deletecartitem);

export default cartRoute;
