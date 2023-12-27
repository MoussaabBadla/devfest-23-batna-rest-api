import { Router } from "express";
import {  subscribeTokenController, unsubscribeTokenController } from "../controllers/firebaseController.js";
import { protect } from "../middlewares/auth.js";

const fireBaseRouter = Router()

/**
 * @swagger
 * tags:
 *  - name: FirebaseToken
 *    description: Operations related to user FirebaseToken
 * paths:
 *  /fcmToken/subscribe:
 *    post:
 *      summary: create fcm token for user
 *      description: create fcm token for user.
 *      tags:
 *        - FirebaseToken
 *      requestBody:
 *        description: fcm toke.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                fcmToken:
 *                 type: string
 *      responses:
 *        '200':
 *          description: A successful respons.
 *  /fcmToken/unsubscribe:
 *    post:
 *      summary: unsubscribe user from notification
 *      description: unsubscribe user from notification.
 *      tags:
 *        - FirebaseToken
 */
fireBaseRouter.post('/subscribe',protect, subscribeTokenController)
fireBaseRouter.post('/unsubscribe',protect,unsubscribeTokenController)

export default fireBaseRouter