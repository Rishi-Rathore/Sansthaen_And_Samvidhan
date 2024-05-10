const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const dir = './uploads';
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const ext = path.extname
        (file.originalname).toLowerCase();
        if(ext == '.pptx') {
            cb(null, file.filedname + '-' + Date.now() + ext);
        }
    }
});


const upload =multer({
    storage: storage,
    limits: { filesize: 50*1024*1024}
});

app.use('/uploads',express.static('uploads'));

app.get('/',(req,res)=>{
    res.send('<from action="/upload" method="post" enctype="multipart/form-data"><label for="file"> choose a.pptx file to upload: </label><br><input type="file" name="file" id="file"accept=".pptx"><br><br><button type="submit">upload</button></form>');

});
app.post('/upload',upload.single('file'),
(req,res)=>{
    res.send('files uploaded succefully! you can access it <a href="/uploads/${req.file.filename}">here</a>');
});
app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        res.status(400),
    send('file upload failed:' + err.message)
    }else{
        res.status(400).send(err.message);
    }
});
app.listen(300,()=>{
    console.log('server started on http://localhost:3000');
});