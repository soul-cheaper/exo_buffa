var express = require('express');
var app = express();

// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Mon module de connexion à MongoDB
const mongoDBModule = require('./app_modules/crud-mongo');

// ------- CONFIGURATION DE EXPRESS ------
// avec cette ligne, index.html est par defaut la page d’accueil
app.use(express.static('public')); // ICI IMPORTANT !

// POUR AUTORISER CROSS ORIGIN
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

// ------ ROUTES (des Web Services) -------
// ---- page d'accueil ----
// Avec la règle ci-dessous on peut redéfinir la page d’accueil
app.get('/', function (req, res) { // Page d’accueil
    res.sendFile(__dirname + "/public/index.html");
});

let restaurants = [{
        "nom": "Tempus Corporation",
        "cuisine": "pasta",
        "id": 0
    },
    {
        "nom": "Pellentesque A Foundation",
        "cuisine": "pasta",
        "id": 1
    },
    {
        "nom": "Sed Corporation",
        "cuisine": "seafood",
        "id": 2
    },
    {
        "nom": "In Scelerisque Scelerisque LLP",
        "cuisine": "pasta",
        "id": 3
    },
    {
        "nom": "Neque Venenatis Associates",
        "cuisine": "soups",
        "id": 4
    },
    {
        "nom": "Aliquam Enim Nec Foundation",
        "cuisine": "pasta",
        "id": 5
    },
    {
        "nom": "Odio Aliquam Vulputate Limited",
        "cuisine": "sandwiches",
        "id": 6
    },
    {
        "nom": "Nec Enim Nunc LLP",
        "cuisine": "soups",
        "id": 7
    },
    {
        "nom": "Sed Leo Incorporated",
        "cuisine": "pies",
        "id": 8
    },
    {
        "nom": "Cursus Corp.",
        "cuisine": "noodles",
        "id": 9
    },
    {
        "nom": "Ac Turpis Egestas Incorporated",
        "cuisine": "stews",
        "id": 10
    },
    {
        "nom": "Integer Id Magna Ltd",
        "cuisine": "cereals",
        "id": 11
    },
    {
        "nom": "Phasellus Dapibus LLC",
        "cuisine": "soups",
        "id": 12
    },
    {
        "nom": "Feugiat Non Lobortis LLC",
        "cuisine": "cereals",
        "id": 13
    },
    {
        "nom": "Proin LLC",
        "cuisine": "cereals",
        "id": 14
    },
    {
        "nom": "Nunc Commodo Auctor Limited",
        "cuisine": "salads",
        "id": 15
    },
    {
        "nom": "Turpis Incorporated",
        "cuisine": "seafood",
        "id": 16
    },
    {
        "nom": "Suspendisse PC",
        "cuisine": "soups",
        "id": 17
    },
    {
        "nom": "Orci Adipiscing Associates",
        "cuisine": "sandwiches",
        "id": 18
    },
    {
        "nom": "Quam A Felis Foundation",
        "cuisine": "stews",
        "id": 19
    },
    {
        "nom": "Dolor Foundation",
        "cuisine": "noodles",
        "id": 20
    },
    {
        "nom": "Donec Dignissim Company",
        "cuisine": "pasta",
        "id": 21
    },
    {
        "nom": "Orci Donec Nibh Incorporated",
        "cuisine": "pies",
        "id": 22
    },
    {
        "nom": "Elementum Industries",
        "cuisine": "pasta",
        "id": 23
    },
    {
        "nom": "Libero Et PC",
        "cuisine": "salads",
        "id": 24
    },
    {
        "nom": "Donec Dignissim Magna LLC",
        "cuisine": "soups",
        "id": 25
    },
    {
        "nom": "Amet LLC",
        "cuisine": "pies",
        "id": 26
    },
    {
        "nom": "Arcu Et Pede Company",
        "cuisine": "stews",
        "id": 27
    },
    {
        "nom": "Vivamus Euismod Urna Corp.",
        "cuisine": "desserts",
        "id": 28
    },
    {
        "nom": "Morbi Tristique LLP",
        "cuisine": "cereals",
        "id": 29
    },
    {
        "nom": "In Magna Phasellus Incorporated",
        "cuisine": "pasta",
        "id": 30
    },
    {
        "nom": "Adipiscing Ligula PC",
        "cuisine": "pasta",
        "id": 31
    },
    {
        "nom": "Vestibulum Nec Euismod LLC",
        "cuisine": "noodles",
        "id": 32
    },
    {
        "nom": "Condimentum Limited",
        "cuisine": "stews",
        "id": 33
    },
    {
        "nom": "Etiam Bibendum Fermentum LLP",
        "cuisine": "pies",
        "id": 34
    },
    {
        "nom": "Eu Placerat Eget Corp.",
        "cuisine": "soups",
        "id": 35
    },
    {
        "nom": "Sed Diam Lorem Institute",
        "cuisine": "pasta",
        "id": 36
    },
    {
        "nom": "Sapien Industries",
        "cuisine": "desserts",
        "id": 37
    },
    {
        "nom": "Et Risus Corp.",
        "cuisine": "stews",
        "id": 38
    },
    {
        "nom": "At Iaculis Ltd",
        "cuisine": "cereals",
        "id": 39
    },
    {
        "nom": "Congue Incorporated",
        "cuisine": "desserts",
        "id": 40
    },
    {
        "nom": "Nam Interdum PC",
        "cuisine": "pies",
        "id": 41
    },
    {
        "nom": "Mollis Ltd",
        "cuisine": "desserts",
        "id": 42
    },
    {
        "nom": "Dictum Associates",
        "cuisine": "desserts",
        "id": 43
    },
    {
        "nom": "Est Limited",
        "cuisine": "pasta",
        "id": 44
    },
    {
        "nom": "Euismod Ac Fermentum Limited",
        "cuisine": "pies",
        "id": 45
    },
    {
        "nom": "Dolor Fusce Incorporated",
        "cuisine": "pasta",
        "id": 46
    },
    {
        "nom": "Habitant Morbi Limited",
        "cuisine": "desserts",
        "id": 47
    },
    {
        "nom": "Cras Vehicula Corporation",
        "cuisine": "desserts",
        "id": 48
    },
    {
        "nom": "Venenatis A Magna Corp.",
        "cuisine": "desserts",
        "id": 49
    },
    {
        "nom": "Montes PC",
        "cuisine": "soups",
        "id": 50
    },
    {
        "nom": "Ac Corp.",
        "cuisine": "noodles",
        "id": 51
    },
    {
        "nom": "Et Rutrum Industries",
        "cuisine": "pasta",
        "id": 52
    },
    {
        "nom": "Nibh Donec LLC",
        "cuisine": "stews",
        "id": 53
    },
    {
        "nom": "Proin Vel Nisl Industries",
        "cuisine": "soups",
        "id": 54
    },
    {
        "nom": "Felis Orci LLP",
        "cuisine": "sandwiches",
        "id": 55
    },
    {
        "nom": "Elit Corp.",
        "cuisine": "pasta",
        "id": 56
    },
    {
        "nom": "Nunc Laoreet Consulting",
        "cuisine": "noodles",
        "id": 57
    },
    {
        "nom": "Nonummy Ut Incorporated",
        "cuisine": "stews",
        "id": 58
    },
    {
        "nom": "Mollis Ltd",
        "cuisine": "stews",
        "id": 59
    },
    {
        "nom": "Rutrum Foundation",
        "cuisine": "noodles",
        "id": 60
    },
    {
        "nom": "Nulla Incorporated",
        "cuisine": "sandwiches",
        "id": 61
    },
    {
        "nom": "Massa Rutrum Institute",
        "cuisine": "cereals",
        "id": 62
    },
    {
        "nom": "Fusce Fermentum LLC",
        "cuisine": "pasta",
        "id": 63
    },
    {
        "nom": "Blandit Incorporated",
        "cuisine": "noodles",
        "id": 64
    },
    {
        "nom": "Lectus Foundation",
        "cuisine": "pies",
        "id": 65
    },
    {
        "nom": "Hendrerit Donec Inc.",
        "cuisine": "sandwiches",
        "id": 66
    },
    {
        "nom": "Malesuada Incorporated",
        "cuisine": "seafood",
        "id": 67
    },
    {
        "nom": "Laoreet Libero Corporation",
        "cuisine": "soups",
        "id": 68
    },
    {
        "nom": "Phasellus Nulla Integer Ltd",
        "cuisine": "pasta",
        "id": 69
    },
    {
        "nom": "Consectetuer Euismod Est Ltd",
        "cuisine": "stews",
        "id": 70
    },
    {
        "nom": "Pellentesque Habitant Morbi Ltd",
        "cuisine": "noodles",
        "id": 71
    },
    {
        "nom": "Cras Convallis Convallis Consulting",
        "cuisine": "pies",
        "id": 72
    },
    {
        "nom": "Habitant LLP",
        "cuisine": "noodles",
        "id": 73
    },
    {
        "nom": "Nisi Inc.",
        "cuisine": "seafood",
        "id": 74
    },
    {
        "nom": "Tellus Sem LLC",
        "cuisine": "desserts",
        "id": 75
    },
    {
        "nom": "Aliquet Libero Associates",
        "cuisine": "noodles",
        "id": 76
    },
    {
        "nom": "Nibh Enim Gravida Associates",
        "cuisine": "salads",
        "id": 77
    },
    {
        "nom": "Ipsum Dolor Inc.",
        "cuisine": "salads",
        "id": 78
    },
    {
        "nom": "Tristique Pharetra Quisque Industries",
        "cuisine": "pies",
        "id": 79
    },
    {
        "nom": "Arcu Foundation",
        "cuisine": "cereals",
        "id": 80
    },
    {
        "nom": "Ligula Foundation",
        "cuisine": "pasta",
        "id": 81
    },
    {
        "nom": "Odio Aliquam LLC",
        "cuisine": "seafood",
        "id": 82
    },
    {
        "nom": "Ornare Lectus Inc.",
        "cuisine": "desserts",
        "id": 83
    },
    {
        "nom": "Nulla Inc.",
        "cuisine": "sandwiches",
        "id": 84
    },
    {
        "nom": "Mauris Eu Elit Ltd",
        "cuisine": "salads",
        "id": 85
    },
    {
        "nom": "Ultricies Dignissim Lacus Limited",
        "cuisine": "pasta",
        "id": 86
    },
    {
        "nom": "Egestas Foundation",
        "cuisine": "pies",
        "id": 87
    },
    {
        "nom": "Nibh Aliquam Ornare Limited",
        "cuisine": "pies",
        "id": 88
    },
    {
        "nom": "Enim Sit Amet Institute",
        "cuisine": "cereals",
        "id": 89
    },
    {
        "nom": "Convallis In Cursus PC",
        "cuisine": "seafood",
        "id": 90
    },
    {
        "nom": "Orci Sem Incorporated",
        "cuisine": "pasta",
        "id": 91
    },
    {
        "nom": "Vel Venenatis Inc.",
        "cuisine": "soups",
        "id": 92
    },
    {
        "nom": "Non Corporation",
        "cuisine": "noodles",
        "id": 93
    },
    {
        "nom": "Tincidunt Aliquam Arcu Inc.",
        "cuisine": "cereals",
        "id": 94
    },
    {
        "nom": "In Consequat Enim PC",
        "cuisine": "salads",
        "id": 95
    },
    {
        "nom": "Fusce Fermentum Corporation",
        "cuisine": "seafood",
        "id": 96
    },
    {
        "nom": "Enim Corporation",
        "cuisine": "cereals",
        "id": 97
    },
    {
        "nom": "Non Associates",
        "cuisine": "pasta",
        "id": 98
    },
    {
        "nom": "Vestibulum Corp.",
        "cuisine": "sandwiches",
        "id": 99
    }
]

/*
// This responds to a GET request for the homepage
// Repond à /api/restaurants?page=xxx&pagesize=yyy&nom=zzz&cuisine=ttt
app.get('/api/restaurants', function (req, res) {
    // On récupère les paramères en query string;
    let page = req.query.page || 0;
    let pagesize = req.query.pagesize || 10;
    let nom = req.query.nom || "";
    let cuisine = req.query.cuisine || "";

    // ici on va accèder à la BD....
    //on simule la réponse

    let reponse = {
        msg: "Recu GET page= " + page + " pagesize = " +
            pagesize + " nom = " + nom + " cuisine = " +
            cuisine,
        data: restaurants,
        err: ""
    }
    res.send(JSON.stringify(reponse));
})
*/
// This responds to a GET request for the homepage
// Repond à /api/restaurants?page=xxx&pagesize=yyy&nom=zzz&cuisine=ttt
app.get('/api/restaurants', function (req, res) {
    // On récupère les paramères en query string;
    let page = req.query.page || 0;
    let pagesize = req.query.pagesize || 10;
    let nom = req.query.nom || "";
    let cuisine = req.query.cuisine || "";

    // ici on va accèder à la BD....
    mongoDBModule.findRestaurants(page, pagesize, nom, cuisine, (resultatDeLaRequete, count) => {
        let reponse = {
            msg: "Recu GET page= " + page + " pagesize = " +
                pagesize + " nom = " + nom + " cuisine = " +
                cuisine,
            count:count,
            data: resultatDeLaRequete,
            err: ""
        }
        res.send(JSON.stringify(reponse));
    })


    
})
// This responds to a GET request for the homepage
// Repond à /api/restaurants/2 par exemple (restaurant d'id = 2)
app.get('/api/restaurants/:id', function (req, res) {
    // On récupère les paramères en query string;
    let id = req.params.id;

    // ici on va accèder à la BD....
    //on simule la réponse

    let reponse = {
        msg: "Recu GET pour rechercher restaurant id = " + id,
        data: restaurants[id],
        err: ""
    }
    res.send(JSON.stringify(reponse));
})

// Pour insérer un restaurant à partir d'un formulaire
// multipart
app.post('/api/restaurants', multerData.fields([]), function (req, res) {
    let nom = req.body.nom; // BODY au lieu de params ou query
    let cuisine = req.body.cuisine;

    let id = Math.random();

    restaurants.push({
        nom:nom,
        cuisine:cuisine,
        id:id
    })
    let reponse = {
        msg: "J'insère un restaurant nom = " + nom 
              + " cuisine = " + cuisine,
        data: "http://localhost:8085/restaurants/" + id,
        err: ""
    }
    res.send(JSON.stringify(reponse));
})

// Pour supprimer un restaurant
// Repond à /api/restaurants/2 par exemple (restaurant d'id = 2)
app.delete('/api/restaurants/:id', function (req, res) {
    // On récupère les paramères en query string;
    let id = req.params.id;

    // ici on va accèder à la BD....
    //on simule la réponse
    console.log("SERVEUR SUPPRIME RESTAURANT ID=" + id)

   // ici on va accèder à la BD....
   mongoDBModule.supprimerRestaurant(id, (nbreRestaurantsSupprimes) => {
    let reponse = {
        msg: "Reçu DELETE pour supprimer id= " + id,
        data: nbreRestaurantsSupprimes, //nbre d'élmts supprimés
        err: ""
    }
    res.send(JSON.stringify(reponse));
})
})



var server = app.listen(8085, () => {
    console.log("Serveur écoute sur http://localhost:8085");
})