import { Router } from "express";

import { accessAllowTo } from "../../midleware/authorization.js";
import { protectuser } from "../../midleware/protectuser.js";
import { validate } from "../../midleware/validation.js";
import { addReview, deleteReview, getOneReview, getReview, updateReview } from "./review.controler.js";
import { reviewValidation } from "./review.validate.js";

const reviewRoute = Router();

reviewRoute.post(
  "/",
  validate(reviewValidation), protectuser ,
  addReview
);
reviewRoute.get("/", protectuser,accessAllowTo('user'),getReview);
reviewRoute.route("/:id").get(protectuser,accessAllowTo('admin'),getOneReview).put(updateReview).delete(deleteReview);

export default reviewRoute;
