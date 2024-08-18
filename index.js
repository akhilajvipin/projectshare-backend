// 1)import dotenv
//Loads .env file contents into process.env by default.
require('dotenv').config()

//2)import express - to create server
const express = require('express')

//import cors 
const cors = require('cors')

// import  router
const router =require('./Routes/router')

// import connections
require('./DB/connections')


// create server
const pfserver = express()

//use of cors by server
pfserver.use(cors())

//6)Returns middleware that only parses json and convert it into javascript object
pfserver.use(express.json())

//server use router
pfserver.use(router)

// pfserver.use(router)

//pfserver should use upload folder
//how the other application should use this file
//sec to export the upload folder
pfserver.use('/uploads',express.static('./uploads'))

//7)custom the port
const PORT = 4000 || process.env.PORT
//8)run server
pfserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLTY AT PORT NUMBER ${PORT}`);
})
//9) get http  request to baseurl - http:/localhost:4000/ 
  pfserver.get('/',(req,res)=>{
    res.send(`<h1 style="color:blue"> Project fair server running successfully and waiting for request<h1>`)
  })
//    //post request
//    pfserver.post('/',(req,res)=>{
//     res.send('post request')
//    })

//    pfserver.put('/',(req,res)=>{
//     res.send('post request')
//    })