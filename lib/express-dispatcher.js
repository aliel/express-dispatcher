var fs = require('fs')
  , path = require('path');

var dispatcher = function() {
    this.app = null; // TODO : Set it as a middleware
    this.path = null;
    this.routes = [];
};

dispatcher.prototype.init = function(options) {
    this.app = options.app;
    this.path = options.path;

    if(typeof(options.routeFile) !== "undefined") {
        this.routes = require(options.routeFile).routes;
        this.addRoute(this.routes);
        return;
    }

    //this.scan(this.path);
};

dispatcher.prototype.scan = function(dir) {
    if(typeof(dir) === "undefined") throw new Error('No controllers dir provided!');

    if(!path.existsSync(dir)) throw new Error('Path : "' + dir + '" not exists!');
};

dispatcher.prototype.parseRoutes = function(start, dirs, names, files) {
    for(var i=0, len = files.length; i<len; i++) {
        var file = files[i];
        var name = files[i].replace(dirs, '').replace('/', '');

        if(name == 'routes.js') {
            var routes = require(file).routes;
            console.log(this.dispatcher); // Non défini
            this.dispatcher.routes.push({name : name, file : file, routes : routes});
            this.dispatcher.addRoute(routes);
        }
    }
};

dispatcher.prototype.addRoute = function(routes) {
    for(var route in routes) {
        var fileController = this.path + routes[route].controller;
        var controller = require(fileController)._controller;

        var view = null;
        if(typeof(routes[route].view) !== "undefined") {
            view = routes[route].view;
        }

        this.app.get(route, controller[routes[route].action]);
    }
};

exports.dispatcher = new dispatcher();
