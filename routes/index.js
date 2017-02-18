var allergens = require('./allergens');
var products = require('./products');

exports.register = function(server) {
  allergens.register(server);
  products.register(server);

  server.get('/', function (req, res, next) {
    res.send('Hello Allergean REST API');
    return next();
  });
}
