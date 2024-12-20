const express = require('express');
const multer = require('multer');    // Required to deal with file uploads
require('dotenv').config()

const app = express();
app.use('/public', express.static(process.cwd() + '/public'));

// Send uploaded files to /public/uploads
const upload = multer({ dest: './public/uploads/' })   // Files are made to be interactable since we only want the metadata

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Search for uploaded file @ /api/fineanalyse and extract metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  const { originalname, mimetype, size } = req.file;
  return res.json({name: originalname, type: mimetype, size});
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
