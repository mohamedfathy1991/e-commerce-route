
import { Router } from "express";
import { addProduct, deleteProduct, getOneProduct, getProduct, updateProduct } from "./product.controler.js";
import { uploadmixofImage } from "../../midleware/multer.js";
import { validate } from "../../midleware/validation.js";
import { productValidation } from "./product.validate.js";
import { protectuser } from "../../midleware/protectuser.js";

const productRoute=Router()



productRoute.post('/',protectuser,uploadmixofImage([{name:"imageCover",maxCount:1},{name:"images",maxCount:5}], "product"),validate(productValidation),addProduct)
productRoute.get('/', getProduct)

productRoute.route('/:id').get(getOneProduct)
.put(updateProduct)
.delete(deleteProduct)





export default productRoute