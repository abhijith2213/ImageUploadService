const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"fullName is required"]
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[8,"Password must contain atleast 8 letters"],
        max:[15,'password cannot exceed 15 letters'],
    },
    images:{
        type:Array,
        default:[]
    },
    refreshToken:{ 
        type:String
    },
},{timestamps:true})

const User = mongoose.model('users',userSchema);
module.exports = User;