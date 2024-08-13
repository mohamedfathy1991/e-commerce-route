import  Joi from "joi"

export  const brandValidation= Joi.object({
      name:Joi.string().required(),
      logo:Joi.object({
            fieldname:Joi.string().required()
            ,originalname:Joi.string(),
            encoding:Joi.string(),
            mimetype:Joi.string().valid('image/jpg','image/jpeg','image/png'),
            destination:Joi.string(),
            filename:Joi.string(),
            path:Joi.string(),
            size:Joi.number(),


      })

})