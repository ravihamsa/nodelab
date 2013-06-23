/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 22/06/13
 * Time: 10:05 AM
 * To change this template use File | Settings | File Templates.
 */
var db = require('../lib/db');

var MovieSchema = new db.Schema({
    name:String,
    producer:String
})


MovieSchema.methods.toString = function(){
    return this.name+' '+this.producer;
}

var Movie = db.mongoose.model('MyTransaction', MovieSchema);

module.exports.add = add;

function add(name,producer, callback){
    var instance = new Movie();
    instance.name = name;
    instance.producer = producer;
    instance.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null, instance);
        }
    })
}



function addRecord(){

}
