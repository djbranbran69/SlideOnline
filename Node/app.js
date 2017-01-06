var express = require("express");
var app = express();

var http = require("http");
var CONFIG = require("./config.json");

process.env.CONFIG = JSON.stringify(CONFIG);

var server = http.createServer(app);
server.listen(CONFIG.port);

var IOController = require("./app/controllers/io.controller.js");
IOController.listen(server);

var defaultRoute = require("./app/routes/default.route.js");
app.use(defaultRoute);

var slidRoute = require("./app/routes/slid.route.js");
app.use(slidRoute);

var path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public/")));
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

/**
 * Load Presentation
 */
app.get("/loadPres", function (request, response) {
    var path = require('path');
    var fs = require('fs');
    var retour = {};


    fs.readdir(CONFIG.presentationDirectory, function (err, data) {
        if (err) return;

        data.forEach(function (filename, index, array) {
            var index_courant = index;
            var length = array.length;

            fs.readFile(CONFIG.presentationDirectory + filename, function (err, data) {
                if (err) throw err;
                var json = JSON.parse(data.toString());
                retour[json.id] = data.toString();

                if (index_courant + 1 == length)
                    response.send(retour);
            });
        });

    });

});

/**
 * Load Images
 */
app.get("/loadImages", function (request, response) {
    var SlidController = require('./app/controllers/slid.controller.js');

    var retour = {};

    SlidController.list(function (err, json) {
        if (err) response.send(err);
        else {
            var index_courant = 0;
            for (var index = 0; index < json.length; index++) {
                SlidController.read(json[index].key, function (err, data) {
                    if (err) response.send(err);
                    else {
                        var key = json[index_courant].key;
                        retour[key] = {json: json[index_courant].value, src: data};

                        if (index_courant + 1 == json.length) {
                            response.send(retour);
                        }
                    }
                    index_courant++;
                });
            }
        }
    });
});

/**
 * Save Presentation
 */
app.post("/savePres", function (request, response) {
    var fs = require('fs');
    var json = request.body;

    fs.writeFile(CONFIG.presentationDirectory + json.id + ".pres.json",
        JSON.stringify(request.body),
        function (err) {
            if (err) {
                return console.log(err);
            }
        });

    response.send("Presentation saved!");
});