import mongoose from "mongoose";

const Contactschema= new mongoose.Schema({
 name:{
  type: String,
  require: true
 },
 email :{
  type: String,
  require:  true,
  unique:true
 },
 phone:{
   type: String,
   require: true,
   unique:true
 },
 address:{
  type: String,
},

postedBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
}

})

const ContactModel=  mongoose.model('contact', Contactschema)

export {ContactModel}