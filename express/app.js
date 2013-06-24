var express = require('express');
var lorem = require('lorem');
var db = require('./lib/db');
var url = require('url');
var mongoose = db.mongoose;
var movie = require('./models/Movie');
var transaction = require('./models/Transaction');
var app = express();

var port = 5431;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	app.listen(port);
	console.log('db open, and app listening to '+port);
});

app.get('/',function(req, res){
	res.send('ravi');
});


app.get('/fillTransaction',function(req, res){
    transaction.fillRecord(function(error, trans){
        if(error){
            throw  error;
        }
        res.send(trans);
    });
});


app.get('/transactions',function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log('finding by query: ', query);
    transaction.find(query, function(error, trans){
        if(error){
            throw  error;
        }
        res.send(trans);
    });
});


app.get('/transactions/grouped',function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log('finding by grouped: ', query.dimension);
    transaction.groupedFind(query.dimension, function(error, trans){
        if(error){
            throw  error;
        }
        res.send(trans);
    });
});


