import React, { Component } from 'react';


class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const { content , index , done , deleteClick , checkClick } = this.props;
    return (
      <div className="Todo">
      	<input type="checkbox" checked={done} onChange={checkClick}/>
        <div className={`${this.props.done}`}>{content}</div>
        <button onClick={deleteClick}>x</button>
      </div>
    );
  }
}

export default Todo;
