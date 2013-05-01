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

//Connect to cloud database
var userName = 'dbuser';
var password = 'dbpassword';
var address = '@ds061747.mongolab.com:61747/nodejs';
connect();

function connect(){
    var url = 'mongodb://'+userName+':'+password+address;
    mongoose.connect(url);
}

function disconnect(){
    mongoose.disconnect();
}