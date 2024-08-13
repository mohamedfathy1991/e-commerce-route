import { Router } from "express";

import { protectuser } from "../../midleware/protectuser.js";
import { addCashOrder, createPaymentByVisa, getAllUserOrder, getUserOrder } from "./order.controler.js";
import { accessAllowTo } from "../../midleware/authorization.js";

const OrderRoute = Router();

OrderRoute.post( "/:id",  protectuser,addCashOrder);
OrderRoute.post( "/checkoutsession/:id",  protectuser,createPaymentByVisa);

OrderRoute.get('/user',protectuser,accessAllowTo('user','admin'),getUserOrder);
OrderRoute.get('/alluser',protectuser,accessAllowTo('admin'),getAllUserOrder);

OrderRoute.post('/apply-copon',protectuser);


export default OrderRoute;
