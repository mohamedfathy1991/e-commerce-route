
import { Router } from "express";
import {addsubCategory, deletesubCategry, getOnesubCategory, getsubCategory, updatesubCategory} from "./subcategory.controler.js"
import { validate } from "../../midleware/validation.js";
import { subCategoryValidation } from "./subcategory.validate.js";
import { protectuser } from "../../midleware/protectuser.js";
import { accessAllowTo } from "../../midleware/authorization.js";
import { errhandle } from "../../midleware/catcherr.js";

export const subCategoryRoute=Router({mergeParams:true})



subCategoryRoute.post('/',validate(subCategoryValidation),protectuser, accessAllowTo('user') ,addsubCategory)
subCategoryRoute.get('/',protectuser, accessAllowTo('user'),getsubCategory)
subCategoryRoute.route('/:id').get(protectuser,getOnesubCategory)
.put(updatesubCategory)
.delete(deletesubCategry)





export default subCategoryRoute