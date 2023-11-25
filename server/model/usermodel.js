import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require : true,
        unique: true
    }
    ,
    password: {
        type: String,
        require: true
    },
    avator: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXi6kWCo1P3qJAuOnEAs6jWS1Dg1BqRkk8Q&usqp=CAU"
    }
}, {timestamps: true})
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.methods.createJWT = function(){
    return jwt.sign({
        UserId: this._id, Email: this.email
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
}
userSchema.methods.isPasswordmatched = async function(password){
    return await bcrypt.compare(password, this.password)
}
const UserSchema = mongoose.model('User', userSchema)

export default UserSchema