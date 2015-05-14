'use strict';

module.exports = store;
store.$inject = ['eventify', 'storify', '_'];

var events = ['change'];

function store(eventify, storify, _) {
    var cache = [],
        idSeed = 0,
        proxy = eventify(events),
        action = storify(proxy).action;

    return _.extend(proxy, {
        getTodos: getTodos,

        addTodo: action(addTodo),

        removeTodo: action(removeTodo)
    });

    function addTodo(text) {
        cache.push({ id: ++idSeed, text: text});
        proxy.emitChange();
    }

    function removeTodo(id) {
        var index = _.findIndex(cache, idPredicate(id));

        if (index >= 0) {
            cache.splice(index, 1);
            proxy.emitChange();
        }
    }

    function idPredicate(id) {
        return function(todo) {
            return id === todo.id;
        }
    }

    function getTodos() {
        if (cache === null) {
            //loadTodos();
        }
        
        return cache;
    }
}