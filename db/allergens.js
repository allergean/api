var pool = require('./pool').pool
    ;

exports.findAll = function() {
  return new Promise(function (fulfill, reject) {
    pool.connect(function(err, client, done) {
      if (err) reject(err);

      const query = client.query('SELECT id, description FROM allergens');
      const results = [];

      query.on('row', function(row) {
        results.push(row);
      });

      query.on('end', function() {
        fulfill(results);
        done();
      });

      query.on('error', function (err) {
        reject(err);
        done();
      });
    });
  });
}
