import UserSchema from '../model/usermodel.js'
import { errorHandler } from '../util/error.js'

export const signup = async (req, res, next)=>{
const {Username, email, password} = req.body

try{
    const User = await UserSchema.findOne({email})
    if(User){
        next(errorHandler(500, 'User Already Exits'))
    }
    const result = await UserSchema.create({
        Username,
        email,
        password
    })
    const token = result.createJWT()

    res.status(200).json({UserTwo, token})
}
catch(error){
next(error)
}
}

export const signin = async (req, res, next)=>{
    const {email, password} = req.body

    try{
        const user = await UserSchema.findOne({email})
        if(!user){
            next(errorHandler(500, `User Doesn't Exist`))
        }
        const checkpassword = await user.isPasswordmatched(password)
        if(!checkpassword){
            next(errorHandler(500, 'Wrong Credentials'))
        }
        const token = user.createJWT()

        res.json({user, token})
    }
    catch(error){
        next(error)
    }
}
