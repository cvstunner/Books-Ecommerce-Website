const net = require("net");

var client = net.createConnection({
	port: 8080
});

client.on('data', (data) => {
	console.log(`Message Recieved from the Server: ${data}`);
});

// isIP();0 4 6 
// isIPv4();
// isIPv6();