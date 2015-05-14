'use strict';

var ngdi = require('ng-di');
var Dispatcher = require('flux').Dispatcher;
var underscore = require('underscore');
var emitter = require('events').EventEmitter;
var fluxtools = require('flux-tools');

ngdi.module('todos', [])
    //dependencies needed by fluxtools
    .constant('_', underscore)
    .constant('EventEmitter', emitter)
    .constant('dispatcher', new Dispatcher())
    //registering flux tools
    .factory('eventify', fluxtools.eventify)
    .factory('storify', fluxtools.storify)
    //registering stores
    .factory('todoStore', require('./stores/todoStore'))
    //registering ui components
    .factory('AddTodo', require('./ui/add'))
    .factory('TodoList', require('./ui/list'))
	.factory('Main', require('./ui/main'))
    //global dependencies
    .constant('document', global.document)
    .constant('React', require('react/addons'))
	.run(['React', 'Main', 'document', function(React, Main, document) {
		React.render(
		  <Main />,
		  document.getElementById('todosapp')
		);
	}]);
	
//show the awesome to the world.
ngdi.injector(['todos']);