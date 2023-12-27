
import multer from 'multer';
import { uploadAudioToCloudinary, uploadImageToCloudinary } from '../utils/uploadToCloudinary.js';
import fs from 'fs'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
export const uploadFile =multer({
  storage
})

export async function handleAudioUploadRequiredFile(req, res, next){
  if(req.file){
    const pathToRemove = req.file.path
    const audioUrl = await uploadAudioToCloudinary(req.file)
    req.body.audio = audioUrl
    fs.unlink(pathToRemove, (err) => {
      if (err) {
        return res.status(500).send('Error removing temp file');
      } 
    });
 
    next()
  } else {
    return res.status(400).json({message: "audio file missing"})
  }
 };
  export async function handleImgUrlRequiredFile(req, res, next){
    if(req.file){
              const pathToremove = req.file.path
              const image_url= await  uploadImageToCloudinary(req.file)
              req.body.image_url = image_url
              fs.unlink(pathToremove, (err) => {
                if (err) {
                 return res.status(500).send('Error removing temp file');
                } 
              });
    
            next()
           
    }else{
        return res.status(400).json({messgae:"image file missing"})
    }
    
};
