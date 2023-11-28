import UserSchema from '../model/usermodel.js'
import { errorHandler } from '../middlewares/error.js'
import bcrypt from 'bcryptjs'
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
    const {password:pass , ...rest} = result._doc

    return res.status(200).json({rest, token})
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
        return res.status(200).json({rest, token});

    }
    catch(error){
        return next(error)
    }
}
export const google = async (req, res, next)=>{
    const {name, email, photo} = req.body
    try{
            const user = await UserSchema.findOne({email})
            if(user){
                const token = user.createJWT()
                const {password: pass, ...rest} = user._doc
              
                return res.cookie('access_token', token, {httpOnly: true})
                .status(200).json(rest)
            }
            else{
                const username = name.split(" ").join("")
                const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
                const User = await UserSchema.create({
                    Username: username,
                    email,
                    password,
                    avator: photo
                })
                const token = User.createJWT()
                const {password: pass, ...rest} = User._doc
                res.status(200).json({rest, token})
            }

    }
    catch(error){
        next(error)
    }
}
export const updateuser = async (req, res, next)=>{
    const {Username:user, email:Email, password:pass, avatar} = req.body
    const {id} = req.params
    let hashedPassword; 
    try{
        if(req.userId !== id){
            return next(errorHandler(500, "Please Only update your own account"))
        }
       if(!Email || !user){
        return next(errorHandler(500, "Please Provide the necessary credentials"))
       }
       
        if(pass){
             hashedPassword = await bcrypt.hash(pass, 10)
        }
        const updatedUser = await UserSchema.findByIdAndUpdate( id, {
           $set:{
                Username: user,
                email: Email,
                password: hashedPassword,
                avator: avatar
            }
        }, {new: true})
        const {password:key, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    }
    catch(error){
        next(error)
    }
}