"use strict";

var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var sockets = {};
var io;
var client;


var IOController = function () {

};

IOController.listen = function (server) {
    io = require('socket.io').listen(server);
    initConnection();
}

function initConnection() {
    io.on('connection', function (mClient) {
        client = mClient;
        initEvenements();
    });
}

function initEvenements() {
    client.on('data_comm', function (id_client) {
        sockets[id_client] = client.id;
    });

    client.on('slidEvent', function (presentation_json) {
        var commande = presentation_json.CMD;
        var id = presentation_json.PRES_ID;

        var SlidModel = require("../models/slid.model");
        SlidModel.read(id, function (err, slid) {
            if (err == null) {
                slid.src = "/slid/" + slid.id;
                io.sockets.emit('slidEvent', slid);
            }
        });
    });
}


module.exports = IOController;
