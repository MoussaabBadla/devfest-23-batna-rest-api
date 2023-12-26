import { body } from "express-validator";

const forgetPasswordDto = [
    body('email').notEmpty().withMessage('email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email address'),
];
  
export default forgetPasswordDto