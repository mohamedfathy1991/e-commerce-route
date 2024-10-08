import { AppErr } from "./catcherr.js";

export const validate=(schema)=>{

      return(req,res,next)=>{

            let  fileimage={}
            if(req.file) {
                    if(req.file.image)fileimage.image=req.file.image
                     if(req.file.logo )fileimage.logo=req.file.logo
                  }
            if(req.files){
                  
                   fileimage.imageCover=req.files.imageCover[0]
                   fileimage.images=req.files.images
            }      

          
                   let {error}= schema.validate({...fileimage,...req.body,...req.params,...req.query},{abortEarly:false})

            
             
         
           if(!error) next()
           else{
             let  errMessage= error.details.map(err=>err.message)


            next (new AppErr(errMessage,401))
           }


      }
}