import mongoose from "mongoose"

//creating a schema
const { Schema, model } = mongoose;
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    
    });

// Exporting the User model as the default export
export default model("User", UserSchema);