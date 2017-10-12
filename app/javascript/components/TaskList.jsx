import React from 'react';
import Task from 'components/Task';

class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
		};
	}

	componentDidMount() {
		// REPLACE WITH BETTER AJAX stuff
		const httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
		  if (httpRequest.readyState == XMLHttpRequest.DONE) {
		  	if (httpRequest.status == 200) {
		  		this.setState({
		  			tasks: JSON.parse(httpRequest.responseText),
		  		});
		  	}
		  }
		};
		httpRequest.open('GET', `/api/tasks/${this.props.userId}`, true);
		httpRequest.send();
	}

  render() {
  	const taskList = this.state.tasks.map((task, index) => <Task task={task} />);
    return (
    	<div>
    		{ taskList }
    	</div>
    );
  }
}

export default TaskList;