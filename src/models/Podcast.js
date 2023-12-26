import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema({
    podcastId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String, //news private public 
        default : 'news',
    },
   audio: {
        type: String,
        required : true,
    },
    image:{
        type: String, 
        required : true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Podcast = mongoose.model("Podcast", PodcastSchema);

export default Podcast;