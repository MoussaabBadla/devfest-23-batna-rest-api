import cloudinary from "../config/cloudinary.js";
// import User from "../models/User.js";
import Replicate from 'replicate'

const REPLICATE_API_TOKEN = "r8_b5IoL5v3RFxtOtfBxyNXM2CLbCxEjil33fFJC"
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
  });

  async function runReplicate(imageUrl) {
    try {
      const output = await replicate.run(
        "andreasjansson/blip-2:f677695e5e89f8b236e52ecd1d3f01beb44c34606419bcc19345e046d8f786f9",
        {
          input: {
            image: imageUrl,
          }
        }
      );
      console.log("image description: ",output); 
      console.log("the story: ");
      return output
    } catch (error) {
      console.error('Error:', error.message);
    }}
export async function imageToStory(req, res) {
  try {
    // const { keywords } = req.body;
    // const imageGen = req.body.image;
    // const path = req.file?.path;
    // console.log("typeof keywords : ", typeof keywords);
    // console.log(req.body.image);
    // let image;
    // if(path){
    //     let result = await cloudinary.uploader.upload(path, {
    //         resource_type: "image",
    //     });
    //     await fs.unlink(path, (err) => {
    //         if (err) {
    //             console.error(err)
    //             return
    //             }
    //         })
    //     image = result.secure_url;
    // }
    // if(!image){
    //   image = imageGen
    // }
    // const output = await replicate.run(
    //   "andreasjansson/blip-2:f677695e5e89f8b236e52ecd1d3f01beb44c34606419bcc19345e046d8f786f9",
    //   {
    //     input: {
    //       image: image,
    //     }
    //   }
    // );
    // console.log("image description: ",output); 
    // console.log("the story: ");
    // if(!keywords){ 
    //   req.body = { 
    //     keywords: output,
    //     image
    //   };
    // }else{
    //   req.body = { 
    //     keywords: `${keywords}, ${output}`,
    //     image
    //   };
    // }
    // console.log("the imageeeeeee : ", image);
    // req.body.image = image;
    const response = await runReplicate('data:image/jpeg;base64,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')

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({success: false, message: error.message});
  }
}