"use strict";

var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var SlidModel = require("../models/slid.model.js");
var fs = require('fs');

var SlidController = function () {

};

SlidController.list = function (callback) {
    /**
     * Paramètres : dirname, callback
     * Description : Lit les fichiers dans le dossier "dirname" et retourne les slids
     * Retour : Renvoie une liste JSON clé-valeur
     *    clé -> id du slid
     *    valeur -> SlidModel correspondant
     **/
    var readFiles = function (dirname, callback) {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                callback(err);
            } else {
                var obj = [];
                var new_array = filenames.filter(contains);

                var read = 0
                for (var index = 0; index < new_array.length; index++) {
                    var filename = new_array[index];

                    fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            var json = JSON.parse(content.toString());

                            var slid = new SlidModel();
                            slid.id = json.id;
                            slid.type = json.type;
                            slid.title = json.title;
                            slid.fileName = json.fileName;

                            fs.readFile(dirname + json.fileName, 'utf-8', function (err, content) {
                                if (err) callback(err);
                                else {
                                    slid.setData(content.toString());
                                    obj.push({key: slid.id, value: slid});

                                    if (++read == new_array.length - 1)
                                        callback(null, obj);
                                }
                            });

                        }
                    });
                }
            }
        });
    };

    readFiles(CONFIG.contentDirectory, function (err, obj) {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            callback(null, obj);
        }
    });
};

/**
 * Filtre files
 * @param element
 * @returns {*}
 */
function contains(element) {
    if (element.indexOf('.meta.json') > -1) {
        return element;
    } else {
        return null;
    }
}

SlidController.create = function (source, name, type, callback) {
    var utils = require("../utils/utils.js");

    var slid = new SlidModel();
    slid.id = utils.generateUUID();
    slid.type = type;
    var regex = /\..+$/g;
    slid.title = name.replace(regex, "");
    slid.fileName = slid.id + name.match(regex);

    fs.readFile(source, function (err, content) {
        if (err) callback(err);
        else {
            slid.setData(content);
            SlidModel.create(slid, function (err) {
                if (err) callback(err);
                else callback(null);
            });
        }
    });
};

SlidController.read = function (id, callback, json) {
    if (typeof json == "undefined")
        json = false;
    
    if (!fs.existsSync(CONFIG.contentDirectory + id + ".meta.json"))
        callback("Le fichier d'ID " + id + " n'existe pas");
    else {
        fs.readFile(CONFIG.contentDirectory + id + ".meta.json", function (err, content) {
            if (err) callback(err);
            else {
                var contentJson = JSON.parse(content.toString());

                if (json) callback(null, contentJson);
                else {
                    fs.readFile(CONFIG.contentDirectory + contentJson.fileName, function (err, content) {
                        if (err) callback(err);
                        else callback(null, content.toString());
                    })
                }
            }
        });
    }
}


module.exports = SlidController;
