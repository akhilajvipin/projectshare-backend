//import mongoose
const mongoose = require('mongoose')

// import validator
const validator = require('validator')

//connection string of mongoose

const connectionString = process.env.DATABASE

//connect to mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log(`mongodb connected successfully`);
}).catch((err)=>{
    console.log(`mongodb connection failed due to :${err}`);
})
