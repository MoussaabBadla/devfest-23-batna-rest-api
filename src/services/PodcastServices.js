import Podcast from "../models/Podcast.js";

  export const CreatePodcast = async (PodcastData)=>{
    try {
      const Podcast = new Podcast(PodcastData)
      await Podcast.save()
      return Podcast;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getPodcasts = async ()=>{
    try {
      const Podcasts = await Podcast.find();
      return Podcasts;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const getPodcast= async (PodcastId)=>{
    try {
      const Podcast = await Podcast.find({podcastId:PodcastId})
      return Podcast;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  export const deletePodcastById=async(PodcastId) =>{
    try {
      const result = await Podcast.deleteOne({ podcastId: PodcastId });
      return result
    } catch (error) {
      console.error(error);
    }
  }

  export const getUserPodcasts = async (userId)=>{
    try {
      const Podcast = await Podcast.find({userId:userId});
      return Podcast;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const deleteAllPodcastService = async ()=>{
    try {
      const Podcast = await Podcast.deleteMany();
      return Podcast;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  export const updatePodcastTypeService = async(podcastId,type)=>{
    try {
        if(type === 'news' || type === 'public'){
            const podcast = await Podcast.updateOne({podcastId: podcastId }, { $set:{type:'private'} });
            return podcast;
        }else{
            const podcast = await Podcast.updateOne({podcastId: podcastId }, { $set:{type:'public'} });
            return podcast;
        }
        
      } catch (err) {
        console.log(err.message);
        return null;
      }
  }