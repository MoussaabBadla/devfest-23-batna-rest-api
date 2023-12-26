import env from "dotenv";
env.config()

const load_local = process.env.load_local
const save_local = process.env.save_local
const apilink1 = process.env.api_url_1

export {load_local, save_local, apilink1}