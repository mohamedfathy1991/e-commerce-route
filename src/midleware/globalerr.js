


const  globalerr = (err,req,res,next)=>{
      const statuscode = err.statusCode||500
      res.status(statuscode).json({
            errorr:err.message,
           
            code:statuscode
      })
      

      

}

export default globalerr