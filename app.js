

import express from 'express'


import { bootStrap } from './bootstrap.js'
import { AppErr, errhandle } from './src/midleware/catcherr.js'
import globalerr from './src/midleware/globalerr.js'


import dotenv from "dotenv"
import './database/dbconection.js'
import cors from "cors"
import Stripe from 'stripe'
import { Product } from './database/model/product.model.js'
import { Cart } from './database/model/cart.model.js'
import { Order } from './database/model/order.model.js'
import { User } from './database/model/user.model.js'
const app = express()
const stripe = new Stripe(
      "sk_test_51NZhfRKzyoAtD1JuBXSOohuxIGkvwVZABepdQL9nwOQjA0qvjmdb6besE0r0FOhD2MDjGChUOZcyaHrdqssJD2vz00mR5DWIKh"
    );

const endpointSecret = "whsec_kr5soZpm7MufICzJSZUNyyrCLew1o9XB";//from stripe signature 

app.post('/api/webhook', express.raw({type: 'application/json'}), errhandle( async (req, res) => {
  const sig = req.headers['stripe-signature'].toString();// ineed this string

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);  
 let checkout
  if (event.type=='checkout.session.completed') {
      checkout = event.data.object;
      let userCart = await Cart.findById(checkout.client_reference_id);
      let user = await User.findOne({email:checkout.customer_email});

  if (!userCart) return next(new AppErr("no cart to make order", 400));
        
      let orderitem = new Order({
            userid: user._id,
            items: userCart.items,
            totalOrderPrice: userCart.totalPriceAfterDiscouint || userCart.totalprice,
            address: req.body.address,
            paymentMethod:"visa",
            ispaid:true,
            paidAt:Date.now()



         });
          await orderitem.save();
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

  }

  // Return a 200 res to acknowledge receipt of the event
  res.json({message:"success",checkout});
}));







app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static("uploads"))


const port = process.env.PORT|| 3000




dotenv.config()



bootStrap(app)   

app.use("*", (req, res, next) => {
      next(new AppErr('page not found', 404))
})
app.use(globalerr)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))