var express = require('express');
var lorem = require('lorem');
var db = require('./lib/db');
var mongoose = db.mongoose;
var movie = require('./models/Movie');
var transaction = require('./models/Transaction');
var app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	app.listen(8080);
	console.log('db open, and app listening to 8080');
});

app.get('/',function(req, res){
	res.send('ravi');
});

app.get('/movies',function(req, res){
    var newMovie = movie.add(lorem.ipsum('w'), lorem.ipsum('w'),function(error, movie){
        if(error){
            throw  error;
        }

        console.log(movie);
        res.send(movie);
    });


});


app.get('/fillTransaction',function(req, res){
    transaction.fillRecord(function(error, trans){
        if(error){
            throw  error;
        }
        res.send(trans);
    });


});
