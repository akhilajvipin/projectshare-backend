//import  model
const users = require("../models/userSchema");

//import jwt 
const jwt = require('jsonwebtoken')

// logic for register 
exports.register =async(req,res)=>{

    //logic
    console.log('inside usercontroller-register logic');
    //destructuring data from the client request body (since json format is converted into js object by the .json()method used in index.js file)

    const {username,email,password}= req.body
    try{
   //since the unique value are checking that email is already parent iin the database
    //for that we are using findone method which returns entire documrnt when the condition is true  else return null
    const existingUser = await users.findOne({email})

    if(existingUser){
        // if find one retun document it means that the user is already exist //406-unprocessuble entity
        //so we are sending response  in 200series(clent req error)
       res.status(406).json('account already exist..please login')
    }
    else{
        //if find one is return null ,it means the email or the user desnot exist in the database
      // create object for model
       const newUser = new users({
        username,
        email,
        password,
        github:"",
        linkedin:"",
        profile:""

       })
       //inoreder to add the above object use save () method in mongoose
      await newUser.save()

        res.status(200).json(newUser)
    }
}
//js resolve err using try catch block
catch(err){
    res.status(401).json('Register request failed due to ',err)
}
}

//logic for login

exports.login= async(req,res)=>{
    console.log('inside login function');
    //   console.log(req.body);

    const{email,password} = req.body


try{const existingUser = await users.findOne({email,password})

   if(existingUser){
    //sign is the funcytion used to create tolken
    //first arquement is payload- the information that is secretely transmitted
    // secnd secret key based on which the token is generated
 const token =   jwt.sign({userId:existingUser._id},"supersecretekey12345")
    res.status(200).json({
        existingUser,
        token
    })
   }
   else{
       res.status(406).json('invalid email id or password')
      }
    }
    catch(err){
        res.status(401).json('Login request failed due to:',err)
    }
}

//edit profile

exports. editUser = async(req,res)=>{
    const userId = req.payload
    const{username,email,password,github,linkedin,profile}=req.body
    
    const profileImage = req.file?req.file.filename:profile
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})
       await updateUser.save()
       res.status(200).json(updateUser)
    }
    catch(err){
        res.status(401).json(err)
    }

}
