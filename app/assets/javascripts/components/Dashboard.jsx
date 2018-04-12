class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  addEventToState = (data) => {
    this.setState({ events: data });
  }

  handleCreateEvent = (events) => {
    this.setState({ events });
  }

  handleCreateEventType = (eventTypes) => {
    this.setState({ eventTypes });
  }

  render() {
    const { ListGroupItem } = ReactBootstrap;
    const { user } = this.props;
    const { currentTab } = this.state;

    let listItem;

    switch(currentTab) {
      case "active":
        listItem = this.renderTaskList(this.state.activeTasks);
        break;
      case "completed":
        listItem = this.renderTaskList(this.state.completedTasks);
        break;
    }

    const eventList = this.state.events.map((event, index) => {
      const date = new Date(event.start_time);
      return (
        <ListGroupItem
          header={event.name}
          key={index}
        >
          { date.toDateString() }
        </ListGroupItem>
      );
    });

    return (
      <div className="dashboard-page">
        <div className="page-bar">
          <div className="container">
            <h2 className="page-bar-title">My Dashboard</h2>
          </div>
        </div>
        <Tasks user={this.props.user}
               activeTasks={`/api/users/${this.props.user.id}/activetasks`}
               completedTasks={`/api/users/${this.props.user.id}/completedtasks`}
               updateRoute={`api/users/${this.props.user.id}/updatetasks`}
               creationRoute={`api/users/${this.props.user.id}/createtask`}
        />
      </div>
    );
  }
}
