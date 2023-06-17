import { generateToken, verifyToken } from "../../../services/generateAndVerify.js";
import { sendEmail } from "../../../services/sendEmail.js";
import { loginSchema, signupSchema } from "../auth.validation.js";
import userModel from "./../../../../DB/model/User.model.js";
import {
  compareFunction,
  hashFunction,
} from "./../../../services/hashAndCompare.js";

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "user is already exist", user });
  }
  const hashPassword = hashFunction(password);
  const token = generateToken({email}, process.env.EMAIL_TOKEN)
  const link = `http://localhost:3000/auth/confirmEmail/${token}`
  await sendEmail(email,'confirm Email', `<a href='${link}' target="_blank">confirm email</a>`)

  const createUser = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  return res
    .status(201)
    .json({ message: "user created", user: createUser._id });
};
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "email is not exist" });
  }
  if(!user.confirmEmail){
    return res.json({message:"email is not confirmed, please verify your email"})
  }
  const match = compareFunction(password, user.password);
  if (!match) {
    res.json({ message: "error in data" });
  }
  const token = generateToken({ id: user._id });
  return res.status(200).json({ message: "user is found", token });
};


export const confirmEmail = async(req, res)=>{
  const {token} = req.params;
  const decoded = verifyToken(token, process.env.EMAIL_TOKEN)
  if(!decoded){
    return res.json({message:"invalid token"})
  }
  const {email} = decoded;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "email is not exist" });
  }
  // if(!user.confirmEmail){
    const updatedUser = await userModel.updateOne({email},{confirmEmail:true})
    // res.redirect("any url i want page to go to it")
    res.json("your email is confirmed, you can login")
  // }
  
}