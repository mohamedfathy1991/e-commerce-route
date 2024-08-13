import  Joi from "joi"

export  const reviewValidation= Joi.object({
      comment:Joi.string().required(),
      productid:Joi.string().hex(),
      rate:Joi.number()

      

})