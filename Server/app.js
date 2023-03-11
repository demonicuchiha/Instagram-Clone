const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 5000

const {MONGOURI} = require('./keys')



mongoose.connect(MONGOURI)

mongoose.connection.on('connected', ()=>{
    console.log("Connected to Mongodb Yeahhh")
})

mongoose.connection.on('error', (err)=>{
    console.log("err occured", err)
})

app.use(cors())
//after connection ahs been established
require('./models/user')
require('./models/post')



//parse incoming requests to json format

app.use(express.json())

//middleware for authentication
app.use(require('./routes/auth'))

//middleware for posts
app.use(require('./routes/post'))

//middleware for users
app.use(require('./routes/user'))

app.listen(PORT, ()=>{
    console.log("Server is running on PORT ", PORT)
})
