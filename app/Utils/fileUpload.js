const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,new Date().toISOString()+file.originalname)
    },
    destination: function(req,file,callback){
        callback(null,path.join(__dirname))
        console.log("dir name---",__dirname);
    }
})

const upload = multer({
    storage
})

module.exports = upload;