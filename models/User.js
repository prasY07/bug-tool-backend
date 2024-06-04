import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const userSchema = new Schema({
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
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    tokens: [
        {
            type: String
        }
    ],
    roles: [
        {
            type: String
        }
    ]


});
export default mongoose.model("User", userSchema);

 