import slugify from "slugify";
import { Category } from "../../../database/model/category.model.js";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import fs from "fs"
import { log } from "console";
import path from "path";
import { fileURLToPath } from 'url';
import { deleteItem } from "../handler/handle.delete.js";
import { Apifiture } from "../../utilts/apifeture.js";




export const addCategory=  errhandle( async(req,res,next)=>{
      const {name} = req.body;
      const slug= slugify(name)
      let categoery = new  Category(req.body)

      categoery.slug=slug
      categoery.image= req.file.filename
      await categoery.save()
      res.json({
            message:"success",categoery
      })


})
export const getOneCategory=errhandle(async(req,res,next)=>{
      const {id} = req.params
      const category = await Category.findById(id)
      if(!category) return(next(new AppErr('no category found ', 400)))
      res.json({message:"success",category})

})
export const getCategory=errhandle(async(req,res,next)=>{

      let apicategory= new Apifiture(req.query,Category.find())
       apicategory.fields().pagination().filter().search()
       let category= await apicategory.mongosequery
      if(category.legnth==0) return(next(new AppErr('no category found ', 400)))
      res.json({message:"success",category})

})
export const updateCategory=errhandle(async(req,res,next)=>{
      const {id} = req.params 
     let {name}=req.body
     if( name) req.body.slug=slugify(req.body.name)
     if(req.file){
          let  oldcategory= await Category.findById(id)
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          
          
          let oldimage=oldcategory.image.split('/').pop()
          const oldpath=path.join(__dirname,"..","..","..","uploads","category",oldimage)
          
          fs.unlinkSync(oldpath);

      }
      req.body.image=req.file.filename
     
      const category = await Category.findByIdAndUpdate(id,req.body,{
            new:true
      })
      if(!category) return(next(new AppErr('no category found ', 400)))
      res.json({message:"success",category})

})

export const deleteCtegory=deleteItem(Category)

