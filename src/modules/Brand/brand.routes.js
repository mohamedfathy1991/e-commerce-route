
import { Router } from "express";
import { addBrand, deleteBrand, getBrand, getOneBrand, updateBrand } from "./brand.controler.js";
import { uploadSingleImage } from "../../midleware/multer.js";
import { validate } from "../../midleware/validation.js";
import { brandValidation } from "./brand.validate.js";

const brandRoute=Router()



brandRoute.post('/',uploadSingleImage('logo','brand'),validate(brandValidation),addBrand)
brandRoute.get('/', getBrand)
brandRoute.route('/:id').get(getOneBrand)
.put(updateBrand)
.delete(deleteBrand)





export default brandRoute