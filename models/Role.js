import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }

});
export default mongoose.model("Role", roleSchema);

 