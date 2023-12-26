import express from "express"
import { protect } from "../middlewares/auth.js";
import { deletePodcastController, generatePodcastController, getPodcastController, getPodcastsController, getUserPodcastsController, updatePodcastTypeController } from "../controllers/PodcastController.js";

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
router.get('/',protect, getPodcastsController);
router.get('/user',protect, getUserPodcastsController );
router.post('/generateStory/podcast',protect,generatePodcastController);
router.put('/:podcastId',protect,updatePodcastTypeController); 
router.get('/:podcastId',protect, getPodcastController );
router.delete('/:podcastId',protect, deletePodcastController);
export default router;

