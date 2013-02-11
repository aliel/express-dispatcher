var dispatcher = require('../lib/express-dispatcher.js').dispatcher;

var myApp = function() {
    this.routes = [];
};

myApp.prototype.get = function(verb, callback) {
    var route = {};
    route[verb] = callback;
    this.routes.push(route);
};

var app = new myApp();

var path = __dirname + '/../test/controllers/';
path = '/home/aliel/projects/nodejs/express-dispatcher/test/controllers/';

describe("Routes test", function() {
    it("Zero routes", function() {
        dispatcher.init({app: app, path: path});
        expect(dispatcher.routes.length).toBe(0);
    });


    it("One route", function() {
        dispatcher.init({app: app, path: path, routeFile : path + 'routes'});
        expect([dispatcher.routes].length).toBe(1);
    });

    it("Added One route", function() {
        expect(app.routes.length).toBe(1);
    });

});