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
    regions:String,
    districts:String,
    cities:String,
    languages:String,
    movieName:String,
    theatre:String,
    theatre_category:String,
    screens:String,
    shows:String,
    seating_type:String,
    date:Date,
    price:Number
})


TransactionSchema.methods.toString = function(){
    return this.name+' '+this.producer;
}

var MyTransaction = db.mongoose.model('Transaction', TransactionSchema);

module.exports.add = add;
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



function fillRecord(callback){
    //'state', 'regions', 'districts', 'cities',
    var dimensions = ['languages','movieName','theatre_category','theatre','screens','shows','seating_type'];
    var indexCount = [6, 30, 3, 5, 2, 4, 3];

    var date =  moment().startOf('day');

    for(var i= 0; i<1; i++){
        var obj = {};
        for(var state=0; state<5; state++){
            obj.state = 'state'+state;
            for(var regions=0; regions<5; regions++){
                obj.regions = 'regions'+state+regions;
                for(var districts=0; districts<5; districts++){
                    obj.districts = 'districts'+state+regions+districts;
                    for(var cities=0; cities<5; cities++){
                        obj.cities = 'cities'+state+regions+districts+cities;

                        _.each(dimensions,function(key, index){
                            obj[key] = key + Math.floor(Math.random()*(indexCount[index]));
                        })

                        obj.price = 50*Math.ceil(Math.random()*(6));

                        obj.date = date.valueOf();
                        console.log(obj);
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
