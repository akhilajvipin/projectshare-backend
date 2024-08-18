
// import multer

const multer = require('multer')

//storage-is uset tro create multer storage
const storage =multer.diskStorage({
//it have two keys -=first one is destination and the  second one is filename
//destrinsation where the file is stored 
// filename the name in which the file is stored in the destination
destination:(req,file,callback)=>{
    callback(null,'./uploads')
},
//filename-the name in which 
filename:(req,file,callback)=>{
  const filename =  `image-${Date.now()}-${file.originalname}`
 callback(null,filename)
}

})
//filefilter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' ||file.mimetype==='image/jpg' ){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("only png,jpeg,jpg files will be allowed!!"))
    }
 }




//create multerconfiguration
const multerConfig = multer({
    storage,
    fileFilter
})

//export multer

module.exports = multerConfig