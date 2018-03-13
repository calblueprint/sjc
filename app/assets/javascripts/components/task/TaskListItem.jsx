/**
 * @prop
 */
class TaskListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { task, isActive } = this.props;
    let taskActiveStatus = isActive ? "active" : "";
    let checked = task.completed_status == "archived" ? true : false;

    return (
      <div className={`task-item ${taskActiveStatus}`}
        onClick={(e) => {this.props.selectTask(task, e) }}>
        <div className="checkbox">
          <input type="checkbox" checked={checked} onChange={() => this.props.toggleTask(task)} />
        </div>
        <p>{task.title}</p>
      </div>
    )
  }
}
