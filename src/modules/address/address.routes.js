import { Router } from "express";
import { protectuser } from "../../midleware/protectuser.js";
import { removeaddress,  updateaddress } from "./address.controler.js";

const addressRoute = Router();
addressRoute.put('/add', protectuser,updateaddress)
addressRoute.delete('/:id', protectuser,removeaddress)



export default addressRoute;

