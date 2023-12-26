import { createNotification } from "../services/NotificationServices.js";
import { CreatePodcast, deletePodcastById, getPodcast, getPodcasts, getUserPodcast, updatePodcastTypeService } from "../services/PodcastServices.js";
import {createPodcastRequest } from "../utils/aiApiRequests.js";
import {load_local, save_local, apilink1 } from '../utils/localvariablesConsts.js'
import { notifyAllUsers, notifyUserAfterStoryCreation } from "../utils/notificationTriggers.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";
// import { postToInsta } from "../utils/socialPosting/instaPostingUtils.js";
import { postTelegramAudio } from "../utils/socialPosting/telegramPostingUtils.js";

export async function generatePodcastController(req,res){
    try {
      const {n_people,
        duration,
        field,
        topic,podcast_type }= req.body
      
      const user = req.user
      successResponse(res,"your podcast is coocking",{})
      const response = await createPodcastRequest({n_people,
        duration,
        field,
        topic,load_local,save_local},apilink1+"/podcast")
     
      if(response.status>=200 && response.status<300){
        const podcast =await CreatePodcast(
          {
          podcastId : response.data.id , 
          title : response.data.title,
          image : response.data.image,    
          audio: response.data.voice,
          podcast_type:podcast_type,     
          userId : user.id})
          
        if( podcast.type == 'news'){
          const notif = await createNotification({title: podcast.title,description:"Check out this new podcast",type: podcast.type})
        await notifyAllUsers(notif)
            // await postToInsta(story.image,story.title)
           const responseTelgram= await postTelegramAudio(response.data.voice,response.data.title)
           return
        }else{
          const notif = await createNotification({title: podcast.title,description:"your podcast has been published",type: podcast.type})
          await notifyUserAfterStoryCreation(notif,user.fcmToken)
          return 
        }
      }
      return errorResponse(res,response.message, response.status);
    } catch (err) {
      return errorResponse(res,"something went wrong "+err.message, 500);
    }
  }


  export async function getPodcastController(req,res){
    try {
      const {podcastId} = req.params
      const podcast = await getPodcast(podcastId)
      if(!podcast) return errorResponse(res, "no podcast was found", 404); 
    
      return successResponse(res, "podcast fetched successful",podcast,200);
    } catch (err) {
      return errorResponse(res,"something went wrong "+err.message, 500);
    }
  }
  export async function getPodcastsController(req,res){
    try {
      const Podcasts = await getPodcasts()
      return successResponse(res, "Podcasts fetched successful",Podcasts ,200);
      
    } catch (err) {
      return errorResponse(res,"something went wrong "+err.message, 500);
    }
  }
  export async function deletePodcastController(req,res){
    try {
      const {podcastId} = req.params
      const Podcast = await getPodcast(podcastId)
      if(!Podcast) return errorResponse(res, "no Podcast was found", 404); 
      const deletedPodcast = await deletePodcastById(podcastId)
      if (deletedPodcast)  return successResponse(res, "Podcast deleted successfully",null,204);
    } catch (err) {
      return errorResponse(res,"something went wrong "+err.message, 500);
    }
  }
  export async function  getUserPodcastsController(req,res){
    try {
      const user = req.user
      const Podcasts = await getUserPodcasts(user.userId)
      return successResponse(res, "Podcasts fetched successfully",Podcasts,200);
    } catch (err) {
      return errorResponse(res,"something went wrong "+err.message, 500);
    }
  }
  
  export async function updatePodcastTypeController(req,res){
    try{
      const {podcastId} = req.params
      const podcast = await getPodcast(podcastId)
      if(!podcast) return errorResponse(res, "no podcast was found", 404); 
      const updatedPodcast = await updatePodcastTypeService(podcastId,podcast.type)
      return successResponse(res, "Podcast tyoe updated successfully",updatedPodcast,200);
    }catch(err){
        console.log(err)
      return errorResponse(res,"something went wrong "+err.message, 500);
      
    }
  }
