import express from 'express'
import { config } from 'dotenv'
import connectDB from './config/dbConnect.mjs'
import userRoute from './routes/userRoute.js'
config()

const app = express()
const PORT = process.env.PORT || 6000

app.use(express.json())
app.use('/users', userRoute)
app.use((err, req, res, next)=>{
   const statusCode = err.statusCode || 500;
   const message =  err.message || 'Internal Server Error'
   return res.status(statusCode).json({
    success: false,
    statusCode,
    message
   })
})

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
start()