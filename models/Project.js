import mongoose from "mongoose";
import { Schema } from "mongoose";


const projectSchema = new Schema({
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
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],

        default: 'inactive'
    },
    added_by: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    bug_access: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],

    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    bugs: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Bug'
         }
    ]



   
    
});
export default mongoose.model("Project", projectSchema);

 