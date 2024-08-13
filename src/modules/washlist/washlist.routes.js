import { Router } from "express";
import { revoveWashlist, updateWashlist } from "./whashlist.controler.js";
import { protectuser } from "../../midleware/protectuser.js";

const washlistRoute = Router();
washlistRoute.put('/add', protectuser,updateWashlist)
washlistRoute.delete('/:id', protectuser,revoveWashlist)



export default washlistRoute;

