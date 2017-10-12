import React from 'react';

class Task extends React.Component {
  render() {
  	return (
      <div>
        { this.props.task.description }
      </div>
    );
  }
}

export default Task;