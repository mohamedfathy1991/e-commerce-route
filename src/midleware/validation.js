import { AppErr } from "./catcherr.js";

export const validate=(schema)=>{

      return(req,res,next)=>{

            let  fileimage={}
            if(req.file) {
                   fileimage.image=req.file.image
                   fileimage.logo=req.file.logo
                  }
            if(req.files){
                  
                   fileimage.imageCover=req.files.imageCover[0]
                   fileimage.images=req.files.images
            }      

          
                   let {error}= schema.validate({...fileimage,...req.body,...req.params,...req.query},{abortEarly:false})

            
             
         
           if(!error) next()
           else{
            console.log(error);
             let  errMessage= error.details.map(err=>err.message)


            next (new AppErr(errMessage,401))
           }


      }
}