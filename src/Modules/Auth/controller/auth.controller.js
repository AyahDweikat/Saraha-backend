import { generateToken } from "../../../services/generateAndVerify.js";
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
  const match = compareFunction(password, user.password);
  if (!match) {
    res.json({ message: "error in data" });
  }
  const token = generateToken({ id: user._id });
  return res.status(200).json({ message: "user is found", token });
};
