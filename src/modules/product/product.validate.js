import  Joi from "joi"

const fileSchema = Joi.object({
      originalname: Joi.string().required(),
      mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
      fieldname:Joi.string(),
      encoding:Joi.string(),
      destination:Joi.string(),
      filename:Joi.string(),
      path:Joi.string(),
      size:Joi.number(),
    });
export  const productValidation= Joi.object({
      title:Joi.string().required(),
      imageCover:fileSchema,

     images:Joi.array().items(fileSchema).min(1).required(),
     price:Joi.number().required(),
     discreption:Joi.string().required(),
     stock:Joi.string().required(),
     solid:Joi.string().required()
 


})