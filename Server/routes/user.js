const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")



//route to request to see profile of other user with given id
router.get('/user/:id',requireLogin, (req, res)=>{

    //query to find user
    User.findOne({_id:req.params.id})
    //because we dont want to send user password to frontend, only his name, email etc
    .select("-password")
    .then(user=>{

        //query to finds posts created by user
        Post.find({postedBy:req.params.id})
        .populate("postedBy", "_id, name")
        .exec((err, posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })

    }).catch(err=>{
        //404 not found
        return res.status(404).json({error:"User not found"})
    })
})


router.put("/follow", requireLogin, (req,res)=>{

    //updating followers
    //followid->whom we are following ->req.body.followId
    User.findByIdAndUpdate(req.body.followId, {
        //current id of logged in user = req.user._id

        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }

        //else case-> update following
        //id->who is following -> req.user._id
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).select("-password")
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    )
})


router.put("/unfollow", requireLogin, (req,res)=>{

    //updating followers
    //followid->whom we are following ->req.body.followId
    User.findByIdAndUpdate(req.body.unfollowId, {
        //current id of logged in user = req.user._id

        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }

        //else case-> update following
        //id->who is following -> req.user._id
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    )
})


module.exports = router