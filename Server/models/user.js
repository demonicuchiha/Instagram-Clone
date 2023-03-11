//user database

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    //object needed here

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dgif9lsii/image/upload/v1673160891/noprofile_uyyznn.png"
    },
    followers:[
        {type:ObjectId,
        ref:"User"}
    ],
    following:[
        {type:ObjectId,
        ref:"User"}
    ]
})

//User is the name of my userschema
mongoose.model("User", userSchema)

//register this odel in app.js
 