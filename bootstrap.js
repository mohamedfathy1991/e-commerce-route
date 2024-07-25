import brandRoute from "./src/modules/Brand/brand.routes.js"
import categoryRoute from "./src/modules/category/category.routes.js"
import productRoute from "./src/modules/product/product.routes.js"
import subCategoryRoute from "./src/modules/subcategory/subcategory.routes.js"



export const bootStrap=(app)=>{
      
      app.use('/api/category',categoryRoute)
      app.use('/api/subcategory',subCategoryRoute)
      app.use('/api/brand',brandRoute)
      app.use('/api/product',productRoute)
      
}