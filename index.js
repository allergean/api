var restify = require('restify')
    , port = process.env.PORT || 5000
    ;

var server = restify.createServer({
  name: 'Allergean REST API',
});

server.get('/', function (req, res, next) {
  res.send('Hello Allergean REST API');
  return next();
});

server.listen(port);
