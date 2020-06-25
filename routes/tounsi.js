var express = require('express'); //bech nasn3ou biiih rest api
var mysql = require('mysql'); //bech n'analysiw bih(parse) parametre men api request
var multer = require('multer')

const router = express.Router();

//connect to database server(mysql)
var con = mysql.createConnection({
    host: "localhost",
    user: "tounsi",
    password: "tounsi",
    database: "tounsi"
});
const DIR = './upload'
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

router.post("/add", upload.single('imageproduit'), (req, res, next) => {

    let filename = req.file.filename;

    //------------------------------------
    pool.query("INSERT INTO tounsi (name, price, categorie, image) VALUES ( ?, ?, ?, ?)",
        [
            req.body.name,
            req.body.price,
            req.body.categorie,
            filename,
        ], (err, rows, fields) => {
            if (err) {
                console.log("--------")
                console.log(err);
            }
            res.status(200);
        })
    })
router.get("/", (req, res) => {
    con.query("SELECT * FROM tounsi", (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows)
    })
})


router.get("/check_connection", (req, res) => {
    res.sendStatus(200)
})

module.exports = router
