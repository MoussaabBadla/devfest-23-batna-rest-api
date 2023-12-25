const UserNotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification' },
    hasSeen: Boolean,
});

const UserNotification = mongoose.model("Notification", UserNotificationSchema);

export default UserNotification;