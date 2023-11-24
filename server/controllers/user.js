import UserSchema from '../model/usermodel.js'
import { errorHandler } from '../util/error.js'

export const signup = async (req, res, next)=>{
const {Username, email, password} = req.body

try{
    const User = await UserSchema.findOne({email})
    if(User){
       return next(errorHandler(500, 'User Already Exits'))
    }
    const result = await UserSchema.create({
        Username,
        email,
        password
    })
    const token = result.createJWT()

    return res.status(200).json({result, token})
}
catch(error){
 return next(error)
}
}

export const signin = async (req, res, next)=>{
    const {email, password} = req.body

    try{
        const user = await UserSchema.findOne({email})
        if(!user){
            return next(errorHandler(500, `User Doesn't Exist`))
        }
        const checkpassword = await user.isPasswordmatched(password)
        if(!checkpassword){
            return next(errorHandler(500, 'Wrong Credentials'))
        }
        const token = user.createJWT()
        const {password: pass , ...rest} = user._doc
       return  res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    }
    catch(error){
        return next(error)
    }
}
