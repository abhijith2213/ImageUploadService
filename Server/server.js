require('dotenv').config()

const express = require('express');
const server = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const port = process.env.PORT
const {connectDb} = require('./config/connection')
const userRouter = require('./Routes/user')
const imageRouter = require('./Routes/images')

server.use(express.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(cors())

//PUBLIC FOLDER
server.use('/images',express.static(path.join(__dirname,'public/images')))


//ROUTES
 
server.use('/api',userRouter)
server.use('/api/image',imageRouter)


//DATABASE CONNECTION
connectDb();


//SERVER CONNECTION
server.listen(port,()=>{
    console.log('server started successfully');
})

module.exports = server;