import React, { Component } from 'react';
import TodoList from './TodoList';
import './style.css';

class TodoListApp extends Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.state = {
      TodoLists: [ { doneCount: 0 , undoneCount: 0 , key: 0} ],
      ListCount: 1,
      doneCount: 0,
      undoneCount: 0,
      logInHAHAHA: "LOG IN"
    }
  }

  handleCount(i, done, undone) {
    this.state.TodoLists[i].doneCount += done;
    this.state.TodoLists[i].undoneCount += undone;
    this.setState({ 
      TodoLists: this.state.TodoLists,
      doneCount: this.state.doneCount + done,
      undoneCount: this.state.undoneCount + undone
    });
  }

  addTodoList() {
    this.counter += 1;
    this.setState({ 
      TodoLists: this.state.TodoLists.concat([{ doneCount: 0 , undoneCount: 0 , key: this.counter }]),
      ListCount: this.state.ListCount + 1
    });
  }

  deleteTodoList(i) {
    console.log("deleteTodoList",i);
    this.setState({ 
      ListCount: this.state.ListCount - 1,
      doneCount: this.state.doneCount - this.state.TodoLists[i].doneCount,
      undoneCount: this.state.undoneCount - this.state.TodoLists[i].undoneCount
    });
    this.state.TodoLists.splice(i,1);
    this.setState({ TodoLists: this.state.TodoLists });

  }

  render() {
//    var color = ['#f46036', '#3d3286', '#c5d86d', '#1B998B', '#e71d36'];
    return (
      <div className="TodoListApp">
        <div className="side-bar">
          <div className="AppTitle">TODO</div>  
          <div className="count-box1">
            <div className="count-name">TODOs</div>
            <div className="count">{this.state.undoneCount}</div>
          </div>
          <div className="count-box2">
            <div className="count-name">DONE</div>
            <div className="count">{this.state.doneCount}</div>
          </div>
          <div className="web-programming">#NTU Web Programming</div>
        </div>
        <div className="top-bar">
          <button className="add-list" onClick={() => this.addTodoList()}><span>+  </span>  NEW TODO LIST</button>
          <a className="log-in" 
             onMouseOver={() => this.setState({ logInHAHAHA: "Comming soon...?"})}
             onMouseOut={() => this.setState({ logInHAHAHA: "LOG IN"})}
          >{this.state.logInHAHAHA}</a>
        </div>
        <div className="main-container">
          {
            this.state.TodoLists.map( (item, i) => (
              <TodoList
                key={item.key} 
                index={i}
                handleCount={this.handleCount.bind(this)}
                deleteTodoList={this.deleteTodoList.bind(this,i)}
              />
            ))
          }
        </div>
        
      </div>
    );
  }
}

export default TodoListApp;
