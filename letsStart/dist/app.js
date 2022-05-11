"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_router_1 = require("./cats/cats.router");
var app = express();
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(cats_router_1.default);
    };
    Server.prototype.setMiddleware = function () {
        app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            console.log("this is middleware");
            next();
        });
        app.use(express.json());
        this.setRoute();
        app.use(function (req, res, next) {
            res.send({ error: "404 Not found error" });
        });
    };
    Server.prototype.listen = function () {
        this.setMiddleware();
        this.app.listen(8000, function () {
            console.log("Server is on...");
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map