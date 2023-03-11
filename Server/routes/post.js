const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


//user can view all posts in home page
router.get('/allpost',requireLogin, (req, res)=>{
    Post.find()     //find all posts
    .populate("postedBy", "_id name")   //display user name and id information along with his post information
    .populate("comments.postedBy", "_id name")//username and id of user who posted comment
    .sort('-createdAt')//we want posts to add in descending order, latest to oldest
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


//view my following's posts
router.get('/getsubpost',requireLogin, (req, res)=>{

    //if postedBy in following, only then get all posts of his
    Post.find({postedBy:{$in:req.user.following}})     //find all posts
    .populate("postedBy", "_id name")   //display user name and id information along with his post information
    .populate("comments.postedBy", "_id name")//username and id of user who posted comment
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
//protected route
router.post('/createpost',requireLogin, (req, res)=>{
    const {title, body, pic} = req.body

    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all the fileds"})
    }

// console.log(req.user)   //req.user has userdata
//    res.send("ok")

    req.user.password = undefined   //we don't want password to show with post info
    const post = new Post({
        title,
         body,
         photo:pic,
         postedBy: req.user
    })

    post.save().then(result=>{
        res.json({post: result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//route to show all the posts created by specific user
//req.user can only be accessed if we make this route protected
router.get('/mypost', requireLogin, (req, res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

//two routes, like and dislike
//use put(instead of post) when u need to update state->good practice


//like route
router.put('/like', requireLogin, (req, res)=>
{

    //find post by id and push id of signed in user who liked the post in likes array
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{

        //because now we want mongodb to return new record not old one
        new:true
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


//dislike route
router.put('/unlike', requireLogin, (req, res)=>
{

    //find post by id and pull id of signed in user who disliked the post from likes array
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{

        //because now we want mongodb to return new record not old one
        new:true
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


//comment route
router.put('/comment', requireLogin, (req, res)=>
{

    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    //find post by id and push id of signed in user who liked the post in likes array
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{

        //because now we want mongodb to return new record not old one
        new:true
    })//we'll use populate to find id and name who uploaded comment on this post
    .populate("comments.postedBy", "_id name")//username and id of user who posted comment
    .populate("postedBy","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin, (req,res)=>{
    //find post by id which is req.params.postid which we are receiving from above in request(:postId) 
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        //if err or no post
        if(err || !post){
            return res.status(422).json({error:err})
        }
        //if the use asking of deletion and the poster of post are same, only then post will be deleted
        //post cannot be deleted by anyone who did'nt post it
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})
module.exports = router