import userModel from "../../../../DB/model/User.model.js";
import MessageModel from '../../../../DB/model/Message.model.js';

export const getMessages = async(req, res)=>{
    const messageList = await MessageModel.find({receiverId:req.id})
    return res.status(404).json({message:"messages getting successfully", messageList})
}
export const deleteMessage = async(req, res)=>{
    const receiverId = req.id;
    const {messageId} = req.body;
    const deleteMessages = await MessageModel.deleteOne({receiverId, _id:messageId})
    if(!deleteMessages.deletedCount){
    return res.status(201).json({message:"invalid user id or message id"})

    }
    return res.status(404).json({message:"messages deleted successfully", deleteMessages})
}




export const sendMessage = async(req, res)=>{
    const {receiverId} = req.params;
    const {message} = req.body;
    const user = await userModel.findById(receiverId)
    if(!user){
        return res.status(404).json({message:"invalid account id"})
    }
    if(!message){
        return res.status(404).json({message:"message is not found"})
    }
    const createMessage = await MessageModel.create({receiverId,message})
    res.status(201).json({message:"success sending message", createMessage})
}