
import { Router } from "express";
import { addCategory, deleteCtegory, getCategory, getOneCategory, updateCategory } from "./category.controler.js";
import { uploadSingleImage } from "../../midleware/multer.js";
import { validate } from "../../midleware/validation.js";
import { categoryValidation } from "./category.validattion.js";
import subCategoryRoute from "../subcategory/subcategory.routes.js";

const categoryRoute=Router()



categoryRoute.post('/',uploadSingleImage('image','category'),validate(categoryValidation),addCategory)
categoryRoute.get('/',getCategory)
categoryRoute.route('/:id').get(getOneCategory).put(uploadSingleImage('image','category'),updateCategory).delete(deleteCtegory)


 categoryRoute.use('/:id/subcategory',subCategoryRoute)



export default categoryRoute