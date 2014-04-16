//===========================================================================================
// Equivalence REST Interface
//===========================================================================================
var restify = require('restify');

var arithmo = require('arithmo');
//=======================================================
// Create the REST server
//=======================================================
var server = restify.createServer({});

server.use(restify.bodyParser({rejectUnknown: true}));  // Pulls out the parameters
server.use(restify.jsonp());
server.listen(8000);

// Routes
server.get('/hello', hello);
server.get('/phi', phi);
//server.post('/phi', phi);

function hello(req, res, callback) {
    console.log("Hello");    
    res.contentType = 'json';
    var test = arithmo.test();
    res.json(test);
}

function phi(req, res, callback) {
    res.contentType = 'json';
    var data = arithmo.phiPowers(3);
    res.json(data);
    return callback();
}
