import slugify from "slugify";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import   {SubCategory} from "../../../database/model/subCategory.mode.js"
import { Category } from "../../../database/model/category.model.js";
import { deleteItem } from "../handler/handle.delete.js";


  export  const addsubCategory=  errhandle( async(req,res,next)=>{

      const {name} = req.body;
      const slug= slugify(name)
      let category= await Category.findById(req.body.category)
      
      if(!category) return next(new AppErr("category not found",404))

      let subCategoeirs = new  SubCategory(req.body)

      subCategoeirs.slug=slug
      await subCategoeirs.save()
      res.json({
            message:"success",subCategoeirs
      })


})
export const getOnesubCategory=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const subCategoeirs = await SubCategory.findById(id)
      if(!subCategoeirs) return(next(new AppErr('no  sub category found ', 400)))
      res.json({message:"success",subCategoeirs})

})
export const getsubCategory=errhandle(async(req,res,next)=>{
    
      let filterbycategory={}
      if(req.params.id) filterbycategory={category:req.params.id}
   let subcategoryies=   await SubCategory.find(filterbycategory)
     if(subcategoryies.legnth==0) return(next(new AppErr('no sub category found ', 400)))
      res.json({message:"success",subcategoryies})

})
export const updatesubCategory=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const subcategories = await SubCategory.findById(id,req.body,{
            new:true
      })
      if(!subcategories) return(next(new AppErr('no sub category found ', 400)))
      res.json({message:"success",subcategories})

})

export const deletesubCategry=deleteItem(SubCategory)


