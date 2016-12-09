var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var SlidModel = function(slid){
	this.type = slid && slid.type ? slid.type : null;
	this.id = slid && slid.id ? slid.id : null;
	this.title = slid && slid.title ? slid.title : null;
	this.fileName = slid && slid.fileName ? slid.fileName : null;
	var data = null;

	this.getData = function(){ return data; }

	this.setData = function(mData){ data = mData; }

	this.toJson = function(){
		return {
			type: this.type,
			id: this.id,
			title: this.title,
			fileName: this.fileName
		};
	}
}


SlidModel.create = function(slid, callback){
	var fs = require('fs');

	var cpt = 0;

	var retour = function(err){
		cpt++;
		if(err) 
        	callback(err);
 		else if(cpt == 2)
			callback(null);
	}

	//Stockage du contenu dans [slid.fileName]
	fs.writeFile(CONFIG.contentDirectory + "/" + slid.fileName, 
		slid.getData(),		
		function(err) {
    		retour(err);
	});

	//Stockage des métadonnées dans [slid.id].meta.json
	fs.writeFile(CONFIG.contentDirectory + "/" + slid.id + ".meta.json", 
		JSON.stringify(slid), 
		function(err) {
    		retour(err);
	});
}

SlidModel.read = function(id, callback){
	var fs = require('fs');

	//Lecture des metadonnées du slide d'identifiant [id]
	fs.readFile(CONFIG.contentDirectory + "/" + id + ".meta.json", 'utf8', 
		function(err, data){
			if(err)
				callback(err);
			json = JSON.parse(data.toString());

			var ret = new SlidModel(json);

			fs.readFile(CONFIG.contentDirectory + "/" + json.fileName, function(err, data){
				if(err)
					callback(err);

				if(data)
					ret.setData(data.toString());
				else
					callback(json.fileName + " n'existe pas.")

				callback(null, ret);
			});
	});
}

SlidModel.update = function(slid, callback){
	var fs = require('fs');

	var cpt = 0;

	var retour = function(err){
		cpt++;
		if(err) 
        	callback(err);
 		else if(cpt == 2)
			callback(null);
	}

	//Stockage des metadonnees dans [slid.id].meta.json
	fs.writeFile(CONFIG.contentDirectory + "/" + slid.id + ".meta.json", 
		slid.toJson(), 
		function(err) {
    		retour(err);
	});

	if(slid.getData() && slid.getData().length > 0){
		//Stockage des metadonnees dans [slid.id].meta.json
		fs.writeFile(CONFIG.contentDirectory + "/" + slid.id + ".meta.json", 
			slid.toJson(), 
			function(err) {
    			retour(err);
		});
	}
	else retour();
}

SlidModel.delete = function(id, callback){

	var fs = require('fs');

	if(id){
		//Lecture des metadonnées du slide d'identifiant [id]
		fs.readFile(CONFIG.contentDirectory + "/" + id + ".meta.json", 'utf8', 
			function(err, data){
				if(err)
					callback(err);

				if(data)
					json = JSON.parse(data.toString());
				else
					callback(id + " n'existe pas");

				fs.unlink(CONFIG.contentDirectory + "/" + json.fileName);

				suite();
		});

		var suite = function(){
			fs.unlink(CONFIG.contentDirectory + "/" + id + ".meta.json");
			callback(null);
		}
	}
	else callback("Pas d'id indiqué en paramètre");
}

module.exports = SlidModel;
