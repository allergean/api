var allergens = require('./allergens')
    , products = require('./products')
    , restify = require('restify')
    ;

exports.register = function(server) {
  server.use(restify.queryParser());

  allergens.register(server);
  products.register(server);

  server.get('/', function (req, res, next) {
    res.send('Hello Allergean REST API');
    return next();
  });
}
