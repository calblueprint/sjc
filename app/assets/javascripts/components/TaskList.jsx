class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
		};
	}

	componentDidMount() {
		Requester.get(`/api/users/${this.props.userId}/tasks`).then((tasks) => {
			this.setState({ tasks });
		});
	}

  render() {
  	const tasks = this.state.tasks;
  	const taskList = tasks && tasks.map((task, index) => <TaskItem task={task} key={index} />);
    return (
    	<div>
    		{ taskList }
    	</div>
    );
  }
}