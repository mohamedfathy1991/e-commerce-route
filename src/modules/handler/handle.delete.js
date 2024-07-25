import { errhandle } from "../../midleware/catcherr.js"



export const deleteItem= (modle)=>{
    return  errhandle(async(req,res,next)=>{
            const {id} = req.params
            const docs = await modle.findByIdAndDelete(id)
            if(!docs) return(next(new AppErr(`no  sub ${modle} found `, 400)))
            res.json({message:"success",docs})
      
      })
}