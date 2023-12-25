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



  
  