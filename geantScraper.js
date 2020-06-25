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

scrapEpicerieSalee = function (URL) {
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
                result.push({
                    name: name.trim().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
                    price : "",
                    image: ""
                })
            })

            let i = 0;
            $('.product_price').each((e, elm) => {
                const price = $(elm)
                .find('span')
                .text()
                    
                let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                result[i].price = +floatprice
                i++
            })
            let k = 0;
            $('.left-block').each((e, elm) => {
                const image = $(elm)
                    .find('img')
                    .attr('src')
                // const options = {
                //     url: image,
                //     dest: './files/' // Save to /path/to/dest/image.jpg
                // }
                // download.image(options)
                //     .then(({
                //         filename,
                //         image
                //     }) => {
                //         console.log('Saved to', filename) // Saved to /path/to/dest/image.jpg
                //     })
                //     .catch((err) => console.error(err))
                //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(45)
                //console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i]
                        let URLpath = "/home/tounsi/619back-end/files/";
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, 'salee', 'Geant', result[x].image)
                
            }
        } else {
            console.log(error);
        }
    });
}

scrapEpicerieSucree = function (URL) {
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
                    .trim()
                resultName = name
                result.push({
                    name: name,
                    price: "",
                    image: ""
                })
            })

            let i = 0;
            $('.product_price').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()

                let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                result[i].price = +floatprice

                i++
            })
            let k = 0;
            $('.left-block').each((e, elm) => {
                const image = $(elm)
                    .find('img')
                    .attr('src')
                // const options = {
                //     url: image,
                //     dest: './files/' // Save to /path/to/dest/image.jpg
                // }
                // download.image(options)
                //     .then(({
                //         filename,
                //         image
                //     }) => {
                //         console.log('Saved to', filename) // Saved to /path/to/dest/image.jpg
                //     })
                //     .catch((err) => console.error(err))
                //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(45)
                //console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i]
                        let URLpath = "/home/tounsi/619back-end/files/";
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, 'sucree', 'Geant', result[x].image)


            }
        } else {
            console.log(error);
        }
    });
}

scrapSurgele = function (URL) {
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
            })

            let i = 0;

            $('.product_price').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()

                    let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                    result[i].price = +floatprice
                i++
            })
            let k = 0;
            $('.left-block').each((e, elm) => {
                const image = $(elm)
                    .find('img')
                    .attr('src')
                // const options = {
                //     url: image,
                //     dest: './files/' // Save to /path/to/dest/image.jpg
                // }
                // download.image(options)
                //     .then(({
                //         filename,
                //         image
                //     }) => {
                //         console.log('Saved to', filename) // Saved to /path/to/dest/image.jpg
                //     })
                //     .catch((err) => console.error(err))
                //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(45)
                //console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i]
                        let URLpath = "/home/tounsi/619back-end/files/";
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, 'surgele', 'Geant', result[x].image)


            }
        } else {
            console.log(error);
        }
    });
}

scrapFrai = function (URL) {
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
            })

            let i = 0;



            $('.product_price').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()

                    let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                    result[i].price = +floatprice
                i++
            })
            let k = 0;
            $('.left-block').each((e, elm) => {
                const image = $(elm)
                    .find('img')
                    .attr('src')
                // const options = {
                //     url: image,
                //     dest: './files/' // Save to /path/to/dest/image.jpg
                // }
                // download.image(options)
                //     .then(({
                //         filename,
                //         image
                //     }) => {
                //         console.log('Saved to', filename) // Saved to /path/to/dest/image.jpg
                //     })
                //     .catch((err) => console.error(err))
                //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(45)
                //console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i]
                        let URLpath = "/home/tounsi/619back-end/files/";
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, 'frai', 'Geant', result[x].image)
            }
        } else {
            console.log(error);
        }
    });
}

scrapLiquides = function (URL) {
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
            })

            let i = 0;
            $('.product_price').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()

                    let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                    result[i].price = +floatprice
                // console.log(price);
                i++
            })
            let k = 0;
            $('.left-block').each((e, elm) => {
                const image = $(elm)
                    .find('img')
                    .attr('src')
                // const options = {
                //     url: image,
                //     dest: './files/' // Save to /path/to/dest/image.jpg
                // }
                // download.image(options)
                //     .then(({
                //         filename,
                //         image
                //     }) => {
                //         console.log('Saved to', filename) // Saved to /path/to/dest/image.jpg
                //     })
                //     .catch((err) => console.error(err))
                //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(45)
                //console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i]
                        let URLpath = "/home/tounsi/619back-end/files/";
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name, result[x].price, 'liquide', 'Geant', result[x].image)


            }
        } else {
            console.log(error);
        }
    });
}
function saveToSql(name, price, categorie, tag, image) {
    con.query('INSERT INTO produit(name,price,categorie,image, tag) VALUE(?,?,?,?,?)', [name, price, categorie,image, tag], (err, result, field) => {
        con.on('error', function (err) {
            console.log('[MySQL ERROE]', err);
        });
        console.log(result)
    })
}

router.get('/scrapgeant', (req, res) => {
    scrapEpicerieSucree('https://www.geant.tn/epicerie-sucree-72.html')
    scrapEpicerieSucree('https://www.geant.tn/epicerie-sucree-72.html?=2')
    scrapEpicerieSalee('https://www.geant.tn/epicerie-salee-73.html')
    scrapEpicerieSalee('https://www.geant.tn/epicerie-salee-73.html?=2')
    scrapEpicerieSalee('https://www.geant.tn/epicerie-salee-73.html?p=3')
    scrapSurgele('https://www.geant.tn/surgele-78.html')
    scrapFrai('https://www.geant.tn/frais-45.html')
    scrapFrai('https://www.geant.tn/frais-45.html?p=2')
    scrapFrai('https://www.geant.tn/frais-45.html?p=3')
    scrapFrai('https://www.geant.tn/frais-45.html?p=4')
    scrapLiquides('https://www.geant.tn/liquides-74.html')
    res.send("success!! ......... :) ")
})

router.get("/", (req, res) => {
    let x = "Geant"
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

// router.get("/", (req, res) => {
//     con.query("SELECT * FROM produit", (err, rows, fields) => {
//         if (err) {
//             console.log(err)
//             res.sendStatus(500)
//             return
//         }
//         res.status(200)
//         res.json(rows)
//     })
// })

router.get("/:cat", (req, res) => {
    let x = "Geant"
    con.query("SELECT * FROM produit where categorie = ? AND tag = ?", [req.params.cat, x], (err, user_rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200)
        res.json(user_rows)
    })
})

router.get('/download/:tag', (req, res) => {

    con.query('SELECT image FROM produit WHERE tag = ?', [req.params.tag], (err, rows, fields) => {
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