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
      const users = await User.find({ isSubscribe: true });
      return users;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getUsers = async ()=>{
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getUser= async (userId)=>{
    try {
      const user = await User.findById(userId);
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
     const result = await User.updateOne({ _id: userId }, { $set: userData });
      return result
    } catch (error) {
      console.error(error);
    }
  }