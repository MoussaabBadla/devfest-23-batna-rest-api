import axios from 'axios';
import FormData  from "form-data";
import env from "dotenv";
env.config()
const form = new FormData();
const id_client = process.env.telegram_id_client 
const token = process.env.telegram_token



const postTelegramText = (text)=>{
    axios.post(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${id_client}&text=${text}`, form, { headers: { ...form.getHeaders(), }, })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}


const postTelegramPhoto = (imgUrl)=>{
    form.append('photo', imgUrl);
    axios.post(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${id_client}`, form, { headers: { ...form.getHeaders(), }, })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
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

export {postTelegramAudio , postTelegramPhoto , postTelegramText}