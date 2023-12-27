import express from "express"
import { deleteAllStoriesController, deleteStoryController, generateStoryFromAudioController, generateStoryFromImageController, generateStoryFromTextController, getStoriesController, getStoryController, getUserStoriesController, updateStoryTypeController } from "../controllers/StoryController.js";
import { protect } from "../middlewares/auth.js";
import { handleImgUrlRequiredFile, uploadFile } from "../middlewares/imgUploadMiddlware.js";
import { imageToStory } from "../utils/imageToStory.js";
/**
 * @swagger
 * tags:
 *  - name: Stories
 *    description: Operations related to stories
 * /:
 *  get:
 *    summary: Get all stories
 *    tags:
 *      - Stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 *  delete:
 *    summary: Delete all stories
 *    tags:
 *      - Stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /user:
 *  get:
 *    summary: Get user stories
 *    tags:
 *      - Stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /generateStory/text:
 *  post:
 *    summary: Generate story from text
 *    tags:
 *      - Stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /generateStory/image:
 *  post:
 *    summary: Generate story from image
 *    tags:
 *      - Stories
 *    security:
 *      - Bearer: []
 *    responses:
 *      '200':
 *        description: Successful operation
 * /{storyId}:
 *  get:
 *    summary: Get a single story
 *    tags:
 *      - Stories
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
 *    tags:
 *      - Stories
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
 *    tags:
 *      - Stories
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