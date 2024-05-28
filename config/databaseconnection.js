import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path:"./config/.env"})


const Connection=  async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_CONN)
    console.log('Database connected succesfully');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

Connection()