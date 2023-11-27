import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'
export const Auth = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(errorHandler(500, "Please Sign in"))
    }
    
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)

    if(!payload){
        return next(errorHandler(500, "token is Invalid"))
    }

    req.userId = payload?.UserId
    next()
    }
   catch(error){
    next(error)
   }
    
}