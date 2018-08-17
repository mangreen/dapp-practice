const fs = require('fs');

exports.handleRouting = function(req, res, next) {
	
	const index = fs.readFileSync('./public/index.html', {encoding: 'utf-8'} );

	var str = index;

    return res.send( str );
    
};