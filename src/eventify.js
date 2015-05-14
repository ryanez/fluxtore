/**
 * Copyright (c) 2015 Rodrigo Yanez <ryanez@nearsoft.com>
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emitter = require('events').EventEmitter,
	extend = require('object-assign'),
	splice = Array.prototype.splice,
	reduce = Array.prototype.reduce,
	add = 'addXXXListener',
	remove = 'removeXXXListener',
	emit = 'emitXXX';

module.exports = function(events) {
	return reduce.call(events, function(memo, name) {
		var capitalized = capitalFirst(name);
		
		memo[add.replace('XXX', capitalized)] = function(callback) {
			memo.on(name, callback);
			return memo;
		};
		
		memo[remove.replace('XXX', capitalized)] = function(callback) {
			memo.removeListener(name, callback);
			return memo;
		};
		
		memo[emit.replace('XXX', capitalized)] = function() {
			splice.call(arguments, 0, 0, name);
			return memo.emit.apply(memo, arguments);	
		};
		
		return memo;
	}, extend({}, emitter.prototype));
}

function capitalFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}