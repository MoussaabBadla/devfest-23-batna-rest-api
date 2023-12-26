import { createNotification } from "../services/NotificationServices.js";
import { CreateStory, deleteStoryById, getStory } from "../services/StoryServices.js";
import { createStoryFromTextRequest } from "../utils/aiApiRequests.js";
import {load_local, save_local, apilink1 } from '../utils/localvariablesConsts.js'
import { notifyAllUsers } from "../utils/notificationTriggers.js";
import { errorResponse, successResponse } from "../utils/responseSending.js";
import { postToInsta } from "../utils/socialPosting/instaPostingUtils.js";

export async function generateStoryFromTextController(req,res){
    try {
      const {language,story_theme,story_morals,story_details }= req.body
      const user = req.user
      const response = await createStoryFromTextRequest({language,story_theme,story_morals,story_details,load_local,save_local},apilink1+"/story")
       console.log(response.data);
      if(response.status>=200 && response.status<300){
        const story =await CreateStory(
          {
          storyId : response.data.id , 
          title : response.data.title,
          content : response.data.content,
          image : response.data.image,
          
          
          userId : user.id})
        if(story.type == 'news'){
          const notif = await createNotification({title:story.title,description:"Check it Out",type:story.type})
        await notifyAllUsers(notif)
            await postToInsta(story.image,story.description)
            return successResponse(res, "story created successfully",story,201);
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
    return successResponse(res, "stories deleted successfully",stories,200);
  } catch (err) {
    return errorResponse(res,"something went wrong "+err.message, 500);
  }
}