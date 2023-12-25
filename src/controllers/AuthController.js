import exp from "constants";
import {
  loginUser,
  registerUser,
  verifyUser,
} from "../services/AuthServices.js";
import { generateToken } from "../utils/jwt.js";
import User from "../models/User.js";

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
      return res.status(422).json({
        success: false,
        message: "Email or Password is empty",
      });
    }
    const  result = await loginUser(email, password);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    const user = result.data;
    const token = generateToken(user._id);
    delete user.password;
    return res.status(200).json({
      success: true,
      message: "Login Success",
      data: {
        token,
        ...user._doc,
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
      return res.status(422).json({
        success: false,
        message: "Name , Email or Password is empty",
      });
    }


    var result = await registerUser(email, password, name , age);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
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
      return res.status(422).json({
        success: false,
        message: "Code or Email is empty",
      });
    }

    var result = await verifyUser(email, code);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
        
      });
    }

    const user = result.data;
    const token = generateToken(user._id);

    delete user.password;
    return res.status(200).json({
      success: true,
      message: "Verify Success",
      data: {
        token,
        ...user,
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



export async function CheckAuthController(req,res){
  try{
    const user = await User.findById(req.user._id).populate({
      path: "outlines",
      populate: {
          path: "chapters",
          model: "Chapter"
      }
  });

    return res.status(200).json({
      success: true,
      message: "User Authenticated",
      data: {
        ...user._doc,
      },
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:  error.message,
    });
  }
}