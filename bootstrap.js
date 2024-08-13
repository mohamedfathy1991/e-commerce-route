import authRoute from "./src/modules/auth/auth.routes.js"
import brandRoute from "./src/modules/Brand/brand.routes.js"
import categoryRoute from "./src/modules/category/category.routes.js"
import productRoute from "./src/modules/product/product.routes.js"
import reviewRoute from "./src/modules/review/review.routes.js"
import subCategoryRoute from "./src/modules/subcategory/subcategory.routes.js"
import userRoute from "./src/modules/users/user.routes.js"
import washlistRoute from "./src/modules/washlist/washlist.routes.js"
import addressRoute from './src/modules/address/address.routes.js'
import CoponRoute from "./src/modules/copon/copn.routes.js"
import cartRoute from "./src/modules/cart/cart.routes.js"
import OrderRoute from "./src/modules/order/order.routes.js"



export const bootStrap=(app)=>{


      
      app.use('/api/category',categoryRoute)
      app.use('/api/subcategory',subCategoryRoute)
      app.use('/api/brand',brandRoute)
      app.use('/api/product',productRoute)
      app.use('/api/auth',authRoute)
      app.use('/api/user',userRoute)
      app.use('/api/review',reviewRoute)
      app.use('/api/washlist',washlistRoute)
      app.use('/api/address',addressRoute)
      app.use('/api/copon',CoponRoute)
      app.use('/api/cart',cartRoute)
      app.use('/api/order',OrderRoute)
      
}