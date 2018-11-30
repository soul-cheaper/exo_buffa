var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// EXERCICE : faire une route /api/restaurants/count dans server.js
// qui appelle cette fonction.
exports.countRestaurants = function (callback) {
    console.log("DANS COUNT")
    MongoClient.connect(url, (err, client) => {
        var db = client.db(dbName);
        db.collection('restaurants')
            .count()
            .then((count) => {
                console.log("COUNT = " + res)
                callback(res);
            })
    });
};

exports.findRestaurants = function findRestaurants(page, pagesize, nom, cuisine, callback) {
    MongoClient.connect(url, (err, client) => {


        if (!err) {
            let query = {};

            // syntaxe recommandée
            // Cf doc mongodb: https://docs.mongodb.com/manual/reference/operator/query/regex/
            // The $regex value needs to be either the string 
            // pattern to match or a regular expression object. 
            // When passing a string pattern, you don't include 
            // the / delimitters
            // VERSION avec $regex et $options
            if (nom != "") {
                query = {
                    //name: "." + nom + "."
                    "name": {
                        $regex: "." + nom + ".",
                        $options: "i"
                    }
                }
            }
            // On est connecté à la base
            var db = client.db(dbName);

            db.collection('restaurants')
                .find(query)
                .limit(parseInt(pagesize))
                .skip(parseInt(page * pagesize))
                .toArray()
                .then((resultats) => {
                    // requête imbriquée
                    db.collection('restaurants')
                        .find(query)
                        .count()
                        .then((count) => {
                            callback(resultats, count);
                        })

                });
        } else {
            callback(-1);
        }
    });


};

exports.supprimerRestaurant = function supprimerRestaurant(id, callback) {
    MongoClient.connect(url, (err, client) => {
        if (!err) {
            client.db(dbName)
                .collection('restaurants')
                .deleteOne({ "_id": ObjectId(id) })
                .then((resultats) => {
                    callback(resultats.delatedCount);
                }).catch((err) => {
                    callback(-1);
                });
        }
    });
}