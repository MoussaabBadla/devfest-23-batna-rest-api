import axios from 'axios';
export async function createStoryFromTextRequest( {language,story_theme,story_morals,story_details,load_local,save_local},url) {
    const  data = {
        generation_params: {
            language: language,
            story_morals: story_morals,
            story_details: story_details,
            story_theme:story_theme,
            img_type: "realistic"
        },
        load_local: load_local,
        save_local: save_local


    }
    const response= await axios.post(url,data).catch((err)=>{console.log(err);return err.response})
    return response
} 


export async function createStoryFromImageRequest( {image_url,language,story_details,load_local,save_local},url) {
    const  data = {
        generation_params: {
            image_url:image_url,
            language: language,
            story_details: story_details,
            img_type: "realistic"
        },
        imgUrl:imgUrl,
        load_local: load_local,
        save_local: save_local
    }
    const response= await axios.post(url,data).catch((err)=>{console.log(err);return err.response})
    return response
} 
export async function createPodcastRequest({n_people,
    duration,
    field,
    topic,load_local,save_local},url){
   const data= {
        generation_params: {
          n_people:n_people,
          duration:duration,
          field:field,
          topic:topic
        },
        load_local: load_local,
        save_local: save_local
      }

      const response = await axios.post(url,data).catch((err)=>{console.log(err);return err.response})
      return response
}

export async function createStoryFromAudioRequest( {audio},url) {
    const  data = {
        // generation_params: {
        //     language: language,
        //     story_morals: story_morals,
        //     story_details: story_details,
        //     story_theme:story_theme,
        //     img_type: "realistic"
        // },
        audio:audio,
        load_local: load_local,
        save_local: save_local


    }
    const response= await axios.post(url,data).catch((err)=>{console.log(err);return err.response})
    return response
} 
