import axios from 'axios';
import FormData  from "form-data";
import fs from 'fs';
import env from "dotenv";
env.config()
const form = new FormData();
const id_client = process.env.telegram_id_client 
const token = process.env.telegram_token



const postTelegramPost =async (text,imgUrl)=>{
 try{
    form.append('photo', imgUrl);
    form.append('caption', text);
    const response = axios.post(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${id_client}&text=${text}`, form, { headers: { ...form.getHeaders(), }, })
    console.log(response)
    return response
 }catch(err){
    console.log(err);
    throw err
 }
}


const postTelegramAudio = async(url,title)=>{
    form.append("audio", fs.createReadStream(url));
    form.append("title", title);
   const response = await axios.post(`https://api.telegram.org/bot${token}/sendAudio?chat_id=${id_client}`, form, { headers: { ...form.getHeaders(), }, }).catch((error) => {
        console.log(error);
    });
    return  response
}

export {postTelegramAudio ,postTelegramPost}