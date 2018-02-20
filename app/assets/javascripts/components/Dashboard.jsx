class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectedTask: null,
    }
  }

  componentDidMount() {
    Requester.get(`/api/users/${this.props.user.id}/tasks`).then((tasks) => {
      this.setState({ tasks });
    });
  }

  selectTask = (task, event) => {
    event.stopPropagation();
    this.setState({ selectedTask: task.id, }, this.renderSelectedTask)
  }

  deselectTask = () => {
    this.setState({ selectedTask: null, })
  }

  renderTaskList = () => {
    return this.state.tasks.map((task, index) => {

      let taskActiveStatus;
      if (task.id == this.state.selectedTask) {
        taskActiveStatus = "active";
      }

      return (
        <div key={index} className={`task-item ${taskActiveStatus}`}
          onClick={(e) => {this.selectTask(task, e) }}>
          <div className="checkbox">
            <input type="checkbox" />
          </div>
          <p>{task.description}</p>
        </div>
      );
    });
  }

  findTaskInArray = (id) => {
    let { tasks } = this.state;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return tasks[i];
      }
    }

    return null;
  }

  renderSelectedTask = () => {
    const { selectedTask } = this.state;

    let task = this.findTaskInArray(selectedTask)

    if (task == null) return

    return (
      <div className="dashboard-selected-task card-bg">
        <h1>Task</h1>
        <p>{task.description}</p>
      </div>
    )
  }

  render() {
    const { Tab, Row, Col, Nav, NavItem } = ReactBootstrap;
    const { user } = this.props;
    const fullName = `${user.first_name} ${user.last_name}`
    return (
      <div className="dashboard-page" onClick={this.deselectTask}>
        <div className="page-bar">
          <div className="container">
            <h2 className="page-bar-title">My Dashboard</h2>
            <div className="page-bar-left">
              <TaskCreationForm />
            </div>
          </div>
        </div>
        <div className="container dashboard-cards-container">
          <div className="dashboard-task-list card-bg">
            <div className="task-btn-container">
              <a className="task-btn active">Active Tasks</a>
              <a className="task-btn">Completed Tasks</a>
            </div>

            {this.renderTaskList()}
          </div>

          {this.renderSelectedTask()}

          <NotificationsList userId={user.id} />
        </div>
      </div>
    );
  }
}
