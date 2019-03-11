import React, { Component } from 'react';
import './App.css'
import Todos from './components/Todos';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with Jules',
        completed: false
      },
      {
        id: 3,
        title: 'Meeting with Mandie',
        completed: false
      },

    ]
  }

  markComplete = (id) => {
    //mark the todo as complete
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  render() {
    return (
      <div className="App">
      <Todos todoList = {this.state.todos} markComplete = {this.markComplete}/>
      </div>
    );
  }
}

export default App;
