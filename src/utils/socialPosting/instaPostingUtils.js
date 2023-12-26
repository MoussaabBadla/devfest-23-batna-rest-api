import { config } from "dotenv";
import { IgApiClient } from "instagram-private-api";
import Jimp from 'jimp';
import pkg from "request-promise";
const { get } = pkg;
config();

const username = process.env.insta_username;
const password = process.env.insta_password;

export const postToInsta = async (img, caption) => {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    console.log("starte insta");
    const loginResponse = await ig.account.login(username, password);

    const imageBuffer = await get({
        url: img,
        encoding: null, 
    });

    const instaResponse = await ig.publish.photo({
      file:imageBuffer,
      caption: caption,
    });
    console.log(instaResponse);
    return null;
  } catch (error) {
    console.error("Error:", error);
  }
};
