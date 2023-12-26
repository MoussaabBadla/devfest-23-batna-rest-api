import axios from 'axios';
import FormData  from "form-data";
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


const postTelegramAudio = (url)=>{
    form.append("audio", url);
    form.append("title", "audio dev test");
    axios.post(`https://api.telegram.org/bot${token}/sendAudio?chat_id=${id_client}`, form, { headers: { ...form.getHeaders(), }, })
    .then((res) => res.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}

export {postTelegramAudio ,postTelegramPost}