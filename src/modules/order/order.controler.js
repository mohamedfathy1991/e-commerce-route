import slugify from "slugify";
import { Brand } from "../../../database/model/brand.mode.js";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import { deleteItem } from "../handler/handle.delete.js";
import { Cart } from "../../../database/model/cart.model.js";
import { Product } from "../../../database/model/product.model.js";
import { Copon } from "../../../database/model/cobon.model.js";
import { Order } from "../../../database/model/order.model.js";

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51NZhfRKzyoAtD1JuBXSOohuxIGkvwVZABepdQL9nwOQjA0qvjmdb6besE0r0FOhD2MDjGChUOZcyaHrdqssJD2vz00mR5DWIKh"
);
export const addCashOrder = errhandle(async (req, res, next) => {
  let userCart = await Cart.findById(req.params.id);

  if (!userCart) return next(new AppErr("no cart to make order", 400));
  let orderitem = new Order({
    userid: req.user.id,
    items: userCart.items,
    totalOrderPrice: userCart.totalPriceAfterDiscouint || userCart.totalprice,
    address: req.body.address,
  });
  await orderitem.save();
  userCart.items.forEach((product) => {
    let pro = Product.findById(product.productid);
    pro.solid += product.quntitiy;
    pro.stock -= product.quntitiy;
    pro.save();
  });
  let option = orderitem.items.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.productid },
        update: { $inc: { solid: prod.quntitiy, stock: -prod.quntitiy } },
      },
    };
  });
  await Product.bulkWrite(option);
  await Cart.findByIdAndDelete(userCart._id);

  res.status(201).json({ message: "succes", order: orderitem });
});

export const getUserOrder = errhandle(async (req, res, next) => {
  let userOrder = await Order.findOne({ userid: req.user.id });
  if (!userOrder) return next(new AppErr("no order to show", 400));
  res.status(200).json({ message: "succes", order: userOrder });
});
export const getAllUserOrder = errhandle(async (req, res, next) => {
  let userOrder = await Order.find();
  if (!userOrder) return next(new AppErr("no order to show", 400));
  res.status(200).json({ message: "succes", order: userOrder });
});

export const createPaymentByVisa = errhandle(async (req, res, next) => {
  let userCart = await Cart.findById(req.params.id);

  let orderPrice = userCart.totalPriceAfterDiscouint || userCart.totalprice;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: orderPrice * 100,
          product_data: {
            name: req.user.name || "ay haga ",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment", // أو 'subscription' للدفع المتكرر
    success_url: "https://yourdomain.com/success", // frontend url
    cancel_url: "https://yourdomain.com/cancel", //frontend url,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
  });

  res.json({ message: "success", session });
});
