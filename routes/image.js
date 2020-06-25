var express = require('express'); //bech nasn3ou biiih rest api
var mysql = require('mysql'); //bech n'analysiw bih(parse) parametre men api request
var multer = require('multer')
const path = require('path');

const router = express.Router();

//connect to database server(mysql)
var con = mysql.createConnection({
    host: "localhost",
    user: "tounsi",
    password: "tounsi",
    database: "tounsi"
});
const DIR = './uploads'
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

let upload = multer({
    storage: storage
});
router.put('/userpic', upload.single('userImage'), (req, res, next) => {
    console.log(req.file.filename)
    console.log(req.body.name)
    con.query("UPDATE user SET image = ? WHERE name = ?", [req.file.filename, req.body.name], (err, result, fields)=>{
        if (err) {
            res.json(err.message)
        } else {
            res.send(req.file)
        }
    })
})
router.get("/check_connection", (req, res) => {
    res.sendStatus(200)
})

module.exports = router
