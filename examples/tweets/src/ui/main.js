'use strict';

module.exports = component;
component.$inject = ['React', 'todoStore', 'TodoList', 'AddTodo'];

function component(React, todoStore, TodoList, AddTodo) {
    return React.createClass({
        displayName: 'Main',

        getInitialState: function() {
            return getTodosState();
        },

        componentWillMount: function() {
            todoStore.addChangeListener(this.onTodosChange);
        },

        componentWillUnmount: function() {
            todoStore.removeChangeListener(this.onTodosChange);
        },

        onTodosChange: function() {
            this.setState(getTodosState());
        },

        render: function() {
            return (
                <div>
                    <p>Add some todos!</p>
                    <AddTodo />
                    <TodoList todos={this.state.todos} />
                </div>
            );
        }
    });

    function getTodosState() {
        return { 
            todos: todoStore.getTodos()
        };
    }
}