import { updateUser } from "../services/UserServices.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";

export async function subscribeTokenController(req,res){
    try{
        const user = req.user
        
const userFcmToken = await updateUser(user.userId,{fcmToken:req.body.fcmToken})
return successResponse(res, "token subscribed successfully",userFcmToken,200);
    }catch(err){
        console.error(err)
        return errorResponse(res,"something went wrong "+err.message, 500);
    }
}

export async function unsubscribeTokenController(req,res){
    try{
        const user = req.user
        const userFcmToken = await updateUser(user.userId,{fcmToken:null})
        const deletedToken = await unsubscribeToken(req.body.token)
    if(deletedToken) return successResponse(res, "token unsubscribed successfully",null,204);
    }catch(err){
        console.error(err)
        return errorResponse(res,"something went wrong "+err.message, 500);
    }
}