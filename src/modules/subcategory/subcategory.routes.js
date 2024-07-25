
import { Router } from "express";
import {addsubCategory, deletesubCategry, getOnesubCategory, getsubCategory, updatesubCategory} from "./subcategory.controler.js"
import { validate } from "../../midleware/validation.js";
import { subCategoryValidation } from "./subcategory.validate.js";

export const subCategoryRoute=Router({mergeParams:true})



subCategoryRoute.post('/',validate(subCategoryValidation), addsubCategory)
subCategoryRoute.get('/', getsubCategory)
subCategoryRoute.route('/:id').get(getOnesubCategory)
.put(updatesubCategory)
.delete(deletesubCategry)





export default subCategoryRoute