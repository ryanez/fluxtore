'use strict';

var ngdi = require('ng-di');
var fluxtore = require('fluxtore');
var underscore = require('underscore');

ngdi.module('todos', [])
    .constant('fluxtore', fluxtore)
    .constant('_', underscore)
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