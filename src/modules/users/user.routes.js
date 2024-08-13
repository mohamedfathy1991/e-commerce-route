 
 import { Router } from "express";
import { errhandle } from "../../midleware/catcherr.js";
import { verifyToken } from "../../midleware/tokenOperation.js";
import { deleteAccount, getAllUsers, updateUserAccount } from "./user.controler.js";

 
  const userRoute= Router()
 
  
  //********** */ delete and update and get owner acount
  userRoute.route('/').get(verifyToken,errhandle(getAllUsers))
 userRoute.delete('/:id',verifyToken,errhandle(deleteAccount))
 userRoute.put('/:id',verifyToken,errhandle(updateUserAccount))
 

 // ************ get data of another account
 
  export default userRoute