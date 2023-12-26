import express from "express"
import { deleteAllStoriesController, generateStoryFromAudioController, generateStoryFromImageController, generateStoryFromTextController, getStoriesController, getStoryController, getUserStoriesController } from "../controllers/StoryController.js";
import { protect } from "../middlewares/auth.js";
import { handleAudioUploadRequiredFile, handleImgUrlRequiredFile, uploadFile } from "../middlewares/imgUploadMiddlware.js";

/**
 * @swagger
 * paths:
 *   /stories:
 *     get:
 *       summary: Get all stories
 *       security:
 *         - Bearer: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *     post:
 *       summary: Generate story from text
 *       security:
 *         - Bearer: []
 *       parameters:
 *         - name: body
 *           in: body
 *           required: true
 *           schema:
 *             $ref: '#/definitions/StoryFromTextDto'
 *       responses:
 *         '200':
 *           description: Successful operation
 *   /stories/user:
 *     get:
 *       summary: Get user stories
 *       security:
 *         - Bearer: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *   /stories/{storyId}:
 *     get:
 *       summary: Get a specific story by ID
 *       security:
 *         - Bearer: []
 *       parameters:
 *         - name: storyId
 *           in: path
 *           required: true
 *           type: string
 *       responses:
 *         '200':
 *           description: Successful operation
 *   /stories/generateStory/text:
 *     post:
 *       summary: Generate a story from text
 *       security:
 *         - Bearer: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateStoryFromTextDto'
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '400':
 *           description: Validation error
 */

const router = express.Router();
router.get('/',protect, getStoriesController );
router.delete('/', deleteAllStoriesController );
router.get('/user',protect, getUserStoriesController );
router.post('/generateStory/text',protect, generateStoryFromTextController);
router.post('/generateStory/image',protect,uploadFile.single("imgUrl"),handleImgUrlRequiredFile, generateStoryFromImageController);  
router.post('/generateStory/image',protect,uploadFile.single("audio"),handleAudioUploadRequiredFile, generateStoryFromAudioController);
router.get('/:storyId',protect, getStoryController );
export default router;