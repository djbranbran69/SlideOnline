"use strict";

var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");

var router = express.Router();
module.exports = router;

var multerMiddleware = multer({"dest": "tmp/"});


router.post("/slids", multerMiddleware.single("file"), function (request, response) {
    if (typeof request.file != "undefined" && request.file != null) {
        SlidController.create(request.file.path, request.file.originalname, request.file.mimetype,
            function (err) {
                if (err) response.send(err);
                else response.send("It's works!");
            });
    }
});
