import { Cart } from "../../../database/model/cart.model.js";
import { Copon } from "../../../database/model/cobon.model.js";
import { Product } from "../../../database/model/product.model.js";
import { AppErr, errhandle } from "../../midleware/catcherr.js";

export const addCart = errhandle(async (req, res, next) => {
  let userExist = await Cart.findOne({ userid: req.user.id });
  let prdouct = await Product.findById(req.body.productid);

  if (!prdouct) return next(new AppErr("no product found", 400));
  req.body.price = prdouct.price;
  if (prdouct.stock <= req.body.quntitiy)
    return next(new AppErr("quntity more than stock", 400));
  if (!userExist) {
    let cart = new Cart({
      userid: req.user.id,
      items: [req.body],
    });
    cart.totalprice = calTotalPrice(cart);
    await cart.save();
    res.json({ message: "success", cart });
  } else {
    let productitem = userExist.items.find(
      (item) => item.productid == req.body.productid
    );
    if (productitem) {
      productitem.quntitiy += req.body.quntitiy || 1;

      if (prdouct.stock <= productitem.quntitiy)
        return next(new AppErr("quntity more than stock", 400));
    } else userExist.items.push(req.body);
    // let prices = 0;
    // userExist.items.forEach((product) => {
    //   prices += product.price * product.quntitiy;
    // });

    userExist.totalprice =calTotalPrice(userExist)

    await userExist.save();
    res.json({ message: "success", cart: userExist });
  }
});


export const updatecart=errhandle(async (req, res, next) => {
  console.log(req.params.id);
  
  let usercart= await Cart.findOne({userid:req.user.id})
  
  let productitem=usercart.items.find(product=>product.productid==req.params.id)
  if(!productitem)return next(new AppErr("product not found",400))
    
    productitem.quntitiy= req.body.quntitiy
    console.log(productitem);

    usercart.totalprice= calTotalPrice(usercart)
  await usercart.save()
  res.status(201).json({message:"success",cart:usercart})

  

});

export const deletecartitem=errhandle(async (req, res, next) => {

  let cart= await Cart.findOneAndUpdate({userid:req.user.id},{
    $pull:{items:{productid:req.params.id}}
  },{new:true})
  if(!cart)return next(new AppErr("product not found",400))
    cart.totalprice= calTotalPrice(cart)
    res.status(201).json({message:"success",cart:cart})


})
export const getUserCart=errhandle(async (req, res, next) => {

  let cart= await Cart.findOne({userid:req.user.id})
  if(!cart)return next(new AppErr("cart not found",400))
    cart.totalprice= calTotalPrice(cart)
    res.status(201).json({message:"success",cart:cart})


})

export const ApplyCobon= errhandle( async(req,res,next)=>{
  let copon =await Copon.findOne({code:req.body.code,expire:{$gt:Date.now()}}  )
  
  if(!copon)return next(new AppErr("invalid copon",400))
    let cart= await Cart.findOne({userid:req.user.id})
  cart.discount= copon.dicount
  cart.totalPriceAfterDiscouint= cart.totalprice- ((cart.totalprice*cart.discount)/100)
 await cart.save()
 
 res.status(201).json({message:"success",cart:cart})
 

})
export const formatcart=errhandle(async (req, res, next) => {

  let cart= await Cart.findOneAndDelete({userid:req.user.id})
  if(!cart)return next(new AppErr("cart not found",400))
    
    res.status(201).json({message:"success",cart:cart})


})



function calTotalPrice(userExist) {
  return userExist.items.reduce((prev, curent) => {
    return (prev += curent.quntitiy * curent.price);
  }, 0);
}
