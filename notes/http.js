const http = require("http");
const web = require("web");

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
},
	console.log('Server is listening!')
).listen(8080);