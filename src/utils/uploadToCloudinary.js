import cloudinary from "../config/cloudinary.js"


export async function uploadImageToCloudinary(file){
            const uploadedFile= await cloudinary.uploader.upload(file.path,{
                resource_type: 'image',
            })
            return uploadedFile.url
};
export async function uploadAudioToCloudinary(file){
    const uploadedFile = await cloudinary.uploader.upload(file.path, {
      resource_type: 'video',
    })
    return uploadedFile.url
   };