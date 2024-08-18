
//add project
//import project schema
const projects = require('../models/projectSchema')

 

exports.addPoject = async(req,res)=>{
    console.log('inside addproject request');
    const userId =req.payload
    console.log(userId);

    const projectImage  = req.file.filename
    // console.log(projectImage);

    const{title,language,github,website,overview}= req.body
    console.log(`${title}, ${language}, ${github}, ${website}, ${overview}, ${projectImage}`);

    try {

        const existingProject =await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project Already Exist.. Upload new project')
        }
        else{
            const newProject = new projects({
                title,language,github,website, overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
        
    }


    // res.status(200).json('add project request received')
}
//get homeproject

exports.getHomeProject = async(req,res)=>{
try {
    const allProject = await projects.find().limit(3)
    res.status(200).json(allProject)

    
} catch (err) {
    res.status(401).json(`Request Failed due to ${err}`)
}
}

//get all project 
exports.getAllProject = async (req,res)=>{
    const searchkey = req.query.search
    console.log(searchkey);

    const  query= {
        language:{
            $regex:searchkey,$options:'i'
        }
    }
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)

    } catch (err) {
        res.status(401).json(`Request Failed due to ${err}`)

    }
}
 


//getUserProject
exports.getUserProject = async (req,res)=>{

 const   userId = req.payload
    try {
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)

    } catch (err) {
        res.status(401).json(`Request Failed due to ${err}`)

    }
}

//edit project

exports .editUserproject = async(req,res)=>{

    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectImage} = req.body
    const UploadProjectimage = req.file?req.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:UploadProjectimage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)

    } catch (err) {
        res.status(401).json(`Request Failed due to ${err}`)

    }
}

//delete user project
exports.deleteProject = async (req, res) => {
    const { pid } = req.params;

    try {
        const removeProject = await projects.findByIdAndDelete(pid); // Corrected here
        res.status(200).json(removeProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}