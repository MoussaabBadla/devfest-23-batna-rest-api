import exp from "constants";
import {
  loginUser,
  registerUser,
  verifyUser,
} from "../services/AuthServices.js";
import { generateToken } from "../utils/jwt.js";
import User from "../models/User.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";

/**
 * @access public 
 * @route POST /auth/login
 * @description {Login User Controller}
 * @param {*} email
 * @param {*} password
 * @returns {User , token , success , message}
 * @throws {error}
 */

export async function loginController(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res,"Email or Password is empty", 400);
    }
    const  result = await loginUser(email, password);
    if (!result.success) {
      return errorResponse(res,"Invalid credationls", 400);
    }
    const user = result.data;
    const token = generateToken(user._id);
    delete user.password;
    return successResponse(res, "Login Success", {
      token,
      ...user._doc,
    },200);
  } catch (error) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}

/**
 * @access public
 * @route POST /auth/register
 * @description {Register User Controller}
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * @returns {User , success , message}
 * @throws {error}
 */


export async function registerController(req, res) {
  try {
    const { name, email, password  , age } = req.body;
    if (!name || !email || !password || !age) {
      return errorResponse(res,"Name , Email or Password is empty", 400);
    }


    var result = await registerUser(email, password, name , age);
    result.data.password  = undefined;
    if (!result.success) {
      return errorResponse(res,result.message, 400);
    }
    return successResponse(res, "Register Success",result,201);
  } catch (error) {
    return errorResponse(res,"something went wrong "+error.message, 500);
  }
}

/**
 * @access public
 * @route PUT /auth/verify
 * @description {Verify User Controller}
 * @param {*} code
 * @param {*} email
 * @returns {User , success , message}
 * @throws {error}
 */


export async function verifyController(req, res) {
  try {
    const { code, email } = req.body;

    if (!code || !email) {
      return errorResponse(res,"Code or Email is empty", 400);
      
    }

    var result = await verifyUser(email, code);

    if (!result.success) {
      return errorResponse(res,result.message, 400);
    }

    const user = result.data;
    const token = generateToken(user._id);

    delete user.password;
    return successResponse(res,  "Verify Success",  {
      token,
      ...user,
    },200);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}



export async function CheckAuthController(req,res){
  try{
    const user = await User.findById(req.user._id)

  return successResponse(res,  "User Authenticated",  {
    ...user._doc,
  },200);
  }catch(err){
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}