
import mongoose from "mongoose";
//Set up default mongoose connection
const mongoDB = 'mongodb+srv://amir:123@cluster0.n7j1wak.mongodb.net/ecomerce2024';

 mongoose.connect(mongoDB, { useNewUrlParser: true }).then(()=>{
      console.log("Connected to MongoDB database succes")
}).catch(err=>{
      console.log("Error connecting to MongoDB database", err)
})
 //Get the default connection
