import { sendMailToSubscribeUsers } from "../services/newsletterServices.js";
import admin from "../../firebase_config.js";
export async function notifyAllUsers (notif){
    try{
    let notification = {
      body: notif.description,
      title: notif.title,
    };
    await admin.messaging().sendToTopic("Users",{
        notification
    })
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });

      await sendMailToSubscribeUsers("Exciting News from Sekai newsLetter",notif)
    }catch(error) {
        console.log('Error sending message:', error);
    }
}

export async function notifyUserAfterStoryCreation(notif,fcmToken){
  try{
   const message = {
    notification: {
      title: notification.title,
      body: notification.description,
    },
    tokens: [fcmToken],
  };
 await admin
    .messaging()
    .sendEachForMulticast(message)
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