class Tasks extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        activeTasks: [],
        completedTasks: [],
        selectedTask: null,
      }
      this.taskUpdated = this.taskUpdated.bind(this);
    }

    componentDidMount() {
      Requester.get(this.props.activeTasks).then((tasks) => {
        this.setState({ activeTasks: tasks });
      });

      Requester.get(this.props.completedTasks).then((tasks) => {
        this.setState({ completedTasks: tasks });
      });
    }

    selectTask = (task, event) => {
      this.setState({ selectedTask: task.id })
    }

    deselectTask = () => {
      this.setState({ selectedTask: null })
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
    }

    renderTaskList(tasks) {
      return tasks.map((task, index) => {

        let isActive = this.state.selectedTask == task.id ? true : false;

        return <TaskListItem toggleTask={this.toggleTaskAction}
                             selectTask={this.selectTask}
                             isActive={isActive}
                             task={task}
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
        return (
          <div className="dashboard-selected-task card-bg">
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>{task.due_date.substring(0, 10)}</p>
              <TaskEditForm
                id={task.id}
                listener={this.taskUpdated}
                currentUser={this.props.user.id}
                updateRoute={this.props.updateRoute}
              />
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

    render() {
      const { user } = this.props;

      return (
        <div>
          <div className="container">
            <TaskCreationForm
              listener={this.taskUpdated}
              currentUser={this.props.user.id}
              updateRoute={this.props.updateRoute}
              creationRoute={this.props.creationRoute}
            />
          </div>
          <div className="container dashboard-cards-container">
            <div className="dashboard-task-list card-bg">
              <div className="task-btn-container">
                <a className="task-btn active">Active Tasks</a>
                <a className="task-btn">Completed Tasks</a>
              </div>

              {this.renderTaskList(this.state.activeTasks)}

              <div className="task-btn-container">
                <a className="task-btn">Completed Tasks</a>
              </div>

              {this.renderTaskList(this.state.completedTasks)}
            </div>

            {this.renderSelectedTask()}
          </div>
        </div>
      );
    }
}
