class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventTypes: [],
      selectedEvent: null,
      updatedTasks: []
    }
  }

  componentDidMount() {
    this.updateEvents();
  }

  updateItems = () => {
    this.updateEvents();
  }

  findTaskInArray = (id, tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return tasks[i];
      }
    }
    return null;
  }

  findTaskIndex = (id, tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return i;
      }
    }
    return null;
  }

  updateEvents = () => {
    Requester.get('/api/events').then((events) => {
      if (events != undefined) {
        this.setState({ events });
      }
      Requester.get('/api/event_types').then((eventTypes) => {
        this.setState({ eventTypes });
        Requester.get(`/api/users/${this.props.user.id}/activetasks`).then((tasks) => {
          this.setState({ updatedTasks: tasks });
        })
      });
    });
  }

  renderSelectedEvent = () => {
    const { selectedEvent } = this.state;
    let event = this.findTaskInArray(selectedEvent, this.state.events);
    if (event != null) {
      let eventTypeName = this.findTaskInArray(event.event_type_id, this.state.eventTypes).name;
      return (
        <div className="dashboard-selected-task card-bg">
          <h1>{showValue(event.name)}</h1>
          <p>Event Type: {showValue(eventTypeName)}</p>
          <p>Location: {showValue(event.location)}</p>
          <p>Start Time: {showValue(event.start_time)}</p>
          <p>End Time: {showValue(event.end_time)}</p>
        </div>
      )
    }
    return
  }

  selectEvent = (event, e) => {
    this.setState({ selectedEvent: event.id })
  }

  deselectEvent = () => {
    this.setState({ selectedEvent: null })
  }

  renderEventList(events) {
    return events.map((event, index) => {

      let isActive = this.state.selectedEvent == event.id ? true : false;

      return <EventListItem selectEvent={this.selectEvent}
                            isActive={isActive}
                            event={event}
                            key={index} />
    });
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
        <EventTypeCreationForm
          userId={this.props.user.id}
          eventTypes={this.state.eventTypes}
          handleCreateEventType={this.handleCreateEventType} />
        <EventCreationForm
          clients={this.props.clients}
          eventTypes={this.state.eventTypes}
          userId={this.props.user.id}
          handleCreateEvent={this.handleCreateEvent}
          addEventToState={this.addEventToState}
          updateItems={this.updateItems} />
        <Tasks user={this.props.user}
                 activeTasks={`/api/users/${this.props.user.id}/activetasks`}
                 completedTasks={`/api/users/${this.props.user.id}/completedtasks`}
                 updateRoute={`api/users/${this.props.user.id}/updatetasks`}
                 creationRoute={`api/users/${this.props.user.id}/createtask`}
                 change={this.state.updatedTasks}
        />
        <div className="container dashboard-cards-container">
            <div className="dashboard-task-list card-bg">
              <div className="task-btn-container">
                <a className="task-btn active">Events</a>
              </div>

              { this.renderEventList(this.state.events) }
            </div>
            {this.renderSelectedEvent()}
          </div>
      </div>
    );
  }
}
