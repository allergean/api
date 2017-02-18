var restify = require('restify')
    , routes = require('./routes')
    , port = process.env.PORT || 5000
    ;

var server = restify.createServer({
  name: 'Allergean REST API',
});

routes.register(server);
server.listen(port);
