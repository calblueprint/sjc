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
  	const { ListGroup, ListGroupItem, Glyphicon } = ReactBootstrap;
  	const taskList = this.state.tasks.map((task, index) => {
	  	const taskClassName = task.completed_status === "active" ? "task-active" : "task-archived";
	  	const taskStatusGlyphicon = task.completed_status === "active" ? 
	  		<Glyphicon glyph="unchecked" /> :
	  		<Glyphicon glyph="check" />;
			return (
				<ListGroupItem key={index} bsClass={`list-group-item task-row`}>
					{taskStatusGlyphicon}
	  			{task.description}
	  		</ListGroupItem>
	  	);
  	});
    return (
    	<ListGroup>
    		{ taskList }
    	</ListGroup>
    );
  }
}
