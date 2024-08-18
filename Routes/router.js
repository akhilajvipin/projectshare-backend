//path to resolve the clent request

//import express
 const express = require ('express')

 //create an object for the class Router in express
 const router = new express.Router()

 //import controller
 const usercontroller =require('../controller/userController')
 //import projectcontroller
 const projectcontroller = require('../controller/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

 const multerConfig = require('../Middleware/multerMiddleware')

 
 //path for resolving the request 
 // syntax -router.httprequest('path to resolve request'()=>{how to resolve the reqiuest(inside controller)})

  //a)Register
  router.post ('/user/register',usercontroller.register)

  //b)login
  router.post('/user/login',usercontroller.login)
  //http://localhost:4000/user/login

  //add project
  router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectcontroller.addPoject)

 //get home project
 router.get('/projects/home-project',projectcontroller.getHomeProject)

 //get all project
 router.get('/projects/all-project',jwtMiddleware,projectcontroller.getAllProject)

//get user project
router.get('/user/all-project',jwtMiddleware,projectcontroller.getUserProject)

//edit function

router.put('/edit/project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectcontroller.editUserproject)

//remove user project
router.delete('/project/delete-project/:pid', jwtMiddleware, projectcontroller.deleteProject); 

//edit user

router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),usercontroller.editUser)

 // export router
 module.exports = router

 