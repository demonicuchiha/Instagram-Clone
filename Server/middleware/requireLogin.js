const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports=(req, res, next)=>{

    //getting authorization from header
    const {authorization} = req.headers

    
    if(!authorization){         //if auth header not present
        //401 -> Authorization error
        //authorization = Bearer abcdefghabcdefgh(JWT_SECRET)
        return res.status(401).json({error:"You must be logged in"})
    }
    //else if auth header is prsent, retrieve token from that
   const token = authorization.replace("Bearer ", "")

   //verify that its a same token
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"})
        }
   
        //getting id from payload that contains token and userid
    const {_id} = payload
    //finding user with given id
    User.findById(_id).then(userdata=>{
        req.user = userdata
        //req.user has all data of user like name, email etc
      
        next()          //to move to next middleware or continue
   
    })
  

})

}