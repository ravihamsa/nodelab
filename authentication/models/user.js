/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 30/04/13
 * Time: 11:42 PM
 * To change this template use File | Settings | File Templates.
 */
var db = require('../lib/db');

var UserSchema = new db.Schema({
    username:{type:String, unique:true},
    password:String
});

var MyUser = db.mongoose.model('User', UserSchema);

module.exports.addUser = addUser;

function addUser(username, password, callback){
    var instance = new MyUser();
    instance.username = username;
    instance.password = password;
    instance.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null, instance);
        }
    })
}

