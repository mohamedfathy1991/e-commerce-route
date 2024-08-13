import multer from "multer";
import { AppErr } from "./catcherr.js";


const  uploadImage=(foldername)=>{
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${foldername}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now().toLocaleString() + "-" + Math.round(Math.random() + 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
 
  
  if (! /image\/(jpg|png|jpeg)/.test( file.mimetype))
    return cb(new AppErr("only image please ", 400), false);
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
return upload

}

export const uploadSingleImage=(filename,foldername)=>{
  
  return uploadImage(foldername).single(filename)
}
export const uploadmixofImage=(fieldname,foldername)=>{
  return uploadImage(foldername).fields(fieldname)
}


