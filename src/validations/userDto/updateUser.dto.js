import { body } from "express-validator";

const updateMemberDto = [
    body('name').optional().notEmpty().withMessage(' name cannot be empty'),
    body('email').optional().notEmpty().withMessage('email cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('age').optional().notEmpty().withMessage('age cannot be empty'),
    body('fcmToken').optional().notEmpty().withMessage('fcmToken cant be empty'),
    body('isSubscribe').optional().isBoolean().notEmpty().withMessage('isSubscribe cant be empty'),
];
  
export default updateMemberDto