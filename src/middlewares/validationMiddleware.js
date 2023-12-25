import { validationResult } from "express-validator";
import { uploadImageToCloudinary } from "../utils/uploadToCloundinary.js";
import fs from 'fs';
export async function checkValidation(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status:400,errors: errors.array().map(err=>{
            return err.msg
        })})
    }
    if(req.file){
      const pathToremove = req.body.imgUrl
      const imgUrl= await  uploadImageToCloudinary(req.file)
      req.body.imgUrl = imgUrl
      fs.unlink(pathToremove, (err) => {
        if (err) {
         return res.status(500).send('Error removing temp file');
        } 
      });
    }
    next()
}