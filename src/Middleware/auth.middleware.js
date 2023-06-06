import { verifyToken } from "../services/generateAndVerify.js";
import userModel from './../../DB/model/User.model.js';

export const auth = async(req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARER_TOKEN)) res.json({message:"invalid bearer token"})
    const token = authorization.split(process.env.BEARER_TOKEN)[1]
    if(!token) res.json({message:"invalid token"})
    const decoded = verifyToken(token)
    const authUser = await userModel.findById(decoded.id).select("userName email");
    if(!authUser) return res.status(401).json({message:"not registered user"})
    else {
        req.id = decoded.id;
        next()
    }
}