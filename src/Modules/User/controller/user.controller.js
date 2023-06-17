import userModel from "../../../../DB/model/User.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const profile=async (req, res)=>{
    const {id} = req;
    const user = await userModel.findById(id)
    return res.json({message:"user profile", user})
}



export const profilePic = async(req, res)=>{
    if(!req.file){
        return res.status(400).json({message:'file is required!'}) 
    }
    const {secure_url} =await cloudinary.uploader.upload(req.file.path, {folder:'saraha/user'});
    const user = await userModel.updateOne({_id:req.id},{profilePic:secure_url})
    return res.status(200).json({message:"profile updated sucessfully",user})
}

