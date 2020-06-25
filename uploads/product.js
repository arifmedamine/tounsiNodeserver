const path = require('path');
const express = require('express');
const mysql = require('mysql');

const router = express.Router();

//connect to database server(mysql)
var con = mysql.createConnection({
    host: "localhost",
    user: "tounsi",
    password: "tounsi",
    database: "tounsi"
});

router.get("/", (req, res) => {
    con.query("SELECT * FROM produit", (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows)
    })
})

router.get("/:cat", (req, res) => {
    con.query("SELECT * FROM produit where categorie = ? ", [req.params.cat], (err, user_rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(user_rows)
    })
})

router.get("/:name", (req, res) => {
    var name = req.params.name
    con.query("SELECT * FROM produit where name LIKE ? ", ['%' + req.params.name + '%'], (err, user_rows, fields) => {
        if (!err) {
            var row = rows;
            res.send(row);
            console.log(req.params);
            console.log('The solution is: ', rows);
        } else {
            console.log('Error while performing Query.');
            console.log(err);
        }
    })
})


router.get('/test/:Imagename', (req, res) => {
    console.log(req.params.Imagename);
    //lina t7ot i l path
    //mnin tjib itaswira
    res.sendFile(path.join(__dirname, "../files/" + req.params.Imagename));
})


router.get("/check_connection", (req, res) => {
    res.sendStatus(200)
})

module.exports = router