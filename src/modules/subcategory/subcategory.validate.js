
import Joi from "joi"

export  const subCategoryValidation= Joi.object({
      name:Joi.string().required(),
     

})