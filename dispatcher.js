var dispatcher = function() {
    this.app = null;
    this.path = null;
    this.routes = [];
};

dispatcher.prototype.init = function(options) {
    this.app = options.app;
    this.path = options.path;
    this.scan(this.path);
};

dispatcher.prototype.scan = function(dir) {
    // TODO : CHECK DIR EXISTS
    file = require("file");
    file.walk(dir, this.parseRoutes);
};

dispatcher.prototype.addRoute = function(routes) {
   for(var route in routes) {
       // TODO CHECK IF file exists before listen
       ct = require(this.path + routes[route].controller)._controller;
       /*
       this.app.get(route, (function(req, res, next, routes, route) {
           view = null;
           if(typeof(routes[route].view) !== "undefined") {
               // TODO CHECK IF VIEW EXISTS
               view = routes[route].view;
           }
           ct[routes[route].action](req, res, view);
       })(req, res, next, view, routes, route));*/

       view = null;
       if(typeof(routes[route].view) !== "undefined") {
           // TODO CHECK IF VIEW EXISTS
           console.log('has view -> ' + routes[route].view);
           //ct[routes[route].action].view = routes[route].view;
           //view = routes[route].view;
       }

       //console.log(ct);
       //console.log(this.app.routes);
       this.app.get(route, ct[routes[route].action]);
       //console.log('view  => ' + ct.index.view);
       //console.log('action  => ' + ct.index);
       console.log('Dispatcher: add route => ' + route);
       console.log(routes[route]);
   }
};

dispatcher.prototype.parseRoutes = function(start, dirs, names, files) {
    for(var i=0, len = files.length; i<len; i++) {
        file = files[i];
        name = files[i].replace(dirs, '').replace('/', '');

        if(name == 'routes.js') {
            routes = require(file).routes;
            this.dispatcher.routes.push({name : name, file : file, routes : routes});
            this.dispatcher.addRoute(routes);
        }
    }
};

exports.dispatcher = new dispatcher();
