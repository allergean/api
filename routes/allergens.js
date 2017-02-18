var db = require('./../db')
    handleError = require('./helpers').handleError
    ;

function listAllergens(req, res, next) {
  db.allergens.findAll()
    .then(function(results) {
      res.send(results);
      return next();
    })
    .catch(function(err) {
      handleError(err, req, res, next);
    });
};

exports.register = function(server) {
  server.get('/allergens', listAllergens);
};
