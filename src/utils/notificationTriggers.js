export async function notifyAllUsers (notif){
    var topic = notif.type
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
}