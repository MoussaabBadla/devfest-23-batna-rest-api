import axios from 'axios';
export async function createStoryFromTextRequest( {language,story_theme,story_morals,story_details,load_local,save_local},url) {
    const response= await axios.post(url,
        {
            language,story_theme,story_morals,story_details,img_type: "realistic",load_local,save_local
        }
    )
    return response
} 