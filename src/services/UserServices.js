import User from "../models/User.js";

export const getUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };

  export const getSubscribsUsers= async ()=>{
    try {
      const users = await User.find({ isSubscribe: true }).select("-password");
      return users;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getUsers = async ()=>{
    try {
      const users = await User.find().select("-password");
      return users;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getUser= async (userId)=>{
    try {
      const user = await User.findById(userId).select("-password");
      return user;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }
  export const deleteUserById=async(userId) =>{
    try {
      const result = await User.deleteOne({ _id: userId });
      return result
    } catch (error) {
      console.error(error);
    }
  }

  export const updateUser = async(userId,userData)=>{
    try {
     const result = await User.updateOne({ _id: userId }, { $set: userData }).select("-password");;
      return result
    } catch (error) {
      console.error(error);
    }
  }

  export const updateUserForgetPassword = async (email, newPassword)=>{
try{
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  const result = await User.updateOne({email: email }, { $set:{password:hashPassword } });
  return result;
}catch (error) {
  console.error(error);
}
  }