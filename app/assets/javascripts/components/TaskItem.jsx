/**
* @prop task - task object
*/

class TaskItem extends React.Component {
  render() {
  	return (
      <div>
        { this.props.task.description }
      </div>
    );
  }
}