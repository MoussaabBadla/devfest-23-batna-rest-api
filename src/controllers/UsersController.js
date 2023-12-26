import { deleteUserById, getSubscribsUsers, getUser, getUserByEmail, getUsers, updateUser, updateUserForgetPassword } from "../services/UserServices.js";
import { sendMailPlainText } from "../utils/email.js";
import { generatePassword } from "../utils/randomPassword.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";

/**
 * @access public 
 * @route Get /users/subscribes
 * @description {newslettere subscribers Controller}
 * @returns {Users , success , message}
 * @throws {error}
 */

export async function getSubscribsUsersController(req, res) {
  try {
    const  result = await getSubscribsUsers();
    const users = result;
    return successResponse(res, "subscribed users fetched successfully", users,200);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}

/**
 * @access public 
 * @route Get /users
 * @description {users Controller}
 * @returns {Users , success , message}
 * @throws {error}
 */
export async function getUsersController(req,res){
  try {
    const  result = await  getUsers();
    const users = result;
   
    return successResponse(res, "users fetched successfully", users,200);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
 
}

/**
 * @access public 
 * @route Get /users/:userId
 * @description {user Controller}
 * @returns {User , success , message}
 * @throws {error}
 */

export async function getUserController(req,res){
  try {
    const {userId} = req.params
    const  result = await  getUser(userId);
    if(!result) return errorResponse(res,"User not found", 404); 
    const user = result;
   
    return successResponse(res, "subscribed user fetched successfully", user,200);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
 
}

/**
 * @access public 
 * @route Delete /users/:userId
 * @description {delete user Controller}
 * @returns {null , success , message}
 * @throws {error}
 */

export async function deleteUserController(req,res){
  try {
    const {userId} = req.params
    const  result = await  getUser(userId);
    if(!result) return errorResponse(res,"User not found", 404); 
    const user = await deleteUserById(userId);
    return successResponse(res, "user deleted successfully", null,204);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
 
}

/**
 * @access public 
 * @route Put /users/:userId
 * @param name
 * @param email
 * @param isSubscribe
 * @param age
 * @description {put user Controller}
 * @returns {user , success , message}
 * @throws {error}
 */
export async function updateUserController(req,res){
  try {
    const {userId} = req.params
    const body = req.body
    const  result = await  getUser(userId);
    if(!result) return errorResponse(res,"User not found", 404); 
    const user = await updateUser(userId,body);
    return successResponse(res, "user fetched successfully", user,200);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
 
}


export async function forgetPasswordController(req,res){
  try {
    const {email} = req.body
    const user = await getUserByEmail(email)
    if(!user ) return errorResponse(res,"User not found", 404); 

  const newPassword = generatePassword(10)
  const updatedUser = await updateUserForgetPassword(email,newPassword)
  if(updatedUser) await sendMailPlainText(updateUser.email,"your new password",`here is your new password : ${newPassword}`)
    return res.status(200).json({
      success: true,
      message: "your new password has been updated and sent successfully to your email",
      data: null
    });
    return successResponse(res,  "your new password has been updated and sent successfully to your email",null,200);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}