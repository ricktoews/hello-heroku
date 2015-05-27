//===========================================================================================
// Equivalence REST Interface
//===========================================================================================
var restify = require("restify");

var arithmo = require("arithmo");

//=======================================================
// Create the REST server
//=======================================================
var server = restify.createServer({});

server.use(restify.bodyParser({rejectUnknown: true}));  // Pulls out the parameters
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.jsonp());
server.listen(8000);

// Routes
server.get("/phi/:power", phi);
server.get("/dc/:denom", dc);
server.post("/phi", phi);

function phi(req, res, callback) {
	if (req.method == "POST")
		power = req.body.power;
	else
		power = req.params.power;
    res.contentType = "json";
    var data = arithmo.phiPowers(power);
    res.json(data);
    return callback();
}

function dc(req, res, callback) {
	var denom = req.params.denom;
	var data = arithmo.decimals(denom);
	res.json(data);
	return callback();
}

exports.server = server;
