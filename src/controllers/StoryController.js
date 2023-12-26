import { createNotification } from "../services/NotificationServices.js";
import { CreateStory, deleteAllStoriesService, deleteStoryById, getStories, getStory, updateStoryTypeService } from "../services/StoryServices.js";
import { createStoryFromAudioRequest, createStoryFromImageRequest, createStoryFromTextRequest,createPodcastRequest } from "../utils/aiApiRequests.js";
import {load_local, save_local, apilink1 } from '../utils/localvariablesConsts.js'
import { notifyAllUsers, notifyUserAfterStoryCreation } from "../utils/notificationTriggers.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";
// import { postToInsta } from "../utils/socialPosting/instaPostingUtils.js";
import { postTelegramPost } from "../utils/socialPosting/telegramPostingUtils.js";

export async function generateStoryFromTextController(req,res){
    try {
      const {language,story_theme,story_morals,story_details,story_type }= req.body
      const user = req.user

      successResponse(res,"your story is coocking",{})
      const response = await createStoryFromTextRequest({language,story_theme,story_morals,story_details,load_local,save_local},apilink1+"/story")
     
      if(response.status>=200 && response.status<300){
        const story =await CreateStory(
          {
          storyId : response.data.id , 
          title : response.data.title,
          content : response.data.content,
          image : response.data.image,     
          story_type:story_type,     
          userId : user.id})
          
        if(story.type == 'news'){
           successResponse(res, "story created successfully",story,201);
          const notif = await createNotification({title:story.title,description:"Check it Out",type:story.type})
        await notifyAllUsers(notif)
            // await postToInsta(story.image,story.title)
           const responseTelgram= await postTelegramPost(response.data.title,response.data.image)
           return
        }else{
          const notif = await createNotification({title:story.title,description:"your story has been published",type:story.type})
          await notifyUserAfterStoryCreation(notif,user.fcmToken)
          return 
        }
      }
      const notif = await createNotification({title:"Error",description:"there were some issue while generating your story",type:story.type})
      await notifyUserAfterStoryCreation(notif,user.fcmToken)
      return 
    } catch (err) {
      const notif = await createNotification({title:"Error",description:"there were some issue while generating your story "+response.message,type:story.type})
      await notifyUserAfterStoryCreation(notif,user.fcmToken)
      return
    }
   
}

export async function generateStoryFromImageController(req,res){
  try {
    const {image_url,language,story_details,story_type }= req.body
    const user = req.user
    successResponse(res,"your story is coocking",{})
    const response = await createStoryFromImageRequest({image_url,language,story_details,load_local,save_local},apilink1+"/story")
   
    if(response.status>=200 && response.status<300){
      const story =await CreateStory(
        {
        storyId : response.data.id , 
        title : response.data.title,
        story_type:story_type, 
        content : response.data.content,
        image : image_url,          
        userId : user.id})
        
      if(story.type == 'news'){
        const notif = await createNotification({title:story.title,description:"Check it Out",type:story.type})
      await notifyAllUsers(notif)
          // await postToInsta(story.image,story.title)
         const responseTelgram= await postTelegramPost(response.data.title,story.type)
         return
      }else{
        const notif = await createNotification({title:story.title,description:"your story has been published",type:story.type})
          await notifyUserAfterStoryCreation(notif,user.fcmToken)
          return 
      }
    }
    const notif = await createNotification({title:"Error",description:"there were some issue while generating your story",type:story.type})
    await notifyUserAfterStoryCreation(notif,user.fcmToken)
    return 
  } catch (err) {
    const notif = await createNotification({title:"Error",description:"there were some issue while generating your story "+response.message,type:story.type})
    await notifyUserAfterStoryCreation(notif,user.fcmToken)
    return
  }
 
}

export async function generateStoryFromAudioController(req,res){
  try {
    const {audio}= req.body
    const user = req.user
    const response = await createStoryFromAudioRequest({audio},apilink1+"/story")
   
    if(response.status>=200 && response.status<300){
      const oldStory = await getStory(response.data.id)
      if (oldStory) return errorResponse(res,"story with that id already exists")
      const story =await CreateStory(
        {
        storyId : response.data.id , 
        title : response.data.title,
        content : response.data.content,
        image : response.data.image,          
        userId : user.id})
        
      if(story.type == 'news'){
         successResponse(res, "story created successfully",story,201);
        const notif = await createNotification({title:story.title,description:"Check it Out",type:story.type})
      await notifyAllUsers(notif)
          // await postToInsta(story.image,story.title)
         const responseTelgram= await postTelegramPost(response.data.title,response.data.image)
         return
      }else if (story.type == 'news'){
        const notif = await createNotification({title:story.title,description:story.description,type:story.type})
        await notifyAllUsers(notif)
        return successResponse(res, "story created successfully",story,201);
      }else{
        return successResponse(res, "story created successfully",story,201);
      }
    }
    return errorResponse(res,response.message, response.status);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
 
}

export async function getStoryController(req,res){
  try {
    const {storyId} = req.params
    const story = await getStory(storyId)
    if(!story) return errorResponse(res, "no story was found", 404); 
  
    return successResponse(res, "story fetched successful",story,200);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}
export async function getStoriesController(req,res){
  try {
    const stories = await getStories()
    return successResponse(res, "stories fetched successful",stories ,200);
    
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}
export async function deleteStoryController(req,res){
  try {
    const {storyId} = req.params
    const story = await getStory(storyId)
    if(!story) return errorResponse(res, "no story was found", 404); 
    const deletedStory = await deleteStoryById(storyId)
    if (deletedStory)  return successResponse(res, "story deleted successfully",null,204);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}
export async function  getUserStoriesController(req,res){
  try {
    const user = req.user
    const stories = await getUserStories(user.userId)
    return successResponse(res, "stories fetched successfully",stories,200);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}

export async function deleteAllStoriesController(req,res){
  try {
    const stories = await deleteAllStoriesService()
    return successResponse(res, "all data was deleted ",stories,204);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}

export async function updateStoryTypeController(req,res){
  try{
    const {storyId} = req.params
    const story = await getStory(storyId)
    if(!story) return errorResponse(res, "no story was found", 404); 
    const updatedstory = await updateStoryTypeService(storyId,story.type)
    return successResponse(res, "story tyoe updated successfully",updatedstory,200);
  }catch(err){
      console.log(err)
    return errorResponse(res,"something went wrong "+err.message, 500);
    
  }
}

