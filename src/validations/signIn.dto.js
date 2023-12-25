import { body } from "express-validator";

const signInDto = [
    body('email').notEmpty().withMessage('email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().isLength({min:10}).withMessage('password cannot be empty')
];
  
export default signInDto