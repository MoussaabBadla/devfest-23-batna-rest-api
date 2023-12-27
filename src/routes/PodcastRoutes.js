import express from "express"
import { protect } from "../middlewares/auth.js";
import { createPodcastController, deletePodcastController, generatePodcastController, getPodcastController, getPodcastsController, getUserPodcastsController, updatePodcastTypeController } from "../controllers/PodcastController.js";

/**
 * @swagger
 * tags:
 *  - name: Podcasts
 *    description: Operations related to podcasts
 * paths:
 *  /podcasts/:
 *    get:
 *      summary: Get all podcasts
 *      tags:
 *        - Podcasts
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Successful operation
 *    post:
 *      summary: Create podcast
 *      tags:
 *        - Podcasts
 *      security:
 *        - Bearer: []
 *      requestBody:
 *        description: create podcast.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:        
 *                id:
 *                 type: string
 *                title:
 *                 type: string
 *                voice:
 *                 type: string
 *                image:
 *                 type: string
 *      responses:
 *        '200':
 *          description: Successful operation
 *  /podcasts/user:
 *    get:
 *      summary: Get user podcasts
 *      tags:
 *        - Podcasts
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Successful operation
 *  /podcasts/generatePodcast:
 *    post:
 *      summary: Generate podcast
 *      tags:
 *        - Podcasts
 *      security:
 *        - Bearer: []
 *      requestBody:
 *        description: Generate podcast.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:        
 *                id:
 *                 type: string
 *                title:
 *                 type: string
 *                podcast_type:
 *                 type: string
 *                voice:
 *                 type: string
 *                image:
 *                 type: string
 *      responses:
 *        '200':
 *          description: Successful operation
 *  /podcasts/{podcastId}:
 *    get:
 *      summary: Get a single podcast
 *      tags:
 *        - Podcasts
 *      parameters:
 *        - name: podcastId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Successful operation
 *    put:
 *      summary: Update podcast type
 *      tags:
 *        - Podcasts
 *      parameters:
 *        - name: podcastId
 *          in: path
 *          required: true
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Successful operation
 *    delete:
 *      summary: Delete a single podcast
 *      tags:
 *        - Podcasts
 *      parameters:
 *        - name: podcastId
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      security:
 *        - Bearer: []
 *      responses:
 *        '200':
 *          description: Successful operation
 * components:
 *  securitySchemes:
 *    Bearer:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */



const router = express.Router();
router.get('/',protect, getPodcastsController);
router.get('/user',protect, getUserPodcastsController );
router.post('/generatePodcast',protect,generatePodcastController);
router.post('/',protect,createPodcastController);

router.put('/:podcastId',protect,updatePodcastTypeController); 
router.get('/:podcastId',protect, getPodcastController );
router.delete('/:podcastId',protect, deletePodcastController);
export default router;

