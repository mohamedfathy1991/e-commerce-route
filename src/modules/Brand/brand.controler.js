import slugify from "slugify";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import   {SubCategory} from "../../../database/model/subCategory.mode.js"
import { Category } from "../../../database/model/category.model.js";
import { Brand } from "../../../database/model/brand.mode.js";
import { deleteItem } from "../handler/handle.delete.js";


  export  const addBrand=  errhandle( async(req,res,next)=>{

      const {name} = req.body;
      

      let Brands = new  Brand(req.body)
      Brands.logo=req.file.filename
      

      Brands.slug=slugify(name)
      await Brands.save()
      res.json({
            message:"success",Brands
      })


})
export const getOneBrand=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const Brands = await Brand.findById(id)
      if(!Brands) return(next(new AppErr('no  sub brand found ', 400)))
      res.json({message:"success",Brands})

})
export const getBrand=errhandle(async(req,res,next)=>{
   let Brands=   await Brand.find()
     if(Brands.legnth==0) return(next(new AppErr('no Brands found ', 400)))
      res.json({message:"success",Brands})

})
export const updateBrand=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const Brands = await Brand.findById(id,req.body,{
            new:true
      })
      if(!Brands) return(next(new AppErr('no Brands found ', 400)))
      res.json({message:"success",Brands})

})

// export const deleteBrand=errhandle(async(req,res,next)=>{
//       const {id} = req.params
//       const Brands = await Brand.findByIdAndDelete(id)
//       if(!Brands) return(next(new AppErr('no  sub category found ', 400)))
//       res.json({message:"success",Brands})

// })
export const deleteBrand=deleteItem(Brand)

