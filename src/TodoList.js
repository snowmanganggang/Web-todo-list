import React, { Component } from 'react';
import Todo from './Todo';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Todos: [],
      ListName: "New todo list",
      TextInput: "Add new todos...",
      EditName: false
    }
  }

  deleteTodo(i) {
    if (this.state.Todos[i].done){
      this.props.handleCount(this.props.index, -1, 0);
    }
    else {
      this.props.handleCount(this.props.index, 0, -1);
    }
    this.state.Todos.splice(i,1);
    this.setState({ Todos: this.state.Todos });
  }

  handleChange(s,e) {
    var TextInput = this.state.TextInput;
    if (s == "focus" && TextInput == "Add new todos...") {
      this.setState({ TextInput: "" });
    }
    else if (s == "blur" && TextInput == "") {
      this.setState({ TextInput: "Add new todos..." });
    }
    else if (s == "press") {
      if (e.key == 'Enter' && TextInput != "") {
        this.addTodo(e.target.value);
        this.setState({ TextInput: "" });
      }
    }
    else if (s == "change") { 
      this.setState({ TextInput: e.target.value });
    }
  }

  addTodo(content) {
    if (this.state.Todos.length < 5) {
      this.setState({ Todos: this.state.Todos.concat([{ content: content , done: false }]) });
      this.props.handleCount(this.props.index, 0, 1);
    }
  }

  renderTitle() {
    if (this.state.EditName) {
      return <input 
                type="text" 
                className="edit-name"
                value={this.state.ListName} 
                onChange={this.handleTitleChange.bind(this,'change')}
                onFocus={this.handleTitleChange.bind(this,'focus')}
                onBlur={this.handleTitleChange.bind(this,'blur')}
                onKeyDown={this.handleTitleChange.bind(this,'press')}
             />;
    }
    else {
      return <div className="list-title">{this.state.ListName}</div>;
    }
  }

  handleTitleChange(s,e) {
    var ListName = this.state.ListName;
    if (s == "focus" && ListName == "New todo list") {
      this.setState({ ListName: "" });
    }
    else if (s == "blur") {
      if (ListName == "") {
        this.setState({ ListName: "New todo list" });
      }
      this.setState({ EditName: false });
    }
    else if (s == 'press') {
      if (e.key == 'Enter' && ListName != "") {
        this.setState({ EditName: false });
      }
    }
    else if (s == "change") {
      this.setState({ ListName: e.target.value });
    }
  }

  handleCheck(i) {
    if (this.state.Todos[i].done == true) {
      this.state.Todos[i].done = false;
      this.props.handleCount(this.props.index, -1, 1);
    }
    else {
      this.state.Todos[i].done = true;
      this.props.handleCount(this.props.index, 1, -1);
    }
    this.setState({ Todos: this.state.Todos });
  }

  render() {
    return (
      <div className="TodoList">
        <div className={`list-top c${this.props.index%5}`} ></div>
        <div className={`list-bottom c${this.props.index%5}`}></div>
        <button className="delete" onClick={this.props.deleteTodoList}></button>
        {
          this.renderTitle()
        }
        <button className="edit-name" onClick={() => this.setState({ EditName: true })}></button>
        <div className="todos-container">
          {
            this.state.Todos.map( (item, i) => (
              <Todo 
                key={i}
                content={item.content} 
                index={i} 
                done={item.done}
                deleteClick={this.deleteTodo.bind(this,i)}
                checkClick={this.handleCheck.bind(this,i)}
              />
            ),this)
          }
        </div>
        <input 
          className="todo-input"
          type="text" 
          value={this.state.TextInput} 
          onChange={this.handleChange.bind(this,'change')}
          onFocus={this.handleChange.bind(this,'focus')}
          onBlur={this.handleChange.bind(this,'blur')}
          onKeyDown={this.handleChange.bind(this,'press')}
        />
      </div>
    );
  }
}

export default TodoList;
