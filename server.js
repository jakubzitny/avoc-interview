// thx to http://stackoverflow.com/a/8427954/1893452
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+"/dist/")).listen(8080);
