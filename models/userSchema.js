//import mongoose
 const mongoose = require('mongoose')

//create schema  - use schema class in mongoose
const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        require:true,
       min:['3','Must be at least 3 character,got only {value}',] 

    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }

        }
    },
    password:{
        type:String,
        require:true

    },
    github:{
        type:String,

    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }

})


//create modal
 const users = mongoose.model("users",userSchema)

 //export the model
 module.exports = users
