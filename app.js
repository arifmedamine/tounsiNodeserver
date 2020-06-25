var express = require('express'); //bech nasn3ou biiih rest api
var mysql = require('mysql');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb',
    extended: true,
    parameterLimit: 100
}));
app.use(express.static(path.join(__dirname, 'public')));

const userRoute = require("./routes/user")
const uploadRoute = require("./routes/image")
const geantRoute = require("./geantScraper")
const monoprixRoute = require("./scrapper/monoprixScaper")
const carrefourRoute = require("./scrapper/carrefourScraper")
const productRoute = require("./uploads/product")
const promotionRoute = require("./promotion")
//const carrefourRoute = require("./scrapper/carrefourScraper")
//const promotionRoute = require("./promotion")
//const tounsiRoute = require('./routes/tounsi')
app.use("/users", userRoute)
app.use("/geant", geantRoute)
app.use("/uploads", uploadRoute)
app.use("/monoprix", monoprixRoute)
app.use("/product", productRoute)
app.use("/carrefour", carrefourRoute)
app.use("/promotion", promotionRoute)
//app.use("/tounsi", tounsiRoute)

app.listen(3042, () => {
    console.log('poject running on port 3042');
});