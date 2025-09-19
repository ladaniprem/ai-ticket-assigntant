import { type } from "express/lib/response";
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      decription: {
        type : String,
        required: true,
      },
      status: {
        type: String,
        default: "TODO",
        enum: ["TODO", "IN-PROGRESS", "DONE"],
      },
      createdBy: {
         type : mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      priority:{
         type: String,
         deadline: Date,
         helpfulNotes: String,
         relatedSkills: [String],
         createdAt : {
            type: Date,
            default: Date.now,
         }
      }
});

export default mongoose.model("Ticket", ticketSchema);