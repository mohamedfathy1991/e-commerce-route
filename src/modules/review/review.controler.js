import slugify from "slugify";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import { deleteItem } from "../handler/handle.delete.js";
import {Review} from '../../../database/model/review.model.js'

export const addReview = errhandle(async (req, res, next) => {
  req.body.user= req.user.id
     let checkreviewed= await Review.findOne({productid:req.body.productid,user:req.user.id})
     console.log(checkreviewed)
     if(checkreviewed) return (next(new AppErr('you make review before',401)))
  let Reviews = new Review(req.body);

  await Reviews.save();
  res.json({
    message: "success",
    Reviews,
  });
});
export const getOneReview = errhandle(async (req, res, next) => {
  const { id } = req.params;
  const Reviews = await Review.findById(id);
  if (!Reviews) return next(new AppErr("no  sub Review found ", 400));
  res.json({ message: "success", Reviews });
});
export const getReview = errhandle(async (req, res, next) => {
  let Reviews = await Review.find();
  if (Reviews.legnth == 0) return next(new AppErr("no Reviews found ", 400));
  res.json({ message: "success", Reviews });
});
export const updateReview = errhandle(async (req, res, next) => {
  const { id } = req.params;
  // check if the owner  
  const Reviews = await Review.findOneAndUpdate({_id:id,user:req.user.id}, {
    new: true,
  });
  if (!Reviews) return next(new AppErr("no Reviews found ", 400));
  res.json({ message: "success", Reviews });
});

// export const deleteReview=errhandle(async(req,res,next)=>{
//       const {id} = req.params
//       const Reviews = await Review.findByIdAndDelete(id)
//       if(!Reviews) return(next(new AppErr('no  sub category found ', 400)))
//       res.json({message:"success",Reviews})

// })
export const deleteReview = deleteItem(Review);
