var crypto = require('crypto'); // to encrypt password
var uuid = require('uuid'); //yasnaa id unique string
var express = require('express'); //bech nasn3ou biiih rest api
var mysql = require('mysql');
var bodyParser = require('body-parser'); //bech n'analysiw bih(parse) parametre men api request

//connect to database server(mysql)
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "consomitounsi"
});

//cryptage taa lpassword
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length);
};

var sha512 = function(password,salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userPassweord) {
    var salt = genRandomString(16);
    var passwordData = sha512(userPassweord,salt);
    return passwordData;    
}

function checkHashPassword(userPassweord, salt){
    var passwordData = sha512(userPassweord, salt)
    return passwordData
}

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register/', (req,res,next)=>{
    var post_data = req.body //vairable fiha lbody li nhottou fil postman 9bal manaamlou ajout
    var uid = uuid.v4();
    var plaint_password = post_data.password;
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt;
    var name = post_data.name;
    var email = post_data.email;

    con.query('SELECT * FROM user WHERE email=?',[email],function(err,result,fields){
        con.on('error',function(err){
            console.log('[MySQL ERROE]',err);
        });
        if (result && result.length) res.json("user already exist");
        else {
        con.query(
            "INSERT INTO user (unique_id, name, email, encrypted_password, salt, created_at, updated_at) VALUES(?,?,?,?,?,NOW(),NOW())",
            [uid,name, email, password, salt],(err, result, fields)=> {
            if (err) {
                res.json(err.message)
            } else {
                res.json("ajout avec success")
            }
            });
        } 
    });  
})

app.post('/login', (req, res, next)=>{
    var user_password = req.body.password
    var email = req.body.email

    con.query("SELECT * FROM user WHERE email = ?", [email], (err, result, fields)=>{
        con.on('error', (err)=>{
            console.log('[]MYSQL ERROR', err)
        })
        if (result && result.length) {
            var salt = result[0].salt
            var encrypted_password = result[0].encrypted_password
            var hashed_password = checkHashPassword(user_password,salt).passwordHash
            if (encrypted_password == hashed_password) 
                res.end(JSON.stringify(result[0]))
            else
                res.end(JSON.stringify("wrong password bacayarou"))
        }
        else 
        {
            res.json('user not exists duuumASSS')
        }
    })
})

// app.get("/",(req,res,next)=> {
//     var encrypt = saltHashPassword("123456")
//     console.log('password: 123456');
//     console.log('Encrypt: '+encrypt.passwordHash);
//     console.log('salt: '+encrypt.salt);
// })

app.listen(3000, ()=>{
    console.log('poject running on port 3000');
});

