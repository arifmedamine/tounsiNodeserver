const request = require('request');
const cheerio = require('cheerio');
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

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


scrapBonPlanCarrefour = function (URL) {
    request(URL, (error, response, html) => {
        if (!error && response.statusCode == 200) {

            /* console.log(html); //nesrappiw biiih site lkol */
            var result = []
            const $ = cheerio.load(html);
            // const image = $('.image-wrapper').find('img').attr('src')
            // const name = $('.image-wrapper').find('img').attr('alt')
            // const price = $('.price').find('span').text().substring(0, 9)
            // console.log(name)
            // console.log(price)
            // console.log('https://www.carrefourtunisie.com/'+image)
            $('.image-wrapper').each((e, elm) => {
                const name = $(elm).find('img').attr('alt')
                result.push({
                    name: name,
                    price: "",
                    image: ""
                })
            })

            let j = 0
            $('.image-wrapper').each((e, elm) => {
                const image = $(elm).find('img').attr('src')
                result[j].image = 'https://www.carrefourtunisie.com/' + image

                j++
            })
            console.log(result)
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, 'carrefour', result[x].image)
            }

        } else {
            console.log("INTERNET FAILEEEEEEEEEEEED TO CONNECT");
        }
    });
}

function saveToSql(name, tag, image) {
    con.query('INSERT INTO produit(name, tag, image) VALUE(?,?,?)', [name, tag, image], (err, result, field) => {
        con.on('error', function (err) {
            console.log('[MySQL ERROE]', err);
        });
        res.send(result)
    })
}

router.get('/scrapcarrefour', (req, res) => {
    scrapBonPlanCarrefour("https://www.carrefourtunisie.com/produits-carrefour-alimentaire-29")
    res.send("success!! ......... :) ")
})

router.get("/", (req, res) => {
    let x = "carrefour"
    con.query("SELECT * FROM produit WHERE tag = ?", [x], (err, rows, fields) => {
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