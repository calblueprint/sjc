/**
 * @prop
 */
class TaskListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { task, isSelected } = this.props;
    let taskActiveStatus = isSelected ? "selected" : "";
    let checked = task.completed_status == "archived" ? true : false;
    const dueDateStr = moment(task.due_date).format("M/DD/YYYY");
    const dueDatePast = moment(task.due_date).isBefore(moment(), "day");

    return (
      <div className={`task-item ${taskActiveStatus}`}
        onClick={(e) => {this.props.selectTask(task, e) }}>
        <div className="checkbox">
          <input type="checkbox" checked={checked} onChange={() => this.props.toggleTask(task)} />
        </div>
        <div>
          <p className="title">{task.title}</p>
          <p className="client">Client: {task.client_name}</p>
        </div>
        <div className={`due-date ${dueDatePast ? "past" : ""}`}>{dueDateStr}</div>
      </div>
    )
  }
}
