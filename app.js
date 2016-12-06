var app = require("express")();

var hhtp = require("http");
var CONFIG = require("./config.json");

process.env.CONFIG = JSON.stringify(CONFIG);

var serveur = http.createServer(app);
server.listen(CONFIG.port);

var defaultRoute = require("./app/routes/default.route.js");
app.use(defaultRoute);

app.get("/", function(request, response){
	response.send("It works!");
});


app.use(function(request, response, cb){
	response.send("It works!");
	cb();
});