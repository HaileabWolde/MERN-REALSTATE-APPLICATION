import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'
export const Auth = (req, res, next)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(errorHandler(500, "UnAuthorized"))
    }
    const token = authHeader.split(" ")[1]
    
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