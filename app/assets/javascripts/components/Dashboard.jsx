class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventTypes: [],
      selectedEvent: null,
      updatedTasks: [],
      dashboardTab: "tasks",
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
      const startStr = moment(event.start_time).format('MMM Do, YYYY');
      const endStr = moment(event.end_time).format('MMM Do, YYYY');
      return (
        <div className="dashboard-selected-task card-bg">
          <h1>{showValue(event.name)}</h1>

          <label>Event Type</label>
          <p className="marginBot-xs">{showValue(eventTypeName)}</p>

          <label>Location</label>
          <p className="marginBot-xs">{showValue(event.location)}</p>

          <label>Start Time</label>
          <p className="marginBot-xs">{showValue(startStr)}</p>

          <label>End Time</label>
          <p className="marginBot-xs">{showValue(endStr)}</p>
        </div>
      )
    }
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

  changeDashboardTab = (selectedTab) => {
    const { dashboardTab } = this.state;

    if (dashboardTab != selectedTab) {
      this.setState({ dashboardTab: selectedTab });
    }
  }

  render() {
    const { ListGroupItem } = ReactBootstrap;
    const { user } = this.props;
    const { dashboardTab } = this.state;

    let dashboardItem;

    switch(dashboardTab) {
      case "tasks":
        dashboardItem = (
          <Tasks user={this.props.user}
                 activeTasks={`/api/users/${this.props.user.id}/activetasks`}
                 completedTasks={`/api/users/${this.props.user.id}/completedtasks`}
                 updateRoute={`api/users/${this.props.user.id}/updatetasks`}
                 creationRoute={`api/users/${this.props.user.id}/createtask`}
                 change={this.state.updatedTasks} />
        )
        break;
      case "events":
        dashboardItem = (
          <div>
            <div className="container event-button-container marginBot-sm">
              <EventCreationForm
                clients={this.props.clients}
                eventTypes={this.state.eventTypes}
                userId={this.props.user.id}
                handleCreateEvent={this.handleCreateEvent}
                addEventToState={this.addEventToState}
                updateItems={this.updateItems} />
              <EventTypeCreationForm
                userId={this.props.user.id}
                eventTypes={this.state.eventTypes}
                handleCreateEventType={this.handleCreateEventType} />
            </div>
            <div className="container dashboard-cards-container">
              <div className="dashboard-task-list card-bg">
                <div className="task-btn-container">
                  <a className="task-btn">Events</a>
                </div>

                { this.renderEventList(this.state.events) }
              </div>
              {this.renderSelectedEvent()}
            </div>
          </div>
        )
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
            <ul className="dashboard-tabs">
              <li className={dashboardTab == "tasks" ? "active" : ""}
                onClick={() => this.changeDashboardTab("tasks")}>Tasks</li>
              <li className={dashboardTab == "events" ? "active" : ""}
                onClick={() => this.changeDashboardTab("events")}>Events</li>
            </ul>
          </div>
        </div>

        {dashboardItem}
      </div>
    );
  }
}
