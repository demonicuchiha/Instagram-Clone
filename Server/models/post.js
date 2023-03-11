const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    //likes is an array
    //type is id of user who liked the post and this will refer to user model
    likes:[
        {type:ObjectId,
        ref:"User"}
    ],
    comments:[
        {
            text:String,
            postedBy:
            {
                type:ObjectId,
                ref:"User"
            }
        }
    ],
    postedBy:{
        //creating relation between post and User schemas
        type:ObjectId,      //objid = user's id 
        ref:"User"          //name of User schema

    }
}, {timestamps:true})

mongoose.model("Post", postSchema)