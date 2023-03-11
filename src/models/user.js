//user database

const mongoose = require('mongoose')

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
    }
})

//User is the name of my userschema
mongoose.model("User", userSchema)

//register this model in app.js
 