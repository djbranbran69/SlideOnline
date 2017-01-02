"use strict";

var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var SlidModel = require("./../models/slid.model.js");
var fs = require('fs');

var SlidController = function(){

    this.list = function(){
        this.readFiles('../../'+CONFIG.contentDirectory , function(err, obj){
            if(err){
                console.error(err);
            }else{
                console.dir(obj);
                var json = JSON.stringify(obj);

                //console.dir(json);

                console.dir('coucou');
            }
        });

    };

    /**
     * Filtre files
     * @param element
     * @returns {*}
     */
    function containts(element) {
        if(element.indexOf('.meta.json') > -1){
            return element;
        }else{
            return null;
        }
    }

    this.readFiles = function(dirname, callback) {
        fs.readdir(dirname, function(err, filenames) {
            if (err) {
                callback(err);
            }else{
                //var listReturned = [];
                var obj = {
                    table: []
                };
                var new_array = filenames.filter(containts);

            console.log(new_array.length);
                for(var index = 0; index < new_array.length; index++){
                    var filename = new_array[index];

                    console.dir('coucou');
                    console.dir(filename);
                    var a = 0;
                    fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                        if (err) {console.log(err);
                            callback(err);
                        }else{
                            //console.dir('['+content+']');
                            obj.table.push({id: index, value:content});
                        }
                        a++;
                    });
                    if(index == new_array.length-1) {
                        console.dir("A --> " + a);
                        console.dir('Brandon');
                        console.dir(obj);
                        callback(null, obj);
                    }
                }
            }
        });
    }



};

(function() {
    var sc = new SlidController();
    sc.list();
    setTimeout(function() {
        console.log("====== END =======");
    }, 1500);
})();