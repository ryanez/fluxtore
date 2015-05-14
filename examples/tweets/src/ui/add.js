'use strict';

module.exports = component;
component.$inject = ['React', 'todoStore'];

function component(React, todoStore) {
    return React.createClass({
        displayName: 'AddTodo',

        getInitialState: function() {
            return { 
                text: ''
            };
        },

        render: function() {
            return (
                <div>
                    <input name="add" value={this.state.text} onKeyPress={this.keyPressedHandler} onChange={this.textChangeHandler}/>
                    <button onClick={this.addButtonClickHandler}>Add</button>
                </div>
            );
        },

        addTodo: function() {
            todoStore.addTodo({text: this.state.text})
            this.setState({text: ''});
        },

        keyPressedHandler: function(e) {
            if (e.which === 13) {
                e.preventDefault();
                this.addTodo();
            }
        },

        textChangeHandler: function(e) {
            this.setState({
                text: e.currentTarget.value
            });
        },

        addButtonClickHandler: function(e) {
            e.preventDefault();
            this.addTodo();
        }
    });

    function getTodosState() {
        return { 
            todos: todoStore.getTodos()
        };
    }
}