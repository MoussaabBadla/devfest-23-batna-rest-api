import express from "express"
import { deleteUserController, forgetPasswordController, getSubscribsUsersController, getUserController, getUsersController, updateUserController } from "../controllers/UsersController.js";
import { protect } from "../middlewares/auth.js";
// import { protect } from "../middlewares/auth.js";

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users
 * paths:
 *   /users:
 *     get:
 *       summary: Get all users
 *       description: Retrieve a list of all users.
 *       tags:
 *         - Users
 *       responses:
 *         '200':
 *           description: A successful response with a list of users.
 *           content:
 *             application/json:
 *               example:
 *                 - id: d5fE_asz
 *                   name: rayan
 *                   email: 'rayan@gmail.com'
 *                   role: 'user'
 *                   age: 20
 *                   fcmToken: 'fcmToken'
 *     put:
 *       summary: Update a user
 *       description: Update an existing user by ID.
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user to update.
 *         - in: requestBody
 *           description: The updated user information.
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: A successful response with the updated user.
 *           content:
 *             application/json:
 *               example:
 *                 id: d5fE_asz
 *                 name: updatedName
 *                 email: 'updated@gmail.com'
 *                 role: 'user'
 *                 age: 25
 *                 fcmToken: 'updatedToken'
 *   /users/{userId}:
 *     get:
 *       summary: Get a user by ID
 *       description: Retrieve a user by ID.
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user to retrieve.
 *       responses:
 *         '200':
 *           description: A successful response with the user.
 *           content:
 *             application/json:
 *               example:
 *                 id: d5fE_asz
 *                 name: rayan
 *                 email: 'rayan@gmail.com'
 *                 role: 'user'
 *                 age: 20
 *                 fcmToken: 'fcmToken'
 *     delete:
 *       summary: Delete a user by ID
 *       description: Delete a user by ID.
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user to delete.
 *       responses:
 *         '204':
 *           description: A successful response indicating no content.
 *   /users/subscribes:
 *     get:
 *       summary: Get all subscribed users
 *       description: Retrieve a list of all subscribed users.
 *       tags:
 *         - Users
 *       responses:
 *         '200':
 *           description: A successful response with a list of subscribed users.
 *           content:
 *             application/json:
 *               example:
 *                 - id: abc123
 *                   name: subscribedUser1
 *                   email: 'subscribed1@gmail.com'
 *                   role: 'user'
 *                   age: 25
 *                   fcmToken: 'subscribedToken1'
 *                 - id: xyz456
 *                   name: subscribedUser2
 *                   email: 'subscribed2@gmail.com'
 *                   role: 'user'
 *                   age: 30
 *                   fcmToken: 'subscribedToken2'
 */

const router = express.Router();

router.get("/",protect, getUsersController);
router.get("/subscribes",protect,getSubscribsUsersController);
router.get("/:userId",protect,getUserController)
router.delete("/:userId",protect,deleteUserController)

router.put("/:userId",protect,updateUserController)
router.put("/forgetpassword",forgetPasswordController)
export default router;