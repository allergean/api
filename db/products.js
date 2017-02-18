var pool = require('./pool').pool
    ;

exports.findAll = function() {
  return new Promise(function (fulfill, reject){
    pool.connect(function(err, client, done) {
      if (err) reject(err);

      const query = client.query('SELECT id, ean, name FROM products');
      const results = {};
      const productIds = [];

      query.on('row', function(row) {
        row.allergens = [];
        results[row.id] = row;
        productIds.push(row.id);
      });

      query.on('end', function() {

        const allergensQuery = client.query(
          'SELECT product_id AS product, allergen_id AS allergen FROM products_allergens WHERE product_id IN ($1)',
          [productIds.join(',')]);

        allergensQuery.on('row', function(row) {
          results[row.product].allergens.push(row.allergen);
        });

        allergensQuery.on('end', function() {
          let values = Object.keys(results).map(function(key) {
              return results[key];
          });
          fulfill(values);
          done();
        });

        allergensQuery.on('error', function (err) {
          reject(err);
          done();
        });
      });

      query.on('error', function (err) {
        reject(err);
        done();
      });

    });
  });
}

exports.get = function(ean) {
  return new Promise(function (fulfill, reject) {
    pool.connect(function(err, client, done) {
      if (err) reject(err);

      const query = client.query(
        'SELECT id, ean, name FROM products WHERE ean = $1 LIMIT 1',
        [ean]
      );

      query.on('end', function (result) {
        fulfill(result.rowCount ? result.rows.pop() : null);
        done();
      });

      query.on('error', function (err) {
        reject(err);
        done();
      });
    });
  });
}
