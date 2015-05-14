/**
 * Copyright (c) 2015 Rodrigo Yanez <ryanez@nearsoft.com>
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
'use strict';

var Dispatcher = require('flux').Dispatcher,
	dispatcher = new Dispatcher(),
	eventify = require('./eventify'),
	extend = require('object-assign'),
	splice = Array.prototype.splice,
	bind = Function.prototype.bind,
	reduce = Array.prototype.reduce,
	toString = Object.prototype.toString;

module.exports.createStore = function(proto) {
	var store = extend(proto, eventify(proto.events || []));

	store.dispatchToken = register();

	reduce.call(Object.keys(proto.actions || {}), function(memo, key) {
		var value = proto.actions[key];

		store[key] = isFunc(value) ?
			action(value) :
			action(value.action, value.waitFor);

		return store;
	}, store);

	return store;

	function register() {
		return dispatcher.register(function(action) {
			if (action.store === store) {
				if (action.waitFor) {
					dispatcher.waitFor(action.waitFor);
				}
				action.callback();
			}
		});
	}

	function action(callback, waitFor) {
		return function() {
			splice.call(arguments, 0, 0, store);
			
			dispatcher.dispatch({
				store: store,
				callback: bind.apply(callback, arguments),
				waitFor: waitFor
			});
		};
	}

	return store;
};

function isFunc(obj) {
	return toString.call(obj) === '[object Function]';
}