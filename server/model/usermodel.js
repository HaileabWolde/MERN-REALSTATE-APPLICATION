import mongoose from "mongoose";

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
    }
})

const UserSchema = mongoose.model('User', userSchema)

export default UserSchema