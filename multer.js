require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const db = require('mongoose');
const path = require('path');

const app = express();
const url = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

let myschema = new db.Schema(
    {
        name: { type: String },
        image: { type: String },
    }
)

let user = db.model('login', myschema)

db.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('DB Connected') })
    .catch((e) => { console.log('error ---' + e) })

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + '.' + path.extname(file.originalname))
        }
    }
)

const upload = multer({ storage });

app.post('/load', upload.single('myfile'), async (req, res) => {
    console.log(req.file);

    if (!req.file) {
        res.send('Please uplad with file')
        return
    }
    let { name } = req.body;

    await user.create({ name, image: req.file.filename })
    res.send('upload success')
})

app.get('/login', async (req, res) => {
    res.send(await user.find())
})


app.listen(process.env.PORT);
console.log("-> Local: http://localhost:9800/");

