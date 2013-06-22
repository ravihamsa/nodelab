/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 30/04/13
 * Time: 11:36 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

//Connect to local database

var address = 'localhost/test';


function connect(){
    var url = 'mongodb://'+address;
    mongoose.connect(url);
}

function disconnect(){
    mongoose.disconnect();
}


connect();