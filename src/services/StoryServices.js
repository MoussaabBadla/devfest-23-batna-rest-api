import Story from "../models/Story.js";

  export const CreateStory = async (storyData)=>{
    try {
      const story = new Story(storyData)
      await story.save()
      return story;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getStories = async ()=>{
    try {
      const stories = await Story.find();
      return stories;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getStory= async (storyId)=>{
    try {
      const story = await Story.find({storyId:storyId})
      return story;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  export const deleteStoryById=async(storyId) =>{
    try {
      const result = await Story.deleteOne({ storyId: storyId });
      return result
    } catch (error) {
      console.error(error);
    }
  }

  export const getUserStories = async (userId)=>{
    try {
      const stories = await Story.find({userId:userId});
      return stories;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const deleteAllStoriesService = async ()=>{
    try {
      const stories = await Story.deleteMany();
      return stories;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const updateStoryTypeService = async(storyId,type)=>{
    try {
        if(type === 'news' || type === 'public'){
            const story = await Story.updateOne({storyId: storyId }, { $set:{type:'private'} });
            return story;
        }else{
            const story = await Story.updateOne({storyId: storyId }, { $set:{type:'public'} });
            return story;
        }
        
      } catch (err) {
        console.log(err.message);
        return null;
      }
  }