"use strict";

var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");

var router = express.Router();
module.exports = router;

var multerMiddleware = multer({ "dest": "/tmp/" });


router.post("/slids", multerMiddleware.single("file"), function(request, response) {
    console.log(request.file.path); // The full path to the uploaded file
    console.log(request.file.originalname); // Name of the file on the user's computer
    console.log(request.file.mimetype); // Mime type of the file
});
