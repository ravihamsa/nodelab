/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 22/06/13
 * Time: 10:05 AM
 * To change this template use File | Settings | File Templates.
 */
var db = require('../lib/db');
var _ = require('underscore');
var moment = require('moment');

var TransactionSchema = new db.Schema({
    state:String,
    region:String,
    district:String,
    city:String,
    language:String,
    movieName:String,
    theatre:String,
    theatre_category:String,
    screen:String,
    show:String,
    seating_type:String,
    date:Date,
    price:Number
})


TransactionSchema.methods.toString = function(){
    return this.name+' '+this.producer;
}

var MyTransaction = db.mongoose.model('Transaction', TransactionSchema);

module.exports.add = add;
module.exports.all = all;
module.exports.fillRecord = fillRecord;

function add(obj, callback){
    var instance = new MyTransaction();
    _.each(obj, function(value, key){
        instance[key] = value;
    });
    instance.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null, instance);
        }
    })
}


function all(callback){
    MyTransaction.find(function(err, transactions){
        if(err){
            callback(err);
        }else{
            callback(null, transactions);
        }
    });
}


function fillRecord(callback){
    //'state', 'regions', 'districts', 'cities',
    var dimensions = ['language','movieName','theatre_category','theatre','screen','show','seating_type'];
    var indexCount = [6, 30, 3, 5, 2, 4, 3];

    var date =  moment().startOf('day');

    for(var i= 0; i<30; i++){
        var obj = {};
        for(var state=0; state<2; state++){
            obj.state = 'state'+state;
            for(var region=0; region<2; region++){
                obj.region = 'region'+state+region;
                for(var district=0; district<2; district++){
                    obj.district = 'district'+state+region+district;
                    for(var city=0; city<2; city++){
                        obj.city = 'city'+state+region+district+city;

                        _.each(dimensions,function(key, index){
                            obj[key] = key + Math.floor(Math.random()*(indexCount[index]));
                        })

                        obj.price = 50*Math.ceil(Math.random()*(6));
                        obj.date = date.valueOf();
                        add(obj, function(err, instance){
                            if(err){
                                callback(err);
                            }else{
                                callback(null, instance);
                            }
                        })
                    }
                }
            }
        }

        date.subtract('days',1);
    }




}
