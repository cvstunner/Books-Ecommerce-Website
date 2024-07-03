const net = require("net");

var server = net.createServer();

server.listen({
	host: 'localhost',
	port: 8080
},
console.log('Server listening!'));

server.on('connection', (client) => {
	console.log('Client Connected!');
	client.write("Welcome to the Server");
});