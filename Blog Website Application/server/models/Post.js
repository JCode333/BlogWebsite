import mongoose from "mongoose"

//creating a schema
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

// Exporting the Post model as the default export
export default model("Post", PostSchema);