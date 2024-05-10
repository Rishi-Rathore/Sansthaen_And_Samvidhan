const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const dir = './uploads';
if(!fs.existsSync(dir))
{
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req,file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext === '.pptx') {
            cb(null, file.fieldname + '-' + Date.now() + ext);
        } 
        else
        {
            cb(new Error(
                'Only .pptx files are allowed!'),
                false);
        }
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 *1024}
});

app.use('/uploads',express.static('uploads'));

app.get('/', (req, res) => {
    res.send(`
        <form action= "/upload" method="POST" enctype = "multipart/form-data">
        <label for="file">Choose a .pptx file to upload:</label><br>
        <input type=".pptx><br><br>
        <button type="submit">Upload</button>
        </form>
        `);
});

app.post('/upload', upload.single('file'),(req,res) => {
    res.send(File uploaded Successfully! You can access it <a href="/uploads/${req.file.filename}"> here</a>);
});

app.use((err,req, res, next) => {
    if(err instanceof multer.MulterError)
    {
        res.status(400).send('File upload failed:'+err.message);
    }
    else
    {
        res.status(400).send(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});