import express from "express"
import { getSubscribsUsersController, getUserController, getUsersController, updateUserController } from "../controllers/UsersController.js";
import updateMemberDto from "../validations/userDto/updateUser.dto.js";
import { checkValidation } from "../middlewares/validationMiddleware.js";
// import { protect } from "../middlewares/auth.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - age
 *         - role
 *         - fcmToken
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The user email
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Whether the user is admin or a simple user
 *         age:
 *           type: number
 *           description: User age
 *         password:
 *           type: string
 *           description: User password
 *         fcmToken:
 *           type: string
 *           description: The FCM token for the user's device
 *       example:
 *         id: d5fE_asz
 *         name: rayan
 *         email: 'rayan@gmail.com'
 *         role: 'user'
 *         age: 20
 *         password: 'password'
 *         fcmToken: 'fcmToken'
 *
 */

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

router.get("/",getUsersController);
router.get("/subscribes",getSubscribsUsersController);
router.get("/:userId",getUserController)
router.put("/:userId",updateMemberDto,checkValidation,updateUserController)
export default router;