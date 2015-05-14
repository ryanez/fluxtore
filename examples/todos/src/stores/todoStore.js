'use strict';

module.exports = store;
store.$inject = ['fluxtore', '_'];

function store(fluxtore, _) {
    var cache = [],
        idSeed = 0,
        proxy;

    return proxy = fluxtore.createStore({
        events: ['change'],

        getTodos: getTodos,

        actions: {
            addTodo: addTodo,

            removeTodo: removeTodo
        }
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