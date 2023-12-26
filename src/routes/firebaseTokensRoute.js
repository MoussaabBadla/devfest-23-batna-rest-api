import { Router } from "express";
import {  subscribeTokenController, unsubscribeTokenController } from "../controllers/firebaseController.js";

const fireBaseRouter = Router()

fireBaseRouter.post('/subscribe/:memberId', subscribeTokenController)
fireBaseRouter.post('/unsubscribe',unsubscribeTokenController)

export default fireBaseRouter