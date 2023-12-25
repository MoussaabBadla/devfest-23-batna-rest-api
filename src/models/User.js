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
        required: true,
    },
    isSubscribe:{
        type: Boolean,
        default : false,
    }
});

const User = mongoose.model("User", UserSchema);

export default User;