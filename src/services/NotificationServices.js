import Notification from "../models/Notification.js";

export const createNotification = async ({ title,description,type}) => {
    try {
      const notification =new Notification({title:title,description:description,type:type});
        await notification.save();
      return notification;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };

