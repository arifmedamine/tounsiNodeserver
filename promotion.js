const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const mysql = require('mysql');
const download = require('image-downloader');
const fs = require('fs')
const path = require('path')

const router = express.Router();

//connect to database server(mysql)
var con = mysql.createConnection({
    host: "localhost",
    user: "tounsi",
    password: "tounsi",
    database: "tounsi"
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


scrapMonoprixPromo = function (URL) {
    request(URL, (error, response, html) => {
        if (!error && response.statusCode == 200) {

            /* console.log(html); //nesrappiw biiih site lkol */
            var result = []
            const $ = cheerio.load(html);
            $('.product-description').each((e, elm) => {
                const name = $(elm)
                    .find('span')
                    .find('a')
                    .text()
                //console.log(name)
                result.push({
                    name: name,
                    price: "",
                    image: "",
                    link: ""
                })
            })
            let i = 0
            $('.product-price-and-shipping').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()
                result[i].price = price
                //console.log(+floatprice)
                i++
            })
            let j = 0
            $('.thumbnail-container').each((e, elm) => {
                const link = $(elm)
                    .find('a')
                    .attr('href')
                result[j].link = link
                //console.log(link)
                j++
            })

            let k = 0
            $('.thumbnail-container').each((e, elm) => {
                const image = $(elm)
                    .find('a')
                    .find('img')
                    .attr('src')
                let serverpic = image.substring(54)
                //console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i]
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            console.log(result)
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, '', 'monoprix', result[x].image)


            }
        } else {
            console.log(error);
        }
    });
}

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
                saveToSql(result[x].name, '', '', 'carrefour', result[x].image)


            }

        } else {
            console.log("INTERNET FAILEEEEEEEEEEEED TO CONNECT");
        }
    });
}


scrapBonPlanGeant = function (URL) {
    request(URL, (error, response, html) => {
        if (!error && response.statusCode == 200) {

            /* console.log(html); //nesrappiw biiih site lkol */
            var result = []
            const $ = cheerio.load(html);
            // const name = $('.right-block');
            // const price = $('.product_price');
            // const outputName = name.find('h3').text();
            // const outputPrice = price.find('span').text();
            // console.log(outputName, outputPrice);
            $('.right-block').each((e, elm) => {
                const name = $(elm)
                    .find('h3')
                    .text()
                    .trim();
                resultName = name
                result.push({
                    name: name,
                    price: "",
                    image: ""
                })
                console.log(name);
            })

            let i = 0;



            $('.product_price').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()
                    .trim();

                resultPrice = price
                result[i].price = price



                // console.log(price);
                i++
            })
            let k = 0;
            $('.left-block').each((e, elm) => {
                const image = $(elm)
                    .find('img')
                    .attr('src')
                result[k].image = image

                //console.log(image)
                k++
            })
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, '', 'Geant', result[x].image)


            }
            console.log(result)
        } else {
            console.log("INTERNET FAILEEEEEEEEEEEED TO CONNECT");
        }
    });
}


function saveToSql(name, price, categorie, tag, image) {
    con.query('INSERT INTO bonplan(name,price,categorie,image, tag) VALUE(?,?,?,?,?)', [name, price, categorie, image, tag], (err, result, field) => {
        con.on('error', function (err) {
            console.log('[MySQL ERROE]', err);
        });
        console.log('Inserted ' + name + price + ' into table.')
    })
}

router.get('/scraper', (req, res) => {
    scrapBonPlanCarrefour("https://www.carrefourtunisie.com/promotions-carrefour")
    scrapBonPlanGeant("https://www.geant.tn/")
    res.send("success!! ......... :) ")
})

router.get("/:tag", (req, res) => {
    con.query("SELECT * FROM bonplan where tag = ?", [req.params.tag], (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})

router.get("/", (req, res) => {
    con.query("SELECT * FROM bonplan", (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(rows)
    })
})

router.get('/download/:tag', (req, res) => {

    con.query('SELECT image FROM bonplan WHERE tag = ?', [req.params.tag], (err, rows, fields) => {
        res.json(rows)
        const images = JSON.parse(JSON.stringify(rows))
        for (let index = 0; index < images.length; index++) {
            const element = images[index].image;
            console.log(element)
            const options = {
                url: element,
                dest: './files/' // Save to /path/to/dest/image.jpg
            }
            download.image(options)
                .then(({
                    filename,
                    element
                }) => {
                    console.log('Saved to', filename) // Saved to /path/to/dest/image.jpg
                })
                .catch((err) => console.error(err))
        }
    })
})

router.get("/check_connection", (req, res) => {
    res.sendStatus(200)
})

module.exports = router