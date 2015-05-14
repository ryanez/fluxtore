'use strict';

var eventify = require('./eventify');
var storify = require('./storify');

module.exports = function(dispatcher, emitter, underscore) {
	return {
		eventify: eventify(emitter, underscore),
		storify: storify(dispatcher)	
	};
};

module.exports.eventify = eventify;
module.exports.storify = storify;
