import express from "express"
import { deleteAllStoriesController, deleteStoryController, generateStoryFromAudioController, generateStoryFromImageController, generateStoryFromTextController, getStoriesController, getStoryController, getUserStoriesController, updateStoryTypeController } from "../controllers/StoryController.js";
import { protect } from "../middlewares/auth.js";
import { handleImgUrlRequiredFile, uploadFile } from "../middlewares/imgUploadMiddlware.js";
import { imageToStory } from "../utils/imageToStory.js";

/**
 * @swagger
 * tags:
 * - name: Stories
 *  description: Operations related to stories
 * /stories/:
 *  get:
 *    summary: Get all stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 *  delete:
 *    summary: Delete all stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /stories/user:
 *  get:
 *    summary: Get user stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /stories/generateStory/text:
 *  post:
 *    summary: Generate story from text
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /stories/generateStory/image:
 *  post:
 *    summary: Generate story from image
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /stories/{storyId}:
 *  get:
 *    summary: Get a single story
 *    parameters:
 *      - name: storyId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 *  delete:
 *    summary: Delete a single story
 *    parameters:
 *      - name: storyId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 *  put:
 *    summary: Update a single story
 *    parameters:
 *      - name: storyId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * components:
 *  securitySchemes:
 *    Bearer:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

const router = express.Router();
router.get('/',protect, getStoriesController );
router.delete('/', deleteAllStoriesController );
router.get('/user',protect, getUserStoriesController );
router.post('/generateStory/text',protect, generateStoryFromTextController);
router.post('/generateStory/image',protect,imageToStory);  
// router.post('/generateStory/audio',protect,uploadFile.single("audio"),handleAudioUploadRequiredFile, generateStoryFromAudioController);
router.get('/:storyId',protect, getStoryController );
router.delete('/:storyId',protect, deleteStoryController);
router.put('/:storyId',protect,updateStoryTypeController)
export default router;