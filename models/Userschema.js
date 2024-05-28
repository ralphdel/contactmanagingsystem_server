import mongoose from "mongoose";

const Userschema= new mongoose.Schema({
 name:{
  type: String,
  require: true
 },
 email :{
  type: String,
  require:  true,
  unique:true
 },
 password:{
   type: String,
   require: true
 }
})

const UserModel=  mongoose.model('user', Userschema)

export {UserModel}