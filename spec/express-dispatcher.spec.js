var dispatcher = require('../lib/express-dispatcher.js').dispatcher;

var dummyApp = function() {
    this.routes = [];
};

dummyApp.prototype.get = function(verb, callback) {
    var route = {};
    route[verb] = callback;
    this.routes.push(route);
};

var app = new dummyApp();

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

    it("One route added ?", function() {
        expect(app.routes.length).toBe(1);
    });
});

describe("Controller test", function() {
    it("Have action (callback)", function() {
        expect(app.routes[0]['/'] instanceof Function).toBe(true);
    });
});