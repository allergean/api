var pg = require('pg'),
    handleError = require('./helpers').handleError
    ;

function listAllergens(req, res, next) {
  return pg.connect(process.env.DATABASE_URL, function(err, client, done) {

    const query = client.query('SELECT id, description FROM allergens');
    const results = [];

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      res.send(results);
      return next();
    });
  });
};

exports.register = function(server) {
  server.get('/allergens', listAllergens);
};
