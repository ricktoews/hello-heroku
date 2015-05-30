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
server.listen(process.env.PORT || 8000);

// Routes
server.get("/", hello);
server.get("/phi/:power", phi);
server.get("/dc/:denom", dc);
server.get("/phixy/:x/:y", phixy);
server.post("/phi", phi);

function hello(req, res, callback) {
	var data = { msg: "Howdy, World!" };
	res.json(data);
	return callback();
}

function phi(req, res, callback) {
	if (req.method == "POST")
		var power = req.body.power;
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

function phixy(req, res, callback) {
	var x = req.params.x;
	var y = req.params.y;
	var data = arithmo.phiXY({x: 1*x, y: 1*y}, 10);
	res.json(data);
	return callback();
}

exports.server = server;
