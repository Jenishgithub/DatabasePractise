var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//create a connection to a database
var databaseconnectionurl = 'localhost:27017/mongoosepractise';
mongoose.connect(databaseconnectionurl);
var Schema = mongoose.Schema;
var userDataSchema = new Schema({//this is the schema
    title: String,
    content: String,
    author: String
});
var UserData = mongoose.model('UserData', userDataSchema);//this is the model of the schema created above


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/test/:id', function (req, res, next) {
    res.render('test', {output: req.params.id});
});
router.post('/test/submit', function (req, res, next) {
    var id = req.body.id;
    res.redirect('/test/' + id);//redirects 
});

router.get('/get-data', function (req, res, next) {
    UserData.find().then(function (doc) {
        res.render('index', {items: doc});
    });
});

//database insertion process
router.post('/insert', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var data = new UserData(item);
    data.save();
    res.redirect('/');
});

router.post('/update', function (req, res, next) {
    var id = req.body.id;
    UserData.findById(id, function (err, doc) {
        if (err) {
            console.log('error, no entry found...');
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
    });
    res.redirect('/');
});

module.exports = router;
