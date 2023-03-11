const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')

const User = mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')   //go two directories up by two periods ..

const requireLogin = require('../middleware/requireLogin')
const nodemailer= require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
//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


//we will use transporter to send emails
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))



//grant protected resource permission after verifyig the token
router.get('/protected', requireLogin, (req,res)=>{
    res.send("hello user")
})
//signup route (post), send name, email, pass and get it in req.body

router.post('/signup', (req, res)=>{
 //   console.log(req.body)

 const {name,email,password, pic} = req.body

 if(!email || !password || !name){
    //res.status(422) indicates that server has accepted request but can't process it
    //use return bcz we dont want to proceed further if 422 error is encountered
    
    return res.status(422).json({error:"Please add all the fields"})
 }
 User.findOne({email:email})
 .then((savedUser)=>{

    if(savedUser)
    {
    return res.status(422).json({error:"User already exists with that email"})
    }
    //else
    //store password in hash form (password, salt)
    bcrypt.hash(password, 12 )
    .then(hashedpassword=>{
        const user = new User({
            email,      //email instead of email:email because lhs=rhs
            password:hashedpassword,
            name,
            pic
        })
    
        //save user in db
        user.save()
        .then(user=>{

            //giving error
            // transporter.sendMail({
            //     to:user.email,
            //     from:"no.reply.bsafe@gmail.com",
            //     subject:"signup success",
            //     html:"<h1>Welcome to BSafe</h1>"
            // })
            res.json({message:"Saved Sucessfully"})
        })
        //if error occurs
        .catch(err =>{
            console.log(err)
        })

    })
    //else if password not hashed
    .catch(err =>{
        console.log(err)
    })
   
 })
 .catch(err=>{
    console.log(err)
 })



})

//signin route(post) with email and pass
router.post('/signin', (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
    return res.status(422).json({error: "Please add all the fields"})
    }
    //else: find user by email
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){ //user not found
           return res.status(422).json({error:"Invalid Email or Password"})
        }
        //else : user found
        //compare password hash in db
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{        //if passwords do match
            if(doMatch){
                //res.json({message:"Successfully Signed in"})
                //if passwords match, assign token to user to access protected privileges
                //token will be generated on the basis of user id
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)        //sign method to generate token
                //destructuring
               const {_id, name, email, followers, following, pic} = savedUser
                 res.json({token, user:{_id, name, email, followers, following, pic}})
            }
            else{
                return res.status(422).json({error:"invalid Email or Password"})
            }
        })
        .catch(err=>{       //if some other error occurs
            console.log(err)
        })
    })

})

router.post('/reset-password',(req, res)=>{

    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
       // convert hex buffer to string
        const token = buffer.toString("hex")

        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User does'nt exist with that email"})
            }

            //this token (for password reset) will only be valid for 1 hour from current time (now) , 3600000 millisec = 1hr
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no.reply.bsafe@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>Click on this <a href="http://localhost:5000/reset/${token}" >link</a> to reset password</h5>
                    `
                })
                res.json({message:"Check your email"})
            })
        })
    })
})

module.exports = router

//register this file in app.js