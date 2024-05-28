import express from "express";
import { UserModel } from "../MODELS/Userschema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:"../config/.env"})

const Signup = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty() === false) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already have an account" }] });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashPassword });
    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(201).json({
      success: true,
      ...result._doc,
    });
  } catch (err) {
    console.log();
    return res.status(500).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty() === false) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not have an account" }] });
    }
    const isPasswordok = await bcrypt.compare(password, userExist.password);
    if (!isPasswordok) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password incorrect" }] });
    }
    const token =jwt.sign({
      _id:userExist._id},
       process.env.JWT_SECRET_KEY,
       {expiresIn:'4d'}
    )
    
   const user ={...userExist._doc, password:undefined}
    return res.status(201).json({
      success: true,
      user, token
    });
  } catch (err) {
    console.log();
    return res.status(500).json({ error: err.message });
  }
};

const Auth=(req,res)=>{
return  res.status(200).json({success:true, user:{ ...req.user._doc }})
}



export { Signup, Login, Auth };
