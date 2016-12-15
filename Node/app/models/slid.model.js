"use strict";

var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var fs = require('fs');

var SlidModel = function(slid){
	this.type = slid && slid.type ? slid.type : null;
	this.id = slid && slid.id ? slid.id : null;
	this.title = slid && slid.title ? slid.title : null;
	this.fileName = slid && slid.fileName ? slid.fileName : null;
	var data = null;

	this.getData = function(){ return data; };

	this.setData = function(mData){ data = mData; };

	this.toJson = function(){
		return {
			type: this.type,
			id: this.id,
			title: this.title,
			fileName: this.fileName
		};
	};


};

/**
 * To know if the file exist
 * @param path
 * @returns {boolean}
 */
SlidModel.exist = function(path){

    if(fs.existsSync(path)){
        return true;
    }else{
        return false;
    }
};

/**
 * To create a file
 * @param slid
 * @param callback
 */
SlidModel.create = function(slid, callback){
	var cpt = 0;
	var retour = function(err){
		cpt++;
		if(err) 
        	callback(err);
 		else if(cpt == 2)
			callback(null);
	};

	if(slid && slid.fileName && slid.id){
        //Stock content in [slid.fileName]
        fs.writeFile(CONFIG.contentDirectory +  slid.fileName,
            JSON.stringify(slid.toJson()),
            function(err) {
                retour(err);
            });

        //Stock des métadonnées dans [slid.id].meta.json
        fs.writeFile(CONFIG.contentDirectory +  slid.id + ".meta.json",
            JSON.stringify(slid),
            function(err) {
                retour(err);
            });
    }else{
	    callback('Slid null or parameters is null');
    }

};

/**
 * To read a file
 * @param id
 * @param callback
 */
SlidModel.read = function(id, callback){
	var fs = require('fs');
    var path = CONFIG.contentDirectory +  id + ".meta.json";
    if (this.exist(path)) {
        //Lecture des metadonnées du slide d'identifiant [id]
        fs.readFile(path , 'utf8',
            function (err, data) {
                if (err)
                    callback(err);
                json = JSON.parse(data.toString());

                var ret = new SlidModel(json);
                var pathFile = CONFIG.contentDirectory + json.fileName;
                if (SlidModel.exist(pathFile)) {
                    fs.readFile(pathFile, function (err, data) {
                        if (err)
                            callback(err);

                        if (data)
                            ret.setData(data.toString());
                        else
                            callback(json.fileName + " does not exist.");

                        callback(null, ret);
                    });
                }else{
                    callback(pathFile+' does not exist.');
                }
            });
    }
};

/**
 * To update a file
 * @param slid
 * @param callback
 */
SlidModel.update = function(slid, callback){

	var cpt = 0;

	var path = CONFIG.contentDirectory + slid.id + ".meta.json";
    var pathFile = CONFIG.contentDirectory + slid.id + ".txt";
    if(this.exist(path) && this.exist(pathFile)){

        fs.writeFile(path, JSON.stringify(slid.toJson()), function(err){
            if(err){
                callback(err);
            }else{
                if(slid.getData() && slid.getData().length > 0){
                    //Stockage des metadonnees dans [slid.id].meta.json
                    fs.writeFile(pathFile,
                        slid,
                        function(err) {
                            if (err){
                                callback(err);
                            }else{
                                callback();
                            }
                        });

                }else{
                    callback();
                }
            }
        });


	}else {
        callback('L\'un ou les 2 fichiers est inexistant');
    }

};


/**
 * To delete a file
 * @param id
 * @param callback
 */
SlidModel.delete = function(id, callback){
	var fs = require('fs');
	if(id){
	    var path = CONFIG.contentDirectory + id + ".meta.json";
        if (this.exist(path)) {
            //Lecture des metadonnées du slide d'identifiant [id]
            fs.readFile(path , 'utf8',
                function (err, data) {
                    if (err){
                        callback(err);
                    }

                    if (data) {
                        try {
                        json = JSON.parse(data.toString());
                        } catch(e) {
                            callback("Error file is corrupted : "  + err);
                        }
                    }
                    else {
                        callback(id + " does not extist");
                    }

                    fs.unlink(CONFIG.contentDirectory + json.fileName);

                    suite();
                });

            var suite = function () {
                fs.unlink(CONFIG.contentDirectory + id + ".meta.json");
                callback(null);
            }
        }
	}
	else callback("No ID");
};



module.exports = SlidModel;
