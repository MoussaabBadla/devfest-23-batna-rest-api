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
      const story = await Story.findById(storyId)
      return story;
    } catch (err) {
      console.log(err.message);
      return null;
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