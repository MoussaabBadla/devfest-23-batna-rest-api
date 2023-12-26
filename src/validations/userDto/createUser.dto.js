import { body } from "express-validator";

const createUserDto = [
    body('name').notEmpty().withMessage(' name cannot be empty'),
    body('email').notEmpty().withMessage('email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().isLength({min:10}).withMessage('password cannot be empty'),
    body('age').optional().notEmpty().withMessage('age cannot be empty'),
    body('role').optional().notEmpty().withMessage('role cannot be empty'),
];
  
export default createUserDto