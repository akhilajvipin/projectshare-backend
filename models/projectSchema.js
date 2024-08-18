

//import mangoose

const mongoose = require('mongoose')


const projectsSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    github:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    overview:{
        type:String,
        require:true
    },
    projectImage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const projects = mongoose.model("projects",projectsSchema)




module.exports =projects