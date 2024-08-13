import { Router } from "express";
import { accessAllowTo } from "../../midleware/authorization.js";
import { protectuser } from "../../midleware/protectuser.js";
import {
  addCopon,
  deleteCopon,
  getCopon,
  getOneCopon,
  updateCopon,
} from "./copon.controler.js";

const CoponRoute = Router();

CoponRoute.post(
  "/",
  protectuser,
  accessAllowTo("user"),

  addCopon
);
CoponRoute.get("/", getCopon);
CoponRoute.route("/:id").get(getOneCopon).put(updateCopon).delete(deleteCopon);

export default CoponRoute;
