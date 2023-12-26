import { Router } from "express";
import { checkValidation } from "../middlewares/validationMiddleware.js";
import fireBaseTokenDto from "../validations/firebaseToken.js";
import {  subscribeTokenController, unsubscribeTokenController } from "../controllers/firebaseController.js";

const fireBaseRouter = Router()

fireBaseRouter.post('/subscribe/:memberId',fireBaseTokenDto,checkValidation, subscribeTokenController)
fireBaseRouter.post('/unsubscribe',fireBaseTokenDto,checkValidation,unsubscribeTokenController)

export default fireBaseRouter