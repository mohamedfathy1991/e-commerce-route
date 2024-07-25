import slugify from "slugify";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import   {SubCategory} from "../../../database/model/subCategory.mode.js"
import { Category } from "../../../database/model/category.model.js";
import { Brand } from "../../../database/model/brand.mode.js";
import { Product } from "../../../database/model/product.model.js";
import { deleteItem } from "../handler/handle.delete.js";


  export  const addProduct=  errhandle( async(req,res,next)=>{

      const {title} = req.body;
      const slug= slugify(title)
      
      
      req.body.imageCover= req.files.imageCover[0].filename
      req.body.images= req.files.images.map(image=>image.filename)
      let products = new  Product(req.body)

      products.slug=slug
      
          await products.save()
      res.json({
            message:"success",products
      })


})
export const getOneProduct=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const Products = await Product.findById(id)
      if(!Products) return(next(new AppErr('no   Product found ', 400)))
      res.json({message:"success",Products})

})
export const getProduct=errhandle(async(req,res,next)=>{
   let Products=   await Product.find()
     if(Products.legnth==0) return(next(new AppErr('no Products found ', 400)))
      res.json({message:"success",Products})

})
export const updateProduct=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const Products = await Product.findById(id,req.body,{
            new:true
      })
      if(!Products) return(next(new AppErr('no Brands found ', 400)))
      res.json({message:"success",Products})

})

export const deleteProduct=deleteItem(Product)


