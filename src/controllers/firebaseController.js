import { updateUser } from "../services/UserServices.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";

export async function subscribeTokenController(req,res){
    try{
        const user = req.user
        
const userFcmToken = await updateUser(user._id,{fcmToken:req.body.fcmToken})
return successResponse(res, "token subscribed successfully",userFcmToken,200);
    }catch(err){
        console.error(err)
        return errorResponse(res,"something went wrong "+err.message, 500);
    }
}

export async function unsubscribeTokenController(req,res){
    try{
        const user = req.user
        const userFcmToken = await updateUser(user._id,{fcmToken:null})
    if(userFcmToken) return successResponse(res, "token unsubscribed successfully",null,204);
    }catch(err){
        console.error(err)
        return errorResponse(res,"something went wrong "+err.message, 500);
    }
}