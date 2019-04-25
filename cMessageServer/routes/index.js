var express = require('express');
var router = express.Router();
var path = require('path');

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname + '/../public/home.html'));
});

module.exports = router;
