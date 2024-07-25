import  Joi from "joi"

export  const categoryValidation= Joi.object({
      name:Joi.string().required(),
      image:Joi.object({
            fieldname:Joi.string()
            ,originalname:Joi.string(),
            encoding:Joi.string(),
            mimetype:Joi.string().valid('image/jpg','image/jpeg','image/png'),
            destination:Joi.string(),
            filename:Joi.string(),
            path:Joi.string(),
            size:Joi.number(),


      })

})