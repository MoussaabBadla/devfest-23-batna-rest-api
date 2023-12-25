import { sendEmail } from "../utils/email.js";
import { getSubscribsUsers } from "./UserServices.js";

export async function sendMailToSubscribeUsers(subject,template,context){
    try{
        const users = await getSubscribsUsers()
        if(users.length >0){
            users.forEach(async (user)=>{
             setTimeout(async()=>{
                    await sendEmail(user.email,subject,template,context)
                },8000)
            })
        }
    }catch(e){
        console.error(e.message)
    }
}