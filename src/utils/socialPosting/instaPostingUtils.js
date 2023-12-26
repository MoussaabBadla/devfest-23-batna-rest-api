import dotenv from 'dotenv'

dotenv.config()

const username = process.env.insta_username
const password = process.env.insta_password 

import { IgApiClient }  from 'instagram-private-api';
import pkg from 'request-promise';
const { get } = pkg;

export const postToInsta = async (img , caption) => {
    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
    const imageBuffer = await get({
        url: img,
        encoding: null, 
    });
    await ig.publish.photo({
        file: imageBuffer,
        caption: caption, 
    });
}
