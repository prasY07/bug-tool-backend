import mongoose from "mongoose";
import { Schema } from "mongoose";


const BugSchema = new Schema({
    title: {
        type:String,
        required:true,
        minlength:5,
        maxlength:100
        
    },

    desciption: {
        type:String,
        required:true,
        minlength:5,
        maxlength:1000
        
    },
    status:
     { 
        type: String,
         enum: ['Open', 'In Progress', 'Closed','Completed','Re-Open'], default: 'Open'
    },
    project: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: true
     },
    assigned_by: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
         required: true
     },
    assigned_to: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User'
     }

   
    
});
export default mongoose.model("Bug", BugSchema);

 