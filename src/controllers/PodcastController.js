import { createNotification } from "../services/NotificationServices.js";
import { CreatePodcast, deletePodcastById, getPodcast, getPodcasts, getUserPodcasts, updatePodcastTypeService } from "../services/PodcastServices.js";
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
      successResponse(res,"your podcast is coocking",{},200)
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
      const notif = await createNotification({title:"Error",description:"there were some issue while generating your story",type:podcast.type})
    await notifyUserAfterStoryCreation(notif,user.fcmToken)
    return 
    } catch (err) {
        const user = req.user
        console.error(err)
        const notif = await createNotification({title:"Error",description:"there were some issue while generating your story "+err.message,type:"public"})
        await notifyUserAfterStoryCreation(notif,user.fcmToken)
        return
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
//   {
//     "id": "a6db7fc8-b273-4b9a-b94a-d68f32ef5f3d",
//     "title": "Promoting Peace: Unveiling the Unseen - An Algerian Perspective from 1954",
//     "image": "https://res.cloudinary.com/dspruj3un/image/upload/q_10/v1703633027/73ac2f00-c17b-457f-9f4b-d430075d4bb9.png",
//     "voice": "https://res.cloudinary.com/dqvkoqlqh/video/upload/fl_splice,l_video:3afd35e6-b151-495c-b8a9-b6033a4505c6/fl_layer_apply/fl_splice,l_video:ce7603c9-7674-4b41-ab4c-6cad09b8e9f2/fl_layer_apply/fl_splice,l_video:6203ee95-a4e6-4e89-baf8-55f61938ca5a/fl_layer_apply/f7e08b6c-8b18-49dd-85b7-dfec7c006a96.mp3"
//   }
  export async function createPodcastController(req,res){
    try {
        const {id,
            title,
            image,
            voice,podcast_type }= req.body
        
        const user = req.user
        const podcast =await CreatePodcast(
            {
            podcastId : id , 
            title : title,
            image : image,    
            audio: voice,
            podcast_type:podcast_type,     
            userId : user.id})
        return successResponse(res,"your podcast is created",podcast)
       
      } catch (err) {
        return errorResponse(res,"something went wrong "+err.message, 500);
      }
  }