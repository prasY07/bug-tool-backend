import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },

    
    
    tokens: [
        {
            type: String
        }
    ]
});
export default mongoose.model("Admin", adminSchema);

 