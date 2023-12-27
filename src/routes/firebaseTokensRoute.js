import { Router } from "express";
import {  subscribeTokenController, unsubscribeTokenController } from "../controllers/firebaseController.js";
import { protect } from "../middlewares/auth.js";

const fireBaseRouter = Router()

fireBaseRouter.post('/subscribe',protect, subscribeTokenController)
fireBaseRouter.post('/unsubscribe',protect,unsubscribeTokenController)

export default fireBaseRouter