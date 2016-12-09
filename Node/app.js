var express = require("express");
var app = express();

var http = require("http");
var CONFIG = require("./config.json");

process.env.CONFIG = JSON.stringify(CONFIG);

var server = http.createServer(app);
server.listen(CONFIG.port);

var defaultRoute = require("./app/routes/default.route.js");
app.use(defaultRoute);


var path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", express.static(path.join(__dirname, "public/")));
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

app.get("/loadPres", function(request, response){
	var path = require('path');
	var fs = require('fs');
	var retour = {};


	fs.readdir(CONFIG.presentationDirectory, function(err, data){
		if(err) return;

		data.forEach(function(filename, index, array){
			var index_courant = index;
			var length = array.length;

			fs.readFile(CONFIG.presentationDirectory + "/" + filename, function(err, data) {
				if(err) throw err;
				var json = JSON.parse(data.toString());
				retour[json.id] = data.toString();

				if(index_courant + 1 == length)
					response.send(retour);
			});
		});

	});
	
});

app.post("/savePres", function(request, response){
	var fs = require('fs');
	var json = request.body;

	fs.writeFile(CONFIG.presentationDirectory + "/" + json.id + ".pres.json", 
		request.body, 
		function(err) {
    	if(err) {
        	return console.log(err);
    	}	
	}); 

	response.send("Presentation saved!");	
});

/*FONCTIONS DE TEST, A SUPPR*/

app.get("/testCreate", function(request, response){

	var slid = {
		type: "IMG_B64",
		id: "coucou_id",
		title: "coucou_title",
		fileName: "coucou_filename.json"
	}
	
	var slidModel = require("./app/models/slid.model.js");

	var slidObject = new slidModel(slid);

	slidModel.create(slidObject, function(err){
		if(err){
			response.send("Pas ok")
			console.log(err)
		}
		else
			response.send("Ok c'est créé !");
	});
});

app.get("/testRead", function(request, response){
	
	var SlidModel = require("./app/models/slid.model.js");

	var slid = SlidModel.read("d6aad8cd-b3dc-4794-9e2e-efee903a3f5e", function(err, slidModel){
		if(err){
			response.send("Pas ok")
			console.log(err)
		}
		else{
			response.send("<h3>Ok c'est lu !</h3>" +
				"<li>Type :" + slidModel.type + "</li>" +
				"<li>Id :" + slidModel.id + "</li>" +
				"<li>Title :" + slidModel.title + "</li>" +
				"<li>FileName :" + slidModel.fileName + "</li>" +
				"<li>Data :" + slidModel.getData() + "</li>" +
				"</ul>");
		}
	});
});

app.get("/testUpdate", function(request, response){

	var slid = {
		type: "IMG_B64",
		id: "coucou_id",
		title: "coucou_title2",
		fileName: "coucou_filename.json"
	}
	
	var slidModel = require("./app/models/slid.model.js");

	var slidObject = new slidModel(slid);

	slidObject.setData("test data");

	slidModel.create(slidObject, function(err){
		if(err){
			response.send("Pas ok")
			console.log(err)
		}
		else
			response.send("Ok c'est modifié !");
	});
});

app.get("/testDelete", function(request, response){
	
	var SlidModel = require("./app/models/slid.model.js");

	var slid = SlidModel.delete("coucou_id", function(err, slidModel){
		if(err){
			response.send("Slide inexistant")
			console.log(err)
		}
		else{
			response.send("Slide supprimé !");
		}
	});
});