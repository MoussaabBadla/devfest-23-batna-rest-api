import mongoose from "mongoose";


const NotificationSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required : true,
    },
    type: {
        type: String,
        required: true,
    }
    // createdAt: { type: Date, default: Date.now },
    // userNotifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserNotification' }],
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;