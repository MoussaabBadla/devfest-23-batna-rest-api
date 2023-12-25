import express from "express"
import { getSubscribsUsersController, getUserController, getUsersController, updateUserController } from "../controllers/UsersController.js";
import updateMemberDto from "../validations/userDto/updateUser.dto.js";
import { checkValidation } from "../middlewares/validationMiddleware.js";
// import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",getUsersController);
router.get("/subscribes",getSubscribsUsersController);
router.get("/:userId",getUserController)
router.put("/:userId",updateMemberDto,checkValidation,updateUserController)
export default router;