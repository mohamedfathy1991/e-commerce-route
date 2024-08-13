import slugify from "slugify";
import { Product } from "../../../database/model/product.model.js";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import { Apifiture } from "../../utilts/apifeture.js";
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
      
      

      let apiFeature  =new Apifiture(req.query,Product.find())
// pagination
      // let pagenumber= req.query.page ||1
      // let limit= 2
      // let skip= (pagenumber-1)*limit
 // ***************

 //******    filteration  */

// let filteitem= structuredClone(req.query)
// filteitem= JSON.stringify(filteitem).replace(/(gt)|(lt)/,(val)=>{
//       return  ("$"+val)
// })
// filteitem= JSON.parse(filteitem)
// let excusefiled=["page","sort","limit","fields","search"]
// excusefiled.forEach(item=>{
//       delete filteitem[item]

// })


//******************************** */ 

// let mongosequery=    Product.find(filteitem).skip(skip).limit(limit)
// // **************sort 
//             if(req.query.sort){
//             let sortby= req.query.sort.split(',').join(' ')
//             mongosequery=mongosequery.sort(sortby) 
                  
//             }
// select field 
// if(req.query.fields){
//       let selectfiled= req.query.fields.split(',').join(' ')
//       mongosequery=mongosequery.select(selectfiled) 
            
//       }
// search *************
// if(req.query.search){
//       mongosequery=mongosequery.find({title:{$regex:req.query.search,$options:"i"}}) 
            
//       }
      apiFeature.pagination().filter().fields().sort()

    let Products= await apiFeature.mongosequery

     if(Products.length==0) return(next(new AppErr('no Products found ', 400)))
      res.json({message:"success",Products ,pagenumber:apiFeature.pagenumber})

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

 