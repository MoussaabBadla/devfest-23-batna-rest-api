import exp from "constants";
import { getSubscribsUsers, getUser, getUsers, updateUser } from "../services/UserServices.js";

/**
 * @access public 
 * @route Get /users/subscribs
 * @description {Login User Controller}
 * @param {*} email
 * @param {*} password
 * @returns {User , token , success , message}
 * @throws {error}
 */

export async function getSubscribsUsersController(req, res) {
  try {
    const  result = await getSubscribsUsers();
    const users = result;
   
    return res.status(200).json({
      success: true,
      message: "subscribed users fetched successfully",
      data: {
        users
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
  }
}

export async function getUsersController(req,res){
  try {
    const  result = await  getUsers();
    const users = result;
   
    return res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: {
        users
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
  }
 
}

export async function getUserController(req,res){
  try {
    const {userId} = req.params
    const  result = await  getUser(userId);
    if(!result) return res.status(404).json({message: "User not found"})
    const user = result;
   
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: {
        user
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
  }
 
}

export async function deleteUserController(req,res){
  try {
    const {userId} = req.params
    const  result = await  getUser(userId);
    if(!result) return res.status(404).json({message: "User not found"})
    const user = await deleteUserById(userId);
   
    return res.status(204).json({
      success: true,
      message: "user deleted successfully",
      data: {
        user
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
  }
 
}

export async function updateUserController(req,res){
  try {
    const {userId} = req.params
    const body = req.body
    const  result = await  getUser(userId);
    if(!result) return res.status(404).json({message: "User not found"})
    const user = await updateUser(userId,body);
   
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: {
        user
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
  }
 
}