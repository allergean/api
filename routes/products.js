var db = require('./../db'),
    handleError = require('./helpers').handleError
    ;

function listProducts(req, res, next) {
  db.products.findAll()
    .then(function(results) {
      res.send(results);
      return next();
    })
    .catch(function(err) {
      handleError(err, req, res, next);
    });
};

function getProduct(req, res, next) {
  db.products.get(req.params.ean)
    .then(function(result) {
      if (result === null) {
        return res.send(404);
      }
      res.send(result);
      return next();
    })
    .catch(function(err) {
      handleError(err, req, res, next);
    });
}

exports.register = function(server) {
  server.get('/products', listProducts);
  server.get('/products/:ean', getProduct);
};
