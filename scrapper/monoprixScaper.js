const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const mysql = require('mysql');
const download = require('image-downloader');
const fs = require('fs')
const path = require('path')
var multer = require('multer')

const router = express.Router();

//connect to database server(mysql)
var con = mysql.createConnection({
    host: "localhost",
    user: "tounsi",
    password: "tounsi",
    database: "tounsi"
});


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


mscrapEpicerieSalee = function (URL) {
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
                    link: "",
                    manufacturerName: ""
                })
            })
            let i = 0
            $('.product-price-and-shipping').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()
                let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                result[i].price = +floatprice
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
            let m = 0
            $('.div_manufacturer_name').each((e, elm) => {
                const manufacturerName = $(elm)
                    .find('span')
                    .text()
                result[m].manufacturerName = manufacturerName
                m++
            })
            console.log(result)
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name + " " + result[x].manufacturerName, result[x].price, 'salee', 'monoprix', result[x].image, result[x].link)
            }
        } else {
            console.log(error);
        }
    });
}
mscrapEpicerieSucree = function (URL) {
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
                    link: "",
                    manufacturerName: ""
                })
            })
            let i = 0
            $('.product-price-and-shipping').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()
                let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                result[i].price = +floatprice
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
                // //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(54)
                console.log(serverpic);
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
            let m = 0
            $('.div_manufacturer_name').each((e, elm) => {
                const manufacturerName = $(elm)
                    .find('span')
                    .text()
                result[m].manufacturerName = manufacturerName
                m++
            })
            console.log(result)
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name + " " + result[x].manufacturerName, result[x].price, 'sucree', 'monoprix', result[x].image, result[x].link)
            }
        } else {
            console.log(error);
        }
    });
}

mscrapLiquide = function (URL) {
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
                    link: "",
                    manufacturerName: ""
                })
            })
            let i = 0
            $('.product-price-and-shipping').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()
                let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                result[i].price = +floatprice
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
                // //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(54)
                console.log(serverpic);
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
            let m = 0
            $('.div_manufacturer_name').each((e, elm) => {
                const manufacturerName = $(elm)
                    .find('span')
                    .text()
                result[m].manufacturerName = manufacturerName
                m++
            })
            console.log(result)
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name + " " + result[x].manufacturerName, result[x].price, 'liquide', 'monoprix', result[x].image, result[x].link)
            }
        } else {
            console.log(error);
        }
    });
}

mscrapFrai = function (URL) {
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
                    link: "",
                    manufacturerName: ""
                })
            })
            let i = 0
            $('.product-price-and-shipping').each((e, elm) => {
                const price = $(elm)
                    .find('span')
                    .text()
                let floatprice = price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                result[i].price = +floatprice
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
                // //removing unnecessary caracters in order to match the same name of image in files directory
                let serverpic = image.substring(54)
                console.log(serverpic);
                let dirImage = "files";
                let mimages = fs.readdirSync(dirImage);
                for (let i = 0; i < mimages.length; i++) {
                    if (serverpic === mimages[i]) {
                        let confirmPic = mimages[i];
                        result[k].image = confirmPic
                    }

                }

                //console.log(image)
                k++
            })
            let m = 0
            $('.div_manufacturer_name').each((e, elm) => {
                const manufacturerName = $(elm)
                    .find('span')
                    .text()
                result[m].manufacturerName = manufacturerName
                m++
            })
            console.log(result)
            for (let x = 0; x < result.length; x++) {
                saveToSql(result[x].name + " " + result[x].manufacturerName, result[x].price, 'frai', 'monoprix', result[x].image, result[x].link)
            }
        } else {
            console.log(error);
        }
    });
}

function saveToSql(name, price, categorie, tag, image,  link) {
    con.query('INSERT INTO produit(name,price,categorie,image, tag, link) VALUE(?,?,?,?,?,?)', [name, price, categorie, image, tag, link], (err, result, field) => {
        con.on('error', function (err) {
            console.log('[MySQL ERROE]', err);
        });
        console.log(result)
    })
}

router.get('/scrapmonoprix', (req, res) => {
    mscrapEpicerieSalee('https://clickandcollect.monoprix.tn/3-epicerie-salee')
    mscrapEpicerieSalee('https://clickandcollect.monoprix.tn/3-epicerie-salee?page=2')
    mscrapEpicerieSalee('https://clickandcollect.monoprix.tn/3-epicerie-salee?page=3')
    mscrapEpicerieSalee('https://clickandcollect.monoprix.tn/3-epicerie-salee?page=4')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=2')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=3')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=4')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=5')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=6')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=7')
    mscrapEpicerieSucree('https://clickandcollect.monoprix.tn/12-epicerie-sucree?page=8')
    mscrapLiquide('https://clickandcollect.monoprix.tn/13-boissons')
    mscrapLiquide('https://clickandcollect.monoprix.tn/13-boissons?page=2')
    mscrapFrai('https://clickandcollect.monoprix.tn/14-produits-frais')
    mscrapFrai('https://clickandcollect.monoprix.tn/14-produits-frais?page=2')
    mscrapFrai('https://clickandcollect.monoprix.tn/14-produits-frais?page=3')
    mscrapFrai('https://clickandcollect.monoprix.tn/14-produits-frais?page=4')
    mscrapFrai('https://clickandcollect.monoprix.tn/14-produits-frais?page=5')
    res.send("success!! ......... :) ")
})

router.get("/", (req, res) => {
    let x = "monoprix"
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

router.get('/download/:tag', (req, res)=>{
   
    con.query('SELECT image FROM produit WHERE tag = ?', [req.params.tag], (err, rows, fields)=>{
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
  
router.get("/:cat", (req, res) => {
    var tag = 'monoprix'
    con.query("SELECT * FROM produit where tag = ? AND categorie = ?", [tag, req.params.cat], (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})

router.get("/tounsi/:tag/:cat", (req, res) => {
    var tounsi = '619'
    con.query("SELECT * FROM produit where tag = ? AND categorie = ? AND link LIKE ?", [req.params.tag, req.params.cat, '%' + tounsi + '%'],(err, rows, fields) => {
        res.status(200)
        res.json(rows)
    })
})


router.get("/tounsi/:tag", (req, res) => {
    var tounsi = '619'
    con.query("SELECT * FROM produit where tag = ? AND link LIKE ?", [req.params.tag, '%' + tounsi + '%'], (err, rows, fields) => {
        res.status(200)
        res.json(rows)
    })
})

router.get('/imtounsi/:img', (req, res) => {
    console.log(req.params.Imagename);
    var tounsi = '619'
    con.query("SELECT * FROM produit where image = ? AND link LIKE ?", [req.params.img, '%' + tounsi + '%'], (err, rows, fields) => {
        res.status(200)
        res.sendFile(path.join(__dirname, "../files/" + req.params.img));
    })

})

router.get("/check_connection", (req, res) => {
    res.sendStatus(200)
})

module.exports = router