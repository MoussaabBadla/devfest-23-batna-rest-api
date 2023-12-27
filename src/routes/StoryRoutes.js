import express from "express"
import { deleteAllStoriesController, deleteStoryController, generateStoryFromAudioController, generateStoryFromImageController, generateStoryFromTextController, getStoriesController, getStoryController, getUserStoriesController, updateStoryTypeController } from "../controllers/StoryController.js";
import { protect } from "../middlewares/auth.js";
import { handleImgUrlRequiredFile, uploadFile } from "../middlewares/imgUploadMiddlware.js";
import { imageToStory } from "../utils/imageToStory.js";

/**
 * @swagger
 * tags:
 *  - name: Stories
 *    description: Operations related to Stories
 * paths:
 *  /stories:
 *    get:
 *      summary: Get all stories
 *      description: Retrieve a list of all stories.
 *      tags:
 *        - Stories
 *      responses:
 *        '200':
 *          description: A successful response with a list of stories.
 *    put:
 *      summary: Update a story type
 *      description: Update an existing story type by ID.
 *      tags:
 *        - Stories
 *      parameters:
 *        - in: path
 *          name: storyId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the story to update.
 *      responses:
 *        '200':
 *          description: A successful response with the updated story.
 *  /stories/{storyId}:
 *    get:
 *      summary: Get a story by ID
 *      description: Retrieve a story by ID.
 *      tags:
 *        - Stories
 *      parameters:
 *        - in: path
 *          name: storyId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user to retrieve.
 *      responses:
 *        '200':
 *          description: A successful response with the user.
 *    delete:
 *      summary: Delete a story by ID
 *      description: Delete a story by ID.
 *      tags:
 *        - Stories
 *      parameters:
 *        - in: path
 *          name: storyId
 *          schema:
 *            type: string
 *          required: true
 *          description: The ID of the user to delete.
 *      responses:
 *        '204':
 *          description: A successful response indicating no content.
 *  /stories/user:
 *    get:
 *      summary: Get all user stories
 *      description: Retrieve a list of all user stories.
 *      tags:
 *        - Stories
 *      responses:
 *        '200':
 *          description: A successful response with a list of subscribed users.
 *          content:
 *            application/json: {}
 *  /stories/generateStory/text:
 *    post:
 *      summary: Generate story from text
 *      description: Generate a story from text.
 *      tags:
 *        - Stories
 *      requestBody:
 *        description: Create story.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:       
 *                story_theme:
 *                 type: string
 *                language:
 *                 type: string
 *                story_details:
 *                 type: string
 *                story_type:
 *                 type: string
 *                story_morals:
 *                 type: string
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