import { AppErr, errhandle } from "./catcherr.js";



export const accessAllowTo= (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)) return next(new AppErr("not authorized !!!!",401))
         
            console.log("allowed")
            next()

    }



} 