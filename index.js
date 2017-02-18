var restify = require('restify')
    , pg = require('pg')
    , port = process.env.PORT || 5000
    ;

var server = restify.createServer({
  name: 'Allergean REST API',
});

function handleError(err, req, res, next) {
    console.error(err);
    res.send(500, {error: "Internal server error"});
    return next(err);
}

server.get('/', function (req, res, next) {
  res.send('Hello Allergean REST API');
  return next();
});

server.get('/allergens', function (req, res, next) {
  return pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    return client.query('SELECT id, description FROM allergens', function(err, result) {
      done();

      if (err) return handleError(err, req, res, next);

      let response = result.rows;
      res.send(result.rows);
      return next();
    });
  });
});

server.get('/products', function (req, res, next) {
  return pg.connect(process.env.DATABASE_URL, function(err, client, done) {

    if (err) return handleError(err, req, res, next);

    const query = client.query('SELECT id, name FROM products');
    const results = {};
    const productIds = [];

    query.on('row', function(row) {
      row.allergens = [];
      results[row.id] = row;
      productIds.push(row.id);
    });

    query.on('end', function() {
      done();

      const allergensQuery = client.query(
        'SELECT product_id AS product, allergen_id AS allergen FROM products_allergens WHERE product_id IN ($1)',
        [productIds.join(',')]);

      allergensQuery.on('row', function(row) {
        results[row.product].allergens.push(row.allergen);
      });

      allergensQuery.on('end', function() {
        return res.send(Object.values(results));
      });
    });
  });
});

server.listen(port);
