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
    this.setState({ selectedTask: task.id, })
  }

  deselectTask = () => {
    this.setState({ selectedTask: null, })
  }

  renderTaskList = () => {
    return this.state.tasks.map((task, index) => {

      let isActive = this.state.selectedTask == task.id ? true : false;

      return <TaskListItem toggleTask={this.toggleTaskCompletion}
                           selectTask={this.selectTask}
                           isActive={isActive}
                           task={task}
                           key={index} />
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
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
    )
  }

  render() {
    const { user } = this.props;

    return (
      <div className="dashboard-page">
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
