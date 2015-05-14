require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';

module.exports = storify;
storify.$name = 'storify';
storify.$inject = ['dispatcher'];

var splice = Array.prototype.splice,
	bind = Function.prototype.bind;

function storify(dispatcher) {
	return function(store) {
		store.dispatchToken = dispatcher.register(function(action) {
			if (action.store === store) {
				if (action.waitFor) {
					dispatcher.waitFor(action.waitFor);
				}
				action.callback();
			}
		});
		
		return {
			action: function(callback, waitFor) {
				return function() {
					splice.call(arguments, 0, 0, store);
					
					dispatcher.dispatch({
						store: store,
						callback: bind.apply(callback, arguments),
						waitFor: waitFor
					});
				};
			}
		};
	};
}
},{}],"flux-tools":[function(require,module,exports){

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

},{"./eventify":1,"./storify":2}]},{},[]);
