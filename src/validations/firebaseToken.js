import { body } from "express-validator";

const fireBaseTokenDto = [
    body('fcmToken').notEmpty().withMessage('fcmToken'),
   
];
  
export default fireBaseTokenDto