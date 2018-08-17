var sslEnabled = false;
var path = require('path');

module.exports = {

	env: "dev",

	port: (process.env.PORT || 8888),

	"dev_server": {
		"outside_hostname": "localhost",
		"hostname": "0.0.0.0",
		"port": "8081"
	},

	winston: {
		level: "debug"
	},

	cookie: {
		key: "pskkblablablacookie"    
	},
	
};