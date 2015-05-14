'use strict';

module.exports = eventify;
eventify.$name = 'eventify';
eventify.$inject = ['EventEmitter', '_'];

var splice = Array.prototype.splice;

function eventify(emmiter, _) {
	var add = 'addXXXListener',
		remove = 'removeXXXListener',
		emit = 'emitXXX';
		
	return function (events) {
		return _.reduce(events, function(memo, name) {
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
		}, _.extend({}, emmiter.prototype));
	};
	
	function capitalFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}