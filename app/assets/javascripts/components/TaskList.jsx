class TaskList extends React.Component {
  render() {
  	const { ListGroup, ListGroupItem, Glyphicon } = ReactBootstrap;
  	const taskList = this.props.tasks.map((task, index) => {
	  	const taskClassName = task.completed_status === "active" ? "task-active" : "task-archived";
	  	const taskStatusGlyphicon = task.completed_status === "active" ? 
	  		<Glyphicon glyph="unchecked" /> :
	  		<Glyphicon glyph="check" />;
			return (
				<ListGroupItem key={index} bsClass="list-group-item task-row">
					{taskStatusGlyphicon}
					{task.description} <br/>
	  			{task.due_date}
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
