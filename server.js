'use strict';

var express = require('express');
var moment = require('moment');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
	res.sendfile('index.html', {root: __dirname })
});

app.get('/:time', function(req, res) {
	var time = req.params.time;
	var response = {
		unix: null,
		natural: null
	}
	if (moment.unix(time).isValid()) {
		response = {
			unix: moment.unix(time).unix(),
			natural: moment.unix(time).format('LL')
		}
	}

	else {
		if (moment(time).isValid()) {
			response = {
				unix: moment(time).unix(),
				natural: moment(time).format('LL')
			}
		}
	}
	res.send(JSON.stringify(response));
});

app.get('*',function (req, res) {
    res.redirect('/');
});

app.listen(port, function() {
	console.log('Timestamp API listening on port ' + port + '!')
})
