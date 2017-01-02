"use strict";

var SlidController = require("./app/controllers/slid.controller.js");

var fonction1 = function () {
    console.log("====== FONCTION 1 : List files =======");
    SlidController.list(function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    });
    setTimeout(function () {
        console.log("====== END FONCTION 1 =======");
        fonction2();
    }, 1500);
};

var fonction2 = function () {
    console.log("====== FONCTION 2 : Read file =======");
    fonction2_1();
}

var fonction2_1 = function () {
    console.log("====== Test 1 : id inexistant =======");
    SlidController.read("test_id_inexistant", function (err, obj) {
        if (err) console.log(err);
    });

    setTimeout(function () {
        console.log("====== END test 1 =======");
        fonction2_2();
    }, 1500);
}

var fonction2_2 = function () {
    console.log("====== Test 2 : id existant (37ba76b1-5c5d-47ef-8350-f4ea9407276d), json non renseigné =======");
    SlidController.read("37ba76b1-5c5d-47ef-8350-f4ea9407276d", function (err, obj) {
        if (err) console.log(err);
        else {
            console.log(JSON.stringify(obj));
        }
    });

    setTimeout(function () {
        console.log("====== END test 2 =======");
        fonction2_3();
    }, 1500);
}

var fonction2_3 = function () {
    console.log("====== Test 3 : id existant (37ba76b1-5c5d-47ef-8350-f4ea9407276d), json = true =======");
    SlidController.read("37ba76b1-5c5d-47ef-8350-f4ea9407276d", function (err, obj) {
        if (err) console.log(err);
        else {
            console.log(obj);
        }
    }, true);

    setTimeout(function () {
        console.log("====== END test 3 =======");
        console.log("====== END FONCTION 2 =======");
    }, 1500);
}

fonction1();

