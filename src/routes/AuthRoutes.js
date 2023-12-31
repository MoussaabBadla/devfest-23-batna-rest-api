import express from "express"
import { loginController , registerController ,verifyController,CheckAuthController  } from "../controllers/AuthController.js";
import { protect } from "../middlewares/auth.js";

/**
 * @swagger
 * tags:
 *  - name: Authentication
 *    description: Operations related to user authentication
 * paths:
 *  /auth:
 *    get:
 *      summary: Get user profile
 *      description: Retrieve the user profile.
 *      tags:
 *        - Authentication
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: A successful response with the user profile.
 *          content:
 *            application/json:
 *              example:
 *                id: d5fE_asz
 *                name: rayan
 *                email: 'rayan@gmail.com'
 *                role: 'user'
 *                age: 20
 *                fcmToken: 'fcmToken'
 *  /auth/login:
 *    post:
 *      summary: User login
 *      description: Authenticate a user and return a token.
 *      tags:
 *        - Authentication
 *      requestBody:
 *        description: User login credentials.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *      responses:
 *        '200':
 *          description: A successful response with an authentication token.
 *          content:
 *            application/json:
 *              example:
 *                token: 'your-auth-token'
 *  /auth/register:
 *    post:
 *      summary: User registration
 *      description: Register a new user.
 *      tags:
 *        - Authentication
 *      requestBody:
 *        description: User registration information.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *                name:
 *                 type: string
 *                age:
 *                 type: number
 *      responses:
 *        '201':
 *          description: A successful response indicating the user is registered.
 *  /auth/verify:
 *    put:
 *      summary: Verify user account
 *      description: Verify a user's account.
 *      tags:
 *        - Authentication
 *      requestBody:
 *        schema:
 *              type: object
 *              properties:
 *                email:
 *                 type: string
 *                code:
 *                 type: string
 *      responses:
 *        '200':
 *          description: A successful response indicating the user's account is verified.
 */


const router = express.Router();


router.get("/",protect,CheckAuthController);
router.post('/login', loginController );
router.post('/register', registerController );
router.put('/verify', verifyController );







export default router;