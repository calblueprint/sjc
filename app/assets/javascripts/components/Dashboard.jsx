class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTasks: [],
      completedTasks: [],
      selectedTask: null,
      currentTab: "active",
      events: [],
      eventTypes: [],
      selectedEvent: null,
    }
    this.taskUpdated = this.taskUpdated.bind(this);
  }

  componentDidMount() {
    Requester.get(`/api/users/${this.props.user.id}/activetasks`).then((tasks) => {
      if (tasks != undefined) {
        this.setState({ activeTasks: tasks });
      }
    });

    Requester.get(`/api/users/${this.props.user.id}/completedtasks`).then((tasks) => {
      if (tasks != undefined) {
        this.setState({ completedTasks: tasks });
      }
    });

    Requester.get('/api/events').then((events) => {
      if (events != undefined) {
        this.setState({ events });
      }
      Requester.get('/api/event_types').then((eventTypes) => {
        this.setState({ eventTypes });
      });
    });
  }

  selectTask = (task, event) => {
    this.setState({ selectedTask: task.id })
  }

  selectEvent = (event, e) => {
    this.setState({ selectedEvent: event.id })
  }

  deselectTask = () => {
    this.setState({ selectedTask: null })
  }

  deselectEvent = () => {
    this.setState({ selectedEvent: null })
  }

  toggleTaskAction = (task) => {
    const payload = {
      task_id: task.id
    }
    if (task.completed_status === "active") {
      Requester.update('/api/tasks/complete', payload).then((data) => {
        let taskIndex = this.findTaskIndex(task.id, this.state.activeTasks);
        let taskCopy = this.state.activeTasks[taskIndex];
        taskCopy.completed_status = "archived";
        let newCompletedTasks = [taskCopy].concat(this.state.completedTasks.slice());
        let newActiveTasks = this.state.activeTasks.slice(0, taskIndex).concat(this.state.activeTasks.slice(taskIndex + 1));
        this.setState({ activeTasks: newActiveTasks, completedTasks: newCompletedTasks });
      }).catch((data) => {
        console.error(data);
      });
    } else {
      Requester.update('/api/tasks/uncomplete', payload).then((data) => {
        let taskIndex = this.findTaskIndex(task.id, this.state.completedTasks);
        let taskCopy = this.state.completedTasks[taskIndex];
        taskCopy.completed_status = "active";
        let newActiveTasks = [taskCopy].concat(this.state.activeTasks.slice());
        let newCompletedTasks = this.state.completedTasks.slice(0, taskIndex).concat(this.state.completedTasks.slice(taskIndex + 1));
        this.setState({ completedTasks: newCompletedTasks, activeTasks: newActiveTasks });
      }).catch((data) => {
        console.error(data);
      });
    }
    this.deselectTask(task);
  }

  renderTaskList(tasks) {
    if (tasks.length == 0) {
      return <p style={{'fontWeight': '600', 'marginLeft': '8px'}}>No Tasks!</p>
    }

    return tasks.map((task, index) => {
      let isSelected = this.state.selectedTask == task.id ? true : false;

      return <TaskListItem toggleTask={this.toggleTaskAction}
                           selectTask={this.selectTask}
                           isSelected={isSelected}
                           task={task}
                           key={index} />
    });
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

  renderSelectedTask = () => {
    const { selectedTask } = this.state;

    let task = this.findTaskInArray(selectedTask, this.state.activeTasks);
    if (task == null) {
      task = this.findTaskInArray(selectedTask, this.state.completedTasks);
    }

    if (task != null) {
      const dueDateStr = moment(task.due_date).format('MMM Do, YYYY');
      const clientURL = LinkConstants.client.view(task.client_id);

      let editForm;
      if (task.completed_status == "active") {
        editForm = <TaskEditForm
                    id={task.id}
                    listener={this.taskUpdated}
                    currentUser={this.props.user.id} />
      }

      let markCompleteButtonTxt, markCompleteButtonStyle;
      if (task.completed_status == "active") {
        markCompleteButtonTxt =
          <span>
            <span className="fa fa-check marginRight-xxs"></span>
            Mark as Complete
          </span>;
      } else {
        markCompleteButtonStyle = "button--text-alert";
        markCompleteButtonTxt =
          <span>
            <span className="fa fa-times marginRight-xxs"></span>
            Mark as Incomplete
          </span>;
      }

      return (
        <div className="dashboard-selected-task card-bg">
          <h1>{task.title}</h1>
          <label>Description</label>
          <p className="marginBot-xs">{task.description}</p>

          <label>Due Date</label>
          <p className="marginBot-xs">{dueDateStr}</p>

          <label>Client</label>
          <div><a href={clientURL} className="link marginBot-md">
            {task.client_name}
          </a></div>

          <div className="button-container">
            <button className={`button button--sm marginRight-xs ${markCompleteButtonStyle}`}
              onClick={() => this.toggleTaskAction(task)}>
              { markCompleteButtonTxt }
            </button>
            { editForm }
          </div>
        </div>
      )
    }
  }

  changeTaskTab = (selectedTab) => {
    const { currentTab } = this.state;

    if (currentTab != selectedTab) {
      this.deselectTask(); // deselect the currently selected task, if any.
      this.setState({ currentTab: selectedTab });
    }
  }

  renderSelectedEvent = () => {
    const { selectedEvent } = this.state;
    let event = this.findTaskInArray(selectedEvent, this.state.events);
    if (event != null) {
      let eventTypeName = this.findTaskInArray(event.event_type_id, this.state.eventTypes).name;
      return (
        <div className="dashboard-selected-task card-bg">
          <h1>{event.name}</h1>
          <p>Event Type: {eventTypeName}</p>
          <p>Location: {event.location}</p>
          <p>Start Time: {event.start_time}</p>
          <p>End Time: {event.end_time}</p>
        </div>
      )
    }
    return
  }

  taskUpdated = (info) => {
    if (info.completed && info.hide) {
      this.setState({ completedTasks: info.tasks, selectedTask: null });
    } else if (info.completed) {
      this.setState({ completedTasks: info.tasks });
    } else if (info.hide) {
      this.setState({ activeTasks: info.tasks, selectedTask: null });
    } else {
      this.setState({ activeTasks: info.tasks });
    }
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
            <div className="page-bar-right">
              <TaskCreationForm
                listener={this.taskUpdated}
                currentUser={this.props.user.id}
              />
              <EventTypeCreationForm
                userId={this.props.user.id}
                eventTypes={this.state.eventTypes}
                handleCreateEventType={this.handleCreateEventType} />
              <EventCreationForm
                clients={this.props.clients}
                eventTypes={this.state.eventTypes}
                userId={this.props.user.id}
                handleCreateEvent={this.handleCreateEvent}
                addEventToState={this.addEventToState} />
            </div>
          </div>
        </div>
        <div className="container dashboard-cards-container">
          <div className="dashboard-task-list card-bg">
            <div className="task-btn-container">
              <a className={`task-btn ${currentTab == "active" ? "active" : ""}`}
                onClick={() => this.changeTaskTab("active")}>
                My Active Tasks</a>
              <a className={`task-btn ${currentTab == "completed" ? "active" : ""}`}
                onClick={() => this.changeTaskTab("completed")}>
                Completed Tasks</a>
            </div>

            {listItem}
          </div>

          {this.renderSelectedTask()}
        </div>
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
