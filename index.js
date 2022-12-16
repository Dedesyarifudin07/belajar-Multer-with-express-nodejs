 const express = require('express')
 const multer = require('multer');
 const path = require('path')
 const app = express();

 //buat diskstorage
const storage = multer.diskStorage({
    destination :'./upload/images',
    filename : function (req,file,cb){
        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}` )
    }
})

 const upload = multer({
    storage:storage,
    limits:{fileSize:100000}
 })

 //buat fungsi untuk menghandle eror
 function errHandler (err,req,res,next) {
    if(err instanceof multer.MulterError){
        res.json({succes : 0 , mesage:err})
    }
 }

 app.use('/profile',express.static('./upload/images'));

 app.post('/',upload.single('photo'),(req,res) => {
     console.log(req.file);
     res.json({succes:1,
        url:`http://localhost:5000/profile/${req.file.filename}`
    })
})

app.use(errHandler);

 app.listen(5000, () => {
    console.log('running at http://localhost:5000');
 })