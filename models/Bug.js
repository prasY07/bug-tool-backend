import mongoose from "mongoose";
import { Schema } from "mongoose";


const BugSchema = new Schema({
    name: {
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
         enum: ['Open', 'In Progress', 'Closed'], default: 'Open'
    },
    project: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
         required: true
     },
    added_by: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
         required: true
     },
    assigned_by: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User'
     }

   
    
});
export default mongoose.model("Bug", BugSchema);

 