var winston = require('winston');

var logger = winston.createLogger({
	transports: [
		new winston.transports.Console({ 
			level: 'debug',
			format: winston.format.combine(
				winston.format.colorize(),
    			winston.format.simple()
			)
		}),
	],
	exitOnError: false
});

module.exports = logger;
module.exports.stream = {
	write: function(message, encoding) {
		logger.info(message);
	}
};