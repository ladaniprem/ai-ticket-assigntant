import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     email: {
        type: String,
        required: true,
        unique:true,
     },
     Password: {
        type: String,
        required: true,
     },
     role:{
        type: String,
        default: "user",
        enum:["user","admin"]
     },
     
     skills:{
         type: [String],
     },
     createdAt: {
        type : Date,
        default: Data.now,
     },
});

export default mongoose.model("User", userSchema);