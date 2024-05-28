import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import './config/databaseconnection.js'
import { Router } from './routes/routes.js'

const app =express()
app.use(express.json())
app.use(cors())
dotenv.config({path:"./config/.env"})

app.use('/contactms', Router)




app.listen(process.env.PORT, ()=>{
  console.log('server is running')
})