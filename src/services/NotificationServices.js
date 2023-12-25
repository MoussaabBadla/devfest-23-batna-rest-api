import Notification from "../models/Notification.js";



export const createNotification = async (notif) => {
    try {
      const notification =new Notification(notif);
        await notification.save();
        notifyAllUsers(notif)
      return notification;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };

