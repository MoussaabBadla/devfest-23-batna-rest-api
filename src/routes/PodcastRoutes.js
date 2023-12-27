import express from "express"
import { protect } from "../middlewares/auth.js";
import { createPodcastController, deletePodcastController, generatePodcastController, getPodcastController, getPodcastsController, getUserPodcastsController, updatePodcastTypeController } from "../controllers/PodcastController.js";

const router = express.Router();
router.get('/',protect, getPodcastsController);
router.get('/user',protect, getUserPodcastsController );
router.post('/generatePodcast',protect,generatePodcastController);
router.post('/',protect,createPodcastController);

router.put('/:podcastId',protect,updatePodcastTypeController); 
router.get('/:podcastId',protect, getPodcastController );
router.delete('/:podcastId',protect, deletePodcastController);
export default router;

