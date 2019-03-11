import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About"
// import uuid from "uuid";
import axios from 'axios'

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuid.v4(),
      //   title: "Take out the trash",
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: "Dinner with Jules",
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: "Meeting with Mandie",
      //   completed: false
      // }
    ]
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => this.setState({ todos: response.data}))
  }

  markComplete = id => {
    //mark the todo as complete
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    // delete the todo
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  addTodo = title => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title:title,
      completed:false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todoList={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path = "/about" component = {About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
