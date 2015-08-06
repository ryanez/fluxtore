'use strict';

module.exports = component;
component.$inject = ['React', 'todoStore'];

function component(React, todoStore) {
    return React.createClass({
        displayName: 'List',

        render: function() {
            var todos = (this.props.todos || []).map(function(todo) {
                return (
                    <li key={'todo-' + todo.id}>
                        {todo.text}
                        (<a href="#" onClick={this.removeTodo.bind(this, todo)}>remove</a>)
                    </li>);
            }.bind(this));

            return (<ul>{todos}</ul>);
        },

        removeTodo: function(todo) {
            todoStore.removeTodo(todo.id);
        }
    });
}
