import mongoose, { Schema, Types, model } from "mongoose";



const messageSchema = new Schema({
    message:{
        type:String,
        required:true,
    },
    receiverId:{
        type:Types.ObjectId,
        required:true,
    },
},
{
    timestamps:true,
})


const MessageModel = mongoose.models.Message || model('Message', messageSchema);
export default MessageModel;