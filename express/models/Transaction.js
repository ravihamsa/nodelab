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
    state: String,
    region: String,
    district: String,
    city: String,
    language: String,
    movieName: String,
    theatre: String,
    theatre_category: String,
    screen: String,
    show: String,
    seating_type: String,
    date: Date,
    price: Number
})


TransactionSchema.methods.toString = function () {
    return this.name + ' ' + this.producer;
}

var MyTransaction = db.mongoose.model('Transaction', TransactionSchema);

module.exports.add = add;
module.exports.all = all;
module.exports.find = find;
module.exports.fillRecord = fillRecord;
module.exports.groupedFind = groupedFind;

function add(obj, callback) {
    var instance = new MyTransaction();
    _.each(obj, function (value, key) {
        instance[key] = value;
    });
    instance.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, instance);
        }
    })
}


function all(callback) {
    MyTransaction.find(function (err, transactions) {
        if (err) {
            callback(err);
        } else {
            callback(null, transactions);
        }
    });
}

function find(filter, callback) {
    MyTransaction.find(filter, function (err, transactions) {
        if (err) {
            callback(err);
        } else {
            callback(null, transactions);
        }
    });
}

function groupedFind(key, callback) {
    //db.transactions.aggregate({$project:{movieName:1, price:1, '_id':0}}, {$group:{'_id':'$movieName', collection:{'$sum':'$price'}, ticketsSold:{'$sum':1}}})

    var project = {
        $project: {
            price: 1,
            '_id': 0
        }
    }

    var group = {
        '$group': {
            _id:'$'+key,
            collection: {
                '$sum': '$price'
            },
            ticketsSold: {
                '$sum': 1
            }
        }
    }

    project.$project[key]=1;




    MyTransaction.aggregate(project, group, function (err, transactions) {
        if (err) {
            callback(err);
        } else {
            callback(null, transactions);
        }
    });
}


function getRandom(max) {
    return Math.ceil(Math.random() * (max))
}


function fillRecord(callback) {
    //'state', 'regions', 'districts', 'cities',
    var dimensions = ['language', 'movieName', 'theatre_category', 'theatre', 'screen', 'show', 'seating_type'];
    var indexCount = [6, 30, 3, 5, 2, 4, 3];

    var date = moment().startOf('day');

    for (var i = 0; i < 7; i++) {
        var obj = {};
        for (var state = 0; state < getRandom(2); state++) {
            obj.state = 'state' + state;
            for (var region = 0; region < getRandom(2); region++) {
                obj.region = 'region' + state + region;
                for (var district = 0; district < getRandom(2); district++) {
                    obj.district = 'district' + state + region + district;
                    for (var city = 0; city < getRandom(2); city++) {
                        obj.city = 'city' + state + region + district + city;

                        for (var tc = 0; tc < getRandom(3); tc++) {
                            var theatre_category = 'theatre_category' + tc;

                            for (var t = 0; t < getRandom(3); t++) {
                                var theatre = 'theater' + t;
                                var sc = getRandom(3)
                                var screen = 'screen' + sc;
                                var movieName = 'movieName' + getRandom(10);
                                var language = 'language' + getRandom(5);
                                for (var sh = 0; sh < 3; sh++) { //show
                                    var show = 'show' + sh;
                                    var price = (sh * sc * 25) + 25;

                                    for (var st = 0; st < 2; st++) {
                                        var seating_type = 'seating_type' + st;
                                        var sold = getRandom(10);
                                        for (var ticket_count = 0; ticket_count < sold; ticket_count++) {
                                            obj.price = price;
                                            obj.show = show;
                                            obj.screen = screen;
                                            obj.theatre = theatre;
                                            obj.theatre_category = theatre_category;
                                            obj.seating_type = seating_type;
                                            obj.movieName = movieName;
                                            obj.language = language;
                                            obj.date = date.valueOf();
                                            add(obj, function (err, instance) {
                                                if (err) {
                                                    callback(err);
                                                } else {
                                                    callback(null, instance);
                                                }
                                            })
                                        }
                                    }


                                }
                            }
                        }


                    }
                }
            }
        }

        date.subtract('days', 1);
    }


}
