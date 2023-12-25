import express from "express"
import { loginController , registerController ,verifyController,CheckAuthController  } from "../controllers/AuthController.js";
import { protect } from "../middlewares/auth.js";



const router = express.Router();


router.get("/",protect,CheckAuthController);
router.post('/login', loginController );
router.post('/register', registerController );
router.put('/verify', verifyController );







export default router;