import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationCode : {
        type: String,
        expires: "3m",
    
    },
    age :  {
        type: Number,
    
    },
    isVerified : {
        type: Boolean,
        default : false,
    },
    fcmToken:{
        type: String,
    },
    isSubscribe:{
        type: Boolean,
        default : false,
    },
    role:{
        type: String,
        default : 'user'
    }
});

const User = mongoose.model("User", UserSchema);

export default User;