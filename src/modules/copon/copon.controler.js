import slugify from "slugify";
import { AppErr, errhandle } from "../../midleware/catcherr.js";
import { deleteItem } from "../handler/handle.delete.js";
import { Copon } from "../../../database/model/cobon.model.js";

export const addCopon = errhandle(async (req, res, next) => {
  

  let Copons = new Copon(req.body);

  await Copons.save();
  res.json({
    message: "success",
    Copons,
  });
});
export const getOneCopon = errhandle(async (req, res, next) => {
  const { id } = req.params;
  const Copons = await Copon.findById(id);
  if (!Copons) return next(new AppErr("no  sub Copon found ", 400));
  res.json({ message: "success", Copons });
});
export const getCopon = errhandle(async (req, res, next) => {
  let Copons = await Copon.find();
  if (Copons.legnth == 0) return next(new AppErr("no Copons found ", 400));
  res.json({ message: "success", Copons });
});
export const updateCopon = errhandle(async (req, res, next) => {
  const { id } = req.params;
  const Copons = await Copon.findById(id, req.body, {
    new: true,
  });
  if (!Copons) return next(new AppErr("no Copons found ", 400));
  res.json({ message: "success", Copons });
});

// export const deleteCopon=errhandle(async(req,res,next)=>{
//       const {id} = req.params
//       const Copons = await Copon.findByIdAndDelete(id)
//       if(!Copons) return(next(new AppErr('no  sub category found ', 400)))
//       res.json({message:"success",Copons})

// })
export const deleteCopon = deleteItem(Copon);
