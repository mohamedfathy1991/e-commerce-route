


export  class AppErr extends Error{
      constructor(message, statusCode){
            super(message);
            this.statusCode=statusCode
      }
}

export const  errhandle=(fun)=>{
      return(req,res,next)=>{
           fun(req,res,next).catch(err=>{
                  console.log("err herr!!!"+err);

                  
                  next(new AppErr(err,500))
                  
            })

      }
}