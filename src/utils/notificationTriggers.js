import { sendMailToSubscribeUsers } from "../services/newsletterServices.js";

export async function notifyAllUsers (notif){
    try{
        var topic = notif.title
    var message = {
      data: notif,
      topic: topic
    };
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });

      await sendMailToSubscribeUsers("Exciting News from Truly Saver newsLetter",notif)
    }catch(error) {
        console.log('Error sending message:', error);
    }
}