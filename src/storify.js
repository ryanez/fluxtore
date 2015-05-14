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