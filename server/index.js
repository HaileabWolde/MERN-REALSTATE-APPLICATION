import express from 'express'
import { config } from 'dotenv'
import connectDB from './config/dbConnect.mjs'
import userRoute from './routes/userRoute.js'
config()

const app = express()
const PORT = process.env.PORT || 6000

app.use(express.json())
app.use('/users', userRoute)

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