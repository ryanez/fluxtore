# fluxtore
Create Flux stores in an easy way. You wont need the constants and actions dependencies, everything will be isolated in the store.

# Creating a store
```
var fluxtore = require('fluxtore');
var todos = [];
var store = fluxtore.createStore({
  getTodos: getTodos
});

function getTodos() {
  return todos;
}

module.exports = store;
```

once you have your `store` you can use it in your react Components
```
var todosStore = require('./todosStore');
var TodoList = require('./todoList');
var todos = React.createClass({
  getInitialState: function() {
    return getTodosState();
  },
  
  render: function() {
    return (
      <div><TodoList todos={this.state.todos}/></div>
    );
  }
});

function getTodosState() {
  return {
    todos: todosStore.getTodos()
  };
}
```

# Events
What about the events? I want to be notified if there is some chage in the list. You can specify a list of events that your store will emit and of course support subscriptions to.

```
var fluxtore = require('fluxtore');
var todos = [];
var store = fluxtore.createStore({
  events: ['change'],
  
  getTodos: getTodos
});

function getTodos() {
  return todos;
}

module.exports = store;
```

As a magic act your store now will support `store.addChangeListener`, `store.removeChangeListner` and `store.emitChange`. this way you can update your component to properly refresh data.

```
var todosStore = require('./todosStore');
var TodoList = require('./todoList');
var todos = React.createClass({
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
      <div><TodoList todos={this.state.todos}/></div>
    );
  }
});

function getTodosState() {
  return {
    todos: todosStore.getTodos()
  };
}
```

# Actions
Don't worry creating actions is pretty simple, just expose them on your store.

```
var fluxtore = require('fluxtore');
var todos = [];
var idSeed = 0;
var store = fluxtore.createStore({
  events: ['change'],
  
  getTodos: getTodos,
  
  actions: {
    addTodo: addTodo
  }
});

function addTodo(text) {
  todos.push({id: ++idSeed, text: text});
  store.emitChange();
}

function getTodos() {
  return todos;
}

module.exports = store;
```

*Yes it's that easy*

# Calling actions from components


```
var todosStore = require('./todosStore');
var addTodo = React.createClass({
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
```

***Important*** note that the actions are added on the root of the `store`, you should not call them from the `store.actions.addTodo` 

