'use strict';

var express = require('express');
var moment = require('moment');
var app = express();
var port = process.env.PORT || 8080;

app.get('/:time', function(req, res) {
	var time = req.params.time;
	var response = {
		unix: null,
		natural: null
	}
	if (moment(time).isValid()) {
		response = {
			unix: moment(time).unix(),
			natural: moment(time).format('LL')
		}
	}
	else {
		if (moment.unix(time).isValid()) {
			response = {
				unix: moment.unix(time).unix(),
				natural: moment.unix(time).format('LL')
			}
		}
	}
	res.send(JSON.stringify(response));
})

app.listen(port, function() {
	console.log('Timestamp API listening on port '+ port+'!')
})
