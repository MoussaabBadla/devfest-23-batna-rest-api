import express from "express"
import { loginController , registerController ,verifyController,CheckAuthController  } from "../controllers/AuthController.js";
import { protect } from "../middlewares/auth.js";
import createUserDto from "../validations/userDto/createUser.dto.js";
import { checkValidation } from "../middlewares/validationMiddleware.js";
import signInDto from "../validations/signIn.dto.js";



const router = express.Router();


router.get("/",protect,createUserDto,checkValidation,CheckAuthController);
router.post('/login',signInDto,checkValidation, loginController );
router.post('/register', registerController );
router.put('/verify', verifyController );







export default router;