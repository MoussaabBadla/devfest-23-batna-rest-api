import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const StorySchema = new mongoose.Schema({
    storyId: {
        type: String,
        default: uuidv4, 
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String, //news private public 
        required : true,
    },
    content: {
        type: String,
        required: true,
    },
    image:{
        type: String, 
        required : true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Story = mongoose.model("Story", StorySchema);

export default Story;